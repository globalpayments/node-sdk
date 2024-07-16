import {
  Address,
  AddressType,
  AuthenticationSource,
  BrowserData,
  BuilderError,
  ChallengeRequestIndicator,
  ChallengeWindowSize,
  Channel,
  ColorDepth,
  CreditCardData,
  DeliveryTimeFrame,
  EnumMapping,
  GatewayError,
  GatewayProvider,
  GenerationUtils,
  MethodUrlCompletion,
  MobileData,
  SdkInterface,
  SdkUiType,
  Secure3dService,
  Secure3dStatus,
  Secure3dVersion,
  ServicesContainer,
  ShippingMethod,
  StoredCredential,
  StoredCredentialInitiator,
  StoredCredentialReason,
  StoredCredentialSequence,
  StoredCredentialType,
  ThreeDSecure,
  Transaction,
  TransactionStatus,
} from "../../../../src";
import { BaseGpApiTestConfig, GpApi3DSTestCards } from "../../../Data";
import { ThreeDSecureAcsClient } from "../ThreeDSecureAsClient";
import { AcsResponse } from "../AcsResponse";

const currency = "GBP";
const amount = "10.01";
const date = new Date();
let gatewayProvider: GatewayProvider;

const card = new CreditCardData();
card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
card.expYear = (date.getFullYear() + 1).toString();
card.cardHolderName = "James Mason";

const shippingAddress = new Address();
shippingAddress.streetAddress1 = "Apartment 852";
shippingAddress.streetAddress2 = "Complex 741";
shippingAddress.streetAddress3 = "no";
shippingAddress.city = "Chicago";
shippingAddress.postalCode = "5001";
shippingAddress.state = "IL";
shippingAddress.countryCode = "840";

const browserData = new BrowserData();
browserData.acceptHeader =
  "text/html,application/xhtml+xml,application/xml;q=9,image/webp,img/apng,*/*;q=0.8";
browserData.colorDepth = ColorDepth.TwentyFourBits;
browserData.ipAddress = "123.123.123.123";
browserData.javaEnabled = true;
browserData.javaScriptEnabled = true;
browserData.language = "en";
browserData.screenHeight = 1080;
browserData.screenWidth = 1920;
browserData.challengWindowSize = ChallengeWindowSize.Windowed600x400;
browserData.timeZone = "0";
browserData.userAgent =
  "Mozilla/5.0 (Windows NT 6.1; Win64, x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36";

beforeAll(() => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  gatewayProvider = config.gatewayProvider;
  ServicesContainer.configureService(config);
});

beforeEach(() => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1;
});

test("full cycle v2 frictionless", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const initAuth = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withBrowserData(browserData)
      .execute();

    expect(initAuth).toBeTruthy();
    initAuth instanceof ThreeDSecure &&
      expect(Secure3dStatus.SuccessAuthenticated).toBe(initAuth.status);
    expect("YES").toBe(initAuth.liabilityShift);

    const secureEcom2 = await Secure3dService.getAuthenticationData()
      .withServerTransactionId(secureEcom.serverTransactionId)
      .withAmount(amount)
      .execute();

    card.threeDSecure = secureEcom2;

    secureEcom2 instanceof ThreeDSecure &&
      expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);

    const transaction = await card
      .charge(amount)
      .withCurrency(currency)
      .execute();

    expect(transaction).toBeTruthy();
    expect("SUCCESS").toBe(transaction.responseCode);
    expect(TransactionStatus.CAPTURED).toBe(transaction.responseMessage);
  }
});

test("full cycle v2 frictionless failed", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_FAILED_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const initAuth = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withBrowserData(browserData)
      .execute();

    expect(initAuth).toBeTruthy();
    initAuth instanceof ThreeDSecure &&
      expect(Secure3dStatus.NotAuthenticated).toBe(initAuth.status);
    expect("YES").not.toBe(initAuth.liabilityShift);

    const secureEcom2 = await Secure3dService.getAuthenticationData()
      .withServerTransactionId(secureEcom.serverTransactionId)
      .withAmount(amount)
      .execute();

    card.threeDSecure = secureEcom2;

    secureEcom2 instanceof ThreeDSecure &&
      expect(Secure3dStatus.NotAuthenticated).toBe(secureEcom2.status);

    const transaction = await card
      .charge(amount)
      .withCurrency(currency)
      .execute();

    expect(transaction).toBeTruthy();
    expect("SUCCESS").toBe(transaction.responseCode);
    expect(TransactionStatus.CAPTURED).toBe(transaction.responseMessage);
  }
});

