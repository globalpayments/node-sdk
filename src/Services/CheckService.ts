import { GatewayConfig } from "src/ServiceConfigs";
import {
  AuthorizationBuilder,
  ManagementBuilder,
  PaymentMethodType,
  ServicesContainer,
  TransactionReference,
  TransactionType,
} from "../";

export class CheckService {
  constructor(config: GatewayConfig, configName: string = "default") {
    ServicesContainer.configureService(config, configName);
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
