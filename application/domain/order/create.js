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

  const totalPrice = products.reduce(
    (totalPrice, { product, quantity }) => totalPrice + product.price * quantity,
    0,
  );

  const orderProducts = products.map(product => {
    return {
      productId: product.productId,
      quantity: product.quantity,
    };
  });

  const order = await db.$transaction(async tx => {
    const order = await tx.order.create({
      data: {
        userId,
        addressId,
        totalPrice,
        products: {
          create: orderProducts,
        },
      },
    });

    await tx.productsInBasket.deleteMany({
      where: {
        userId,
      },
    });

    return order;
  });

  return order;
};
