({
  access: 'private',

  schema: {
    tags: ['Order'],
    description: 'Получить список заказов',
    response: {
      200: {
        type: 'object',
        required: ['orders'],
        properties: {
          orders: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['id', 'status', 'totalPrice', 'address', 'products'],
              properties: {
                id: { type: 'string' },
                status: { type: 'string' },
                totalPrice: { type: 'number' },
                address: {
                  type: 'object',
                  additionalProperties: false,
                  reauered: ['id', 'address'],
                  properties: {
                    id: { type: 'string' },
                    address: { type: 'string' },
                  },
                },
                products: {
                  type: 'array',
                  additionalProperties: false,
                  items: {
                    type: 'object',
                    required: ['productId', 'quantity'],
                    properties: {
                      productId: { type: 'string' },
                      quantity: { type: 'number' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  handler: async ({ session }) => {
    const orders = await domain.order.get(session.userId);
    return { orders };
  },
});
