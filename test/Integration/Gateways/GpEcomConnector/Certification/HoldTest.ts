import test from "ava";
import {
  BuilderError,
  CreditCardData,
  CvnPresenceIndicator,
  GatewayError,
  ReasonCode,
  ServicesContainer,
  Transaction,
} from "../../../../../src/";
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
configWithoutChannel.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
configWithoutChannel.timeout = 5000;

test.before(() => {
  ServicesContainer.configureService(config);
  ServicesContainer.configureService(configWithoutChannel, "withoutChannel");
})

const throttle = () => new Promise((resolve) => setTimeout(resolve, 1500));

test.beforeEach(async () => {
  await throttle();
});

// TODO
test.skip("JAVA_Hold_Sample", async (t) => {
  t.plan(4);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_006a", async (t) => {
  t.plan(4);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_006b", async (t) => {
  t.plan(4);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_006c", async (t) => {
  t.plan(4);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_006d", async (t) => {
  t.plan(4);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_006e", async (t) => {
  t.plan(4);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_006f", async (t) => {
 
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_006g", async (t) => {
 
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_006h", async (t) => {

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_006i", async (t) => {
 
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_006k", async (t) => {

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_006l", async (t) => {

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_007a", async (t) => {
  t.plan(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_007b", async (t) => {
  t.plan(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_007c", async (t) => {
  t.plan(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_007d", async (t) => {
  t.plan(2);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = t.throws(
    () =>
      saleResponse
        .hold()
        .withReasonCode(ReasonCode.Fraud)
        .execute("withoutChannel"),
    BuilderError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_Hold_007e", async (t) => {
  t.plan(2);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = t.throws(
    () =>
      saleResponse
        .hold()
        .withReasonCode(ReasonCode.Fraud)
        .execute("withoutChannel"),
    BuilderError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_Hold_008a", async (t) => {
  t.plan(2);
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_008b", async (t) => {
  t.plan(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_008c", async (t) => {
  t.plan(2);
  
  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = t.throws(
    () =>
      saleResponse
        .hold()
        .withReasonCode(ReasonCode.Fraud)
        .execute("withoutChannel"),
    BuilderError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_Hold_008d", async (t) => {
  t.plan(2);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = t.throws(
    () =>
      saleResponse
        .hold()
        .withReasonCode(ReasonCode.Fraud)
        .execute("withoutChannel"),
    BuilderError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_Hold_008e", async (t) => {
  t.plan(2);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = t.throws(
    () =>
      saleResponse
        .hold()
        .withReasonCode(ReasonCode.Fraud)
        .execute("withoutChannel"),
    BuilderError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_Hold_009c", async (t) => {
  t.plan(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_009d", async (t) => {
  t.plan(2);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = t.throws(
    () =>
      saleResponse
        .hold()
        .withReasonCode(ReasonCode.Fraud)
        .withDescription("SDK-JAVA-Query")
        .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_Hold_009e", async (t) => {
  t.plan(2);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = t.throws(
    () =>
      saleResponse
        .hold()
        .withReasonCode(ReasonCode.Fraud)
        .withDescription("SDK-JAVA-Query")
        .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_Hold_010a", async (t) => {
  t.plan(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_010b", async (t) => {

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_010c", async (t) => {
  t.plan(2);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = t.throws(
    () =>
      saleResponse
        .hold()
        .withReasonCode(ReasonCode.Fraud)
        .withDescription("JAVA-Hold")
        .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_Hold_010d", async (t) => {
  t.plan(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_011a", async (t) => {

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_011b", async (t) => {

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(undefined)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_011c", async (t) => {

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_011d", async (t) => {

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(undefined)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Hold_012a", async (t) => {

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_012b", async (t) => {
  t.plan(2);
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
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const error = await t.throws(
    saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .withDescription("SDK-JAVA-Query")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Hold_013a", async (t) => {

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2023";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.Fraud)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_Hold_013b", async (t) => {
  t.plan(2);
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
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const error = await t.throws(
    saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .withDescription("SDK-JAVA-Query")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_Hold_013c", async (t) => {
  t.plan(2);
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
  const saleResponse = await card
    .charge(10)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const error = await t.throws(
    saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .withDescription("SDK-JAVA-Query")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});
