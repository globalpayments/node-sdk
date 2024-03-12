import test from "ava";
import {
  Channel,
  CreditCardData,
  GatewayError,
  GenerationUtils,
  ManagementBuilder,
  PaymentMethodUsageMode,
  ReportingService,
  SearchCriteria,
  ServicesContainer,
  SortDirection,
  StoredPaymentMethodSortProperty,
  TransactionStatus,
  TransactionType,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../../test/Data/BaseGpApiTestConfig";
import { PaymentMethod } from "../../../../src/Entities/GpApi/DTO";

const date = new Date();

const idempotencyKey = GenerationUtils.getGuuid();

const currency = "GBP";

const card = new CreditCardData();
card.number = "4263970000005262";
card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
card.expYear = (date.getFullYear() + 1).toString();
card.cvn = "131";
card.cardHolderName = "James Mason";

test.before(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

test("card tokenization", async (t) => {
  const response = await card.tokenize().execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is("ACTIVE", response.responseMessage);
});

test("card tokenization then paying with token - Single to Multi-Use", async (t) => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.permissions = ["PMT_POST_Create_Single"];
  ServicesContainer.configureService(config, "singleUseToken");

  const response = await card
    .tokenize(true, PaymentMethodUsageMode.SINGLE)
    .execute("singleUseToken");
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  tokenizedCard.cardHolderName = "James Mason";

  const chargeResponse = await tokenizedCard
    .charge(10)
    .withCurrency("USD")
    .withRequestMultiUseToken(true)
    .execute();

  t.truthy(chargeResponse);
  t.is(chargeResponse.responseCode, "SUCCESS");
  t.is(chargeResponse.responseMessage, TransactionStatus.CAPTURED);
  t.truthy(
    chargeResponse.token.startsWith(PaymentMethod.PAYMENT_METHOD_TOKEN_PREFIX),
  );

  tokenizedCard.token = chargeResponse.token;

  const secondChargeResponse = await tokenizedCard
    .charge(10)
    .withCurrency("USD")
    .execute();

  t.truthy(secondChargeResponse);
  t.is(secondChargeResponse.responseCode, "SUCCESS");
  t.is(secondChargeResponse.responseMessage, TransactionStatus.CAPTURED);
});

test("card tokenization with idempotency key", async (t) => {
  const response = await card
    .tokenize()
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "SUCCESS");
  t.is(response.responseMessage, "ACTIVE");

  let exceptionCaught = false;
  try {
    await card.tokenize().withIdempotencyKey(idempotencyKey).execute();
  } catch (e) {
    exceptionCaught = true;
    t.is(e.responseCode, "40039");
    t.true(e.message.includes("Idempotency Key seen before"));
  } finally {
    t.true(exceptionCaught);
  }
});

test("card tokenization then paying with token", async (t) => {
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  tokenizedCard.cardHolderName = "James Mason";

  const chargeResponse = await tokenizedCard
    .charge(69)
    .withCurrency("EUR")
    .withOrderId("124214-214221")
    .execute();

  t.truthy(chargeResponse);
  t.is(chargeResponse.responseCode, "SUCCESS");
  t.is(chargeResponse.responseMessage, TransactionStatus.CAPTURED);
});

test("verify tokenized payment method", async (t) => {
  const tokenizeResponse = await card.tokenize().execute();

  t.truthy(tokenizeResponse);
  t.is(tokenizeResponse.responseCode, "SUCCESS");
  t.is(tokenizeResponse.responseMessage, "ACTIVE");

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenizeResponse.token;

  const response = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "SUCCESS");
  t.is(response.responseMessage, "VERIFIED");
});

test("verify tokenized payment method with idempotency key", async (t) => {
  const tokenizeResponse = await card.tokenize().execute();

  t.truthy(tokenizeResponse);
  t.is(tokenizeResponse.responseCode, "SUCCESS");
  t.is(tokenizeResponse.responseMessage, "ACTIVE");

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenizeResponse.token;

  const response = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "SUCCESS");
  t.is(response.responseMessage, "VERIFIED");

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.verify().withIdempotencyKey(idempotencyKey).execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40039");
  t.is(error?.message.includes(`Idempotency Key seen before`), true);
});

test("verify tokenized payment method with wrong ID", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.verify().withCurrency(currency).execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40116");
  t.is(
    error?.message,
    `Status Code: RESOURCE_NOT_FOUND - payment_method ${tokenizedCard.token} not found at this location.`,
  );
});

test.skip("card tokenization then delete", async (t) => {
  //Permission not enabled to execute action for this appId/appKey
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;

  const deleteTokenExpiryRes = await tokenizedCard.deleteToken();
  t.truthy(deleteTokenExpiryRes);

  const deleteTokenExpiryRes2 = await tokenizedCard.deleteToken();
  t.falsy(deleteTokenExpiryRes2);
});

