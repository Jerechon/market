({
  access: 'private',

  schema: {
    tags: ['Profile'],
    description: 'Получить данные пользователя',
    response: {
      200: {
        type: 'object',
        required: ['profile'],
        properties: {
          profile: {
            type: 'object',
            additionalProperties: false,
            required: ['id', 'phoneNumber', 'firstName', 'lastName', 'email', 'addresses'],
            properties: {
              id: { type: 'string' },
              phoneNumber: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' },
              addresses: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['address', 'id'],
                  properties: {
                    address: { type: 'string' },
                    id: { type: 'string' },
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
    const profile = await domain.profile.get(session.userId);
    return { profile };
  },
});
