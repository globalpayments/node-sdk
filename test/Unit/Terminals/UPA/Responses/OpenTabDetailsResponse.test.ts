/**
 * Live-device unit tests for OpenTabDetailsResponse (ITerminalReport).
 *
 * Exercises getOpenTabDetails() over live MITC and asserts every mapped
 * field on OpenTabDetailsResponse plus per-record OpenTab shape per UPA
 * §12.4.11 (GetOpenTabDetails).
 *
 * No mocks — this test only runs against a real device+gateway.
 */
import { IDeviceInterface } from "../../../../../src";
import {
  OpenTab,
  OpenTabDetailsResponse,
} from "../../../../../src/Terminals/UPA/Reponses/OpenTabDetailsResponse";
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
  "UPA Response – OpenTabDetailsResponse (all fields, live MITC)",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    test("getOpenTabDetails() populates every IDeviceResponse + top-level field", async () => {
      const response = (await (device as any)
        .getOpenTabDetails()
        .execute()) as OpenTabDetailsResponse;

      expect(response).toBeInstanceOf(OpenTabDetailsResponse);
      expect(response.command).toBe("GetOpenTabDetails");
      expect(typeof response.status).toBe("string");
      expect(response.deviceResponseCode).toBe("SUCCESS");
      expect(typeof response.deviceResponseText).toBe("string");
      expect(typeof response.referenceNumber).toBe("string");
      expect(typeof response.version).toBe("string");
      expect(typeof response.multipleMessage).toBe("string");
      expect(typeof response.merchantName).toBe("string");
      expect(typeof response.ecrId).toBe("string");
      expect(typeof response.deviceSerialNumber).toBe("string");
      expect(Array.isArray(response.openTabs)).toBe(true);
    });

    test("getOpenTabDetails() OpenTab records conform to declared shape", async () => {
      const response = (await (device as any)
        .getOpenTabDetails()
        .execute()) as OpenTabDetailsResponse;

      if (response.status !== "Success") {
        // OPENTAB001 = NO OPEN TAB TRANSACTIONS — legitimate for a clean terminal.
        expect(["OPENTAB001", "APP011"]).toContain(response.deviceResponseCode);
        console.warn(
          `getOpenTabDetails() returned ${response.deviceResponseCode}: no open tabs. Row assertions skipped.`,
        );
        return;
      }

      expect(response.deviceResponseCode).toBe("SUCCESS");

      for (const tab of response.openTabs) {
        expect(tab).toBeDefined();
        expect(
          tab.authorizedAmount === undefined ||
            typeof tab.authorizedAmount === "number",
        ).toBe(true);
        expect(typeof tab.cardType).toBe("string");
        expect(typeof tab.maskedPan).toBe("string");
        expect(typeof tab.transactionId).toBe("string");
        expect(typeof tab.clerkId).toBe("string");
      }
    });

    test("OpenTab class is exported and constructible", () => {
      // Regression: OpenTab used to be declared but not surfaced via index.
      const tab = new OpenTab();
      expect(tab).toBeInstanceOf(OpenTab);
      expect(tab.cardType).toBe("");
      expect(tab.maskedPan).toBe("");
      expect(tab.transactionId).toBe("");
      expect(tab.clerkId).toBe("");
    });
  },
);
