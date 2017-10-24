import {
  AuthorizationBuilder,
  EncryptionData,
  InquiryType,
  PaymentMethodType,
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
  ITokenizable,
  IVerifyable,
} from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";

export abstract class Credit extends PaymentMethod implements
  IEncryptable,
  ITokenizable,
  IChargable,
  IAuthable,
  IRefundable,
  IReversable,
  IVerifyable,
  IPrePayable,
  IBalanceable {
  public encryptionData: EncryptionData;
  public paymentMethodType = PaymentMethodType.Credit;
  public token: string;

  /**
   * Authorizes the payment method
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public authorize(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.Auth, this))
      .withAmount(amount);
  }

  /**
   * Authorizes the payment method and captures the entire authorized amount
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public charge(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.Sale, this))
      .withAmount(amount);
  }

  /**
   * Adds value to the payment method
   *
   * @param string|number amount Amount to add
   *
   * @return AuthorizationBuilder
   */
  public addValue(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.AddValue, this))
      .withAmount(amount);
  }

  /**
   * Inquires the balance of the payment method
   *
   * @param InquiryType inquiry Type of inquiry
   *
   * @return AuthorizationBuilder
   */
  public balanceInquiry(inquiry?: InquiryType) {
    return (new AuthorizationBuilder(TransactionType.Balance, this))
      .withBalanceInquiryType(inquiry);
  }

  /**
   * Refunds the payment method
   *
   * @param string|number amount Amount to refund
   *
   * @return AuthorizationBuilder
   */
  public refund(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.Refund, this))
      .withAmount(amount);
  }

  /**
   * Reverses the payment method
   *
   * @param string|number amount Amount to reverse
   *
   * @return AuthorizationBuilder
   */
  public reverse(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.Reversal, this))
      .withAmount(amount);
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
  public tokenize() {
    return this.verify()
      .withRequestMultiUseToken(true);
  }
}
