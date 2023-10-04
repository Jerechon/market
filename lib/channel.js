'use strict'

const { client, subscriber } = require('./redis.js')

class Channel {
  constructor(client, subscriber) {
    this.client = client
    this.subscriber = subscriber
  }

  async pub(data) {
    await this.client.publish('system', JSON.stringify(data))
  }

  sub(callback) {
    this.subscriber.subscribe('system', async message => callback(JSON.parse(message)))
  }

  async pubOnline(data) {
    await this.client.publish('online', JSON.stringify(data))
  }

  subOnline(callback) {
    this.subscriber.subscribe('online', async message => callback(JSON.parse(message)))
  }

  async pubLog(data) {
    await this.client.publish('log', JSON.stringify(data))
  }

  subLog(callback) {
    this.subscriber.subscribe('log', async message => callback(JSON.parse(message)))
  }

  async connect() {
    await this.subscriber.connect()
  }

  onError() {
    this.subscriber.on('error', err => console.error(err))
  }
}

module.exports = new Channel(client, subscriber)
