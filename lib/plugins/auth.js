'use strict';

const fp = require('fastify-plugin');
const auth = require('@fastify/auth');
const cookie = require('@fastify/cookie');

const Session = require('../session.js');

module.exports = fp(async fastify => {
  await fastify.register(cookie);

  fastify
    .decorate('verifyToken', async request => {
      try {
        await Session.restore(request);
      } catch (err) {
        err.statusCode = 403;
        throw err;
      }
    })
    .register(auth);
});
