import {
  Address,
  AgeIndicator,
  AuthenticationRequestType,
  AuthenticationSource,
  BuilderError,
  ChallengeRequestIndicator,
  MerchantDataCollection,
  MessageCategory,
  MessageVersion,
  MethodUrlCompletion,
  SdkInterface,
  SdkUiType,
  Secure3dVersion,
  StoredCredential,
  ThreeDSecure,
  TransactionModifier,
  TransactionType,
} from "../Entities";
import { SecureBuilder } from "./SecureBuilder";
import {
  GpApiConnector,
  GpEcomConnector,
  MobileData,
  PaymentMethod,
  ServicesContainer,
  Transaction,
} from "../";

export class Secure3dBuilder extends SecureBuilder<Transaction | ThreeDSecure> {
  public applicationId: string;
  public authenticationRequestType: AuthenticationRequestType;
  public challengeRequestIndicator: ChallengeRequestIndicator;
  public customerEmail: string;
  public decoupledFlowRequest: boolean;
  public decoupledFlowTimeout: number;
  public decoupledNotificationUrl: string;
  public encodedData: string;
  public ephemeralPublicKey: string;
  public maximumTimeout: number;
  public merchantData: MerchantDataCollection;
  public messageCategory: MessageCategory;
  public merchantInitiatedRequestType: AuthenticationRequestType;
  public messageVersion: MessageVersion;
  public methodUrlCompletion: MethodUrlCompletion;
  public payerAuthenticationResponse: string;
  public sdkInterface: SdkInterface;
  public sdkTransactionId: string;
  public sdkUiTypes: SdkUiType[];
  public threeDSecure: ThreeDSecure;
  public transactionModifier: TransactionModifier = TransactionModifier.None;
  public whitelistStatus: string;
  public enableExemptionOptimization: boolean;
  public mobileData: MobileData;
  public storedCredential: StoredCredential;

  constructor(private _transactionType: TransactionType) {
    super();
    this.authenticationSource = AuthenticationSource.Browser;
    this.authenticationRequestType =
      AuthenticationRequestType.PaymentTransaction;
    this.messageCategory = MessageCategory.PaymentAuthentication;
    this._transactionType = _transactionType;
  }

  get transactionType() {
    return this._transactionType;
  }

  getApplicationId(): string {
    return this.applicationId;
  }

  getAuthenticationRequestType(): AuthenticationRequestType {
    return this.authenticationRequestType;
  }

  getBillingAddress(): Address {
    return this.billingAddress;
  }

  getChallengeRequestIndicator(): ChallengeRequestIndicator {
    return this.challengeRequestIndicator;
  }

  getCustomerEmail(): string {
    return this.customerEmail;
  }

  getEncodedData(): string {
    return this.encodedData;
  }

  getEphemeralPublicKey(): string {
    return this.ephemeralPublicKey;
  }

  getMaximumTimeout(): number {
    return this.maximumTimeout;
  }

  getMerchantData(): MerchantDataCollection {
    return this.merchantData;
  }

  getMessageCategory(): MessageCategory {
    return this.messageCategory;
  }

  getMerchantInitiatedRequestType(): AuthenticationRequestType {
    return this.merchantInitiatedRequestType;
  }

  getMessageVersion(): MessageVersion {
    return this.messageVersion;
  }

  getMethodUrlCompletion(): MethodUrlCompletion {
    return this.methodUrlCompletion;
  }

  getPayerAuthenticationResponse(): string {
    return this.payerAuthenticationResponse;
  }

  getSdkInterface(): SdkInterface {
    return this.sdkInterface;
  }

  getSdkTransactionId(): string {
    return this.sdkTransactionId;
  }

  getSdkUiTypes(): SdkUiType[] {
    return this.sdkUiTypes;
  }

  getServerTransactionId(): string | null {
    return this.threeDSecure?.serverTransactionId || null;
  }

  getThreeDSecure(): ThreeDSecure {
    return this.threeDSecure;
  }

  getTransactionType(): TransactionType {
    return this._transactionType;
  }

  getVersion(): Secure3dVersion | null {
    return this.threeDSecure?.getVersion() || null;
  }

  getDecoupledFlowRequest(): boolean {
    return this.decoupledFlowRequest;
  }

  getDecoupledFlowTimeout(): number {
    return this.decoupledFlowTimeout;
  }

  getDecoupledNotificationUrl(): string {
    return this.decoupledNotificationUrl;
  }

  getWhitelistStatus(): string {
    return this.whitelistStatus;
  }

  hasMobileFields(): boolean {
    return (
      this.applicationId !== "" ||
      this.ephemeralPublicKey !== "" ||
      this.maximumTimeout !== 0 ||
      this.sdkTransactionId !== "" ||
      this.encodedData !== "" ||
      this.sdkInterface !== null ||
      this.sdkUiTypes !== null
    );
  }

