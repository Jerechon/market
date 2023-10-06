async ({ userId, productId, quantity = 1 }) => {
  if (quantity <= 0) {
    throw new Error({ message: 'Неверное кол-во' });
  }

  await db.productsInBasket.upsert({
    where: {
      id: { productId, userId },
    },
    create: {
      productId,
      userId,
      quantity,
    },
    update: {
      quantity,
    },
  });
};
