async ({ phoneNumber, code }) => {
  const isValid = code === 1234;

  if (!isValid) {
    throw new Error({ message: 'Введён неправильный код' });
  }

  const user = await db.user.findUnique({
    where: { phoneNumber },
  });

  return { user };
};
