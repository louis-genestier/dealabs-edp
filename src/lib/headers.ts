export class Headers {
  private userAgent: string;

  constructor() {
    this.userAgent = this.getRandomUserAgent();
  }

  public getRandomUserAgent(): string {
    const userAgents = [
      "Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
      "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.130 Mobile Safari/537.36",
      "Mozilla/5.0 (Android 13; Mobile; rv:68.0) Gecko/68.0 Firefox/114.0",
    ];

    return userAgents[Math.floor(Math.random() * userAgents.length)];
  }

  public getHeaders(): {
    "User-Agent": string;
    referer: string;
    Accept: string;
  } {
    return {
      "User-Agent": this.userAgent,
      referer:
        "https://www.dealabs.com/discussions/le-topic-des-erreurs-de-prix-1056379",
      Accept: "application/json, text/plain, */*",
    };
  }
}
