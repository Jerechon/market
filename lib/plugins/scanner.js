'use strict';

const fp = require('fastify-plugin');
const channel = require('../channel.js');

module.exports = fp(async (fastify, config) => {
  if (config.app.isProd) return;

  fastify.addHook('onResponse', async request => {
    await channel.pubLog({
      data: {
        request: {
          url: request.url,
          method: request.method,
          body: request.body,
          params: request.params,
          query: request.query,
          auth: request.user || request.session,
        },
      },
    });
  });

  fastify.addHook('onError', async (request, reply, error) => {
    await channel.pubLog({
      data: {
        error: {
          name: error.name,
          code: error.code,
          error: error.error,
          details: error.details,
          statusCode: error.statusCode,
          message: error.message,
        },
      },
    });
  });
});
