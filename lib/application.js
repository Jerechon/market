'use strict';

const npm = require('./dependencies/npm');
const node = require('./dependencies/node');
const { path, vm } = node;

const loader = require('./loader.js');

const channel = require('./channel');
const redis = require('./redis.js');

const dayjs = require('./dependencies/day.js');

const { prisma, } = require('../application/lib/prisma');
const telegram = require('../application/lib/telegram');
const smsAero = require('../application/lib/sms-aero');

class Application {
  constructor() {
    this.root = process.cwd();
    this.path = path.join(this.root, 'application');
    this.taskPath = path.join(this.path, 'tasks');
    this.dictionariesPath = path.join(this.path, 'dictionaries');
    this.domainPath = path.join(this.path, 'domain');
    this.schemasPath = path.join(this.path, 'schemas');
    this.apiPath = path.join(this.path, 'api');
  }

  async init() {
    this.createSandbox();
    const tasks = await loader.loadDir(this.taskPath, this.sandbox);
    const { errors, constants, notifications } = await loader.loadDir(
      this.dictionariesPath,
      this.sandbox,
    );
    const domain = await loader.loadDir(this.domainPath, this.sandbox);
    const schemas = await loader.loadDir(this.schemasPath, this.sandbox);
    const api = await loader.loadDir(this.apiPath, this.sandbox);

    Object.assign(this.sandbox, {
      tasks,
      errors,
      constants,
      notifications,
      domain,
      schemas,
      api,
    });
  }

  createSandbox() {
    const { config, logger: console } = this;
    const application = {};

    const lib = {
      telegram,
      smsAero,
      redis,
      channel,
    };

    const tasks = {};
    const errors = {};
    const constants = {};
    const domain = {};
    const schemas = {};
    const api = {};

    const sandbox = {
      config,
      console,

      tasks,
      errors,
      constants,
      domain,
      schemas,
      api,
      application,
      db: prisma,
      Error: this.Error,
      lib,
      dayjs,
      node,
      npm,
      setTimeout,
      setImmediate,
      setInterval,
      clearTimeout,
      clearImmediate,
      clearInterval,
      structuredClone,
    };

    this.sandbox = vm.createContext(sandbox);
  }
}

const application = new Application();

application.Error = class extends Error {
  constructor({ code, message, statusCode = 400 }) {
    super();

    this.code = code;
    this.message = message;
    this.statusCode = statusCode;
  }
};

module.exports = application;
