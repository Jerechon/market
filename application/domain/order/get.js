async userId => {
  const orders = await db.order.findMany({
    where: {
      userId,
    },
    include: {
      products: true,
    },
  });

  return orders;
};
