import { RedisClientType, createClient } from "redis";
import "dotenv/config";
import { logger } from "./logger";

export class Redis {
  private readonly client: RedisClientType;
  private static instance: Redis;
  private readonly currentPageKey = "currentPage";
  private readonly lastCommentIdKey = "lastCommentId";
  private logger = logger;

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });
  }

  static async create(): Promise<Redis> {
    if (!this.instance) {
      this.instance = new Redis();
      await this.instance.connect();
    }
    return this.instance;
  }

  private async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getCurrentPage(): Promise<number | null> {
    const currentPage = await this.get(this.currentPageKey);
    return currentPage ? parseInt(currentPage) : null;
  }

  async setCurrentPage(page: number): Promise<void> {
    await this.set(this.currentPageKey, page);
  }

  async getLastCommentId(): Promise<string | null> {
    const lastCommentId = await this.get(this.lastCommentIdKey);
    return lastCommentId;
  }

  async setLastCommentId(commentId: string): Promise<void> {
    await this.set(this.lastCommentIdKey, commentId);
  }

  private async get(key: string): Promise<string | null> {
    const value = await this.client.get(key);
    return value;
  }

  private async set(key: string, value: string | number): Promise<void> {
    await this.client.set(key, value);
  }
}
