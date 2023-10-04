'use strict';
const fp = require('fastify-plugin');
const { ajv } = require('../dependencies/npm.js');

module.exports = fp(async function (fastify) {
  fastify.setValidatorCompiler(({ schema }) => ajv.instance.compile(schema));
});
