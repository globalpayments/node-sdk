import { ReportType, TransactionReportBuilder, BatchHistoryReportBuilder, TransactionSummary, BatchHistory, Transaction, FindTransactionsBuilder } from "../";

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

  public static findTransactions(
    clientTransactionId: string
  ): FindTransactionsBuilder<Transaction[]> {
    return new FindTransactionsBuilder<Transaction[]>(
      ReportType.FindTransactions,
    ).withClientTransactionId(clientTransactionId);
  }
}
