import {
  GatewayProvider,
  ITerminalReport,
  NotImplementedError,
} from "../../../../src";

export class OpenTab {
  public authorizedAmount?: number;
  public cardType = "";
  public maskedPan = "";
  public transactionId = "";
  public clerkId = "";
}

export class OpenTabDetailsResponse implements ITerminalReport {
  public status = "";
  public command = "";
  public version = "";
  public deviceResponseCode = "";
  public deviceResponseText = "";
  public referenceNumber = "";
  public multipleMessage = "";
  public merchantName = "";
  public ecrId = "";
  public deviceSerialNumber = "";
  public openTabs: OpenTab[] = [];

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

    this.merchantName = responseData.merchantName ?? "";
    this.multipleMessage = responseData.multipleMessage ?? "";
    this.deviceSerialNumber = responseData.deviceSerialNumber ?? "";
    if (Array.isArray(responseData.OpenTabDetails)) {
      this.openTabs = responseData.OpenTabDetails.map(
        (tab: Record<string, any>) => ({
          authorizedAmount: this.toNumber(tab.authorizedAmount),
          cardType: tab.cardType,
          maskedPan: tab.maskedPan,
          transactionId: tab.referenceNumber,
          clerkId: tab.clerkId ?? "",
        }),
      );
    } else {
      this.openTabs = [];
    }
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
