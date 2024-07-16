import {
  BuilderError,
  CreditCardData,
  CvnPresenceIndicator,
  GatewayError,
  ServicesContainer,
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

beforeAll(() => {
  ServicesContainer.configureService(config);
});

const throttle = () => new Promise((resolve) => setTimeout(resolve, 1500));

beforeEach(async () => {
  await throttle();
});

test("JAVA_Credit_Sample", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_006a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_006b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_006c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_006d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_006e", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_006f", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_006g", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_006h", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_007a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_007b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_007c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_007d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_007e", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_008a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_008b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_008c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_008d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_008e", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_009a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_009b", async () => {
  expect.assertions(2);

  const config = new GpEcomConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";

  config.timeout = 20000;
  config.channel = "EC";

  ServicesContainer.configureService(config, "withChannelEC");

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute("withChannelEC");
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_009c", async () => {
  const config = new GpEcomConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";

  config.timeout = 20000;
  config.channel = "ECOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM";

  ServicesContainer.configureService(
    config,
    "withChannelECOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM",
  );

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute("withChannelECOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM");
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_009d", async () => {
  const config = new GpEcomConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";

  config.timeout = 5000;

  ServicesContainer.configureService(config, "noChannel");

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute("noChannel");
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_010c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_010d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_010e", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_011a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_012a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_012b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_012c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_013a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_013b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;

  // request
  try {
    await card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Credit_013c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  /* eslint-disable */
  card.cardHolderName =
    "Peter Watermelooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo";
  /* eslint-enable */

  // request
  try {
    await card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Credit_014a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_014b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "1813";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_014c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "18";
  card.expYear = "2012";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_014d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  try {
    await card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Credit_015a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_015b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_015c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_016a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_017a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_017b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_017c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123456789";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  try {
    await card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Credit_017d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "374101000000608";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_017f", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4242424242424240";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "7";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  try {
    await card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Credit_017g", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "12#";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  try {
    await card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Credit_018a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_018b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_018c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_018d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_019a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_019b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_019c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_020a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_020b", async () => {
  const config = new GpEcomConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secreto";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";

  config.timeout = 5000;
  config.channel = "ECOM";

  ServicesContainer.configureService(config, "withSecreto");

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  try {
    await card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute("withSecreto");
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Credit_021a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_021b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1.005)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit-021b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_021c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  try {
    await card
      .refund()
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("JAVA_Credit_021d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  try {
    await card
      .refund()
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("JAVA_Credit_021e", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(100000)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_021f", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  try {
    await card
      .refund()
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("JAVA_Credit_022a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Credit_022b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // requesT
  try {
    await await card
      .refund(1)
      .withCurrency("EURO")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Credit_022c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  try {
    await card
      .refund(1)
      .withCurrency("EU#")
      .withDescription("JAVA-Credit")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Credit_022d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  try {
    await card.refund(1).withDescription("JAVA-Credit").execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});
