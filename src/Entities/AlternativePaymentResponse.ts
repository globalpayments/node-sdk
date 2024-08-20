export class AlternativePaymentResponse {
  /**
   * bank account details
   */
  public bankAccount: string | null;

  /**
   * Account holder name of the customer’s account
   */
  public accountHolderName: string | null;

  /**
   * 2 character ISO country code
   */
  public country: string;

  /**
   * URL to redirect the customer to - only available in PENDING asynchronous transactions.
   * Sent there so merchant can redirect consumer to complete an interrupted payment.
   */
  public redirectUrl: number | string | null;

  /**
   * This parameter reflects what the customer will see on the proof of payment
   * (for example, bank statement record and similar). Also known as the payment descriptor
   */
  public paymentPurpose: string;

  /**
   *
   */
  public paymentMethod: string;

  /**
   * The provider reference
   */
  public providerReference: string;

  /**
   * The APM provider name
   */
  public providerName: string;

  public ack: string;
  public sessionToken: string;
  public correlationReference: string;
  public versionReference: string;
  public buildReference: string;
  public timeCreatedReference: string;
  public transactionReference: string;
  public secureAccountReference: string;
  public reasonCode: string;
  public pendingReason: string;
  public grossAmount: string;
  public paymentTimeReference: string;
  public paymentType: string;
  public paymentStatus: string;
  public type: string;
  public protectionEligibilty: string;
  public authStatus: string;
  public authAmount: string;
  public authAck: string;
  public authCorrelationReference: string;
  public authVersionReference: string;
  public authBuildReference: string;
  public authPendingReason: string;
  public authProtectionEligibilty: string;
  public authProtectionEligibiltyType: string;
  public authReference: string;
  public feeAmount: string;

  /* start region Alipay */
  public nextAction: string | null;
  public secondsToExpire: string | null;
  public qrCodeImage: string | null;
  /* end region */
}
