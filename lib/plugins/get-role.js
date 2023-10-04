const fp = require('fastify-plugin');
const { prisma } = require('../../application/lib/prisma');

const getRole = fp((fastify, opts, next) => {
  fastify.decorate('getRole', () => {
    return async req => {
      const user = await prisma.user.findUnique({
        where: { id: req.session.userId },
        select: { role: true },
      });
      req.session.role = [user.role];
      req.user = req.session;

      return;
    };
  });

  next();
});

module.exports = fp(async function (fastify) {
  fastify.register(getRole);
});
