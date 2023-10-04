'use strict';

class Telegram {
  token = process.env.TELEGRAM_BOT_TOKEN;
  chatId = process.env.TELEGRAM_NOTIFICATION_CHAT_ID;
  errorChatId = process.env.TELEGRAM_ERROR_CHAT_ID;
  baseUrl = `https://api.telegram.org/bot${this.token}`;

  sendMessage(message) {
    return this._makeRequest({
      url: `/sendMessage?chat_id=${this.chatId}&parse_mode=html&text=${encodeURI(message)}`,
      method: 'post',
    });
  }

  sendError(error) {
    return this._makeRequest({
      url: `/sendMessage?chat_id=${this.errorChatId}&parse_mode=html&text=${encodeURIComponent(
        error,
      )}`,
      method: 'post',
    });
  }

  async _makeRequest({ method, url, body }) {
    const res = await fetch(`${this.baseUrl}${url}`, {
      body: JSON.stringify(body),
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    }

    throw { error: { statusCode: 500, ...data } };
  }
}

module.exports = new Telegram();
