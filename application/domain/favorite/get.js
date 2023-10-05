async userId => {
  const products = await db.product.findMany({
    where: {
      Favorite: {
        some: {
          userId,
        },
      },
    },
  });

  return products;
};
