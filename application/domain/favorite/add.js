async (userId, productId) => {
  await db.favorite.create({
    data: {
      productId,
      userId,
    },
  });
};
