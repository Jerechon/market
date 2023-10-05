async (userId, address) => {
  await db.address.create({ data: { userId, address } });
};
