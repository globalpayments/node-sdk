import { EBTService, PorticoConfig } from "../../../src";
import { TestCards } from "../../Data";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";
const service = new EBTService(config);

const card = TestCards.asEBTTrack(
  TestCards.visaSwipe(),
  "32539F50C245A6A93D123412324000AA",
);

test("balance inquiry", async () => {
  const response = await service
    .balanceInquiry()
    .withPaymentMethod(card)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.failing("benefits withdrawal", async () => {
  const response = await service
    .benefitWithdrawal(10)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("sale", async () => {
  const response = await service
    .charge(11)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("refund by card", async () => {
  const response = await service
    .charge(12)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const refund = await service
    .refund(12)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .execute();

  expect(refund).toBeTruthy();
  expect(refund.responseCode).toBe("00");
});
