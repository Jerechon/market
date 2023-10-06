async ({ userId, addressId, address }) => {
  await db.address.update({
    data: {
      address,
    },
    where: {
      userId,
      id: addressId,
    },
  });
};
