({
  access: 'public',

  schema: {
    tags: ['Authorization'],
    description:
      'Отправляет смс-сообщение на указанный номер. Создаёт пользователя, если его не существует',
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['phoneNumber'],
      properties: {
        phoneNumber: {
          type: 'string',
        },
      },
      examples: [
        {
          phoneNumber: '+79915895264',
        },
      ],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            default: 'Смс-код отправлен.',
          },
        },
      },
      412: {
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Precondition Failed.' },
          message: {
            type: 'string',
            default: 'Не истекло время, для повторной отправки.',
          },
          statusCode: { type: 'integer', default: 412 },
          data: {
            type: 'object',
            properties: {
              secondsLeft: { type: 'integer' },
            },
          },
        },
      },
    },
  },
  handler: async ({ phoneNumber }) => {
    console.log({phoneNumber})
    await domain.auth.sendSmsCode({ phoneNumber });
    return { message: 'Смс-код отправлен.' };
  },
});
