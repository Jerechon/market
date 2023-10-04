'use strict';

const fp = require('fastify-plugin');

const authErrors = {
  403: {
    type: 'object',
    properties: {
      error: { type: 'string' },
      message: { type: 'string' },
      statusCode: { type: 'integer' },
    },
  },
};

module.exports = fp(async function (fastify) {
  await fastify.addHook('onRoute', routeOptions => {
    if (routeOptions.schema && routeOptions.schema.security) {
      routeOptions.schema.response = {
        ...authErrors,
        ...routeOptions.schema.response,
      };
    }
  });
});
