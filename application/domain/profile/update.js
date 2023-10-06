async ({ userId, firstName, lastName, email }) => {
  const profile = await db.user.update({
    data: {
      firstName,
      lastName,
      email,
    },
    where: {
      id: userId,
    },
    include: {
      addresses: true,
    },
  });

  return profile;
};
