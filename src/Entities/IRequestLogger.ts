import { ClientRequestArgs, IncomingHttpHeaders } from "http";
import { GatewayResponse } from "../Gateways/GatewayResponse";

export interface IRequestLogger {
  requestSent(
    verb: string,
    endpoint: string,
    requestId: number,
    headers: ClientRequestArgs["headers"],
    data: any,
  ): void;

  responseReceived(
    response: GatewayResponse,
    requestId?: number,
  ): Promise<void>;

  responseError(
    e: Error,
    requestId: number,
    headers?: IncomingHttpHeaders,
  ): Promise<void>;
}
