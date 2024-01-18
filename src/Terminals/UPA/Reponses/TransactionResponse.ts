import {
  ApplicationCryptogramType,
  GatewayProvider,
  ITerminalResponse,
  NotImplementedError,
} from "../../../../src";

export class TransactionResponse implements ITerminalResponse {
  public availableBalance?: number;
  public transactionId: string;
  public terminalRefNumber: string;
  public token: string;
  public cardBrandTransId: string;
  public signatureStatus: string;
  public signatureData: Buffer;
  public transactionType: string;
  public maskedCardNumber: string;
  public entryMethod: string;
  public authorizationCode: string;
  public transactionAmount: number;
  public amountDue: number;
  public balanceAmount: number;
  public cardBIN: string;
  public cardPresent: boolean;
  public expirationDate: string;
  public avsResponseCode: string;
  public avsResponseText: string;
  public cvvResponseCode: string;
  public cvvResponseText: string;
  public taxExempt: boolean;
  public taxExemptId: string;
  public ticketNumber: string;
  public paymentType: string;
  public applicationPreferredName: string;
  public applicationLabel: string;
  public applicationId: string;
  public applicationCryptogramType: ApplicationCryptogramType;
  public applicationCryptogram: string;
  public cardHolderVerificationMethod: string;
  public terminalVerificationResults: string;
  public merchantFee?: number;
  public status: string;
  public command: string;
  public version: string;
  public deviceResponseCode: string;
  public deviceResponseText: string;
  public responseCode: string;
  public responseText: string;
  public approvalCode: string;
  public tipAmount?: number;
  public baseAmount?: number;
  public cashBackAmount?: number;
  public referenceNumber: string;
  public cardHolderName: string;
  public requestId: string;

  constructor(jsonResponse: any) {
    if (this.isGpApiResponse(jsonResponse)) {
      this.requestId = this.transactionId = jsonResponse.id;
      this.deviceResponseText = jsonResponse.status;
      this.responseText = this.deviceResponseCode =
        jsonResponse.action.result_code;
      this.deviceResponseText = jsonResponse.status;
    } else {
      throw new NotImplementedError();
    }
  }

  private isGpApiResponse(jsonResponse: any): boolean {
    return !!(
      jsonResponse.provider && jsonResponse.provider === GatewayProvider.GpApi
    );
  }
}
