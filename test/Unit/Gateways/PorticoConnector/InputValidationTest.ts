import test from "ava";
import {
  Address,
  CreditCardData,
  PorticoConfig,
  ServicesContainer,
} from "../../../../src/";
import { validateAmount } from "../../../../src/Utils/InputValidation";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

test.before(() => {
  ServicesContainer.configureService(config);
});

test("correctable postal code - hyphen", async (t) => {
  const address = new Address();
  address.postalCode = "12345-6789";

  const response = await card.charge(10)
    .withCurrency("USD")
    .withAddress(address)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("correctable postal code - space", async (t) => {
  const address = new Address();
  address.postalCode = "12345 6789";

  const response = await card.charge(10)
    .withCurrency("USD")
    .withAddress(address)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("invalid postal code - length", async (t) => {
  const address = new Address();
  address.postalCode = "1234567890";

  const error = t.throws(() => {
    return card.charge(10)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute();
  }, {instanceOf: Error});

  t.is(error?.message, "Zip/postal code length greater than the configured gateway's maximum length");
});

test("invalid city - length", async (t) => {
  const address = new Address();
  address.city = "abcdefghijklmnopqrstuvwxyz";

  const error = t.throws(() => {
    return card.charge(10)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute();
  }, {instanceOf: Error});

  t.is(error?.message, "City length greater than the configured gateway's maximum length");
});

test("invalid state - length", async (t) => {
  const address = new Address();
  address.state = "abcdefghijklmnopqrstuvwxyz";

  const error = t.throws(() => {
    return card.charge(10)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute();
  }, {instanceOf: Error});

  t.is(error?.message, "State/province length greater than the configured gateway's maximum length");
});

test("invalid first name - length", async (t) => {
  const c = new CreditCardData();
  c.number = card.number;
  c.expMonth = card.expMonth;
  c.expYear = card.expYear;
  c.cvn = card.cvn;
  c.cardHolderName = "abcdefghijklmnopqrstuvwxyza smith";

  const error = t.throws(() => {
    return c.charge(10)
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .execute();
  }, {instanceOf: Error});

  t.is(error?.message, "First name length greater than the configured gateway's maximum length");
});

test("invalid last name - length", async (t) => {
  const c = new CreditCardData();
  c.number = card.number;
  c.expMonth = card.expMonth;
  c.expYear = card.expYear;
  c.cvn = card.cvn;
  c.cardHolderName = "john abcdefghijklmnopqrstuvwxyza";

  const error = t.throws(() => {
    return c.charge(10)
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .execute();
  }, {instanceOf: Error});

  t.is(error?.message, "Last name length greater than the configured gateway's maximum length");
});

test("floating point math", async (t) => {
  t.is(validateAmount("portico", 15.01), "15.01");
  t.is(validateAmount("portico", 15.0100000000001), "15.01");
  t.is(validateAmount("portico", "15.01"), "15.01");
  t.is(validateAmount("portico", "15.0100000000001"), "15.01");
  t.is(validateAmount("portico", 76.68), "76.68");
  t.is(validateAmount("portico", 76.6800000000001), "76.68");
  t.is(validateAmount("portico", "76.68"), "76.68");
  t.is(validateAmount("portico", "76.6800000000001"), "76.68");
});
