import {
  Address,
  AddressType,
  CreditCardData,
  CvnPresenceIndicator,
  GatewayError,
  ServicesContainer,
} from "../../../../../src";
import { GpEcomConfig } from "../../../../../src/ServiceConfigs";

const throttle = (i: number) =>
  new Promise((resolve) => setTimeout(resolve, i * 1500));

const config = new GpEcomConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.refundPassword = "refund";
config.rebatePassword = "rebate";

config.timeout = 20000;

// const test = ava.serial;

beforeAll(() => {
  ServicesContainer.configureService(config);
});

let i = 0;
beforeEach(async () => {
  await throttle(i);
  i += 0.1;
});

// test("JAVA_Auth_006a", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("GBP")
//     .withDescription("JAVA-Auth-006a")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_006b", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("EUR")
//     .withDescription("JAVA-Auth-006b")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_006c", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("USD")
//     .withDescription("JAVA-Auth-006c")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_006d", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("GBP")
//     .withDescription("JAVA-Auth-006d")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_006e", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("EUR")
//     .withDescription("JAVA-Auth-006e")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_006f", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("USD")
//     .withDescription("JAVA-Auth-006f")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_006g", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("GBP")
//     .withDescription("JAVA-Auth-006g")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_006h", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("EUR")
//     .withDescription("JAVA-Auth-006h")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_006i", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("USD")
//     .withDescription("JAVA-Auth-006i")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_006j", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("GBP")
//     .withDescription("JAVA-Auth-006j")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_006k", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("EUR")
//     .withDescription("JAVA-Auth-006k")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_007a", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("GBP")
//     .withDescription("JAVA-Auth-007a")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_007b", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("EUR")
//     .withDescription("JAVA-Auth-007b")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_007c", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("USD")
//     .withDescription("JAVA-Auth-007c")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_007d", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("GBP")
//     .withDescription("JAVA-Auth-007d")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_007e", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("EUR")
//     .withDescription("JAVA-Auth-007e")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_008a", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("USD")
//     .withDescription("JAVA-Auth-008a")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_008b", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("GBP")
//     .withDescription("JAVA-Auth-008b")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_008c", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("EUR")
//     .withDescription("JAVA-Auth-008c")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_008d", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("USD")
//     .withDescription("JAVA-Auth-008d")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_008e", async (t) => {
//   t.plan(2);

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("GBP")
//     .withDescription("JAVA-Auth-008e")
//     .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

// test("JAVA_Auth_009a", async (t) => {
//   t.plan(2);

//   const config = new GpEcomConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";

//   config.timeout = 20000;
//   config.channel = "ECOM";

//   ServicesContainer.configureService(config, "withChannelEcom");

//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2029";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";

//   // request
//   const response = await card
//     .charge(100.01)
//     .withCurrency("EUR")
//     .withDescription("JAVA-Auth-009a")
//     .execute("withChannelEcom");
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });

test("JAVA_Auth_009b", async () => {
  const config = new GpEcomConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";

  config.timeout = 20000;
  config.channel = "ECOM";

  ServicesContainer.configureService(config, "withAnotherChannelEcom");

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2020";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("USD")
      .withDescription("JAVA-Auth-009b")
      .execute("withAnotherChannelEcom");
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_009c", async () => {
  const config = new GpEcomConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";

  config.timeout = 20000;
  config.channel = "ECOM";

  ServicesContainer.configureService(config, "with3rdChannelEcom");

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const res = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-009c")
    .execute("with3rdChannelEcom");
  expect(res).toBeTruthy();
  expect("00").toBe(res.responseCode);
});

