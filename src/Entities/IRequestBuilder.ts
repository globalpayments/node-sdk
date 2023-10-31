import { BaseBuilder, GatewayConfig, Request, Transaction } from "../../src";

export interface IRequestBuilder {
  buildRequest(
    builder: BaseBuilder<Transaction>,
    config: GatewayConfig,
  ): Request;

  buildRequestFromJson(jsonRequest: any, config: GatewayConfig): void;

  canProcess(builder: BaseBuilder<Transaction>): boolean;
}
