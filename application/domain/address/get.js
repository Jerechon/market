async userId => {
  const addresses = await db.address.findMany({
    where: {
      userId,
    },
  });

  return addresses;
};
