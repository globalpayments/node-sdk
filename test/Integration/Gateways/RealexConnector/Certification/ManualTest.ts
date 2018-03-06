import test from "ava";
import {
  Address,
  AddressType,
  BuilderError,
  CreditCardData,
  CvnPresenceIndicator,
  GatewayError,
  ServicesConfig,
  ServicesContainer,
} from "../../../../../src/";

const throttle = () => new Promise((resolve) => setTimeout(resolve, 1500));

test.beforeEach(async () => {
  await throttle();
});

test("JAVA_Manual_006a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-006a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_006b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-006b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_006c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-006c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_006d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-006d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_006e", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-006e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_006f", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-006f")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_006g", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-006g")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_006h", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-006h")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_006i", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-006i")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_006j", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-006j")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_006k", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-006k")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_007a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-007a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_007b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-007b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_007c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-007c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_007d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-007d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_007e", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-007e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_008a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-008a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_008b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-008b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_008c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-008c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_008d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-008d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_008e", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-008e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_009a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-009a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_009b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  config.channel = "E";
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
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("USD")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("USD")
      .withDescription("JAVA-Manual-009b")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_009c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  config.channel = "ECOMMERCE";
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
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withDescription("JAVA-Manual-009c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_009d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-009d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_010a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-010a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_010b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-010b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_010c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-010c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_010d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-010d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_010e", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-010e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_011a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-011a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_011b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-011b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_011c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-011c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_011d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
  const error = t.throws(
    () =>
      card
        .charge()
        .withCurrency("EUR")
        .withDescription("JAVA-Manual-011d")
        .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_012a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-012a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_012b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("EURO")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("EURO")
      .withDescription("JAVA-Manual-012b")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_012c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("�UR")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("�UR")
      .withDescription("JAVA-Manual-012c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_012d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = t.throws(
    () =>
      card
        .charge(100.01)
        .withDescription("JAVA-Manual-012d")
        .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_013a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-013a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_013b1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-013b1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_013b2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-013b2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_013c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-013c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_014a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-014a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_014b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;

  // build transaction
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("USD")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("USD")
      .withDescription("JAVA-Manual-014b")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_014c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName =
    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep";

  // build transaction
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withDescription("JAVA-Manual-014c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_014d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James~Mason";

  // build transaction
  const saleResponse = await card
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-014d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_015a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-015a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_015b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-015b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_015c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "20";
  card.expYear = "2012";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("EUR")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("EUR")
      .withDescription("JAVA-Manual-015c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_015d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("USD")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("USD")
      .withDescription("JAVA-Manual-015d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_016a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-016a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_016b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-016b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_016c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-016c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_017a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-017a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_018a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-018a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_019a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-019a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_019b1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withDescription("JAVA-Manual-019b1")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_019b2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "374101000000608";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withDescription("JAVA-Manual-019b2")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_019c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "12345";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("EUR")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("EUR")
      .withDescription("JAVA-Manual-019c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_019d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "374101000000608";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-019d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_020a1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-020a1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_020a2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Illegible;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-020a2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_020a3", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "";
  card.cvnPresenceIndicator = CvnPresenceIndicator.NotOnCard;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-020a3")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_020a4", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "";
  card.cvnPresenceIndicator = CvnPresenceIndicator.NotRequested;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-020a4")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_020b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = 5 as CvnPresenceIndicator;
  card.cardHolderName = "James Mason";

  // build transaction
  let error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("EUR")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
  await throttle();

  // request
  error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("EUR")
      .withDescription("JAVA-Manual-020b")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_020c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = 0 as CvnPresenceIndicator;
  card.cardHolderName = "James Mason";

  // build transaction
  const saleResponse = await card
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-020c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_021a1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-021a1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_021a2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .authorize(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-021a2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_021a3", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .authorize(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-021a3")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_021b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .authorize(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-021b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_021c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .authorize(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-021c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_022a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-022a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_022b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-022b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_022c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-022c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_022d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-022d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_022e", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-022e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_023a1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-023a1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_023a2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-023a2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_023b1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-023b1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_023c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-023c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_024a1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-024a1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_024a2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-024a2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_024a3", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-024a3")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_024b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-024b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_024c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-024c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_025", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-025")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_026a1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-026a1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_026a2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_026b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_026c1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    // tslint:disable:max-line-length
    .withDescription(
      "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIep3uviSnW9XEB3a4wpIW9XEB3a",
    )
    // tslint:enable:max-line-length
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_026c2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-026c2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_027a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withCustomerId("123456")
    .withDescription("JAVA-Manual-027a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_028a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("123456")
    .withDescription("JAVA-Manual-028a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_028b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-028b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_028c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("USD")
      // tslint:disable:max-line-length
      .withCustomerId(
        "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep33a4wpQQQQQQQQQ1",
      )
      // tslint:enable:max-line-length
      .withDescription("JAVA-Manual-028c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_028d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("123456~")
      .withDescription("JAVA-Manual-028d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_029a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withProductId("123456")
    .withDescription("JAVA-Manual-029a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_029b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Manual-029b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_029c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      // tslint:disable:max-line-length
      .withProductId(
        "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep33a4wpQQQQQQQQQ1",
      )
      // tslint:enable:max-line-length
      .withDescription("JAVA-Manual-029c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_029d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("EUR")
      .withProductId("123456~")
      .withDescription("JAVA-Manual-029d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_030a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withClientTransactionId("123456")
    .withDescription("JAVA-Manual-030a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_030b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-030b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_030c", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("EUR")
      // tslint:disable:max-line-length
      .withClientTransactionId(
        "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep33a4wpQQQQQQQQQ1",
      )
      // tslint:enable:max-line-length
      .withDescription("JAVA-Manual-030c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_030d", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("USD")
      .withClientTransactionId("123456~")
      .withDescription("JAVA-Manual-030d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Manual_031a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerIpAddress("123.123.123.123")
    .withDescription("JAVA-Manual-031a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_031b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-031b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_031c1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withCustomerIpAddress("123.123.123.123")
    .withDescription("JAVA-Manual-031c1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_031c2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerIpAddress("123.123.123.123")
    .withDescription("JAVA-Manual-031c2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_032a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "E77 4QJ";
  billingAddress.country = "United Kingdom";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "Z76 PO9";
  shippingAddress.country = "France";

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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Manual-032a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_033a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "774|10";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "769|52";

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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Manual-033a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_033b1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "774|10";

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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(billingAddress)
    .withDescription("JAVA-Manual-033b1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_033b2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "769|52";

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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Manual-033b2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_033c1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode =
    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";

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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(billingAddress)
    .withDescription("JAVA-Manual-033c1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_033c2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode =
    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";

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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Manual-033c2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_034a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // billing address
  const billingAddress = new Address();
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Manual-034a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_034b1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "GB";

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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Manual-034b1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_034b2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // billing address
  const billingAddress = new Address();
  billingAddress.country = "GB";

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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withAddress(billingAddress)
    .withDescription("JAVA-Manual-034b2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_034c1", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // billing address
  const billingAddress = new Address();
  billingAddress.country =
    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";

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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withAddress(billingAddress)
    .withDescription("JAVA-Manual-034c1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_034c2", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
  ServicesContainer.configure(config);

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country =
    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";

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
    .charge(100.01)
    .withCurrency("USD")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Manual-034c2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_035a", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("GBP")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Manual-035a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Manual_035b", async (t) => {
  t.plan(4);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 20000;
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
    .charge(100.01)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Manual-035a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});
