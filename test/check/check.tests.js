const { test } = require('tap');
const { getDomain } = require('../helper.js');

test('Проверить выполнение скрипта', async t => {
  const domain = await getDomain();

  await domain.user.giveDiscounts();

  t.end();
});
