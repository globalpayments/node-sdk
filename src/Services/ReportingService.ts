import { ReportType, TransactionReportBuilder, BatchHistoryReportBuilder, TransactionSummary, BatchHistory } from "../";

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

  public static batchHistory(): BatchHistoryReportBuilder<BatchHistory[]> {
    return new BatchHistoryReportBuilder<BatchHistory[]>(
      ReportType.BatchHistory,
    );
  }
}
