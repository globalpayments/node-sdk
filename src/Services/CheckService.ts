import {
  AuthorizationBuilder,
  ManagementBuilder,
  PaymentMethodType,
  ServicesConfig,
  ServicesContainer,
  TransactionReference,
  TransactionType,
} from "../";

export class CheckService {
  constructor(config: ServicesConfig) {
    ServicesContainer.configure(config);
  }

  public charge(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Sale).withAmount(amount);
  }

  public void(transactionId: string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.ACH;
    ref.transactionId = transactionId;
    return new ManagementBuilder(TransactionType.Void).withPaymentMethod(ref);
  }
}
