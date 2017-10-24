import {
  AliasAction,
  AuthorizationBuilder,
  GiftCard,
  InquiryType,
  ManagementBuilder,
  PaymentMethodType,
  ServicesConfig,
  ServicesContainer,
  TransactionReference,
  TransactionType,
} from "../";

export class GiftService {
  constructor(config: ServicesConfig) {
    ServicesContainer.configure(config);
  }

  public activate(amount?: number | string) {
    return (new AuthorizationBuilder(TransactionType.Activate)).withAmount(amount);
  }

  public addValue(amount?: number | string) {
    return (new AuthorizationBuilder(TransactionType.AddValue)).withAmount(amount);
  }

  public addAlias(phoneNumber: string) {
    return (new AuthorizationBuilder(TransactionType.Alias)).withAlias(AliasAction.Add, phoneNumber);
  }

  public balanceInquiry(type?: InquiryType) {
    return (new AuthorizationBuilder(TransactionType.Balance)).withBalanceInquiryType(type);
  }

  public charge(amount?: number | string) {
    return (new AuthorizationBuilder(TransactionType.Sale)).withAmount(amount);
  }

  public create(phoneNumber: string) {
    return GiftCard.create(phoneNumber);
  }

  public deactivate() {
    return new AuthorizationBuilder(TransactionType.Deactivate);
  }

  public removeAlias(phoneNumber: string) {
    return (new AuthorizationBuilder(TransactionType.Alias)).withAlias(AliasAction.Delete, phoneNumber);
  }

  public replaceWith(newCard: GiftCard) {
    return (new AuthorizationBuilder(TransactionType.Replace)).withReplacementCard(newCard);
  }

  public reverse(amount?: number | string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.Gift;
    return (new AuthorizationBuilder(TransactionType.Reversal))
      .withAmount(amount)
      .withPaymentMethod(ref);
  }

  public rewards(amount?: number | string) {
    return (new AuthorizationBuilder(TransactionType.Reward)).withAmount(amount);
  }

  public void(transactionId: string) {
    const ref = new TransactionReference();
    ref.paymentMethodType = PaymentMethodType.Gift;
    ref.transactionId = transactionId;
    return (new ManagementBuilder(TransactionType.Void))
      .withPaymentMethod(ref);
  }
}
