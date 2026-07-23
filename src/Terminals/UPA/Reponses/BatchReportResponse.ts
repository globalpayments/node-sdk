import {
  GatewayProvider,
  ITerminalReport,
  NotImplementedError,
  TransactionSummary,
} from "../../../../src";
import { UpaMessageId } from "../Entities/UpaMessageId";

export class BatchTransactionResponse {
  public cardType = "";
  public totalAmount?: number;
  public totalCnt?: number;
  public creditCnt?: number;
  public creditAmt?: number;
  public debitCnt?: number;
  public debitAmt?: number;
  public saleCnt?: number;
  public saleAmt?: number;
  public returnCnt?: number;
  public returnAmt?: number;
  public totalGratuityAmt?: number;
}

export class BatchRecordResponse {
  public batchId?: number;
  public batchSeqNbr?: number;
  public batchStatus = "";
  public openUtcDateTime = "";
  public closeUtcDateTime = "";
  public openTnxId = "";
  public totalAmount?: number;
  public totalCnt?: number;
  public creditCnt?: number;
  public creditAmt?: number;
  public debitCnt?: number;
  public debitAmt?: number;
  public saleCnt?: number;
  public saleAmt?: number;
  public returnCnt?: number;
  public returnAmt?: number;
  public totalGratuityAmt?: number;
  public batchTransactions: BatchTransactionResponse[] = [];
  public transactionDetails: TransactionSummary[] = [];
}

export class BatchReportResponse implements ITerminalReport {
  public status = "";
  public command = "";
  public version = "";
  public deviceResponseCode = "";
  public deviceResponseText = "";
  public referenceNumber = "";
  public multipleMessage = "";
  public merchantName = "";
  public deviceSerialNumber = "";
  public batchRecord?: BatchRecordResponse;

  constructor(jsonResponse: any) {
    if (typeof jsonResponse === "string") {
      try {
        jsonResponse = JSON.parse(jsonResponse);
      } catch {
        throw new NotImplementedError("Invalid JSON string");
      }
    }

    this.version = this.extractVersion(jsonResponse);
    this.referenceNumber = this.extractReferenceNumber(jsonResponse);

    if (this.isGpApiResponse(jsonResponse)) {
      this.deviceResponseText = jsonResponse.status;
      this.deviceResponseCode = jsonResponse.action?.result_code || "";
    }

    const data = this.isGpApiResponse(jsonResponse)
      ? jsonResponse?.response
      : jsonResponse?.data;
    const cmdResult = data?.cmdResult;
    if (!data || !cmdResult) {
      return;
    }

    this.status = cmdResult.result ?? "";
    this.command = data.response ?? "";
    this.deviceResponseCode =
      cmdResult.errorCode ?? this.deviceResponseCode ?? "00";
    if (this.status === "Success") {
      this.deviceResponseText = this.status;
    } else {
      this.deviceResponseText = `Error: ${cmdResult.errorCode ?? ""} - ${
        cmdResult.errorMessage ?? ""
      }`;
    }

    if (this.status !== "Success") {
      return;
    }

    const reportData = data.data;
    if (!reportData) {
      return;
    }

    this.merchantName = reportData.merchantName ?? "";
    this.multipleMessage = reportData.multipleMessage ?? "";
    this.deviceSerialNumber = reportData.deviceSerialNumber ?? "";

    const batchRecord = reportData.batchRecord;
    if (!batchRecord) {
      return;
    }

    this.batchRecord = {
      batchId: this.toNumber(batchRecord.batchId),
      batchSeqNbr: this.toNumber(batchRecord.batchSeqNbr),
      batchStatus: batchRecord.batchStatus,
      openUtcDateTime: batchRecord.openUtcDateTime,
      closeUtcDateTime: batchRecord.closeUtcDateTime,
      openTnxId: batchRecord.openTnxId,
      totalAmount: this.toNumber(batchRecord.totalAmount),
      totalCnt: this.toNumber(batchRecord.totalCnt),
      creditCnt: this.toNumber(batchRecord.creditCnt ?? batchRecord.credictCnt),
      creditAmt: this.toNumber(batchRecord.creditAmt),
      debitCnt: this.toNumber(batchRecord.debitCnt),
      debitAmt: this.toNumber(batchRecord.debitAmt),
      saleCnt: this.toNumber(batchRecord.saleCnt),
      saleAmt: this.toNumber(batchRecord.saleAmt),
      returnCnt: this.toNumber(batchRecord.returnCnt),
      returnAmt: this.toNumber(batchRecord.returnAmt),
      totalGratuityAmt: this.toNumber(batchRecord.totalGratuityAmt),
      batchTransactions: [],
      transactionDetails: [],
    };

    if (this.command === UpaMessageId.GET_BATCH_REPORT) {
      if (Array.isArray(batchRecord.batchTransactions)) {
        this.batchRecord.batchTransactions = batchRecord.batchTransactions.map(
          (transaction: Record<string, any>) => ({
            cardType: transaction.cardType,
            totalAmount: this.toNumber(transaction.totalAmount),
            totalCnt: this.toNumber(transaction.totalCnt),
            creditCnt: this.toNumber(transaction.creditCnt),
            creditAmt: this.toNumber(transaction.creditAmt),
            debitCnt: this.toNumber(transaction.debitCnt),
            debitAmt: this.toNumber(transaction.debitAmt),
            saleCnt: this.toNumber(transaction.saleCnt),
            saleAmt: this.toNumber(transaction.saleAmt),
            returnCnt: this.toNumber(transaction.returnCnt),
            returnAmt: this.toNumber(transaction.returnAmt),
            totalGratuityAmt: this.toNumber(transaction.totalGratuityAmt),
          }),
        );
      } else {
        this.batchRecord.batchTransactions = [];
      }
    }

    if (this.command === UpaMessageId.GET_BATCH_DETAILS) {
      if (Array.isArray(batchRecord.batchDetailRecords)) {
        this.batchRecord.transactionDetails =
          batchRecord.batchDetailRecords.map(
            (transaction: Record<string, any>) =>
              this.mapTransactionSummary(transaction),
          );
      } else {
        this.batchRecord.transactionDetails = [];
      }
    }
  }

