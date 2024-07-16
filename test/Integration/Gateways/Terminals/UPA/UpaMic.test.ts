import {
  AccessTokenInfo,
  BuilderError,
  Channel,
  ConnectionConfig,
  DeviceType,
  GenerationUtils,
  IDeviceInterface,
} from "../../../../../src";
import { BaseGpApiTestConfig } from "../../../../Data/BaseGpApiTestConfig";
import { DeviceService } from "../../../../../src/Services/DeviceService";
import { ConnectionModes } from "../../../../../src/Terminals/Enums";
import { RequestIdProvider } from "../RequestIdProvider";

let device: IDeviceInterface;

const getConfig = () => {
  const config = new ConnectionConfig();
  config.deviceType = DeviceType.UPA_DEVICE;
  config.connectionMode = ConnectionModes.MEET_IN_THE_CLOUD;

  const gpApiConfig = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardPresent);
  gpApiConfig.country = "US";
  gpApiConfig.deviceCurrency = "USD";
  const accessTokenInfo = new AccessTokenInfo();
  accessTokenInfo.transactionProcessingAccountName = "transaction_processing";
  gpApiConfig.accessTokenInfo = accessTokenInfo;
  config.gatewayConfig = gpApiConfig;
  config.requestIdProvider = new RequestIdProvider();

  return config;
};

beforeAll(() => {
  device = DeviceService.create(getConfig());
});

test("credit sale", async () => {
  const response = await device.sale(15).withEcrId(13).execute();

  expect(response).toBeTruthy();
  expect(response.responseText).toBe("SUCCESS");
  expect(response.deviceResponseText).toBe("INITIATED");
});

test("credit sale with terminal ref number", async () => {
  const response = await device
    .sale(15)
    .withTerminalRefNumber(GenerationUtils.getGuuid())
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseText).toBe("SUCCESS");
  expect(response.deviceResponseText).toBe("INITIATED");
});

test("line item", async () => {
  const response = await device.lineItem("Line Item #1", "10.00");

  expect(response).toBeTruthy();
  expect(response.deviceResponseCode).toBe("SUCCESS");
  expect(response.deviceResponseText).toBe("INITIATED");
});

test("credit auth", async () => {
  const response = await device
    .authorize(10)
    .withEcrId(13)
    .withTerminalRefNumber("1234")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseText).toBe("SUCCESS");
  expect(response.deviceResponseText).toBe("INITIATED");
});

test("credit auth and capture", async () => {
  const response = await device
    .authorize(15)
    .withEcrId(13)
    .withTerminalRefNumber("1234")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseText).toBe("SUCCESS");
  expect(response.deviceResponseText).toBe("INITIATED");

  const capture = await device
    .capture(15)
    .withTransactionId(response.transactionId)
    .execute();

  expect(capture).toBeTruthy();
  expect(capture.responseText).toBe("SUCCESS");
  expect(capture.deviceResponseText).toBe("INITIATED");
});

test("credit capture randomId", async () => {
  const capture = await device
    .capture(15)
    .withTransactionId(GenerationUtils.getGuuid())
    .execute();

  expect(capture).toBeTruthy();
  expect(capture.responseText).toBe("SUCCESS");
  expect(capture.deviceResponseText).toBe("INITIATED");
});

test("credit refund", async () => {
  const response = await device.sale(10).execute();

  expect(response).toBeTruthy();
  expect(response.responseText).toBe("SUCCESS");
  expect(response.deviceResponseText).toBe("INITIATED");
  expect(response.transactionId).toBeTruthy();

  const refund = await device
    .refundById(10)
    .withTransactionId(response.transactionId)
    .execute();

  expect(refund).toBeTruthy();
  expect(refund.responseText).toBe("SUCCESS");
  expect(refund.deviceResponseText).toBe("INITIATED");
});

test("credit verify", async () => {
  const verify = await device.verify().execute();

  expect(verify).toBeTruthy();
  expect(verify.responseText).toBe("SUCCESS");
  expect(verify.deviceResponseText).toBe("INITIATED");
});

test("credit void", async () => {
  const response = await device.sale(10).execute();

  expect(response).toBeTruthy();
  expect(response.responseText).toBe("SUCCESS");
  expect(response.deviceResponseText).toBe("INITIATED");
  expect(response.transactionId).toBeTruthy();

  const voided = await device
    .void()
    .withTransactionId(response.transactionId)
    .execute();

  expect(voided).toBeTruthy();
  expect(voided.responseText).toBe("SUCCESS");
  expect(voided.deviceResponseText).toBe("INITIATED");
});

test("credit sale without amount", async () => {
  try {
    await expect(() => {
      device.sale().execute();
    }).rejects.toThrow(BuilderError);
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "amount cannot be null for this transaction type.",
    );
    expect(error).toBeInstanceOf(BuilderError);
  }
});

test("credit auth without amount", async () => {
  try {
    await expect(() => {
      device.authorize().execute();
    }).rejects.toThrow(BuilderError);
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "amount cannot be null for this transaction type.",
    );
    expect(error).toBeInstanceOf(BuilderError);
  }
});

test("credit capture without transactionId", async () => {
  try {
    await expect(() => {
      device.capture(10).execute();
    }).rejects.toThrow();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "transactionId cannot be null for this transaction type.",
    );
    expect(error).toBeInstanceOf(BuilderError);
  }
});

test("credit refund without amount", async () => {
  try {
    await expect(() => {
      device.refund().execute();
    }).rejects.toThrow();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "amount cannot be null for this transaction type.",
    );
    expect(error).toBeInstanceOf(BuilderError);
  }
});
