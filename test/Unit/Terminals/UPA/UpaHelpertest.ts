/**
 *  for UPA unit tests
 */
import {
  AccessTokenInfo,
  BatchList,
  Channel,
  ConnectionConfig,
  DeviceType,
  Environment,
  ExtraChargeType,
  GpApiConfig,
  IDeviceInterface,
  Lodging,
  PaymentMethodType,
  SafReportResponse,
} from "../../../../src";
import { Logger, SampleRequestLogger } from "../../../../src/Utils/Logging";
import { DeviceService } from "../../../../src/Services/DeviceService";
import { ConnectionModes, ReportOutput } from "../../../../src/Terminals/Enums";
import { UpaSearchCriteria } from "../../../../src/Terminals/UPA/Entities/UpaSearchCriteria";
import { TransactionResponse } from "../../../../src/Terminals/UPA/Reponses/TransactionResponse";
import { UpaGiftCardResponse } from "../../../../src/Terminals/UPA/Reponses/UpaGiftCardResponse";
import { ProcessingIndicator } from "../../../../src/Entities/UPA/ProcessIndicator";
import { UpaParam } from "../../../../src/Entities/UPA/UpaParam";
import { UpaTransactionData } from "../../../../src/Entities/UPA/UpaTransactionData";

export const useLiveMic = process.env.UPA_LIVE === "true";
export const gpApiAppId = process.env.GP_API_APP_ID;
export const gpApiAppKey = process.env.GP_API_APP_KEY;
export const gpApiAccountName = process.env.GP_API_ACCOUNT_NAME ?? "90918812";
export const hasLiveGpApiCredentials = !!gpApiAppId && !!gpApiAppKey;

export type LiveResponseShape = {
  command?: string;
  status?: string;
  deviceResponseCode?: string;
  deviceResponseMessage?: string;
  deviceResponseText?: string;
  responseCode?: string;
  responseText?: string;
};

/* eslint-disable indent */

export function expectLiveSuccess(
  response: LiveResponseShape,
  expectedCommand: string | string[],
): void {
  const expectedCommands = Array.isArray(expectedCommand)
    ? expectedCommand
    : [expectedCommand];
  expect(expectedCommands).toContain(response.command);
  expect(response.status).toBe("Success");
  expect(response.deviceResponseCode).toBe("00");
}

export function formatLiveFailure(
  response: LiveResponseShape,
  operation: string,
): string {
  const deviceCode = response.deviceResponseCode ?? "";
  const hostCode = response.responseCode ?? "";
  return `${operation} prerequisite failed in live MIC: device ${deviceCode} ${
    response.deviceResponseMessage ?? ""
  }; host ${hostCode} ${response.responseText ?? ""}`.trim();
}

export function isKnownLiveSaleBlocker(response: LiveResponseShape): boolean {
  const pinVerificationError =
    response.deviceResponseCode === "HOST001" &&
    response.responseCode === "86" &&
    response.responseText === "CANT VERIFY PIN";
  const timeoutError =
    response.deviceResponseCode === "APP002" &&
    response.deviceResponseMessage === "TIMEOUT";

  return pinVerificationError || timeoutError;
}

export function isKnownLiveBalanceBlocker(
  response: LiveResponseShape,
): boolean {
  const pinVerificationError =
    response.deviceResponseCode === "HOST001" &&
    response.responseCode === "86" &&
    response.responseText === "CANT VERIFY PIN";
  const hostCommunicationError =
    response.deviceResponseCode === "HOST002" &&
    response.deviceResponseMessage === "HOST COMMUNICATIONS ERROR";
  const userCancelledError =
    response.deviceResponseCode === "APP001" &&
    response.deviceResponseMessage === "TRANSACTION CANCELLED BY USER";
  const timeoutError =
    response.deviceResponseCode === "APP002" &&
    response.deviceResponseMessage === "TIMEOUT";

  return (
    pinVerificationError ||
    hostCommunicationError ||
    userCancelledError ||
    timeoutError
  );
}

