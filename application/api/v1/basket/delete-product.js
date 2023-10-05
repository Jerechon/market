({
  access: 'private',

  schema: {
    tags: ['Basket'],
    description: 'Удалить товар из корзины',
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['productId'],
      properties: {
        productId: {
          type: 'string',
        },
      },
      examples: [
        {
          productId: 'string',
        },
      ],
    },
  },

  handler: async ({ session, productId }) => {
    await domain.basket.deleteProduct(session.userId, productId);
  },
});
