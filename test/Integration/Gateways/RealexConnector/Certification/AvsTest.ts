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

test("JAVA_AVS_001a", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  billingAddress.streetAddress1 = "Flat 123 House 456";
  billingAddress.postalCode = "E77 4QJ";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "1";
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
      .withDescription("JAVA-AVS-001a")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_001b", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  billingAddress.streetAddress1 = "Flat #123 House No. 456";
  billingAddress.postalCode = "E77 #4QJ";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "2";
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
      .withDescription("JAVA-AVS-001b")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_001c", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  billingAddress.streetAddress1 = "# Flat #123 House No. #456";
  billingAddress.postalCode = "# E77 @~4 Q # J";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "3";
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
      .withDescription("JAVA-AVS-001c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_001d", async (t) => {
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
  card.cvn = "4";
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
      .withDescription("JAVA-AVS-001d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_001e", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  // tslint:disable:max-line-length
  billingAddress.streetAddress1 =
    "Lorem ipsum dolor sit 1amet; consectetur adipiscing elit. Aenean ali2quam tellus in elit hendrerit; non 3porttE77 4QJitor lorem venenatis. Pellentesque dictum eu nunc ac fringilla. In vitae quam eu odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
  billingAddress.postalCode =
    "Lorem ipsum dolo1r sit amet; consectetur adipiscing elit. Aenean aliquam tellus in elit hendrerit; non porttE77 4QJitor lorem venenatis. Pellentesque dictum eu2 nunc ac fringilla. In vitae quam eu 3odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
  // tslint:enable:max-line-length
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "5";
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
      .withDescription("JAVA-AVS-001e")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_001f", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  billingAddress.streetAddress1 = "ABCDEFGHIJ";
  billingAddress.postalCode = "ABCDEFGHIJ";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "6";
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
      .withDescription("JAVA-AVS-001f")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_001g", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  // tslint:disable:max-line-length
  billingAddress.streetAddress1 =
    "Lorem ipsum dolor sit amet; consectetur adipiscing elit. Aenean aliquam tellus in elit hendrerit; non porttE77 4QJitor lorem venenatis. Pellentesque dictum eu nunc ac fringilla. In vitae quam eu odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
  billingAddress.postalCode =
    "Lorem ipsum dolor sit amet; consectetur adipiscing elit. Aenean aliquam tellus in elit hendrerit; non porttE77 4QJitor lorem venenatis. Pellentesque dictum eu nunc ac fringilla. In vitae quam eu odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
  // tslint:enable:max-line-length
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "7";
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
      .withDescription("JAVA-AVS-001g")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_003a", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  billingAddress.streetAddress1 = "Flat 123 House 456";
  billingAddress.postalCode = "E77 4QJ";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "8";
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
      .withDescription("JAVA-AVS-003a")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_003b", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  billingAddress.streetAddress1 = "Flat 123 House 456";
  billingAddress.postalCode = "E77 4QJ";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "9";
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
      .withDescription("JAVA-AVS-003b")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_003c", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  billingAddress.streetAddress1 = "Flat 123 House 456";
  billingAddress.postalCode = "E77 4QJ";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "10";
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
      .withDescription("JAVA-AVS-003c")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_003d", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  billingAddress.streetAddress1 = "Flat 123 House 456";
  billingAddress.postalCode = "E77 4QJ";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "11";
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
      .withDescription("JAVA-AVS-003d")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_003e", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  billingAddress.streetAddress1 = "Flat 123 House 456";
  billingAddress.postalCode = "E77 4QJ";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "12";
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
      .withDescription("JAVA-AVS-003e")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_003f", async (t) => {
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

  // billing address
  const billingAddress = new Address();
  billingAddress.streetAddress1 = "Flat 123 House 456";
  billingAddress.postalCode = "E77 4QJ";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "13";
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
      .withDescription("JAVA-AVS-003f")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_003g", async (t) => {
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
  card.cvn = "14";
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
      .withDescription("JAVA-AVS-003e")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});

test("JAVA_AVS_003h", async (t) => {
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
  card.cvn = "15";
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
      .withDescription("JAVA-AVS-003f")
      .execute(),
    GatewayError,
  );
  t.truthy(error.message);
});
