import {
  Address,
  AddressType,
  AuthenticationSource,
  BrowserData,
  ChallengeWindowSize,
  Channel,
  ColorDepth,
  CreditCardData,
  EnumMapping,
  ExemptStatus,
  GatewayProvider,
  ManualEntryMethod,
  MethodUrlCompletion,
  MobileData,
  OrderTransactionType,
  SdkInterface,
  SdkUiType,
  Secure3dService,
  Secure3dStatus,
  Secure3dVersion,
  ServicesContainer,
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
card.number = GpApi3DSTestCards.CARDHOLDER_ENROLLED_V1;
card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
card.expYear = (date.getFullYear() + 1).toString();
card.cvn = "131";
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
  ServicesContainer.configureService(config);
  gatewayProvider = config.gatewayProvider;
});

test("frictionless full cycle v2", async () => {
  const frictionlessSuccessfull3DSV2CardTests: Record<string, any[]> = {
    "Frictionless v2.1": [
      GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_1,
      Secure3dStatus.SuccessAuthenticated,
    ],
    "Frictionless no method url v2.1": [
      GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_NO_METHOD_URL_V2_1,
      Secure3dStatus.SuccessAuthenticated,
    ],
    "Frictionless v2.2": [
      GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2,
      Secure3dStatus.SuccessAuthenticated,
    ],
    "Frictionless no method url v2.2": [
      GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_NO_METHOD_URL_V2_2,
      Secure3dStatus.SuccessAuthenticated,
    ],
  };

  for (const testCase of Object.keys(frictionlessSuccessfull3DSV2CardTests)) {
    card.number = frictionlessSuccessfull3DSV2CardTests[testCase][0];

    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .execute();

    expect(secureEcom).toBeTruthy();

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
        .withOrderTransactionType(OrderTransactionType.GoodsServicePurchase)
        .withBrowserData(browserData)
        .execute();

      expect(initAuth).toBeTruthy();
      expect(frictionlessSuccessfull3DSV2CardTests[testCase][1]).toBe(
        initAuth instanceof ThreeDSecure && initAuth.status,
      );

      const secureEcom2 = await Secure3dService.getAuthenticationData()
        .withServerTransactionId(secureEcom.serverTransactionId)
        .withAmount(amount)
        .execute();

      card.threeDSecure = secureEcom2;

      if (secureEcom2 instanceof ThreeDSecure) {
        expect(frictionlessSuccessfull3DSV2CardTests[testCase][1]).toBe(
          secureEcom2.status,
        );
        expect("YES").toBe(secureEcom2.liabilityShift);
      }

      const response = await card.verify().withCurrency(currency).execute();

      expect(response).toBeTruthy();
      expect("SUCCESS").toBe(response.responseCode);
      expect("VERIFIED").toBe(response.responseMessage);

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

test("frictionless full cycle v2 - failed", async () => {
  const frictionlessSuccessfull3DSV2CardTests: Record<
    string,
    [string, false | Secure3dStatus]
  > = {
    "Frictionless failed 1": [
      GpApi3DSTestCards.CARD_AUTH_ATTEMPTED_BUT_NOT_SUCCESSFUL_V2_1,
      Secure3dStatus.SuccessAttemptMade,
    ],
    "Frictionless failed 2": [
      GpApi3DSTestCards.CARD_AUTH_FAILED_V2_1,
      Secure3dStatus.NotAuthenticated,
    ],
    "Frictionless failed 3": [
      GpApi3DSTestCards.CARD_AUTH_ISSUER_REJECTED_V2_1,
      Secure3dStatus.Failed,
    ],
    "Frictionless failed 4": [
      GpApi3DSTestCards.CARD_AUTH_COULD_NOT_BE_PREFORMED_V2_1,
      Secure3dStatus.Failed,
    ],
    "Frictionless failed 5": [
      GpApi3DSTestCards.CARD_AUTH_ATTEMPTED_BUT_NOT_SUCCESSFUL_V2_2,
      Secure3dStatus.SuccessAttemptMade,
    ],
    "Frictionless failed 6": [
      GpApi3DSTestCards.CARD_AUTH_FAILED_V2_2,
      Secure3dStatus.NotAuthenticated,
    ],
    "Frictionless failed 7": [
      GpApi3DSTestCards.CARD_AUTH_ISSUER_REJECTED_V2_2,
      Secure3dStatus.Failed,
    ],
    "Frictionless failed 8": [
      GpApi3DSTestCards.CARD_AUTH_COULD_NOT_BE_PREFORMED_V2_2,
      Secure3dStatus.Failed,
    ],
  };

  for (const testCase of Object.keys(frictionlessSuccessfull3DSV2CardTests)) {
    card.number = frictionlessSuccessfull3DSV2CardTests[testCase][0];

    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .execute();

    expect(secureEcom).toBeTruthy();

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
      expect(frictionlessSuccessfull3DSV2CardTests[testCase][1]).toBe(
        initAuth instanceof ThreeDSecure && initAuth.status,
      );

      const secureEcom2 = await Secure3dService.getAuthenticationData()
        .withServerTransactionId(secureEcom.serverTransactionId)
        .withAmount(amount)
        .execute();

      const liabilityShift =
        frictionlessSuccessfull3DSV2CardTests[testCase][1] ==
        Secure3dStatus.SuccessAttemptMade
          ? "YES"
          : "NO";
      card.threeDSecure = secureEcom2;

      if (secureEcom2 instanceof ThreeDSecure) {
        expect(frictionlessSuccessfull3DSV2CardTests[testCase][1]).toBe(
          secureEcom2.status,
        );
        expect(liabilityShift).toBe(secureEcom2.liabilityShift);
      }

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

test("card holder enrolled - challenge required - v2", async () => {
  const challengeSuccessful3DSV2CardTests: Record<
    string,
    [string, false | Secure3dStatus]
  > = {
    "Challenge v2.1": [
      GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_1,
      Secure3dStatus.SuccessAuthenticated,
    ],
    "Challenge v2.2": [
      GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_2,
      Secure3dStatus.SuccessAuthenticated,
    ],
  };

  for (const testCase of Object.keys(challengeSuccessful3DSV2CardTests)) {
    card.number = challengeSuccessful3DSV2CardTests[testCase][0];

    const secureEcom = await Secure3dService.checkEnrollment(card)
      .withCurrency(currency)
      .withAmount(amount)
      .execute();

    expect(secureEcom).toBeTruthy();

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
            expect(challengeSuccessful3DSV2CardTests[testCase][1]).toBe(
              secureEcom2.status,
            );
            expect("YES").toBe(secureEcom2.liabilityShift);
          }

          const transaction = await card
            .charge(amount)
            .withCurrency(currency)
            .execute();

          expect(transaction).toBeTruthy();
          expect("SUCCESS").toBe(transaction.responseCode);
          expect(TransactionStatus.CAPTURED).toBe(transaction.responseMessage);
        }
      }
    }
  }
});

test("card holder enrolled - challenge required - get results failed - v2", async () => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  expect(secureEcom).toBeTruthy();

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
      expect(Secure3dStatus.Enrolled).toBe(initAuth.enrolled);
      expect(Secure3dStatus.ChallengeRequired).toBe(initAuth.status);
      expect(initAuth.issuerAcsUrl).toBeTruthy();
      expect(initAuth.payerAuthenticationRequest).toBeTruthy();

      const secureEcom2 = await Secure3dService.getAuthenticationData()
        .withServerTransactionId(initAuth.serverTransactionId)
        .withAmount(amount)
        .execute();
      if (secureEcom2 instanceof ThreeDSecure) {
        expect(Secure3dStatus.ChallengeRequired).toBe(secureEcom2.status);
      }
    }
  }
});

