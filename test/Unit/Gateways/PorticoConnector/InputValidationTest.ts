import test from "ava";
import {
  Address,
  CreditCardData,
  ServicesConfig,
  ServicesContainer,
} from "../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

test.before((_t) => {

  ServicesContainer.configure(config);
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
  }, Error);

  t.is(error.name, Error.name);
  t.true(
    -1 !==
      error.message.indexOf(
        "length greater than the configured gateway's maximum length",
      ),
  );
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
  }, Error);

  t.is(error.name, Error.name);
  t.true(
    -1 !==
      error.message.indexOf(
        "length greater than the configured gateway's maximum length",
      ),
  );
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
  }, Error);

  t.is(error.name, Error.name);
  t.true(
    -1 !==
      error.message.indexOf(
        "length greater than the configured gateway's maximum length",
      ),
  );
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
  }, Error);

  t.is(error.name, Error.name);
  t.true(
    -1 !==
      error.message.indexOf(
        "length greater than the configured gateway's maximum length",
      ),
  );
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
  }, Error);

  t.is(error.name, Error.name);
  t.true(
    -1 !==
      error.message.indexOf(
        "length greater than the configured gateway's maximum length",
      ),
  );
});
