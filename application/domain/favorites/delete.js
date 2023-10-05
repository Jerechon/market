async (userId, productId) => {
  await db.favorites.delete({
    where: {
      id: {
        productId,
        userId,
      },
    },
  });
};
