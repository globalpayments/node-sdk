import {
  Address,
  CreditCardData,
  PorticoConfig,
  ServicesContainer,
} from "../../../../src";
import { validateAmount } from "../../../../src/Utils/InputValidation";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

beforeAll(() => {
  ServicesContainer.configureService(config);
});

test("correctable postal code - hyphen", async () => {
  const address = new Address();
  address.postalCode = "12345-6789";

  const response = await card
    .charge(10)
    .withCurrency("USD")
    .withAddress(address)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("correctable postal code - space", async () => {
  const address = new Address();
  address.postalCode = "12345 6789";

  const response = await card
    .charge(10)
    .withCurrency("USD")
    .withAddress(address)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("invalid postal code - length", async () => {
  const address = new Address();
  address.postalCode = "1234567890";
  try {
    await card
      .charge(10)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(
      "Zip/postal code length greater than the configured gateway's maximum length",
    );
  }
});

test("invalid city - length", async () => {
  const address = new Address();
  address.city = "abcdefghijklmnopqrstuvwxyz";
  try {
    await card
      .charge(10)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(
      "City length greater than the configured gateway's maximum length",
    );
  }
});

test("invalid state - length", async () => {
  const address = new Address();
  address.state = "abcdefghijklmnopqrstuvwxyz";
  try {
    await card
      .charge(10)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(
      "State/province length greater than the configured gateway's maximum length",
    );
  }
});

test("invalid first name - length", async () => {
  const c = new CreditCardData();
  c.number = card.number;
  c.expMonth = card.expMonth;
  c.expYear = card.expYear;
  c.cvn = card.cvn;
  c.cardHolderName = "abcdefghijklmnopqrstuvwxyza smith";
  try {
    await c.charge(10).withCurrency("USD").withAllowDuplicates(true).execute();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(
      "First name length greater than the configured gateway's maximum length",
    );
  }
});

test("invalid last name - length", async () => {
  const c = new CreditCardData();
  c.number = card.number;
  c.expMonth = card.expMonth;
  c.expYear = card.expYear;
  c.cvn = card.cvn;
  c.cardHolderName = "john abcdefghijklmnopqrstuvwxyza";
  try {
    await c.charge(10).withCurrency("USD").withAllowDuplicates(true).execute();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(
      "Last name length greater than the configured gateway's maximum length",
    );
  }
});

test("floating point math", async () => {
  expect(validateAmount("portico", 15.01)).toBe("15.01");
  expect(validateAmount("portico", 15.0100000000001)).toBe("15.01");
  expect(validateAmount("portico", "15.01")).toBe("15.01");
  expect(validateAmount("portico", "15.0100000000001")).toBe("15.01");
  expect(validateAmount("portico", 76.68)).toBe("76.68");
  expect(validateAmount("portico", 76.6800000000001)).toBe("76.68");
  expect(validateAmount("portico", "76.68")).toBe("76.68");
  expect(validateAmount("portico", "76.6800000000001")).toBe("76.68");
});
