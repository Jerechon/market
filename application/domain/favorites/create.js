async (userId, productId) => {
  await db.favorites.create({
    data: {
      productId,
      userId,
    },
  });
};
