import test from "ava";
import {
  //   BuilderError,
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

// test("JAVA_Settle_Sample", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_006a", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_006b", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_006c", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_006d", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_006e", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_006f", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_006g", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_006h", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_006i", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_006k", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_007a", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_007b", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_007c", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_007d", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_007e", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_008a", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_008b", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_008c", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_008d", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_008e", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_009a", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_009b", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_009c", async (t) => {
//   t.plan(2);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   // tslint:disable:max-line-length
//   config.channel = "ECOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOm";
//   // tslint:enable:max-line-length
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
// //   const saleResponse = await ;
// //   t.truthy(saleResponse);
// //   t.is("00", saleResponse.responseCode);
// //   await throttle();

//   // request
//   const error = await t.throws(
//     card.authorize(1)
//       .withCurrency("EUR")
//       .execute(),
//     GatewayError,
//   );
//   t.truthy(error.message);
// });

// test("JAVA_Settle_009d", async (t) => {
//   t.plan(2);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECO#";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
// //   const saleResponse = await ;
// //   t.truthy(saleResponse);
// //   t.is("00", saleResponse.responseCode);
// //   await throttle();

//   // request
//   const error = await t.throws(
//     card.authorize(1)
//       .withCurrency("EUR")
//       .execute(),
//       GatewayError,
//     );
//     t.truthy(error.message);
// });

// test("JAVA_Settle_010c", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_010d", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_010e", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_011a", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_011b", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_011c", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_011d", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_012a", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_012b", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1.005)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1.005)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_012c", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(10)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const error = t.throws(() =>
//     saleResponse.capture()
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute(),
//       BuilderError,
//     );
//     t.truthy(error.message);
// });

// test("JAVA_Settle_012d", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(10)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const error = t.throws(() =>
//     saleResponse.capture()
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute(),
//       BuilderError,
//     );
//     t.truthy(error.message);
// });

// test("JAVA_Settle_012e", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1000)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1000)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Settle_012f", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(10)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const error = t.throws(() =>
//     saleResponse.capture()
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute(),
//       BuilderError,
//     );
//     t.truthy(error.message);
// });

// test("JAVA_Settle_013a", async (t) => {
//   t.plan(4);

//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();

//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

test("JAVA_Settle_013b", async (t) => {
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
  //   const saleResponse = await ;
  //   t.truthy(saleResponse);
  //   t.is("00", saleResponse.responseCode);
  //   await throttle();

  // request
  const error = await t.throws(
    card
      .authorize(1)
      .withCurrency("EURO")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Settle_013c", async (t) => {
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
  //   const saleResponse = await ;
  //   t.truthy(saleResponse);
  //   t.is("00", saleResponse.responseCode);
  //   await throttle();

  // request
  const error = await t.throws(
    card
      .authorize(1)
      .withCurrency("EU#")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Settle_013d", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withDescription("JAVA-Settle")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_015a", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Settle")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_014a", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Settle")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_014b", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Settle")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_014c", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Settle")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_014d", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Settle")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_016a", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Settle")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_016b", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_016c", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withCurrency("EUR")
    // tslint:disable:max-line-length
    .withDescription(
      "JAVA-SettleAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    )
    // tslint:enable:max-line-length
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_016d", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Settle###")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_017a", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const response = await saleResponse
    .capture(1)
    .withCurrency("EUR")
    .withDescription("JAVA-Settle")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Settle_017b", async (t) => {
  t.plan(4);

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
    .authorize(1)
    .withCurrency("EUR")
    .execute();
  t.truthy(saleResponse);
  t.is("00", saleResponse.responseCode);
  await throttle();

  // request
  const error = await t.throws(
    saleResponse
      .capture(1)
      .withCurrency("EUR")
      .withDescription("SDK-JAVA-Rebate")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});
