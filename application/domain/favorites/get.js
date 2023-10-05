async userId => {
  const favorites = await db.favorites.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
    },
  });

  return favorites;
};
