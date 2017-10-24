import test from "ava";
import {
  ArgumentError,
  ReportingService,
  ServicesConfig,
  ServicesContainer,
} from "../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2.heartlandportico.com";

test.before((_t) => {
  ServicesContainer.configure(config);
});

test("report transaction details no transaction id", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return ReportingService.transactionDetail("")
      .execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("transactionId cannot be empty"));
});

test("report transaction details with device id", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return ReportingService.transactionDetail("1234567890")
      .withDeviceId("123456")
      .execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("deviceId cannot be set"));
});

test("report transaction details with start date", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return ReportingService.transactionDetail("1234567890")
      .withStartDate(new Date())
      .execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("startDate cannot be set"));
});

test("report transaction details with end date", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return ReportingService.transactionDetail("1234567890")
      .withEndDate(new Date())
      .execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("endDate cannot be set"));
});

test("report activity with transaction id", (t) => {
  t.plan(3);

  const error = t.throws(() => {
    return ReportingService.activity()
      .withTransactionId("1234567890")
      .execute();
  }, ArgumentError);

  t.is(error.name, "ArgumentError");
  t.true(-1 !== error.message.indexOf("transactionId cannot be set"));
});
