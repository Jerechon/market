'use strict';

const fp = require('fastify-plugin');
const helmet = require('@fastify/helmet');

module.exports = fp(async function (fastify) {
  fastify.register(helmet, { global: true, contentSecurityPolicy: false });
});