test("full cycle v2 frictionless with card tokenization", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const tokenizeResponse = await card.tokenize().execute();

  const tokenId = tokenizeResponse.token;
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  tokenizedCard.cardHolderName = "James Mason";

  const secureEcom = await Secure3dService.checkEnrollment(tokenizedCard)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);
  expect(secureEcom.payerAuthenticationRequest).toBeTruthy();

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const initAuth = await Secure3dService.initiateAuthentication(
      tokenizedCard,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withBrowserData(browserData)
      .execute();

    expect(initAuth).toBeTruthy();
    initAuth instanceof ThreeDSecure &&
      expect(Secure3dStatus.SuccessAuthenticated).toBe(initAuth.status);
    expect("YES").toBe(initAuth.liabilityShift);

    const secureEcom2 = await Secure3dService.getAuthenticationData()
      .withServerTransactionId(secureEcom.serverTransactionId)
      .withAmount(amount)
      .execute();

    card.threeDSecure = secureEcom2;

    secureEcom2 instanceof ThreeDSecure &&
      expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);

    const transaction = await card
      .charge(amount)
      .withCurrency(currency)
      .execute();

    expect(transaction).toBeTruthy();
    expect("SUCCESS").toBe(transaction.responseCode);
    expect(TransactionStatus.CAPTURED).toBe(transaction.responseMessage);
  }
});

test("full cycle v2 card holder enrolled challenge required", async () => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withBrowserData(browserData)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);

    expect(Secure3dStatus.ChallengeRequired).toBe(response.status);
    expect(response.payerAuthenticationRequest).toBeTruthy();
    expect(response.issuerAcsUrl).toBeTruthy();

    const authClient = new ThreeDSecureAcsClient(secureEcom.issuerAcsUrl);
    authClient.setGatewayProvider(gatewayProvider);
    const authResponse = await authClient.authenticate_v2(response);
    if (authResponse instanceof AcsResponse) {
      expect(authResponse.getStatus()).toBe(true);
      expect(authResponse.getMerchantData()).toBeTruthy();

      const secureEcom2 = await Secure3dService.getAuthenticationData()
        .withServerTransactionId(authResponse.getMerchantData())
        .withAmount(amount)
        .execute();
      card.threeDSecure = secureEcom2;

      secureEcom2 instanceof ThreeDSecure &&
        expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);

      const transaction = await card
        .charge(amount)
        .withCurrency(currency)
        .execute();

      expect(transaction).toBeTruthy();
      expect("SUCCESS").toBe(transaction.responseCode);
      expect(TransactionStatus.CAPTURED).toBe(transaction.responseMessage);
    }
  }
});

test("card holder enrolled challenge required v2 2", async () => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);
});

// Use as template
test("card holder enrolled challenge required v2 - with idempotency key", async () => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1;
  const idempotencyKey = GenerationUtils.getGuuid();

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  try {
    await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withIdempotencyKey(idempotencyKey)
      .withAmount(amount)
      .execute();
  } catch (e) {
    expect(e.responseCode).toBe("40039");
    expect(e.responseMessage.includes("Idempotency Key seen before")).toBe(
      true,
    );
    expect(e instanceof GatewayError).toBe(true);
  }
});

test("card holder enrolled challenge required v2 - with tokenized card", async () => {
  const response = await card.tokenize().execute();

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;
  tokenizedCard.cardHolderName = "James Mason";

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);
});