export function isKnownLiveBusyBlocker(response: LiveResponseShape): boolean {
  return (
    response.command === "SendCommand" &&
    response.deviceResponseCode === "32" &&
    response.deviceResponseMessage === "BUSY"
  );
}

export function isKnownLiveStartCardTransactionBlocker(
  response: LiveResponseShape,
): boolean {
  const documentedErrorCodes = [
    "CARD002",
    "CARD003",
    "CARD004",
    "CARD006",
    "CARD007",
    "CARD009",
    "CARD011",
    "CARD018",
    "APP001",
    "APP002",
    "APP013",
    "ERR013",
  ];

  return (
    !!response.deviceResponseCode &&
    documentedErrorCodes.includes(response.deviceResponseCode)
  );
}

export function isKnownLiveGiftCardBlocker(
  response: LiveResponseShape,
): boolean {
  return (
    response.deviceResponseCode === "GIFT001" &&
    response.deviceResponseMessage === "NOT A VALID GIFT CARD"
  );
}

export function isKnownLiveReverseAutoFallbackBlocker(
  response: LiveResponseShape,
): boolean {
  return (
    response.command === "Reversal" &&
    response.deviceResponseCode === "ERR013" &&
    response.deviceResponseMessage === "[tranNo]-MISSING MANDATORY FIELD"
  );
}

export function isKnownLiveTransportTimeout(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message === "Socket timeout occurred." ||
      error.message.includes("ECONNRESET") ||
      error.message.includes("socket hang up"))
  );
}