test("full cycle with card tokenization v2", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_1;

  const response = await card.tokenize().execute();

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;
  tokenizedCard.cardHolderName = "James Mason";

  const secureEcom = await Secure3dService.checkEnrollment(tokenizedCard)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  expect(secureEcom).toBeTruthy();

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
      .withOrderTransactionType(OrderTransactionType.GoodsServicePurchase)
      .withBrowserData(browserData)
      .execute();

    expect(initAuth).toBeTruthy();
    expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom.status);
    expect("YES").toBe(secureEcom.liabilityShift);

    const secureEcom2 = await Secure3dService.getAuthenticationData()
      .withServerTransactionId(secureEcom.serverTransactionId)
      .withAmount(amount)
      .execute();

    if (secureEcom2 instanceof ThreeDSecure) {
      expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);
      expect("YES").toBe(secureEcom2.liabilityShift);
    }

    tokenizedCard.threeDSecure = secureEcom2;

    const response = await card.verify().withCurrency(currency).execute();

    expect(response).toBeTruthy();
    expect("SUCCESS").toBe(response.responseCode);
    expect("VERIFIED").toBe(response.responseMessage);

    const transaction = await card
      .charge(amount)
      .withCurrency(currency)
      .execute();

    expect(transaction).toBeTruthy();
    expect("SUCCESS").toBe(transaction.responseCode);
    expect(TransactionStatus.CAPTURED).toBe(transaction.responseMessage);
  }
});

