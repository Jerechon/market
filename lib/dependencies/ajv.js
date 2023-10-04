'use strict';

const Ajv = require('ajv');
const addKeywords = require('ajv-keywords');
const addFormats = require('ajv-formats');

class ValidationError extends Error {
  constructor(message, details, code = 400) {
    super(message);
    this.statusCode = code;
    this.name = 'ValidationError';
    this.details = details;
  }
}

const instance = new Ajv({
  coerceTypes: true,
  useDefaults: true,
  removeAdditional: true,
  allErrors: false,
});

addKeywords(instance);
addFormats(instance);

const validateSchema = (schema, data) => {
  const validate = instance.compile(schema);
  const valid = validate(data);

  if (!valid) {
    const { message, instancePath } = validate.errors[0];
    const error = `${instancePath.replace('/', '')} ${message}`;
    throw new ValidationError(error);
  }

  return valid;
};

const compile = (schema, data) => {
  const validate = instance.compile(schema);
  const valid = validate(data);

  if (!valid) {
    const error = validate.errors[0];
    const message = `${error.instancePath.replace('/', '')} ${error.message}`;
    throw new ValidationError(message);
  }

  return data;
};

module.exports = {
  instance,
  validateSchema,
  compile,
};
