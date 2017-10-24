import {
  AuthorizationBuilder,
  GiftCard,
  ManagementBuilder,
  PaymentMethodType,
  TransactionModifier,
  TransactionReference,
  TransactionType,
} from "../";
export class Transaction {
  public authorizedAmount: string;
  public balanceAmount: string;
  public pointsBalanceAmount: string;
  public commercialIndicator: string;
  public responseCode: string;
  public responseMessage: string;
  public transactionDescriptor: string;
  public referenceNumber: string;
  public recurringDataCode: string;
  public cvnResponseMessage: string;
  public cvnResponseCode: string;
  public cavvResponseCode: string;
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

  get transactionId(): string {
    return this.transactionReference.transactionId;
  }

  public static fromId(transactionId: string, orderId?: string | PaymentMethodType, paymentMethodType = PaymentMethodType.Credit) {
    const transaction = new Transaction();
    transaction.transactionReference = new TransactionReference();
    transaction.transactionReference.transactionId = transactionId;

    if (orderId && (typeof orderId === "string" || Object.prototype.toString.call(orderId) === "[object String]")) {
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
    return (new AuthorizationBuilder(TransactionType.Auth))
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
    return (new ManagementBuilder(TransactionType.Capture))
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);
  }

  /**
   * Allows for a follow-up request to edit the transaction
   *
   * @return ManagementBuilder
   */
  public edit() {
    let builder = (new ManagementBuilder(TransactionType.Edit))
      .withPaymentMethod(this.transactionReference);

    if (this.commercialIndicator) {
      builder = builder.withModifier(TransactionModifier.LevelII);
    }

    return builder;
  }

  /**
   * Allows for a follow-up request to refund the transaction
   *
   * @param string|number amount Amount to refund
   *
   * @return ManagementBuilder
   */
  public refund(amount?: string | number) {
    return (new ManagementBuilder(TransactionType.Refund))
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
  public reverse(amount?: string | number) {
    return (new ManagementBuilder(TransactionType.Reversal))
      .withPaymentMethod(this.transactionReference)
      .withAmount(amount);
  }

  /**
   * Allows for a follow-up request to void the transaction
   *
   * @return ManagementBuilder
   */
  public void() {
    return (new ManagementBuilder(TransactionType.Void))
      .withPaymentMethod(this.transactionReference);
  }
}
