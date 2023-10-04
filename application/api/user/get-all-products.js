({
  access: 'private',

  schema: {
    tags: ['User'],
    description: 'Получить список всех товаров ',
    response: {
      200: {
        type: 'object',
        required: ['products'],
        properties: {
          products: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['id', 'title', 'description', 'price', 'categoryId'],
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                price: { type: 'integer' },
                description: { type: 'string' },
                categoryId: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },

  handler: async () => {
    const products = await domain.user.getAllProducts();
    return { products };
  },
});
