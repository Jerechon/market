({
  access: 'private',

  schema: {
    tags: ['Order'],
    description: 'Оплатить заказ',
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['orderId'],
      properties: {
        orderId: {
          type: 'string',
        },
      },
      examples: [
        {
          orderId: 'string',
        },
      ],
    },
  },

  handler: async ({ orderId }) => {
    await domain.order.pay(orderId);
  },
});
