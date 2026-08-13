/**
 * Live unit tests for the UPA Scan command (spec §12.3.17).
 *
 * every test exercises the real UPA device over Meet-in-the-Cloud (MITC) with
 *
 * These tests require an operator to physically scan a QR code within the
 * configured `timeOut` window. Absent a scan, the device returns
 * APP002 TIMEOUT and the "00 / Success" assertions will fail — the same
 */
import {
  IDeviceInterface,
  ScanData,
  TransactionResponse,
} from "../../../../src";
import { createTestDevice, describeUpaLive, useLiveMic } from "./UpaHelpertest";

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

// ===========================================================================
// scan() – request parameter parity over live MITC (spec §12.3.17.1 / .2)
// ===========================================================================
describeUpaLive("UPA Scan – request payload (live MITC)", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaAdminTests:Scan] scan(ScanData) with header / prompt1 / displayOption / timeOut", async () => {
    const scanData = new ScanData();
    scanData.header = "scan";
    scanData.prompt1 = "scan qr code";
    scanData.displayOption = 0; // DisplayOption.NoScreenChange
    scanData.timeOut = 26;
    device.ecrId = "13";

    const response = (await (device as any).scan(
      scanData,
    )) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);
    expect(response.command).toBe("Scan");
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[UpaAdminTests:Scan] scan(ScanData) with all optional fields including prompt2 (spec §12.3.17.2)", async () => {
    const scanData = new ScanData();
    scanData.header = "Scan";
    scanData.prompt1 = "Scan QR Code";
    scanData.prompt2 = "Align the QR code within the frame to scan";
    scanData.displayOption = 1; // DisplayOption.ReturnToIdleScreen
    scanData.timeOut = 45;
    device.ecrId = "13";

    const response = (await (device as any).scan(
      scanData,
    )) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);
    expect(response.command).toBe("Scan");
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[UpaAdminTests:ScanWithoutParams] scan() with no arguments", async () => {
    device.ecrId = "13";
    const response = (await (device as any).scan()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);
    expect(response.command).toBe("Scan");
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[UpaAdminTests:ScanWithoutParams] scan(ScanData{}) with an empty ScanData", async () => {
    device.ecrId = "13";
    const response = (await (device as any).scan(
      new ScanData(),
    )) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);
    expect(response.command).toBe("Scan");
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[UpaScan] scan() honors timeOut boundary (999 = max per spec §12.3.17.1)", async () => {
    const scanData = new ScanData();
    scanData.header = "scan";
    scanData.prompt1 = "scan qr code";
    scanData.timeOut = 999;
    device.ecrId = "13";

    const response = (await (device as any).scan(
      scanData,
    )) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);
    expect(response.command).toBe("Scan");
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });
});

// ===========================================================================
// scan() – response hydration over live MITC (spec §12.3.17.5 / §12.3.17.6)
// ===========================================================================
describeUpaLive("UPA Scan – response parsing (live MITC)", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaScan] scan() surfaces scanData on TransactionResponse for successful scans", async () => {
    const scanData = new ScanData();
    scanData.header = "scan";
    scanData.prompt1 = "scan qr code";
    scanData.displayOption = 0; // DisplayOption.NoScreenChange
    scanData.timeOut = 26;
    device.ecrId = "13";

    const response = (await (device as any).scan(
      scanData,
    )) as TransactionResponse;

    expect(response).toBeInstanceOf(TransactionResponse);
    expect(response.command).toBe("Scan");
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
    expect(typeof response.scanData).toBe("string");
    expect(response.scanData.length).toBeGreaterThan(0);
  });
});

describeUpaLive("UPA Scan – live MITC", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaAdminTests:Scan] Scan() with populated ScanData", async () => {
    const scanData = new ScanData();
    scanData.header = "scan";
    scanData.prompt1 = "scan qr code";
    scanData.displayOption = 0; // DisplayOption.NoScreenChange
    scanData.timeOut = 26;

    device.ecrId = "13";
    const response = (await (device as any).scan(
      scanData,
    )) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);
    expect(response.deviceResponseCode).toBe("00");
    expect(response.status).toBe("Success");
  });

  test("[UpaAdminTests:ScanWithoutParams] Scan() with no parameters", async () => {
    device.ecrId = "13";
    const response = (await (device as any).scan()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);
    expect(response.deviceResponseCode).toBe("00");
    expect(response.status).toBe("Success");
  });
});
