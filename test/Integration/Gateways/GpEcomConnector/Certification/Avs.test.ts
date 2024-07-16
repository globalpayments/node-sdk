import {
  Address,
  AddressType,
  CreditCardData,
  CvnPresenceIndicator,
  GatewayError,
  ServicesContainer,
} from "../../../../../src";
import { GpEcomConfig } from "../../../../../src/ServiceConfigs";

const config = new GpEcomConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.refundPassword = "refund";
config.rebatePassword = "rebate";

config.timeout = 5000;
config.channel = "ECOM";

beforeAll(() => {
  ServicesContainer.configureService(config);
});

const throttle = () => new Promise((resolve) => setTimeout(resolve, 1500));

beforeEach(async () => {
  await throttle();
});

test("JAVA_AVS_001a", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-001a")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_001b", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-001b")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_001c", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-001c")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_001d", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-001d")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_001e", async () => {
  // billing address
  const billingAddress = new Address();
  /* eslint-disable */
  billingAddress.streetAddress1 =
    "Lorem ipsum dolor sit 1amet; consectetur adipiscing elit. Aenean ali2quam tellus in elit hendrerit; non 3porttE77 4QJitor lorem venenatis. Pellentesque dictum eu nunc ac fringilla. In vitae quam eu odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
  billingAddress.postalCode =
    "Lorem ipsum dolo1r sit amet; consectetur adipiscing elit. Aenean aliquam tellus in elit hendrerit; non porttE77 4QJitor lorem venenatis. Pellentesque dictum eu2 nunc ac fringilla. In vitae quam eu 3odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
  /* eslint-enable */
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-001e")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_001f", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-001f")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_001g", async () => {
  // billing address
  const billingAddress = new Address();
  /* eslint-disable */
  billingAddress.streetAddress1 =
    "Lorem ipsum dolor sit amet; consectetur adipiscing elit. Aenean aliquam tellus in elit hendrerit; non porttE77 4QJitor lorem venenatis. Pellentesque dictum eu nunc ac fringilla. In vitae quam eu odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
  billingAddress.postalCode =
    "Lorem ipsum dolor sit amet; consectetur adipiscing elit. Aenean aliquam tellus in elit hendrerit; non porttE77 4QJitor lorem venenatis. Pellentesque dictum eu nunc ac fringilla. In vitae quam eu odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
  /* eslint-enable */
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-001g")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_003a", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-003a")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_003b", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-003b")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_003c", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-003c")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_003d", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-003d")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_003e", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-003e")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_003f", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-003f")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_003g", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-003e")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_AVS_003h", async () => {
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
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withCustomerId("100")
      .withProductId("999")
      .withClientTransactionId("test")
      .withCustomerIpAddress("123.123.123.123")
      .withAddress(billingAddress)
      .withAddress(shippingAddress, AddressType.Shipping)
      .withDescription("JAVA-AVS-003f")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});
