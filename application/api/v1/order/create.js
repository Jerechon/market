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
          addressId: 'e7b166cb-bcc5-403f-b770-8bd0d9aa675e',
        },
      ],
    },
  },

  handler: async ({ session, addressId }) => {
    const order = await domain.order.createOrder(session.userId, addressId);
    return { order };
  },
});
