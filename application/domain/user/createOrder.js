async (userId, addressId) => {
  const products = await db.productsInBasket.findMany({ where: { userId } });

  if (products.length === 0) {
    throw new Error({ message: 'Сначала нужно добавить товар в корзину' });
  }

  const order = await db.order.create({
    data: {
      userId,
      addressId,
    },
  });

  for (const product of products) {
    await db.productsInOrder.create({
      data: {
        orderId: order.id,
        productId: product.productId,
      },
    });

    await db.productsInBasket.delete({
      where: {
        id: { productId: product.productId, userId },
      },
    });
  }

  return order;
};
