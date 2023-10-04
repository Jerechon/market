'use strict';

const fp = require('fastify-plugin');
const cors = require('@fastify/cors');

const ORIGIN_CONFIG = {
  DEV: '*',
  PROD: ['https://88date.co', 'https://admin.88date.co'],
  TEST: ['https://test-admin.88date.co'],
};

const getOrigin = ({ isDev, isTest, isProd }) => {
  if (isDev) return ORIGIN_CONFIG.DEV;
  if (isTest) return ORIGIN_CONFIG.TEST;
  if (isProd) return ORIGIN_CONFIG.PROD;
};

module.exports = fp(async function (fastify, config) {
  fastify.register(cors, {
    origin: getOrigin(config.app),
    credentials: true,
  });
});
