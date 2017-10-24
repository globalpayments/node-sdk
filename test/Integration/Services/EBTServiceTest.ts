import ava from "ava";
import {
  EBTService,
  ServicesConfig,
} from "../../../src/";
import {
  TestCards,
} from "../../Data";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
const service = new EBTService(config);
const runSerially = false;
const test = runSerially ? ava.serial : ava;

const card = TestCards.asEBTTrack(TestCards.visaSwipe(), "32539F50C245A6A93D123412324000AA");

test("balance inquiry", async (t) => {
  t.plan(2);

  const response = await service.balanceInquiry()
    .withPaymentMethod(card)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("benefits withdrawal", async (t) => {
  t.plan(2);

  const response = await service.benefitWithdrawal(10)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("sale", async (t) => {
  t.plan(2);

  const response = await service.charge(11)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("refund by card", async (t) => {
  t.plan(4);

  const response = await service.charge(12)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);

  const refund = await service.refund(12)
    .withCurrency("USD")
    .withPaymentMethod(card)
    .execute();

  t.truthy(refund);
  t.is(refund.responseCode, "00", refund.responseMessage);
});
