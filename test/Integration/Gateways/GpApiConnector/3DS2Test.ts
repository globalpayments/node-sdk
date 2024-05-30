import ava, { ExecutionContext } from "ava";
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

const runSerially = true;
const test = runSerially ? ava.serial : ava;
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

test.before(() => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  gatewayProvider = config.gatewayProvider;
  ServicesContainer.configureService(config);
});

test.beforeEach(() => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1;
});

test("full cycle v2 frictionless", async (t) => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(initAuth);
    initAuth instanceof ThreeDSecure &&
      t.is(Secure3dStatus.SuccessAuthenticated, initAuth.status) &&
      t.is("YES", initAuth.liabilityShift);

    const secureEcom2 = await Secure3dService.getAuthenticationData()
      .withServerTransactionId(secureEcom.serverTransactionId)
      .withAmount(amount)
      .execute();

    card.threeDSecure = secureEcom2;

    secureEcom2 instanceof ThreeDSecure &&
      t.is(Secure3dStatus.SuccessAuthenticated, secureEcom2.status);

    const transaction = await card
      .charge(amount)
      .withCurrency(currency)
      .execute();

    t.truthy(transaction);
    t.is("SUCCESS", transaction.responseCode);
    t.is(TransactionStatus.CAPTURED, transaction.responseMessage);
  }
});

test("full cycle v2 frictionless failed", async (t) => {
  card.number = GpApi3DSTestCards.CARD_AUTH_FAILED_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(initAuth);
    initAuth instanceof ThreeDSecure &&
      t.is(Secure3dStatus.NotAuthenticated, initAuth.status) &&
      t.not("YES", initAuth.liabilityShift);

    const secureEcom2 = await Secure3dService.getAuthenticationData()
      .withServerTransactionId(secureEcom.serverTransactionId)
      .withAmount(amount)
      .execute();

    card.threeDSecure = secureEcom2;

    secureEcom2 instanceof ThreeDSecure &&
      t.is(Secure3dStatus.NotAuthenticated, secureEcom2.status);

    const transaction = await card
      .charge(amount)
      .withCurrency(currency)
      .execute();

    t.truthy(transaction);
    t.is("SUCCESS", transaction.responseCode);
    t.is(TransactionStatus.CAPTURED, transaction.responseMessage);
  }
});

test("full cycle v2 frictionless with card tokenization", async (t) => {
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

  assertCheckEnrollment3DSV2(t, secureEcom);
  t.truthy(secureEcom.payerAuthenticationRequest);

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

    t.truthy(initAuth);
    initAuth instanceof ThreeDSecure &&
      t.is(Secure3dStatus.SuccessAuthenticated, initAuth.status) &&
      t.is("YES", initAuth.liabilityShift);

    const secureEcom2 = await Secure3dService.getAuthenticationData()
      .withServerTransactionId(secureEcom.serverTransactionId)
      .withAmount(amount)
      .execute();

    card.threeDSecure = secureEcom2;

    secureEcom2 instanceof ThreeDSecure &&
      t.is(Secure3dStatus.SuccessAuthenticated, secureEcom2.status);

    const transaction = await card
      .charge(amount)
      .withCurrency(currency)
      .execute();

    t.truthy(transaction);
    t.is("SUCCESS", transaction.responseCode);
    t.is(TransactionStatus.CAPTURED, transaction.responseMessage);
  }
});

test("full cycle v2 card holder enrolled challenge required", async (t) => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);

    t.is(Secure3dStatus.ChallengeRequired, response.status);
    t.truthy(response.payerAuthenticationRequest);
    t.truthy(response.issuerAcsUrl);

    const authClient = new ThreeDSecureAcsClient(secureEcom.issuerAcsUrl);
    authClient.setGatewayProvider(gatewayProvider);
    const authResponse = await authClient.authenticate_v2(response);
    if (authResponse instanceof AcsResponse) {
      t.true(authResponse.getStatus());
      t.truthy(authResponse.getMerchantData());

      const secureEcom2 = await Secure3dService.getAuthenticationData()
        .withServerTransactionId(authResponse.getMerchantData())
        .withAmount(amount)
        .execute();
      card.threeDSecure = secureEcom2;

      secureEcom2 instanceof ThreeDSecure &&
        t.is(Secure3dStatus.SuccessAuthenticated, secureEcom2.status);

      const transaction = await card
        .charge(amount)
        .withCurrency(currency)
        .execute();

      t.truthy(transaction);
      t.is("SUCCESS", transaction.responseCode);
      t.is(TransactionStatus.CAPTURED, transaction.responseMessage);
    }
  }
});

