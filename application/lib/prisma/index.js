'use strict';

const { PrismaClient, Prisma } = require('@prisma/client');

/**
 * @see https://www.prisma.io/docs
 */

/**
 * @type {PrismaClient}
 */
const prisma = new PrismaClient();

module.exports = { prisma, Prisma };
