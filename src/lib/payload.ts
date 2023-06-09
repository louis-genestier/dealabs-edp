import { subtle } from "crypto";
import { payloadBase64 } from "../config";

export class Payload {
  private payload: [{ variables: { page: number } }];

  constructor(private page: number) {
    this.payload = JSON.parse(atob(payloadBase64));
    this.setPage();
  }

  public async generateParameter() {
    const encoded = new TextEncoder().encode(JSON.stringify(this.payload));
    const digest = await subtle.digest("SHA-256", encoded);
    return Array.from(new Uint8Array(digest))
      .map((t) => t.toString(16).padStart(2, "0"))
      .join("");
  }

  private setPage() {
    this.payload[0].variables.page = this.page;
  }
}
