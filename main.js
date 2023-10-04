'use strict';

require('dotenv').config();

const node = require('./lib/dependencies/node.js');
const { path, vm } = node;

const application = require('./lib/application.js');

const server = require('./lib/server.js');
const cron = require('./lib/cron');
const { logger } = require('./lib/logger.js');
const loader = require('./lib/loader.js');

(async () => {
  const appPath = path.join(process.cwd());
  const configPath = path.join(appPath, './application/config');
  const config = await loader.loadDir(configPath, vm.createContext({ env: process.env }));
  Object.assign(application, { config, logger });

  await application.init();

  const routingPath = path.join(appPath, './application/api');
  const api = await loader.loadDir(routingPath, application.sandbox);
  const routing = loader.createRouting(api);

  const instance = await server.init({ config, routing });
  await server.start(instance, config.app.port);
  cron.start(application.sandbox.tasks, config.app.instance);
})();
