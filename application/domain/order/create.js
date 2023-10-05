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

  //TODO сделать через reduce
  let totalPrice = 0;

  for (const product of products) {
    totalPrice = product.product.price * product.quantity;
  }

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
