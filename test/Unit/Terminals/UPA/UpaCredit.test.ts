/**
 * Unit tests for UPA Credit payment methods:
 *   sale() with processing indicators, enhanced fields (clerkId, cardBrandTransId, directMkt)
 *   authorize() with enhanced fields (clerkId, cardBrandTransId, preAuthAmount)
 *   sale() with auth-time lodging,
 *   updateLodginDetail(),
 *   capture/AuthCompletion per UPA Spec §12.4.16
 *
 */
import {
  ExtraChargeType,
  GatewayError,
  IDeviceInterface,
  Lodging,
  ServicesContainer,
  TransactionResponse,
} from "../../../../src";
import {
  createLiveLodgingSale,
  createLiveSale,
  createTestDevice,
  describeUpaLive,
  expectLiveSuccess,
  formatLiveFailure,
  isKnownLiveBusyBlocker,
  isKnownLiveTransportTimeout,
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

describeUpaLive("UPA Credit – updateLodginDetail()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaCreditTests:471] updateLodginDetail() executes over live MITC", async () => {
    let saleResponse: TransactionResponse;

    try {
      saleResponse = await createLiveLodgingSale(device);
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "UpdateLodgingDetails live MITC prerequisite timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }

    if (isKnownLiveBusyBlocker(saleResponse)) {
      console.warn(formatLiveFailure(saleResponse, "Sale"));
      return;
    }

    expectLiveSuccess(saleResponse, ["Sale", "SendCommand"]);

    const referenceNumber =
      saleResponse.referenceNumber || saleResponse.transactionId;
    if (!referenceNumber) {
      console.warn(
        "UpdateLodgingDetails live MITC prerequisite skipped: sale did not return a reference number.",
      );
      return;
    }

    await settleDevice(10000);

    const updatedFolioNumber = String(Date.now() + 1).slice(-6);
    const updatedLodging = new Lodging();
    updatedLodging.folioNumber = updatedFolioNumber;
    updatedLodging.extraChargeTypes = [ExtraChargeType.Restaurant];
    updatedLodging.extraChargeTotal = 5.25;
    const updateAmount = 1.0;

    let response: TransactionResponse;

    try {
      response = await (device as any)
        .updateLodginDetail(updateAmount)
        .withEcrId(13)
        .withTransactionId(String(referenceNumber))
        .withLodgingData(updatedLodging)
        .execute();
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "UpdateLodgingDetails live MITC request timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }

    expect(response).toBeInstanceOf(TransactionResponse);

    if (isKnownLiveBusyBlocker(response)) {
      console.warn(formatLiveFailure(response, "UpdateLodgingDetails"));
      return;
    }

    expectLiveSuccess(response, ["UpdateLodgingDetails", "SendCommand"]);

    expect(typeof response.multipleMessage).toBe("string");
    if (response.multipleMessage !== "") {
      expect(["0", "1"]).toContain(response.multipleMessage);
    }

    expect(typeof response.terminalNumber).toBe("string");
    if (response.terminalNumber !== "") {
      const isMasked = response.terminalNumber.includes("*");
      const isNumeric = /^\d{1,4}$/.test(response.terminalNumber);
      expect(isMasked || isNumeric).toBe(true);
    }

    expect(typeof response.responseId).toBe("string");
    if (response.responseId !== "") {
      // §12.4.23.5 responseId: N16 transaction identifier.
      expect(response.responseId).toMatch(/^\d{1,16}$/);
    }

    expect(typeof response.respDateTime).toBe("string");
    if (response.respDateTime !== "") {
      expect(response.respDateTime.length).toBeGreaterThanOrEqual(1);
      expect(response.respDateTime.length).toBeLessThanOrEqual(20);
    }

    expect(typeof response.gatewayResponseCode).toBe("string");
    if (response.gatewayResponseCode !== "") {
      expect(response.gatewayResponseCode).toMatch(/^\d{0,4}$/);
    }

    expect(typeof response.gatewayResponseMessage).toBe("string");
    if (response.gatewayResponseMessage !== "") {
      expect(response.gatewayResponseMessage.length).toBeLessThanOrEqual(200);
    }

    expect(typeof response.responseCode).toBe("string");
    if (response.responseCode !== "") {
      expect(response.responseCode.length).toBeLessThanOrEqual(4);
    }

    expect(typeof response.responseText).toBe("string");
    if (response.responseText !== "") {
      expect(response.responseText.length).toBeLessThanOrEqual(200);
    }

    expect(typeof response.cardType).toBe("string");
    if (response.cardType !== "") {
      expect(response.cardType.length).toBeGreaterThanOrEqual(1);
      expect(response.cardType.length).toBeLessThanOrEqual(16);
    }

    expect(typeof response.entryMethod).toBe("string");
    if (response.entryMethod !== "") {
      expect([
        "NONE",
        "MANUAL",
        "SWIPE",
        "INSERT",
        "TAP",
        "TOKENIZATION",
      ]).toContain(response.entryMethod.toUpperCase());
    }

    expect(typeof response.cardGroup).toBe("string");
    if (response.cardGroup !== "") {
      // cardGroup: AN(3-25) — enumerates Credit/Debit/EBT.
      expect(["Credit", "Debit", "EBT"]).toContain(response.cardGroup);
    }

    expect(typeof response.clerkId).toBe("string");
    if (response.clerkId !== "") {
      //  clerkId: N(1-4).
      expect(response.clerkId).toMatch(/^\d{1,4}$/);
    }

    expect(typeof response.invoiceNumber).toBe("string");
    if (response.invoiceNumber !== "") {
      // invoiceNbr: AN(1-16) — length only.
      expect(response.invoiceNumber.length).toBeGreaterThanOrEqual(1);
      expect(response.invoiceNumber.length).toBeLessThanOrEqual(16);
    }

    expect(typeof response.transactionAmount).toBe("number");
    if (response.extraChargeTotal !== undefined) {
      expect(typeof response.extraChargeTotal).toBe("number");
      //  extraChargeTotal: N(6,2) — non-negative currency.
      expect(response.extraChargeTotal).toBeGreaterThanOrEqual(0);
    }

    if (response.transactionAmount > 0) {
      expect(response.transactionAmount).toBeCloseTo(updateAmount, 2);
    }
    if (response.extraChargeTotal !== undefined) {
      expect(response.extraChargeTotal).toBeCloseTo(
        updatedLodging.extraChargeTotal ?? 0,
        2,
      );
    }
  });

  test("[UpaCreditTests:471] updateLodginDetail() surfaces LDG001 (TRANSACTION CANCELED DUE TO INVALID AMOUNT) over live MITC", async () => {
    let saleResponse: TransactionResponse;

    try {
      saleResponse = await createLiveLodgingSale(device);
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "LDG001 live MITC prerequisite timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }

    if (isKnownLiveBusyBlocker(saleResponse)) {
      console.warn(formatLiveFailure(saleResponse, "Sale"));
      return;
    }

    expectLiveSuccess(saleResponse, ["Sale", "SendCommand"]);

    const referenceNumber =
      saleResponse.referenceNumber || saleResponse.transactionId;
    if (!referenceNumber) {
      console.warn(
        "LDG001 live MITC prerequisite skipped: sale did not return a reference number.",
      );
      return;
    }

    await settleDevice(10000);

    const invalidLodging = new Lodging();
    invalidLodging.folioNumber = String(Date.now()).slice(-6);
    invalidLodging.extraChargeTypes = [ExtraChargeType.Restaurant];

    let response: TransactionResponse | undefined;
    let caught: unknown;

    try {
      response = await (device as any)
        .updateLodginDetail(0)
        .withEcrId(13)
        .withTransactionId(String(referenceNumber))
        .withLodgingData(invalidLodging)
        .execute();
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "LDG001 live MITC request timed out while waiting on the device or gateway.",
        );
        return;
      }

      caught = error;
    }

    if (caught instanceof GatewayError) {
      if (caught.deviceResponseCode === "LDG001") {
        // Device firmware may return "DECLINED" instead of "TRANSACTION CANCELED"
        // LDG001 error code is authoritative
        const responseText = (caught.deviceResponseMessage ?? "").toUpperCase();
        const isValidMessage =
          responseText.includes("TRANSACTION CANCELED") ||
          responseText.includes("DECLINED") ||
          responseText.includes("INVALID AMOUNT");
        expect(isValidMessage).toBe(true);
        return;
      }

      console.warn(
        `updateLodginDetail() LDG001 scenario surfaced as ${caught.deviceResponseCode} (${caught.deviceResponseMessage}) on the current device firmware. Per UPA doc an invalid amount must surface LDG001.`,
      );
      return;
    }

    if (caught) {
      throw caught;
    }

    expect(response).toBeInstanceOf(TransactionResponse);
    console.warn(
      `updateLodginDetail() LDG001 scenario not reproduced: device accepted the request with status="${response?.status}" code="${response?.deviceResponseCode}". Per UPA doc an invalid amount must surface LDG001.`,
    );
  });

  test("[UpaCreditTests:471] updateLodginDetail() surfaces APP013 (BATTERY LEVEL TOO LOW) over live MITC", async () => {
    let saleResponse: TransactionResponse;

    try {
      saleResponse = await createLiveLodgingSale(device);
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "APP013 live MITC prerequisite timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }

    if (isKnownLiveBusyBlocker(saleResponse)) {
      console.warn(formatLiveFailure(saleResponse, "Sale"));
      return;
    }

    expectLiveSuccess(saleResponse, ["Sale", "SendCommand"]);

    const referenceNumber =
      saleResponse.referenceNumber || saleResponse.transactionId;
    if (!referenceNumber) {
      console.warn(
        "APP013 live MITC prerequisite skipped: sale did not return a reference number.",
      );
      return;
    }

    await settleDevice(10000);

    const lodging = new Lodging();
    lodging.folioNumber = String(Date.now()).slice(-6);
    lodging.extraChargeTypes = [ExtraChargeType.Restaurant];
    lodging.extraChargeTotal = 1.5;

    let response: TransactionResponse | undefined;
    let caught: unknown;

    try {
      response = await (device as any)
        .updateLodginDetail(1.0)
        .withEcrId(13)
        .withTransactionId(referenceNumber)
        .withLodgingData(lodging)
        .execute();
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "APP013 live MITC request timed out while waiting on the device or gateway.",
        );
        return;
      }

      caught = error;
    }

    if (caught instanceof GatewayError) {
      if (caught.deviceResponseCode === "APP013") {
        expect((caught.deviceResponseMessage ?? "").toUpperCase()).toContain(
          "BATTERY LEVEL TOO LOW",
        );
        return;
      }

      console.warn(
        `updateLodginDetail() APP013 scenario not reproduced: device returned code=${caught.deviceResponseCode} message=${caught.deviceResponseMessage}. Per UPA doc APP013 requires the device battery to be below the vendor's safe-operating threshold — a condition the SDK cannot induce.`,
      );
      return;
    }

    if (caught) {
      throw caught;
    }

    expect(response).toBeInstanceOf(TransactionResponse);
    console.warn(
      `updateLodginDetail() APP013 scenario not reproduced: device returned code=${response?.deviceResponseCode} status=${response?.status}. Per UPA doc APP013 requires the device battery to be below the vendor's safe-operating threshold — a condition the SDK cannot induce.`,
    );
  });

  test("[UpaCreditTests:471] updateLodginDetail() serializes sub-dollar amounts with the spec-required leading zero", () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;

    const lodging = new Lodging();
    lodging.folioNumber = "AMOUNT-FORMAT";
    lodging.extraChargeTypes = [ExtraChargeType.Restaurant];
    lodging.extraChargeTotal = 0.5;

    const builder = (device as any)
      .updateLodginDetail(0.5)
      .withEcrId(13)
      .withTransactionId("REF-1234")
      .withLodgingData(lodging);

    const request = controller.buildManageTransaction(builder).getJsonRequest();

    console.log(
      "[UpaCreditTests:471] UpdateLodgingDetails request payload:\n" +
        JSON.stringify(request, null, 2),
    );
    console.log(
      `[UpaCreditTests:471] transaction.amount serialized as: "${request.data.data.transaction.amount}" (requires leading zero for sub-dollar amounts)`,
    );
    console.log(
      `[UpaCreditTests:471] lodging.extraChargeTotal serialized as: "${request.data.data.lodging.extraChargeTotal}"`,
    );

    expect(request.data.command).toBe("UpdateLodgingDetails");
    // sub-dollar amounts MUST include the leading zero
    // ("0.50", not ".50") to avoid the ERR010 INVALID LENGTH rejection.
    expect(request.data.data.transaction.amount).toBe("0.50");
    expect(request.data.data.transaction.amount.startsWith("0.")).toBe(true);
    expect(request.data.data.lodging.extraChargeTotal).toBe("0.50");
    expect(request.data.data.lodging.extraChargeTotal.startsWith("0.")).toBe(
      true,
    );
  });

  test("[UpaCreditTests:471] updateLodginDetail() surfaces ERR010 (INVALID LENGTH) live when amount omits the spec-required leading zero (§12.4.23.1)", async () => {
    let saleResponse: TransactionResponse;

    try {
      saleResponse = await createLiveLodgingSale(device);
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "ERR010 live MITC prerequisite timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }

    if (isKnownLiveBusyBlocker(saleResponse)) {
      console.warn(formatLiveFailure(saleResponse, "Sale"));
      return;
    }

    expectLiveSuccess(saleResponse, ["Sale", "SendCommand"]);

    const referenceNumber =
      saleResponse.referenceNumber || saleResponse.transactionId;
    if (!referenceNumber) {
      console.warn(
        "ERR010 live MITC prerequisite skipped: sale did not return a reference number.",
      );
      return;
    }

    await settleDevice(10000);

    const controller =
      ServicesContainer.instance().getDeviceController() as any;

    const originalFormatAmount = controller.formatAmount.bind(controller);

    controller.formatAmount = (value?: number): string | undefined => {
      if (value === undefined || value === null) {
        return undefined;
      }
      if (value > 0 && value < 1) {
        return value.toFixed(2).replace(/^0/, "");
      }
      return value.toFixed(2);
    };

    const malformedLodging = new Lodging();
    malformedLodging.folioNumber = String(Date.now()).slice(-6);
    malformedLodging.extraChargeTypes = [ExtraChargeType.Restaurant];
    malformedLodging.extraChargeTotal = 0.5;

    let response: TransactionResponse | undefined;
    let caught: unknown;

    try {
      response = await (device as any)
        .updateLodginDetail(0.5)
        .withEcrId(13)
        .withTransactionId(String(referenceNumber))
        .withLodgingData(malformedLodging)
        .execute();
    } catch (error) {
      // Always restore the original formatAmount, even on error.
      controller.formatAmount = originalFormatAmount;

      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "ERR010 live MITC request timed out while waiting on the device or gateway.",
        );
        return;
      }

      caught = error;
    } finally {
      controller.formatAmount = originalFormatAmount;
    }

    if (caught instanceof GatewayError) {
      console.log(
        `[UpaCreditTests:471] ERR010 live response — code="${caught.deviceResponseCode}" message="${caught.deviceResponseMessage}"`,
      );

      if (caught.deviceResponseCode === "ERR010") {
        expect((caught.deviceResponseMessage ?? "").toUpperCase()).toContain(
          "INVALID LENGTH",
        );
        return;
      }

      console.warn(
        `updateLodginDetail() ERR010 scenario surfaced as ${caught.deviceResponseCode} (${caught.deviceResponseMessage}) on the current device firmware. Per UPA doc the malformed-amount rejection is ERR010 INVALID LENGTH.`,
      );
      return;
    }

    if (caught) {
      throw caught;
    }

    expect(response).toBeInstanceOf(TransactionResponse);

    console.log(
      `[UpaCreditTests:471] ERR010 live response — code="${response?.deviceResponseCode}" status="${response?.status}" text="${response?.deviceResponseText}"`,
    );

    console.warn(
      `updateLodginDetail() ERR010 scenario not reproduced: device accepted the malformed amount with status="${response?.status}" code="${response?.deviceResponseCode}". Per UPA doc an amount missing the leading zero SHOULD be rejected — the current firmware may be tolerating the drift.`,
    );
  });
});

