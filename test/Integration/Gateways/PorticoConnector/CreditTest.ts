import test from "ava";
import {
  CreditCardData,
  CreditTrackData,
  EncryptionData,
  ReportingService,
  ServicesConfig,
  ServicesContainer,
  Transaction,
} from "../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2.heartlandportico.com";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

const track = new CreditTrackData();
// tslint:disable:max-line-length
track.value = "<E1050711%B4012001000000016^VI TEST CREDIT^251200000000000000000000?|LO04K0WFOmdkDz0um+GwUkILL8ZZOP6Zc4rCpZ9+kg2T3JBT4AEOilWTI|+++++++Dbbn04ekG|11;4012001000000016=25120000000000000000?|1u2F/aEhbdoPixyAPGyIDv3gBfF|+++++++Dbbn04ekG|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|>;";
// tslint:enable:max-line-length
track.encryptionData = new EncryptionData();
track.encryptionData.version = "01";

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
  t.is(authorization.responseCode, "00");

  const capture = await authorization.capture("16")
    .withGratuity("2.00")
    .execute();

  t.truthy(capture);
  t.is(capture.responseCode, "00");
});

test("credit auth with convenience", async (t) => {
  t.plan(4);

  const response = await card.authorize(14)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withConvenienceAmt(2)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const report = await ReportingService.transactionDetail(response.transactionId).execute();

  t.truthy(report);
  t.is(report.convenienceAmt, "2.00");
});

test("credit auth with shipping", async (t) => {
  t.plan(4);

  const response = await card.authorize(14)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withShippingAmt(2)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const report = await ReportingService.transactionDetail(response.transactionId).execute();

  t.truthy(report);
  t.is(report.shippingAmt, "2.00");
});

test("credit sale", async (t) => {
  t.plan(2);

  const response = await card.charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("credit sale with convenience", async (t) => {
  t.plan(4);

  const response = await card.charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withConvenienceAmt(2)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const report = await ReportingService.transactionDetail(response.transactionId).execute();

  t.truthy(report);
  t.is(report.convenienceAmt, "2.00");
});

test("credit sale with shipping", async (t) => {
  t.plan(4);

  const response = await card.charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withShippingAmt(2)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const report = await ReportingService.transactionDetail(response.transactionId).execute();

  t.truthy(report);
  t.is(report.shippingAmt, "2.00");
});

test("credit offline authorization", async (t) => {
  t.plan(2);

  const authorization = await card.authorize("16")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withOfflineAuthCode("123456")
    .execute();

  t.truthy(authorization);
  t.is(authorization.responseCode, "00");
});

test("credit offline auth with convenience", async (t) => {
  t.plan(4);

  const response = await card.authorize(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withConvenienceAmt(2)
    .withOfflineAuthCode("123456")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const report = await ReportingService.transactionDetail(response.transactionId).execute();

  t.truthy(report);
  t.is(report.convenienceAmt, "2.00");
});

test("credit offline auth with shipping", async (t) => {
  t.plan(4);

  const response = await card.authorize(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withShippingAmt(2)
    .withOfflineAuthCode("123456")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const report = await ReportingService.transactionDetail(response.transactionId).execute();

  t.truthy(report);
  t.is(report.shippingAmt, "2.00");
});

test("credit offline sale", async (t) => {
  t.plan(2);

  const response = await card.charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withOfflineAuthCode("123456")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("credit offline sale with convenience", async (t) => {
  t.plan(4);

  const response = await card.charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withConvenienceAmt(2)
    .withOfflineAuthCode("123456")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const report = await ReportingService.transactionDetail(response.transactionId).execute();

  t.truthy(report);
  t.is(report.convenienceAmt, "2.00");
});

test("credit offline sale with shipping", async (t) => {
  t.plan(4);

  const response = await card.charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withShippingAmt(2)
    .withOfflineAuthCode("123456")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");

  const report = await ReportingService.transactionDetail(response.transactionId).execute();

  t.truthy(report);
  t.is(report.shippingAmt, "2.00");
});

test("credit refund", async (t) => {
  t.plan(2);

  const response = await card.refund(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("credit reverse", async (t) => {
  t.plan(2);

  const response = await card.reverse(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("credit verify", async (t) => {
  t.plan(2);

  const response = await card.verify()
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("credit swipe authorization", async (t) => {
  t.plan(4);

  const authorization = await track.authorize("14")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(authorization);
  t.is(authorization.responseCode, "00");

  const capture = await authorization.capture("16")
    .withGratuity("2.00")
    .execute();

  t.truthy(capture);
  t.is(capture.responseCode, "00");
});

test("credit swipe sale", async (t) => {
  t.plan(2);

  const response = await track.charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("credit swipe offline authorization", async (t) => {
  t.plan(2);

  const authorization = await track.authorize("16")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withOfflineAuthCode("123456")
    .execute();

  t.truthy(authorization);
  t.is(authorization.responseCode, "00");
});

test("credit swipe offline sale", async (t) => {
  t.plan(2);

  const response = await track.charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withOfflineAuthCode("123456")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test.failing("credit swipe add value", async (t) => {
  t.plan(2);

  const response = await track.addValue(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit swipe balance inquiry", async (t) => {
  t.plan(2);

  const response = await track.balanceInquiry().execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit swipe refund", async (t) => {
  t.plan(2);

  const response = await track.refund(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit swipe reverse", async (t) => {
  t.plan(4);

  const sale = await track.charge(19)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(sale);
  t.is(sale.responseCode, "00");

  const response = await track.reverse(19)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("credit swipe verify", async (t) => {
  t.plan(2);

  const response = await track.verify()
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("credit void from transaction id", async (t) => {
  t.plan(4);

  const auth = await card.authorize(10)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(auth);
  t.is(auth.responseCode, "00");

  const voidResponse = await Transaction.fromId(auth.transactionId)
    .void()
    .execute();

  t.truthy(voidResponse);
  t.is(voidResponse.responseCode, "00");
});
