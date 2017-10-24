import ava from "ava";
import {
  DebitService,
  ServicesConfig,
  UnsupportedTransactionError,
} from "../../../src/";
import {
  TestCards,
} from "../../Data";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
const service = new DebitService(config);
const runSerially = false;
const test = runSerially ? ava.serial : ava;

const card = TestCards.asDebit(TestCards.visaSwipe(), "32539F50C245A6A93D123412324000AA");

test("sale", async (t) => {
  t.plan(2);

  const response = await service.charge(14)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("refund by card", async (t) => {
  t.plan(4);

  const response = await service.charge(15)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);

  const refund = await service.refund(15)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .execute();

  t.truthy(refund);
  t.is(refund.responseCode, "00", refund.responseMessage);
});

test("reverse by card", async (t) => {
  t.plan(4);

  const response = await service.charge(16)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);

  const reverse = await service.reverse(16)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .execute();

  t.truthy(reverse);
  t.is(reverse.responseCode, "00", reverse.responseMessage);
});

test("reverse by transaction id fails", async (t) => {
  t.plan(4);

  const response = await service.charge(17)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);

  const error = t.throws(() => {
    service.reverse(17)
      .withCurrency("USD")
      .withTransactionId(response.transactionId)
      .execute();
  }, UnsupportedTransactionError);

  t.truthy(error.message);
});
