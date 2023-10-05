async () => {
  const categories = await db.category.findMany();
  return categories;
};
