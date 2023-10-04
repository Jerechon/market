const fastify = require('fastify');
const fastifyAutoload = require('@fastify/autoload');
const closeWithGrace = require('close-with-grace');

module.exports = {
  fastify,
  autoload: fastifyAutoload,
  closeWithGrace,
};
