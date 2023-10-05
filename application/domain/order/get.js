async userId => {
  const orders = await db.order.findMany({
    where: {
      userId,
    },
    include: {
      address: true,
      products: true,
    },
  });

  return orders;
};
