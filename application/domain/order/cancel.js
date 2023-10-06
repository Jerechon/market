async id => {
  const order = await db.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    throw new Error({ message: 'Заказ не найден' });
  }

  if (order.status === constants.ORDER_STATUSES.PAID) {
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
