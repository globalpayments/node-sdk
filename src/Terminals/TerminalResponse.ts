import { ApplicationCryptogramType } from "src";
import { DeviceResponse } from "./DeviceResponse";

export class TerminalResponse extends DeviceResponse {
  responseCode: string;
  responseText?: string;
  transactionId?: string;
  terminalRefNumber?: string;
  availableBalance?: number;
  token?: string;
  signatureStatus?: string;
  signatureData?: any;
  transactionType?: string;
  maskedCardNumber?: string;
  entryMethod?: string;
  authorizationCode?: string;
  approvalCode?: string;
  transactionAmount?: number;
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
  paymentType?: string;
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
  invoiceNbr?: string;
  constructor() {
    super();
    this.responseCode = "";
  }
}
