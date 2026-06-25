import {
  AccessTokenInfo,
  Channel,
  ConnectionConfig,
  DeviceType,
  GpApiConfig,
  IDeviceInterface,
} from "../../../../../src";
import { DeviceService } from "../../../../../src/Services/DeviceService";
import { ConnectionModes } from "../../../../../src/Terminals/Enums";
import {
  CacheMode,
  CiTestingHarness,
} from "../../../../Utils/CiTestingHarness";

const MITC_UPA_APP_ID = "6l8Xr23kHL9tGmAtXUvCEXKskvF7aLGq";
const MITC_UPA_APP_KEY = "z0ApiLDfXrKmrlNa";
const harnessCacheMode = CacheMode.Locked;
const ciTestingHarness = new CiTestingHarness(
  "https://apis.sandbox.globalpay.com/ucp",
  harnessCacheMode,
  "UpaFunctionalityTests",
);

function getGpApiConfig(): GpApiConfig {
  const accessTokenInfo = new AccessTokenInfo();
  accessTokenInfo.transactionProcessingAccountName = "90916726";

  const gatewayConfig = new GpApiConfig();
  gatewayConfig.appId = MITC_UPA_APP_ID;
  gatewayConfig.appKey = MITC_UPA_APP_KEY;
  gatewayConfig.channel = Channel.CardPresent;
  gatewayConfig.country = "US";
  gatewayConfig.deviceCurrency = "USD";
  gatewayConfig.accessTokenInfo = accessTokenInfo;
  gatewayConfig.serviceUrl = ciTestingHarness.getTestingUrl();

  return gatewayConfig;
}

function createDevice(testKey: string): IDeviceInterface {
  const connectionConfig = new ConnectionConfig();
  connectionConfig.gatewayConfig = getGpApiConfig();
  connectionConfig.deviceType = DeviceType.UPA_DEVICE;
  connectionConfig.connectionMode = ConnectionModes.MEET_IN_THE_CLOUD;
  connectionConfig.timeout = 30000;
  connectionConfig.requestIdProvider =
    ciTestingHarness.createRequestIdProvider(testKey);

  const device = DeviceService.create(connectionConfig);
  device.ecrId = "12";
  ciTestingHarness.reset();
  return device;
}

function assertMitcUpaResponse(response: any): void {
  expect("SUCCESS").toContain(response.deviceResponseCode);
}

test("CreditSale", async () => {
  ciTestingHarness.setFunction("UPA|Functionality|Credit Sale");
  const device = createDevice("CreditSale");
  const amount = ciTestingHarness.generateRandomAmount(
    "CreditSale_amount",
    1,
    10,
    2,
  );

  const response = await device
    .sale(parseFloat(amount))
    .withEcrId(13)
    .execute();

  expect(response).toBeTruthy();
  assertMitcUpaResponse(response);
});

test("RefundAgainstCard", async () => {
  ciTestingHarness.setFunction("UPA|Functionality|Refund against Card");
  const device = createDevice("RefundAgainstCard");
  const amount = ciTestingHarness.generateRandomAmount(
    "RefundAgainstCard_amount",
    1,
    10,
    2,
  );

  const response = await device
    .refund(parseFloat(amount))
    .withEcrId(13)
    .execute();

  expect(response).toBeTruthy();
  assertMitcUpaResponse(response);
});

test("RefundAgainstTransactionId", async () => {
  ciTestingHarness.setFunction(
    "UPA|Functionality|Refund against Transaction ID",
  );
  const device = createDevice("RefundAgainstTransactionId");
  const amount = ciTestingHarness.generateRandomAmount(
    "RefundAgainstTransactionId_amount",
    1,
    10,
    2,
  );

  const saleResponse = await device
    .sale(parseFloat(amount))
    .withEcrId(13)
    .execute();

  expect(saleResponse).toBeTruthy();
  assertMitcUpaResponse(saleResponse);

  // @ts-ignore
  if (harnessCacheMode === CacheMode.Unlocked) {
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }

  const refundResponse = await device
    .refundById(parseFloat(amount))
    .withEcrId(13)
    .withTransactionId(saleResponse.transactionId)
    .execute();

  expect(refundResponse).toBeTruthy();
  assertMitcUpaResponse(refundResponse);
});
