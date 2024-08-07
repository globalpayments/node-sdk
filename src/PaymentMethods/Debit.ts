import {
  AuthorizationBuilder,
  EncryptionData,
  PaymentMethodType,
  TransactionType,
} from "../";
import {
  IChargable,
  IEncryptable,
  IPinProtected,
  IPrePayable,
  IRefundable,
  IReversable,
} from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";

export abstract class Debit
  extends PaymentMethod
  implements
    IChargable,
    IEncryptable,
    IRefundable,
    IReversable,
    IPrePayable,
    IPinProtected
{
  public encryptionData: EncryptionData;
  public paymentMethodType: PaymentMethodType = PaymentMethodType.Debit;
  public pinBlock: string;

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
   * Authorizes the payment method
   *
   * @param string|number amount Amount to reverse
   *
   * @return AuthorizationBuilder
   */
  public authorize(amount?: string | number) {
    return new AuthorizationBuilder(TransactionType.Auth, this)
      .withAmount(amount)
      .withAmountEstimated(true);
  }
}
