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
  cvvResultCode: any;
  cvvResultText: any;
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

/**
 * Common shape of a single transaction row inside a terminal report
 * (SAF report, batch report, batch details, etc.). Kept intentionally
 * loose so implementations (e.g. `TransactionSummary`) satisfy it
 * structurally without inheritance.
 */
export interface ITerminalReportTransaction {
  transactionType?: string;
  transactionId?: string;
  referenceNumber?: string;
  safReferenceNumber?: string;
  terminalRefNumber?: string;
  tranNo?: string;
  authCode?: string;
  authorizedAmount?: string | number;
  amount?: string | number;
  gratuityAmount?: string | number;
  taxAmount?: string | number;
  settlementAmount?: string | number;
  cardType?: string;
  maskedCardNumber?: string;
  entryMode?: string;
  cardSwiped?: string;
  clerkId?: string;
  transactionDate?: Date;
  transactionStatus?: string;
  status?: string;
  issuerTransactionId?: string;
  gatewayResponseCode?: string;
  gatewayResponseMessage?: string;
  hostTimeout?: boolean;
  chipFallback?: boolean;
}

/**
 * Bucket of SAF records grouped by outcome (approved / pending / declined).
 */
export interface ISafSummaryResponse {
  totalAmount?: number;
  count?: number;
  summaryType?: number;
  transactions?: ITerminalReportTransaction[];
}

export interface ISAFResponse extends IDeviceResponse {
  totalCount?: number;
  totalAmount?: number;
  multipleMessage?: string;
  approved?: Record<number, ISafSummaryResponse>;
  pending?: Record<number, ISafSummaryResponse>;
  declined?: Record<number, ISafSummaryResponse>;
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
  requestId?: string;
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
