import test from "ava";
import {
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

test("report activity", (t) => {
  t.plan(2);

  const start = new Date(Date.now());
  start.setDate(start.getDate() - 7);
  const end = new Date(Date.now());

  return ReportingService.activity()
    .withStartDate(start)
    .withEndDate(end)
    .execute()
    .then((activity) => {
      t.truthy(activity);
      t.true(activity.length > 0);
    });
});

test("report transaction detail", (t) => {
  t.plan(3);

  const start = new Date(Date.now());
  start.setDate(start.getDate() - 7);
  const end = new Date(Date.now());

  return ReportingService.activity()
    .withStartDate(start)
    .withEndDate(end)
    .execute()
    .then((activity) => {
      t.truthy(activity);

      if (activity.length > 0) {
        return ReportingService.transactionDetail(activity[0].transactionId)
          .execute()
          .then((detail) => {
            t.truthy(detail);
            t.is(detail.gatewayResponseCode, "00");
          });
      }

      t.plan(1);
      return Promise.resolve();
    });
});
