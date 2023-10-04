async categoryTitle => {
  const products = await db.product.findMany({
    where: { category: { title: categoryTitle } },
    include: { category: true },
  });
  return products;
};
