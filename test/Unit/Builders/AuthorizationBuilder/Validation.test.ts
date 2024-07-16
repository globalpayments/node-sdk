import {
  BuilderError,
  CreditCardData,
  ECheck,
  GiftCard,
  PaymentMethod,
  PorticoConfig,
  ServicesContainer,
  UnsupportedTransactionError,
} from "../../../../src";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

beforeAll(() => {
  ServicesContainer.configureService(config);
});

test("credit auth no amount", async () => {
  try {
    await expect(card.authorize().execute());
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("amount cannot be null")).toBe(true);
  }
});

test("credit auth no currency", async () => {
  try {
    await expect(card.authorize(14).execute());
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("currency cannot be null")).toBe(true);
  }
});

test("credit sale no amount", async () => {
  try {
    await expect(card.charge().execute());
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("amount cannot be null")).toBe(true);
  }
});

test("credit sale no currency", async () => {
  try {
    await expect(card.charge(14).execute());
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("currency cannot be null")).toBe(true);
  }
});

test("credit sale no payment method", async () => {
  try {
    await card
      .charge(14)
      .withCurrency("USD")
      .withPaymentMethod({} as PaymentMethod)
      .execute();
  } catch (error) {
    expect(error).toBeInstanceOf(UnsupportedTransactionError);
    expect(error?.name).toBe("UnsupportedTransactionError");
    expect(
      -1 !== error?.message.indexOf("not supported for this payment method"),
    ).toBe(true);
  }
});

test("credit offline no amount", async () => {
  try {
    await card.charge().withOfflineAuthCode("123456").execute();
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("amount cannot be null")).toBe(true);
  }
});

test("credit offline no currency", async () => {
  try {
    await card.charge(14).withOfflineAuthCode("123456").execute();
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("currency cannot be null")).toBe(true);
  }
});

test("credit offline no auth code", async () => {
  try {
    await card.charge(14).withCurrency("USD").withOfflineAuthCode("").execute();
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(
      -1 !== error?.message.indexOf("offlineAuthCode cannot be empty"),
    ).toBe(true);
  }
});

test("gift replace no replacement card", async () => {
  const gift = new GiftCard();
  gift.alias = "1234567890";
  try {
    await gift.replaceWith(undefined).execute();
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(
      -1 !== error?.message.indexOf("replacementCard cannot be null"),
    ).toBe(true);
  }
});

test("check sale no address", async () => {
  try {
    await new ECheck().charge(14).withCurrency("USD").execute();
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("billingAddress cannot be null")).toBe(
      true,
    );
  }
});
