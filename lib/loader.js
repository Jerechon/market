'use strict';

const { fsp, path, vm } = require('./dependencies/node.js');
const { ajv } = require('./dependencies/npm.js');

const SCRIPT_OPTIONS = {
  timeout: 5000,
  displayErrors: false,
};

const ROUTE_SCHEMA = {
  type: 'object',
  required: ['schema', 'method', 'url'],
  additionalProperties: false,
  properties: {
    url: {
      type: 'string',
    },
    method: {
      type: 'string',
      enum: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    },
    roles: {
      oneOf: [
        {
          type: 'array',
          uniqueItems: true,
          items: {
            type: 'string',
            enum: ['ADMIN', 'MANAGER', 'PARTNER'],
          },
        },
        {
          type: 'string',
          enum: ['ADMIN', 'MANAGER', 'PARTNER'],
        },
      ],
    },
    access: {
      type: 'string',
      enum: ['private', 'public'],
    },
    attachValidation: {
      type: 'boolean',
    },
    fastify: {
      type: 'boolean',
      enum: [true],
    },
    schema: {
      type: 'object',
      required: ['tags'],
      additionalProperties: false,
    },
  },
};

const load = async (filePath, sandbox, contextualize = false) => {
  const src = await fsp.readFile(filePath, 'utf8');
  const opening = contextualize ? '(context) => ' : '';
  const code = `'use strict';\n${opening}${src}`;
  const script = new vm.Script(code, { ...SCRIPT_OPTIONS, lineOffset: -1 });
  return script.runInContext(sandbox, SCRIPT_OPTIONS);
};

const loadDir = async (dir, sandbox, contextualize = false) => {
  const files = await fsp.readdir(dir, { withFileTypes: true });
  const container = {};
  for (const file of files) {
    const { name } = file;
    if (file.isFile() && !name.endsWith('.js')) continue;
    const location = path.join(dir, name);
    const key = path.basename(name, '.js');
    const loader = file.isFile() ? load : loadDir;

    if (key === 'index') {
      const index = await loader(location, sandbox, contextualize);
      return index;
    }

    container[key] = await loader(location, sandbox, contextualize);
  }
  return container;
};

const createRouting = (container, path = '', routing = []) => {
  for (const key of Object.keys(container)) {
    const location = path ? `${path}/${key}` : key;
    const options = container[key];
    if (options.handler) {
      const paths = location.split('/');
      const fileName = paths.pop();
      const routeParts = fileName.split('.');
      const rootUrl = routeParts.map(u => u.replace('@', ':')).join('/');
      const url = `/api/${paths.join('/')}${rootUrl ? `/${rootUrl}` : ''}`;

      const route = {
        url,
        method: 'POST',
        access: options.access,
        roles: options.roles,
        schema: options.schema,
        fastify: options.fastify,
        attachValidation: options.attachValidation,
      };

      ajv.validateSchema(ROUTE_SCHEMA, structuredClone(route));

      route.handler = options.handler;
      routing.push(route);
    } else {
      createRouting(container[key], location, routing);
    }
  }

  return routing;
};

module.exports = {
  load,
  loadDir,
  createRouting,
};
