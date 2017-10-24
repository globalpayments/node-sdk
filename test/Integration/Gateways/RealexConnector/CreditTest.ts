import test from "ava";
import {
  CreditCardData,
  RecurringSequence,
  RecurringType,
  ServicesConfig,
  ServicesContainer,
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

  const authorization = await card.authorize("14")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(authorization);
  t.is(authorization.responseCode, "00", authorization.responseMessage);

  const capture = await authorization.capture("16")
    .withGratuity("2")
    .execute();

  t.truthy(capture);
  t.is(capture.responseCode, "00", capture.responseMessage);
});

test("credit sale", async (t) => {
  t.plan(2);

  const response = await card.charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit sale with recurring", async (t) => {
  t.plan(2);

  const response = await card.charge(15)
    .withCurrency("USD")
    .withRecurringInfo(RecurringType.Fixed, RecurringSequence.First)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit refund", async (t) => {
  t.plan(2);

  const response = await card.refund(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit rebate", async (t) => {
  t.plan(4);

  const response = await card.charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);

  const rebate = await response.refund(17)
    .withCurrency("USD")
    .execute();

  t.truthy(rebate);
  t.is(rebate.responseCode, "00", rebate.responseMessage);
});

test("credit void", async (t) => {
  t.plan(4);

  const response = await card.charge(15)
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

  const response = await card.verify()
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});
