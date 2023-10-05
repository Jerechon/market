({
  access: 'private',

  schema: {
    tags: ['Favorite'],
    description: 'Добавить товар в избранное',
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
    await domain.favorite.add(session.userId, productId);
  },
});
