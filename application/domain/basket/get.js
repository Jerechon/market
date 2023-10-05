async userId => {
  const basket = await db.productsInBasket.findMany({
    where: { userId },
    include: {
      product: {
        select: {
          category: true,
          id: true,
          title: true,
          description: true,
          price: true,
        },
      },
    },
  });
  return basket;
};
