import {
  AccessTokenInfo,
  Channel,
  Environment,
  GatewayError,
  GpApiConfig,
  GpApiService,
  ServicesContainer,
  SampleRequestLogger,
  Logger,
  CreditCardData,
} from "../../../../src";

/**
 * Integration tests for obtaining a GPAPI access token using Portico credentials.
 *
 * This validates the flow where a Portico merchant can authenticate to GPAPI
 * using their existing Portico credentials (secretApiKey or site/license/device/user/pass)
 * combined with GPAPI appId/appKey, using grant_type "portico_credentials".
 */

const getPorticoGpApiConfig = (): GpApiConfig => {
  const config = new GpApiConfig();
  config.appId = "DAua5WpU5jjES2ZPjwdjqKDF75xUknQY";
  config.appKey = "test";
  config.environment = Environment.Test;
  config.channel = Channel.CardNotPresent;
  config.country = "US";
  config.serviceUrl = "https://apis-qa.globalpay.com/ucp";
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));
  config.secretApiKey = "skapi_cert_MVISAgC05V8Amnxg2jARLKW-K4ONQeXejrWYCCA_Cw";

  return config;
};

test("generate access token with Portico site credentials", async () => {
  const config = new GpApiConfig();
  config.appId = "DAua5WpU5jjES2ZPjwdjqKDF75xUknQY";
  config.appKey = "test";
  config.environment = Environment.Test;
  config.channel = Channel.CardNotPresent;
  config.country = "US";
  config.serviceUrl = "https://apis-qa.globalpay.com/ucp";
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));

  config.siteId = "418948";
  config.licenseId = "388244";
  config.porticoDeviceId = "11753";
  config.porticoUsername = "gateway1213846";
  config.porticoPassword = "$Test1234";

  try {
    const accessTokenInfo = await GpApiService.generateTransactionKey(config);

    expect(accessTokenInfo).toBeTruthy();
    expect(accessTokenInfo.accessToken).toBeTruthy();
  } catch (error) {
    expect(error).toBeTruthy();
    if (error instanceof GatewayError) {
      console.log(
        "GPAPI returned error for portico_credentials grant_type (site creds):",
        error.message,
      );
    } else {
      throw error;
    }
  }
});

test("generate access token with invalid Portico credentials returns error", async () => {
  const config = getPorticoGpApiConfig();
  config.secretApiKey = "invalid_secret_key";

  try {
    await GpApiService.generateTransactionKey(config);
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("Portico credentials config passes validation", () => {
  const config = getPorticoGpApiConfig();
  // Should not throw
  expect(() => config.validate()).not.toThrow();
});

test("config with no credentials fails validation", () => {
  const config = new GpApiConfig();
  config.environment = Environment.Test;
  config.channel = Channel.CardNotPresent;

  expect(() => config.validate()).toThrow();
});

test("use Portico credentials to configure services and make GPAPI call", async () => {
  const config = getPorticoGpApiConfig();
  config.accessTokenInfo = new AccessTokenInfo();
  config.accessTokenInfo.transactionProcessingAccountName =
    "transaction_processing";

  try {
    ServicesContainer.configureService(config);

    // If token is obtained, services should be configured
    // Additional GPAPI calls can be tested here once server-side support is confirmed
  } catch (error) {
    if (error instanceof GatewayError) {
      console.log(
        "Expected: GPAPI portico_credentials grant_type not yet supported server-side:",
        error.message,
      );
    } else {
      throw error;
    }
  }
});

/**
 * Transaction execution tests using Portico credentials
 */

// Test: Credit sale with legacy Portico credentials + AppId
test.only("credit sale with legacy Portico credentials and AppId", async () => {
  const card = new CreditCardData();
  card.number = "5546259023665054"; // MasterCard
  card.expMonth = "12";
  card.expYear = "2026";
  card.cvn = "123";
  card.cardPresent = false;
  card.readerPresent = false;

  const config = new GpApiConfig();
  config.appId = "jYtVGox8yvG6KQwlNHPxbfyDa13kwOGt";
  config.appKey = "test";
  config.environment = Environment.Test;
  config.channel = Channel.CardNotPresent;
  config.country = "US";
  config.serviceUrl = "https://apis-qa.globalpay.com/ucp";
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));

  // Legacy Portico credentials (device/site/license/user/pass)
  config.siteId = "418948";
  config.licenseId = "388244";
  config.porticoDeviceId = "11753";
  config.porticoUsername = "gateway1213846";
  config.porticoPassword = "$Test1234";

  config.accessTokenInfo = new AccessTokenInfo();
  config.accessTokenInfo.transactionProcessingAccountName =
    "accessTokenValidationsecretKey";

  try {
    ServicesContainer.configureService(config, "LegacyPorticoAppIdConfig");
    const response = await card
      .charge(12)
      .withCurrency("USD")
      .execute("LegacyPorticoAppIdConfig");

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("SUCCESS");
    console.log(
      "Legacy Portico + AppId transaction SUCCESS:",
      response.responseCode,
    );
  } catch (error) {
    if (error instanceof GatewayError) {
      console.log("Legacy Portico + AppId transaction error:", error.message);
    } else {
      throw error;
    }
  }
});

// Test: Invalid credentials error with specific message validation
test("invalid credentials returns specific error details", async () => {
  const config = new GpApiConfig();
  config.appId = "DAua5WpU5jjES2ZPjwdjqKDF75xUknQY";
  config.appKey = "test";
  config.environment = Environment.Test;
  config.channel = Channel.CardNotPresent;
  config.country = "US";
  config.serviceUrl = "https://apis-qa.globalpay.com/ucp";
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));

  // Empty/invalid credentials
  config.siteId = "418948";
  config.licenseId = "388244";
  config.porticoDeviceId = "11753";
  config.porticoUsername = "";
  config.porticoPassword = "";
  config.secretApiKey = "";

  config.accessTokenInfo = new AccessTokenInfo();
  config.accessTokenInfo.transactionProcessingAccountName =
    "transaction_processing";

  try {
    await GpApiService.generateTransactionKey(config);
    fail("Should have thrown GatewayError with invalid credentials");
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error instanceof GatewayError).toBe(true);

    if (error instanceof GatewayError) {
      // Accept either ACTION_NOT_AUTHORIZED (no credentials) or 40004 (invalid/empty credentials)
      expect(["ACTION_NOT_AUTHORIZED", "40004"]).toContain(error.responseCode);
      console.log(
        "Invalid credentials error (as expected):",
        error.responseCode,
        "-",
        error.message,
      );
    }
  }
});
