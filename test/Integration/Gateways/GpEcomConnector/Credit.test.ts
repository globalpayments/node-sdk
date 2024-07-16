import {
  CreditCardData,
  GatewayError,
  Logger,
  RecurringSequence,
  RecurringType,
  SampleRequestLogger,
  ServicesContainer,
  TransactionModifier,
} from "../../../../src";
import { GpEcomConfig } from "../../../../src/ServiceConfigs";

const config = new GpEcomConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.rebatePassword = "rebate";
config.refundPassword = "refund";
config.requestLogger = new SampleRequestLogger(new Logger("logs"));

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

beforeAll(() => {
  ServicesContainer.configureService(config);
});

test("credit authorization", async () => {
  const authorization = await card
    .authorize(14)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(authorization).not.toBe(null);
  expect(authorization.responseCode).toBe("00");

  const capture = await authorization.capture(16).withGratuity(2).execute();

  expect(capture).not.toBe(null);
  expect(capture.responseCode).toBe("00");
});

test("credit sale", async () => {
  expect.assertions(2);

  const response = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit sale with recurring", async () => {
  expect.assertions(2);

  const response = await card
    .charge(15)
    .withCurrency("USD")
    .withRecurringInfo(RecurringType.Fixed, RecurringSequence.First)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit refund", async () => {
  expect.assertions(2);

  const response = await card
    .refund(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit rebate", async () => {
  expect.assertions(4);

  const response = await card
    .charge(12)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const rebate = await response.refund(12).withCurrency("USD").execute();

  expect(rebate).toBeTruthy();
  expect(rebate.responseCode).toBe("00");
});

test("credit void", async () => {
  expect.assertions(4);

  const response = await card
    .charge(12)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const rebate = await response.void().execute();

  expect(rebate).toBeTruthy();
  expect(rebate.responseCode).toBe("00");
});

test("credit verify", async () => {
  const response = await card.verify().withAllowDuplicates(true).execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

// TODO - check with guys that can provide token. Apple pay - Diego. Google pay -

test.skip("credit auth mobile - apple pay", async () => {
  const encryptedCard = new CreditCardData();
  // tslint:disable-next-line:max-line-length
  encryptedCard.token = `{"version":"EC_v1","data":"6iQMqNLiyXyQuiPUJO3HIVAIpu8sdZH5XnKiaaguqw5x4QP99RuJckTCDrSwhZ+qHE+reqwCnqLMZjLvDzWvUbpzJ7TTkRf+m7uIH+LD8xQGmq3O4712sHK06BzX1UQ62FPLXbzOF1x0Bcnucz1L3a6yUqiSnB6IaBlWNZfk7znNeDjjlrEFoX4zWw3II3z4yBd1keY81LbaSXivKWDHgdPNp2tnygEEPgH/kjRC9lU/IUmdDsVZrQifcAwVYjB58mT+3jZdSoZd+T2lTTj3MXAl5cFkOGdMQxQhnAmPDAGnfmC/0XPewqRNLTPgbyxmngmdJv80WEExWz3VG++mdkRY0OXit+Lj95m/L54soEpa5zAcq6BzOJ92TUbOByl6bD6yRpcMvrXTCsMR9yf1Gj1da1XKMhxgzj6bNRzx3dw=","signature":"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","header":{"ephemeralPublicKey":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEsuwZ6uQ9pwOWGvWL5tJX6RJ/LP1TTCp721dlzOvS0SBrlOYcYo2j/4h/4ha0kiVTLZahsaXAKbopwzbQn2Ee1w==","publicKeyHash":"rEYX/7PdO7F7xL7rH0LZVak/iXTrkeU89Ck7E9dGFO4=","transactionId":"c12d85023fc208165fbf8ebe25e660bbcb8551b166c3d02030e1a2af2e8b86fd"}}`;

  encryptedCard.mobileType = "apple-pay";

  const incorrectHashError = expect(() =>
    encryptedCard
      .authorize(10)
      .withCurrency("USD")
      .withModifier(TransactionModifier.EncryptedMobile)
      .withAllowDuplicates(true)
      .execute(),
  ).toThrow(new GatewayError()) as unknown as GatewayError;

  expect(incorrectHashError).toBeTruthy();
  expect(incorrectHashError?.responseCode).toBe("505");

  const cannotDecryptError = expect(() =>
    encryptedCard
      .authorize()
      .withModifier(TransactionModifier.EncryptedMobile)
      .withAllowDuplicates(true)
      .execute(),
  ).toThrow(new GatewayError()) as unknown as GatewayError;

  expect(cannotDecryptError).toBeTruthy();
  expect(cannotDecryptError?.responseCode).toBe("515");
});

test.skip("credit auth mobile - google pay", async () => {
  const encryptedCard = new CreditCardData();
  // tslint:disable-next-line:max-line-length
  encryptedCard.token = `{
      "signature": "MEQCIAv8iIZmQK95xMrruLLLvJ2/uGuq54SSq190WS62M4a4AiAQhRwPHt3HXaOtCUYphfZLhIRznbF3TWxXLfPCGoutTQ==",
      "protocolVersion": "ECv1",
      "signedMessage": "{"encryptedMessage":"h1Zfi0b6wQoD3b1qOvfa6EjGa0Bv/Mtxmn/2rRmq/mjLPVuM3Ymu7Uk1IEoPQ/Hk3bafHMCoBrGMQ4YUzLRNMk+YideS4thnE898ZLmnlcPVxWzv+gDodx7spInIK3dTYhMDhdo/28dIqmovl6hPzjPWjAaOfKUs7FvCPjR+HQG7cZb6V41BOzuCCt9wSQGTY5AkIWcTxGVTbA4brd/88A+EZowF10PNl24dygX/ydTAhkBBlVzp33/Poj/Axo7GFtH+kFBgEkBd68LFDHnDd7+GK7HhLq2gv4zVVTUHBSXa3MZFKOWmrgtz3gSXYi3yi6mSGVQwULSp8n4cD3qKW9z38VfqPAR0ZrUsZHvExI/n24iXYs3k5LUspeGbldXAkGL10OJw3meKoHjw20d04fGnTl6DNv2b6/WMA3lUoV9SotEhU20bHKgwpy7VQP20AgKb","ephemeralPublicKey":"BKaqNecPUorCBVLMcKncrBg/eFnt44HsLjHoyzOKnl12DP5KR4SPBNdNDSOjn3Bt/RSN9Nb2e9AOed5Zj0JmGCI\\u003d","tag":"wAiHd29oNTj6BM6XYCx8Cop0ek7yJNZDxsW2d9bdJPA\\u003d"}"
    }`;
  encryptedCard.mobileType = "pay-with-google";

  const missingAmountError = expect(() =>
    encryptedCard
      .authorize()
      .withModifier(TransactionModifier.EncryptedMobile)
      .withAllowDuplicates(true)
      .execute(),
  ).toThrow(new GatewayError()) as unknown as GatewayError;

  expect(missingAmountError).toBeTruthy();
  expect(missingAmountError?.responseCode).toBe("502");

  const invalidTokenError = expect(() =>
    encryptedCard
      .authorize(10)
      .withCurrency("USD")
      .withModifier(TransactionModifier.EncryptedMobile)
      .withAllowDuplicates(true)
      .execute(),
  ).toThrow(new GatewayError()) as unknown as GatewayError;

  expect(invalidTokenError).toBeTruthy();
  expect(invalidTokenError?.responseCode).toBe("320");
});

test("credit authorization with dynamic descriptor", async () => {
  const dynamicDescriptor = "My company";

  const authorize = await card
    .authorize(10)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withDynamicDescriptor(dynamicDescriptor)
    .execute();

  expect(authorize).toBeTruthy();
  expect(authorize.responseCode).toBe("00");

  const capture = await authorize
    .capture(5)
    .withDynamicDescriptor(dynamicDescriptor)
    .execute();

  expect(capture).toBeTruthy();
  expect(capture.responseCode).toBe("00");
});

test("credit authorization supplementary data", async () => {
  const authorize = await card
    .authorize(10)
    .withCurrency("EUR")
    .withSupplementaryData({ taxInfo: ["VATREF", "763637283332"] })
    .withSupplementaryData({ indentityInfo: ["Passport", "PPS736353"] })
    .withSupplementaryData({ RANDOM_KEY1: "VALUE_1", RANDOM_KEY2: "VALUE_2" })
    .withSupplementaryData("RANDOM_KEY3", "ACTIVE")
    .execute();

  expect(authorize).toBeTruthy();
  expect(authorize.responseCode).toBe("00");

  const capture = await authorize
    .capture(5)
    .withSupplementaryData({ taxInfo: ["VATREF1", "7636372833321"] })
    .execute();

  expect(capture).toBeTruthy();
  expect(capture.responseCode).toBe("00");
});

test("implied decimal conversion", async () => {
  const responseNumber1 = await card
    .charge(78.68)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(responseNumber1).toBeTruthy();
  expect(responseNumber1.responseCode).toBe("00");

  const responseNumber2 = await card
    .charge(78.68000000000001)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(responseNumber2).toBeTruthy();
  expect(responseNumber2.responseCode).toBe("00");

  const responseString1 = await card
    .charge("78.68")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(responseString1).toBeTruthy();
  expect(responseString1.responseCode).toBe("00");

  const responseString2 = await card
    .charge("78.68000000000001")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(responseString2).toBeTruthy();
  expect(responseString2.responseCode).toBe("00");
});
