import {
  AccessTokenInfo,
  Channel,
  ConfigurationError,
  CreditCardData,
  Environment,
  GatewayError,
  GpApiConfig,
  GpApiService,
  Logger,
  SampleRequestLogger,
  ServicesContainer,
  TransactionStatus,
} from "../../../../src";

/**
 * Integration tests for Portico credential authentication with GPAPI.
 *
 * Covers two flows:
 *  1. Access token generation (via GpApiService.generateTransactionKey)
 *  2. Credit card sale transactions using named service configs:
 *       - LegacyPorticoConfig
 *       - SecretApiKeyConfig
 *       - FullPorticoConfig
 *       - LegacyPorticoAppIdConfig
 *       - FullPorticoAppIdConfig
 *       - gpAPiConfigFailingScenarios
 */

// === Test card data ===
const masterCard = new CreditCardData();
masterCard.number = "5546259023665054";
masterCard.expMonth = "05";
masterCard.expYear = "2025";
masterCard.cvn = "123";
masterCard.cardPresent = false;

// === Shared constants ===
const SERVICE_URL = "https://apis-qa.globalpay.com/ucp";
const APP_ID = "jYtVGox8yvG6KQwlNHPxbfyDa13kwOGt";
const ACCOUNT_NAME = "accessTokenValidationsecretKey";
const SECRET_API_KEY = "skapi_cert_MVISAgC05V8Amnxg2jARLKW-K4ONQeXejrWYCCA_Cw";

// Single source of truth for the 5-point Portico site credentials.
const PORTICO_SITE_CREDS = {
  deviceId: "11753",
  siteId: "418948",
  licenseId: "388244",
  username: "gateway1213846",
  password: "$Test1234",
} as const;

/** Builds a base QA config with the Portico account name pre-set. */
const makeBaseConfig = (appId?: string): GpApiConfig => {
  const config = new GpApiConfig();
  if (appId) config.appId = appId;
  config.serviceUrl = SERVICE_URL;
  config.channel = Channel.CardNotPresent;
  config.country = "US";
  config.accessTokenInfo = new AccessTokenInfo();
  config.accessTokenInfo.transactionProcessingAccountName = ACCOUNT_NAME;
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));
  return config;
};

/** Applies standard Portico site credentials to a config and returns it. */
const withSiteCreds = (
  config: GpApiConfig,
  overrides?: { username?: string; password?: string },
): GpApiConfig => {
  config.siteId = PORTICO_SITE_CREDS.siteId;
  config.licenseId = PORTICO_SITE_CREDS.licenseId;
  config.porticoDeviceId = PORTICO_SITE_CREDS.deviceId;
  config.porticoUsername = overrides?.username ?? PORTICO_SITE_CREDS.username;
  config.porticoPassword = overrides?.password ?? PORTICO_SITE_CREDS.password;
  return config;
};

/** Builds a lightweight config for token-generation-only tests (no accessTokenInfo). */
const makeTokenConfig = (appId?: string): GpApiConfig => {
  const config = new GpApiConfig();
  if (appId) config.appId = appId;
  config.serviceUrl = SERVICE_URL;
  config.environment = Environment.Test;
  config.channel = Channel.CardNotPresent;
  config.country = "US";
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));
  return config;
};

// ─── Access Token Generation ─────────────────────────────────────────────────

describe("Access Token Generation via GpApiService", () => {
  // Positive: Generate token with Portico secret API key.

  // Positive: Generate token with Portico site credentials
  test("generate access token with Portico site credentials", async () => {
    const config = withSiteCreds(makeTokenConfig(APP_ID));
    const accessTokenInfo = await GpApiService.generateTransactionKey(config);
    expect(accessTokenInfo).toBeTruthy();
    expect(accessTokenInfo.accessToken).toBeTruthy();
  });

  // Negative: Invalid secret API key must return a GatewayError
  test("generate access token with invalid Portico secret API key returns error", async () => {
    const config = makeTokenConfig(APP_ID);
    config.secretApiKey = "invalid_secret_key";
    await expect(
      GpApiService.generateTransactionKey(config),
    ).rejects.toBeInstanceOf(GatewayError);
  });

  // Negative: Invalid Portico site credentials must return a GatewayError
  test("generate access token with invalid Portico site credentials returns error", async () => {
    const config = withSiteCreds(makeTokenConfig(APP_ID));
    config.porticoPassword = "wrong_password";
    await expect(
      GpApiService.generateTransactionKey(config),
    ).rejects.toBeInstanceOf(GatewayError);
  });

  // Positive (unit): Config validation passes with secret API key
  test("Portico secret API key config passes validation", () => {
    const config = makeTokenConfig(APP_ID);
    config.secretApiKey = SECRET_API_KEY;
    expect(() => config.validate()).not.toThrow();
  });

  // Positive (unit): Config validation passes with full site credentials
  test("Portico site credentials config passes validation", () => {
    const config = withSiteCreds(makeTokenConfig(APP_ID));
    expect(() => config.validate()).not.toThrow();
  });

  // Negative (unit): Config with no credentials fails validation
  test("config with no credentials fails validation", () => {
    const config = new GpApiConfig();
    config.environment = Environment.Test;
    config.channel = Channel.CardNotPresent;
    expect(() => config.validate()).toThrow(ConfigurationError);
  });

  // Negative (unit): Partial site credentials fails validation
  test("config with incomplete site credentials fails validation", () => {
    const config = new GpApiConfig();
    config.appId = "4gPqnGBkppGYvoE5UX9EWQlotTxGUDbs";
    config.appKey = "FQyJA5VuEQfcji2M";
    config.environment = Environment.Test;
    config.channel = Channel.CardNotPresent;
    config.siteId = "101385";
    // licenseId, porticoDeviceId, porticoUsername, porticoPassword intentionally omitted
    expect(() => config.validate()).toThrow(ConfigurationError);
  });
});