test("card holder enrolled challenge required v2 2", async (t) => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);
});

test("card holder enrolled challenge required v2 - with idempotency key", async (t) => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1;
  const idempotencyKey = GenerationUtils.getGuuid();

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

  const error = await t.throwsAsync(
    async () =>
      await Secure3dService.checkEnrollment(card)
        .withCurrency(currency)
        .withIdempotencyKey(idempotencyKey)
        .withAmount(amount)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  if (error) {
    t.is("40039", error.responseCode);
    t.is(error.responseMessage.includes("Idempotency Key seen before"), true);
  }
});

test("card holder enrolled challenge required v2 - with tokenized card", async (t) => {
  const response = await card.tokenize().execute();

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;
  tokenizedCard.cardHolderName = "James Mason";

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);
});

test("card holder enrolled challenge required v2 - all preference value", async (t) => {
  for (const value of Object.values(ChallengeRequestIndicator)) {
    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .withChallengeRequestIndicator(value)
      .execute();

    assertCheckEnrollment3DSV2(t, secureEcom);
  }
});

test("card holder enrolled challenge required v2 - stored credentials", async (t) => {
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

  assertCheckEnrollment3DSV2(t, secureEcom);
});

test("card holder enrolled challenge required v2 - all sources", async (t) => {
  for (const value of Object.values(AuthenticationSource)) {
    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .withAuthenticationSource(value)
      .execute();

    assertCheckEnrollment3DSV2(t, secureEcom);
  }
});

test("card holder enrolled challenge required v2 - with null payment method", async (t) => {
  // below validation is not working on PHP and node has another error
  // this.validations
  //     .of("transactionType", TransactionType.VerifyEnrolled)
  //     .check("paymentMethod")
  //     .isNotNull();

  const error = await t.throwsAsync(
    async () =>
      await Secure3dService.checkEnrollment(card)
        .withCurrency(currency)
        .withPaymentMethod(null)
        .withAmount(amount)
        .execute(),
    {
      instanceOf: BuilderError,
    },
  );

  t.truthy(error);
  if (error) {
    // t.is("40007", error?.responseCode);
    // t.is(
    //   error.message.includes(
    //     "Status Code: INVALID_REQUEST_DATA - Request expects the following conditionally mandatory fields number,expiry_month,expiry_year.",
    //   ),
    //   true,
    // );
    t.is(
      error.message.includes(
        "paymentMethod cannot be null for this transaction type.",
      ),
      true,
    );
  }
});

test("card holder enrolled frictionless v2", async (t) => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);
});

test("card holder enrolled frictionless v2 - with idempotency key", async (t) => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;
  const idempotencyKey = GenerationUtils.getGuuid();

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

  const error = await t.throwsAsync(
    async () =>
      await Secure3dService.checkEnrollment(card)
        .withCurrency(currency)
        .withIdempotencyKey(idempotencyKey)
        .withAmount(amount)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  if (error) {
    t.is("40039", error.responseCode);
    t.is(error.responseMessage.includes("Idempotency Key seen before"), true);
  }
});

test("card holder enrolled frictionless v2 - with tokenized card", async (t) => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const response = await card.tokenize().execute();

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const secureEcom = await Secure3dService.checkEnrollment(tokenizedCard)
    .withCurrency(currency)
    .withAmount(amount)
    .withAuthenticationSource(AuthenticationSource.Browser)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);
});

test("card holder enrolled frictionless v2 - all preference values", async (t) => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  for (const value of Object.values(ChallengeRequestIndicator)) {
    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .withChallengeRequestIndicator(value)
      .execute();

    assertCheckEnrollment3DSV2(t, secureEcom);
  }
});

test("card holder enrolled frictionless v2 - stored credentials", async (t) => {
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

  assertCheckEnrollment3DSV2(t, secureEcom);
});