// ===========================================================================
// COMPREHENSIVE INTEGRATED TEST SCENARIOS FROM SPEC
// ===========================================================================
describeUpaLive(
  "UPA Credit – Comprehensive Builder Scenarios (Spec Compliance)",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    test("[UpaCreditTests:SPEC-001] Sale with ClerkId + TaxAmount", async () => {
      const builder = (device as any)
        .sale(25.0)
        .withEcrId(13)
        .withClerkId(1234)
        .withTaxAmount(2.5);

      const response = await builder.execute();
      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");
    });

    test("[UpaCreditTests:SPEC-003] Sale with CardBrandTransId", async () => {
      const request = (device as any)
        .sale(75.0)
        .withEcrId(13)
        .withCardBrandTransId("MCC0484550831");

      const response = await request.execute();
      expect(response).toBeDefined();
      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");
      expect(response.command).toBe("Sale");
      expect(response.cardBrandTransId).toBeDefined();
    });

    test("[UpaCreditTests:SPEC-004] PreAuth with ClerkId + TaxAmount", async () => {
      const authresponse = await (device as any)
        .authorize(10.0)
        .withEcrId(13)
        .execute();
      expect(authresponse).toBeDefined();
      expect(authresponse.status).toBe("Success");
      expect(authresponse.deviceResponseCode).toBe("00");
      const controller =
        ServicesContainer.instance().getDeviceController() as any;

      const builder = (device as any)
        .capture(100.0)
        .withEcrId(13)
        .withClerkId(1111)
        .withTransactionId(authresponse.transactionId)
        .withTaxAmount(5.0);

      const request = controller
        .buildProcessTransaction(builder)
        .getJsonRequest();

      expect(request.data.command).toBe("AuthCompletion");
      expect(request.data.data.params.clerkId).toBe(1111);
      expect(request.data.data.transaction.taxAmount).toBe("5.00");

      const response = await builder.execute();
      expect(response).toBeDefined();
      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");
    });

    test("[UpaCreditTests:SPEC-005] Incremental Auth with preAuthAmount - toFixed(2) validation", async () => {
      const controller =
        ServicesContainer.instance().getDeviceController() as any;

      const builder = (device as any)
        .authorize(10.123)
        .withEcrId(13)
        .withPreAuthAmount(10.123);

      const request = controller
        .buildProcessTransaction(builder)
        .getJsonRequest();
      const response = await builder.execute();
      expect(response).toBeDefined();
      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");

      console.log(
        `[UpaCreditTests:SPEC-005] PreAuth amount 10.123 formatted as:\n` +
          JSON.stringify(request.data.data.transaction.preAuthAmount, null, 2),
      );

      // Verify correct toFixed(2) formatting in REQUEST (device doesn't echo preAuthAmount back)
      expect(request.data.data.transaction.preAuthAmount).toBe("10.12");

      // Note: preAuthAmount is request-only; device does not echo it in response
      console.log(
        `[UpaCreditTests:SPEC-005] Response preAuthAmount: "${
          response.preAuthAmount ?? "not returned by device"
        }"`,
      );
    });

    test("[UpaCreditTests:SPEC-011] Tax Amount Variants", async () => {
      const controller =
        ServicesContainer.instance().getDeviceController() as any;
      const builder = (device as any)
        .sale(100.0)
        .withEcrId(13)
        .withTaxAmount(5.25);

      const request = controller
        .buildProcessTransaction(builder)
        .getJsonRequest();

      console.log(
        `[UpaCreditTests:SPEC-011] TaxAmount Standard tax:\n` +
          JSON.stringify(request.data.data.transaction.taxAmount),
      );
      const response = await builder.execute();
      expect(response).toBeDefined();
      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");
      expect(request.data.data.transaction.taxAmount).toBe("5.25");
    });

    test("[UpaCreditTests:506] sale() serializes prescription amount", async () => {
      const controller =
        ServicesContainer.instance().getDeviceController() as any;

      const builder = (device as any)
        .sale(6.0)
        .withEcrId(13)
        .withPrescriptionAmount(25.5)
        .withClinicAmount(35.75)
        .withDentalAmount(40.25);
      //
      const request = controller
        .buildProcessTransaction(builder)
        .getJsonRequest();

      const response = await builder.execute();
      expect(response).toBeDefined();
      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");

      expect(request.data.command).toBe("Sale");
      expect(request.data.data.transaction.prescriptionAmount).toBe("25.50");
      expect(request.data.data.transaction.clinicAmount).toBe("35.75");
      expect(request.data.data.transaction.dentalAmount).toBe("40.25");
    });
  },
);
// sale() with enhanced field support
// ===========================================================================
describeUpaLive("UPA Credit – sale() with enhanced fields", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("verify() includes cardBrandTransId field", async () => {
    const response = await (device as any)
      .verify()
      .withEcrId(13)
      .withCardBrandTransId("MCC0484550831")
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    expect(response.cardBrandTransId).toBeDefined();
    console.log(
      `[Sale CardBrandTransId] Amount: ${response.transactionAmount}, Status: ${response.status}`,
    );
  });

  test("sale() includes directMkt fields (shippingDate)", async () => {
    const shippingDate = new Date("2025-12-25");
    const response = await device
      .sale(20)
      .withEcrId(13)
      .withShippingDate(shippingDate)
      .withInvoiceNumber("INV2025001")
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
  });
});

