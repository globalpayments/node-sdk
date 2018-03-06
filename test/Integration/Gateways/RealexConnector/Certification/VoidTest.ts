import test from "ava";
import {
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

test("JAVA_Void_Sample", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_006a", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_006b", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_006c", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_006d", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_006e", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_006f", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_006g", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_006h", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_006i", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_006k", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_007a", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_007b", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_007c", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_007d", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_007e", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_008a", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_008b", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_008c", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_008d", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_009e", async (t) => {
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
      .void()
      .withDescription("JAVA-Void")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Void_009a", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_009b", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_009c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  // tslint:disable:max-line-length
  config.channel =
    "ECOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOm";
  // tslint:enable:max-line-length
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
      .void()
      .withDescription("JAVA-Void")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Void_009d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECO#";
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
      .void()
      .withDescription("JAVA-Void")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Void_010c", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_010d", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_010e", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_011a", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_011b", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_011c", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_011d", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_012a", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_012b", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_012c", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_012d", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_013a", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_014a", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_014b", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_014c", async (t) => {
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
    .void()
    // tslint:disable:max-line-length
    .withDescription(
      "akshdfgakjdshfgjdshgfkjdsahgfjshagdfjshdagfkjdshgfjshdgfjdshgfkjhdsagfjdsgfdskjgfdsjkhgfdsjhgfkdsjgfkjdshgfkjdsahgfjdskhgfjhdsgfjkhsdgfjkhsdgfjhsdgfjhsdgfkjhgsadjfhgsakjdhgfsajdhgfkjsadgfjhsadgfjkhdsgafjhdsgfjhdsgfjhdsgfkjhdgsafjkhgsfjhsdagfkjsgdafjhsgdfjhgdskjfgdsjfhgjdskhgfjhdsgfjhdsgfkjhgdsfkjhgsdkjfgsdkjhgfkjsahgdfkjgdsajfhgdsjkgfjdshgfjkdsagfjkhdsgfjsdhgfjkdshgfkjhgdsfkjhgdskjfgdskjgfkjdsahgfjhgdsakjfgdsafjhgdsjkhgfkjdshgfakjadshgfjhdsagfjhgdsfjhgsdakjfgdsakjhgfjsdhgfjhdsgfjhdsgfkjgdsajkfhgjdshgfjdsahgfjkhdsagfjhdsgfjkgdsfjhdsgfjhgdsjfhgdsjhfgjdshgfkjdsgfkjsadgfjkgdsfkjhgdsajfkhgdsjkgfkjdsagfkjgdsakjfhgdsfjkhgdsafkjgsadkjgfdkjsahgfkjsagfkjdshgfkjshdgfjgdsfkjgsadkjhgfdsjhgfkjdsagfjhdsgfjhgdsakjfgdsakjhgfjsdahgfjkgdsfjhgdsajkhfgjhdsagfkjhsgdakjf",
    )
    // tslint:enable:max-line-length
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_014d", async (t) => {
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
    .void()
    .withDescription("SDK#####")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_015a", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Void_015b", async (t) => {
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
    .void()
    .withDescription("JAVA-Void")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});
