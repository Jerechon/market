const { test } = require('tap');
const { getDomain } = require('../../helper.js');

test('Проверить успешное выполнение теста', async t => {
  const domain = await getDomain();

  const number = 6;
  const result = domain.test.test(number);

  t.equal(result, number + 1, 'Проверить успешное увелечение на 1');
  t.end();
});