import { GatewayConfig } from "src/ServiceConfigs";
import {
  AuthorizationBuilder,
  InquiryType,
  PaymentMethodType,
  ServicesContainer,
  TransactionReference,
  TransactionType,
} from "../";

export class EBTService {
  constructor(config: GatewayConfig, configName: string = "default") {
    ServicesContainer.configureService(config, configName);
  }

  public balanceInquiry(type = InquiryType.Foodstamp) {
    return new AuthorizationBuilder(TransactionType.Balance)
      .withBalanceInquiryType(type)
      .withAmount(0);
  }

  public benefitWithdrawal(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.BenefitWithDrawal)
      .withAmount(amount)
      .withCashBack(0);
  }

  public charge(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Sale).withAmount(amount);
  }

  public refund(amount?: number | string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.EBT;
    return new AuthorizationBuilder(TransactionType.Refund)
      .withAmount(amount)
      .withPaymentMethod(ref);
  }
}
