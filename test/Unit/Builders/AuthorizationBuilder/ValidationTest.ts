import test from "ava";
import {
  ArgumentError,
  CreditCardData,
  ECheck,
  GiftCard,
  PaymentMethod,
  ServicesConfig,
  ServicesContainer,
  UnsupportedTransactionError,
} from "../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2.heartlandportico.com";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

test.before((_t) => {
  ServicesContainer.configure(config);
});

test("credit auth no amount", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return card.authorize().execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("amount cannot be null"));
});

test("credit auth no currency", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return card.authorize(14).execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("currency cannot be null"));
});

test("credit sale no amount", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return card.charge().execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("amount cannot be null"));
});

test("credit sale no currency", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return card.charge(14).execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("currency cannot be null"));
});

test("credit sale no payment method", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return card
      .charge(14)
      .withCurrency("USD")
      .withPaymentMethod({} as PaymentMethod)
      .execute();
  }, UnsupportedTransactionError);

  t.is(error.name, "UnsupportedTransactionError");
  t.true(-1 !== error.message.indexOf("not supported for this payment method"));
});

test("credit offline no amount", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return card
      .charge()
      .withOfflineAuthCode("123456")
      .execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("amount cannot be null"));
});

test("credit offline no currency", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return card
      .charge(14)
      .withOfflineAuthCode("123456")
      .execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("currency cannot be null"));
});

test("credit offline no auth code", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return card
      .charge(14)
      .withCurrency("USD")
      .withOfflineAuthCode("")
      .execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("offlineAuthCode cannot be empty"));
});

test("gift replace no replacement card", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    const gift = new GiftCard();
    gift.alias = "1234567890";
    return gift.replaceWith(undefined).execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("replacementCard cannot be null"));
});

test("check sale no address", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    const check = new ECheck();
    return check
      .charge(14)
      .withCurrency("USD")
      .execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("billingAddress cannot be null"));
});
