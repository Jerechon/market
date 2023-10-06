({
  access: 'private',

  schema: {
    tags: ['Address'],
    description: 'Обновить данные адресса',
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['addressId', 'address'],
      properties: {
        addressId: {
          type: 'string',
        },
        address: {
          type: 'string',
        },
      },
      examples: [
        {
          addressId: 'string',
          address: 'Другой дом Пушкина, другая улица Колотушкина',
        },
      ],
    },
  },

  handler: async ({ session, addressId, address }) => {
    await domain.address.update({ userId: session.userId, addressId, address });
  },
});
