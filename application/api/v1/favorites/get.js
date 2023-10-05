({
  access: 'private',

  schema: {
    tags: ['Favorites'],
    description: 'Получить избранные товары',
  },

  handler: async ({ session }) => {
    const favorites = await domain.favorites.get(session.userId);
    return { favorites };
  },
});
