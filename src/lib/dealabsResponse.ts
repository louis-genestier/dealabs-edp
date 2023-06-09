import axios from "axios";
import { Comment, Response } from "../type/response";

export class DealabsResponse {
  private readonly url: string;

  constructor(private readonly parameter: string) {
    this.url = `https://www.dealabs.com/graphql/h/${parameter}/10`;
  }

  async getResponse(): Promise<Response> {
    const response = await axios.get<Response>(this.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1",
      },
    });
    return response.data;
  }

  getLastPage(response: Response): number {
    return response[0].data.comments.pagination.last;
  }

  getComments(response: Response): Comment[] {
    return response[0].data.comments.items || [];
  }
}
