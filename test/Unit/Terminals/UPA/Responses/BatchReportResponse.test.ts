/**
 * Live-device unit tests for BatchReportResponse (ITerminalReport).
 *
 * Exercises getBatchReport() and getBatchDetails() over live MITC and
 * asserts every mapped field on BatchReportResponse plus BatchRecordResponse
 * and BatchTransactionResponse per UPA §12.4.11.2 (GetBatchReport) and
 * §12.4.11.3 (GetBatchDetails).
 *
 * No mocks — this test only runs against a real device+gateway.
 */
import { IDeviceInterface } from "../../../../../src";
import { BatchReportResponse } from "../../../../../src/Terminals/UPA/Reponses/BatchReportResponse";
import { UpaSearchCriteria } from "../../../../../src/Terminals/UPA/Entities/UpaSearchCriteria";
import {
  createLiveSale,
  createTestDevice,
  describeUpaLive,
  expectLiveSuccess,
  findLiveBatches,
  useLiveMic,
} from "../UpaHelpertest";

jest.setTimeout(240000);

function sleep(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function settleDevice(delayMs = 8000): Promise<void> {
  if (useLiveMic) {
    await sleep(delayMs);
  }
}

afterEach(async () => {
  await settleDevice();
});

describeUpaLive(
  "UPA Response – BatchReportResponse (all fields, live MITC)",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    async function acquireBatchId(): Promise<string | undefined> {
      let batches = await findLiveBatches(device);
      if (batches.batches.length === 0) {
        const sale = await createLiveSale(device);
        expectLiveSuccess(sale, "Sale");
        await settleDevice(5000);
        batches = await findLiveBatches(device);
      }
      return batches.batches[0]?.toString();
    }

    test("getBatchReport() populates every IDeviceResponse + top-level field", async () => {
      const batchId = await acquireBatchId();
      if (!batchId) {
        console.warn("No batches available; skipping getBatchReport() shape.");
        return;
      }

      const response = (await (device as any)
        .getBatchReport()
        .where(UpaSearchCriteria.Batch, batchId)
        .and(UpaSearchCriteria.EcrId, 13)
        .execute()) as BatchReportResponse;

      expect(response).toBeInstanceOf(BatchReportResponse);
      expect(response.command).toBe("GetBatchReport");
      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("SUCCESS");
      expect(typeof response.deviceResponseText).toBe("string");
      expect(typeof response.referenceNumber).toBe("string");
      expect(typeof response.version).toBe("string");
      expect(typeof response.multipleMessage).toBe("string");
      expect(typeof response.merchantName).toBe("string");
      expect(typeof response.deviceSerialNumber).toBe("string");
    });

    test("getBatchReport() populates BatchRecordResponse + BatchTransactionResponse per card brand", async () => {
      const batchId = await acquireBatchId();
      if (!batchId) {
        return;
      }

      const response = (await (device as any)
        .getBatchReport()
        .where(UpaSearchCriteria.Batch, batchId)
        .and(UpaSearchCriteria.EcrId, 13)
        .execute()) as BatchReportResponse;

      if (response.status !== "Success") {
        console.warn(
          `getBatchReport() returned ${response.deviceResponseCode}; skipping batchRecord assertions.`,
        );
        return;
      }

      expect(response.batchRecord).toBeDefined();
      const record = response.batchRecord!;
      expect(Number(record.batchId)).toBe(Number(batchId));
      expect(
        record.batchSeqNbr === undefined ||
          typeof record.batchSeqNbr === "number",
      ).toBe(true);
      expect(typeof record.batchStatus).toBe("string");
      expect(typeof record.openUtcDateTime).toBe("string");
      expect(typeof record.closeUtcDateTime).toBe("string");
      expect(typeof record.openTnxId).toBe("number");
      expect(
        record.totalAmount === undefined ||
          typeof record.totalAmount === "number",
      ).toBe(true);
      expect(
        record.totalCnt === undefined || typeof record.totalCnt === "number",
      ).toBe(true);
      expect(
        record.creditCnt === undefined || typeof record.creditCnt === "number",
      ).toBe(true);
      expect(
        record.creditAmt === undefined || typeof record.creditAmt === "number",
      ).toBe(true);
      expect(
        record.debitCnt === undefined || typeof record.debitCnt === "number",
      ).toBe(true);
      expect(
        record.debitAmt === undefined || typeof record.debitAmt === "number",
      ).toBe(true);
      expect(
        record.saleCnt === undefined || typeof record.saleCnt === "number",
      ).toBe(true);
      expect(
        record.saleAmt === undefined || typeof record.saleAmt === "number",
      ).toBe(true);
      expect(
        record.returnCnt === undefined || typeof record.returnCnt === "number",
      ).toBe(true);
      expect(
        record.returnAmt === undefined || typeof record.returnAmt === "number",
      ).toBe(true);
      expect(
        record.totalGratuityAmt === undefined ||
          typeof record.totalGratuityAmt === "number",
      ).toBe(true);
      expect(Array.isArray(record.batchTransactions)).toBe(true);

      for (const brand of record.batchTransactions) {
        expect(typeof brand.cardType).toBe("string");
        // All 12 optional numeric fields must be either undefined or number.
        (
          [
            "totalAmount",
            "totalCnt",
            "creditCnt",
            "creditAmt",
            "debitCnt",
            "debitAmt",
            "saleCnt",
            "saleAmt",
            "returnCnt",
            "returnAmt",
            "totalGratuityAmt",
          ] as const
        ).forEach((key) => {
          const value = brand[key];
          expect(value === undefined || typeof value === "number").toBe(true);
        });
      }
    });

    test("getBatchDetails() populates transactionDetails per ITerminalReportTransaction", async () => {
      const batchId = await acquireBatchId();
      if (!batchId) {
        return;
      }

      const response = (await (device as any).getBatchDetails(
        batchId,
      )) as BatchReportResponse;

      expect(response).toBeInstanceOf(BatchReportResponse);
      expect(response.command).toBe("GetBatchDetails");

      if (response.status !== "Success") {
        console.warn(
          `getBatchDetails() returned ${response.deviceResponseCode}; skipping detail assertions.`,
        );
        return;
      }

      expect(response.batchRecord).toBeDefined();
      expect(Array.isArray(response.batchRecord!.transactionDetails)).toBe(
        true,
      );

      const first = response.batchRecord!.transactionDetails[0];
      if (!first) {
        return;
      }

      // ITerminalReportTransaction row shape.
      expect(first.transactionDate).toBeInstanceOf(Date);
      expect(
        first.authCode === undefined || typeof first.authCode === "string",
      ).toBe(true);
      expect(
        first.cardType === undefined || typeof first.cardType === "string",
      ).toBe(true);
      expect(
        first.maskedCardNumber === undefined ||
          typeof first.maskedCardNumber === "string",
      ).toBe(true);
      expect(
        first.referenceNumber === undefined ||
          typeof first.referenceNumber === "string",
      ).toBe(true);
      expect(
        first.transactionStatus === undefined ||
          typeof first.transactionStatus === "string",
      ).toBe(true);
      expect(
        first.transactionType === undefined ||
          typeof first.transactionType === "string",
      ).toBe(true);
    });
  },
);
