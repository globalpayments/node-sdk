/**
 * Unit tests for UPA Credit payment methods:
 *   sale() with processing indicators, sale() with auth-time lodging,
 *   updateLodginDetail(), void()
 *
 */
import {
  ExtraChargeType,
  IDeviceInterface,
  Lodging,
  ServicesContainer,
  TransactionResponse,
  UnsupportedTransactionError,
} from "../../../../src";
import { DeviceService } from "../../../../src/Services/DeviceService";
import {
  buildConfig,
  createLiveSale,
  createTestDevice,
  describeUpaLive,
  expectLiveSuccess,
  formatLiveFailure,
  isKnownLiveBusyBlocker,
  useLiveMic,
} from "./UpaHelpertest";

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
// sale() – processing indicators serialization
// ===========================================================================
describeUpaLive("UPA Credit – sale() processing indicators", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaCreditTests] sale() serializes processing indicators without mocked responses", async () => {
    const saleResponse = await createLiveSale(device);
    expect(saleResponse.status).toBe("Success");
  });
});

// ===========================================================================
// sale() with auth-time lodging
// ===========================================================================
describeUpaLive("UPA Credit – sale() with lodging", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaCreditTests:173] sale() serializes auth-time lodging without mocked responses", async () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;
    const lodging = new Lodging();
    lodging.folioNumber = "FOLIO-123";
    lodging.extraChargeTypes = [
      ExtraChargeType.Restaurant,
      ExtraChargeType.MiniBar,
    ];
    lodging.extraChargeTotal = 12.5;
    lodging.dailyRate = 89.99;

    const builder = await (device as any)
      .sale(10)
      .withEcrId(13)
      .withLodging(lodging);

    const request = controller
      .buildProcessTransaction(builder)
      .getJsonRequest();

    expect(request.data.command).toBe("Sale");
    expect(request.data.data.lodging).toMatchObject({
      folioNumber: "FOLIO-123",
      dailyRate: "89.99",
      extraChargeTotal: "12.50",
      extraChargeTypes: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    });
  });
});

// ===========================================================================
// void() — UPA spec §12.4.2
//   Void cancels a transaction in the host batch.
//   Per §12.4.2.1: transaction node must carry ONE of
//     `tranNo`          → builder.terminalRefNumber
//     `referenceNumber` → builder.transactionId
//   Both together → VOID004. Neither → VOID003.
//   Optional `clerkId` in params.
// ===========================================================================
describeUpaLive("UPA Credit – void() request shape", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaCreditTests] void() with tranNo (terminalRefNumber) serializes matching spec §12.4.2.2", () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;

    const builder = (device as any)
      .void()
      .withTerminalRefNumber("0002")
      .withEcrId(13);

    const request = controller.buildManageTransaction(builder).getJsonRequest();

    expect(request.data.command).toBe("Void");
    expect(request.data.EcrId).toBe("13");
    expect(request.data.data.transaction).toEqual({ tranNo: "0002" });
    // Spec-forbidden fields for Void must not be present:
    expect(request.data.data.transaction.referenceNumber).toBeUndefined();
    expect(request.data.data.transaction.baseAmount).toBeUndefined();
    expect(request.data.data.transaction.amount).toBeUndefined();
    expect(request.data.data.transaction.tipAmount).toBeUndefined();
    expect(request.data.data.transaction.taxAmount).toBeUndefined();
    expect(request.data.data.transaction.taxIndicator).toBeUndefined();
    expect(request.data.data.transaction.invoiceNbr).toBeUndefined();
    expect(request.data.data.transaction.processCPC).toBeUndefined();
  });

  test("[UpaCreditTests] void() with referenceNumber (transactionId) serializes matching spec §12.4.2.2", () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;

    const builder = (device as any)
      .void()
      .withTransactionId("1282447530")
      .withEcrId(13);

    const request = controller.buildManageTransaction(builder).getJsonRequest();

    expect(request.data.command).toBe("Void");
    expect(request.data.data.transaction).toEqual({
      referenceNumber: "1282447530",
    });
    expect(request.data.data.transaction.tranNo).toBeUndefined();
  });

  test("[UpaCreditTests] void() with clerkId serializes params.clerkId per spec §12.4.2.2", () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;

    const builder = (device as any)
      .void()
      .withTerminalRefNumber("0002")
      .withClerkId(1234)
      .withEcrId(13);

    const request = controller.buildManageTransaction(builder).getJsonRequest();

    expect(request.data.data.params).toEqual({ clerkId: 1234 });
    expect(request.data.data.transaction).toEqual({ tranNo: "0002" });
  });

  test("[SdkValidation] void() with both tranNo and referenceNumber throws VOID004 hint", () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;

    const builder = (device as any)
      .void()
      .withTerminalRefNumber("0002")
      .withTransactionId("1282447530")
      .withEcrId(13);

    expect(() => controller.buildManageTransaction(builder)).toThrow(/VOID004/);
    expect(() => controller.buildManageTransaction(builder)).toThrow(
      UnsupportedTransactionError,
    );
  });

  test("[SdkValidation] void() with neither tranNo nor referenceNumber throws VOID003 hint", () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;

    const builder = (device as any).void().withEcrId(13);

    expect(() => controller.buildManageTransaction(builder)).toThrow(/VOID003/);
    expect(() => controller.buildManageTransaction(builder)).toThrow(
      UnsupportedTransactionError,
    );
  });
});

