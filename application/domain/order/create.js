async (userId, addressId) => {
  const products = await db.productsInBasket.findMany({
    where: { userId },
    include: {
      product: {
        select: {
          price: true,
        },
      },
    },
  });

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
        quantity: product.quantity,
      },
    });

    await db.order.update({
      data: {
        totalPrice: { increment: product.product.price * product.quantity },
      },
      where: {
        id: order.id,
        userId,
        addressId,
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
