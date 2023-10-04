({
  access: 'private',

  schema: {
    tags: ['User'],
    description: 'Добавить адресс',
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['address'],
      properties: {
        address: {
          type: 'string',
        },
      },
      examples: [
        {
          address: 'Дом Пушкина, улица Колотушкина',
        },
      ],
    },
  },

  handler: async ({ session, address }) => {
    await domain.user.addAddress(session.userId, address);
  },
});
