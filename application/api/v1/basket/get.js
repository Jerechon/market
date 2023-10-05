({
  access: 'private',

  schema: {
    tags: ['Basket'],
    description: 'Получить корзину',
    response: {
      200: {
        type: 'object',
        required: ['basket'],
        properties: {
          basket: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['quantity', 'product'],
              properties: {
                product: {
                  type: 'object',
                  additionalProperties: true,
                },
                quantity: { type: 'integer' },
              },
            },
          },
        },
      },
    },
  },

  handler: async ({ session }) => {
    const basket = await domain.basket.get(session.userId);
    return { basket };
  },
});
