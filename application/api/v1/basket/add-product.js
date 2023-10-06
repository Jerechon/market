({
  access: 'private',

  schema: {
    tags: ['Basket'],
    description: 'Добавить товар в корзину',
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['productId'],
      properties: {
        productId: {
          type: 'string',
        },
        quantity: {
          type: 'number',
          minimum: 1,
        },
      },
      examples: [
        {
          productId: 'string',
          quantity: 1,
        },
      ],
    },
  },

  handler: async ({ session, productId, quantity }) => {
    await domain.basket.addProduct({ session, productId, quantity });
  },
});
