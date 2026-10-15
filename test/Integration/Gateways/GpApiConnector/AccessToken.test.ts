import {
  AccessTokenInfo,
  Channel,
  GatewayError,
  GpApiService,
  IntervalToExpire,
  Logger,
  SampleRequestLogger,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

const createLoggedConfig = () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));
  return config;
};

test("generate access token", async () => {
  const config = createLoggedConfig();
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);
  assertAccessTokenResponse(accessTokenInfo);
});

test("generate access token with permissions", async () => {
  const config = createLoggedConfig();
  config.permissions = [
    "PMT_POST_Create",
    "TRN_POST_Authorize",
    "DIS_POST_Accept",
    "TRN_GET_List_Funded",
    "RAS_POST_Create",
  ];
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);
  assertAccessTokenResponse(accessTokenInfo);
});

test("generate access token with limited permissions", async () => {
  const config = createLoggedConfig();
  config.permissions = ["PMT_POST_Create", "TRN_POST_Authorize"];
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);

  expect(accessTokenInfo).toBeTruthy();
  expect(accessTokenInfo.accessToken).toBeTruthy();
  expect(accessTokenInfo.tokenizationAccountName).toBe("tokenization");
  expect(["transaction_processing", "dcc_rate"]).toContain(
    accessTokenInfo.transactionProcessingAccountName,
  );
  expect(accessTokenInfo.dataAccountName).toBe("");
  expect(accessTokenInfo.disputeManagementAccountName).toBe("");
});

test("generate access token with wrong permissions", async () => {
  const config = createLoggedConfig();
  config.permissions = ["test_1", "test_2"];

  try {
    await GpApiService.generateTransactionKey(config);
  } catch (e) {
    const error = e as GatewayError;
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40119");
    expect(error?.message.includes("Invalid permissions")).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("generate access token with specific secondsToExpire", async () => {
  const config = createLoggedConfig();
  config.secondsToExpire = 200;
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);
  assertAccessTokenResponse(accessTokenInfo);
});

test("generate access token with specific intervalToExpire", async () => {
  const config = createLoggedConfig();
  config.intervalToExpire = IntervalToExpire.ONE_HOUR;
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);
  assertAccessTokenResponse(accessTokenInfo);
  expect(accessTokenInfo.intervalToExpire).toBe(IntervalToExpire.ONE_HOUR);
});

test("generate access token with specific expiredDate", async () => {
  const config = createLoggedConfig();
  config.secondsToExpire = 200;
  config.intervalToExpire = IntervalToExpire.WEEK;
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);
  assertAccessTokenResponse(accessTokenInfo);
});

test("generate access token with wrong appId", async () => {
  const config = createLoggedConfig();
  config.appId += "a";

  try {
    await GpApiService.generateTransactionKey(config);
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40004");
    expect(error?.message).toBe(
      "Status Code: ACTION_NOT_AUTHORIZED - App credentials not recognized",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("generate access token with wrong appKey", async () => {
  const config = createLoggedConfig();
  config.appKey += "a";

  try {
    await GpApiService.generateTransactionKey(config);
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40004");
    expect(error?.message).toBe(
      "Status Code: ACTION_NOT_AUTHORIZED - App credentials not recognized",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("generate access token with maximum secondsToExpire", async () => {
  const config = createLoggedConfig();
  config.secondsToExpire = 604801;

  try {
    await GpApiService.generateTransactionKey(config);
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40213");
    expect(error?.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - seconds_to_expire contains unexpected data",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("generate access token with invalid secondsToExpire", async () => {
  const config = createLoggedConfig();
  config.secondsToExpire = 10;

  try {
    await GpApiService.generateTransactionKey(config);
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40213");
    expect(error?.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - seconds_to_expire contains unexpected data",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("generate access token with restrictedToken", async () => {
  const config = createLoggedConfig();
  config.restrictedToken = "YES";
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);
  assertAccessTokenResponse(accessTokenInfo);
});

const assertAccessTokenResponse = (accessTokenInfo: AccessTokenInfo) => {
  expect(accessTokenInfo).toBeTruthy();
  expect(accessTokenInfo.accessToken).toBeTruthy();
  expect(accessTokenInfo.token).toBeTruthy();
  expect(accessTokenInfo.token).toBe(accessTokenInfo.accessToken);

  expect(accessTokenInfo.type).toBe("Bearer");
  expect(accessTokenInfo.appId).toBeTruthy();
  expect(accessTokenInfo.appName).toBeTruthy();
  expect(accessTokenInfo.timeCreated).toBeTruthy();
  expect(accessTokenInfo.secondsToExpire).toBeGreaterThan(0);
  expect(accessTokenInfo.email).toBeTruthy();
  expect(accessTokenInfo.merchantId).toBeTruthy();
  expect(accessTokenInfo.merchantName).toBeTruthy();
  expect(accessTokenInfo.accounts).toBeTruthy();
  expect(Array.isArray(accessTokenInfo.accounts)).toBe(true);

  expect(accessTokenInfo.dataAccountName).toBe("settlement_reporting");
  expect(accessTokenInfo.disputeManagementAccountName).toBe(
    "dispute_management",
  );
  expect(accessTokenInfo.tokenizationAccountName).toBe("tokenization");
  expect(["transaction_processing", "dcc_rate"]).toContain(
    accessTokenInfo.transactionProcessingAccountName,
  );
  expect(accessTokenInfo.transactionProcessingAccountID).toBeTruthy();
  expect(accessTokenInfo.tokenizationAccountID).toBeTruthy();
  expect(accessTokenInfo.riskAssessmentAccountID).toBeTruthy();
  expect(accessTokenInfo.disputeManagementAccountID).toBeTruthy();
  expect(accessTokenInfo.dataAccountID).toBeTruthy();
};
