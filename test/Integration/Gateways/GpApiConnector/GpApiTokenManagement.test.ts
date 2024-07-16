import {
  Channel,
  CreditCardData,
  GatewayError,
  GenerationUtils,
  ServicesContainer,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data";

const date = new Date();

const currency = "USD";

const card = new CreditCardData();
card.number = "4263970000005262";
card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
card.expYear = (date.getFullYear() + 1).toString();
card.cvn = "131";
card.cardHolderName = "James Mason";

beforeEach(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

test("verify tokenized payment method", async () => {
  const response = await card.tokenize().execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .execute();

  expect(verifyResponse).toBeTruthy();
  expect("SUCCESS").toBe(verifyResponse.responseCode);
  expect("VERIFIED").toBe(verifyResponse.responseMessage);
});

test("verify tokenized payment method with idempotency key", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const response = await card.tokenize().execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  expect(verifyResponse).toBeTruthy();
  expect("SUCCESS").toBe(verifyResponse.responseCode);
  expect("VERIFIED").toBe(verifyResponse.responseMessage);

  try {
    await tokenizedCard
      .verify()
      .withCurrency(currency)
      .withIdempotencyKey(idempotencyKey)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40039");
    expect(error?.message).toBe(
      "Status Code: DUPLICATE_ACTION - Idempotency Key seen before: id=".concat(
        verifyResponse.transactionId,
      ),
    );
    expect(error).toBeInstanceOf(GatewayError);
  }
});

test("update tokenized payment method then verify", async () => {
  const response = await card.tokenize().execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;
  tokenizedCard.expMonth = "12";
  tokenizedCard.expYear = "2030";

  expect(await tokenizedCard.updateTokenExpiry()).toBe(true);

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .execute();

  expect(verifyResponse).toBeTruthy();
  expect("SUCCESS").toBe(verifyResponse.responseCode);
  expect("VERIFIED").toBe(verifyResponse.responseMessage);
});

test("verify tokenized payment method with malformed id", async () => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "This_is_not_a_payment_id";

  try {
    await tokenizedCard.verify().withCurrency(currency).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - payment_method.id: This_is_not_a_payment_id contains unexpected data",
    );
    expect(error?.responseCode).toBe("40213");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

test("tokenize payment method with missing card number", async () => {
  const card = new CreditCardData();
  card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  card.expYear = (date.getFullYear() + 1).toString();

  try {
    await card.tokenize().execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: MANDATORY_DATA_MISSING - Request expects the following fields : number",
    );
    expect(error?.responseCode).toBe("40005");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

test("verify tokenized payment method with random id", async () => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "PMT_".concat(GenerationUtils.getGuuid());

  try {
    await tokenizedCard.verify().withCurrency(currency).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: RESOURCE_NOT_FOUND - payment_method "
        .concat(tokenizedCard.token)
        .concat(" not found at this location."),
    );
    expect(error?.responseCode).toBe("40116");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

test("update tokenized payment method with malformed id", async () => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "This_is_not_a_payment_id";
  tokenizedCard.expYear = (date.getFullYear() + 1).toString();
  tokenizedCard.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");

  try {
    await tokenizedCard.updateTokenExpiry();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - payment_method.id: This_is_not_a_payment_id contains unexpected data",
    );
    expect(error?.responseCode).toBe("40213");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

test("update tokenized payment method with random id", async () => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "PMT_".concat(GenerationUtils.getGuuid());
  tokenizedCard.expYear = (date.getFullYear() + 1).toString();
  tokenizedCard.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");

  try {
    await tokenizedCard.updateTokenExpiry();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: RESOURCE_NOT_FOUND - payment_method "
        .concat(tokenizedCard.token)
        .concat(" not found at this location."),
    );
    expect(error?.responseCode).toBe("40116");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());
