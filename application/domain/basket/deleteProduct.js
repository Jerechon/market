async (userId, productId) => {
  await db.productsInBasket.delete({
    where: {
      id: {
        productId,
        userId,
      },
    },
  });
};
