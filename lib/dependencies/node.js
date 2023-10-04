const crypto = require('node:crypto');
const timers = require('node:timers/promises');
const fs = require('node:fs');
const fsp = require('node:fs').promises;
const vm = require('node:vm');
const path = require('node:path');
const util = require('node:util');

module.exports = {
  fs,
  fsp,
  vm,
  util,
  path,
  timers,
  crypto,
  setTimeout,
  setImmediate,
  setInterval,
  clearTimeout,
  clearImmediate,
  clearInterval,
  structuredClone,
};
