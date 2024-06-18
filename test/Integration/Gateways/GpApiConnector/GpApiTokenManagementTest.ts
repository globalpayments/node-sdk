import ava from "ava";
import {
  Channel,
  CreditCardData,
  GatewayError,
  GenerationUtils,
  ServicesContainer,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data";

const runSerially = true;
const test = runSerially ? ava.serial : ava;

const date = new Date();

const currency = "USD";

const card = new CreditCardData();
card.number = "4263970000005262";
card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
card.expYear = (date.getFullYear() + 1).toString();
card.cvn = "131";
card.cardHolderName = "James Mason";

test.beforeEach(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

test("verify tokenized payment method", async (t) => {
  const response = await card.tokenize().execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .execute();

  t.truthy(verifyResponse);
  t.is("SUCCESS", verifyResponse.responseCode);
  t.is("VERIFIED", verifyResponse.responseMessage);
});

test("verify tokenized payment method with idempotency key", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const response = await card.tokenize().execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(verifyResponse);
  t.is("SUCCESS", verifyResponse.responseCode);
  t.is("VERIFIED", verifyResponse.responseMessage);

  const error = await t.throwsAsync(
    async () =>
      await tokenizedCard
        .verify()
        .withCurrency(currency)
        .withIdempotencyKey(idempotencyKey)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40039");
  t.is(
    error?.message,
    "Status Code: DUPLICATE_ACTION - Idempotency Key seen before: id=".concat(
      verifyResponse.transactionId,
    ),
  );
});

test("update tokenized payment method then verify", async (t) => {
  const response = await card.tokenize().execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;
  tokenizedCard.expMonth = "12";
  tokenizedCard.expYear = "2030";

  t.true(await tokenizedCard.updateTokenExpiry());

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .execute();

  t.truthy(verifyResponse);
  t.is("SUCCESS", verifyResponse.responseCode);
  t.is("VERIFIED", verifyResponse.responseMessage);
});

test("verify tokenized payment method with malformed id", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "This_is_not_a_payment_id";

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.verify().withCurrency(currency).execute();
    },
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(
    error?.message,
    "Status Code: INVALID_REQUEST_DATA - payment_method.id: This_is_not_a_payment_id contains unexpected data",
  );
  t.is(error?.responseCode, "40213");
});

test("tokenize payment method with missing card number", async (t) => {
  const card = new CreditCardData();
  card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  card.expYear = (date.getFullYear() + 1).toString();

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
  t.is(error?.responseCode, "40005");
});

test("verify tokenized payment method with random id", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "PMT_".concat(GenerationUtils.getGuuid());

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.verify().withCurrency(currency).execute();
    },
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(
    error?.message,
    "Status Code: RESOURCE_NOT_FOUND - payment_method "
      .concat(tokenizedCard.token)
      .concat(" not found at this location."),
  );
  t.is(error?.responseCode, "40116");
});

test("update tokenized payment method with malformed id", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "This_is_not_a_payment_id";
  tokenizedCard.expYear = (date.getFullYear() + 1).toString();
  tokenizedCard.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");

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
    "Status Code: INVALID_REQUEST_DATA - payment_method.id: This_is_not_a_payment_id contains unexpected data",
  );
  t.is(error?.responseCode, "40213");
});

test("update tokenized payment method with random id", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "PMT_".concat(GenerationUtils.getGuuid());
  tokenizedCard.expYear = (date.getFullYear() + 1).toString();
  tokenizedCard.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");

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
    "Status Code: RESOURCE_NOT_FOUND - payment_method "
      .concat(tokenizedCard.token)
      .concat(" not found at this location."),
  );
  t.is(error?.responseCode, "40116");
});

test.after(() => BaseGpApiTestConfig.resetGpApiConfig());
