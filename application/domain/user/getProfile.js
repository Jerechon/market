async userId => {
  const profile = await db.user.findUnique({
    where: { id: userId },
    include: { addresses: true },
  });
  console.log(profile);
  return profile;
};
