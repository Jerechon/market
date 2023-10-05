({
  access: 'public',

  fastify: true,

  schema: {
    tags: ['Authorization'],
    description: 'Выдаёт токены доступа, верифицирует телефон',
    body: {
      type: 'object',
      additionalProperties: false,
      required: ['phoneNumber', 'code'],
      properties: {
        phoneNumber: {
          type: 'string',
        },
        code: { type: 'integer', minimum: 1000, maximum: 9999 },
      },
      examples: [
        {
          phoneNumber: '+79915895264',
          code: 1234,
        },
      ],
    },
  },
  handler: async (request, reply, Session) => {
    const { code, phoneNumber } = request.body;
    const { user } = await domain.auth.verifySmsCode({ code, phoneNumber });

    console.log({user})

    const session = Session.start(request, {
      userId: user.id,
    });

    await request.session.save();

    reply
      .setCookie('token', session.token, config.cookie)
      .code(200)
      .send({ token: session.token, user });
  },
});
