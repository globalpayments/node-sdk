/* eslint-disable indent */
import { ReportType, TransactionReportBuilder, TransactionSummary } from "../";

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
}