test("card holder enrolled challenge required v2 - all preference value", async () => {
  for (const value of Object.values(ChallengeRequestIndicator)) {
    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .withChallengeRequestIndicator(value)
      .execute();

    assertCheckEnrollment3DSV2(secureEcom);
  }
});

test("card holder enrolled challenge required v2 - stored credentials", async () => {
  const storedCredentials = new StoredCredential();
  storedCredentials.initiator = EnumMapping.mapStoredCredentialInitiator(
    gatewayProvider,
    StoredCredentialInitiator.Merchant,
  ) as StoredCredentialInitiator;
  storedCredentials.type = StoredCredentialType.INSTALLMENT;
  storedCredentials.sequence = StoredCredentialSequence.SUBSEQUENT;
  storedCredentials.reason = StoredCredentialReason.INCREMENTAL;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .withStoredCredential(storedCredentials)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);
});

test("card holder enrolled challenge required v2 - all sources", async () => {
  for (const value of Object.values(AuthenticationSource)) {
    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .withAuthenticationSource(value)
      .execute();

    assertCheckEnrollment3DSV2(secureEcom);
  }
});

test("card holder enrolled challenge required v2 - with null payment method", async () => {
  // below validation is not working on PHP and node has another error
  // this.validations
  //     .of("transactionType", TransactionType.VerifyEnrolled)
  //     .check("paymentMethod")
  //     .isNotNull();

  try {
    await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withPaymentMethod(null)
      .withAmount(amount)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(
      error.message.includes(
        "paymentMethod cannot be null for this transaction type.",
      ),
    ).toBe(true);
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("card holder enrolled frictionless v2", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);
});

test("card holder enrolled frictionless v2 - with idempotency key", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;
  const idempotencyKey = GenerationUtils.getGuuid();

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  try {
    await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withIdempotencyKey(idempotencyKey)
      .withAmount(amount)
      .execute();
  } catch (error) {
    expect("40039").toBe(error.responseCode);
    expect(error.responseMessage.includes("Idempotency Key seen before")).toBe(
      true,
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("card holder enrolled frictionless v2 - with tokenized card", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const response = await card.tokenize().execute();

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const secureEcom = await Secure3dService.checkEnrollment(tokenizedCard)
    .withCurrency(currency)
    .withAmount(amount)
    .withAuthenticationSource(AuthenticationSource.Browser)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);
});

test("card holder enrolled frictionless v2 - all preference values", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  for (const value of Object.values(ChallengeRequestIndicator)) {
    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .withChallengeRequestIndicator(value)
      .execute();

    assertCheckEnrollment3DSV2(secureEcom);
  }
});

test("card holder enrolled frictionless v2 - stored credentials", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const storedCredentials = new StoredCredential();
  storedCredentials.initiator = EnumMapping.mapStoredCredentialInitiator(
    gatewayProvider,
    StoredCredentialInitiator.Merchant,
  ) as StoredCredentialInitiator;
  storedCredentials.type = StoredCredentialType.INSTALLMENT;
  storedCredentials.sequence = StoredCredentialSequence.SUBSEQUENT;
  storedCredentials.reason = StoredCredentialReason.INCREMENTAL;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .withStoredCredential(storedCredentials)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);
});

test("card holder enrolled frictionless v2 - all sources", async () => {
  for (const value of Object.values(AuthenticationSource)) {
    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .withAuthenticationSource(value)
      .execute();

    assertCheckEnrollment3DSV2(secureEcom);
  }
});

