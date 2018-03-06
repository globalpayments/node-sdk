import ava from "ava";
import { CreditService, ServicesConfig, TaxType } from "../../../src/";
import { TestCards } from "../../Data";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
const service = new CreditService(config);
const runSerially = false;
const test = runSerially ? ava.serial : ava;

const card = TestCards.visaManual();

test("auth capture", async (t) => {
  t.plan(4);

  const response = await service
    .authorize(10)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const capture = await service.capture(response.transactionId).execute();

  t.truthy(capture);
  t.is(capture.responseCode, "00");
});

test("sale", async (t) => {
  t.plan(2);

  const response = await service
    .charge(11.01)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("edit", async (t) => {
  t.plan(4);

  const response = await service
    .charge(12)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const edit = await service
    .edit(response.transactionId)
    .withAmount(14)
    .withGratuity(2)
    .execute();

  t.truthy(edit);
  t.is(edit.responseCode, "00");
});

test("commercial edit", async (t) => {
  t.plan(4);

  const response = await service
    .charge(13)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withCommercialRequest(true)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const edit = await service
    .edit(response.transactionId)
    .withTaxType(TaxType.SalesTax)
    .withTaxAmount(1)
    .execute();

  t.truthy(edit);
  t.is(edit.responseCode, "00");
});

test("refund by card", async (t) => {
  t.plan(4);

  const response = await service
    .charge(14)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const refund = await service
    .refund(14)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .execute();

  t.truthy(refund);
  t.is(refund.responseCode, "00");
});

test("refund by transaction ID", async (t) => {
  t.plan(4);

  const response = await service
    .charge(15)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const refund = await service
    .refund(15)
    .withCurrency("USD")
    .withTransactionId(response.transactionId)
    .execute();

  t.truthy(refund);
  t.is(refund.responseCode, "00");
});

test("reverse by card", async (t) => {
  t.plan(4);

  const response = await service
    .charge(16)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const reverse = await service
    .reverse(16)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .execute();

  t.truthy(reverse);
  t.is(reverse.responseCode, "00");
});

test("reverse by transaction ID", async (t) => {
  t.plan(4);

  const response = await service
    .charge(17)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const reverse = await service
    .reverse(17)
    .withCurrency("USD")
    .withTransactionId(response.transactionId)
    .execute();

  t.truthy(reverse);
  t.is(reverse.responseCode, "00");
});

test("verify", async (t) => {
  t.plan(2);

  const response = await service
    .verify()
    .withCurrency("USD")
    .withPaymentMethod(card)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("reverse by client transaction ID", async (t) => {
  t.plan(4);

  const response = await service
    .charge(19)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withClientTransactionId("123456789")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const voidResponse = await service.void(response.transactionId).execute();

  t.truthy(voidResponse);
  t.is(voidResponse.responseCode, "00");
});
