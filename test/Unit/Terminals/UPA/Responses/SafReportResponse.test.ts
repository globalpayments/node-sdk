/**
 * Live-device unit tests for SafReportResponse (ITerminalReport contract).
 *
 * Exercises getSAFReport() over live MITC and asserts every mapped field
 * on SafReportResponse plus SafReport / SafSummaryResponse / per-record
 * ITerminalReportTransaction shape per UPA §12.4.16 (GetSAFReport).
 *
 * No mocks — this test only runs against a real device+gateway.
 */
import { IDeviceInterface, SummaryType } from "../../../../../src";
import {
  ReportOutput,
  TerminalReportType,
} from "../../../../../src/Terminals/Enums";
import { SafReportResponse } from "../../../../../src/Terminals/UPA/Reponses/SafReportResponse";
import { UpaSearchCriteria } from "../../../../../src/Terminals/UPA/Entities/UpaSearchCriteria";
import { TerminalReportBuilder } from "../../../../../src/Terminals/Builders/TerminalReportBuilder";
import {
  createTestDevice,
  describeUpaLive,
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
  "UPA Response – SafReportResponse (all fields, live MITC)",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    test("getSAFReport() builder is TerminalReportBuilder<SafReportResponse>(GetSAFReport)", () => {
      const builder = (device as any).getSAFReport();
      expect(builder).toBeInstanceOf(TerminalReportBuilder);
      expect(builder.reportType).toBe(TerminalReportType.GetSAFReport);
    });

    test("getSAFReport() populates every IDeviceResponse + ITerminalReport field", async () => {
      const response = (await (device as any)
        .getSAFReport()
        .where(UpaSearchCriteria.EcrId, 13)
        .and(UpaSearchCriteria.ReportOutput, ReportOutput.ReturnData)
        .execute()) as SafReportResponse;

      expect(response).toBeInstanceOf(SafReportResponse);
      expect(response.command).toBe("GetSAFReport");
      expect(typeof response.status).toBe("string");
      expect(response.deviceResponseCode).toBe("SUCCESS");
      expect(typeof response.deviceResponseText).toBe("string");
      expect(typeof response.referenceNumber).toBe("string");
      expect(typeof response.version).toBe("string");
      expect(typeof response.ecrId).toBe("string");
      expect(typeof response.requestId).toBe("string");
      expect(typeof response.multipleMessage).toBe("string");
      expect(typeof response.reportType).toBe("string");
      expect(typeof response.reportOutput).toBe("string");
      expect(typeof response.deviceSerialNumber).toBe("string");
    });

    test("getSAFReport() populates reportResult buckets when SAF records exist", async () => {
      const response = (await (device as any)
        .getSAFReport()
        .where(UpaSearchCriteria.EcrId, 13)
        .and(UpaSearchCriteria.ReportOutput, ReportOutput.ReturnData)
        .execute()) as SafReportResponse;

      if (response.status !== "Success") {
        expect(["SAF001", "APP011"]).toContain(response.deviceResponseCode);
        console.warn(
          `getSAFReport() returned ${response.deviceResponseCode}: no SAF records. Bucket assertions skipped.`,
        );
        return;
      }

      expect(response.deviceResponseCode).toBe("SUCCESS");
      expect(response.reportResult).toBeDefined();
      expect(response.reportResult!.totalCount).toBeGreaterThanOrEqual(0);
      expect(response.reportResult!.totalAmount).toBeGreaterThanOrEqual(0);

      const allBuckets = [
        response.reportResult!.approved,
        response.reportResult!.pending,
        response.reportResult!.declined,
      ];

      for (const bucket of allBuckets) {
        if (!bucket) {
          continue;
        }
        for (const summary of Object.values(bucket)) {
          expect(
            [
              SummaryType.Approved,
              SummaryType.Pending,
              SummaryType.Declined,
              SummaryType.Unknown,
            ].includes(summary.summaryType),
          ).toBe(true);
          expect(typeof summary.count).toBe("number");
          expect(typeof summary.totalAmount).toBe("number");
          expect(Array.isArray(summary.transactions)).toBe(true);

          // ITerminalReportTransaction row-shape assertions on the first
          // record (if any) — non-null fields per §12.4.16.
          const first = summary.transactions[0];
          if (first) {
            expect(typeof first.transactionType).toBe("string");
            expect(
              first.transactionId === undefined ||
                typeof first.transactionId === "string",
            ).toBe(true);
            expect(
              first.referenceNumber === undefined ||
                typeof first.referenceNumber === "string",
            ).toBe(true);
            expect(
              first.cardType === undefined ||
                typeof first.cardType === "string",
            ).toBe(true);
            expect(
              first.maskedCardNumber === undefined ||
                typeof first.maskedCardNumber === "string",
            ).toBe(true);
          }
        }
      }
    });
  },
);
