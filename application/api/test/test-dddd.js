({
  access: 'private',

  schema: {
    tags: ['Test'],
    description: 'Test',
  },

  handler: async ({ session }) => {
    console.log(session)
    const result = domain.test.test(3);
    return { result };
  },
});
