async ({ session, addressId, address }) => {
  await db.address.update({
    data: {
      address,
    },
    where: {
      userId: session.userId,
      id: addressId,
    },
  });
};