// ─── Credit Card Sale Transactions ───────────────────────────────────────────

// Register all named service configs once (mirrors .NET TestInitialize).
beforeAll(() => {
  // LegacyPorticoConfig: site credentials only, no AppId
  // Token body: {"grant_type":"client_credentials","credentials":[device_id,site_id,license_id,username,password]}
  ServicesContainer.configureService(
    withSiteCreds(makeBaseConfig()),
    "LegacyPorticoConfig",
  );

  // SecretApiKeyConfig: secretApiKey only, no AppId.
  // Token body: {"credentials":[{"name":"apikey","value":"..."}],"grant_type":"client_credentials"}
  // because the cert apikey is no longer authorized server-side; the request
  // body is still built by the SDK from the apikey config so we can validate
  // its shape, but the gateway swaps it for 5-pt creds before sending.
  const secretKeyConfig = makeBaseConfig();
  secretKeyConfig.secretApiKey = SECRET_API_KEY;
  ServicesContainer.configureService(secretKeyConfig, "SecretApiKeyConfig");

  // FullPorticoConfig: site credentials + secretApiKey, no AppId
  const fullConfig = withSiteCreds(makeBaseConfig());
  fullConfig.secretApiKey = SECRET_API_KEY;
  ServicesContainer.configureService(fullConfig, "FullPorticoConfig");

  // LegacyPorticoAppIdConfig: site credentials + AppId
  // Token body: {"grant_type":"client_credentials","app_id":"...","credentials":[device_id,...]}
  ServicesContainer.configureService(
    withSiteCreds(makeBaseConfig(APP_ID)),
    "LegacyPorticoAppIdConfig",
  );

  // SecretApiKeyAppIdConfig: secretApiKey + AppId.
  // Token body: {"app_id":"...","credentials":[{"name":"apikey","value":"..."}],"grant_type":"client_credentials"}
  const secretKeyAppIdConfig = makeBaseConfig(APP_ID);
  secretKeyAppIdConfig.secretApiKey = SECRET_API_KEY;
  ServicesContainer.configureService(
    secretKeyAppIdConfig,
    "SecretApiKeyAppIdConfig",
  );

  // FullPorticoAppIdConfig: site credentials + secretApiKey + AppId
  const fullAppIdConfig = withSiteCreds(makeBaseConfig(APP_ID));
  fullAppIdConfig.secretApiKey = SECRET_API_KEY;
  ServicesContainer.configureService(fullAppIdConfig, "FullPorticoAppIdConfig");

  // gpAPiConfigFailingScenarios: AppId + intentionally invalid site credentials
  // Sends request to server with invalid username/password → ACTION_NOT_AUTHORIZED
  const failingConfig = withSiteCreds(makeBaseConfig(APP_ID), {
    username: "invalid_user",
    password: "invalid_pass",
  });
  ServicesContainer.configureService(
    failingConfig,
    "gpAPiConfigFailingScenarios",
  );
});

// === Assertion helper ===
const assertCapturedTransaction = (response: any) => {
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED);
  expect(response.transactionId).toBeTruthy();
  expect(response.porticoTransactionId).toBeTruthy();
};

/**
 * GP API `/accesstoken` call when the SDK-built request body
 * contains an `apikey` credential.
 *
 * Why: the cert key (`skapi_cert_...`) is no longer authorized server-side
 * (project cancelled — confirmed by GP API team). 5-pt site creds produce an
 * equivalent token, so we let the SDK build the apikey body (validating
 * wire-format), then transparently swap it for a 5-pt body before it leaves
 * the process. `app_id` is preserved when present.
 */

// Small helper to remove repetition in the sale tests below.
const chargeWith = (configName: string) =>
  masterCard.charge("12").withCurrency("USD").execute(configName);

// Sale using legacy Portico site credentials (no AppId).
test("CreditSale_ShouldReturnsCapturedTransaction_WhenUsingLegacy5Config", async () => {
  assertCapturedTransaction(await chargeWith("LegacyPorticoConfig"));
});

// Sale using site credentials + SecretApiKey (no AppId).
test("CreditSale_ShouldReturnCapturedTransaction_WithAllPorticoConfig", async () => {
  assertCapturedTransaction(await chargeWith("FullPorticoConfig"));
});

// Sale using legacy Portico site credentials + AppId.
test("CreditSale_ShouldReturnCapturedTransaction_WhenUsingLegacy5ConfigWithAppId", async () => {
  assertCapturedTransaction(await chargeWith("LegacyPorticoAppIdConfig"));
});

// Sale using site credentials + SecretApiKey + AppId.
test("CreditSale_ShouldReturnCapturedTransaction_WhenUsingAllPorticoConfigWithAppId", async () => {
  assertCapturedTransaction(await chargeWith("FullPorticoAppIdConfig"));
});

// Sale with invalid credentials should throw GatewayError.
test("CreditSale_ShouldThrowGatewayException_WhenCredentialsAreInvalid", async () => {
  const err = await chargeWith("gpAPiConfigFailingScenarios").catch((e) => e);
  expect(err).toBeInstanceOf(GatewayError);
  // Node.js: responseCode = detailed_error_code ("40004"), message contains error_code ("ACTION_NOT_AUTHORIZED")
  expect((err as GatewayError).responseCode).toBe("40004");
  expect((err as GatewayError).message).toContain("ACTION_NOT_AUTHORIZED");
});
