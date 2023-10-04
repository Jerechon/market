'use strict';

const fp = require('fastify-plugin');
const websocket = require('@fastify/websocket');

/**
 *
 * @see https://github.com/fastify/fastify-websocket
 */
module.exports = fp(async function (fastify) {
  await fastify.register(websocket, {
    options: {
      maxPayload: 1048576,
    },
  });
});
