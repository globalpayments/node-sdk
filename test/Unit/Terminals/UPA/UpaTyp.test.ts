/**
 * Live integration tests for UPA TYP (Thank You Points) — AH-2327.
 *
 * Requires a UPA device configured for a Mexico merchant with a TYP loyalty
 * account, reachable via MITC (or update `buildConfig()`All TYP assertion blocks assume TYP is active and will
 * fail if the merchant is not TYP-configured.
 *
 * Run with serial workers to avoid hammering a single device:
 *   npx jest --testPathPattern="UpaTyp" --runInBand --no-coverage
 *
 * TODO(QA): set the real MITC `transactionProcessingAccountName` in
 * `buildConfig()` before running — the placeholder "test" will fail auth.
 */
import {
  AccessTokenInfo,
  BatchReportResponse,
  Channel,
  ConnectionConfig,
  DeviceType,
  Environment,
  GpApiConfig,
  IDeviceInterface,
  TransactionResponse,
} from "../../../../src";
import { DeviceService } from "../../../../src/Services/DeviceService";
import { ConnectionModes } from "../../../../src/Terminals/Enums";
import { UpaSearchCriteria } from "../../../../src/Terminals/UPA/Entities/UpaSearchCriteria";
import { UpaReportType } from "../../../../src/Terminals/UPA/Entities/UpaReportType";
import { UpaReportSubType } from "../../../../src/Terminals/UPA/Entities/UpaReportSubType";
import { Logger, SampleRequestLogger } from "../../../../src/Utils/Logging";

const TEST_ECR_ID = 13;
const BATCH_ID = 1006209;

let requestLogger: SampleRequestLogger;

function buildConfig(): ConnectionConfig {
  const config = new ConnectionConfig();
  config.deviceType = DeviceType.UPA_DEVICE;
  config.connectionMode = ConnectionModes.MEET_IN_THE_CLOUD;
  config.requestIdProvider = { getRequestId: () => 9999 } as any;
  requestLogger = new SampleRequestLogger(new Logger("logs"));
  config.requestLogger = requestLogger;
  const gpApiConfig = new GpApiConfig();
  gpApiConfig.appId = "bBuYWOG1HwU2ZCr9D8ijAcNPOWIGfpbY";
  gpApiConfig.appKey = "fCd7TqMtsb6jD6Rp";
  gpApiConfig.environment = Environment.Test;
  gpApiConfig.channel = Channel.CardPresent;
  gpApiConfig.country = "MX";
  gpApiConfig.deviceCurrency = "MXN";
  gpApiConfig.requestLogger = requestLogger;
  gpApiConfig.accessTokenInfo = {
    // TODO(QA): replace with the real MITC account name before running.
    transactionProcessingAccountName: "test",
  } as AccessTokenInfo;

  config.gatewayConfig = gpApiConfig;
  return config;
}

function randomInvoiceNumber(): string {
  return String(Math.floor(Math.random() * (9999999 - 1000000) + 1000000));
}

