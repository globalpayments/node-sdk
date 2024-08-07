import { BaseSummary, PaymentEntryMode } from ".";

export class TransactionSummary extends BaseSummary {
  public accountDataSource: string;
  public accountNumberLast4: string;
  public accountType: string;
  public aquirerReferenceNumber: string;
  public authCode: string;
  public authorizedAmount: string;
  public batchCloseDate: Date;
  public batchSequenceNumber: string;
  public brandReference: string;
  public cardHolderName: string;
  public cardSwiped: string;
  public cardType: string;
  public channel: string;
  public clerkId: string;
  public clientTransactionId: string;
  public convenienceAmt: string;
  public country: string;
  public deviceId: string;
  public depositStatus: string;
  public depositReference: string;
  public depositTimeCreated: Date | null;
  public entryMode: PaymentEntryMode;
  public issuerResponseCode: string;
  public issuerResponseMessage: string;
  public issuerTransactionId: string;
  public gatewayResponseCode: string;
  public gatewayResponseMessage: string;
  public gratuityAmount: string;
  public maskedCardNumber: string;
  public originalTransactionId: string;
  public orderId: string | null;
  public paymentType: string;
  public poNumber: string;
  public referenceNumber: string;
  public responseDate: Date;
  public serviceName: string;
  public settlementAmount: string;
  public shippingAmt: string;
  public siteTrace: string;
  public status: string;
  public taxAmount: string;
  public taxType: string;
  public transactionDate: Date;
  public transactionLocalDate: Date;
  public transactionId: string;
  public transactionStatus: string;
  public transactionType: string;
  public username: string;

  public description: string;
  public invoiceNumber: string;
  public customerId: string;
  public uniqueDeviceId: string;
  public transactionDescriptor: string;
  public giftCurrency: string;
  public maskedAlias: string;
  public paymentMethodKey: string;
  public scheduleId: string;
  public oneTimePayment: string;
  public recurringDataCode: string;
  public surchargeAmount: string;
  public fraudRuleInfo: string;
  public repeatCount: string;
  public emvChipCondition: string;
  public hasEmvTags: string;
  public hasEcomPaymentData: string;
  public hasLevelIII: string;
  public cavvResponseCode: string;
  public tokenPanLastFour: string;
  public companyName: string;
  public customerFirstName: string;
  public customerLastName: string;
  public debtRepaymentIndicator: string;
  public captureAmount: string;
  public fullyCaptured: string;
  public fingerprint: string;
  public fingerprintIndicator: string;
}
