import {
  BuilderError,
  PorticoConfig,
  ReportingService,
  ServicesContainer,
} from "../../../../src";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";

beforeAll(() => {
  ServicesContainer.configureService(config);
});

test("report transaction details no transaction id", async () => {
  try {
    await ReportingService.transactionDetail("").execute();
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("transactionId cannot be empty")).toBe(
      true,
    );
  }
});

test("report transaction details with device id", async () => {
  try {
    await ReportingService.transactionDetail("1234567890")
      .withDeviceId("123456")
      .execute();
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("deviceId cannot be set")).toBe(true);
  }
});

test("report transaction details with start date", async () => {
  try {
    await ReportingService.transactionDetail("1234567890")
      .withStartDate(new Date())
      .execute();
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("startDate cannot be set")).toBe(true);
  }
});

test("report transaction details with end date", async () => {
  try {
    await ReportingService.transactionDetail("1234567890")
      .withEndDate(new Date())
      .execute();
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);

    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("endDate cannot be set")).toBe(true);
  }
});

test("report activity with transaction id", async () => {
  try {
    await ReportingService.activity().withTransactionId("1234567890").execute();
  } catch (error) {
    expect(error).toBeInstanceOf(BuilderError);
    expect(error?.name).toBe("BuilderError");
    expect(-1 !== error?.message.indexOf("transactionId cannot be set")).toBe(
      true,
    );
  }
});
