async () => {
  const products = await db.product.findMany();
  return products;
};
