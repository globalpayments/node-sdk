import { BaseBuilder, Request, Transaction } from "src";
import { GatewayConfig } from "src/ServiceConfigs";

export interface IRequestBuilder {

  buildRequest(builder: BaseBuilder<Transaction>, config: GatewayConfig): Request;

  buildRequestFromJson(jsonRequest: any, config: GatewayConfig): void;

  canProcess(builder: BaseBuilder<Transaction>): boolean;
}
