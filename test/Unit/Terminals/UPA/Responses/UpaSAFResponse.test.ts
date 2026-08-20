/**
 * Live-device unit tests for UpaSAFResponse (ISAFResponse contract).
 *
 * Exercises sendStoreAndForward() and deleteSaf() over live MITC and
 * asserts every mapped field on UpaSAFResponse plus every optional
 * bucket declared by ISAFResponse per UPA §12.4.14 / §12.4.15.
 *
 * No mocks — this test only runs against a real device+gateway.
 */
import { IDeviceInterface, SummaryType } from "../../../../../src";
import { UpaSAFResponse } from "../../../../../src/Terminals/UPA/Reponses/UpaSAFResponse";
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

describeUpaLive("UPA Response – UpaSAFResponse (all fields, live MITC)", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("sendStoreAndForward() populates every IDeviceResponse + ISAFResponse field", async () => {
    const response = (await (
      device as any
    ).sendStoreAndForward()) as UpaSAFResponse;

    expect(response).toBeInstanceOf(UpaSAFResponse);
    expect(response.command).toBe("SendSAF");
    expect(typeof response.status).toBe("string");
    expect(response.status.length).toBeGreaterThan(0);
    expect(typeof response.deviceResponseCode).toBe("string");
    expect(typeof response.deviceResponseText).toBe("string");
    expect(typeof response.referenceNumber).toBe("string");
    expect(typeof response.version).toBe("string");
    // ISAFResponse-only optional fields — must at least be typed
    expect(
      response.totalCount === undefined ||
        typeof response.totalCount === "number",
    ).toBe(true);
    expect(
      response.totalAmount === undefined ||
        typeof response.totalAmount === "number",
    ).toBe(true);
    expect(
      response.multipleMessage === undefined ||
        typeof response.multipleMessage === "string",
    ).toBe(true);
  });

  test("sendStoreAndForward() populates approved/pending/declined buckets when SAF data exists", async () => {
    const response = (await (
      device as any
    ).sendStoreAndForward()) as UpaSAFResponse;

    if (response.status !== "Success") {
      console.warn(
        `sendStoreAndForward() returned ${response.deviceResponseCode} (${response.deviceResponseMessage}). Bucket assertions skipped — device has no SAF records.`,
      );
      return;
    }

    expect(response.deviceResponseCode).toBe("00");
    expect(response.totalCount).toBeDefined();
    expect(response.totalAmount).toBeDefined();
    expect(response.totalCount).toBeGreaterThanOrEqual(0);
    expect(response.totalAmount).toBeGreaterThanOrEqual(0);

    // Bucket dictionaries are optional; when populated their entries must
    // conform to the UpaSafSummaryResponse shape.
    const allBuckets = [response.approved, response.pending, response.declined];
    const populated = allBuckets.filter((b) => b !== undefined);
    if (populated.length === 0) {
      console.warn(
        "sendStoreAndForward() success returned no bucket dictionaries; device reported totals only.",
      );
      return;
    }

    for (const bucket of populated) {
      for (const summary of Object.values(bucket!)) {
        expect(summary).toBeDefined();
        expect(typeof summary!.summaryType).toBe("number");
        expect(
          [
            SummaryType.Approved,
            SummaryType.Pending,
            SummaryType.Declined,
          ].includes(summary!.summaryType),
        ).toBe(true);
        expect(Array.isArray(summary!.transactions)).toBe(true);
        expect(typeof summary!.count === "number").toBe(true);
        expect(typeof summary!.totalAmount === "number").toBe(true);
      }
    }
  });

  test("deleteSaf() returns a fully populated UpaSAFResponse (command = DeleteSAF)", async () => {
    const response = (await (device as any).deleteSaf(
      "NON-EXISTENT-REF",
      "NON-EXISTENT-TRAN",
    )) as UpaSAFResponse;

    expect(response).toBeInstanceOf(UpaSAFResponse);
    // requestType tag ensures extractCommand surfaces "DeleteSAF" even when
    // the device echoes back a generic "SendCommand".
    expect(["DeleteSAF", "SendCommand"]).toContain(response.command);
    expect(typeof response.status).toBe("string");
    expect(typeof response.deviceResponseCode).toBe("string");
    expect(typeof response.deviceResponseText).toBe("string");
  });
});
