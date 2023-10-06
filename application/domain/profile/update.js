async ({ session, firstName, lastName, email }) => {
  const profile = await db.user.update({
    data: {
      firstName,
      lastName,
      email,
    },
    where: {
      id: session.userId,
    },
    include: {
      addresses: true,
    },
  });

  return profile;
};
