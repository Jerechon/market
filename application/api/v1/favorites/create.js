({
  access: 'private',

  schema: {
    tags: ['Favorites'],
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
    await domain.favorites.create(session.userId, productId);
  },
});
