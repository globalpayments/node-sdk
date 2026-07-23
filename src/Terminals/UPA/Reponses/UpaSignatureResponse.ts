import {
  GatewayProvider,
  ISignatureResponse,
  NotImplementedError,
} from "../../../../src";

export class UpaSignatureResponse implements ISignatureResponse {
  public status: string;
  public command: string;
  public version = "";
  public deviceResponseCode: string;
  public deviceResponseText: string;
  public referenceNumber = "";
  public signatureData?: Buffer;
  public sigData?: string;

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
      this.command = response?.response ?? "";
      this.deviceResponseText = this.status;
      this.deviceResponseCode = this.normalizeDeviceResponseCode(
        cmdResult?.errorCode,
        jsonResponse.action?.result_code,
      );

      const responseData = response?.data;
      if (responseData) {
        this.referenceNumber =
          responseData.referenceNumber ?? this.referenceNumber;
        const rawSigData = responseData.signatureData as string | undefined;
        if (rawSigData) {
          this.sigData = rawSigData;
          this.signatureData = Buffer.from(rawSigData, "base64");
        }
      }
    } else {
      // Native UPA device response
      const data = jsonResponse?.data;
      const cmdResult = data?.cmdResult;
      this.deviceResponseText = cmdResult?.result ?? "";
      this.deviceResponseCode = cmdResult?.errorCode ?? "00";
      this.status = this.deviceResponseText;
      this.command = data?.response ?? "";

      const innerData = data?.data;
      if (innerData) {
        this.referenceNumber =
          innerData.referenceNumber ?? this.referenceNumber;
        const rawSigData = innerData.signatureData as string | undefined;
        if (rawSigData) {
          this.sigData = rawSigData;
          this.signatureData = Buffer.from(rawSigData, "base64");
        }
      }
    }
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

  toString(): string {
    return JSON.stringify(this);
  }
}
