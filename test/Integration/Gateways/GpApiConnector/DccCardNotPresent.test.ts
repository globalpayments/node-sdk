import {
  AccessTokenInfo,
  Channel,
  CreditCardData,
  GatewayError,
  GenerationUtils,
  ServicesContainer,
  Transaction,
  TransactionStatus,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

const date = new Date();
const currency = "EUR";
const amount = 15.11;

const card = new CreditCardData();
card.number = "4006097467207025";
card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
card.expYear = (date.getFullYear() + 1).toString();
card.cardHolderName = "James Mason";

const getAmount = (dccDetails: Transaction) => {
  return (
    Math.round(amount * Number(dccDetails.dccRateData.cardHolderRate) * 100) /
    100
  );
};

const assertDccInfoResponse = (
  dccDetails: Transaction,
  expectedValue: number,
) => {
  expect(dccDetails).toBeTruthy();
  expect(dccDetails.responseCode).toBe("SUCCESS");
  expect(dccDetails.responseMessage).toBe("AVAILABLE");
  expect(dccDetails.dccRateData).toBeTruthy();

  expect(dccDetails.dccRateData.cardHolderAmount).toBe(String(expectedValue));
};

const assertTransactionResponse = (
  transaction: Transaction,
  transactionStatus: TransactionStatus,
  expectedValue: number,
): void => {
  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(transactionStatus as string).toBe(transaction.responseMessage);

  if (transactionStatus !== TransactionStatus.REVERSED) {
    expect(transaction.dccRateData.cardHolderAmount).toBe(
      String(expectedValue),
    );
  }
};

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

beforeAll(() => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  const accessTokenInfo = new AccessTokenInfo();
  accessTokenInfo.transactionProcessingAccountName = "dcc";
  config.accessTokenInfo = accessTokenInfo;
  ServicesContainer.configureService(config);
});

test("credit get dcc info", async () => {
  const dccDetails = await card
    .getDccRate()
    .withAmount(amount)
    .withCurrency(currency)
    .execute();

  const expectedValue = getAmount(dccDetails);
  assertDccInfoResponse(dccDetails, expectedValue);

  await wait(2000);

  const response = await card
    .charge(amount)
    .withCurrency(currency)
    .withDccRateData(dccDetails.dccRateData)
    .execute();

  assertTransactionResponse(
    response,
    TransactionStatus.CAPTURED,
    expectedValue,
  );
});

test("credit get dcc rate authorize", async () => {
  const dccDetails = await card
    .getDccRate()
    .withAmount(amount)
    .withCurrency(currency)
    .execute();

  const expectedValue = getAmount(dccDetails);
  assertDccInfoResponse(dccDetails, expectedValue);

  await wait(2000);

  const response = await card
    .authorize(amount)
    .withCurrency(currency)
    .withDccRateData(dccDetails.dccRateData)
    .execute();

  assertTransactionResponse(
    response,
    TransactionStatus.PREAUTHORIZED,
    expectedValue,
  );
});

test("credit get dcc rate refund standalone", async () => {
  const dccDetails = await card
    .getDccRate()
    .withAmount(amount)
    .withCurrency(currency)
    .execute();

  const expectedValue = getAmount(dccDetails);
  assertDccInfoResponse(dccDetails, expectedValue);

  await wait(2000);

  const response = await card
    .refund(amount)
    .withCurrency(currency)
    .withDccRateData(dccDetails.dccRateData)
    .execute();

  assertTransactionResponse(
    response,
    TransactionStatus.CAPTURED,
    expectedValue,
  );
});

test("credit get dcc rate reversal", async () => {
  const dccDetails = await card
    .getDccRate()
    .withAmount(amount)
    .withCurrency(currency)
    .execute();

  const expectedValue = getAmount(dccDetails);
  assertDccInfoResponse(dccDetails, expectedValue);

  await wait(2000);

  const response = await card
    .charge(amount)
    .withCurrency(currency)
    .withDccRateData(dccDetails.dccRateData)
    .execute();

  assertTransactionResponse(
    response,
    TransactionStatus.CAPTURED,
    expectedValue,
  );

  const reverse = await response
    .reverse()
    .withDccRateData(response.dccRateData)
    .execute();

  assertTransactionResponse(reverse, TransactionStatus.REVERSED, expectedValue);
});
test("credit get dcc rate refund", async () => {
  const dccDetails = await card
    .getDccRate()
    .withAmount(amount)
    .withCurrency(currency)
    .execute();

  const expectedValue = getAmount(dccDetails);
  assertDccInfoResponse(dccDetails, expectedValue);

  await wait(2000);

  const response = await card
    .charge(amount)
    .withCurrency(currency)
    .withDccRateData(dccDetails.dccRateData)
    .execute();

  assertTransactionResponse(
    response,
    TransactionStatus.CAPTURED,
    expectedValue,
  );

  const refund = await response
    .refund()
    .withCurrency(currency)
    .withDccRateData(dccDetails.dccRateData)
    .execute();

  assertTransactionResponse(refund, TransactionStatus.CAPTURED, expectedValue);
});

