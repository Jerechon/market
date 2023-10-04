({
  access: 'private',

  schema: {
    tags: ['User'],
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
    await domain.user.addProductInBasket(session.userId, productId);
  },
});
