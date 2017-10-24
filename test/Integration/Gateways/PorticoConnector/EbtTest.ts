import ava from "ava";
import {
  EBTCardData,
  EBTTrackData,
  EncryptionData,
  PaymentMethodType,
  ServicesConfig,
  ServicesContainer,
  Transaction,
  UnsupportedTransactionError,
} from "../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
const runSerially = false;
const test = runSerially ? ava.serial : ava;

const card = new EBTCardData();
card.number = "4012002000060016";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.pinBlock = "32539F50C245A6A93D123412324000AA";

const track = new EBTTrackData();
track.value = "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?";
track.pinBlock = "32539F50C245A6A93D123412324000AA";
track.encryptionData = new EncryptionData();
track.encryptionData.version = "01";

ava.before((_t) => {
  ServicesContainer.configure(config);
});

test("ebt balance inquiry", async (t) => {
  t.plan(2);

  const response = await card.balanceInquiry().execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("ebt sale", async (t) => {
  t.plan(2);

  const response = await card.charge(10)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("ebt refund", async (t) => {
  t.plan(2);

  const response = await card.refund(10)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("ebt track balance inquiry", async (t) => {
  t.plan(2);

  const response = await track.balanceInquiry().execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("ebt track sale", async (t) => {
  t.plan(2);

  const response = await track.charge(11)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("ebt track refund", async (t) => {
  t.plan(2);

  const response = await track.refund(11)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("ebt refund fails from transaction id only", (t) => {
  t.plan(2);

  const error = t.throws(() => {
    Transaction.fromId("1234567890", PaymentMethodType.EBT).refund().execute();
  }, UnsupportedTransactionError);

  t.truthy(error.message);
});
