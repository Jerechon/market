'use strict';

const fp = require('fastify-plugin');
const { Prisma } = require('@prisma/client');
const { logger } = require('../../lib/logger.js');

module.exports = fp(async (fastify, config) => {
  const { isDev, isTest } = config.app;

  fastify.setErrorHandler((error, request, reply) => {
    // if (isDev || isTest) console.log(error);
    logger.log(error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      const details = {
        type: 'PrismaClientValidationError',
        message: error.message,
      };

      return reply.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Something went wrong',
        details: isDev || isTest ? details : undefined,
      });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const details = {
        type: 'PrismaClientKnownRequestError',
        message: error.message,
      };

      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad request',
        message: 'Неправильный запрос',
        details: isDev || isTest ? details : undefined,
      });
    }

    if (error.statusCode) {
      return reply.send(error);
    }

    return reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: error.message,
    });
  });
});