test("card holder enrolled frictionless v2 - all sources", async (t) => {
  for (const value of Object.values(AuthenticationSource)) {
    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .withAuthenticationSource(value)
      .execute();

    assertCheckEnrollment3DSV2(t, secureEcom);
  }
});

test("card holder challenge required - post result", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

  if (!(secureEcom instanceof Transaction)) {
    t.is(Secure3dStatus.Enrolled, secureEcom?.enrolled);
    t.is(Secure3dVersion.TWO, secureEcom.getVersion());
    t.is(Secure3dStatus.Available, secureEcom.status);

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

    t.truthy(initAuth);
    if (initAuth instanceof ThreeDSecure) {
      t.is(Secure3dStatus.ChallengeRequired, initAuth.status);
      t.truthy(initAuth.issuerAcsUrl);
      t.truthy(initAuth.payerAuthenticationRequest);

      const authClient = new ThreeDSecureAcsClient(secureEcom.issuerAcsUrl);
      authClient.setGatewayProvider(gatewayProvider);
      const authResponse = await authClient.authenticate_v2(initAuth);
      if (authResponse instanceof AcsResponse) {
        t.true(authResponse.getStatus());
        t.truthy(authResponse.getMerchantData());

        const secureEcom2 = await Secure3dService.getAuthenticationData()
          .withServerTransactionId(authResponse.getMerchantData())
          .withAmount(amount)
          .execute();
        card.threeDSecure = secureEcom2;
        if (secureEcom2 instanceof ThreeDSecure) {
          t.is(Secure3dStatus.SuccessAuthenticated, secureEcom2.status);
          t.is("05", String(secureEcom2.eci));
          t.is("2.1.0", secureEcom2.messageVersion);
          t.truthy(secureEcom2.acsTransactionId);
          t.truthy(secureEcom2.serverTransactionId);
          t.truthy(secureEcom2.directoryServerTransactionId);
        }
      }
    }
  }
});

test("card holder challenge required - post result with idempotency key", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

  if (!(secureEcom instanceof Transaction)) {
    t.is(Secure3dStatus.Enrolled, secureEcom?.enrolled);
    t.is(Secure3dVersion.TWO, secureEcom.getVersion());
    t.is(Secure3dStatus.Available, secureEcom.status);

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

    t.truthy(initAuth);
    if (initAuth instanceof ThreeDSecure) {
      t.is(Secure3dStatus.ChallengeRequired, initAuth.status);
      t.truthy(initAuth.issuerAcsUrl);
      t.truthy(initAuth.payerAuthenticationRequest);

      const authClient = new ThreeDSecureAcsClient(secureEcom.issuerAcsUrl);
      authClient.setGatewayProvider(gatewayProvider);
      const authResponse = await authClient.authenticate_v2(initAuth);
      if (authResponse instanceof AcsResponse) {
        t.true(authResponse.getStatus());
        t.truthy(authResponse.getMerchantData());

        const secureEcom2 = await Secure3dService.getAuthenticationData()
          .withServerTransactionId(authResponse.getMerchantData())
          .withIdempotencyKey(idempotencyKey)
          .withAmount(amount)
          .execute();
        card.threeDSecure = secureEcom2;
        if (secureEcom2 instanceof ThreeDSecure) {
          t.is(Secure3dStatus.SuccessAuthenticated, secureEcom2.status);
          t.is("05", String(secureEcom2.eci));
          t.is("2.1.0", secureEcom2.messageVersion);
          t.truthy(secureEcom2.acsTransactionId);
          t.truthy(secureEcom2.serverTransactionId);
          t.truthy(secureEcom2.directoryServerTransactionId);
        }

        const error = await t.throwsAsync(
          async () =>
            await Secure3dService.getAuthenticationData()
              .withServerTransactionId(secureEcom2.serverTransactionId)
              .withIdempotencyKey(idempotencyKey)
              .execute(),
          {
            instanceOf: GatewayError,
          },
        );

        t.truthy(error);
        if (error) {
          t.is("40039", error.responseCode);
          t.is(
            error.responseMessage.includes("Idempotency Key seen before"),
            true,
          );
        }
      }
    }
  }
});