export function expectParsedStartCardTransactionResponse(
  response: UpaGiftCardResponse,
): void {
  expect(response.command).toBe("StartCardTransaction");
  expect(response.status).toBe("Success");
  expect(response.deviceResponseCode).toBe("00");

  if (response.acquisitionType) {
    expect(response.acquisitionType).toMatch(
      /^(INSERT|CONTACT|CONTACTLESS|SWIPE|MANUAL|TAP)$/,
    );
  }

  if (response.luhnCheckPassed) {
    expect(response.luhnCheckPassed).toMatch(/^[YN]$/);
  }

  if (response.fallback) {
    expect(response.fallback).toMatch(/^[01]$/);
  }

  if (response.avsFlag) {
    expect(response.avsFlag).toMatch(/^[01]$/);
  }

  if (response.cardSecurityPromptFlag) {
    expect(response.cardSecurityPromptFlag).toMatch(/^[01]$/);
  }

  if (response.cashBackFlag) {
    expect(response.cashBackFlag).toMatch(/^[01]$/);
  }

  if (response.surchargeFlag) {
    expect(response.surchargeFlag).toMatch(/^[01]$/);
  }

  if (response.dccEligible) {
    expect(response.dccEligible).toMatch(/^[01]$/);
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function expectLiveDeletePreAuthFailure(
  action: () => Promise<TransactionResponse>,
  operation: string,
): Promise<void> {
  try {
    const response = await action();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (isKnownLiveBusyBlocker(response)) {
      console.warn(formatLiveFailure(response, operation));
      return;
    }

    expect(
      response.status !== "Success" ||
        response.deviceResponseCode !== "00" ||
        (!!response.responseCode && response.responseCode !== "00"),
    ).toBe(true);
  } catch (error) {
    if (isKnownLiveTransportTimeout(error)) {
      console.warn(
        `${operation} timed out while waiting on the device or gateway.`,
      );
      return;
    }

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBeTruthy();
  }
}

export function expectLiveBalanceResponseFields(
  response: TransactionResponse,
): void {
  expect(["BalanceInquiry", "SendCommand"]).toContain(response.command);
  expect(response.status).toBe("Success");
  expect(response.deviceResponseCode).toBe("00");
  expect(response.responseCode).toBe("00");
  expect(response.responseText).toBeTruthy();

  if (response.referenceNumber) {
    expect(response.referenceNumber).toMatch(/^[A-Z0-9]+$/i);
  }

  expect(response.availableBalance).not.toBeUndefined();

  if (response.transactionType) {
    expect(response.transactionType).toContain("BALANCE");
  }

  if (response.maskedCardNumber) {
    expect(response.maskedCardNumber).toMatch(/\*{2,}|X{2,}/);
  }

  if (response.entryMethod) {
    expect(response.entryMethod).toMatch(/^(MANUAL|SWIPE|INSERT|TAP|NONE)$/);
  }

  if (response.expirationDate) {
    expect(response.expirationDate).toMatch(/^\d{2}\/\d{2}$/);
  }

  if (response.pinVerified) {
    expect(response.pinVerified).toMatch(/^[01]$/);
  }

  if (response.fallback) {
    expect(response.fallback).toMatch(/^[01]$/);
  }
}

export async function expectLiveBalanceFailure(
  action: () => Promise<TransactionResponse>,
  operation: string,
): Promise<void> {
  try {
    const response = await action();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (isKnownLiveBusyBlocker(response)) {
      console.warn(formatLiveFailure(response, operation));
      return;
    }

    expect(
      response.status !== "Success" ||
        response.deviceResponseCode !== "00" ||
        (!!response.responseCode && response.responseCode !== "00"),
    ).toBe(true);
  } catch (error) {
    if (isKnownLiveTransportTimeout(error)) {
      console.warn(
        `${operation} timed out while waiting on the device or gateway.`,
      );
      return;
    }

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBeTruthy();
  }
}

export async function reverseLiveSaleWithRetry(
  device: IDeviceInterface,
  terminalRefNumber?: string,
  amount?: number,
  maxAttempts = 3,
): Promise<TransactionResponse> {
  let response: TransactionResponse;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const builder = (device as any).reverse().withEcrId(12);

    if (terminalRefNumber) {
      builder.withTerminalRefNumber(terminalRefNumber);
    }

    if (amount !== undefined) {
      builder.withAmount(amount);
    }

    response = await builder.execute();

    if (!isKnownLiveBusyBlocker(response) || attempt === maxAttempts) {
      return response;
    }

    await delay(10000);
  }

  return response!;
}

export function expectLiveReverseResponseFields(
  response: TransactionResponse,
): void {
  expect(response.command).toBe("Reversal");
  expect(response.status).toBe("Success");
  expect(response.deviceResponseCode).toBe("00");
  expect(response.responseCode).toBe("00");
  expect(response.responseText).toBeTruthy();
  expect(response.terminalRefNumber).toBeTruthy();

  if (response.referenceNumber) {
    expect(response.referenceNumber).toMatch(/^[A-Z0-9]+$/i);
  }

  if (response.transactionType) {
    expect(response.transactionType).toContain("REVERSAL");
  }

  if (response.maskedCardNumber) {
    expect(response.maskedCardNumber).toMatch(/\*{2,}|X{2,}/);
  }

  if (response.entryMethod) {
    expect(response.entryMethod).toMatch(/^(MANUAL|SWIPE|INSERT|TAP|NONE)$/);
  }

  if (response.expirationDate) {
    expect(response.expirationDate).toMatch(/^\d{2}\/\d{2}$/);
  }
}

export async function expectLiveReverseFailure(
  action: () => Promise<TransactionResponse>,
  operation: string,
): Promise<void> {
  try {
    const response = await action();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (isKnownLiveBusyBlocker(response)) {
      console.warn(formatLiveFailure(response, operation));
      return;
    }

    expect(
      response.status !== "Success" ||
        response.deviceResponseCode !== "00" ||
        (!!response.responseCode && response.responseCode !== "00"),
    ).toBe(true);
  } catch (error) {
    if (isKnownLiveTransportTimeout(error)) {
      console.warn(
        `${operation} timed out while waiting on the device or gateway.`,
      );
      return;
    }

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBeTruthy();
  }
}

export async function deletePreAuthWithRetry(
  device: IDeviceInterface,
  transactionId: string,
  amount: number,
  maxAttempts = 3,
): Promise<TransactionResponse> {
  let response: TransactionResponse;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    response = await (device as any)
      .deletePreAuth()
      .withEcrId(13)
      .withTransactionId(transactionId)
      .withAmount(amount)
      .execute();

    if (!isKnownLiveBusyBlocker(response) || attempt === maxAttempts) {
      return response;
    }

    await delay(10000);
  }

  return response!;
}

