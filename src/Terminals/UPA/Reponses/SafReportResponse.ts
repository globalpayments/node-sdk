import {
  GatewayProvider,
  ITerminalReport,
  NotImplementedError,
  SummaryType,
  TransactionSummary,
} from "../../../../src";

export class SafSummaryResponse {
  public totalAmount?: number;
  public count?: number;
  public summaryType = SummaryType.Unknown;
  public transactions: TransactionSummary[] = [];
}

export class SafReport {
  public totalCount = 0;
  public totalAmount = 0;
  public approved?: Record<number, SafSummaryResponse>;
  public pending?: Record<number, SafSummaryResponse>;
  public declined?: Record<number, SafSummaryResponse>;
}

export class SafReportResponse implements ITerminalReport {
  public status = "";
  public command = "";
  public version = "";
  public deviceResponseCode = "";
  public deviceResponseText = "";
  public referenceNumber = "";
  public ecrId = "";
  public requestId = "";
  public multipleMessage = "";
  public reportResult?: SafReport;
  public reportType = "";
  public reportOutput = "";
  public deviceSerialNumber = "";

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
    this.ecrId = data.ecrId ?? data.EcrId ?? "";
    this.requestId = data.requestId ?? "";
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

    const responseData = data.data;
    if (!responseData) {
      return;
    }

    this.multipleMessage = responseData.multipleMessage ?? "";
    this.reportType = responseData.reportType ?? "";
    this.reportOutput = responseData.reportOutput ?? "";
    this.deviceSerialNumber = responseData.deviceSerialNumber ?? "";
    this.reportResult = new SafReport();
    const reportResult = this.reportResult;

    const safDetails = Array.isArray(responseData.SafDetails)
      ? responseData.SafDetails
      : [];

    safDetails.forEach((detail: Record<string, any>) => {
      const summary = new SafSummaryResponse();
      summary.totalAmount = this.toNumber(detail.SafTotal) ?? 0;
      summary.count = this.toNumber(detail.SafCount) ?? 0;
      summary.summaryType = this.mapSummaryType(detail.SafType);
      if (Array.isArray(detail.SafRecords)) {
        summary.transactions = detail.SafRecords.map(
          (record: Record<string, any>) => this.mapTransactionSummary(record),
        );
      } else {
        summary.transactions = [];
      }

      reportResult.totalAmount += summary.totalAmount;
      reportResult.totalCount += summary.count ?? 0;
      this.assignSummary(summary);
    });
  }

  private assignSummary(summary: SafSummaryResponse): void {
    if (!this.reportResult) {
      return;
    }

    if (summary.summaryType === SummaryType.Approved) {
      this.reportResult.approved = this.reportResult.approved ?? {};
      this.reportResult.approved[summary.summaryType] = summary;
      return;
    }

    if (summary.summaryType === SummaryType.Pending) {
      this.reportResult.pending = this.reportResult.pending ?? {};
      this.reportResult.pending[summary.summaryType] = summary;
      return;
    }

    this.reportResult.declined = this.reportResult.declined ?? {};
    this.reportResult.declined[summary.summaryType] = summary;
  }

  private mapTransactionSummary(
    record: Record<string, any>,
  ): TransactionSummary {
    const summary = new TransactionSummary();
    summary.transactionType = record.transactionType;
    summary.transactionId = record.transId;
    summary.terminalRefNumber = record.transId;
    summary.referenceNumber = record.referenceNumber;
    summary.safReferenceNumber = record.safReferenceNumber;
    summary.tranNo = record.tranNo;
    summary.gratuityAmount = record.tipAmount;
    summary.taxAmount = record.taxAmount;
    summary.amount = record.baseAmount;
    summary.authorizedAmount = record.authorizedAmount;
    summary.cardType = record.cardType;
    summary.maskedCardNumber = record.maskedPan;
    const transactionDate = this.toDate(record.transactionTime);
    if (transactionDate) {
      summary.transactionDate = transactionDate;
    }
    summary.authCode = record.approvalCode;
    summary.hostTimeout =
      record.hostTimeOut === true || record.hostTimeOut === "1";
    summary.entryMode = record.cardAcquisition;
    summary.status = record.responseCode;
    if (record.fallback !== undefined && record.fallback !== null) {
      summary.chipFallback =
        record.fallback === "1" || record.fallback === true;
    }
    return summary;
  }

  private mapSummaryType(safType?: string): SummaryType {
    switch (safType) {
      case "AUTHORIZED TRANSACTIONS":
        return SummaryType.Approved;
      case "PENDING TRANSACTIONS":
        return SummaryType.Pending;
      case "FAILED TRANSACTIONS":
      default:
        return SummaryType.Declined;
    }
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
