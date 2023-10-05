({
  access: 'private',

  schema: {
    tags: ['Order'],
    description: 'Получить список заказов',
  },

  handler: async ({ session }) => {
    const orders = await domain.order.get(session.userId);
    return { orders };
  },
});
