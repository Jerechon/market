'use strict'

/**
 * @see https://smsaero.ru/
 */

class SmsAero {
  email = process.env.SMS_AERO_MAIL
  token = process.env.SMS_AERO_TOKEN
  baseUrl = 'https://gate.smsaero.ru'
  credentials = Buffer.from(`${this.email}:${this.token}`).toString('base64')

  constructor(sign = '88date') {
    this.sign = sign
  }

  sendMessage(number, text) {
    return this._makeRequest({
      url: '/v2/sms/send',
      method: 'post',
      body: {
        number,
        text,
        sign: this.sign
      }
    })
  }

  checkStatus(id) {
    return this._makeRequest({
      url: `/v2/sms/status?id=${id}`,
      method: 'get'
    })
  }

  checkBalance() {
    return this._makeRequest({
      url: '/v2/balance',
      method: 'get'
    })
  }

  testAuthorization() {
    return this._makeRequest({
      url: '/v2/auth',
      method: 'get'
    })
  }

  getStatusName(status) {
    return {
      0: 'QUEUE',
      1: 'DELIVERED',
      2: 'NOT_DELIVERED',
      3: 'TRANSFERRED',
      4: 'WAITING',
      6: 'REJECTED',
      8: 'ON_MODERATION'
    }[status]
  }

  async _makeRequest({ method, url, body }) {
    const res = await fetch(`${this.baseUrl}${url}`, {
      body: JSON.stringify(body),
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.credentials}`
      }
    })

    const data = await res.json()

    if (res.ok) {
      return data
    }

    throw { error: { statusCode: 500, ...data } }
  }
}

module.exports = new SmsAero()
