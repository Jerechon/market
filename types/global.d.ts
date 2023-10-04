import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';

declare global {
  namespace domain {}
  namespace directory {}
  namespace config {}

  const db: PrismaClient;
  const clearPrisma: PrismaClient;
  const xdb: PrismaClient;
  const fastify: FastifyInstance;
}

export interface ErrorOptions {
  code?: number | string;
  cause?: Error;
}

export class Error extends global.Error {
  constructor(message: string, options?: number | string | ErrorOptions);
  message: string;
  stack: string;
  code?: number | string;
  cause?: Error;
}

type Errors = Record<string, string>;

export class DomainError extends Error {
  constructor(code?: string, options?: number | string | ErrorOptions);
  message: string;
  stack: string;
  code?: number | string;
  cause?: Error;
  toError(errors: Errors): Error;
}
