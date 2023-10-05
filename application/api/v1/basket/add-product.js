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
        },
      },
      examples: [
        {
          productId: '64841a5d-2d71-445b-ae5e-8da83b3c34da',
          quantity: 1,
        },
      ],
    },
  },

  handler: async ({ session, productId, quantity }) => {
    await domain.basket.addProduct(session.userId, productId, quantity);
  },
});