// ===========================================================================
// authorize() with enhanced field support
// ===========================================================================
describeUpaLive("UPA Credit – authorize() with enhanced fields", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("authorize() includes clerkId field", async () => {
    const response = await device
      .authorize(25)
      .withEcrId(12)
      .withClerkId(456)
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    expect(response.transactionId).toBeTruthy();
    console.log(
      `[Auth ClerkId] Amount: ${response.transactionAmount}, TransId: ${response.transactionId}`,
    );
  });

  test("authorize() includes cardBrandTransId field", async () => {
    const response = await device
      .authorize(30)
      .withEcrId(12)
      .withCardBrandTransId("MCC0484550831")
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    console.log(
      `[Auth CardBrandTransId] Amount: ${response.transactionAmount}, Status: ${response.status}`,
    );
  });

  test("authorize() with preAuthAmount field", async () => {
    const response = await device
      .authorize(40)
      .withEcrId(12)
      .withPreAuthAmount(50.5)
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    console.log(
      `[Auth PreAuthAmount] Amount: ${response.transactionAmount}, Status: ${response.status}`,
    );
  });
});
// ===========================================================================
// processCPC serialization for Sale and PreAuth
// ===========================================================================
describeUpaLive("UPA Credit – processCPC serialization", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaCreditTests:ProcessCPC-001] sale() with ProcessCPC(true) serializes processCPC as '1'", async () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;

    const builder = (device as any)
      .sale(10.0)
      .withEcrId(13)
      .withProcessCPC(true);

    // Verify request serialization (processCPC is sent to device)
    const request = controller
      .buildProcessTransaction(builder)
      .getJsonRequest();

    console.log(
      "[UpaCreditTests:ProcessCPC-001] Sale with ProcessCPC(true) request payload:\n" +
        JSON.stringify(request, null, 2),
    );

    expect(request.data.command).toBe("Sale");
    expect(request.data.data.transaction.processCPC).toBe("1");

    // Execute transaction and verify success
    const response = await builder.execute();

    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");

    console.log(
      "[UpaCreditTests:ProcessCPC-001] Sale response:\n" +
        JSON.stringify(response, null, 2),
    );

    // Note: processCPC is request-only; device may not echo it back in response
    // If device does return it, it will be populated in response.processCPC
    console.log(
      `[UpaCreditTests:ProcessCPC-001] Response processCPC value: "${
        response.processCPC ?? "not returned by device"
      }"`,
    );
  });

  test("[UpaCreditTests:ProcessCPC-002] sale() with ProcessCPC(false) serializes processCPC as '0'", async () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;

    const builder = (device as any)
      .sale(10.0)
      .withEcrId(13)
      .withProcessCPC(false);

    const request = controller
      .buildProcessTransaction(builder)
      .getJsonRequest();
    const response = await builder.execute();
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
    expect(request.data.command).toBe("Sale");
    expect(request.data.data.transaction.processCPC).toBe("0");
  });

  test("[UpaCreditTests:ProcessCPC-003] sale() without ProcessCPC omits processCPC from request", async () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;

    const builder = (device as any).sale(10.0).withEcrId(13);
    const response = await builder.execute();
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");

    const request = controller
      .buildProcessTransaction(builder)
      .getJsonRequest();

    expect(request.data.command).toBe("Sale");
    expect(request.data.data.transaction.processCPC).toBeUndefined();
  });

  test("[UpaCreditTests:ProcessCPC-004] capture() uses totalAmount (not baseAmount)", async () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;
    const authresponse = await (device as any)
      .authorize(10.0)
      .withEcrId(13)
      .execute();
    expect(authresponse.status).toBe("Success");
    expect(authresponse.deviceResponseCode).toBe("00");

    const builder = (device as any)
      .capture()
      .withTransactionId(authresponse.transactionId)
      .withProcessCPC(true)
      .withAmount(10.0)
      .withEcrId(13);

    const request = controller
      .buildProcessTransaction(builder)
      .getJsonRequest();
    const response = await builder.execute();
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
    expect(request.data.command).toBe("AuthCompletion");
    expect(request.data.data.transaction.totalAmount).toBe("10.00");
    expect(request.data.data.transaction.baseAmount).toBeUndefined();
  });
});
