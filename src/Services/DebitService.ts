import { GatewayConfig } from "src/ServiceConfigs";
import {
  AuthorizationBuilder,
  PaymentMethodType,
  ServicesContainer,
  TransactionReference,
  TransactionType,
} from "../";

export class DebitService {
  constructor(config: GatewayConfig, configName: string = 'default') {
    ServicesContainer.configureService(config, configName);
  }

  public charge(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Sale).withAmount(amount);
  }

  public refund(amount?: number | string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.Debit;
    return new AuthorizationBuilder(TransactionType.Refund)
      .withAmount(amount)
      .withPaymentMethod(ref);
  }

  public reverse(amount?: number | string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.Debit;
    return new AuthorizationBuilder(TransactionType.Reversal)
      .withAmount(amount)
      .withPaymentMethod(ref);
  }
}
