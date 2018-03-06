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

test("JAVA_verifyenrolled_014a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001038443335";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-014a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_014b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001038488884";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-014b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_014c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001036298889";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-014c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_014d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001036853337";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-014d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_014e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-014e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_014f", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037167778";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-014f")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_014g", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-014g")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_014h", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037484447";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-014h")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_014i", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037490006";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-014i")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_015a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "5100000000000198�";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-verifyenrolled-015a")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_verifyenrolled_015b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "5100000000000149";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-015b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_015c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "5100000000000172";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-015c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_015d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "5100000000000297";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-015d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_015e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "5100000000000131";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-015e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_015f", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "5100000000000206";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-015f")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_015g", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "5100000000000131";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-015g")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_015h", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "5100000000000214";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-015h")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_015i", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "5100000000000164";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-015i")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_016a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "370537726695896�";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-verifyenrolled-016a")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_verifyenrolled_016b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "344598846104303";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-016b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_016c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "342911579886552";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-016c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_016d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "377775599797356";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-016d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_016e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "371810438025523";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-016e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_016f", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "374973180958759";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-016f")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_016g", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "371810438025523";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-016g")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_016h", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "376515222233960";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-016h")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("JAVA_verifyenrolled_016i", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "372749236937027";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-016i")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-017a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-017b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-017c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-017d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-017e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017f", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-017f")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017g", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-017g")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017h", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-017h")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017i", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-017i")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017j", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-017j")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_017k", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-017k")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_018a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-018a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_018b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-018b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_018c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-018c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_018d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-018d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_018e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-018e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_019a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-019a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_019b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-019b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_019c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-019c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_019d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-019d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_019e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-019e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_020b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-020b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_020c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-020c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_020d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-020d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_020e", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-020e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_021a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-021a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_021b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-021b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_021c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-021c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_021d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-021d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_022a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-022a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_022b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EURO")
    .withDescription("JAVA-verifyenrolled-022b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_022c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("�UR")
    .withDescription("JAVA-verifyenrolled-022c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_022d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withDescription("JAVA-verifyenrolled-022d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_023a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-023a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_023b1", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-023b1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_023b2", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "42424242424";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("USD")
      .withDescription("JAVA-verifyenrolled-023b2")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_verifyenrolled_023c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262#";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("GBP")
      .withDescription("JAVA-verifyenrolled-023c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_verifyenrolled_024a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-024a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_024b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("USD")
      .withDescription("JAVA-verifyenrolled-024b")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_verifyenrolled_024c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName =
    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("GBP")
      .withDescription("JAVA-verifyenrolled-024c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_verifyenrolled_024d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James~Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-024d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_025a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-025a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_025b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-025b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_025c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "20";
  card.expYear = "2012";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-verifyenrolled-025c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_verifyenrolled_025d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("USD")
      .withDescription("JAVA-verifyenrolled-025d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_verifyenrolled_026a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-026a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_026b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-026b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_026c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-026c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_027a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-027a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_028a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-028a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_029a", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-029a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_029b1", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("GBP")
      .withDescription("JAVA-verifyenrolled-029b1")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_verifyenrolled_029b2", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "371810438025523";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("GBP")
      .withDescription("JAVA-verifyenrolled-029b2")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_verifyenrolled_029c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "12345";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-verifyenrolled-029c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test.skip("JAVA_verifyenrolled_029d", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "371810438025523";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-029d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_030a1", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-030a1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_030a2", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Illegible;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("EUR")
    .withDescription("JAVA-verifyenrolled-030a2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_030a3", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "";
  card.cvnPresenceIndicator = CvnPresenceIndicator.NotOnCard;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-030a3")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_030a4", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "";
  card.cvnPresenceIndicator = CvnPresenceIndicator.NotRequested;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("GBP")
    .withDescription("JAVA-verifyenrolled-030a4")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_verifyenrolled_030b", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = 5 as CvnPresenceIndicator;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .verify()
      .withCurrency("EUR")
      .withDescription("JAVA-verifyenrolled-030b")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_verifyenrolled_030c", async (t) => {
  t.plan(2);

  const config = new ServicesConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";
  config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
  config.timeout = 60000;
  ServicesContainer.configure(config);

  // create card
  const card = new CreditCardData();
  card.number = "4012001037141112";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = 0 as CvnPresenceIndicator;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .verify()
    .withCurrency("USD")
    .withDescription("JAVA-verifyenrolled-030c")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});
