import axios from "axios";
import { Comment, Response } from "../type/response";
import { Headers } from "./headers";

export class DealabsApi {
  private readonly url: string;
  private readonly Headers: Headers;

  constructor(private readonly parameter: string) {
    this.Headers = new Headers();
    this.url = `https://www.dealabs.com/graphql/h/${parameter}/10`;
  }

  async getResponse(): Promise<Response> {
    const response = await axios.get<Response>(this.url, {
      headers: this.Headers.getHeaders(),
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
