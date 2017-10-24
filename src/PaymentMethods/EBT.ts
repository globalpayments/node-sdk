import {
  AuthorizationBuilder,
  InquiryType,
  NotImplementedError,
  PaymentMethodType,
  TransactionType,
} from "../";
import {
  IBalanceable,
  IChargable,
  IPinProtected,
  IPrePayable,
  IRefundable,
  IReversable,
} from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";

export abstract class EBT extends PaymentMethod implements
  IBalanceable,
  IChargable,
  IRefundable,
  IReversable,
  IPrePayable,
  IPinProtected {
  public paymentMethodType: PaymentMethodType = PaymentMethodType.EBT;
  public pinBlock: string;

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
  public balanceInquiry(inquiry = InquiryType.Foodstamp) {
    return (new AuthorizationBuilder(TransactionType.Balance, this))
      .withBalanceInquiryType(inquiry)
      .withAmount(0);
  }

  public benefitWithdrawal(amount?: number | string) {
    return (new AuthorizationBuilder(TransactionType.BenefitWithDrawal, this))
      .withAmount(amount)
      .withCashBack(0);
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
  public reverse(_amount?: string | number): AuthorizationBuilder {
    throw new NotImplementedError();
  }
}
