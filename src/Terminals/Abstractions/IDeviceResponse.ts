import { ApplicationCryptogramType } from "../../../src";

export interface IDeviceResponse {
  status: string;
  command: string;
  version: string;
  deviceResponseCode: string;
  deviceResponseText: string;
  referenceNumber: string;
  toString(): string;
}

export interface ITerminalResponse extends IDeviceResponse {
  responseCode: string;
  responseText: string;
  transactionId: string;
  terminalRefNumber: string;
  availableBalance?: number;
  token?: string;
  signatureStatus?: string;
  signatureData?: Buffer;
  transactionType?: string;
  maskedCardNumber: string;
  entryMethod: string;
  authorizationCode: string;
  approvalCode: string;
  transactionAmount: number;
  amountDue?: number;
  balanceAmount?: number;
  cardHolderName?: string;
  cardBIN?: string;
  cardPresent?: boolean;
  expirationDate?: string;
  tipAmount?: number;
  cashBackAmount?: number;
  avsResponseCode?: string;
  avsResponseText?: string;
  cvvResponseCode?: string;
  cvvResponseText?: string;
  taxExempt?: boolean;
  taxExemptId?: string;
  ticketNumber?: string;
  paymentType: string;
  cardType?: string;
  cardGroup?: string;
  ebtType?: string;
  clerkId?: string;
  pinVerified?: string;
  fallback?: string;
  applicationPreferredName?: string;
  applicationLabel?: string;
  applicationId?: string;
  applicationCryptogramType?: ApplicationCryptogramType;
  applicationCryptogram?: string;
  cardHolderVerificationMethod?: string;
  terminalVerificationResults?: string;
  merchantFee?: number;
  storeAndForward?: number;
  safTransaction?: boolean;
  deviceSerialNumber?: string;
}

export interface ITerminalReport extends IDeviceResponse {
  batchId?: number;
  gatewayResponseCode?: number;
  gatewayResponseMessage?: string;
  respDateTime?: string;
  multipleMessage?: string;
}

export interface ISAFResponse extends IDeviceResponse {
  totalCount?: number;
  totalAmount?: number;
  multipleMessage?: string;
}

export interface IEODResponse extends IDeviceResponse {
  attachmentResponse?: IDeviceResponse;
  batchCloseResponse?: IDeviceResponse;
  emvOfflineDeclineResponse?: IDeviceResponse;
  emvPDLResponse?: IDeviceResponse;
  emvTransactionCertificationResponse?: IDeviceResponse;
  heartBeatResponse?: IDeviceResponse;
  reversalResponse?: IDeviceResponse;
  safResponse?: ISAFResponse;
  batchReportResponse?: IDeviceResponse;
  respDateTime?: string;
  batchId?: number;
  gatewayResponseCode?: number;
  gatewayResponseMessage?: string;
  attachmentResponseText?: string;
  batchCloseResponseText?: string;
  emvOfflineDeclineResponseText?: string;
  emvPDLResponseText?: string;
  emvTransactionCertificationResponseText?: string;
  heartBeatResponseText?: string;
  reversalResponseText?: string;
  safResponseText?: string;
  batchReportResponseText?: string;
}

export interface ISignatureResponse extends IDeviceResponse {
  signatureData?: Buffer;
  sigData?: string;
}
