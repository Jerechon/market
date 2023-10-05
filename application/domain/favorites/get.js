async userId => {
  const products = await db.product.findMany({
    where: {
      Favorites: {
        some: {
          userId,
        },
      },
    },
  });

  return products;
};
