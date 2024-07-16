/* eslint-disable indent */
import {
  DepositSummary,
  DisputeSummary,
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

  public static disputeDetail(
    disputeId: string,
  ): TransactionReportBuilder<DisputeSummary> {
    return new TransactionReportBuilder<DisputeSummary>(
      ReportType.DisputeDetail,
    ).withDisputeId(disputeId);
  }

  public static findDisputesPaged(
    page: number,
    pageSize: number,
  ): TransactionReportBuilder<PagedResult> {
    return new TransactionReportBuilder<PagedResult>(
      ReportType.FindDisputesPaged,
    ).withPaging(page, pageSize);
  }

  public static documentDisputeDetail(
    disputeId: string | null,
  ): TransactionReportBuilder<PagedResult> {
    return new TransactionReportBuilder<PagedResult>(
      ReportType.DocumentDisputeDetail,
    ).withDisputeId(disputeId);
  }

  public static settlementDisputeDetail(
    settlementDisputeId: string,
  ): TransactionReportBuilder<DisputeSummary> {
    return new TransactionReportBuilder<DisputeSummary>(
      ReportType.SettlementDisputeDetail,
    ).withSettlementDisputeId(settlementDisputeId);
  }

  public static findSettlementDisputesPaged(
    page: number,
    pageSize: number,
  ): TransactionReportBuilder<PagedResult> {
    return new TransactionReportBuilder<PagedResult>(
      ReportType.FindSettlementDisputesPaged,
    ).withPaging(page, pageSize);
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
