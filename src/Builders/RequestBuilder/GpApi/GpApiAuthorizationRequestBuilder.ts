import {
  //   ApiError,
  AuthorizationBuilder,
  //   BankPaymentType,
  BaseBuilder,
  //   CaptureMode,
  //   CardType,
  //   Channel,
  //   CustomerDocument,
  //   DigitalWalletTokenFormat,
  //   EncryptionData,
  //   EncyptedMobileType,
  //   EntryMethod,
  //   GatewayProvider,
  GpApiConfig,
  GpApiRequest,
  IRequestBuilder,
  //   ManualEntryMethod,
  //   PayByLinkStatus,
  //   PaymentEntryMode,
  //   PaymentProvider,
  //   PaymentType,
  //   PhoneNumberType,
  Transaction,
  //   TransactionModifier,
  //   TransactionType,
} from "../../../../src";

export class GpApiAuthorizationRequestBuilder implements IRequestBuilder {
  private builder: BaseBuilder<Transaction>;

  /***
   * @param AuthorizationBuilder builder
   *
   * @return bool
   */
  public canProcess(builder: BaseBuilder<Transaction>): boolean {
    if (builder instanceof AuthorizationBuilder) {
      return true;
    }

    return false;
  }

  /**
   * @param BaseBuilder builder
   * @param GpApiConfig config
   * @return GpApiRequest|string
   */
  public buildRequest(builder: BaseBuilder<Transaction>, config: GpApiConfig) {
    this.builder = builder;
    config;

    this.builder;
    return new GpApiRequest("", "", "");
  }

  public buildRequestFromJson(jsonRequest: string, config: GpApiConfig) {
    // TODO: Implement buildRequestFromJson() method.
    jsonRequest;
    config;
  }
}
