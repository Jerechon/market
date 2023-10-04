'use strict';

const storage = require('./storage.js');

const TOKEN_LENGTH = 32;
const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHA_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const ALPHA = ALPHA_UPPER + ALPHA_LOWER;
const DIGIT = '0123456789';
const ALPHA_DIGIT = ALPHA + DIGIT;

const generateToken = () => {
  const base = ALPHA_DIGIT.length;
  let key = '';
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    const index = Math.floor(Math.random() * base);
    key += ALPHA_DIGIT[index];
  }
  return key;
};

class Session extends Map {
  constructor({ token, userId}) {
    super();
    this.userId = userId;
    this.token = token;
  }

  static start(client, sessionData) {
    if (client.session) return client.session;
    const token = generateToken();
    client.token = token;
    const session = new Session({ token, ...sessionData });
    client.session = session;
    storage.set(token, session);
    return session;
  }

  static async restore(client) {
    let sessionToken = undefined;
    const { cookies } = client;

    if (cookies) {
      sessionToken = cookies.token;
    }

    if (!sessionToken) {
      const { headers } = client;

      if (headers.authorization) {
        sessionToken = headers.authorization.replace('Bearer ', '');
      }
    }

    if (!sessionToken) {
      const { query } = client;
      sessionToken = query.accessToken;
    }

    if (!sessionToken) throw new Error('No session');
    try {
      const session = await storage.get(sessionToken);
      Object.setPrototypeOf(session, Session.prototype);
      client.token = sessionToken;
      client.session = session;
      return session;
    } catch (error) {
      throw new Error('No session');
    }
  }

  static delete(client) {
    const { token } = client;
    if (token) {
      client.token = undefined;
      client.session = null;
      storage.delete(token);
    }
  }

  save() {
    storage.save({
      userId: this.userId,
      token: this.token,
    });
  }
}

module.exports = Session;
