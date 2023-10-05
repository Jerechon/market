({
  access: 'private',

  schema: {
    tags: ['Product'],
    description:
      'Получить список товаров по фильтру, введите название категории или all что бы получить все товары',
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        filter: {
          type: 'string',
        },
      },
      examples: [
        {
          filter: 'Техника',
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

  handler: async ({ filter }) => {
    const products = await domain.product.getProducts(filter);
    return { products };
  },
});
