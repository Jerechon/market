'use strict';

require('make-promises-safe');
const { path } = require('./dependencies/node.js');
const { autoload, closeWithGrace, fastify } = require('./dependencies/fastify.js');
const redis = require('../lib/redis.js');
const channel = require('../lib/channel.js');
const { streamForLogger, logger } = require('../lib/logger.js');
const Session = require('./session.js');

const init = async ({ config, routing }) => {
  const server = fastify({
    logger: { level: config.logger.level, stream: streamForLogger },
  });

  await server.register(autoload, {
    dir: path.join(__dirname, './plugins'),
    options: config,
  });

  const closeListeners = closeWithGrace(
    { delay: config.app.closeGraceDelay || 3000 },
    async ({ err }) => {
      if (err) server.log.error(err);
      await server.close();
    },
  );

  await server.addHook('onReady', async () => {
    await redis.client.connect();
    await channel.connect();
    channel.onError();
  });

  await server.addHook('onClose', async (instance, done) => {
    closeListeners.uninstall();
    done();
  });

  // eslint-disable-next-line no-unused-vars
  for (const route of routing) {
    const preHandler =
      route.access === 'private' ? [server.auth([server.verifyToken], { run: 'all' })] : undefined;

    const schema = {
      ...route.schema,
      security: route.access === 'private' ? [{ apiKey: [] }] : undefined,
    };

    if (preHandler && route.roles) {
      preHandler.push(server.getRole());
      if (Array.isArray(route.roles)) preHandler.push(server.guard.role(...route.roles));
      else preHandler.push(server.guard.role(route.roles));
    }

    if (route.fastify) {
      await server.route({
        url: route.url,
        preHandler,
        method: route.method,
        schema,
        attachValidation: route.attachValidation,
        handler: async (request, reply) => {
          await route.handler(request, reply, Session);
        },
      });
    } else {
      await server.route({
        url: route.url,
        preHandler,
        method: route.method,
        schema,
        handler: async (request, reply) => {
          const { body, session } = request;
          const response = await route.handler({ ...body, session });

          if (response) {
            return reply.send(response);
          }

          reply.send({ ok: true });
        },
      });
    }
  }

  channel.sub(({ userId, data, event }) => {
    for (const client of server.websocketServer.clients) {
      if (client.readyState === 1 && client.userId === userId) {
        client.send(JSON.stringify({ data, event }));
      }
    }
  });

  channel.subOnline(async () => {
    await redis.client.set(`online:${config.app.instance}`, server.websocketServer.clients.size);
  });

  if (!config.app.isProd) {
    channel.subLog(({ data }) => {
      for (const client of server.websocketServer.clients) {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ data, event: 'log' }));
        }
      }
    });
  }

  return server;
};

const start = async (server, port) => {
  try {
    await server.listen({ port });
    logger.log(`API on port ${port}`);
  } catch (error) {
    logger.log(error);
    process.exit(1);
  }
};

const stop = async server => {
  await server.close();
  logger.log('successfully closed!');
  process.exit(1);
};

module.exports = {
  init,
  start,
  stop,
};