test("card holder challenge required - post result", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (!(secureEcom instanceof Transaction)) {
    expect(Secure3dStatus.Enrolled).toBe(secureEcom?.enrolled);
    expect(Secure3dVersion.TWO).toBe(secureEcom.getVersion());
    expect(Secure3dStatus.Available).toBe(secureEcom.status);

    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const initAuth = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withBrowserData(browserData)
      .execute();

    expect(initAuth).toBeTruthy();
    if (initAuth instanceof ThreeDSecure) {
      expect(Secure3dStatus.ChallengeRequired).toBe(initAuth.status);
      expect(initAuth.issuerAcsUrl).toBeTruthy();
      expect(initAuth.payerAuthenticationRequest).toBeTruthy();

      const authClient = new ThreeDSecureAcsClient(secureEcom.issuerAcsUrl);
      authClient.setGatewayProvider(gatewayProvider);
      const authResponse = await authClient.authenticate_v2(initAuth);
      if (authResponse instanceof AcsResponse) {
        expect(authResponse.getStatus()).toBe(true);
        expect(authResponse.getMerchantData()).toBeTruthy();

        const secureEcom2 = await Secure3dService.getAuthenticationData()
          .withServerTransactionId(authResponse.getMerchantData())
          .withAmount(amount)
          .execute();
        card.threeDSecure = secureEcom2;
        if (secureEcom2 instanceof ThreeDSecure) {
          expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);
          expect("05").toBe(String(secureEcom2.eci));
          expect("2.1.0").toBe(secureEcom2.messageVersion);
          expect(secureEcom2.acsTransactionId).toBeTruthy();
          expect(secureEcom2.serverTransactionId).toBeTruthy();
          expect(secureEcom2.directoryServerTransactionId).toBeTruthy();
        }
      }
    }
  }
});

test("card holder challenge required - post result with idempotency key", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (!(secureEcom instanceof Transaction)) {
    expect(Secure3dStatus.Enrolled).toBe(secureEcom?.enrolled);
    expect(Secure3dVersion.TWO).toBe(secureEcom.getVersion());
    expect(Secure3dStatus.Available).toBe(secureEcom.status);

    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const initAuth = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withBrowserData(browserData)
      .execute();

    expect(initAuth).toBeTruthy();
    if (initAuth instanceof ThreeDSecure) {
      expect(Secure3dStatus.ChallengeRequired).toBe(initAuth.status);
      expect(initAuth.issuerAcsUrl).toBeTruthy();
      expect(initAuth.payerAuthenticationRequest).toBeTruthy();

      const authClient = new ThreeDSecureAcsClient(secureEcom.issuerAcsUrl);
      authClient.setGatewayProvider(gatewayProvider);
      const authResponse = await authClient.authenticate_v2(initAuth);
      if (authResponse instanceof AcsResponse) {
        expect(authResponse.getStatus()).toBe(true);
        expect(authResponse.getMerchantData()).toBeTruthy();

        const secureEcom2 = await Secure3dService.getAuthenticationData()
          .withServerTransactionId(authResponse.getMerchantData())
          .withIdempotencyKey(idempotencyKey)
          .withAmount(amount)
          .execute();
        card.threeDSecure = secureEcom2;
        if (secureEcom2 instanceof ThreeDSecure) {
          expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);
          expect("05").toBe(String(secureEcom2.eci));
          expect("2.1.0").toBe(secureEcom2.messageVersion);
          expect(secureEcom2.acsTransactionId).toBeTruthy();
          expect(secureEcom2.serverTransactionId).toBeTruthy();
          expect(secureEcom2.directoryServerTransactionId).toBeTruthy();
        }

        try {
          await Secure3dService.getAuthenticationData()
            .withServerTransactionId(secureEcom2.serverTransactionId)
            .withIdempotencyKey(idempotencyKey)
            .execute();
        } catch (error) {
          expect("40039").toBe(error.responseCode);
          expect(
            error.responseMessage.includes("Idempotency Key seen before"),
          ).toBe(true);
          expect(error instanceof GatewayError).toBe(true);
        }
      }
    }
  }
});

