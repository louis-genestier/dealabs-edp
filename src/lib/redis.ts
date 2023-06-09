import { RedisClientType, createClient } from "redis";
import "dotenv/config";

export class Redis {
  private readonly client: RedisClientType;
  private static instance: Redis;

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
      console.error(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
    } catch (error) {
      console.error(error);
    }
  }

  async get(key: string): Promise<string | null> {
    const value = await this.client.get(key);
    return value;
  }

  async set(key: string, value: string | number): Promise<void> {
    await this.client.set(key, value);
  }
}