// ===========================================================================
describe("UpaTypTests", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = DeviceService.create(buildConfig());
    device.ecrId = String(TEST_ECR_ID);
  });

  // -------------------------------------------------------------------------
  // Sale with TYP and/or Discount
  // -------------------------------------------------------------------------
  describe("Sale with TYP and/or Discount", () => {
    test("Sale_WithTyp_ShouldReturnSuccess", async () => {
      const response = (await (device as any)
        .sale(100.0)
        .withEcrId(TEST_ECR_ID)
        .withClerkId(123)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();
      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");

      expect(response).toBeInstanceOf(TransactionResponse);

      // TYP redemption fields (hydrated from response.data.host)
      expect(response.redeemId).toBeDefined();
      expect(response.redeemStatus).toBeDefined();
      expect(response.redeemStatus?.toUpperCase()).toBe("COMPLETE");
      expect(response.currencyAmountRedeemed).toBeDefined();
      expect(response.pointsRedeemed).toBeDefined();
      expect(response.discountAmountRedeemed).toBeDefined();
    });

    test("Sale_WithTypAndInvoiceNumber_ShouldMapAllResponseFields", async () => {
      const response = (await (device as any)
        .sale(150.0)
        .withEcrId(TEST_ECR_ID)
        .withClerkId(456)
        .withInvoiceNumber(randomInvoiceNumber())
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();
      expect(response).toBeInstanceOf(TransactionResponse);

      expect(response.redeemId).toBeDefined();
      expect(response.redeemStatus).toBeDefined();
      expect(response.currencyAmountRedeemed).toBeDefined();
      expect(response.pointsRedeemed).toBeDefined();
      expect(response.discountAmountRedeemed).toBeDefined();
      expect(typeof response.redeemId).toBe("string");
      expect(typeof response.redeemStatus).toBe("string");
      expect(typeof response.currencyAmountRedeemed).toBe("number");
      expect(typeof response.pointsRedeemed).toBe("number");
      expect(typeof response.discountAmountRedeemed).toBe("number");
    });
  });

  // -------------------------------------------------------------------------
  // Void Sale with TYP and/or Discount
  // -------------------------------------------------------------------------
  describe("Void Sale with TYP and/or Discount", () => {
    test("Void_WithTyp_ByTerminalRefNumber_ShouldReturnSuccess", async () => {
      const saleResponse = (await (device as any)
        .sale(75.0)
        .withEcrId(TEST_ECR_ID)
        .withClerkId(789)
        .execute()) as TransactionResponse;

      expect(saleResponse.status).toBe("Success");

      const voidResponse = (await (device as any)
        .void()
        .withEcrId(TEST_ECR_ID)
        .withTransactionId(saleResponse.transactionId)
        .withTerminalRefNumber(saleResponse.terminalRefNumber)
        .execute()) as TransactionResponse;

      expect(voidResponse).not.toBeNull();
      expect(voidResponse.status).toBe("Success");

      expect(voidResponse).toBeInstanceOf(TransactionResponse);

      // TYP void fields
      expect(voidResponse.voidRedeemId).toBeDefined();
      expect(voidResponse.voidRedeemStatus).toBeDefined();
      expect(voidResponse.voidRedeemStatus?.toUpperCase()).toBe("COMPLETE");
      expect(voidResponse.voidCurrencyAmountRedeemed).toBeDefined();
      expect(voidResponse.voidPointsRedeemed).toBeDefined();
      expect(voidResponse.voidDiscountAmountRedeemed).toBeDefined();
    });

    test("Void_WithTyp_ByTransactionId_ShouldMapAllVoidResponseFields", async () => {
      const saleResponse = (await (device as any)
        .sale(50.0)
        .withEcrId(TEST_ECR_ID)
        .withClerkId(321)
        .execute()) as TransactionResponse;
      expect(saleResponse.status).toBe("Success");

      const voidResponse = (await (device as any)
        .void()
        .withEcrId(TEST_ECR_ID)
        .withTransactionId(saleResponse.transactionId)
        .execute()) as TransactionResponse;

      expect(voidResponse).not.toBeNull();
      expect(voidResponse).toBeInstanceOf(TransactionResponse);

      expect(voidResponse.voidRedeemId).toBeDefined();
      expect(voidResponse.voidRedeemStatus).toBeDefined();
      expect(voidResponse.voidCurrencyAmountRedeemed).toBeDefined();
      expect(voidResponse.voidPointsRedeemed).toBeDefined();
      expect(voidResponse.voidDiscountAmountRedeemed).toBeDefined();
      expect(typeof voidResponse.voidRedeemId).toBe("string");
      expect(typeof voidResponse.voidRedeemStatus).toBe("string");
      expect(typeof voidResponse.voidCurrencyAmountRedeemed).toBe("number");
      expect(typeof voidResponse.voidPointsRedeemed).toBe("number");
      expect(typeof voidResponse.voidDiscountAmountRedeemed).toBe("number");
    });
  });

  // -------------------------------------------------------------------------
  // Reverse Sale with TYP and/or Discount
  // -------------------------------------------------------------------------
  describe("Reverse Sale with TYP and/or Discount", () => {
    test("Reverse_WithTyp_ShouldReturnSuccess", async () => {
      const saleResponse = (await (device as any)
        .sale(120.0)
        .withEcrId(TEST_ECR_ID)
        .withClerkId(789)
        .execute()) as TransactionResponse;

      expect(saleResponse.status).toBe("Success");
      expect(saleResponse.terminalRefNumber).toBeTruthy();

      const reversalResponse = (await (device as any)
        .reverse()
        .withTerminalRefNumber(saleResponse.terminalRefNumber)
        .withEcrId(TEST_ECR_ID)
        .execute()) as TransactionResponse;

      expect(reversalResponse).not.toBeNull();
      expect(reversalResponse.status).toBe("Success");

      expect(reversalResponse).toBeInstanceOf(TransactionResponse);

      // TYP void/reverse fields
      expect(reversalResponse.voidRedeemId).toBeDefined();
      expect(reversalResponse.voidRedeemStatus).toBeDefined();
      expect(reversalResponse.voidRedeemStatus?.toUpperCase()).toBe("COMPLETE");
      expect(reversalResponse.voidCurrencyAmountRedeemed).toBeDefined();
      expect(reversalResponse.voidPointsRedeemed).toBeDefined();
      expect(reversalResponse.voidDiscountAmountRedeemed).toBeDefined();
    });
  });

  describe("Summary Reports with TYP", () => {
    test("GetBatchDetailsReport_WithTypSummary_ShouldReturnSuccess", async () => {
      const report = (await (device as any)
        .getBatchReport()
        .where(UpaSearchCriteria.Batch, BATCH_ID)
        .and(UpaSearchCriteria.EcrId, TEST_ECR_ID)
        .and(UpaSearchCriteria.ReportType, UpaReportType.Summary)
        .and(UpaSearchCriteria.ReportSubType, UpaReportSubType.ByReference)
        .execute()) as BatchReportResponse;

      expect(report).not.toBeNull();
      expect(report.status).toBe("Success");
    });

    test("GetBatchDetailsReport_WithTypSummaryAndClerkFilter_ShouldReturnSuccess", async () => {
      const clerkId = 123;

      const report = (await (device as any)
        .getBatchReport()
        .where(UpaSearchCriteria.Batch, BATCH_ID)
        .and(UpaSearchCriteria.EcrId, TEST_ECR_ID)
        .and(UpaSearchCriteria.ReportType, UpaReportType.Summary)
        .and(UpaSearchCriteria.ReportSubType, UpaReportSubType.ByClerk)
        .and(UpaSearchCriteria.ClerkId, clerkId)
        .execute()) as BatchReportResponse;

      expect(report).not.toBeNull();
      expect(report.status).toBe("Success");
    });

    test("GetBatchDetailsReport_WithTypBothReports_ShouldReturnSuccess", async () => {
      const report = (await (device as any)
        .getBatchReport()
        .where(UpaSearchCriteria.Batch, BATCH_ID)
        .and(UpaSearchCriteria.EcrId, TEST_ECR_ID)
        .and(UpaSearchCriteria.BothReports, true)
        .execute()) as BatchReportResponse;

      expect(report).not.toBeNull();
      expect(report.status).toBe("Success");
    });
  });

  // -------------------------------------------------------------------------
  // Detail Reports with TYP
  // -------------------------------------------------------------------------
  describe("Detail Reports with TYP", () => {
    test("GetBatchDetailsReport_WithTypDetail_ShouldReturnSuccess", async () => {
      const report = (await (device as any)
        .getBatchReport()
        .where(UpaSearchCriteria.Batch, BATCH_ID)
        .and(UpaSearchCriteria.EcrId, TEST_ECR_ID)
        .and(UpaSearchCriteria.ReportType, UpaReportType.Detail)
        .and(UpaSearchCriteria.ReportSubType, UpaReportSubType.ByReference)
        .execute()) as BatchReportResponse;

      expect(report).not.toBeNull();
      expect(report.status).toBe("Success");
    });

    test("GetBatchDetailsReport_WithTypDetailAndPreviousBatch_ShouldReturnSuccess", async () => {
      const report = (await (device as any)
        .getBatchReport()
        .where(UpaSearchCriteria.Batch, BATCH_ID)
        .and(UpaSearchCriteria.EcrId, TEST_ECR_ID)
        .and(UpaSearchCriteria.ReportType, UpaReportType.Detail)
        .and(UpaSearchCriteria.ReportSubType, UpaReportSubType.ByReference)
        .and(UpaSearchCriteria.PreviousBatchReport, true)
        .execute()) as BatchReportResponse;

      expect(report).not.toBeNull();
      expect(report.status).toBe("Success");
    });

    test("GetBatchDetailsReport_WithTypDetailAllClerks_ShouldReturnSuccess", async () => {
      const report = (await (device as any)
        .getBatchReport()
        .where(UpaSearchCriteria.Batch, BATCH_ID)
        .and(UpaSearchCriteria.EcrId, TEST_ECR_ID)
        .and(UpaSearchCriteria.ReportType, UpaReportType.Detail)
        .and(UpaSearchCriteria.ReportSubType, UpaReportSubType.ByAllClerks)
        .execute()) as BatchReportResponse;

      expect(report).not.toBeNull();
      expect(report.status).toBe("Success");
    });
  });

  describe("Negative test cases", () => {
    test("Reverse_WithInvalidTerminalRefNumber_ShouldThrowGatewayException", async () => {
      await expect(
        (device as any)
          .reverse()
          .withTerminalRefNumber("23")
          .withEcrId(12)
          .execute(),
      ).rejects.toThrow(/ERR011.*INVALID LENGTH/);
    });

    test("Void_WithoutRefNumber_ShouldThrowGatewayException", async () => {
      await expect(
        (device as any)
          .void()
          .withEcrId(TEST_ECR_ID)
          .withTransactionId("0")
          .execute(),
      ).rejects.toThrow(/VOID003.*NO TRANNO OR REFERENCENUMBER SUPPLIED/);
    });
  });
});
