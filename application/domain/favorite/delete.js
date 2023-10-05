async (userId, productId) => {
  await db.favorite.delete({
    where: {
      id: {
        productId,
        userId,
      },
    },
  });
};
