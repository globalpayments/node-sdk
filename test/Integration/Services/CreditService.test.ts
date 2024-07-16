import { CreditService, PorticoConfig, TaxType } from "../../../src";
import { TestCards } from "../../Data";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
const service = new CreditService(config);

const card = TestCards.visaManual();

test.failing("auth capture", async () => {
  const response = await service
    .authorize(10)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const capture = await service.capture(response.transactionId).execute();

  expect(capture).toBeTruthy();
  expect(capture.responseCode).toBe("00");
});

test("sale", async () => {
  const response = await service
    .charge(11.01)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.failing("edit", async () => {
  const response = await service
    .charge(12)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const edit = await service
    .edit(response.transactionId)
    .withAmount(14)
    .withGratuity(2)
    .execute();

  expect(edit).toBeTruthy();
  expect(edit.responseCode).toBe("00");
});

test.failing("commercial edit", async () => {
  const response = await service
    .charge(13)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withCommercialRequest(true)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const edit = await service
    .edit(response.transactionId)
    .withTaxType(TaxType.SalesTax)
    .withTaxAmount(1)
    .execute();

  expect(edit).toBeTruthy();
  expect(edit.responseCode).toBe("00");
});

test("refund by card", async () => {
  const response = await service
    .charge(14)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const refund = await service
    .refund(14)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .execute();

  expect(refund).toBeTruthy();
  expect(refund.responseCode).toBe("00");
});

test("refund by transaction ID", async () => {
  const response = await service
    .charge(15)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const refund = await service
    .refund(15)
    .withCurrency("USD")
    .withTransactionId(response.transactionId)
    .execute();

  expect(refund).toBeTruthy();
  expect(refund.responseCode).toBe("00");
});

test("reverse by card", async () => {
  const response = await service
    .charge(16)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const reverse = await service
    .reverse(16)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .execute();

  expect(reverse).toBeTruthy();
  expect(reverse.responseCode).toBe("00");
});

test("reverse by transaction ID", async () => {
  const response = await service
    .charge(17)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const reverse = await service
    .reverse(17)
    .withCurrency("USD")
    .withTransactionId(response.transactionId)
    .execute();

  expect(reverse).toBeTruthy();
  expect(reverse.responseCode).toBe("00");
});

test("verify", async () => {
  const response = await service
    .verify()
    .withCurrency("USD")
    .withPaymentMethod(card)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.failing("reverse by client transaction ID", async () => {
  const response = await service
    .charge(19)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withClientTransactionId("123456789")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const voidResponse = await service.void(response.transactionId).execute();

  expect(voidResponse).toBeTruthy();
  expect(voidResponse.responseCode).toBe("00");
});