  hasPriorAuthenticationData(): boolean {
    return (
      this.getPriorAuthenticationMethod() !== null ||
      this.getPriorAuthenticationTransactionId() !== "" ||
      this.getPriorAuthenticationTimestamp() !== null ||
      this.getPriorAuthenticationData() !== ""
    );
  }

  hasRecurringAuthData(): boolean {
    return (
      this.getMaxNumberOfInstallments() !== null ||
      this.getRecurringAuthorizationFrequency() !== null ||
      this.getRecurringAuthorizationExpiryDate() !== null
    );
  }

  hasPayerLoginData(): boolean {
    return (
      this.getCustomerAuthenticationData() !== "" ||
      this.getCustomerAuthenticationTimestamp() !== null ||
      this.getCustomerAuthenticationMethod() !== null
    );
  }

  withApplicationId(applicationId: string): this {
    this.applicationId = applicationId;
    return this;
  }

  withAuthenticationRequestType(value: AuthenticationRequestType): this {
    this.authenticationRequestType = value;
    return this;
  }

  withChallengeRequestIndicator(
    challengeRequestIndicator: ChallengeRequestIndicator,
  ): this {
    this.challengeRequestIndicator = challengeRequestIndicator;
    return this;
  }

  withCustomerEmail(value: string): this {
    this.customerEmail = value;
    return this;
  }

  withDecoupledFlowRequest(decoupledFlowRequest: boolean): this {
    this.decoupledFlowRequest = decoupledFlowRequest;
    return this;
  }

  withDecoupledFlowTimeout(decoupledFlowTimeout: number): this {
    this.decoupledFlowTimeout = decoupledFlowTimeout;
    return this;
  }

  withDecoupledNotificationUrl(decoupledNotificationUrl: string): this {
    this.decoupledNotificationUrl = decoupledNotificationUrl;
    return this;
  }

  withEncodedData(encodedData: string): this {
    this.encodedData = encodedData;
    return this;
  }

  withEphemeralPublicKey(ephemeralPublicKey: string): this {
    this.ephemeralPublicKey = ephemeralPublicKey;
    return this;
  }

  withMaximumTimeout(maximumTimeout: number): this {
    this.maximumTimeout = maximumTimeout;
    return this;
  }

  withMerchantData(value: MerchantDataCollection): this {
    this.merchantData = value;
    if (this.merchantData !== null) {
      if (this.threeDSecure === null) {
        this.threeDSecure = new ThreeDSecure();
      }
      this.threeDSecure.setMerchantData(value);
    }
    return this;
  }

  withMessageCategory(value: MessageCategory): this {
    this.messageCategory = value;
    return this;
  }

  withMerchantInitiatedRequestType(
    merchantInitiatedRequestType: AuthenticationRequestType,
  ): this {
    this.merchantInitiatedRequestType = merchantInitiatedRequestType;
    return this;
  }

  withMessageVersion(value: MessageVersion): this {
    this.messageVersion = value;
    return this;
  }

  withMethodUrlCompletion(value: MethodUrlCompletion): this {
    this.methodUrlCompletion = value;
    return this;
  }

  withPayerAuthenticationResponse(value: string): this {
    this.payerAuthenticationResponse = value;
    return this;
  }

  withSdkInterface(sdkInterface: SdkInterface): this {
    this.sdkInterface = sdkInterface;
    return this;
  }

  withSdkTransactionId(sdkTransactionId: string): this {
    this.sdkTransactionId = sdkTransactionId;
    return this;
  }

  withSdkUiTypes(sdkUiTypes: SdkUiType[]): this {
    this.sdkUiTypes = sdkUiTypes;
    return this;
  }

  withServerTransactionId(value: string): this {
    if (!this.threeDSecure) {
      this.threeDSecure = new ThreeDSecure();
    }
    this.threeDSecure.serverTransactionId = value;
    return this;
  }

  withThreeDSecure(threeDSecure: ThreeDSecure): this {
    this.threeDSecure = threeDSecure;
    return this;
  }

  withWhitelistStatus(whitelistStatus: boolean): this {
    this.whitelistStatus = whitelistStatus == true ? "TRUE" : "FALSE";
    return this;
  }

  withStoredCredential(storedCredential: StoredCredential): this {
    this.storedCredential = storedCredential;
    return this;
  }

  withEnableExemptionOptimization(value: boolean): this {
    this.enableExemptionOptimization = value;
    return this;
  }

  withMobileData(value: MobileData): this {
    this.mobileData = value;
    return this;
  }

  withPaymentMethod(value: PaymentMethod | null): this {
    this.paymentMethod = value;
    if (this.paymentMethod?.isSecure3d) {
      const secureEcom = this.paymentMethod.threeDSecure;
      if (secureEcom !== null) {
        this.threeDSecure = secureEcom;
      }
    }
    return this;
  }

