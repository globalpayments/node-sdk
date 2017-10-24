import {
  IAuthable,
  IBalanceable,
  ICardData,
  IChargable,
  IEditable,
  IEncryptable,
  IPaymentMethod,
  IPinProtected,
  IPrePayable,
  IRefundable,
  IReversable,
  ITokenizable,
  ITrackData,
  IVerifyable,
  IVoidable,
  PaymentMethodType,
} from "../";

export abstract class PaymentMethod implements IPaymentMethod {
  public paymentMethodType: PaymentMethodType;
  [key: string]: any;

  get isAuthable() {
    return ((this as object) as IAuthable).authorize !== undefined;
  }

  get isBalanceable() {
    return ((this as object) as IBalanceable).balanceInquiry !== undefined;
  }

  get isCardData() {
    return (this.isTokenizable
        && ((this as object) as ITokenizable).token !== undefined
        || ((this as object) as ICardData).number !== undefined)
      && this.paymentMethodType !== PaymentMethodType.Gift;
  }

  get isChargable() {
    return ((this as object) as IChargable).charge !== undefined;
  }

  get isEditable() {
    return ((this as object) as IEditable).edit !== undefined;
  }

  get isEncryptable() {
    return ((this as object) as IEncryptable).encryptionData !== undefined;
  }

  get isPinProtected() {
    return ((this as object) as IPinProtected).pinBlock !== undefined;
  }

  get isPrePayable() {
    return ((this as object) as IPrePayable).addValue !== undefined;
  }

  get isRefundable() {
    return ((this as object) as IRefundable).refund !== undefined;
  }

  get isReversable() {
    return ((this as object) as IReversable).reverse !== undefined;
  }

  get isTokenizable() {
    return ((this as object) as ITokenizable).tokenize !== undefined;
  }

  get isTrackData() {
    return ((this as object) as ITrackData).value !== undefined
      && (((this as object) as ITrackData).entryMethod !== undefined
        || ((this as object) as IPinProtected).pinBlock !== undefined
        || ((this as object) as IEncryptable).encryptionData !== undefined);
  }

  get isVerifyable() {
    return ((this as object) as IVerifyable).verify !== undefined;
  }

  get isVoidable() {
    return ((this as object) as IVoidable).void !== undefined;
  }
}
