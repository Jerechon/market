({
  access: 'private',

  schema: {
    tags: ['User'],
    description: 'Получить список категорий',
    response: {
      200: {
        type: 'object',
        required: ['categories'],
        properties: {
          categories: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['id', 'title'],
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },

  handler: async () => {
    const categories = await domain.user.getСategories();
    return { categories };
  },
});
