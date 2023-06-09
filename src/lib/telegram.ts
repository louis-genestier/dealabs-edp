import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";

export class Telegram {
  private readonly token = process.env.TELEGRAM_TOKEN!;
  private readonly chatId = process.env.TELEGRAM_CHAT_ID!;
  private bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(this.token);
  }

  async sendMessage(message: string): Promise<void> {
    if (message) {
      await this.bot.sendMessage(this.chatId, message);
    }
  }
}
