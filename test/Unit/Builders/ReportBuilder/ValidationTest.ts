import test from "ava";
import {
  BuilderError,
  PorticoConfig,
  ReportingService,
  ServicesContainer,
} from "../../../../src/";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";

test.before(() => {
  ServicesContainer.configureService(config);
});

test("report transaction details no transaction id", (t) => {
  t.plan(3);

  const error = t.throws(
    () => {
      return ReportingService.transactionDetail("").execute();
    },
    { instanceOf: BuilderError },
  );

  t.is(error?.name, "BuilderError");
  t.true(-1 !== error?.message.indexOf("transactionId cannot be empty"));
});

test("report transaction details with device id", async (t) => {
  t.plan(3);

  const error = await t.throws(
    () => {
      return ReportingService.transactionDetail("1234567890")
        .withDeviceId("123456")
        .execute();
    },
    { instanceOf: BuilderError },
  );

  t.is(error?.name, "BuilderError");
  t.true(-1 !== error?.message.indexOf("deviceId cannot be set"));
});

test("report transaction details with start date", async (t) => {
  t.plan(3);

  const error = await t.throws(
    () => {
      return ReportingService.transactionDetail("1234567890")
        .withStartDate(new Date())
        .execute();
    },
    { instanceOf: BuilderError },
  );

  t.is(error?.name, "BuilderError");
  t.true(-1 !== error?.message.indexOf("startDate cannot be set"));
});

test("report transaction details with end date", async (t) => {
  t.plan(3);

  const error = await t.throws(
    () => {
      return ReportingService.transactionDetail("1234567890")
        .withEndDate(new Date())
        .execute();
    },
    { instanceOf: BuilderError },
  );

  t.is(error?.name, "BuilderError");
  t.true(-1 !== error?.message.indexOf("endDate cannot be set"));
});

test("report activity with transaction id", async (t) => {
  t.plan(3);

  const error = await t.throws(
    () => {
      return ReportingService.activity()
        .withTransactionId("1234567890")
        .execute();
    },
    { instanceOf: BuilderError },
  );

  t.is(error?.name, "BuilderError");
  t.true(-1 !== error?.message.indexOf("transactionId cannot be set"));
});