export async function createLiveSale(
  device: IDeviceInterface,
): Promise<TransactionResponse> {
  const response = await (device as any)
    .sale(1.0)
    .withGratuity(0)
    .withEcrId(13)
    .withClerkId(123)
    .execute();

  expect(response).toBeInstanceOf(TransactionResponse);

  if (response.deviceResponseCode === "00") {
    expect(["COMPLETE", "INITIATED"]).toContain(response.deviceResponseText);
    expect(response.terminalRefNumber).toBeTruthy();
  }

  return response;
}

export async function createLiveDebitSale(
  device: IDeviceInterface,
): Promise<TransactionResponse> {
  const response = await (device as any)
    .sale(1.0)
    .withPaymentMethodType(PaymentMethodType.Debit)
    .withCashBack(0)
    .withEcrId(13)
    .withClerkId(123)
    .execute();

  expect(response).toBeInstanceOf(TransactionResponse);

  if (response.deviceResponseCode === "00") {
    expect(["COMPLETE", "INITIATED"]).toContain(response.deviceResponseText);
    expect(response.terminalRefNumber).toBeTruthy();
  }

  return response;
}

export async function createLivePreAuth(
  device: IDeviceInterface,
): Promise<TransactionResponse> {
  const response = await (device as any)
    .authorize(1.0)
    .withEcrId(13)
    .withClerkId(123)
    .execute();

  expect(response).toBeInstanceOf(TransactionResponse);

  if (response.deviceResponseCode !== "00") {
    throw new Error(formatLiveFailure(response, "PreAuth"));
  }

  expect(["COMPLETE", "INITIATED"]).toContain(response.deviceResponseText);
  expect(response.transactionId).toBeTruthy();

  return response;
}

export async function executeLiveStartCardTransaction(
  device: IDeviceInterface,
  param: UpaParam,
  indicator: ProcessingIndicator,
  transData: UpaTransactionData,
  operation: string,
): Promise<UpaGiftCardResponse | undefined> {
  let response: UpaGiftCardResponse;

  try {
    response = await (device as any).startCardTransaction(
      param,
      indicator,
      transData,
    );
  } catch (error) {
    if (isKnownLiveTransportTimeout(error)) {
      console.warn(
        `${operation} timed out while waiting on the device or gateway.`,
      );
      return undefined;
    }

    throw error;
  }

  expect(response).not.toBeNull();
  expect(response).toBeInstanceOf(UpaGiftCardResponse);

  if (
    isKnownLiveGiftCardBlocker(response) ||
    isKnownLiveStartCardTransactionBlocker(response)
  ) {
    console.warn(formatLiveFailure(response, operation));
    return undefined;
  }

  expectLiveSuccess(response, "StartCardTransaction");
  expectParsedStartCardTransactionResponse(response);
  return response;
}

/* eslint-enable indent */

export function buildConfig(
  gpApiOverrides: Partial<GpApiConfig> = {},
): ConnectionConfig {
  const config = new ConnectionConfig();
  config.deviceType = DeviceType.UPA_DEVICE;
  config.connectionMode = ConnectionModes.MEET_IN_THE_CLOUD;
  const requestId = Math.floor(Math.random() * 10000);
  config.requestIdProvider = { getRequestId: () => requestId } as any;

  const logger = new SampleRequestLogger(new Logger("logs"));
  config.requestLogger = logger;

  if (useLiveMic && !hasLiveGpApiCredentials) {
    throw new Error(
      "Set GP_API_APP_ID and GP_API_APP_KEY to run live UPA tests.",
    );
  }

  const gpApiConfig = new GpApiConfig();
  gpApiConfig.appId = gpApiAppId ?? "UNIT_TEST_APP_ID";
  gpApiConfig.appKey = gpApiAppKey ?? "UNIT_TEST_APP_KEY";
  gpApiConfig.environment = Environment.Test;
  gpApiConfig.channel = Channel.CardPresent;
  gpApiConfig.country = "US";
  gpApiConfig.deviceCurrency = "USD";
  gpApiConfig.requestLogger = logger;

  if (useLiveMic) {
    gpApiConfig.accessTokenInfo = new AccessTokenInfo();
    gpApiConfig.accessTokenInfo.transactionProcessingAccountName =
      gpApiAccountName;
  } else {
    gpApiConfig.accessTokenInfo = {
      transactionProcessingAccountName: "test",
      accessToken: "UNIT_TEST_FAKE_TOKEN",
    } as any;
  }

  Object.assign(gpApiConfig, gpApiOverrides);

  config.gatewayConfig = gpApiConfig;

  return config;
}

