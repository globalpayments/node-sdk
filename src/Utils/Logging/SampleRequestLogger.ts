import { IRequestLogger } from "+./../../src";
import { GatewayResponse } from "src/Gateways/GatewayResponse";
import { Logger } from ".";
import { IncomingHttpHeaders } from "http";

export class SampleRequestLogger implements IRequestLogger {
  constructor(private readonly logger: Logger) {}

  public requestSent(
    verb: string,
    endpoint: string,
    requestId: number,
    headers: Record<string, string | number>,
    data: any,
  ): void {
    this.logger.info("Request/Response START", requestId, undefined, true);
    this.logger.info("Request START", requestId, undefined, true);
    this.logger.info("Request verb: " + verb, requestId, undefined, true);
    this.logger.info(
      "Request endpoint: " + endpoint,
      requestId,
      undefined,
      true,
    );
    this.logger.info("Request headers: ", requestId, headers, true);
    this.logger.info("Request body: \n" + data, requestId, undefined, true);
    this.logger.info("REQUEST END", requestId, undefined, true);
  }

  public async responseReceived(
    response: GatewayResponse,
    requestId: number,
  ): Promise<void> {
    this.logger.info("Response START", requestId, undefined, true);
    this.logger.info(
      "Status code: " + response.statusCode,
      requestId,
      undefined,
      true,
    );
    const rs = JSON.parse(JSON.stringify(response));
    this.logger.info(
      "Response body: \n" + rs.rawResponse,
      requestId,
      undefined,
      true,
    );
    this.logger.info("Response END", requestId, undefined, true);
    this.logger.info("Request/Response END", requestId, undefined, true);
    await this.logger.info(
      "=============================================",
      requestId,
      undefined,
      false,
    );
  }

  public async responseError(
    e: Error,
    requestId: number,
    headers: IncomingHttpHeaders,
  ): Promise<void> {
    this.logger.info("Exception START", requestId, undefined, true);
    this.logger.info("Response headers: ", requestId, headers, true);
    this.logger.info(
      "Error occurred while communicating with the gateway",
      requestId,
      undefined,
      true,
    );
    this.logger.info("Exception type: " + e.name, requestId, undefined, true);
    this.logger.info(
      "Exception message: \n" + e.message,
      requestId,
      undefined,
      true,
    );
    this.logger.info("Exception END", requestId, undefined, true);
    await this.logger.info(
      "=============================================",
      requestId,
      undefined,
      false,
    );
  }
}
