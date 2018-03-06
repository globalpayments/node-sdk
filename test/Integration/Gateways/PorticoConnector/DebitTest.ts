import ava from "ava";
import {
  DebitTrackData,
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

const track = new DebitTrackData();
// tslint:disable:max-line-length
track.value =
  "&lt;E1050711%B4012001000000016^VI TEST CREDIT^251200000000000000000000?|LO04K0WFOmdkDz0um+GwUkILL8ZZOP6Zc4rCpZ9+kg2T3JBT4AEOilWTI|+++++++Dbbn04ekG|11;4012001000000016=25120000000000000000?|1u2F/aEhbdoPixyAPGyIDv3gBfF|+++++++Dbbn04ekG|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|&gt;";
// tslint:enable:max-line-length
track.pinBlock = "32539F50C245A6A93D123412324000AA";
track.encryptionData = new EncryptionData();
track.encryptionData.version = "01";

ava.before((_t) => {
  ServicesContainer.configure(config);
});

test("debit sale", async (t) => {
  t.plan(2);

  const response = await track
    .charge(17.01)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test.failing("debit add value", async (t) => {
  t.plan(2);

  const response = await track
    .addValue(15.01)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("debit refund", async (t) => {
  t.plan(2);

  const response = await track
    .refund(16.01)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("debit reverse", async (t) => {
  t.plan(2);

  const response = await track
    .reverse(17.01)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("debit cannot refund from transaction id only", (t) => {
  t.plan(2);

  const error = t.throws(() => {
    Transaction.fromId("1234567890", PaymentMethodType.Debit)
      .refund()
      .withCurrency("USD")
      .execute();
  }, UnsupportedTransactionError);

  t.truthy(error.message);
});

test("debit cannot reverse from transaction id only", (t) => {
  t.plan(2);

  const error = t.throws(() => {
    Transaction.fromId("1234567890", PaymentMethodType.Debit)
      .reverse()
      .execute();
  }, UnsupportedTransactionError);

  t.truthy(error.message);
});
