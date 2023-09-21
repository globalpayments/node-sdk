import { GatewayConfig } from "src/ServiceConfigs";
import {
  AuthorizationBuilder,
  ManagementBuilder,
  PaymentMethodType,
  ServicesContainer,
  TransactionReference,
  TransactionType,
} from "../";

export class CreditService {
  constructor(config: GatewayConfig, configName: string = 'default') {
    ServicesContainer.configureService(config, configName);
  }

  public authorize(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Auth).withAmount(amount);
  }

  public capture(transactionId: string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.Credit;
    ref.transactionId = transactionId;
    return new ManagementBuilder(TransactionType.Capture).withPaymentMethod(
      ref,
    );
  }

  public charge(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Sale).withAmount(amount);
  }

  public edit(transactionId?: string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.Credit;
    if (transactionId) {
      ref.transactionId = transactionId;
    }
    return new ManagementBuilder(TransactionType.Edit).withPaymentMethod(ref);
  }

  public refund(amount?: number | string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.Credit;
    return new AuthorizationBuilder(TransactionType.Refund)
      .withAmount(amount)
      .withPaymentMethod(ref);
  }

  public reverse(amount?: number | string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.Credit;
    return new AuthorizationBuilder(TransactionType.Reversal)
      .withAmount(amount)
      .withPaymentMethod(ref);
  }

  public verify() {
    return new AuthorizationBuilder(TransactionType.Verify);
  }

  public void(transactionId: string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.Credit;
    ref.transactionId = transactionId;
    return new ManagementBuilder(TransactionType.Void).withPaymentMethod(ref);
  }
}
