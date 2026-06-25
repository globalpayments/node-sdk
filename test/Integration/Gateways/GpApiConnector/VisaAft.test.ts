import {
  Channel,
  CreditCardData,
  GatewayError,
  Logger,
  SampleRequestLogger,
  ServicesContainer,
  TransactionStatus,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

const currency = "GBP";

const setupConfig = () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.country = "GB";
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));
  return config;
};

const buildCard = (): CreditCardData => {
  const date = new Date();
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  card.expYear = (date.getFullYear() + 1).toString();
  card.cvn = "131";
  card.cardHolderName = "James Mason";
  return card;
};

const aftFields = [
  "John Smith",
  "10 High Street",
  "Nottingham",
  "GBR",
  "02",
  "123456789",
];

beforeAll(() => {
  ServicesContainer.configureService(setupConfig());
});

beforeEach(() => {
  ServicesContainer.configureService(setupConfig());
});

afterAll(() => {
  BaseGpApiTestConfig.resetGpApiConfig();
});

// Story scenario (AH-2074):
// "Merchant in the UK does an authorize transaction with an AFT type.
//  Given I want to process an AFT, When I send a request with the supplementary
//  data, Then I get confirmation it was properly processed."
test("UK merchant - Visa AFT sale with supplementary data (story scenario)", async () => {
  const response = await buildCard()
    .charge(19.99)
    .withCurrency(currency)
    .withClientTransactionId("APM-20200417")
    .withSupplementaryData("VISA_DIRECT_AFT", [
      "Sender Name",
      "Sender Address",
      "Sender City",
      "Sender Country",
      "Account Number Type",
      "Recipient Account Number",
    ])
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED as string);
});

// GpApiVisaAftTest::testVisaAftSale
test("visa AFT sale", async () => {
  const response = await buildCard()
    .charge(42)
    .withCurrency(currency)
    .withSupplementaryData("VISA_DIRECT_AFT", aftFields)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED as string);
});

// GpApiVisaAftTest::testVisaAftInvalidType
test("visa AFT sale with invalid supplementary data type", async () => {
  const response = await buildCard()
    .charge(42)
    .withCurrency(currency)
    .withSupplementaryData("INVALID_TYPE", aftFields)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED as string);
});

// GpApiVisaAftTest::testVisaAftEmptyData
test("visa AFT sale with empty supplementary data fields", async () => {
  const response = await buildCard()
    .charge(42)
    .withCurrency(currency)
    .withSupplementaryData("VISA_DIRECT_AFT", [])
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED as string);
});

// GpApiVisaAftTest::testVisaAftNullSupplementaryData
test("visa AFT sale with null supplementary data fields", async () => {
  const response = await buildCard()
    .charge(42)
    .withCurrency(currency)
    .withSupplementaryData("VISA_DIRECT_AFT", null as unknown as string[])
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED as string);
});

// GpApiVisaAftTest::testVisaAftMissingCurrency
test("visa AFT sale without currency throws MANDATORY_DATA_MISSING", async () => {
  let caught = false;
  try {
    await buildCard()
      .charge(42)
      .withSupplementaryData("VISA_DIRECT_AFT", aftFields)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    caught = true;
    expect(error).toBeTruthy();
    expect(
      (error as Error)?.message.includes("MANDATORY_DATA_MISSING"),
    ).toBe(true);
    expect((error as Error)?.message.includes("currency")).toBe(true);
  }
  expect(caught).toBe(true);
});

// GpApiVisaAftTest::testVisaAftInvalidCurrency
test("visa AFT sale with invalid currency throws SYSTEM_ERROR", async () => {
  let caught = false;
  try {
    await buildCard()
      .charge(42)
      .withCurrency("XYZ")
      .withSupplementaryData("VISA_DIRECT_AFT", aftFields)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    caught = true;
    expect(error).toBeTruthy();
    expect((error as Error)?.message.includes("SYSTEM_ERROR")).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
  expect(caught).toBe(true);
});

// GpApiVisaAftTest::testVisaAftZeroAmount
// Note: GP-API sandbox returns INVALID_REQUEST_DATA (not MANDATORY_DATA_MISSING)
test("visa AFT sale with zero amount throws an amount error", async () => {
  let caught = false;
  try {
    await buildCard()
      .charge(0)
      .withCurrency(currency)
      .withSupplementaryData("VISA_DIRECT_AFT", aftFields)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    caught = true;
    expect(error).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
    expect(
      (error as Error)?.message.includes("INVALID_REQUEST_DATA"),
    ).toBe(true);
    expect((error as Error)?.message.toLowerCase().includes("amount")).toBe(
      true,
    );
  }
  expect(caught).toBe(true);
});