  async execute(
    configName: string = "default",
    version: Secure3dVersion = Secure3dVersion.ANY,
  ): Promise<ThreeDSecure> {
    // TODO: Implement validations
    // parent::execute();
    super.execute();

    // Setup return object
    let rvalue = this.threeDSecure;
    if (!rvalue) {
      rvalue = new ThreeDSecure();
      rvalue.setVersion(version);
    }

    // Working version
    if (rvalue.getVersion()) {
      version = rvalue.getVersion();
    }

    // Get the provider
    const provider = ServicesContainer.instance().getSecure3d(
      configName,
      version,
    );
    if (
      version === Secure3dVersion.ONE &&
      (provider instanceof GpApiConnector ||
        provider instanceof GpEcomConnector)
    ) {
      throw new BuilderError(`3D Secure ${version} is no longer supported!`);
    }
    if (provider) {
      let canDowngrade = false;
      if (
        provider.getVersion() === Secure3dVersion.TWO &&
        version === Secure3dVersion.ANY &&
        !(
          provider instanceof GpEcomConnector ||
          provider instanceof GpApiConnector
        )
      ) {
        try {
          const oneProvider = ServicesContainer.instance().getSecure3d(
            configName,
            Secure3dVersion.ONE,
          );
          canDowngrade = !!oneProvider;
        } catch (exc) {
          // NOT CONFIGURED
        }
      }

      // Process the request, capture any exceptions which might have been thrown
      let response = null;
      try {
        response = await provider.processSecure3d(this);

        if (!response && canDowngrade) {
          return await this.execute(configName, Secure3dVersion.ONE);
        }
      } catch (exc) {
        // Check for not enrolled
        if (exc.responseCode !== null) {
          if (
            exc.responseCode === "110" &&
            provider.getVersion() === Secure3dVersion.ONE
          ) {
            return rvalue;
          }
          if (provider instanceof GpApiConnector) {
            throw exc;
          }
        } else if (
          canDowngrade &&
          this._transactionType === TransactionType.VerifyEnrolled
        ) {
          return await this.execute(configName, Secure3dVersion.ONE);
        } else {
          // Throw exception
          throw exc;
        }
      }

      // Check the response
      if (response) {
        switch (this._transactionType) {
          case TransactionType.VerifyEnrolled:
            if (response.threeDSecure) {
              rvalue = response.threeDSecure;
              if (["True", "Y", true].includes(rvalue.enrolled)) {
                rvalue.setAmount(this.getAmount());
                rvalue.setCurrency(this.getCurrency());
                rvalue.setOrderId(response.orderId);
                rvalue.setVersion(provider.getVersion());
              } else if (canDowngrade) {
                return this.execute(configName, Secure3dVersion.ONE);
              }
            } else if (canDowngrade) {
              return this.execute(configName, Secure3dVersion.ONE);
            }
            break;
          case TransactionType.InitiateAuthentication:
          case TransactionType.VerifySignature:
            rvalue.merge(response.threeDSecure);
            break;
        }
      }
    }

    return rvalue;
  }

  setupValidations(): void {
    this.validations
      .of("transactionType", TransactionType.VerifyEnrolled)
      .check("paymentMethod")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.VerifyEnrolled)
      .when("paymentMethod")
      .isNotNull()
      .check("paymentMethod")
      .isInstanceOf("Secure3d");

    this.validations
      .of("transactionType", TransactionType.VerifySignature)
      .with("version", Secure3dVersion.ONE as unknown as number)
      .check("threeDSecure")
      .isNotNull()
      .with("version", Secure3dVersion.ONE as unknown as number)
      .check("payerAuthenticationResponse")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.VerifySignature)
      .when("version")
      .isEqualTo(Secure3dVersion.TWO)
      .check("threeDSecure.serverTransactionId")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.InitiateAuthentication)
      .check("threeDSecure")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.InitiateAuthentication)
      .when("paymentMethod")
      .isNotNull()
      .check("paymentMethod")
      .isInstanceOf("Secure3d");

    this.validations
      .of("transactionType", TransactionType.InitiateAuthentication)
      .when("merchantInitiatedRequestType")
      .isNotNull()
      .check("merchantInitiatedRequestType")
      .isNotEqualTo(AuthenticationRequestType.PaymentTransaction);

    this.validations
      .of("transactionType", TransactionType.InitiateAuthentication)
      .when("accountAgeIndicator")
      .isNotNull()
      .check("accountAgeIndicator")
      .isNotEqualTo(AgeIndicator.NoAccount);

    this.validations
      .of("transactionType", TransactionType.InitiateAuthentication)
      .when("passwordChangeIndicator")
      .isNotNull()
      .check("passwordChangeIndicator")
      .isNotEqualTo(AgeIndicator.NoAccount);

    this.validations
      .of("transactionType", TransactionType.InitiateAuthentication)
      .when("shippingAddressUsageIndicator")
      .isNotNull()
      .check("shippingAddressUsageIndicator")
      .isNotEqualTo(AgeIndicator.NoAccount)
      .when("shippingAddressUsageIndicator")
      .isNotNull()
      .check("shippingAddressUsageIndicator")
      .isNotEqualTo(AgeIndicator.NoAccount);
  }
}
