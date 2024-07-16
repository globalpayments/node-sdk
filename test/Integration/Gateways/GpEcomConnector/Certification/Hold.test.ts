import {
  BuilderError,
  CreditCardData,
  CvnPresenceIndicator,
  GatewayError,
  ReasonCode,
  ServicesContainer,
  Transaction,
} from "../../../../../src";
import { GpEcomConfig } from "../../../../../src/ServiceConfigs";

const config = new GpEcomConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.refundPassword = "refund";
config.rebatePassword = "rebate";

config.timeout = 5000;
config.channel = "ECOM";

const configWithoutChannel = new GpEcomConfig();
configWithoutChannel.merchantId = "heartlandgpsandbox";
configWithoutChannel.accountId = "api";
configWithoutChannel.sharedSecret = "secret";
configWithoutChannel.refundPassword = "refund";
configWithoutChannel.rebatePassword = "rebate";
configWithoutChannel.serviceUrl =
  "https://api.sandbox.realexpayments.com/epage-remote.cgi";
configWithoutChannel.timeout = 5000;

beforeAll(() => {
  ServicesContainer.configureService(config);
  ServicesContainer.configureService(configWithoutChannel, "withoutChannel");
});

const throttle = () => new Promise((resolve) => setTimeout(resolve, 1500));

beforeEach(async () => {
  await throttle();
});

test.skip("JAVA_Hold_Sample", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_006a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_006b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_006c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_006d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_006e", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_006f", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_006g", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_006h", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_006i", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("JAVA_Hold_006k", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("JAVA_Hold_006l", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("JAVA_Hold_007a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("JAVA_Hold_007b", async () => {
  expect.assertions(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("JAVA_Hold_007c", async () => {
  expect.assertions(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_007d", async () => {
  const saleResponse = Transaction.fromId(undefined as unknown as string);

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .execute("withoutChannel");
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("JAVA_Hold_007e", async () => {
  expect.assertions(2);

  const saleResponse = Transaction.fromId(undefined as unknown as string);

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .execute("withoutChannel");
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test.skip("JAVA_Hold_008a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("JAVA_Hold_008b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_008c", async () => {
  expect.assertions(2);

  const saleResponse = Transaction.fromId(undefined as unknown as string);

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .execute("withoutChannel");
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("JAVA_Hold_008d", async () => {
  expect.assertions(2);

  const saleResponse = Transaction.fromId(undefined as unknown as string);

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .execute("withoutChannel");
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("JAVA_Hold_008e", async () => {
  expect.assertions(2);

  const saleResponse = Transaction.fromId(undefined as unknown as string);

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .execute("withoutChannel");
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test.skip("JAVA_Hold_009c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_009d", async () => {
  const saleResponse = Transaction.fromId(undefined as unknown as string);

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .withDescription("SDK-JAVA-Query")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("JAVA_Hold_009e", async () => {
  const saleResponse = Transaction.fromId(undefined as unknown as string);

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .withDescription("SDK-JAVA-Query")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test.skip("JAVA_Hold_010a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_010b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_010c", async () => {
  expect.assertions(2);

  const saleResponse = Transaction.fromId(undefined as unknown as string);

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .withDescription("JAVA-Hold")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test.skip("JAVA_Hold_010d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_011a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_011b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(undefined)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_011c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_011d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(undefined)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Hold_012a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("JAVA_Hold_012b", async () => {
  const config = new GpEcomConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secreto";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";

  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configureService(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .withDescription("SDK-JAVA-Query")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Hold_013a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("JAVA_Hold_013b", async () => {
  const config = new GpEcomConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";

  config.timeout = 5000;
  config.channel = "EC";
  ServicesContainer.configureService(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .withDescription("SDK-JAVA-Query")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test.skip("JAVA_Hold_013c", async () => {
  const config = new GpEcomConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";

  config.timeout = 5000;
  config.channel = "ECOOOOOOOOM";
  ServicesContainer.configureService(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card.charge(10).withCurrency("EUR").execute();
  expect(saleResponse).toBeTruthy();
  expect("00").toBe(saleResponse.responseCode);
  await throttle();

  // request
  try {
    await saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .withDescription("SDK-JAVA-Query")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});
