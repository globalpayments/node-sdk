import {
  AccessTokenInfo,
  Channel,
  CreditCardData,
  GpApiConfig,
  ServicesContainer,
  TransactionStatus,
} from "../../../../../src";
import {
  CacheMode,
  CiTestingHarness,
} from "../../../../Utils/CiTestingHarness";

const APP_ID = "4gPqnGBkppGYvoE5UX9EWQlotTxGUDbs";
const APP_KEY = "FQyJA5VuEQfcji2M";

const ciTestingHarness = new CiTestingHarness(
  "https://apis.sandbox.globalpay.com/ucp",
  CacheMode.Locked,
  "GpApiTransactionsTests",
);

const currentTime = ciTestingHarness.getCurrentTime();
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

function gpApiSetup(
  appId: string,
  appKey: string,
  channel: Channel,
): GpApiConfig {
  const config = new GpApiConfig();
  config.appId = appId;
  config.appKey = appKey;
  config.channel = channel;
  config.challengeNotificationUrl = "https://ensi808o85za.x.pipedream.net/";
  config.methodNotificationUrl = "https://ensi808o85za.x.pipedream.net/";
  config.merchantContactUrl = "https://enp4qhvjseljg.x.pipedream.net/";

  const accessTokenInfo = new AccessTokenInfo();
  accessTokenInfo.transactionProcessingAccountName = "transaction_processing";
  accessTokenInfo.riskAssessmentAccountName = "EOS_RiskAssessment";
  config.accessTokenInfo = accessTokenInfo;

  return config;
}

function configureGpApiService(): void {
  const config = gpApiSetup(APP_ID, APP_KEY, Channel.CardNotPresent);
  config.serviceUrl = ciTestingHarness.getTestingUrl();
  ServicesContainer.configureService(config);
  ciTestingHarness.reset();
}

function assertTransactionResponse(
  transaction: any,
  transactionStatus: string,
): void {
  expect(transaction).toBeTruthy();
  expect(["00", "SUCCESS"]).toContain(transaction.responseCode);
  expect(transaction.responseMessage).toBe(transactionStatus);
}

test("postCapture", async () => {
  ciTestingHarness.setFunction("GP-API|Transactions|POST Capture");
  configureGpApiService();

  const transaction = await card
    .authorize(amount)
    .withCurrency(currency)
    .withClientTransactionId(
      ciTestingHarness.generateRandomId("postCapture_auth"),
    )
    .execute();
  assertTransactionResponse(transaction, TransactionStatus.PREAUTHORIZED);

  const capture = await transaction
    .capture(amount)
    .withClientTransactionId(
      ciTestingHarness.generateRandomId("postCapture_capture"),
    )
    .execute();
  assertTransactionResponse(capture, TransactionStatus.CAPTURED);
});

test("postCharge", async () => {
  ciTestingHarness.setFunction("GP-API|Transactions|POST Create");
  configureGpApiService();

  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withClientTransactionId(ciTestingHarness.generateRandomId("postCreate"))
    .execute();
  assertTransactionResponse(transaction, TransactionStatus.CAPTURED);
});
