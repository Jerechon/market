({
  access: 'private',

  schema: {
    tags: ['Address'],
    description: 'Получить адресы',
  },

  handler: async ({ session }) => {
    const addresses = await domain.address.get(session.userId);
    return { addresses };
  },
});
