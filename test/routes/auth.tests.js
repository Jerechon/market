'use strict'

// const { test } = require('tap')
// const { build } = require('../helper')

// let testAccessToken = ''
// let testRefreshToken = ''

// test('Успешная отправка смс кода', async t => {
//   const app = await build(t)

//   const response = await app.inject({
//     method: 'POST',
//     url: '/api/v1/auth/send-sms-code',
//     payload: {
//       phoneNumber: '+79915895264',
//       forceSend: false,
//     },
//   })

//   const testedPayload = new Set()
//   testedPayload.add('message')

//   t.equal(response.statusCode, 200)
//   t.same(response.json(), { message: 'Смс-код отправлен.' })
// })

// test('Не истекло ожидание до повторной отправки смс', async t => {
//   const app = await build(t)

//   const response = await app.inject({
//     method: 'POST',
//     url: '/api/v1/auth/send-sms-code',
//     payload: {
//       phoneNumber: '+79915895264',
//       forceSend: false,
//     },
//   })

//   const testedPayload = new Set()
//   testedPayload.add('error')
//   testedPayload.add('message')
//   testedPayload.add('data')

//   t.equal(response.statusCode, 412)
//   t.hasProps(JSON.parse(response.payload), testedPayload)
// })

// test('Успешная авторизация пользователя', async t => {
//   const app = await build(t)

//   const response = await app.inject({
//     method: 'POST',
//     url: '/api/v1/auth/verify-sms-code',
//     payload: {
//       phoneNumber: '+79915895264',
//       code: 1234,
//     },
//   })

//   const testedPayload = new Set()
//   testedPayload.add('token')
//   testedPayload.add('refreshToken')
//   testedPayload.add('user')

//   const { token } = JSON.parse(response.payload)

//   testAccessToken = `Bearer ${token}`

//   t.equal(response.statusCode, 200)
//   t.hasProps(JSON.parse(response.payload), testedPayload)
// })

// test('Получение профиля', async t => {
//   const app = await build(t)

//   const response = await app.inject({
//     method: 'GET',
//     url: '/api/v1/profile',
//     headers: {
//       authorization: testAccessToken,
//     },
//   })

//   const testedPayload = new Set()
//   testedPayload.add('user')

//   t.equal(response.statusCode, 200)
//   t.hasProps(JSON.parse(response.payload), testedPayload)
// })
