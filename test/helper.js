'use strict';

require('dotenv').config();

const node = require('../lib/dependencies/node.js');
const { path, vm } = node;

const application = require('../lib/application.js');

const server = require('../lib/server.js');
const { logger, streamForLogger } = require('../lib/logger.js');
const loader = require('../lib/loader.js');

const buildApplication = async () => {
  const appPath = path.join(process.cwd());
  const configPath = path.join(appPath, './application/config');
  const config = await loader.loadDir(configPath, vm.createContext({ env: process.env }));
  Object.assign(application, { config, logger });

  await application.init();
  return application;
};

const getDomain = async () => {
  const app = await buildApplication();
  /**
   * @type {}
   */
  return app.sandbox.domain;
};

const buildServer = async t => {
  const appPath = path.join(process.cwd());
  const configPath = path.join(appPath, './application/config');
  const config = await loader.loadDir(configPath, vm.createContext({ env: process.env }));
  Object.assign(application, { config, logger });

  await application.init();

  const routingPath = path.join(appPath, './application/api');
  const api = await loader.loadDir(routingPath, application.sandbox);
  const routing = loader.createRouting(api);

  const instance = await server.init({ config, routing, streamForLogger });
  await server.start(instance, config.app.port);
  t.teardown(server.stop(instance));
  return instance;
};

module.exports = {
  buildApplication,
  buildServer,
  getDomain,
};
// 'use strict'

// // This file contains code that we reuse
// // between our tests.

// const { build: buildApplication } = require('fastify-cli/helper')
// const path = require('path')
// const AppPath = path.join(__dirname, '..', 'app.js')

// // Fill in this config with all the configurations
// // needed for testing the application
// function config () {
//   return {}
// }

// // automatically build and tear down our instance
// async function build (t) {
//   // you can set all the options supported by the fastify CLI command
//   const argv = [AppPath]

//   // fastify-plugin ensures that all decorators
//   // are exposed for testing purposes, this is
//   // different from the production setup
//   const app = await buildApplication(argv, config())

//   // tear down our app after we are done
//   t.teardown(app.close.bind(app))

//   return app
// }

// module.exports = {
//   config,
//   build
// }
