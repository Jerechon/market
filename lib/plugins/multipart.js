'use strict';

const fp = require('fastify-plugin');
const multipart = require('@fastify/multipart');

/**
 * @see https://github.com/fastify/fastify-multipart
 */
module.exports = fp(async function (fastify) {
  fastify.register(multipart, {
    limits: { fileSize: 20000000, files: 1 },
  });
});