test("frictionless full cycle - different amount - v2", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_1;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  expect(secureEcom).toBeTruthy();

  if (!(secureEcom instanceof Transaction)) {
    expect(Secure3dStatus.Enrolled).toBe(secureEcom?.enrolled);
    expect(Secure3dVersion.TWO).toBe(secureEcom.getVersion());
    expect(Secure3dStatus.Available).toBe(secureEcom.status);
    expect(amount).toBe(String(secureEcom.amount));

    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const initAuth = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(9)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.Browser)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withBrowserData(browserData)
      .execute();

    expect(initAuth).toBeTruthy();
    if (initAuth instanceof ThreeDSecure) {
      expect(Secure3dStatus.SuccessAuthenticated).toBe(initAuth.status);
      expect(amount).toBe(String(initAuth.getAmount()));
      expect("YES").toBe(initAuth.liabilityShift);

      const secureEcom2 = await Secure3dService.getAuthenticationData()
        .withServerTransactionId(initAuth.serverTransactionId)
        .execute();

      card.threeDSecure = initAuth;

      if (secureEcom2 instanceof ThreeDSecure) {
        expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);
        expect("YES").toBe(secureEcom2.liabilityShift);
        expect(amount).toBe(String(secureEcom2.getAmount()));
      }

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

test("card holder enrolled - challenge required - v2 duplicate acs request", async () => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .execute();

  expect(secureEcom).toBeTruthy();

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
      }

      const authClient2 = new ThreeDSecureAcsClient(secureEcom.issuerAcsUrl);
      authClient2.setGatewayProvider(gatewayProvider);
      const authResponse2 = await authClient2.authenticate_v2(initAuth);
      if (authResponse2 instanceof AcsResponse) {
        expect(authResponse2.getStatus()).toBe(true);
        expect(authResponse2.getMerchantData()).toBeTruthy();

        const secureEcom2 = await Secure3dService.getAuthenticationData()
          .withServerTransactionId(authResponse2.getMerchantData())
          .withAmount(amount)
          .execute();

        card.threeDSecure = secureEcom2;

        if (secureEcom2 instanceof ThreeDSecure) {
          expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);
          expect("YES").toBe(secureEcom2.liabilityShift);
        }

        const transaction = await card
          .charge(amount)
          .withCurrency(currency)
          .execute();

        expect(transaction).toBeTruthy();
        expect("SUCCESS").toBe(transaction.responseCode);
        expect(TransactionStatus.CAPTURED).toBe(transaction.responseMessage);
      }
    }
  }
});

test("credit sale tokenized with stored credentials recurring", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_1;

  card.entryMethod = ManualEntryMethod.MOTO;

  const storedCredentials = new StoredCredential();
  storedCredentials.initiator = EnumMapping.mapStoredCredentialInitiator(
    gatewayProvider,
    StoredCredentialInitiator.Merchant,
  ) as StoredCredentialInitiator;
  storedCredentials.type = StoredCredentialType.RECURRING;
  storedCredentials.sequence = StoredCredentialSequence.SUBSEQUENT;
  storedCredentials.reason = StoredCredentialReason.INCREMENTAL;

  const response = await card.tokenize().execute();

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const secureEcom = await Secure3dService.checkEnrollment(tokenizedCard)
    .withCurrency(currency)
    .withAmount(amount)
    .withAuthenticationSource(AuthenticationSource.Browser)
    .execute();

  expect(secureEcom).toBeTruthy();

  if (!(secureEcom instanceof Transaction)) {
    expect(Secure3dStatus.Enrolled).toBe(secureEcom?.enrolled);
    expect(Secure3dVersion.TWO).toBe(secureEcom.getVersion());
    expect(Secure3dStatus.Available).toBe(secureEcom.status);

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
    if (initAuth instanceof ThreeDSecure) {
      expect(Secure3dStatus.SuccessAuthenticated).toBe(initAuth.status);

      const secureEcom2 = await Secure3dService.getAuthenticationData()
        .withServerTransactionId(secureEcom.serverTransactionId)
        .withAmount(amount)
        .execute();

      tokenizedCard.threeDSecure = secureEcom2;

      if (secureEcom2 instanceof ThreeDSecure) {
        expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);
        expect("YES").toBe(secureEcom2.liabilityShift);
      }

      const transaction = await tokenizedCard
        .charge(amount)
        .withCurrency(currency)
        .execute();

      expect(transaction).toBeTruthy();
      expect("SUCCESS").toBe(transaction.responseCode);
      expect(TransactionStatus.CAPTURED).toBe(transaction.responseMessage);
      expect(transaction.cardBrandTransactionId).toBeTruthy();

      const recurringPayment = await tokenizedCard
        .charge(amount)
        .withCurrency(currency)
        .withStoredCredentials(storedCredentials)
        .withCardBrandStorage(
          StoredCredentialInitiator.Merchant,
          transaction.cardBrandTransactionId,
        )
        .execute();

      expect(recurringPayment).toBeTruthy();
      expect("SUCCESS").toBe(recurringPayment.responseCode);
      expect(TransactionStatus.CAPTURED).toBe(recurringPayment.responseMessage);
      expect(recurringPayment.cardBrandTransactionId).toBeTruthy();
    }
  }
});