test("card holder challenge required - post result non existent id", async () => {
  const transactionId = "AUT_" + GenerationUtils.getGuuid();

  try {
    await Secure3dService.getAuthenticationData()
      .withServerTransactionId(transactionId)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect("40118").toBe(error.responseCode);
    expect(
      error.responseMessage.includes(
        `Authentication ${transactionId} not found at this location.`,
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

// failed
test("card holder challenge required - v2 initiate", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);
  }
});

test("card holder challenge required - v2 initiate with idempotency key", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withIdempotencyKey(idempotencyKey)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);

    try {
      await Secure3dService.initiateAuthentication(card, secureEcom)
        .withAmount(amount)
        .withCurrency(currency)
        .withAuthenticationSource(AuthenticationSource.Browser)
        .withBrowserData(browserData)
        .withMethodUrlCompletion(MethodUrlCompletion.Yes)
        .withOrderCreateDate(formatedDate)
        .withAddress(shippingAddress, AddressType.Shipping)
        .withIdempotencyKey(idempotencyKey)
        .execute();
    } catch (error) {
      expect(error).toBeTruthy();
      expect("40039").toBe(error.responseCode);
      expect(
        error.responseMessage.includes("Idempotency Key seen before"),
      ).toBe(true);
      expect(error instanceof GatewayError).toBe(true);
    }
  }
});

test("card holder challenge required - v2 initiate tokenized card", async () => {
  const response = await card.tokenize().execute();

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const secureEcom = await Secure3dService.checkEnrollment(tokenizedCard)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      tokenizedCard,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);
  }
});

test("card holder challenge required - v2 initiate method url set no", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.No)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);
  }
});

test("card holder challenge required - v2 initiate method url set unavailable", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Unavailable)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);
  }
});

test("card holder challenge required - v2 initiate without shipping address", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);
  }
});

test("card holder challenge required - v2 initiate with gift card", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withOrderCreateDate(formatedDate)
      .withGiftCardAmount(2)
      .withGiftCardCount(1)
      .withGiftCardCurrency(currency)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);
  }
});

test("card holder challenge required - v2 initiate with shipping method", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withShippingMethod(ShippingMethod.DigitalGoods)
      .withOrderCreateDate(formatedDate)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);
  }
});

test("card holder challenge required - v2 initiate with delivery email", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDeliveryEmail("james.mason@example.com")
      .withDeliveryTimeFrame(DeliveryTimeFrame.SameDay)
      .withOrderCreateDate(formatedDate)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);
  }
});

test("card holder challenge required - v2 initiate all preference values", async () => {
  Promise.all(
    Object.values(ChallengeRequestIndicator).map(async (value) => {
      const secureEcom = await Secure3dService.checkEnrollment(card)
        .withCurrency(currency)
        .withAmount(amount)
        .execute();

      assertCheckEnrollment3DSV2(secureEcom);

      if (secureEcom instanceof ThreeDSecure) {
        const formatedDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const response = await Secure3dService.initiateAuthentication(
          card,
          secureEcom,
        )
          .withAmount(amount)
          .withCurrency(currency)
          .withAuthenticationSource(AuthenticationSource.Browser)
          .withBrowserData(browserData)
          .withMethodUrlCompletion(MethodUrlCompletion.Yes)
          .withAddress(shippingAddress, AddressType.Shipping)
          .withChallengeRequestIndicator(value)
          .withOrderCreateDate(formatedDate)
          .execute();

        expect(response).toBeTruthy();

        assertInitiate3DSV2(response);
      }
    }),
  );
});

