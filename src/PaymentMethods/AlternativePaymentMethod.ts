import {
  AuthorizationBuilder,
  EncryptionData,
  NotImplementedError,
  PaymentMethodType,
  TransactionModifier,
  TransactionType,
} from "../../src";
import {
  IChargable,
  IEncryptable,
  IPaymentMethod,
  IPinProtected,
  IPrePayable,
  IRefundable,
  IReversable,
} from ".";

/* eslint-disable indent */
export class AlternativePaymentMethod
  implements
    IPaymentMethod,
    IPrePayable,
    IRefundable,
    IReversable,
    IChargable,
    IEncryptable,
    IPinProtected
{
  paymentMethodType = PaymentMethodType.APM;
  alternativePaymentMethodType: string;
  returnUrl: string;
  statusUpdateUrl: string;
  cancelUrl: string;
  descriptor: string;
  country: string;
  accountHolderName: string;
  providerReference: string;
  addressOverrideMode: string;
  pinBlock: string;
  encryptionData: EncryptionData;
  /* eslint-enable indent */

  constructor(alternativePaymentMethodType: string) {
    this.alternativePaymentMethodType = alternativePaymentMethodType;
  }

  charge(amount: string | number): AuthorizationBuilder {
    return new AuthorizationBuilder(TransactionType.Sale, this)
      .withModifier(TransactionModifier.AlternativePaymentMethod)
      .withAmount(amount);
  }

  authorize(amount: string | number): AuthorizationBuilder {
    return new AuthorizationBuilder(TransactionType.Auth, this)
      .withModifier(TransactionModifier.AlternativePaymentMethod)
      .withAmount(amount);
  }

  addValue(amount: string | number): AuthorizationBuilder {
    amount;
    throw new NotImplementedError();
  }

  refund(amount: string | number): AuthorizationBuilder {
    amount;
    throw new NotImplementedError();
  }

  reverse(amount: string | number): AuthorizationBuilder {
    amount;
    throw new NotImplementedError();
  }
}
