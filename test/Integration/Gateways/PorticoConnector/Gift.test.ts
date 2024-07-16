import {
  GiftCard,
  PaymentMethodType,
  PorticoConfig,
  ServicesContainer,
  Transaction,
} from "../../../../src";

const config = new PorticoConfig();

const card = new GiftCard();
card.number = "5022440000000000007";

const track = new GiftCard();
track.trackData =
  "%B5022440000000000098^^391200081613?;5022440000000000098=391200081613?";

beforeAll(() => {
  config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";
  ServicesContainer.configureService(config);
});

test("gift create", async () => {
  const newCard = await GiftCard.create("2145550199");

  expect(newCard).toBeTruthy();
  expect(newCard.number).toBeTruthy();
  expect(newCard.alias).toBeTruthy();
  expect(newCard.pin).toBeTruthy();
});

test("gift add alias", async () => {
  const response = await card.addAlias("2145550199").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift add value", async () => {
  const response = await card.addValue(10).withCurrency("USD").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift balance inquiry", async () => {
  const response = await card.balanceInquiry().execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift sale", async () => {
  const response = await card.charge(10).withCurrency("USD").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift deactivate", async () => {
  const response = await card.deactivate().execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift remove alias", async () => {
  const response = await card.removeAlias("2145550199").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift replace", async () => {
  const response = await card.replaceWith(track).execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.skip("gift reverse", async () => {
  const response = await card.reverse(10).execute();
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift rewards", async () => {
  const response = await card.rewards(10).execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift track add alias", async () => {
  const response = await track.addAlias("2145550199").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift track add value", async () => {
  const response = await track.addValue(10).withCurrency("USD").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift track balance inquiry", async () => {
  const response = await track.balanceInquiry().execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift track sale", async () => {
  const response = await track.charge(10).withCurrency("USD").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift track deactivate", async () => {
  const response = await track.deactivate().execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift track remove alias", async () => {
  const response = await track.removeAlias("2145550199").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.skip("gift track replace", async () => {
  const response = await track.replaceWith(track).execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift track reverse", async () => {
  const response = await track.reverse(10).execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("gift track rewards", async () => {
  const response = await track.rewards(10).execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.skip("gift reverse with transaction id", async () => {
  const response = await card.charge(10).withCurrency("USD").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const reverseResponse = await Transaction.fromId(
    response.transactionId,
    PaymentMethodType.Gift,
  )
    .reverse(10)
    .execute();

  expect(reverseResponse).toBeTruthy();
  expect(reverseResponse.responseCode).toBe("00");
});
