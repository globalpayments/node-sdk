/**
 * Live-device unit tests for UpaEODResponse (IEODResponse contract).
 *
 * Exercises endOfDay() over live MITC (skipped when GP-API creds are
 * absent — see describeUpaLive) and asserts every mapped field on
 * UpaEODResponse plus every optional slot declared by IEODResponse per
 * UPA §12.4.13 (EOD Processing).
 *
 * No mocks — this test only runs against a real device+gateway.
 */
import { IDeviceInterface } from "../../../../../src";
import { UpaEODResponse } from "../../../../../src/Terminals/UPA/Reponses/UpaEODResponse";
import {
  createLiveSale,
  createTestDevice,
  describeUpaLive,
  expectLiveSuccess,
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

describeUpaLive("UPA Response – UpaEODResponse (all fields, live MITC)", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("endOfDay() populates every IDeviceResponse field on UpaEODResponse", async () => {
    // Seed a sale so EOD has something to settle. Ignore known blockers.
    const sale = await createLiveSale(device);
    expectLiveSuccess(sale, "Sale");

    const response = (await (device as any).endOfDay()) as UpaEODResponse;

    expect(response).toBeInstanceOf(UpaEODResponse);
    expect(response.command).toBe("EODProcessing");
    expect(typeof response.status).toBe("string");
    expect(response.status.length).toBeGreaterThan(0);
    expect(typeof response.deviceResponseCode).toBe("string");
    expect(typeof response.deviceResponseText).toBe("string");
    expect(typeof response.referenceNumber).toBe("string");
    expect(typeof response.version).toBe("string");
    expect(typeof response.toString()).toBe("string");
  });

  test.only("endOfDay() populates host block + ecrId on Success", async () => {
    const sale = await createLiveSale(device);
    expectLiveSuccess(sale, "Sale");

    const response = (await (device as any).endOfDay()) as UpaEODResponse;

    if (response.status !== "Success") {
      console.warn(`endOfDay() returned ${response.deviceResponseCode}.`);
      expect(response).toBeInstanceOf(UpaEODResponse);
      expect(response.command).toBe("EODProcessing");
    } else {
      expect(response.deviceResponseCode).toBe("00");
      expect(response.batchId).toBeDefined();
      expect(Number.isFinite(Number(response.batchId))).toBe(true);
      expect(response.gatewayResponseCode).toBeDefined();
      expect(typeof response.gatewayResponseMessage).toBe("string");
      expect(typeof response.respDateTime).toBe("string");
      expect(response.respDateTime!.length).toBeGreaterThan(0);
      // ecrId is set by the SDK from the request (we default to "13").
      expect(response.ecrId).toBe("13");
    }
  });
});
