import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { parse } from "node-html-parser";
import { logger } from "./logger";

export class Telegram {
  private readonly token = process.env.TELEGRAM_TOKEN!;
  private readonly chatId = process.env.TELEGRAM_CHAT_ID!;
  private bot: TelegramBot;
  private logger = logger;

  constructor() {
    this.bot = new TelegramBot(this.token);
  }

  async sendMessage(message: string): Promise<void> {
    if (message) {
      this.logger.info(`Sending message: ${message}`);
      await this.bot.sendMessage(this.chatId, this.formatMessage(message), {
        parse_mode: "HTML",
      });
    }
  }

  private formatMessage(message: string): string {
    const urls = this.getUrls(message);
    let formattedMessage = `<b>🚨 Nouveau poste 🚨</b>\n\n${this.formatPossibleUrls(
      urls
    )}\n\n<b>Message: </b>\n${message}`;
    formattedMessage = this.parseHTML(formattedMessage);

    return formattedMessage;
  }

  private getUrls(message: string): string[] {
    const content = parse(message);
    const urls: string[] = [];

    content.querySelectorAll("a").forEach((element) => {
      urls.push(element.getAttribute("title")!);
    });

    return urls;
  }

  private parseHTML(message: string): string {
    let parsedMessage = message
      .replace(/<br \/>/g, "\n")
      .replace(/<br>/g, "\n")
      .replace(/<a href="(.*)" title=(.*)>(.*)<\/a>/g, "$2")
      .replace(/<strong>(.*)<\/strong>/g, "<b>$1</b>")
      .replace(/<em>(.*)<\/em>/g, "<i>$1</i>")
      .replace(/<del>(.*)<\/del>/g, "<s>$1</s>")
      .replace(/<img\b[^>]*>/g, "")
      .replace(/\n*$/, "");

    return parsedMessage;
  }

  private formatPossibleUrls(urls: string[]): string {
    let formattedUrls = "<b>💫 Liens 💫</b>";

    urls.forEach((url) => {
      formattedUrls += `\n${url}`;
    });

    return formattedUrls;
  }
}
