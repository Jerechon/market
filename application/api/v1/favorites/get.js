({
  access: 'private',

  schema: {
    tags: ['Favorites'],
    description: 'Получить избранные товары',
  },

  handler: async ({ session }) => {
    const products = await domain.favorites.get(session.userId);
    return { products };
  },
});