  private mapTransactionSummary(
    transaction: Record<string, any>,
  ): TransactionSummary {
    const summary = new TransactionSummary();
    const transactionDate = this.toDate(transaction.transactionTime);
    if (transactionDate) {
      summary.transactionDate = transactionDate;
    }
    summary.authCode = transaction.approvalCode;
    summary.authorizedAmount = transaction.authorizedAmount;
    summary.cardType = transaction.cardType;
    summary.maskedCardNumber = transaction.maskedPAN ?? transaction.maskedPan;
    summary.referenceNumber = transaction.referenceNumber;
    summary.issuerTransactionId = transaction.gatewayTxnId;
    summary.clerkId = transaction.clerkId;
    summary.amount = transaction.requestedAmount;
    summary.gatewayResponseCode = transaction.responseCode;
    summary.gatewayResponseMessage = transaction.responseText;
    summary.transactionStatus = transaction.transactionStatus;
    summary.transactionType = transaction.transactionType;
    summary.gratuityAmount = transaction.tipAmount;
    summary.settlementAmount = transaction.settleAmount;
    summary.taxAmount = transaction.taxAmount;
    summary.cardSwiped = transaction.cardSwiped;
    return summary;
  }

  private toDate(value?: string): Date | undefined {
    if (!value) {
      return undefined;
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date;
  }

  private toNumber(value: unknown): number | undefined {
    if (value === undefined || value === null || value === "") {
      return undefined;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  private isGpApiResponse(jsonResponse: any): boolean {
    return !!(
      jsonResponse?.provider && jsonResponse.provider === GatewayProvider.GpApi
    );
  }

  private extractVersion(jsonResponse: any): string {
    return (
      jsonResponse?.version ??
      jsonResponse?.response?.version ??
      jsonResponse?.data?.version ??
      jsonResponse?.data?.data?.version ??
      ""
    );
  }

  private extractReferenceNumber(jsonResponse: any): string {
    return (
      jsonResponse?.referenceNumber ??
      jsonResponse?.response?.referenceNumber ??
      jsonResponse?.response?.data?.referenceNumber ??
      jsonResponse?.response?.data?.host?.referenceNumber ??
      jsonResponse?.data?.referenceNumber ??
      jsonResponse?.data?.data?.referenceNumber ??
      jsonResponse?.data?.data?.host?.referenceNumber ??
      ""
    );
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
