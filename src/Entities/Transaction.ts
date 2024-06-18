import {
  Card,
  CardIssuerResponse,
  GiftCard,
  ManagementBuilder,
  PayerDetails,
  PaymentMethodType,
  PaymentMethodUsageMode,
  StoredCredentialSequence,
  ThreeDSecure,
  TransactionModifier,
  TransactionReference,
  TransactionType,
} from "../";
import { PayFacResponseData } from "./ProFac/PayFacResponseData";
export class Transaction {
  public authorizedAmount: string;
  /**
   * The address verification service (AVS) address response code.
   */
  public avsAddressResponse: string;
  public balanceAmount: string;
  public pointsBalanceAmount: string;
  public cardBrandTransactionId: string;
  public commercialIndicator: string;
  public responseCode: string;
  public responseMessage: string;
  public transactionDescriptor: string;
  public referenceNumber: string;
  public recurringDataCode: string;
  public cvnResponseMessage: string;
  public cvnResponseCode: string;
  public cavvResponseCode: string;
  public multiCapture: boolean;
  public multiCapturePaymentCount: number;
  public multiCaptureSequence: StoredCredentialSequence;
  public cardLast4: string;
  public cardType: string;
  public avsResponseMessage: string;
  public avsResponseCode: string;
  public availableBalance: string;
  public transactionReference: TransactionReference;
  public token: string;
  public giftCard: GiftCard;
  public clientTransactionId: string;
  public timestamp: string;
  public batchId: string;
  public batchSeqNbr: string;
  public payFacData: PayFacResponseData;
  public payerDetails: PayerDetails;
  public fingerprint: string;
  public fingerprintIndicator: string;
  public tokenUsageMode: PaymentMethodUsageMode;
  public cardDetails: Card;
  public threeDSecure: ThreeDSecure;

  /**
   * Used for ACH transactions
   */
  public accountNumberLast4: string;
  public accountType: string;

  public cardIssuerResponse: CardIssuerResponse;

  get transactionId(): string {
    return this.transactionReference?.transactionId;
  }

  set transactionId(id: string) {
    if (!this.transactionReference) {
      this.transactionReference = new TransactionReference();
    }
    this.transactionReference.transactionId = id;
  }

  get paymentMethodType(): PaymentMethodType {
    if (this.transactionReference) {
      return this.transactionReference.paymentMethodType;
    }

    return PaymentMethodType.Credit;
  }

  set paymentMethodType(paymentMethodType: PaymentMethodType) {
    if (!(this.transactionReference instanceof TransactionReference)) {
      this.transactionReference = new TransactionReference();
    }

    this.transactionReference.paymentMethodType = paymentMethodType;
  }

  get authorizationCode(): string | null {
    if (this.transactionReference) {
      return this.transactionReference.authCode;
    }

    return null;
  }

  set authorizationCode(authCode: string) {
    if (!(this.transactionReference instanceof TransactionReference)) {
      this.transactionReference = new TransactionReference();
    }

    this.transactionReference.authCode = authCode;
  }

  public static fromId(
    transactionId: string,
    orderId?: string | PaymentMethodType,
    paymentMethodType = PaymentMethodType.Credit,
  ) {
    const transaction = new Transaction();
    transaction.transactionReference = new TransactionReference();
    transaction.transactionReference.transactionId = transactionId;

    if (
      orderId &&
      (typeof orderId === "string" ||
        Object.prototype.toString.call(orderId) === "[object String]")
    ) {
      transaction.transactionReference.orderId = orderId as string;
    } else if (orderId) {
      paymentMethodType = orderId as PaymentMethodType;
    }

    transaction.transactionReference.paymentMethodType = paymentMethodType;
    return transaction;
  }

  /**
   * Allows for a follow-up request to add an additional authorization
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public additionalAuth(amount?: string | number) {
    return new ManagementBuilder(TransactionType.Auth)
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);
  }

  /**
   * Allows for a follow-up request to add the transaction to an open batch
   *
   * @param string|number amount Amount to capture
   *
   * @return ManagementBuilder
   */
  public capture(amount?: string | number) {
    const builder = new ManagementBuilder(TransactionType.Capture)
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);

    if (this.multiCapture) {
      builder.withMultiCapture(
        this.multiCaptureSequence,
        this.multiCapturePaymentCount,
      );
    }

    return builder;
  }

  /**
   * Allows for a follow-up request to edit the transaction
   *
   * @return ManagementBuilder
   */
  public edit() {
    let builder = new ManagementBuilder(TransactionType.Edit).withPaymentMethod(
      this.transactionReference,
    );

    if (this.commercialIndicator) {
      builder = builder.withModifier(TransactionModifier.LevelII);
    }

    return builder;
  }

  public hold() {
    return new ManagementBuilder(TransactionType.Hold).withPaymentMethod(
      this.transactionReference,
    );
  }

  /**
   * Allows for a follow-up request to refund the transaction
   *
   * @param {string|number} amount Amount to refund
   *
   * @return ManagementBuilder
   */
  public refund(amount: string | number | null = null) {
    return new ManagementBuilder(TransactionType.Refund)
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);
  }

  public release() {
    return new ManagementBuilder(TransactionType.Release).withPaymentMethod(
      this.transactionReference,
    );
  }

  /**
   * Refresh the authorization associated with a transaction to get a more recent authcode or
   * reauthorize a transaction reversed in error.
   *
   * @param {string|number|null} amount Amount to reverse
   *
   * @return ManagementBuilder
   */
  public reauthorized(amount: string | number | null = null) {
    return new ManagementBuilder(TransactionType.Reauth)
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);
  }

  /**
   * Allows for a follow-up request to reverse the transaction
   *
   * @param string|number amount Amount to reverse
   *
   * @return ManagementBuilder
   */
  public reverse(amount: string | number | null = null) {
    return new ManagementBuilder(TransactionType.Reversal)
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);
  }

  /**
   * Allows for a follow-up request to void the transaction
   *
   * @return ManagementBuilder
   */
  public void() {
    return new ManagementBuilder(TransactionType.Void).withPaymentMethod(
      this.transactionReference,
    );
  }
}
