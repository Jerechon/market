async (userId, productId) => {
  await db.productsInBasket.create({ data: { userId, productId } });
};
