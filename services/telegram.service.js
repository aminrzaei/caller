const Slimbot = require("slimbot");

class TelegramService {
  constructor() {
    this.TELEGRAM_MESSAGE = process.env.TELEGRAM_MESSAGE;
    this.TELEGRAM_BOT_API = process.env.TELEGRAM_BOT_API;
    this.TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    this.slimbot = new Slimbot(this.TELEGRAM_BOT_API);
  }

  sendMessage() {
    console.log("Sending Telegram Message ...");
    this.slimbot.sendMessage(this.TELEGRAM_CHAT_ID, this.TELEGRAM_MESSAGE);
    console.log("------------- Telegram ✔✔✔✔ -------------");
  }

  startPolling() {
    this.slimbot.startPolling();
  }
}

module.exports = TelegramService;