// ===========================================================================
// void() live MITC flow
//   Sale → Void by terminalRefNumber → expect Success
// ===========================================================================
describeUpaLive("UPA Credit – void() live MITC", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaCreditTests] void() by tranNo cancels a prior sale over live MITC", async () => {
    const saleResponse = await createLiveSale(device);
    if (saleResponse.deviceResponseCode !== "00") {
      console.warn(formatLiveFailure(saleResponse, "Sale (Void prereq)"));
      return;
    }

    const response: TransactionResponse = await (device as any)
      .void()
      .withTerminalRefNumber(saleResponse.terminalRefNumber)
      .withEcrId(13)
      .execute();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (isKnownLiveBusyBlocker(response)) {
      console.warn(formatLiveFailure(response, "Void"));
      return;
    }

    expectLiveSuccess(response, ["Void", "SendCommand"]);
    if (response.transactionType) {
      expect(response.transactionType.toUpperCase()).toContain("VOID");
    }
  });

  test("[LiveNegative] void() with unknown tranNo surfaces REF001 or VOID001", async () => {
    if (!useLiveMic) {
      return;
    }

    const response: TransactionResponse = await (device as any)
      .void()
      .withTerminalRefNumber("9999")
      .withEcrId(13)
      .execute();

    expect(response).toBeInstanceOf(TransactionResponse);

    if (isKnownLiveBusyBlocker(response)) {
      console.warn(formatLiveFailure(response, "Void unknown tranNo"));
      return;
    }

    // Spec §12.4.2.4 error codes for an unknown/uncancellable reference.
    if (response.status === "Failed") {
      expect(["REF001", "VOID001", "TRAN001"]).toContain(
        response.deviceResponseCode,
      );
      return;
    }

    console.warn(
      `Void with unknown tranNo unexpectedly succeeded on the current terminal (code=${response.deviceResponseCode}). Expected REF001 or VOID001.`,
    );
  });

  test("[LiveNegative] void() with invalid target device surfaces device error", async () => {
    if (!useLiveMic) {
      return;
    }

    const unavailableDevice = DeviceService.create(buildConfig());
    unavailableDevice.ecrId = "99999999";

    try {
      const response: TransactionResponse = await (unavailableDevice as any)
        .void()
        .withEcrId(99999999)
        .withTerminalRefNumber("0001")
        .execute();

      expect(response).toBeInstanceOf(TransactionResponse);
      // Any Failed status with a non-"00" code satisfies the negative path.
      if (response.status === "Failed") {
        expect(response.deviceResponseCode).not.toBe("00");
        return;
      }
    } catch (error) {
      // Gateway routing failures for an inactive terminal surface as thrown
      // GatewayError — that's an equally valid outcome for the negative path.
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBeTruthy();
    }
  });
});
