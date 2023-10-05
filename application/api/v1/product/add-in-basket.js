({
  access: 'private',

  schema: {
    tags: ['Product'],
    description: 'Добавить товар в корзину',
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
          productId: '64841a5d-2d71-445b-ae5e-8da83b3c34da',
        },
      ],
    },
  },

  handler: async ({ session, productId }) => {
    await domain.product.addProductInBasket(session.userId, productId);
  },
});
