/* eslint-disable indent */
import {
  DepositSummary,
  PagedResult,
  ReportType,
  TransactionReportBuilder,
  TransactionSummary,
} from "../";

export class ReportingService {
  public static activity(): TransactionReportBuilder<TransactionSummary[]> {
    return new TransactionReportBuilder<TransactionSummary[]>(
      ReportType.Activity,
    );
  }

  public static transactionDetail(
    transactionId?: string,
  ): TransactionReportBuilder<TransactionSummary> {
    return new TransactionReportBuilder<TransactionSummary>(
      ReportType.TransactionDetail,
    ).withTransactionId(transactionId);
  }

  public static findTransactions(): TransactionReportBuilder<
    TransactionSummary[]
  > {
    return new TransactionReportBuilder<TransactionSummary[]>(
      ReportType.FindTransactions,
    );
  }

  public static findTransactionsPaged(
    page: number,
    pageSize: number,
    transactionId?: string,
  ): TransactionReportBuilder<PagedResult> {
    return new TransactionReportBuilder<PagedResult>(
      ReportType.FindTransactionsPaged,
    )
      .withTransactionId(transactionId)
      .withPaging(page, pageSize);
  }

  public static findStoredPaymentMethodsPaged(
    page: number,
    pageSize: number,
  ): TransactionReportBuilder<TransactionSummary[]> {
    return new TransactionReportBuilder<TransactionSummary[]>(
      ReportType.FindStoredPaymentMethodsPaged,
    ).withPaging(page, pageSize);
  }

  public static storedPaymentMethodDetail(
    paymentMethodId: string,
  ): TransactionReportBuilder<TransactionSummary> {
    return new TransactionReportBuilder<TransactionSummary>(
      ReportType.StoredPaymentMethodDetail,
    ).withStoredPaymentMethodId(paymentMethodId);
  }

  public static findSettlementTransactionsPaged(
    page: number,
    pageSize: number,
    transactionId?: string,
  ): TransactionReportBuilder<PagedResult> {
    return new TransactionReportBuilder<PagedResult>(
      ReportType.FindSettlementTransactionsPaged,
    )
      .withTransactionId(transactionId)
      .withPaging(page, pageSize);
  }

  public static findDepositsPaged(
    page: number,
    pageSize: number,
  ): TransactionReportBuilder<PagedResult> {
    return new TransactionReportBuilder<PagedResult>(
      ReportType.FindDepositsPaged,
    ).withPaging(page, pageSize);
  }

  public static depositDetail(
    depositId: string,
  ): TransactionReportBuilder<DepositSummary> {
    return new TransactionReportBuilder<DepositSummary>(
      ReportType.DepositDetail,
    ).withDepositId(depositId);
  }
}
