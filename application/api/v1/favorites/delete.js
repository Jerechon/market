({
  access: 'private',

  schema: {
    tags: ['Favorites'],
    description: 'Удалить избранный товар',
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
    await domain.favorites.delete(session.userId, productId);
  },
});
