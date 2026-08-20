/**
 * Live-device unit tests for BatchList (ITerminalReport).
 *
 * Exercises findBatches() over live MITC and asserts every mapped field
 * on BatchList per UPA §12.4.12.5 (FindBatches).
 *
 * No mocks — this test only runs against a real device+gateway.
 */
import { IDeviceInterface } from "../../../../../src";
import { BatchList } from "../../../../../src/Terminals/UPA/Reponses/BatchList";
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

describeUpaLive("UPA Response – BatchList (all fields, live MITC)", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("findBatches() populates every IDeviceResponse + top-level field", async () => {
    let response = await findLiveBatches(device);

    if (response.batches.length === 0) {
      const sale = await createLiveSale(device);
      expectLiveSuccess(sale, "Sale");
      await settleDevice(5000);
      response = await findLiveBatches(device);
    }

    expect(response).toBeInstanceOf(BatchList);
    expect(response.command).toBe("AvailableBatches");
    expect(response.status).toBe("Success");
    expect(typeof response.deviceResponseText).toBe("string");
    expect(typeof response.referenceNumber).toBe("string");
    expect(typeof response.version).toBe("string");
    expect(typeof response.ecrId).toBe("string");
    expect(typeof response.deviceSerialNumber).toBe("string");
    expect(Array.isArray(response.batches)).toBe(true);
  });

  test("findBatches() batches are numeric and returned DESC per §12.4.12.5", async () => {
    let response = await findLiveBatches(device);

    if (response.batches.length === 0) {
      const sale = await createLiveSale(device);
      expectLiveSuccess(sale, "Sale");
      await settleDevice(5000);
      response = await findLiveBatches(device);
    }

    if (response.status !== "Success") {
      expect(["BATCH002", "APP011"]).toContain(response.deviceResponseCode);
      console.warn(
        `findBatches() returned ${response.deviceResponseCode}; DESC assertions skipped.`,
      );
      return;
    }

    for (const batchId of response.batches) {
      expect(typeof batchId).toBe("number");
      expect(Number.isFinite(batchId)).toBe(true);
    }

    if (response.batches.length >= 2) {
      const sortedDesc = [...response.batches].sort((a, b) => b - a);
      expect(response.batches).toEqual(sortedDesc);
    }
  });
});
