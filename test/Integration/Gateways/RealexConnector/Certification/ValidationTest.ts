import test from "ava";
import {
  Address,
  AddressType,
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

test("JAVA_Validation_002a", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-002a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_002b", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-002b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_002c1", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-002c1")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_002c2", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-002c2")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_002d", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "V002625938386848";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-002d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_002e", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-002e")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_002f", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = " 4002 6259 3838 6848";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-002f")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_002g", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-002g")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_002h", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-002h")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_003a", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-003a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_003b", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-003b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_003c", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "20";
  card.expYear = "2012";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-003c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_003d", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2015";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-003d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_003e", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "11";
  card.expYear = "5";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-003e")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_003f", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-003f")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_003g", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "20";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-003g")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_003h", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-003h")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_003i", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-003i")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_004a", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-004a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_004b", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-004b")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_004c", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "12345";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-004c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_004d", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "374101000000608";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-004d")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_004e", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "374101000000608";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-004e")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_004f", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = 0 as CvnPresenceIndicator;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-004f")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_004g", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Illegible;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-004g")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_004h", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.NotOnCard;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-004h")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_004i", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.NotRequested;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-004i")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_005a", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2015";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-005a")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_005b", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-005b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_005c", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-005c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_005d", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2015";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-005d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_005e", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2015";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-005e")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_005f", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2015";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-005f")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_005g", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2015";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-005g")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_005h", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-005h")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_006a", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-006a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_006b", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-006b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_006c", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "11";
  card.expYear = "2015";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-006c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_006d", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "11";
  card.expYear = "5";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-006d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_006e", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-006e")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_007a", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "5425230000004415";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-007a")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_007b", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "5425230000004415";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-007b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_007d", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "5425230000004415";
  card.expMonth = "11";
  card.expYear = "2015";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-007d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_007e", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "5425230000004415";
  card.expMonth = "11";
  card.expYear = "5";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-007e")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_007f", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "5425230000004415";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-007f")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_008b", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "374101000000608";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("100")
    .withProductId("999")
    .withClientTransactionId("test")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Validation-008b")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("JAVA_Validation_008c", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "374101000000608";
  card.expMonth = "11";
  card.expYear = "2015";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-008c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_008d", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "374101000000608";
  card.expMonth = "11";
  card.expYear = "5";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-008d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_009b", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "30384800000000";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-009b")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_009c", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "30450100000000";
  card.expMonth = "11";
  card.expYear = "2015";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-009c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_Validation_009d", async (t) => {
  t.plan(2);

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

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "779|102";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "658|325";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "30450100000000";
  card.expMonth = "11";
  card.expYear = "5";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const error = await t.throws(
    card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-Validation-009d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});
