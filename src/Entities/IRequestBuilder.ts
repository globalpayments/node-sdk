import {
  BaseBuilder,
  GatewayConfig,
  ReportBuilder,
  Request,
  Secure3dBuilder,
  Transaction,
  TransactionSummary,
} from "../../src";

export interface IRequestBuilder {
  buildRequest(
    builder:
      | BaseBuilder<Transaction>
      | ReportBuilder<TransactionSummary>
      | Secure3dBuilder,
    config: GatewayConfig,
  ): Request;

  buildRequestFromJson(jsonRequest: any, config: GatewayConfig): void;

  canProcess(
    builder:
      | BaseBuilder<Transaction>
      | ReportBuilder<TransactionSummary>
      | Secure3dBuilder,
  ): boolean;
}
