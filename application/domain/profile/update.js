async (id, firstName, lastName, email) => {
  const profile = await db.user.update({
    data: {
      firstName,
      lastName,
      email,
    },
    where: {
      id,
    },
    include: {
      addresses: true,
    },
  });

  return profile;
};