test("JAVA_Auth_009d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-009d")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_010a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-010a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_010b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-010b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_010c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-010c")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_010d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-010d")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_010e", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-010e")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_011a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-011a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_011b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-011b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_011c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-011c")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_011d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge()
      .withCurrency("EUR")
      .withDescription("JAVA-Auth-011d")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_012a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-012a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_012b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("EURO")
      .withDescription("JAVA-Auth-012b")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_012c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2019";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("EUR")
      .withDescription("JAVA-Auth-012c")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_012d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card.charge(100.01).withDescription("JAVA-Auth-012d").execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_013a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-013a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_013b1", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "424242000000000000000";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("EUR")
      .withDescription("JAVA-Auth-013b1")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_013b2", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "42424242424";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("USD")
      .withDescription("JAVA-Auth-013b2")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_013c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262#";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withDescription("JAVA-Auth-013c")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_014a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-014a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_014b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("USD")
      .withDescription("JAVA-Auth-014b")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_014c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName =
    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withDescription("JAVA-Auth-014c")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_014d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James~Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-014d")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_015a", async () => {
  expect.assertions(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-015a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_015b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-015b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_015c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "20";
  card.expYear = "2012";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("EUR")
      .withDescription("JAVA-Auth-015c")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_015d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("USD")
      .withDescription("JAVA-Auth-015d")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_016a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-016a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_016b", async () => {
  expect.assertions(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-016b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_016c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-016c")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_017a", async () => {
  expect.assertions(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-017a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_018a", async () => {
  expect.assertions(2);

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-018a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_019a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-019a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_019b1", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("GBP")
      .withDescription("JAVA-Auth-019b1")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_019b2", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-019b2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_019c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "12345";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  try {
    await card
      .charge(100.01)
      .withCurrency("EUR")
      .withDescription("JAVA-Auth-019c")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_019d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "374101000000608";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "1234";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-019d")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_020a1", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-020a1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_020a2", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Illegible;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-020a2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_020a3", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "";
  card.cvnPresenceIndicator = CvnPresenceIndicator.NotOnCard;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-020a3")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_020a4", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "";
  card.cvnPresenceIndicator = CvnPresenceIndicator.NotRequested;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-020a4")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_020b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = 5 as CvnPresenceIndicator;
  card.cardHolderName = "James Mason";

  // request
  await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-020b")
    .execute();

  try {
    await card
      .charge(100.01)
      .withCurrency("EUR")
      .withDescription("JAVA-Auth-020b")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("JAVA_Auth_020c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = 0 as CvnPresenceIndicator;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-020c")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_021a1", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-021a1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_021a2", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .authorize(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-021a2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_021a3", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .authorize(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-021a3")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_021b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .authorize(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-021b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_021c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .authorize(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-021c")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_022a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-022a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_022b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-022b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_022c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-022c")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_022d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-022d")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_022e", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-022e")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_023a1", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-023a1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_023a2", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-023a2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_023b1", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-023b1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_023c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-023c")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_024a1", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-024a1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_024a2", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-024a2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_024a3", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-024a3")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_024b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-024b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_024c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-024c")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_025", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-025")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_026a1", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-026a1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_026a2", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card.charge(100.01).withCurrency("EUR").execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_026b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card.charge(100.01).withCurrency("USD").execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_026c1", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    /* eslint-disable */
    .withDescription(
      "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIep3uviSnW9XEB3a4wpIW9XEB3a",
    )
    /* eslint-enable */
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_026c2", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-026c2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_027a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withCustomerId("123456")
    .withDescription("JAVA-Auth-027a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_028a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("123456")
    .withDescription("JAVA-Auth-028a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_028b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-028b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_028c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const res = await card
    .charge(100.01)
    .withCurrency("USD")
    // tslint:disable:max-line-length
    .withCustomerId(
      "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep33a4wpQQQQQQQQQ1",
    )
    // tslint:enable:max-line-length
    .withDescription("JAVA-Auth-028c")
    .execute();
  expect(res).toBeTruthy();
  expect("00").toBe(res.responseCode);
});

test("JAVA_Auth_028d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const res = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerId("123456~")
    .withDescription("JAVA-Auth-028d")
    .execute();
  expect(res).toBeTruthy();
  expect("00").toBe(res.responseCode);
});

test("JAVA_Auth_029a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withProductId("123456")
    .withDescription("JAVA-Auth-029a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_029b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withDescription("JAVA-Auth-029b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_029c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const res = await card
    .charge(100.01)
    .withCurrency("GBP")
    // tslint:disable:max-line-length
    .withProductId(
      "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep33a4wpQQQQQQQQQ1",
    )
    // tslint:enable:max-line-length
    .withDescription("JAVA-Auth-029c")
    .execute();
  expect(res).toBeTruthy();
  expect("00").toBe(res.responseCode);
});

test("JAVA_Auth_029d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const res = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withProductId("123456~")
    .withDescription("JAVA-Auth-029d")
    .execute();
  expect(res).toBeTruthy();
  expect("00").toBe(res.responseCode);
});

test("JAVA_Auth_030a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withClientTransactionId("123456")
    .withDescription("JAVA-Auth-030a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_030b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-030b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_030c", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const res = await card
    .charge(100.01)
    .withCurrency("EUR")
    // tslint:disable:max-line-length
    .withClientTransactionId(
      "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep33a4wpQQQQQQQQQ1",
    )
    // tslint:enable:max-line-length
    .withDescription("JAVA-Auth-030c")
    .execute();
  expect(res).toBeTruthy();
  expect("00").toBe(res.responseCode);
});

test("JAVA_Auth_030d", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const res = await card
    .charge(100.01)
    .withCurrency("USD")
    .withClientTransactionId("123456~")
    .withDescription("JAVA-Auth-030d")
    .execute();
  expect(res).toBeTruthy();
  expect("00").toBe(res.responseCode);
});

test("JAVA_Auth_031a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerIpAddress("123.123.123.123")
    .withDescription("JAVA-Auth-031a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_031b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-031b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_031c1", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withCustomerIpAddress("123.123.123.123")
    .withDescription("JAVA-Auth-031c1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_031c2", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withCustomerIpAddress("123.123.123.123")
    .withDescription("JAVA-Auth-031c2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_032a", async () => {
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
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Auth-032a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_033a", async () => {
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
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Auth-033a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_033b1", async () => {
  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "774|10";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(billingAddress)
    .withDescription("JAVA-Auth-033b1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_033b2", async () => {
  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "769|52";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Auth-033b2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_033c1", async () => {
  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "774|10";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(billingAddress)
    .withDescription("JAVA-Auth-033c1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_033c2", async () => {
  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode =
    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Auth-033c2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_034a", async () => {
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
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Auth-034a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_034b1", async () => {
  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country = "GB";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Auth-034b1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_034b2", async () => {
  // billing address
  const billingAddress = new Address();
  billingAddress.country = "GB";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withAddress(billingAddress)
    .withDescription("JAVA-Auth-034b2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_034c1", async () => {
  // billing address
  const billingAddress = new Address();
  billingAddress.country =
    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withAddress(billingAddress)
    .withDescription("JAVA-Auth-034c1")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_034c2", async () => {
  // shipping address
  const shippingAddress = new Address();
  shippingAddress.country =
    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("USD")
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Auth-034c2")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_035a", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("GBP")
    .withDescription("JAVA-Auth-035a")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_035b", async () => {
  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withDescription("JAVA-Auth-035b")
    .execute();
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("JAVA_Auth_055a", async () => {
  const config = new GpEcomConfig();
  config.merchantId = "heartlandgpsandbox";
  config.accountId = "api";
  config.sharedSecret = "secret";
  config.refundPassword = "refund";
  config.rebatePassword = "rebate";

  config.timeout = 20000;
  config.channel = "ECOM";
  ServicesContainer.configureService(config, "with4thChannelEcom");

  // billing address
  const billingAddress = new Address();
  billingAddress.postalCode = "774|10";
  billingAddress.country = "GB";

  // shipping address
  const shippingAddress = new Address();
  shippingAddress.postalCode = "769|52";
  shippingAddress.country = "FR";

  // create card
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "12";
  card.expYear = "2029";
  card.cvn = "123";
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = "James Mason";

  // request
  const response = await card
    .charge(100.01)
    .withCurrency("EUR")
    .withCustomerId("12345")
    .withProductId("654321")
    .withClientTransactionId("987654")
    .withCustomerIpAddress("123.123.123.123")
    .withAddress(billingAddress)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withDescription("JAVA-Auth-055a")
    .execute("with4thChannelEcom");
  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});
