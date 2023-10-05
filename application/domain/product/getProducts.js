async filter => {
  if (filter === 'all') {
    const products = await db.product.findMany({
      include: { category: true },
    });
    return products;
  }

  const products = await db.product.findMany({
    where: { category: { title: filter } },
    include: { category: true },
  });
  return products;
};
