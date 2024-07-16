import {
  PorticoConfig,
  ReportingService,
  ServicesContainer,
} from "../../../../src";

const config = new PorticoConfig();

beforeAll(() => {
  config.secretApiKey = "skapi_cert_MXDMBQDwa3IAA4GV7NGMqQA_wFR3_TNeamFWoNUu_Q";
  ServicesContainer.configureService(config);
});

test("report activity", () => {
  const start = new Date(Date.now());
  start.setDate(start.getDate() - 7);
  const end = new Date(Date.now());

  return ReportingService.activity()
    .withStartDate(start)
    .withEndDate(end)
    .execute()
    .then((activity) => {
      expect(activity).toBeTruthy();
      expect(activity.length > 0).toBe(true);
    });
});

test("report transaction detail", () => {
  const start = new Date(Date.now());
  start.setDate(start.getDate() - 7);
  const end = new Date(Date.now());

  return ReportingService.activity()
    .withStartDate(start)
    .withEndDate(end)
    .execute()
    .then((activity) => {
      expect(activity).toBeTruthy();

      if (activity.length > 0) {
        return ReportingService.transactionDetail(activity[0].transactionId)
          .execute()
          .then((detail) => {
            expect(detail).toBeTruthy();
            expect(detail.gatewayResponseCode).toBe("00");
          });
      }

      expect.assertions(1);
      return Promise.resolve();
    });
});
