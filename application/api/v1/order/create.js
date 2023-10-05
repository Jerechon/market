({
  access: 'private',

  schema: {
    tags: ['Order'],
    description: 'Создать заказ',
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['addressId'],
      properties: {
        addressId: {
          type: 'string',
        },
      },
      examples: [
        {
          addressId: 'string',
        },
      ],
    },
  },

  handler: async ({ session, addressId }) => {
    const order = await domain.order.create(session.userId, addressId);
    return { order };
  },
});