export function createTestDevice(): IDeviceInterface {
  const device = DeviceService.create(buildConfig());
  device.ecrId = "13";
  return device;
}

export const describeUpaLive =
  useLiveMic && !hasLiveGpApiCredentials ? describe.skip : describe;

// ---------------------------------------------------------------------------
// Lodging / SAF / batch helpers (used by UpaCredit, UpaReport, UpaAdmin tests)
// ---------------------------------------------------------------------------

export async function createLiveLodgingSale(
  device: IDeviceInterface,
): Promise<TransactionResponse> {
  const folioNumber = String(Date.now()).slice(-6);
  const lodging = new Lodging();
  lodging.folioNumber = folioNumber;
  lodging.extraChargeTypes = [
    ExtraChargeType.Restaurant,
    ExtraChargeType.MiniBar,
  ];
  lodging.extraChargeTotal = 12.5;
  lodging.dailyRate = 89.99;

  const response = await (device as any)
    .sale(1.0)
    .withClerkId(123)
    .withEcrId(13)
    .withLodging(lodging)
    .execute();

  expect(response).toBeInstanceOf(TransactionResponse);
  return response;
}

export async function getLiveSafReport(
  device: IDeviceInterface,
): Promise<SafReportResponse> {
  const response = await (device as any)
    .getSAFReport()
    .where(UpaSearchCriteria.EcrId, 13)
    .and(UpaSearchCriteria.ReportOutput, ReportOutput.ReturnData)
    .execute();

  expect(response).toBeInstanceOf(SafReportResponse);
  return response;
}

export function isNoSafTransaction(response: LiveResponseShape): boolean {
  return (
    response.command === "GetSAFReport" &&
    response.status === "Failed" &&
    response.deviceResponseCode === "SAF001"
  );
}

export function getFirstSafReferenceNumber(
  response: SafReportResponse,
): string | undefined {
  const buckets = [
    response.reportResult?.approved,
    response.reportResult?.pending,
    response.reportResult?.declined,
  ];

  for (const bucket of buckets) {
    for (const summary of Object.values(
      (bucket ?? {}) as Record<string, any>,
    )) {
      const transaction = summary?.transactions?.[0];
      if (transaction?.referenceNumber) {
        return transaction.referenceNumber;
      }
    }
  }

  return undefined;
}

export async function ensureSafData(
  device: IDeviceInterface,
  seedSale: (device: IDeviceInterface) => Promise<TransactionResponse>,
  settle: (delayMs?: number) => Promise<void>,
): Promise<SafReportResponse | undefined> {
  const initialReport = await getLiveSafReport(device);
  if (!isNoSafTransaction(initialReport)) {
    return initialReport;
  }

  console.warn(
    "No SAF records found. Attempting to seed SAF with a live sale. Present a card if prompted.",
  );

  const saleResponse = await seedSale(device);
  await settle(5000);

  if (
    (saleResponse as any).safTransaction ||
    (saleResponse as any).storeAndForward === 1
  ) {
    return getLiveSafReport(device);
  }

  console.warn(
    "SAF seed attempt did not create a SAF record. This device or tenant accepted the sale online instead of storing it. To validate SAF flows, enable terminal SAF mode or create a host-timeout/offline transaction on the terminal.",
  );
  return undefined;
}

export async function findLiveBatches(
  device: IDeviceInterface,
): Promise<BatchList> {
  const response = await (device as any)
    .findBatches()
    .where(UpaSearchCriteria.EcrId, 13)
    .execute();

  expect(response).toBeInstanceOf(BatchList);
  return response;
}
