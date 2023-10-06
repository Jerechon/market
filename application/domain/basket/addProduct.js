async ({ session, productId, quantity = 1 }) => {
  if (quantity <= 0) {
    throw new Error({ message: 'Неверное кол-во' });
  }

  await db.productsInBasket.upsert({
    where: {
      id: { productId, userId: session.userId },
    },
    create: {
      productId,
      userId: session.userId,
      quantity,
    },
    update: {
      quantity,
    },
  });
};
