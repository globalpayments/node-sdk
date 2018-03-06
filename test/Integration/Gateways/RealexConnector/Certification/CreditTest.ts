import test from "ava";
import {
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

test("JAVA_Credit_Sample", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_006a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_006b", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_006c", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_006d", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_006e", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_006f", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_006g", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_006h", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_007a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_007b", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_007c", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_007d", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_007e", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_008a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_008b", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_008c", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_008d", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_008e", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_009a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_009b", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_009c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 5000;
  config.channel = "ECOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM";
  ServicesContainer.configure(config);

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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_009d", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_010c", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_010d", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_010e", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_011a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_012a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_012b", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_012c", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_013a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_013b", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;

  // request
  const error = await t.throws(
    card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_013c", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  // tslint:disable:max-line-length
  card.cardHolderName =
    "Peter Watermelooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo";
  // tslint:enable:max-line-length

  // request
  const error = await t.throws(
    card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_014a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_014b", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_014c", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_014d", async (t) => {
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
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_015a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_015b", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_015c", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_016a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_017a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_017b", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_017c", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123456789";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_017d", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_017f", async (t) => {
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
  card.number = "4242424242424240";
  card.expMonth = "12";
  card.expYear = "2018";
  card.cvn = "7";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_017g", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "12#";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_018a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_018b", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_018c", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_018d", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_019a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_019b", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_019c", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_020a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_020b", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .refund(1)
      .withCurrency("EUR")
      .withDescription("JAVA-Credit")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_021a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_021b", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .refund(1.005)
    .withCurrency("EUR")
    .withDescription("JAVA-Credit")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_021c", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = t.throws(
    () =>
      card
        .refund()
        .withCurrency("EUR")
        .withDescription("JAVA-Credit")
        .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_021d", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = t.throws(
    () =>
      card
        .refund()
        .withCurrency("EUR")
        .withDescription("JAVA-Credit")
        .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_021e", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_021f", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = t.throws(
    () =>
      card
        .refund()
        .withCurrency("EUR")
        .withDescription("JAVA-Credit")
        .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_022a", async (t) => {
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
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Credit_022b", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .refund(1)
      .withCurrency("EURO")
      .withDescription("JAVA-Credit")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_022c", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .refund(1)
      .withCurrency("EU#")
      .withDescription("JAVA-Credit")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Credit_022d", async (t) => {
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
  card.expYear = "2018";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = t.throws(
    () =>
      card
        .refund(1)
        .withDescription("JAVA-Credit")
        .execute(),
    BuilderError,
  );
  t.truthy(error.message);
});
