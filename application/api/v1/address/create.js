({
  access: 'private',

  schema: {
    tags: ['Address'],
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
    await domain.address.addAddress(session.userId, address);
  },
});