test.skip("card tokenization then delete with idempotency key", async (t) => {
  //Permission not enabled to execute action for this appId/appKey
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  const idempotencyKey = GenerationUtils.getGuuid();

  const deleteTokenExpiryRes = await new ManagementBuilder(
    TransactionType.TokenDelete,
  )
    .withPaymentMethod(tokenizedCard)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(deleteTokenExpiryRes);
  t.is(deleteTokenExpiryRes.responseCode, "SUCCESS");
  t.is(deleteTokenExpiryRes.responseMessage, "DELETED");

  const error = await t.throwsAsync(
    async () => {
      await new ManagementBuilder(TransactionType.TokenDelete)
        .withPaymentMethod(tokenizedCard)
        .withIdempotencyKey(idempotencyKey)
        .execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40039");
  if (error?.message) {
    t.regex(error?.message, new RegExp("Idempotency Key seen before"));
  }
});

test.skip("card delete wrong id", async (t) => {
  //Permission not enabled to execute action for this appId/appKey

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.deleteToken();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40116");
  t.is(
    error?.message,
    `Status Code: RESOURCE_NOT_FOUND - payment_method ${tokenizedCard.token} not found at this location.`,
  );
});

test("card tokenization then update", async (t) => {
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  const date = new Date();
  tokenizedCard.expMonth = (date.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (date.getFullYear() + 2).toString();

  const updateTokenExpiryRes = await tokenizedCard.updateTokenExpiry();

  t.truthy(updateTokenExpiryRes);
});

test("card update wrong ID", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "PMT_" + GenerationUtils.getGuuid();
  const date = new Date();
  tokenizedCard.expMonth = (date.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (date.getFullYear() + 2).toString();

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.updateTokenExpiry();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(
    error?.message,
    `Status Code: RESOURCE_NOT_FOUND - payment_method ${tokenizedCard.token} not found at this location.`,
  );
});

test("card tokenization then update with idempotency key", async (t) => {
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  const date = new Date();
  tokenizedCard.expMonth = (date.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (date.getFullYear() + 2).toString();
  const idempotencyKey = GenerationUtils.getGuuid();

  const updateTokenExpiryRes = await new ManagementBuilder(
    TransactionType.TokenUpdate,
  )
    .withPaymentMethod(tokenizedCard)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(updateTokenExpiryRes);
  t.is(updateTokenExpiryRes.responseCode, "SUCCESS");
  t.is(updateTokenExpiryRes.responseMessage, "ACTIVE");

  const error = await t.throwsAsync(
    async () => {
      await new ManagementBuilder(TransactionType.TokenUpdate)
        .withPaymentMethod(tokenizedCard)
        .withIdempotencyKey(idempotencyKey)
        .execute();
    },
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40039");
  if (error?.responseMessage) {
    t.regex(error?.responseMessage, new RegExp("Idempotency Key seen before"));
  }

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(verifyResponse);
  t.is(verifyResponse.responseCode, "SUCCESS");
  t.is(verifyResponse.responseMessage, "VERIFIED");

  tokenizedCard.expYear = (date.getFullYear() + 3).toString();
  const updateTokenExpiryRes2 = await tokenizedCard.updateTokenExpiry();

  t.truthy(updateTokenExpiryRes2);
});

test("card tokenization - Missing card number", async (t) => {
  const card = new CreditCardData();

  const error = await t.throwsAsync(
    async () => {
      await card.tokenize().execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(
    error?.message,
    "Status Code: MANDATORY_DATA_MISSING - Request expects the following fields : number",
  );
});

test("update payment token", async (t) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    1,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Desc)
    .where(
      SearchCriteria.StartDate,
      `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`,
    )
    .execute();

  t.is(response.result.length, 1);

  const pmtToken = response.result[0];

  t.truthy(pmtToken);

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = pmtToken.paymentMethodId;
  const date = new Date();
  tokenizedCard.cardHolderName = "James BondUp";
  tokenizedCard.expMonth = (date.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (date.getFullYear() + 4).toString();
  tokenizedCard.number = "4263970000005262";

  const responseUpdateToken = await tokenizedCard
    .updateToken()
    .withPaymentMethodUsageMode(PaymentMethodUsageMode.MULTIPLE)
    .execute();

  t.truthy(responseUpdateToken);
  t.is(responseUpdateToken.responseCode, "SUCCESS");
  t.is(responseUpdateToken.responseMessage, "ACTIVE");
  t.is(responseUpdateToken.token, pmtToken.paymentMethodId);
  t.is(responseUpdateToken.tokenUsageMode, PaymentMethodUsageMode.MULTIPLE);
});

test("card tokenization then update then charge", async (t) => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.permissions = ["PMT_POST_Create_Single"];
  ServicesContainer.configureService(config, "singleUseToken");

  const response = await card
    .tokenize()
    .withPaymentMethodUsageMode(PaymentMethodUsageMode.SINGLE)
    .execute("singleUseToken");

  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  tokenizedCard.cardHolderName = "GpApi";

  const responseUpdateToken = await tokenizedCard
    .updateToken()
    .withPaymentMethodUsageMode(PaymentMethodUsageMode.MULTIPLE)
    .execute();

  t.truthy(responseUpdateToken);
  t.is(responseUpdateToken.responseCode, "SUCCESS");
  t.is(responseUpdateToken.responseMessage, "ACTIVE");
  t.is(responseUpdateToken.tokenUsageMode, PaymentMethodUsageMode.MULTIPLE);

  const chargeResponse = await tokenizedCard
    .charge(1)
    .withCurrency(currency)
    .execute();

  t.truthy(chargeResponse);
  t.is(chargeResponse.responseCode, "SUCCESS");
  t.is(chargeResponse.responseMessage, TransactionStatus.CAPTURED);
});

test("card tokenization then update to single usage", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard
        .updateToken()
        .withPaymentMethodUsageMode(PaymentMethodUsageMode.SINGLE)
        .execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "50020");
  t.is(
    error?.message,
    "Status Code: INVALID_REQUEST_DATA - Tokentype can only be MULTI",
  );
});

test("card tokenization then update to without usage mode", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.updateToken().execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "50021");
  t.is(
    error?.message,
    "Status Code: MANDATORY_DATA_MISSING - Mandatory Fields missing [card expdate] See Developers Guide",
  );
});

test.after(() => BaseGpApiTestConfig.resetGpApiConfig());
