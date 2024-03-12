import {
  BaseBuilder,
  GatewayConfig,
  ReportBuilder,
  Request,
  Transaction,
  TransactionSummary,
} from "../../src";

export interface IRequestBuilder {
  buildRequest(
    builder: BaseBuilder<Transaction> | ReportBuilder<TransactionSummary>,
    config: GatewayConfig,
  ): Request;

  buildRequestFromJson(jsonRequest: any, config: GatewayConfig): void;

  canProcess(
    builder: BaseBuilder<Transaction> | ReportBuilder<TransactionSummary>,
  ): boolean;
}