test("card holder challenge required - post result non existent id", async (t) => {
  const transactionId = "AUT_" + GenerationUtils.getGuuid();

  const error = await t.throwsAsync(
    async () =>
      await Secure3dService.getAuthenticationData()
        .withServerTransactionId(transactionId)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  if (error) {
    t.is("40118", error.responseCode);
    t.is(
      error.responseMessage.includes(
        `Authentication ${transactionId} not found at this location.`,
      ),
      true,
    );
  }
});

test("card holder challenge required - v2 initiate", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);
  }
});

test("card holder challenge required - v2 initiate with idempotency key", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);

    const error = await t.throwsAsync(
      async () =>
        await Secure3dService.initiateAuthentication(card, secureEcom)
          .withAmount(amount)
          .withCurrency(currency)
          .withAuthenticationSource(AuthenticationSource.Browser)
          .withBrowserData(browserData)
          .withMethodUrlCompletion(MethodUrlCompletion.Yes)
          .withOrderCreateDate(formatedDate)
          .withAddress(shippingAddress, AddressType.Shipping)
          .withIdempotencyKey(idempotencyKey)
          .execute(),
      {
        instanceOf: GatewayError,
      },
    );

    t.truthy(error);
    if (error) {
      t.is("40039", error.responseCode);
      t.is(error.responseMessage.includes("Idempotency Key seen before"), true);
    }
  }
});

test("card holder challenge required - v2 initiate tokenized card", async (t) => {
  const response = await card.tokenize().execute();

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const secureEcom = await Secure3dService.checkEnrollment(tokenizedCard)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);
  }
});

test("card holder challenge required - v2 initiate method url set no", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);
  }
});

test("card holder challenge required - v2 initiate method url set unavailable", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);
  }
});

test("card holder challenge required - v2 initiate without shipping address", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);
  }
});

test("card holder challenge required - v2 initiate with gift card", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);
  }
});

test("card holder challenge required - v2 initiate with shipping method", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);
  }
});

test("card holder challenge required - v2 initiate with delivery email", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);
  }
});

test("card holder challenge required - v2 initiate all preference values", async (t) => {
  for (const value of Object.values(ChallengeRequestIndicator)) {
    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .execute();

    assertCheckEnrollment3DSV2(t, secureEcom);

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

      t.truthy(response);

      assertInitiate3DSV2(t, response);
    }
  }
});

test("card holder challenge required - v2 initiate all source values", async (t) => {
  // fails 'MERCHANT_INITIATED and STORED_RECURRING failing, issue raised with UCP team.'
  for (const value of Object.values(AuthenticationSource)) {
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

    assertCheckEnrollment3DSV2(t, secureEcom);

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

      t.truthy(response);

      assertInitiate3DSV2(t, response);
    }
  }
});

test("card holder enrolled challenge required - frictionless - v2 initiate", async (t) => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(initAuth);

    if (initAuth instanceof ThreeDSecure) {
      t.is(Secure3dStatus.SuccessAuthenticated, initAuth.status);
      t.truthy(initAuth.issuerAcsUrl);
      t.truthy(initAuth.payerAuthenticationRequest);
      t.truthy(initAuth.acsTransactionId);
      t.truthy(initAuth.providerServerTransRef);
      t.truthy(initAuth.acsReferenceNumber);

      t.is("05", String(initAuth.eci));
      t.is("2.2.0", initAuth.messageVersion);
    }
  }
});

test("card holder enrolled challenge required - frictionless - v2 initiate without payment method", async (t) => {
  const card = new CreditCardData();
  const secureEcom = new ThreeDSecure();
  secureEcom.serverTransactionId = "AUT_" + GenerationUtils.getGuuid();
  const formatedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const error = await t.throwsAsync(
    async () =>
      await Secure3dService.initiateAuthentication(card, secureEcom)
        .withAmount(amount)
        .withCurrency(currency)
        .withAuthenticationSource(AuthenticationSource.Browser)
        .withBrowserData(browserData)
        .withMethodUrlCompletion(MethodUrlCompletion.Yes)
        .withAddress(shippingAddress, AddressType.Shipping)
        .withShippingMethod(ShippingMethod.DigitalGoods)
        .withOrderCreateDate(formatedDate)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);

  if (error) {
    t.is("40005", error.responseCode);
    t.is(
      error.responseMessage.includes(
        "Request expects the following fields number",
      ),
      true,
    );
  }
});

