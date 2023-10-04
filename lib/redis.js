const redis = require('redis');
const telegram = require('../application/lib/telegram');

const client = redis.createClient(6379, '127.0.0.1');
const subscriber = client.duplicate();

client.on('error', async err => {
  const message = 'Ошибка при подключении redis';
  console.log(message, err);
  await telegram.sendMessage(message);
});

module.exports = { client, subscriber };
