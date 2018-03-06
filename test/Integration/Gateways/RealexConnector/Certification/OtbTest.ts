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

test("JAVA_OTB_Sample", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006b", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006c", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006d", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006e", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006f", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006g", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006h", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006i", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006k", async (t) => {
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
    .charge(1)
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_006l", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_007a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_007b", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_007c", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_007d", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_007e", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_008a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_008b", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_008c", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_008d", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_008e", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_009a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_009b", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_009c", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_009d", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_010c", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_010d", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_010e", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_012a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_012b", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_012c", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_012d", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_012e", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_013a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_013b", async (t) => {
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
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-OTB")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_OTB_013c", async (t) => {
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
    "Peter Watermeloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooon";
  // tslint:enable:max-line-length

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-OTB")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_OTB_013d", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_014a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_014b", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_014c", async (t) => {
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
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-OTB")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_OTB_014d", async (t) => {
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
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-OTB")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_OTB_015a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_015b", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_015c", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_016a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_017a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_017b", async (t) => {
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
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-OTB")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_OTB_017c", async (t) => {
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
  card.cvn = "1.23457E+18";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-OTB")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_OTB_017d", async (t) => {
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
  card.expYear = "2019";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_017f", async (t) => {
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
  card.cvn = "7";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-OTB")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_OTB_017g", async (t) => {
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
  card.cvn = "7";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "Peter Watermelon";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-OTB")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_OTB_018a", async (t) => {
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
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-OTB")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_OTB_018b", async (t) => {
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
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-OTB")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});
