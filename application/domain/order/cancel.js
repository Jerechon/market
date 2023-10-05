async id => {
  const order = await db.order.findUnique({
    where: {
      id,
    },
  });

  if (order.status === 'PAID') {
    throw new Error({ message: 'Нельзя отменить оплаченный заказ' });
  }

  await db.order.update({
    data: {
      status: 'CANCELED',
    },
    where: {
      id,
    },
  });
};
