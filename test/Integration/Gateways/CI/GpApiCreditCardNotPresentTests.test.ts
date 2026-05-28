import {
  AccessTokenInfo,
  Address,
  Channel,
  CreditCardData,
  GpApiConfig,
  ServicesContainer,
  TransactionStatus,
} from "../../../../src";
import { CacheMode, CiTestingHarness } from "../../../Utils/CiTestingHarness";

const harness = new CiTestingHarness(
  "https://apis.sandbox.globalpay.com/ucp",
  CacheMode.Locked,
  "GpApiCreditCardNotPresentTest",
);

const currentTime = harness.getCurrentTime();
const expMonth = (currentTime.getMonth() + 1).toString();
const expYear = (currentTime.getFullYear() + 1).toString();

const card = new CreditCardData();
card.number = "4263970000005262";
card.expMonth = expMonth;
card.expYear = expYear;
card.cvn = "123";
card.cardPresent = true;

const amount = "2.02";
const currency = "USD";

beforeAll(() => {
  const config = new GpApiConfig();
  config.appId = "4gPqnGBkppGYvoE5UX9EWQlotTxGUDbs";
  config.appKey = "FQyJA5VuEQfcji2M";
  config.channel = Channel.CardNotPresent;
  config.serviceUrl = harness.getTestingUrl();
  config.accessTokenInfo = new AccessTokenInfo();
  config.accessTokenInfo.transactionProcessingAccountName =
    "transaction_processing";
  ServicesContainer.configureService(config);
});

test("credit sale", async () => {
  const address = new Address();
  address.streetAddress1 = "123 Main St.";
  address.city = "Downtown";
  address.state = "NJ";
  address.postalCode = "12345";

  const response = await card
    .charge(amount)
    .withCurrency(currency)
    .withAddress(address)
    .withClientTransactionId(harness.generateRandomId("creditSale"))
    .execute();
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED);
});

test("credit authorization and capture", async () => {
  const transaction = await card
    .authorize("14")
    .withCurrency(currency)
    .withClientTransactionId(
      harness.generateRandomId("creditAuthorizationAndCapture_auth"),
    )
    .execute();
  expect(transaction).toBeTruthy();
  expect(transaction.responseCode).toBe("SUCCESS");
  expect(transaction.responseMessage).toBe(TransactionStatus.PREAUTHORIZED);

  const capture = await transaction
    .capture("16")
    .withGratuity("2")
    .withClientTransactionId(
      harness.generateRandomId("creditAuthorizationAndCapture_capture"),
    )
    .execute();
  expect(capture).toBeTruthy();
  expect(capture.responseCode).toBe("SUCCESS");
  expect(capture.responseMessage).toBe(TransactionStatus.CAPTURED);
});

test("credit verify", async () => {
  const response = await card
    .verify()
    .withCurrency(currency)
    .withClientTransactionId(harness.generateRandomId("creditVerify"))
    .execute();
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe("VERIFIED");
});

test("credit refund transaction", async () => {
  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withClientTransactionId(
      harness.generateRandomId("creditRefundTransaction_charge"),
    )
    .execute();
  expect(transaction).toBeTruthy();
  expect(transaction.responseCode).toBe("SUCCESS");
  expect(transaction.responseMessage).toBe(TransactionStatus.CAPTURED);

  const response = await transaction
    .refund(amount)
    .withCurrency(currency)
    .withClientTransactionId(
      harness.generateRandomId("creditRefundTransaction_refund"),
    )
    .execute();
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED);
});
