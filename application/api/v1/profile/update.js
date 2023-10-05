({
  access: 'private',

  schema: {
    tags: ['Profile'],
    description: 'Обновить данные пользователя',
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['firstName', 'lastName', 'email'],
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
      },
      examples: [
        {
          firstName: 'Владислав',
          lastName: 'Рожко',
          email: 'vlad.ierehon@gmail.com',
        },
      ],
    },
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
                  additionalProperties: true,
                },
              },
            },
          },
        },
      },
    },
  },

  handler: async ({ session, firstName, lastName, email }) => {
    const profile = await domain.profile.update(session.userId, firstName, lastName, email);
    return { profile };
  },
});
