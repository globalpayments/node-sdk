import {
  Address,
  ArgumentError,
  CardType,
  Channel,
  FraudFilterMode,
  IPaymentMethod,
  PayByLinkStatus,
  PaymentEntryMode,
  PaymentMethodName,
  PaymentMethodType,
  PaymentMethodUsageMode,
  PaymentProvider,
  PaymentType,
  ReasonCode,
  TransactionReportBuilder,
  TransactionStatus,
  TransactionType,
} from "../../../src";

export class SearchCriteriaBuilder<T> {
  public reportBuilder: TransactionReportBuilder<T>;
  public accountId?: string;
  public accountName?: string;
  public accountNumberLastFour?: string;
  public altPaymentStatus?: string;
  public amount?: number;
  public aquirerReferenceNumber?: string;
  public authCode?: string;
  public bankAccountNumber?: string;
  public bankRoutingNumber?: string;
  public batchId?: string;
  public batchSequenceNumber?: string;
  public brandReference?: string;
  public buyerEmailAddress?: string;
  public cardBrand?: string;
  public cardHolderFirstName?: string;
  public cardHolderLastName?: string;
  public cardHolderPoNumber?: string;
  public cardNumberFirstSix?: string;
  public cardNumberLastFour?: string;
  public cardTypes?: CardType[];
  public channel?: Channel;
  public checkFirstName?: string;
  public checkLastName?: string;
  public checkName?: string;
  public checkNumber?: string;
  public clerkId?: string;
  public clientTransactionId?: string;
  public country?: string;
  public currency?: string;
  public customerId?: string;

  public displayName?: string;
  public disputeId?: string;
  public disputeDocumentId?: string;
  public endBatchDate?: Date;
  public endDate?: string;
  public fromTimeLastUpdated?: string;
  public toTimeLastUpdated?: string;
  public endDepositDate?: Date;
  public endStageDate?: Date;
  public fullyCaptured?: boolean;
  public giftCurrency?: string;
  public giftMaskedAlias?: string;
  public hierarchy?: string;
  public invoiceNumber?: string;
  public issuerResult?: string;
  public issuerTransactionId?: string;
  public localTransactionEndTime?: Date;
  public localTransactionStartTime?: Date;
  public merchantId?: string;
  public name?: string;
  public oneTime?: boolean;
  public oderId?: string;
  public paymentEntryMode?: PaymentEntryMode;
  public paymentType?: PaymentType;
  public paymentMethodName?: PaymentMethodName;
  public paymentProvider?: PaymentProvider;
  public paymentMethod?: IPaymentMethod;
  public paymentMethodUsageMode?: PaymentMethodUsageMode;
  public paymentMethodKey?: string;
  public paymentMethodType?: PaymentMethodType;
  public referenceNumber?: string;
  public transactionType?: TransactionType[];
  public settlementAmount?: number;
  public settlementDisputeId?: string;
  public storedPaymentMethodId?: string;
  public storedPaymentMethodStatus?: string;
  public scheduleId?: string;
  public siteTrace?: string;
  public startBatchDate?: Date;
  public startDate?: string;
  public startDepositDate?: Date;
  public startStageDate?: Date;
  public systemHierarchy?: string;
  public tokenFirstSix?: string;
  public tokenLastFour?: string;
  public transactionStatus?: TransactionStatus;
  public uniqueDeviceId?: string;
  public username?: string;
  public timezone?: string;
  public actionId?: string;
  public actionType?: string;
  public resource?: string;
  public resourceStatus?: string;
  public resourceId?: string;
  public merchantName?: string;
  public appName?: string;
  public version?: string;
  public responseCode?: string;
  public httpResponseCode?: string;
  public payByLinkId: string;
  public description?: string;
  public expirationDate?: Date;
  public payByLinkStatus?: PayByLinkStatus;
  public address?: Address;
  public bankPaymentId?: string;
  public returnPii?: boolean;
  public riskAssessmentMode?: FraudFilterMode;
  public riskAssessmentReasonCode?: ReasonCode;

  constructor(reportBuilder: TransactionReportBuilder<T>) {
    this.reportBuilder = reportBuilder;
  }

  andWith(criteria: keyof this, value: any): this {
    if (this.hasOwnProperty(criteria)) {
      this[criteria] = value;
    }
    return this;
  }

  execute(configName: string = "default"): any {
    if (!this.reportBuilder) {
      throw new ArgumentError(
        `ReportBuilder is null in ${this.constructor.name}`,
      );
    }
    return this.reportBuilder.execute(configName);
  }
}