test("frictionless full cycle - v2 - with mobile SDK", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_2;

  const secureEcom = await Secure3dService.checkEnrollment(card)
    .withCurrency(currency)
    .withAmount(amount)
    .withAuthenticationSource(AuthenticationSource.Browser)
    .execute();

  expect(secureEcom).toBeTruthy();

  if (!(secureEcom instanceof Transaction)) {
    expect(Secure3dStatus.Enrolled).toBe(secureEcom?.enrolled);
    expect(Secure3dVersion.TWO).toBe(secureEcom.getVersion());
    expect(Secure3dStatus.Available).toBe(secureEcom.status);

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

    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const initAuth = await Secure3dService.initiateAuthentication(
      card,
      secureEcom,
    )
      .withAmount(amount)
      .withCurrency(currency)
      .withAuthenticationSource(AuthenticationSource.MobileSdk)
      .withMethodUrlCompletion(MethodUrlCompletion.Yes)
      .withOrderCreateDate(formatedDate)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withOrderTransactionType(OrderTransactionType.GoodsServicePurchase)
      .withMobileData(mobileData)
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

      const secureEcom2 = await Secure3dService.getAuthenticationData()
        .withServerTransactionId(secureEcom.serverTransactionId)
        .withAmount(amount)
        .execute();

      card.threeDSecure = secureEcom2;

      if (secureEcom2 instanceof ThreeDSecure) {
        expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);
        expect("YES").toBe(secureEcom2.liabilityShift);
      }

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

test("decoupled auth", async () => {
  card.number = GpApi3DSTestCards.CARD_AUTH_SUCCESSFUL_V2_1;

  const response = await card.tokenize().execute();

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;
  tokenizedCard.cardHolderName = "James Mason";

  const secureEcom = await Secure3dService.checkEnrollment(tokenizedCard)
    .withCurrency(currency)
    .withAmount(amount)
    .withDecoupledNotificationUrl(
      "https://www.example.com/decoupledNotification",
    )
    .execute();

  expect(secureEcom).toBeTruthy();

  if (!(secureEcom instanceof Transaction)) {
    expect(Secure3dStatus.Enrolled).toBe(secureEcom?.enrolled);
    expect(Secure3dVersion.TWO).toBe(secureEcom.getVersion());
    expect(Secure3dStatus.Available).toBe(secureEcom.status);

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
      .withDecoupledFlowRequest(true)
      .withDecoupledFlowTimeout(9001)
      .withDecoupledNotificationUrl(
        "https://www.example.com/decoupledNotification",
      )
      .execute();

    expect(initAuth).toBeTruthy();
    if (initAuth instanceof ThreeDSecure) {
      expect(Secure3dStatus.SuccessAuthenticated).toBe(initAuth.status);
      expect("YES").toBe(initAuth.liabilityShift);
    }

    const secureEcom2 = await Secure3dService.getAuthenticationData()
      .withServerTransactionId(secureEcom.serverTransactionId)
      .withAmount(amount)
      .execute();

    tokenizedCard.threeDSecure = secureEcom2;

    if (secureEcom2 instanceof ThreeDSecure) {
      expect(Secure3dStatus.SuccessAuthenticated).toBe(secureEcom2.status);
      expect("YES").toBe(secureEcom2.liabilityShift);
    }

    const transaction = await tokenizedCard
      .charge(amount)
      .withCurrency(currency)
      .execute();

    expect(transaction).toBeTruthy();
    expect("SUCCESS").toBe(transaction.responseCode);
    expect(TransactionStatus.CAPTURED).toBe(transaction.responseMessage);
    expect(transaction.cardBrandTransactionId).toBeTruthy();
  }
});

test("exemption sale transaction", async () => {
  card.number = GpApi3DSTestCards.CARD_CHALLENGE_REQUIRED_V2_2;

  const threeDS = new ThreeDSecure();
  threeDS.exemptStatus = ExemptStatus.LowValue;
  card.threeDSecure = threeDS;
  const response = await card.charge(amount).withCurrency(currency).execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.CAPTURED).toBe(response.responseMessage);
});

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());
