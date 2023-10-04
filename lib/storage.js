'use strict';

const { prisma } = require('../application/lib/prisma');

class Storage extends Map {
  async get(key) {
    const value = super.get(key);
    if (value) return value;

    const session = await prisma.session.findUnique({
      where: { token: key, isActive: true },
      select: { token: true, userId: true },
    });

    if (session) {
      super.set(key, session);
      return session;
    }
  }

  async save(session) {
    const value = super.get(session.token);

    if (value) {
      await prisma.session.create({
        data: session,
      });
    }
  }

  async delete(key) {
    await prisma.session.delete({
      where: { token: key },
    });
  }
}

module.exports = new Storage();
