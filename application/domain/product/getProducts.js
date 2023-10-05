async ({ filter }) => {
  if (filter.title === 'all') {
    const products = await db.product.findMany({
      include: { category: true },
    });
    return products;
  }

  const products = await db.product.findMany({
    where: { category: { title: filter.title } },
    include: { category: true },
  });
  return products;
};