test("card holder enrolled challenge required - v2 initiate non existent id", async (t) => {
  const secureEcom = new ThreeDSecure();
  secureEcom.serverTransactionId = "AUT_" + GenerationUtils.getGuuid();
  const formatedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const error = await t.throwsAsync(
    async () =>
      await Secure3dService.initiateAuthentication(card, secureEcom)
        .withAmount(amount)
        .withCurrency(currency)
        .withAuthenticationSource(AuthenticationSource.Browser)
        .withBrowserData(browserData)
        .withMethodUrlCompletion(MethodUrlCompletion.Yes)
        .withOrderCreateDate(formatedDate)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);

  if (error) {
    t.is("40118", error.responseCode);
    t.is(
      error.responseMessage.includes(
        `Authentication ${secureEcom.serverTransactionId} not found at this location.`,
      ),
      true,
    );
  }
});

test("challenge required v2 - initiate with mobile sdk", async (t) => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);

    t.truthy(response.payerAuthenticationRequest);
    t.truthy(response.acsInterface);
    t.truthy(response.acsUiTemplate);
    t.truthy(response.providerServerTransRef);
    t.is("NATIVE", response.acsInterface);
    t.is("OUT_OF_BAND", response.acsUiTemplate);
  }
});

test("challenge required v2 - initiate with mobile data and browser data", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    t.truthy(response);

    assertInitiate3DSV2(t, response);
  }
});

test("challenge required v2 - initiate with mobile data and source browser", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);

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

    const error = await t.throwsAsync(
      async () =>
        await Secure3dService.initiateAuthentication(card, secureEcom)
          .withAmount(amount)
          .withCurrency(currency)
          .withAuthenticationSource(AuthenticationSource.Browser)
          .withMethodUrlCompletion(MethodUrlCompletion.Yes)
          .withOrderCreateDate(formatedDate)
          .withMobileData(mobileData)
          .execute(),
      {
        instanceOf: GatewayError,
      },
    );

    t.truthy(error);

    if (error) {
      t.is("40233", error.responseCode);
      t.is(
        error.responseMessage.includes("Required Data Element browser_data"),
        true,
      );
    }
  }
});

test("challenge required v2 - initiate with source mobile SDK without mobile data", async (t) => {
  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  assertCheckEnrollment3DSV2(t, secureEcom);
  if (secureEcom instanceof ThreeDSecure) {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const error = await t.throwsAsync(
      async () =>
        await Secure3dService.initiateAuthentication(card, secureEcom)
          .withAmount(amount)
          .withCurrency(currency)
          .withAuthenticationSource(AuthenticationSource.MobileSdk)
          .withMethodUrlCompletion(MethodUrlCompletion.Yes)
          .withOrderCreateDate(formatedDate)
          .execute(),
      {
        instanceOf: GatewayError,
      },
    );

    t.truthy(error);
    if (error) {
      t.is("40233", error.responseCode);
      t.is(
        error.responseMessage.includes("Required Data Element sdk_information"),
        true,
      );
    }
  }
});

const assertCheckEnrollment3DSV2 = (
  t: ExecutionContext<unknown>,
  secureEcom: Transaction | ThreeDSecure,
): void => {
  t.truthy(secureEcom);
  if (!(secureEcom instanceof Transaction)) {
    t.is(Secure3dStatus.Enrolled, secureEcom?.enrolled);
    t.is(Secure3dVersion.TWO, secureEcom?.getVersion());
    t.is(Secure3dStatus.Available, secureEcom.status);
    t.truthy(secureEcom.issuerAcsUrl);
    t.truthy(secureEcom.payerAuthenticationRequest);
    t.falsy(secureEcom.eci);
  }
};

const assertInitiate3DSV2 = (
  t: ExecutionContext<unknown>,
  initAuth: Transaction | ThreeDSecure,
): void => {
  t.truthy(initAuth);
  if (!(initAuth instanceof Transaction)) {
    t.is(Secure3dStatus.ChallengeRequired, initAuth.status);
    t.is("2.1.0", initAuth.messageVersion);
    t.truthy(initAuth.issuerAcsUrl);
    t.truthy(initAuth.payerAuthenticationRequest);
    t.truthy(initAuth.acsTransactionId);
    t.falsy(initAuth.eci);
  }
};
test.after(() => BaseGpApiTestConfig.resetGpApiConfig());
