import { ReportBuilder } from "./ReportBuilder";
export declare class TransactionReportBuilder<T> extends ReportBuilder<T> {
    deviceId: string;
    endDate: Date;
    startDate: Date;
    transactionId: string;
    setupValidations(): void;
    withDeviceId(deviceId?: string): this;
    withEndDate(endDate?: Date): this;
    withStartDate(startDate?: Date): this;
    withTransactionId(transactionId?: string): this;
}
