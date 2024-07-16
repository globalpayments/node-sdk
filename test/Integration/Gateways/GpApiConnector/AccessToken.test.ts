import {
  AccessTokenInfo,
  Channel,
  GatewayError,
  GpApiService,
  IntervalToExpire,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

test("generate access token", async () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);
  assertAccessTokenResponse(accessTokenInfo);
});

test("generate access token with permissions", async () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
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
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.permissions = ["PMT_POST_Create", "TRN_POST_Authorize"];
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);

  expect(accessTokenInfo).toBeTruthy();
  expect(accessTokenInfo.accessToken).toBeTruthy();
  expect(accessTokenInfo.tokenizationAccountName).toBe("tokenization");
  expect(accessTokenInfo.transactionProcessingAccountName).toBe(
    "transaction_processing",
  );
  expect(accessTokenInfo.dataAccountName).toBe("");
  expect(accessTokenInfo.disputeManagementAccountName).toBe("");
});

test("generate access token with wrong permissions", async () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.permissions = ["test_1", "test_2"];

  try {
    await GpApiService.generateTransactionKey(config);
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40119");
    expect(error?.message.includes("Invalid permissions")).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("generate access token with specific secondsToExpire", async () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.secondsToExpire = 200;
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);
  assertAccessTokenResponse(accessTokenInfo);
});

test("generate access token with specific intervalToExpire", async () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.intervalToExpire = IntervalToExpire.ONE_HOUR;
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);
  assertAccessTokenResponse(accessTokenInfo);
});

test("generate access token with specific expiredDate", async () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.secondsToExpire = 200;
  config.intervalToExpire = IntervalToExpire.WEEK;
  const accessTokenInfo = await GpApiService.generateTransactionKey(config);
  assertAccessTokenResponse(accessTokenInfo);
});

test("generate access token with wrong appId", async () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
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
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.appKey += "a";

  try {
    await GpApiService.generateTransactionKey(config);
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40004");
    expect(error?.message).toBe(
      "Status Code: ACTION_NOT_AUTHORIZED - Credentials not recognized to create access token.",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("generate access token with maximum secondsToExpire", async () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
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
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
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

const assertAccessTokenResponse = (accessTokenInfo: AccessTokenInfo) => {
  expect(accessTokenInfo).toBeTruthy();
  expect(accessTokenInfo.accessToken).toBeTruthy();

  expect(accessTokenInfo.dataAccountName).toBe("settlement_reporting");
  expect(accessTokenInfo.disputeManagementAccountName).toBe(
    "dispute_management",
  );
  expect(accessTokenInfo.tokenizationAccountName).toBe("tokenization");
  expect(accessTokenInfo.transactionProcessingAccountName).toBe(
    "transaction_processing",
  );
  expect(accessTokenInfo.transactionProcessingAccountID).toBeTruthy();
  expect(accessTokenInfo.tokenizationAccountID).toBeTruthy();
  expect(accessTokenInfo.riskAssessmentAccountID).toBeTruthy();
  expect(accessTokenInfo.disputeManagementAccountID).toBeTruthy();
  expect(accessTokenInfo.dataAccountID).toBeTruthy();
};
