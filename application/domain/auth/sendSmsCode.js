async ({ phoneNumber }) => {
  let user = null;

  if (phoneNumber) {
    user = await db.user.findUnique({
      where: { phoneNumber },
    });
  }

  if (!user) {
    user = await db.user.create({
      data: {
        phoneNumber,
      },
    });
  }

  return user;
};
