async (userId, id, address) => {
  await db.address.update({
    data: {
      address,
    },
    where: {
      userId,
      id,
    },
  });
};
