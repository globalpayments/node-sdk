import test from "ava";
import {
  BuilderError,
  CreditCardData,
  CvnPresenceIndicator,
  GatewayError,
  ReasonCode,
  ServicesConfig,
  ServicesContainer,
  Transaction,
} from "../../../../../src/";

const throttle = () => new Promise((resolve) => setTimeout(resolve, 1500));

test.beforeEach(async () => {
  await throttle();
});

test("JAVA_Release_Sample", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006f", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006g", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006h", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006i", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006k", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_006l", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_007a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_007b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_007c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

  // hold it first
  const holdResponse = await saleResponse
    .hold()
    .withReasonCode(ReasonCode.OutOfStock)
    .execute();
  t.truthy(holdResponse);
  t.is("00", holdResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .release()
    .withReasonCode(ReasonCode.InStock)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_007d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  ServicesContainer.configure(config);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = await t.throws(
    saleResponse
      .release()
      .withReasonCode(ReasonCode.InStock)
      .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Release_007e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  ServicesContainer.configure(config);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = await t.throws(
    saleResponse
      .release()
      .withReasonCode(ReasonCode.InStock)
      .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Release_008c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  ServicesContainer.configure(config);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = await t.throws(
    saleResponse
      .release()
      .withReasonCode(ReasonCode.InStock)
      .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Release_008d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  ServicesContainer.configure(config);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = await t.throws(
    saleResponse
      .release()
      .withReasonCode(ReasonCode.InStock)
      .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Release_008e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  ServicesContainer.configure(config);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = await t.throws(
    saleResponse
      .release()
      .withReasonCode(ReasonCode.InStock)
      .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Release_009d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = await t.throws(
    saleResponse
      .release()
      .withReasonCode(ReasonCode.InStock)
      .withDescription("JAVA-Query")
      .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Release_009e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = await t.throws(
    saleResponse
      .release()
      .withReasonCode(ReasonCode.InStock)
      .withDescription("JAVA-Query")
      .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Release_010a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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
    .withReasonCode(ReasonCode.Other)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_010b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

test("JAVA_Release_010c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  const saleResponse = Transaction.fromId(undefined as any);

  // request
  const error = await t.throws(
    saleResponse
      .hold()
      .withReasonCode(ReasonCode.Fraud)
      .withDescription("JAVA-Hold")
      .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Release_010d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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
    .withReasonCode(ReasonCode.Other)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_011a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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
    .withReasonCode(ReasonCode.Other)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_011b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

test("JAVA_Release_011c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

test("JAVA_Release_011d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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

test("JAVA_Release_012a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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
    .withReasonCode(ReasonCode.Other)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_012b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secreto";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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
      .withReasonCode(ReasonCode.Other)
      .withDescription("JAVA-Query")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Release_013a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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
    .withReasonCode(ReasonCode.Other)
    .withDescription("JAVA-Hold")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Release_013b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "EC";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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
      .withReasonCode(ReasonCode.Other)
      .withDescription("JAVA-Query")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Release_013c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOOOOOOOOM";
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
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
      .withReasonCode(ReasonCode.Other)
      .withDescription("JAVA-Query")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});
