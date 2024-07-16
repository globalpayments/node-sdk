import {
  DebitService,
  PorticoConfig,
  UnsupportedTransactionError,
} from "../../../src";
import { TestCards } from "../../Data";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";
const service = new DebitService(config);

const card = TestCards.asDebit(
  TestCards.visaSwipe(),
  "32539F50C245A6A93D123412324000AA",
);

test("sale", async () => {
  expect.assertions(2);

  const response = await service
    .charge(14)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.skip("refund by card", async () => {
  expect.assertions(4);

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
    .withPaymentMethod(card)
    .execute();

  expect(refund).toBeTruthy();
  expect(refund.responseCode).toBe("00");
});

test("reverse by card", async () => {
  expect.assertions(4);

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

test("reverse by transaction id fails", async () => {
  const response = await service
    .charge(17)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  try {
    await service
      .reverse(17)
      .withCurrency("USD")
      .withTransactionId(response.transactionId)
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error).toBeInstanceOf(UnsupportedTransactionError);
  }
});
