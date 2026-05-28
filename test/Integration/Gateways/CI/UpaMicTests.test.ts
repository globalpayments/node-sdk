import {
  AccessTokenInfo,
  Channel,
  ConnectionConfig,
  DeviceType,
  GpApiConfig,
  IDeviceInterface,
} from "../../../../src";
import { DeviceService } from "../../../../src/Services/DeviceService";
import { ConnectionModes } from "../../../../src/Terminals/Enums";
import { CacheMode, CiTestingHarness } from "../../../Utils/CiTestingHarness";

const MITC_UPA_APP_ID = "6l8Xr23kHL9tGmAtXUvCEXKskvF7aLGq";
const MITC_UPA_APP_KEY = "z0ApiLDfXrKmrlNa";

const harness = new CiTestingHarness(
  "https://apis.sandbox.globalpay.com/ucp",
  CacheMode.Locked,
  "UpaMicTests",
);

const getGpApiConfig = () => {
  const config = new GpApiConfig();
  config.appId = MITC_UPA_APP_ID;
  config.appKey = MITC_UPA_APP_KEY;
  config.channel = Channel.CardPresent;
  config.country = "US";
  config.deviceCurrency = "USD";
  config.serviceUrl = harness.getTestingUrl();
  config.accessTokenInfo = new AccessTokenInfo();
  config.accessTokenInfo.transactionProcessingAccountName = "90916726";
  return config;
};

const createDevice = (testKey: string): IDeviceInterface => {
  const config = new ConnectionConfig();
  config.deviceType = DeviceType.UPA_DEVICE;
  config.connectionMode = ConnectionModes.MEET_IN_THE_CLOUD;
  config.timeout = 30000;
  config.gatewayConfig = getGpApiConfig();
  config.requestIdProvider = harness.createRequestIdProvider(testKey);
  return DeviceService.create(config);
};

test("CreditSale", async () => {
  const device = createDevice("CreditSale");
  const amount = harness.generateRandomAmount("CreditSale_amount", 1, 10, 2);

  const response = await device
    .sale(parseFloat(amount))
    .withEcrId(12)
    .execute();

  expect(response).toBeTruthy();
  expect(response.deviceResponseText).toBe("COMPLETE");
});

test("CreditSale_WithZeroTip", async () => {
  const device = createDevice("CreditSale_WithZeroTip");
  const amount = harness.generateRandomAmount(
    "CreditSale_WithZeroTip_amount",
    1,
    10,
    2,
  );

  const response = await device
    .sale(parseFloat(amount))
    .withEcrId(12)
    .withGratuity(0)
    .execute();

  expect(response).toBeTruthy();
  expect(response.deviceResponseText).toBe("COMPLETE");
});
