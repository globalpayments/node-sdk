import {
  AuthorizationBuilder,
  BuilderError,
  DccProcessor,
  DccRateData,
  DccRateType,
  EncryptionData,
  InquiryType,
  ManagementBuilder,
  PaymentMethodType,
  PaymentMethodUsageMode,
  ThreeDSecure,
  Transaction,
  TransactionType,
} from "../";
import {
  IAuthable,
  IBalanceable,
  IChargable,
  IEncryptable,
  IPrePayable,
  IRefundable,
  IReversable,
  ISecure3d,
  ITokenizable,
  IVerifyable,
} from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";

export abstract class Credit
  extends PaymentMethod
  implements
    IEncryptable,
    ITokenizable,
    IChargable,
    IAuthable,
    IRefundable,
    IReversable,
    IVerifyable,
    IPrePayable,
    IBalanceable,
    ISecure3d
{
  public encryptionData: EncryptionData;
  public paymentMethodType = PaymentMethodType.Credit;

  /**
   * The token value representing the card.
   *
   * For `TransactionModifier.EncryptedMobile` transactions, this value is the
   * encrypted payload from the mobile payment scheme.
   */
  public token: string;

  /**
   * The type of mobile device used in `Transaction.Modifier.EncryptedMobile`
   * transactions.
   */
  public mobileType: string;
  /**
   * Payment Source is the API or source of the cryptogram for WalletData.
   */
  public paymentSource: string;
  public cryptogram: string;
  public eci: string;

  public threeDSecure: ThreeDSecure;

  /**
   * Authorizes the payment method
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public authorize(amount?: string | number) {
    return new AuthorizationBuilder(TransactionType.Auth, this).withAmount(
      amount,
    );
  }

  /**
   * Authorizes the payment method and captures the entire authorized amount
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public charge(amount?: string | number) {
    return new AuthorizationBuilder(TransactionType.Sale, this).withAmount(
      amount,
    );
  }

  /**
   * Adds value to the payment method
   *
   * @param string|number amount Amount to add
   *
   * @return AuthorizationBuilder
   */
  public addValue(amount?: string | number) {
    return new AuthorizationBuilder(TransactionType.AddValue, this).withAmount(
      amount,
    );
  }

  /**
   * Inquires the balance of the payment method
   *
   * @param InquiryType inquiry Type of inquiry
   *
   * @return AuthorizationBuilder
   */
  public balanceInquiry(inquiry?: InquiryType) {
    return new AuthorizationBuilder(
      TransactionType.Balance,
      this,
    ).withBalanceInquiryType(inquiry);
  }

  /**
   * Refunds the payment method
   *
   * @param string|number amount Amount to refund
   *
   * @return AuthorizationBuilder
   */
  public refund(amount?: string | number) {
    return new AuthorizationBuilder(TransactionType.Refund, this).withAmount(
      amount,
    );
  }

  /**
   * Reverses the payment method
   *
   * @param string|number amount Amount to reverse
   *
   * @return AuthorizationBuilder
   */
  public reverse(amount?: string | number) {
    return new AuthorizationBuilder(TransactionType.Reversal, this).withAmount(
      amount,
    );
  }

  /**
   * Verifies the payment method
   *
   * @return AuthorizationBuilder
   */
  public verify() {
    return new AuthorizationBuilder(TransactionType.Verify, this);
  }

  /**
   * Tokenizes the payment method
   *
   * @return AuthorizationBuilder
   */
  public tokenize(
    verifyCard: boolean = true,
    usageMode: PaymentMethodUsageMode = PaymentMethodUsageMode.MULTIPLE,
  ) {
    if (verifyCard !== false) {
      verifyCard = true;
    }
    const type = verifyCard ? TransactionType.Verify : TransactionType.Tokenize;

    return new AuthorizationBuilder(type, this)
      .withRequestMultiUseToken(true)
      .withPaymentMethodUsageMode(usageMode);
  }

  /**
   * Updates the token expiry date with the values proced to the card object
   *
   * @returns boolean value indicating success/failure
   */
  public async updateTokenExpiry(): Promise<boolean> {
    if (!this.token) {
      throw new BuilderError("Token cannot be null");
    }

    await new ManagementBuilder(TransactionType.TokenUpdate)
      .withPaymentMethod(this)
      .execute();

    return true;
  }

  /**
   * Updates the payment token
   *
   * @returns ManagementBuilder
   */
  public updateToken(): ManagementBuilder {
    if (!this.token) {
      throw new BuilderError("Token cannot be null");
    }

    return new ManagementBuilder(TransactionType.TokenUpdate).withPaymentMethod(
      this,
    );
  }

  /**
   * Deletes the token associated with the current card object
   *
   * @returns boolean value indicating success/failure
   */
  public async deleteToken(): Promise<boolean> {
    if (!this.token) {
      throw new BuilderError("Token cannot be null");
    }

    await new ManagementBuilder(TransactionType.TokenDelete)
      .withPaymentMethod(this)
      .execute();

    return true;
  }

  /**
   * Detokenizes the payment method
   *
   * @returns result of the detokenization
   */
  public async detokenize(): Promise<Transaction> {
    if (!this.token) {
      throw new BuilderError("Token cannot be null or empty");
    }

    return await new ManagementBuilder(
      TransactionType.Detokenize,
      this,
    ).execute();
  }

  public getDccRate(dccRateType?: DccRateType, ccp?: DccProcessor) {
    const authBuilder = new AuthorizationBuilder(
      TransactionType.DccRateLookup,
      this,
    );

    if (dccRateType || ccp) {
      const dccRateData = new DccRateData();
      if (ccp) dccRateData.dccProcessor = ccp;
      if (dccRateType) dccRateData.dccRateType = dccRateType;
      authBuilder.withDccRateData(dccRateData);
    }

    return authBuilder;
  }
}
