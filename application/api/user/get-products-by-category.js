({
  access: 'private',

  schema: {
    tags: ['User'],
    description: 'Получить список товаров по заданой категории',
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['categoryTitle'],
      properties: {
        categoryTitle: {
          type: 'string',
        },
      },
      examples: [
        {
          categoryTitle: 'Техника',
        },
      ],
    },
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
              required: ['id', 'title', 'description', 'price', 'category'],
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                price: { type: 'integer' },
                description: { type: 'string' },
                category: {
                  type: 'object',
                  additionalProperties: true,
                },
              },
            },
          },
        },
      },
    },
  },

  handler: async ({ categoryTitle }) => {
    const products = await domain.user.getProductsByCategory(categoryTitle);
    return { products };
  },
});
