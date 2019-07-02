import test from "ava";
import {
  CreditCardData,
  GatewayError,
  RecurringSequence,
  RecurringType,
  ServicesConfig,
  ServicesContainer,
  TransactionModifier,
} from "../../../../src/";

const config = new ServicesConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.rebatePassword = "rebate";
config.refundPassword = "refund";
config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

test.before((_t) => {
  ServicesContainer.configure(config);
});

test("credit authorization", async (t) => {
  t.plan(4);

  const authorization = await card
    .authorize("14")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(authorization);
  t.is(authorization.responseCode, "00", authorization.responseMessage);

  const capture = await authorization
    .capture("16")
    .withGratuity("2")
    .execute();

  t.truthy(capture);
  t.is(capture.responseCode, "00", capture.responseMessage);
});

test("credit sale", async (t) => {
  t.plan(2);

  const response = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit sale with recurring", async (t) => {
  t.plan(2);

  const response = await card
    .charge(15)
    .withCurrency("USD")
    .withRecurringInfo(RecurringType.Fixed, RecurringSequence.First)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit refund", async (t) => {
  t.plan(2);

  const response = await card
    .refund(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit rebate", async (t) => {
  t.plan(4);

  const response = await card
    .charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);

  const rebate = await response
    .refund(17)
    .withCurrency("USD")
    .execute();

  t.truthy(rebate);
  t.is(rebate.responseCode, "00", rebate.responseMessage);
});

test("credit void", async (t) => {
  t.plan(4);

  const response = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);

  const voidResponse = await response.void().execute();

  t.truthy(voidResponse);
  t.is(voidResponse.responseCode, "00", voidResponse.responseMessage);
});

test("credit verify", async (t) => {
  t.plan(2);

  const response = await card
    .verify()
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit auth mobile - apple pay", async (t) => {
  t.plan(6);

  const encryptedCard = new CreditCardData();
  // tslint:disable-next-line:max-line-length
  encryptedCard.token = `{"version":"EC_v1","data":"Ft+dvMNzlcy6WNB+zerKtkh/RWW4RWW4yXIRgmM3WC/FYEC6Z+OJEzir2sDyzDkjIUJ0TFCQd/QAAAAAAAA==","header":{"ephemeralPublicKey":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEWdNhNAHy9kO2Kol33kIh7k6wh6E/lxriM46MR1FUrn7SHugprkaeFmWKZPgGpWgZ+telY/G1+YSoaCbR5YSoaCbR57bdGA==","transactionId":"fd88874954acdb299c285f95a3202ad1f330d3fd4ebc22a864398684198644c3","publicKeyHash":"h7WnNVz2gmpTSkHqETOWsskFPLSj31e3sPTS2cBxgrk="}}`;
  encryptedCard.mobileType = "apple-pay";

  const incorrectHashError = await t.throws(
    encryptedCard
      .authorize(10)
      .withCurrency("USD")
      .withModifier(TransactionModifier.EncryptedMobile)
      .withAllowDuplicates(true)
      .execute(),
    GatewayError,
  );

  t.truthy(incorrectHashError);
  t.is(incorrectHashError.responseCode, "505", incorrectHashError.responseMessage);

  const cannotDecryptError = await t.throws(
    encryptedCard
      .authorize()
      .withModifier(TransactionModifier.EncryptedMobile)
      .withAllowDuplicates(true)
      .execute(),
    GatewayError,
  );

  t.truthy(cannotDecryptError);
  t.is(cannotDecryptError.responseCode, "515", cannotDecryptError.responseMessage);
});

test("credit auth mobile - google pay", async (t) => {
  t.plan(6);

  const encryptedCard = new CreditCardData();
  // tslint:disable-next-line:max-line-length
  encryptedCard.token = `{"signature":"MEUCIQDapDDJyf9lH3ztEWksgAjNe...AXjW+ZM+Ut2BWoTExppDDPc1a9Z7U\u003d","protocolVersion":"ECv1","signedMessage":"{\"encryptedMessage\":\"VkqwkFuMdXp...TZQxVMnkTeJjwyc4\\u003d\",\"ephemeralPublicKey\":\"BMglUoKZWxgB...YCiBNkLaMTD9G4sec\\u003d\",\"tag\":\"4VYypqW2Q5FN7UP87QNDGsLgc48vAe5+AcjR+BxQ2Zo\\u003d\"}"}`;
  encryptedCard.mobileType = "pay-with-google";

  const missingAmountError = await t.throws(
    encryptedCard
      .authorize()
      .withModifier(TransactionModifier.EncryptedMobile)
      .withAllowDuplicates(true)
      .execute(),
    GatewayError,
  );

  t.truthy(missingAmountError);
  t.is(missingAmountError.responseCode, "502", missingAmountError.responseMessage);

  const invalidTokenError = await t.throws(
    encryptedCard
      .authorize(10)
      .withCurrency("USD")
      .withModifier(TransactionModifier.EncryptedMobile)
      .withAllowDuplicates(true)
      .execute(),
    GatewayError,
  );

  t.truthy(invalidTokenError);
  t.is(invalidTokenError.responseCode, "509", invalidTokenError.responseMessage);
});

test("implied decimal conversion", async (t) => {
  t.plan(8);

  const responseNumber1 = await card
    .charge(78.68)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(responseNumber1);
  t.is(responseNumber1.responseCode, "00", responseNumber1.responseMessage);

  const responseNumber2 = await card
    .charge(78.68000000000001)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(responseNumber2);
  t.is(responseNumber2.responseCode, "00", responseNumber2.responseMessage);

  const responseString1 = await card
    .charge("78.68")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(responseString1);
  t.is(responseString1.responseCode, "00", responseString1.responseMessage);

  const responseString2 = await card
    .charge("78.68000000000001")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(responseString2);
  t.is(responseString2.responseCode, "00", responseString2.responseMessage);
});