test.failing(
  "card holder challenge required - v2 initiate all source values",
  async () => {
    // fails 'MERCHANT_INITIATED and STORED_RECURRING failing, issue raised with UCP team.'
    Promise.all(
      Object.values(AuthenticationSource).map(async (value) => {
        const storedCredentials = new StoredCredential();
        storedCredentials.initiator = EnumMapping.mapStoredCredentialInitiator(
          gatewayProvider,
          StoredCredentialInitiator.Payer,
        ) as StoredCredentialInitiator;
        storedCredentials.type = StoredCredentialType.SPLIT_OR_DELAYED_SHIPMENT;
        storedCredentials.sequence = StoredCredentialSequence.FIRST;
        storedCredentials.reason = StoredCredentialReason.INCREMENTAL;

        const secureEcom = await Secure3dService.checkEnrollment(card)
          .withCurrency(currency)
          .withAmount(amount)
          .withAuthenticationSource(value)
          .withStoredCredential(storedCredentials)
          .execute();

        assertCheckEnrollment3DSV2(secureEcom);

        if (secureEcom instanceof ThreeDSecure) {
          const formatedDate = `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

          const response = await Secure3dService.initiateAuthentication(
            card,
            secureEcom,
          )
            .withAmount(amount)
            .withCurrency(currency)
            .withAuthenticationSource(value)
            .withBrowserData(browserData)
            .withMethodUrlCompletion(MethodUrlCompletion.Yes)
            .withAddress(shippingAddress, AddressType.Shipping)
            .withOrderCreateDate(formatedDate)
            .withStoredCredential(storedCredentials)
            .execute();

          expect(response).toBeTruthy();

          assertInitiate3DSV2(response);
        }
      }),
    );
  },
);

// failed
test("card holder enrolled challenge required - frictionless - v2 initiate", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const initAuth = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withShippingMethod(ShippingMethod.DigitalGoods)
      .withOrderCreateDate(formatedDate)
      .execute();

    expect(initAuth).toBeTruthy();

    if (initAuth instanceof ThreeDSecure) {
      expect(Secure3dStatus.SuccessAuthenticated).toBe(initAuth.status);
      expect(initAuth.issuerAcsUrl).toBeTruthy();
      expect(initAuth.payerAuthenticationRequest).toBeTruthy();
      expect(initAuth.acsTransactionId).toBeTruthy();
      expect(initAuth.providerServerTransRef).toBeTruthy();
      expect(initAuth.acsReferenceNumber).toBeTruthy();

      expect("05").toBe(String(initAuth.eci));
      expect("2.2.0").toBe(initAuth.messageVersion);
    }
  }
});

test("card holder enrolled challenge required - frictionless - v2 initiate without payment method", async () => {
  const card = new CreditCardData();
  const secureEcom = new ThreeDSecure();
  secureEcom.serverTransactionId = "AUT_" + GenerationUtils.getGuuid();
  const formatedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  try {
    await Secure3dService.initiateAuthentication(card, secureEcom)
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withShippingMethod(ShippingMethod.DigitalGoods)
      .withOrderCreateDate(formatedDate)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect("40005").toBe(error.responseCode);
    expect(
      error.responseMessage.includes(
        "Request expects the following fields number",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("card holder enrolled challenge required - v2 initiate non existent id", async () => {
  const secureEcom = new ThreeDSecure();
  secureEcom.serverTransactionId = "AUT_" + GenerationUtils.getGuuid();
  const formatedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  try {
    await Secure3dService.initiateAuthentication(card, secureEcom)
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withBrowserData(browserData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect("40118").toBe(error.responseCode);
    expect(
      error.responseMessage.includes(
        `Authentication ${secureEcom.serverTransactionId} not found at this location.`,
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("challenge required v2 - initiate with mobile sdk", async () => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  const mobileData = new MobileData();

  mobileData.encodedData =
    "ew0KCSJEViI6ICIxLjAiLA0KCSJERCI6IHsNCgkJIkMwMDEiOiAiQW5kcm9pZCIsDQoJCSJDMDAyIjogIkhUQyBPbmVfTTgiLA0KCQkiQzAwNCI6ICI1LjAuMSIsDQoJCSJDMDA1IjogImVuX1VTIiwNCgkJIkMwMDYiOiAiRWFzdGVybiBTdGFuZGFyZCBUaW1lIiwNCgkJIkMwMDciOiAiMDY3OTc5MDMtZmI2MS00MWVkLTk0YzItNGQyYjc0ZTI3ZDE4IiwNCgkJIkMwMDkiOiAiSm9obidzIEFuZHJvaWQgRGV2aWNlIg0KCX0sDQoJIkRQTkEiOiB7DQoJCSJDMDEwIjogIlJFMDEiLA0KCQkiQzAxMSI6ICJSRTAzIg0KCX0sDQoJIlNXIjogWyJTVzAxIiwgIlNXMDQiXQ0KfQ0K";
  mobileData.applicationReference = "f283b3ec-27da-42a1-acea-f3f70e75bbdc";
  mobileData.sdkInterface = SdkInterface.Both;
  mobileData.sdkUiTypes = [SdkUiType.Oob];
  mobileData.ephemeralPublicKey = `{
            "kty": "EC",
            "crv": "P-256",
            "x": "WWcpTjbOqiu_1aODllw5rYTq5oLXE_T0huCPjMIRbkI",
            "y": "Wz_7anIeadV8SJZUfr4drwjzuWoUbOsHp5GdRZBAAiw"
        }`;
  mobileData.maximumTimeout = 50;
  mobileData.referenceNumber = "3DS_LOA_SDK_PPFU_020100_00007";
  mobileData.sdkTransReference = "b2385523-a66c-4907-ac3c-91848e8c0067";

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.MobileSdk)
      .withMobileData(mobileData)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);

    expect(response.payerAuthenticationRequest).toBeTruthy();
    expect(response.acsInterface).toBeTruthy();
    expect(response.acsUiTemplate).toBeTruthy();
    expect(response.providerServerTransRef).toBeTruthy();
    expect("NATIVE").toBe(response.acsInterface);
    expect("OUT_OF_BAND").toBe(response.acsUiTemplate);
  }
});

test("challenge required v2 - initiate with mobile data and browser data", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  const mobileData = new MobileData();

  mobileData.encodedData =
    "ew0KCSJEViI6ICIxLjAiLA0KCSJERCI6IHsNCgkJIkMwMDEiOiAiQW5kcm9pZCIsDQoJCSJDMDAyIjogIkhUQyBPbmVfTTgiLA0KCQkiQzAwNCI6ICI1LjAuMSIsDQoJCSJDMDA1IjogImVuX1VTIiwNCgkJIkMwMDYiOiAiRWFzdGVybiBTdGFuZGFyZCBUaW1lIiwNCgkJIkMwMDciOiAiMDY3OTc5MDMtZmI2MS00MWVkLTk0YzItNGQyYjc0ZTI3ZDE4IiwNCgkJIkMwMDkiOiAiSm9obidzIEFuZHJvaWQgRGV2aWNlIg0KCX0sDQoJIkRQTkEiOiB7DQoJCSJDMDEwIjogIlJFMDEiLA0KCQkiQzAxMSI6ICJSRTAzIg0KCX0sDQoJIlNXIjogWyJTVzAxIiwgIlNXMDQiXQ0KfQ0K";
  mobileData.applicationReference = "f283b3ec-27da-42a1-acea-f3f70e75bbdc";
  mobileData.sdkInterface = SdkInterface.Browser;
  mobileData.sdkUiTypes = [SdkUiType.HtmlOther];
  mobileData.ephemeralPublicKey = `{
            "kty": "EC",
            "crv": "P-256",
            "x": "WWcpTjbOqiu_1aODllw5rYTq5oLXE_T0huCPjMIRbkI",
            "y": "Wz_7anIeadV8SJZUfr4drwjzuWoUbOsHp5GdRZBAAiw"
        }`;
  mobileData.maximumTimeout = 50;
  mobileData.referenceNumber = "3DS_LOA_SDK_PPFU_020100_00007";
  mobileData.sdkTransReference = "b2385523-a66c-4907-ac3c-91848e8c0067";

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const response = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withMobileData(mobileData)
      .withBrowserData(browserData)
      .withAddress(shippingAddress, AddressType.Shipping)
      .execute();

    expect(response).toBeTruthy();

    assertInitiate3DSV2(response);
  }
});

test("challenge required v2 - initiate with mobile data and source browser", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);

  const mobileData = new MobileData();

  mobileData.encodedData =
    "ew0KCSJEViI6ICIxLjAiLA0KCSJERCI6IHsNCgkJIkMwMDEiOiAiQW5kcm9pZCIsDQoJCSJDMDAyIjogIkhUQyBPbmVfTTgiLA0KCQkiQzAwNCI6ICI1LjAuMSIsDQoJCSJDMDA1IjogImVuX1VTIiwNCgkJIkMwMDYiOiAiRWFzdGVybiBTdGFuZGFyZCBUaW1lIiwNCgkJIkMwMDciOiAiMDY3OTc5MDMtZmI2MS00MWVkLTk0YzItNGQyYjc0ZTI3ZDE4IiwNCgkJIkMwMDkiOiAiSm9obidzIEFuZHJvaWQgRGV2aWNlIg0KCX0sDQoJIkRQTkEiOiB7DQoJCSJDMDEwIjogIlJFMDEiLA0KCQkiQzAxMSI6ICJSRTAzIg0KCX0sDQoJIlNXIjogWyJTVzAxIiwgIlNXMDQiXQ0KfQ0K";
  mobileData.applicationReference = "f283b3ec-27da-42a1-acea-f3f70e75bbdc";
  mobileData.sdkInterface = SdkInterface.Browser;
  mobileData.sdkUiTypes = [SdkUiType.HtmlOther];
  mobileData.ephemeralPublicKey = `{
            "kty": "EC",
            "crv": "P-256",
            "x": "WWcpTjbOqiu_1aODllw5rYTq5oLXE_T0huCPjMIRbkI",
            "y": "Wz_7anIeadV8SJZUfr4drwjzuWoUbOsHp5GdRZBAAiw"
        }`;
  mobileData.maximumTimeout = 50;
  mobileData.referenceNumber = "3DS_LOA_SDK_PPFU_020100_00007";
  mobileData.sdkTransReference = "b2385523-a66c-4907-ac3c-91848e8c0067";

  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    try {
      await Secure3dService.initiateAuthentication(card, secureEcom)
        .withAmount(amount)
        .withCurrency(currency)
        .withAuthenticationSource(AuthenticationSource.Browser)
        .withMethodUrlCompletion(MethodUrlCompletion.Yes)
        .withOrderCreateDate(formatedDate)
        .withMobileData(mobileData)
        .execute();
    } catch (error) {
      expect(error).toBeTruthy();
      expect("40233").toBe(error.responseCode);
      expect(
        error.responseMessage.includes("Required Data Element browser_data"),
      ).toBe(true);
      expect(error instanceof GatewayError).toBe(true);
    }
  }
});

test("challenge required v2 - initiate with source mobile SDK without mobile data", async () => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(secureEcom);
  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    try {
      await Secure3dService.initiateAuthentication(card, secureEcom)
        .withAmount(amount)
        .withCurrency(currency)
        .withAuthenticationSource(AuthenticationSource.MobileSdk)
        .withMethodUrlCompletion(MethodUrlCompletion.Yes)
        .withOrderCreateDate(formatedDate)
        .execute();
    } catch (error) {
      expect(error).toBeTruthy();
      expect("40233").toBe(error.responseCode);
      expect(
        error.responseMessage.includes("Required Data Element sdk_information"),
      ).toBe(true);
      expect(error instanceof GatewayError).toBe(true);
    }
  }
});

const assertCheckEnrollment3DSV2 = (
  secureEcom: Transaction | ThreeDSecure,
): void => {
  expect(secureEcom).toBeTruthy();
  if (!(secureEcom instanceof Transaction)) {
    expect(Secure3dStatus.Enrolled).toBe(secureEcom?.enrolled);
    expect(Secure3dVersion.TWO).toBe(secureEcom?.getVersion());
    expect(Secure3dStatus.Available).toBe(secureEcom.status);
    expect(secureEcom.issuerAcsUrl).toBeTruthy();
    expect(secureEcom.payerAuthenticationRequest).toBeTruthy();
    expect(secureEcom.eci).toBeFalsy();
  }
};

const assertInitiate3DSV2 = (initAuth: Transaction | ThreeDSecure): void => {
  expect(initAuth).toBeTruthy();
  if (!(initAuth instanceof Transaction)) {
    expect(Secure3dStatus.ChallengeRequired).toBe(initAuth.status);
    expect("2.1.0").toBe(initAuth.messageVersion);
    expect(initAuth.issuerAcsUrl).toBeTruthy();
    expect(initAuth.payerAuthenticationRequest).toBeTruthy();
    expect(initAuth.acsTransactionId).toBeTruthy();
    expect(initAuth.eci).toBeFalsy();
  }
};
afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());
