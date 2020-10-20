import { TransactionReportBuilder, TransactionSummary } from "../";
export declare class ReportingService {
    static activity(): TransactionReportBuilder<TransactionSummary[]>;
    static transactionDetail(transactionId?: string): TransactionReportBuilder<TransactionSummary>;
}
