'use strict';

const fp = require('fastify-plugin');
const fastifyGuard = require('fastify-guard');

module.exports = fp(async function (fastify) {
  fastify.register(fastifyGuard, {
    errorHandler: (result, request, reply) => {
      return reply.code(403).send({ error: 'У вас нет доступа' });
    },
  });
});
