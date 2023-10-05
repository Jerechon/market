({
  access: 'private',

  schema: {
    tags: ['Favorite'],
    description: 'Получить избранные товары',
  },

  handler: async ({ session }) => {
    const products = await domain.favorite.get(session.userId);
    return { products };
  },
});
