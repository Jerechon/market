async (userId, adress) => {
  await db.address.create({ data: { userId, adress } });
};
