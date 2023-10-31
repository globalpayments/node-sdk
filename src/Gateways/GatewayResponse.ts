import { IncomingHttpHeaders } from "http";

export class GatewayResponse {
  public statusCode: number;

  public rawResponse: string;

  public headers: IncomingHttpHeaders;

  constructor(
    headers: IncomingHttpHeaders,
    rawResponse: string,
    statusCode: number | undefined,
  ) {
    this.headers = headers;
    this.rawResponse = rawResponse;
    this.statusCode = statusCode || 0;
  }
}
