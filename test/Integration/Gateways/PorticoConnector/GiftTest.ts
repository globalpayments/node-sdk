import ava from "ava";
import {
  GiftCard,
  PaymentMethodType,
  ServicesConfig,
  ServicesContainer,
  Transaction,
} from "../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
const runSerially = false;
const test = runSerially ? ava.serial : ava;

const card = new GiftCard();
card.number = "5022440000000000007";

const track = new GiftCard();
track.trackData = "%B5022440000000000098^^391200081613?;5022440000000000098=391200081613?";

ava.before((_t) => {
  ServicesContainer.configure(config);
});

test("gift create", async (t) => {
  t.plan(4);

  const newCard = await GiftCard.create("2145550199");

  t.truthy(newCard);
  t.truthy(newCard.number);
  t.truthy(newCard.alias);
  t.truthy(newCard.pin);
});

test("gift add alias", async (t) => {
  t.plan(2);

  const response = await card.addAlias("2145550199").execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift add value", async (t) => {
  t.plan(2);

  const response = await card.addValue(10)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift balance inquiry", async (t) => {
  t.plan(2);

  const response = await card.balanceInquiry().execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift sale", async (t) => {
  t.plan(2);

  const response = await card.charge(10)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift deactivate", async (t) => {
  t.plan(2);

  const response = await card.deactivate().execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift remove alias", async (t) => {
  t.plan(2);

  const response = await card.removeAlias("2145550199").execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift replace", async (t) => {
  t.plan(2);

  const response = await card.replaceWith(track).execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift reverse", async (t) => {
  t.plan(2);

  const response = await card.reverse(10).execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift rewards", async (t) => {
  t.plan(2);

  const response = await card.rewards(10).execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift track add alias", async (t) => {
  t.plan(2);

  const response = await track.addAlias("2145550199").execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift track add value", async (t) => {
  t.plan(2);

  const response = await track.addValue(10)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift track balance inquiry", async (t) => {
  t.plan(2);

  const response = await track.balanceInquiry().execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift track sale", async (t) => {
  t.plan(2);

  const response = await track.charge(10)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift track deactivate", async (t) => {
  t.plan(2);

  const response = await track.deactivate().execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift track remove alias", async (t) => {
  t.plan(2);

  const response = await track.removeAlias("2145550199").execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift track replace", async (t) => {
  t.plan(2);

  const response = await track.replaceWith(track).execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift track reverse", async (t) => {
  t.plan(2);

  const response = await track.reverse(10).execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift track rewards", async (t) => {
  t.plan(2);

  const response = await track.rewards(10).execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("gift reverse with transaction id", async (t) => {
  t.plan(4);

  const response = await card.charge(10)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);

  const reverseResponse = await Transaction.fromId(response.transactionId, PaymentMethodType.Gift)
    .reverse(10)
    .execute();

  t.truthy(reverseResponse);
  t.is(reverseResponse.responseCode, "00", reverseResponse.responseMessage);
});
