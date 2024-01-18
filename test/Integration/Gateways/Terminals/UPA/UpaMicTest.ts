import test from "ava";
import {
  AccessTokenInfo,
  BuilderError,
  Channel,
  ConnectionConfig,
  DeviceType,
  GenerationUtils,
  IDeviceInterface,
} from "../../../../../src";
import { BaseGpApiTestConfig } from "../../../../../test/Data/BaseGpApiTestConfig";
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

test.before(() => {
  device = DeviceService.create(getConfig());
});

test("credit sale", async (t) => {
  const response = await device.sale(15).withEcrId(13).execute();

  t.truthy(response);
  t.is(response.responseText, "SUCCESS");
  t.is(response.deviceResponseText, "INITIATED");
});

test("credit sale with terminal ref number", async (t) => {
  const response = await device
    .sale(15)
    .withTerminalRefNumber(GenerationUtils.getGuuid())
    .execute();

  t.truthy(response);
  t.is(response.responseText, "SUCCESS");
  t.is(response.deviceResponseText, "INITIATED");
});

test("line item", async (t) => {
  const response = await device.lineItem("Line Item #1", "10.00");

  t.truthy(response);
  t.is(response.deviceResponseCode, "SUCCESS");
  t.is(response.deviceResponseText, "INITIATED");
});

test("credit auth", async (t) => {
  const response = await device
    .authorize(10)
    .withEcrId(13)
    .withTerminalRefNumber("1234")
    .execute();

  t.truthy(response);
  t.is(response.responseText, "SUCCESS");
  t.is(response.deviceResponseText, "INITIATED");
});

test("credit auth and capture", async (t) => {
  const response = await device
    .authorize(15)
    .withEcrId(13)
    .withTerminalRefNumber("1234")
    .execute();

  t.truthy(response);
  t.is(response.responseText, "SUCCESS");
  t.is(response.deviceResponseText, "INITIATED");

  const capture = await device
    .capture(15)
    .withTransactionId(response.transactionId)
    .execute();

  t.truthy(capture);
  t.is(capture.responseText, "SUCCESS");
  t.is(capture.deviceResponseText, "INITIATED");
});

test("credit capture randomId", async (t) => {
  const capture = await device
    .capture(15)
    .withTransactionId(GenerationUtils.getGuuid())
    .execute();

  t.truthy(capture);
  t.is(capture.responseText, "SUCCESS");
  t.is(capture.deviceResponseText, "INITIATED");
});

test("credit refund", async (t) => {
  const response = await device.sale(10).execute();

  t.truthy(response);
  t.is(response.responseText, "SUCCESS");
  t.is(response.deviceResponseText, "INITIATED");
  t.truthy(response.transactionId);

  const refund = await device
    .refundById(10)
    .withTransactionId(response.transactionId)
    .execute();

  t.truthy(refund);
  t.is(refund.responseText, "SUCCESS");
  t.is(refund.deviceResponseText, "INITIATED");
});

test("credit verify", async (t) => {
  const verify = await device.verify().execute();

  t.truthy(verify);
  t.is(verify.responseText, "SUCCESS");
  t.is(verify.deviceResponseText, "INITIATED");
});

test("credit void", async (t) => {
  const response = await device.sale(10).execute();

  t.truthy(response);
  t.is(response.responseText, "SUCCESS");
  t.is(response.deviceResponseText, "INITIATED");
  t.truthy(response.transactionId);

  const voided = await device
    .void()
    .withTransactionId(response.transactionId)
    .execute();

  t.truthy(voided);
  t.is(voided.responseText, "SUCCESS");
  t.is(voided.deviceResponseText, "INITIATED");
});

test("credit sale without amount", (t) => {
  const error = t.throws(() => device.sale().execute(), {
    instanceOf: BuilderError,
  });

  t.truthy(error);
  t.is(error?.message, "amount cannot be null for this transaction type.");
});

test("credit auth without amount", (t) => {
  const error = t.throws(() => device.authorize().execute(), {
    instanceOf: BuilderError,
  });

  t.truthy(error);
  t.is(error?.message, "amount cannot be null for this transaction type.");
});

test("credit capture without transactionId", (t) => {
  const error = t.throws(() => device.capture(10).execute(), {
    instanceOf: BuilderError,
  });

  t.truthy(error);
  t.is(
    error?.message,
    "transactionId cannot be null for this transaction type.",
  );
});

test("credit refund without amount", (t) => {
  const error = t.throws(() => device.refund().execute(), {
    instanceOf: BuilderError,
  });

  t.truthy(error);
  t.is(error?.message, "amount cannot be null for this transaction type.");
});
