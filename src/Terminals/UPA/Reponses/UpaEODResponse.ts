import {
  GatewayProvider,
  IDeviceResponse,
  IEODResponse,
  ISAFResponse,
  NotImplementedError,
} from "../../../../src";

export class UpaEODResponse implements IEODResponse {
  public status: string;
  public command: string;
  public version = "";
  public deviceResponseCode: string;
  public deviceResponseText: string;
  public deviceResponseMessage?: string;
  public referenceNumber = "";
  public ecrId?: string;
  public requestId?: string;
  public batchId?: number;
  public gatewayResponseCode?: number;
  public gatewayResponseMessage?: string;
  public respDateTime?: string;
  public multipleMessage?: string;

  // Sub-response slots defined by IEODResponse. UPA does not return these
  // as structured objects in the EOD payload (§12.4.13 packs any host
  // sub-messages into `multipleMessage`), so they stay undefined by
  // default and are exposed as writable properties so integrators can
  // stitch them in from follow-up calls if needed.
  public attachmentResponse?: IDeviceResponse;
  public batchCloseResponse?: IDeviceResponse;
  public emvOfflineDeclineResponse?: IDeviceResponse;
  public emvPDLResponse?: IDeviceResponse;
  public emvTransactionCertificationResponse?: IDeviceResponse;
  public heartBeatResponse?: IDeviceResponse;
  public reversalResponse?: IDeviceResponse;
  public safResponse?: ISAFResponse;
  public batchReportResponse?: IDeviceResponse;
  public attachmentResponseText?: string;
  public batchCloseResponseText?: string;
  public emvOfflineDeclineResponseText?: string;
  public emvPDLResponseText?: string;
  public emvTransactionCertificationResponseText?: string;
  public heartBeatResponseText?: string;
  public reversalResponseText?: string;
  public safResponseText?: string;
  public batchReportResponseText?: string;

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
      this.ecrId = response?.EcrId ?? response?.ecrId;
      this.requestId = response?.requestId ?? response?.RequestId;
      this.deviceResponseCode = this.normalizeDeviceResponseCode(
        cmdResult?.errorCode,
        jsonResponse.action?.result_code,
      );
      this.deviceResponseText = this.status;
      this.deviceResponseMessage = cmdResult?.errorMessage ?? "";

      const responseData = response?.data;
      if (responseData) {
        this.multipleMessage = responseData.multipleMessage;
        const host = responseData.host;
        if (host) {
          this.referenceNumber = host.referenceNumber ?? this.referenceNumber;
          this.respDateTime = host.respDateTime;
          this.batchId = host.batchId;
          this.gatewayResponseCode = host.gatewayResponseCode;
          this.gatewayResponseMessage = host.gatewayResponseMessage;
        }
      }
    } else {
      // Native UPA device response
      const data = jsonResponse?.data;
      const cmdResult = data?.cmdResult;
      this.deviceResponseText = cmdResult?.result ?? "";
      this.deviceResponseCode = cmdResult?.errorCode ?? "00";
      this.status = this.deviceResponseText;
      this.deviceResponseMessage = cmdResult?.errorMessage ?? "";
      this.command = data?.response ?? "";
      this.ecrId = data?.EcrId ?? data?.ecrId;
      this.requestId = data?.requestId ?? data?.RequestId;

      const innerData = data?.data;
      if (innerData) {
        this.referenceNumber =
          innerData.referenceNumber ?? this.referenceNumber;
        this.multipleMessage = innerData.multipleMessage;
        const host = innerData.host;
        if (host) {
          this.referenceNumber = host.referenceNumber ?? this.referenceNumber;
          this.respDateTime = host.respDateTime;
          this.batchId = host.batchId;
          this.gatewayResponseCode = host.gatewayResponseCode;
          this.gatewayResponseMessage = host.gatewayResponseMessage;
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
