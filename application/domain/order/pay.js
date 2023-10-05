async id => {
  const order = await db.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    throw new Error({ message: 'Заказ не найден' });
  }

  if (order.status === 'CANCELED') {
    throw new Error({ message: 'Нельзя оплатить отмененный заказ' });
  }

  await db.order.update({
    data: {
      status: 'PAID',
    },
    where: {
      id,
    },
  });
};
