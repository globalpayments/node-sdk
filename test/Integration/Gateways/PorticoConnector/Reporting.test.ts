import {
  PorticoConfig,
  ReportingService,
  ServicesContainer,
  Logger,
  SampleRequestLogger,
  CreditCardData,
} from "../../../../src";

const config = new PorticoConfig();

config.requestLogger = new SampleRequestLogger(new Logger("logs"));

beforeAll(() => {
  // config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
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

test("report batch detail for batchId", async () => {
  const randomID = Math.floor(Math.random() * (999999 - 10000)) + 10000;
  const clientTxnID = randomID.toString();
  const VisaManual = new CreditCardData();
  VisaManual.number = "4012002000060016";
  VisaManual.expMonth = "12";
  VisaManual.expYear = "2025";
  VisaManual.cvn = "123";

  const authResponse = await VisaManual.authorize(10)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withClientTransactionId(clientTxnID)
    .execute();
  expect(authResponse).toBeTruthy();
  expect(authResponse.responseCode).toBe("00");

  const captureResponse = await authResponse
    .capture(10)
    .withGratuity(2)
    .execute();

  expect(captureResponse).toBeTruthy();
  expect(captureResponse.responseCode).toBe("00");

  const batchId = "992515";
  const builder = ReportingService.batchDetail().withBatchId(batchId);

  const batchdetails = await builder.execute();
  //25195010000053410
  expect(batchdetails).toBeTruthy();

  const reportItem = batchdetails.find(
    (x: any) => x.clientTransactionId === clientTxnID,
  );
  expect(reportItem).toBeTruthy();
  expect(reportItem?.clientTransactionId).toBe(clientTxnID);
});

test("with startdate and with enddate populate search criteria", async () => {
  const start = new Date();
  start.setDate(start.getDate() - 7);
  const end = new Date(Date.now());
  const response = await ReportingService.findTransactions()
    .withStartDate(start)
    .withEndDate(end)
    .execute();

  expect(response).toBeTruthy();
});
