import {
  GatewayProvider,
  ISAFResponse,
  NotImplementedError,
  SummaryType,
  TransactionSummary,
} from "../../../../src";

export class UpaSafSummaryResponse {
  public totalAmount?: number;
  public count?: number;
  public summaryType: SummaryType;
  public transactions: TransactionSummary[] = [];
}

export class UpaSAFResponse implements ISAFResponse {
  public status: string;
  public command: string;
  public version = "";
  public deviceResponseCode: string;
  public deviceResponseText: string;
  public deviceResponseMessage?: string;
  public referenceNumber = "";
  public totalCount?: number;
  public totalAmount?: number;
  public multipleMessage?: string;
  public approved?: Record<number, UpaSafSummaryResponse>;
  public pending?: Record<number, UpaSafSummaryResponse>;
  public declined?: Record<number, UpaSafSummaryResponse>;

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
      const response = jsonResponse.response;
      const cmdResult = response?.cmdResult;
      this.status = cmdResult?.result ?? jsonResponse.status ?? "";
      this.command = this.extractCommand(jsonResponse, response?.response);
      this.deviceResponseCode = this.normalizeDeviceResponseCode(
        cmdResult?.errorCode,
        jsonResponse.action?.result_code,
      );
      this.deviceResponseText = this.status;
      this.deviceResponseMessage = cmdResult?.errorMessage ?? "";

      const responseData = response?.data;
      if (responseData) {
        this.referenceNumber =
          responseData.referenceNumber ?? this.referenceNumber;
        this.multipleMessage = responseData.multipleMessage;

        const safDetails: any[] = responseData.SafDetails || [];
        safDetails.forEach((detail: any) => {
          this.totalAmount =
            (this.totalAmount || 0) + Number(detail.SafTotal || 0);
          this.totalCount =
            (this.totalCount || 0) + Number(detail.SafCount || 0);
        });
      }
    } else {
      // Native UPA device response
      const data = jsonResponse?.data;
      const cmdResult = data?.cmdResult;
      this.deviceResponseText = cmdResult?.result ?? "";
      this.deviceResponseCode = cmdResult?.errorCode ?? "00";
      this.status = this.deviceResponseText;
      this.deviceResponseMessage = cmdResult?.errorMessage ?? "";
      this.command = this.extractCommand(jsonResponse, data?.response);

      const innerData = data?.data;
      if (innerData) {
        this.referenceNumber =
          innerData.referenceNumber ?? this.referenceNumber;
        this.multipleMessage = innerData.multipleMessage;
        this.parseSafDetails(innerData.SafDetails);
      }
    }
  }

  private parseSafDetails(safDetails: any): void {
    const details = Array.isArray(safDetails) ? safDetails : [];

    details.forEach((detail: any) => {
      const summary = new UpaSafSummaryResponse();
      summary.totalAmount = this.toNumber(detail?.SafTotal) ?? 0;
      summary.count = this.toNumber(detail?.SafCount) ?? 0;
      summary.summaryType = this.mapSummaryType(detail?.SafType);
      const records: any[] = Array.isArray(detail?.SafRecords)
        ? detail.SafRecords
        : [];
      summary.transactions = records.map((record: any) =>
        this.mapTransactionSummary(record),
      );

      this.totalAmount = (this.totalAmount || 0) + (summary.totalAmount || 0);
      this.totalCount = (this.totalCount || 0) + (summary.count || 0);
      this.assignSummary(summary);
    });
  }

  private assignSummary(summary: UpaSafSummaryResponse): void {
    if (summary.summaryType === SummaryType.Approved) {
      this.approved = this.approved ?? {};
      this.approved[summary.summaryType] = summary;
      return;
    }

    if (summary.summaryType === SummaryType.Pending) {
      this.pending = this.pending ?? {};
      this.pending[summary.summaryType] = summary;
      return;
    }

    this.declined = this.declined ?? {};
    this.declined[summary.summaryType] = summary;
  }

  private mapTransactionSummary(record: any): TransactionSummary {
    const summary = new TransactionSummary();
    summary.transactionType = record?.transactionType;
    summary.transactionId = record?.transId;
    summary.referenceNumber = record?.referenceNumber;
    summary.gratuityAmount = record?.tipAmount;
    summary.taxAmount = record?.taxAmount;
    summary.amount = record?.baseAmount;
    summary.authorizedAmount = record?.authorizedAmount;
    summary.cardType = record?.cardType;
    summary.maskedCardNumber = record?.maskedPan;
    summary.authCode = record?.approvalCode;
    summary.entryMode = record?.cardAcquisition;
    summary.status = record?.responseCode;

    const transactionDate = this.toDate(record?.transactionTime);
    if (transactionDate) {
      summary.transactionDate = transactionDate;
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
      jsonResponse.provider && jsonResponse.provider === GatewayProvider.GpApi
    );
  }

  private normalizeDeviceResponseCode(
    cmdErrorCode?: string,
    actionResultCode?: string,
  ): string {
    if (cmdErrorCode) {
      return cmdErrorCode;
    }

    return actionResultCode === "SUCCESS" ? "00" : actionResultCode ?? "";
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

  private extractCommand(jsonResponse: any, fallback?: string): string {
    if (fallback && fallback !== "SendCommand") {
      return fallback;
    }

    return (
      jsonResponse?.requestType ??
      jsonResponse?.command ??
      jsonResponse?.response?.command ??
      jsonResponse?.data?.command ??
      jsonResponse?.data?.data?.command ??
      fallback ??
      ""
    );
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