test("authorization then capture", async () => {
  const dccDetails = await card
    .getDccRate()
    .withAmount(amount)
    .withCurrency(currency)
    .execute();

  const expectedValue = getAmount(dccDetails);
  assertDccInfoResponse(dccDetails, expectedValue);

  await wait(2000);

  const response = await card
    .authorize(amount)
    .withCurrency(currency)
    .withDccRateData(dccDetails.dccRateData)
    .execute();

  assertTransactionResponse(
    response,
    TransactionStatus.PREAUTHORIZED,
    expectedValue,
  );

  const reverse = await response
    .capture()
    .withDccRateData(response.dccRateData)
    .execute();

  assertTransactionResponse(reverse, TransactionStatus.CAPTURED, expectedValue);
});

test("card tokenization then paying with token", async () => {
  const tokenizedCardRes = await card.tokenize().execute();

  expect(tokenizedCardRes).toBeTruthy();
  expect(tokenizedCardRes.responseCode).toBe("SUCCESS");
  expect(tokenizedCardRes.responseMessage).toBe("ACTIVE");

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenizedCardRes.token;
  tokenizedCard.cardHolderName = "James Mason";

  const dccDetails = await tokenizedCard
    .getDccRate()
    .withAmount(amount)
    .withCurrency(currency)
    .execute();

  const expectedValue = getAmount(dccDetails);
  assertDccInfoResponse(dccDetails, expectedValue);

  await wait(2000);

  const response = await card
    .charge(amount)
    .withCurrency(currency)
    .withDccRateData(dccDetails.dccRateData)
    .execute();

  assertTransactionResponse(
    response,
    TransactionStatus.CAPTURED,
    expectedValue,
  );
});

test("credit get DCC info - with idempotency key", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const dccDetails = await card
    .getDccRate()
    .withAmount(amount)
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  const expectedValue = getAmount(dccDetails);
  assertDccInfoResponse(dccDetails, expectedValue);

  try {
    await card
      .getDccRate()
      .withAmount(amount)
      .withCurrency(currency)
      .withIdempotencyKey(idempotencyKey)
      .execute();
  } catch (e) {
    expect(e instanceof GatewayError).toBe(true);
    expect(e.responseCode).toBe("40039");
    expect(e.message).toBe(
      `Status Code: DUPLICATE_ACTION - Idempotency Key seen before: id=${dccDetails.transactionId}, status=AVAILABLE`,
    );
  }
});

test("credit get dcc info - rate not available", async () => {
  card.number = "4263970000005262";

  const dccDetails = await card
    .getDccRate()
    .withAmount(amount)
    .withCurrency(currency)
    .execute();

  const expectedValue = getAmount(dccDetails);

  expect(dccDetails).toBeTruthy();
  expect(dccDetails.responseCode).toBe("SUCCESS");
  expect(dccDetails.responseMessage).toBe("NOT_AVAILABLE");
  expect(dccDetails.dccRateData).toBeTruthy();
  expect(!!dccDetails.dccRateData.cardHolderAmount).toBe(!!expectedValue);

  await wait(2000);

  const response = await card
    .charge(amount)
    .withCurrency(currency)
    .withDccRateData(dccDetails.dccRateData)
    .execute();

  assertTransactionResponse(response, TransactionStatus.CAPTURED, amount);
  expect(response.dccRateData.cardHolderAmount).toBe(String(amount));
  expect(response.dccRateData.cardHolderCurrency).toBe(currency);
});

test("credit get DCC info - invalid card number", async () => {
  card.number = "4000000000005262";

  try {
    await card.getDccRate().withAmount(amount).withCurrency(currency).execute();
  } catch (e) {
    expect(e instanceof GatewayError).toBe(true);
    expect(e.responseCode).toBe("40090");
    expect(e.message).toBe(
      `Status Code: INVALID_REQUEST_DATA - card.number value is invalid. Please check the format and data provided is correct.`,
    );
  }
});

test("credit get DCC info - without amount", async () => {
  try {
    await card.getDccRate().withCurrency(currency).execute();
  } catch (e) {
    expect(e instanceof GatewayError).toBe(true);
    expect(e.responseCode).toBe("40005");
    expect(e.message).toBe(
      `Status Code: MANDATORY_DATA_MISSING - Request expects the following fields : amount`,
    );
  }
});

test("credit get DCC info - without currency", async () => {
  try {
    await card.getDccRate().withAmount(amount).execute();
  } catch (e) {
    expect(e instanceof GatewayError).toBe(true);
    expect(e.responseCode).toBe("40005");
    expect(e.message).toBe(
      `Status Code: MANDATORY_DATA_MISSING - Request expects the following fields : currency`,
    );
  }
});

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());
