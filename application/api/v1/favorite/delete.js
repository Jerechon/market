({
  access: 'private',

  schema: {
    tags: ['Favorite'],
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
    await domain.favorite.delete(session.userId, productId);
  },
});
