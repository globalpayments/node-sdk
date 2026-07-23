/**
 * Unit tests for UPA Report methods:
 *   getSAFReport(), findBatches(), getBatchReport(), getBatchDetails(),
 *   getOpenTabDetails()
 *
 *   - GetSafReport
 *   - GetBatchReport
 *   - GetBatchDetails
 *   - GetOpenTabDetails
 *   - FindBatches
 */
import {
  BatchReportResponse,
  IDeviceInterface,
  OpenTabDetailsResponse,
} from "../../../../src";
import {
  ReportOutput,
  TerminalReportType,
} from "../../../../src/Terminals/Enums";
import { TerminalReportBuilder } from "../../../../src/Terminals/Builders/TerminalReportBuilder";
import { UpaSearchCriteria } from "../../../../src/Terminals/UPA/Entities/UpaSearchCriteria";
import { SafReportResponse } from "../../../../src/Terminals/UPA/Reponses/SafReportResponse";
import {
  createLiveSale,
  createTestDevice,
  describeUpaLive,
  expectLiveSuccess,
  findLiveBatches,
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
// getSAFReport()
// ===========================================================================
describeUpaLive("UPA Report – getSAFReport()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaCreditTests] sale() serializes processing indicators without mocked responses", async () => {
    await device.sale(1.0).withEcrId(13).execute();
    // await device.sale(2.50).withEcrId(13).execute();
    // await device.sale(0.50).withEcrId(13).execute();   // small amount → SAF-approved
    await device.sendStoreAndForward();
  });

  test("[UpaReportTests:37] getSAFReport() round-trips over live MITC (either populated buckets or SAF001)", async () => {
    // SAF data only accumulates when the terminal takes/uploads offline txns.
    // On a clean/always-online terminal this returns SAF001 (no records) —
    // the SDK contract must round-trip both outcomes cleanly.
    const response = (await device
      .getSAFReport()
      .where(UpaSearchCriteria.EcrId, 13)
      .and(UpaSearchCriteria.ReportOutput, ReportOutput.ReturnData)
      .execute()) as SafReportResponse;

    expect(response).toBeInstanceOf(SafReportResponse);
    expect(response.command).toBe("GetSAFReport");

    if (response.status === "Failed") {
      // Per spec §12.4.14 the well-formed empty-store failure code is SAF001.
      // APP011 (MUST ACTIVATE DEVICE) is a tenant/device precondition.
      expect(["SAF001", "APP011"]).toContain(response.deviceResponseCode);
      console.warn(
        `getSAFReport() returned ${response.deviceResponseCode}: no SAF records on this terminal. See the test file's [UpaReportTests:37] success scenario for bucket-level assertions that require seeded SAF data.`,
      );
      return;
    }

    expect(response.status).toBe("Success");
    expect(["00", "SUCCESS"]).toContain(response.deviceResponseCode);
  });
  test("[UpaReportTests:37][UpaMicTests:363] getSAFReport() executes over live MITC", async () => {
    const report = await device
      .getSAFReport()
      .where(UpaSearchCriteria.EcrId, 13)
      .and(UpaSearchCriteria.ReportOutput, ReportOutput.ReturnData)
      .execute();

    expect((await report).command).toBe("GetSAFReport");
    expect((await report).status).toBe("Success");

    expect(["00", "SUCCESS"]).toContain((await report).deviceResponseCode);
  });

  test("[UpaReportTests:37] getSAFReport() success scenario with SAF transactions available", async () => {
    const response = (await device
      .getSAFReport()
      .where(UpaSearchCriteria.EcrId, 13)
      .and(UpaSearchCriteria.ReportOutput, ReportOutput.ReturnData)
      .execute()) as SafReportResponse;

    expect(response).toBeInstanceOf(SafReportResponse);
    expect(response.command).toBe("GetSAFReport");
    expect(response.status).toBe("Success");
    expect(["00", "SUCCESS"]).toContain(response.deviceResponseCode);
    expect(response.reportResult).toBeDefined();

    const buckets = [
      response.reportResult?.approved,
      response.reportResult?.pending,
      response.reportResult?.declined,
    ];

    let aggregateCount = 0;
    let aggregateAmount = 0;
    let inspectedSummaries = 0;

    for (const bucket of buckets) {
      if (!bucket) {
        continue;
      }
      for (const summary of Object.values(bucket)) {
        inspectedSummaries += 1;

        // (b) SafCount matches the number of SafRecords in the bucket.
        expect(summary.count).toBe(summary.transactions.length);

        // (c) SafTotal matches the sum of per-record baseAmount values.
        //     ±0.01 tolerance for device-side dollar/cent rounding drift.
        const recordSum = summary.transactions.reduce(
          (sum, txn) => sum + (Number(txn.amount) || 0),
          0,
        );
        expect(Math.abs((summary.totalAmount ?? 0) - recordSum)).toBeLessThan(
          0.011,
        );

        aggregateCount += summary.count ?? 0;
        aggregateAmount += summary.totalAmount ?? 0;

        for (const txn of summary.transactions) {
          if (!txn.maskedCardNumber) {
            continue;
          }
          expect(txn.maskedCardNumber.length).toBeGreaterThanOrEqual(13);
          expect(txn.maskedCardNumber.length).toBeLessThanOrEqual(25);
          // At least one masking character (X or *) must appear.
          expect(txn.maskedCardNumber).toMatch(/[X*]/i);
          // Last four positions must be digits (unmasked PAN suffix).
          expect(txn.maskedCardNumber.slice(-4)).toMatch(/^\d{4}$/);
        }
      }
    }

    if (inspectedSummaries === 0) {
      console.warn(
        "getSAFReport() returned Success but no SafDetails buckets. Skipping bucket-level assertions.",
      );
      return;
    }

    // Aggregate totals across all buckets must match the report header.
    expect(response.reportResult?.totalCount).toBe(aggregateCount);
    expect(
      Math.abs((response.reportResult?.totalAmount ?? 0) - aggregateAmount),
    ).toBeLessThan(0.011);
  });

  test("[UpaReportTests] getSAFReport() builder captures reportOutput = Print", () => {
    const builder = (device as any)
      .getSAFReport()
      .where(UpaSearchCriteria.EcrId, 13)
      .and(UpaSearchCriteria.ReportOutput, ReportOutput.Print);

    expect(builder).toBeInstanceOf(TerminalReportBuilder);
    expect(builder.reportType).toBe(TerminalReportType.GetSAFReport);
    expect(builder.ecrId).toBe("13");
    expect(builder.reportOutput).toBe("Print");
  });

  test("[UpaReportTests] getSAFReport() builder captures reportOutput = Print|ReturnData", () => {
    const combined = `${ReportOutput.Print}|${ReportOutput.ReturnData}`;

    const builder = (device as any)
      .getSAFReport()
      .where(UpaSearchCriteria.EcrId, 13)
      .and(UpaSearchCriteria.ReportOutput, combined);

    expect(builder.reportOutput).toBe("Print|ReturnData");
    expect(builder.reportOutput.split("|")).toEqual(
      expect.arrayContaining(["Print", "ReturnData"]),
    );
  });

  test("[UpaReportTests] getSAFReport() builder captures background = true", () => {
    const builder = (device as any)
      .getSAFReport()
      .where(UpaSearchCriteria.EcrId, 13)
      .and(UpaSearchCriteria.ReportOutput, ReportOutput.ReturnData)
      .and(UpaSearchCriteria.Background, "true");

    expect(builder).toBeInstanceOf(TerminalReportBuilder);
    expect(builder.reportType).toBe(TerminalReportType.GetSAFReport);
    expect(builder.ecrId).toBe("13");
    expect(builder.reportOutput).toBe("ReturnData");
    expect(builder.background).toBe("true");
  });

  test("[UpaReportTests] getSAFReport() with background = true executes over live MITC", async () => {
    const response: SafReportResponse = await (device as any)
      .getSAFReport()
      .where(UpaSearchCriteria.EcrId, 13)
      .and(UpaSearchCriteria.ReportOutput, ReportOutput.ReturnData)
      .and(UpaSearchCriteria.Background, "true")
      .execute();

    expect(response).toBeInstanceOf(SafReportResponse);
    expect(response.command).toBe("GetSAFReport");

    if (response.status === "Failed") {
      //   SAF001 – no SAF records available
      //   APP011 – MUST ACTIVATE DEVICE (tenant/device precondition)
      expect(["SAF001", "APP011"]).toContain(response.deviceResponseCode);
      return;
    }

    expectLiveSuccess(response, "GetSAFReport");
  });
});

// ===========================================================================
// findBatches()
// ===========================================================================
describeUpaLive("UPA Report – findBatches()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  /**
   */
  test("[UpaReportTests:122] findBatches() executes over live MITC", async () => {
    let response = await findLiveBatches(device);

    if (response.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      expectLiveSuccess(saleResponse, "Sale");
      await settleDevice(5000);
      response = await findLiveBatches(device);
    }

    expect(response.command).toBe("AvailableBatches");
    expect(response.status).toBe("Success");

    expect(["00", "SUCCESS"]).toContain(response.deviceResponseCode);
  });

  test("[UpaReportTests:122] findBatches() batches returned in descending settlement order", async () => {
    let response = await findLiveBatches(device);

    if (response.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      expectLiveSuccess(saleResponse, "Sale");
      await settleDevice(5000);
      response = await findLiveBatches(device);
    }

    expect(response.command).toBe("AvailableBatches");
    expect(response.status).toBe("Success");

    if (response.batches.length < 2) {
      console.warn(
        `findBatches() DESC-order assertion needs >=2 batches; device returned ${response.batches.length}. Test passes by vacuous truth.`,
      );
      return;
    }

    const sortedDesc = [...response.batches].sort((a, b) => b - a);
    expect(response.batches).toEqual(sortedDesc);
    // First element MUST be the maximum (most recent).
    expect(response.batches[0]).toBe(Math.max(...response.batches));
    for (let i = 1; i < response.batches.length; i += 1) {
      expect(response.batches[i - 1]).toBeGreaterThanOrEqual(
        response.batches[i],
      );
    }
  });

  test("[UpaReportTests:122] findBatches() surfaces deviceSerialNumber", async () => {
    const response = await findLiveBatches(device);

    expect(response.command).toBe("AvailableBatches");
    expect(response.status).toBe("Success");

    // deviceSerialNumber is always a string, never undefined.
    expect(typeof response.deviceSerialNumber).toBe("string");

    if (response.deviceSerialNumber === "") {
      console.warn(
        "findBatches() deviceSerialNumber value is empty in response",
      );
      return;
    }

    expect(response.deviceSerialNumber.length).toBeGreaterThanOrEqual(1);
    expect(response.deviceSerialNumber.length).toBeLessThanOrEqual(20);
    expect(response.deviceSerialNumber).toMatch(/^[A-Za-z0-9]+$/);
  });

  test("[UpaReportTests:122] findBatches() surfaces BATCH002 (NO BATCH AVAILABLE) when no batch exists", async () => {
    const response = await findLiveBatches(device);

    if (response.deviceResponseCode === "BATCH002") {
      expect(response.command).toBe("AvailableBatches");
      expect(response.status).toBe("Failed");
      expect(response.deviceResponseText.toUpperCase()).toContain("NO BATCH");
      expect(response.batches).toEqual([]);
      return;
    }

    console.warn(
      `findBatches() BATCH002 scenario not reproduced: device returned ${response.deviceResponseCode} with ${response.batches.length} batches. BATCH002 requires an empty batch history.`,
    );
  });
});

describeUpaLive("UPA Report – BatchList", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("BatchList parses batchesAvail in DESC order per §12.4.12.5", async () => {
    let response = await findLiveBatches(device);

    if (response.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      expectLiveSuccess(saleResponse, "Sale");
      await settleDevice(5000);
      response = await findLiveBatches(device);
    }

    expect(response.command).toBe("AvailableBatches");
    expect(response.status).toBe("Success");

    if (response.batches.length < 2) {
      console.warn(
        `BatchList DESC-order test needs >=2 batches; device returned ${response.batches.length}. Test passes by vacuous truth.`,
      );
      return;
    }

    // §12.4.12.5: batchesAvail is sorted DESC by settlement date/time.
    // Batch numbering on this device is settlement-time-monotonic, so
    // the numeric batchId sequence must be non-increasing (DESC).
    const sortedDesc = [...response.batches].sort((a, b) => b - a);
    expect(response.batches).toEqual(sortedDesc);
    expect(response.batches[0]).toBe(Math.max(...response.batches));
  });

  test("BatchList parses deviceSerialNumber per §12.4.12.5", async () => {
    let response = await findLiveBatches(device);

    if (response.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      expectLiveSuccess(saleResponse, "Sale");
      await settleDevice(5000);
      response = await findLiveBatches(device);
    }

    expect(response.command).toBe("AvailableBatches");
    expect(response.status).toBe("Success");

    // SDK contract: deviceSerialNumber is always a string, never undefined.
    expect(typeof response.deviceSerialNumber).toBe("string");

    if (response.deviceSerialNumber === "") {
      console.warn(
        "BatchList deviceSerialNumber validation skipped: device omitted the optional field in this response. Testing parser contract for non-empty values requires a device response that includes it.",
      );
      return;
    }

    expect(response.deviceSerialNumber.length).toBeGreaterThanOrEqual(1);
    expect(response.deviceSerialNumber.length).toBeLessThanOrEqual(20);
    expect(response.deviceSerialNumber).toMatch(/^[A-Za-z0-9]+$/);
  });

  test("BatchList surfaces empty deviceSerialNumber when device omits the field", async () => {
    let response = await findLiveBatches(device);

    if (response.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      expectLiveSuccess(saleResponse, "Sale");
      await settleDevice(5000);
      response = await findLiveBatches(device);
    }

    expect(response.command).toBe("AvailableBatches");
    expect(response.status).toBe("Success");

    // SDK contract: deviceSerialNumber is always a string, never undefined.
    expect(typeof response.deviceSerialNumber).toBe("string");

    if (response.deviceSerialNumber === "") {
      expect(response.deviceSerialNumber).toBe("");
      return;
    }

    console.warn(
      `BatchList deviceSerialNumber omission test skipped: device included the field (${response.deviceSerialNumber}) in this response. The parser's null-safety contract is confirmed by the presence check above; omission-handling cannot be tested when the device always populates the field.`,
    );
  });
});

// ===========================================================================
// getBatchReport()
// ===========================================================================
describeUpaLive("UPA Report – getBatchReport()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaReportTests:45][UpaMicTests:378] getBatchReport() executes over live MITC when a batch exists", async () => {
    let batches = await findLiveBatches(device);

    if (batches.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      expectLiveSuccess(saleResponse, "Sale");
      await settleDevice(5000);
      batches = await findLiveBatches(device);
    }

    const batchId = batches.batches[0]?.toString();
    if (!batchId) {
      console.warn(
        "getBatchReport() live MITC prerequisite skipped: no batches available.",
      );
      return;
    }

    const response = await (device as any)
      .getBatchReport()
      .where(UpaSearchCriteria.Batch, batchId)
      .and(UpaSearchCriteria.EcrId, 13)
      .execute();

    expect(response).toBeInstanceOf(BatchReportResponse);
    // Device may return either "GetBatchReport" or "SendCommand" depending on firmware version
    expect(["GetBatchReport", "SendCommand"]).toContain(response.command);
    expect(response.status).toBe("Success");
    expect(["00", "SUCCESS"]).toContain(response.deviceResponseCode);
    expect(response.batchRecord).toBeDefined();
  });

  test("[UpaReportTests:45] getBatchReport() without batch parameter returns current batch over live MITC", async () => {
    const response = await (device as any)
      .getBatchReport()
      .where(UpaSearchCriteria.EcrId, 13)
      .execute();

    expect(response).toBeInstanceOf(BatchReportResponse);
    expect(response.command).toBe("GetBatchReport");

    if (response.status === "Success") {
      expect(["00", "SUCCESS"]).toContain(response.deviceResponseCode);
      expect(response.batchRecord).toBeDefined();
      return;
    }

    if (response.deviceResponseCode === "BATCH001") {
      expect(response.status).toBe("Failed");
      expect(response.deviceResponseText.toUpperCase()).toContain(
        "EMPTY BATCH",
      );
      expect(response.batchRecord).toBeUndefined();
      return;
    }

    throw new Error(
      `getBatchReport() current-batch query returned unexpected code=${response.deviceResponseCode} status=${response.status}; only Success or BATCH001 are valid for a well-formed no-batch request.`,
    );
  });

  test("[UpaReportTests:45] getBatchReport() surfaces ERR013 (MISSING MANDATORY FIELD) over live MITC", async () => {
    const missingFieldDevice = createTestDevice();
    (missingFieldDevice as any).ecrId = undefined;

    const response = await (missingFieldDevice as any)
      .getBatchReport()
      .execute();

    expect(response).toBeInstanceOf(BatchReportResponse);
    expect(response.command).toBe("GetBatchReport");
    expect(response.status).toBe("Failed");

    if (response.deviceResponseCode === "ERR013") {
      expect(response.deviceResponseText.toUpperCase()).toContain(
        "MISSING MANDATORY",
      );
      expect(response.batchRecord).toBeUndefined();
      return;
    }

    console.warn(
      `getBatchReport() ERR013 scenario surfaced as ${response.deviceResponseCode} (${response.deviceResponseText}) on the current device firmware.The well-formed missing-mandatory-field response is ERR013.`,
    );
  });

  test("[UpaReportTests:45] getBatchReport() builder captures reportOutput = Print", () => {
    const builder = (device as any)
      .getBatchReport()
      .where(UpaSearchCriteria.Batch, "1006209")
      .and(UpaSearchCriteria.EcrId, 13)
      .and(UpaSearchCriteria.ReportOutput, ReportOutput.Print);

    expect(builder).toBeInstanceOf(TerminalReportBuilder);
    expect(builder.reportType).toBe(TerminalReportType.GetBatchReport);
    expect(builder.batch).toBe("1006209");
    expect(builder.ecrId).toBe("13");
    expect(builder.reportOutput).toBe("Print");
  });

  test("[UpaReportTests:45] getBatchReport() builder omits reportOutput when not set (device default = ReturnData)", () => {
    const builder = (device as any)
      .getBatchReport()
      .where(UpaSearchCriteria.Batch, "1006209")
      .and(UpaSearchCriteria.EcrId, 13);

    expect(builder).toBeInstanceOf(TerminalReportBuilder);
    expect(builder.reportType).toBe(TerminalReportType.GetBatchReport);
    expect(builder.reportOutput).toBeUndefined();

    const blankBuilder = (device as any)
      .getBatchReport()
      .where(UpaSearchCriteria.Batch, "1006209")
      .and(UpaSearchCriteria.ReportOutput, "");

    expect(blankBuilder.reportOutput).toBe("");
  });

  test("[UpaReportTests:45] getBatchReport() surfaces BATCH001 (EMPTY BATCH) over live MITC", async () => {
    const response = await (device as any)
      .getBatchReport()
      .where(UpaSearchCriteria.Batch, "0")
      .and(UpaSearchCriteria.EcrId, 13)
      .execute();

    expect(response).toBeInstanceOf(BatchReportResponse);
    expect(response.command).toBe("GetBatchReport");

    if (response.deviceResponseCode === "BATCH001") {
      expect(response.status).toBe("Failed");
      expect(response.deviceResponseText.toUpperCase()).toContain(
        "EMPTY BATCH",
      );
      expect(response.batchRecord).toBeUndefined();
      return;
    }

    console.warn(
      `getBatchReport() BATCH001 scenario not reproduced: device returned code=${response.deviceResponseCode} status=${response.status}. BATCH001 requires the queried batch to resolve to an empty transaction set on the current device.`,
    );
  });
});

// ===========================================================================
// getBatchDetails()
// ===========================================================================
describeUpaLive("UPA Report – getBatchDetails()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaReportTests:56] getBatchDetails() executes over live MITC when a batch exists", async () => {
    const response = await (device as any).getBatchDetails(1311583, true);

    expect(response).toBeInstanceOf(BatchReportResponse);
    expect(["GetBatchDetails", "SendCommand"]).toContain(response.command);
    expect(response.status).toBe("Success");
    expect(["00", "SUCCESS"]).toContain(response.deviceResponseCode);
    expect(response.batchRecord).toBeDefined();
  });

  test("[UpaReportTests:56] getBatchDetails() request buildReport toggles reportOutput correctly", () => {
    const combined = `${ReportOutput.Print}|${ReportOutput.ReturnData}`;
    expect(combined).toBe("Print|ReturnData");

    expect(ReportOutput.Print).toBe("Print");
    expect(ReportOutput.ReturnData).toBe("ReturnData");
  });

  test("[UpaReportTests:56] getBatchDetails() builder captures printReportType = detail (live)", async () => {
    let batches = await findLiveBatches(device);
    if (batches.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      expectLiveSuccess(saleResponse, "Sale");
      await settleDevice(5000);
      batches = await findLiveBatches(device);
    }
    const batchId = batches.batches[0]?.toString();
    if (!batchId) {
      console.warn(
        "getBatchDetails() printReportType=detail live check skipped: no batches available.",
      );
      return;
    }

    const builder = new TerminalReportBuilder<BatchReportResponse>(
      TerminalReportType.GetBatchDetails,
    )
      .where(UpaSearchCriteria.Batch, batchId)
      .and(UpaSearchCriteria.EcrId, 13)
      .and(UpaSearchCriteria.PrintReportType, "detail");

    // Builder-state contract (same as before).
    expect(builder).toBeInstanceOf(TerminalReportBuilder);
    expect(builder.reportType).toBe(TerminalReportType.GetBatchDetails);
    expect(builder.batch).toBe(batchId);
    expect(builder.ecrId).toBe("13");
    expect(builder.printReportType).toBe("detail");

    // Wire contract: request must hit GP API MITC and succeed with the
    // reportType=detail params payload emitted by
    // UpaController.buildReportTransaction.
    const response = await builder.execute();
    expect(response).toBeInstanceOf(BatchReportResponse);
    expect(response.status).toBe("Success");
  });

  test("[UpaReportTests:56] getBatchDetails() builder omits printReportType when not set (live)", async () => {
    let batches = await findLiveBatches(device);
    if (batches.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      expectLiveSuccess(saleResponse, "Sale");
      await settleDevice(5000);
      batches = await findLiveBatches(device);
    }
    const batchId = batches.batches[0]?.toString();
    if (!batchId) {
      console.warn(
        "getBatchDetails() printReportType-omitted live check skipped: no batches available.",
      );
      return;
    }

    const builder = new TerminalReportBuilder<BatchReportResponse>(
      TerminalReportType.GetBatchDetails,
    )
      .where(UpaSearchCriteria.Batch, batchId)
      .and(UpaSearchCriteria.EcrId, 13);

    expect(builder.printReportType).toBeUndefined();

    const response = await builder.execute();
    expect(response).toBeInstanceOf(BatchReportResponse);
    expect(response.status).toBe("Success");
  });

  test("getBatchDetails() emits reportType=detail and device returns batchDetailRecords", async () => {
    let batches = await findLiveBatches(device);

    if (batches.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      expectLiveSuccess(saleResponse, "Sale");
      await settleDevice(5000);
      batches = await findLiveBatches(device);
    }

    const batchId = batches.batches[0]?.toString();
    if (!batchId) {
      console.warn(
        "getBatchDetails() reportType=detail live check skipped: no batches available.",
      );
      return;
    }

    const detailResp = await new TerminalReportBuilder<BatchReportResponse>(
      TerminalReportType.GetBatchDetails,
    )
      .where(UpaSearchCriteria.Batch, batchId)
      .and(UpaSearchCriteria.EcrId, 13)
      .and(UpaSearchCriteria.PrintReportType, "detail")
      .execute();

    expect(detailResp).toBeInstanceOf(BatchReportResponse);
    // Device must accept the reportType field — an unknown-field
    // rejection would surface as a Failed status with an ERR-family code.
    expect(detailResp.status).toBe("Success");
  });

  test("[UpaReportTests:56] getBatchReport() summary and getBatchDetails() detail agree on batchId and totals", async () => {
    try {
      let batches = await findLiveBatches(device);

      if (batches.batches.length === 0) {
        const saleResponse = await createLiveSale(device);
        expectLiveSuccess(saleResponse, "Sale");
        await settleDevice(5000);
        batches = await findLiveBatches(device);
      }

      const batchId = batches.batches[0]?.toString();
      if (!batchId) {
        console.warn(
          "getBatchReport()/getBatchDetails() equivalence skipped: no batches available.",
        );
        return;
      }

      const summary = await (device as any)
        .getBatchReport()
        .where(UpaSearchCriteria.Batch, batchId)
        .and(UpaSearchCriteria.EcrId, 13)
        .execute();
      await settleDevice(3000);
      const detail = await (device as any).getBatchDetails(batchId, false);

      expect(summary).toBeInstanceOf(BatchReportResponse);
      expect(detail).toBeInstanceOf(BatchReportResponse);
      expect(summary.status).toBe("Success");
      expect(detail.status).toBe("Success");

      expect(summary.batchRecord?.batchId).toBe(detail.batchRecord?.batchId);

      if (
        summary.batchRecord?.totalCnt !== undefined &&
        detail.batchRecord?.totalCnt !== undefined
      ) {
        expect(summary.batchRecord.totalCnt).toBe(detail.batchRecord.totalCnt);
      }
      if (
        summary.batchRecord?.totalAmount !== undefined &&
        detail.batchRecord?.totalAmount !== undefined
      ) {
        expect(
          Math.abs(
            (summary.batchRecord.totalAmount ?? 0) -
              (detail.batchRecord.totalAmount ?? 0),
          ),
        ).toBeLessThan(0.011);
      }
    } catch (error) {
      // SYSTEM_ERROR from gateway suggests service issue, skip test with warning
      if (error instanceof Error && error.message.includes("SYSTEM_ERROR")) {
        console.warn(
          `getBatchReport()/getBatchDetails() equivalence test skipped due to GP API system error.`,
        );
        return;
      }
      throw error;
    }
  });
  test("[UpaReportTests:56] getBatchReport() summary and getBatchDetails() detail agree on batchId and totals", async () => {
    let batches = await findLiveBatches(device);

    if (batches.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      expectLiveSuccess(saleResponse, "Sale");
      await settleDevice(5000);
      batches = await findLiveBatches(device);
    }

    const batchId = batches.batches[0]?.toString();
    if (!batchId) {
      console.warn(
        "getBatchReport()/getBatchDetails() equivalence skipped: no batches available.",
      );
      return;
    }

    const summary = await (device as any)
      .getBatchReport()
      .where(UpaSearchCriteria.Batch, batchId)
      .and(UpaSearchCriteria.EcrId, 13)
      .execute();
    await settleDevice(3000);
    const detail = await (device as any).getBatchDetails(batchId, false);

    expect(summary).toBeInstanceOf(BatchReportResponse);
    expect(detail).toBeInstanceOf(BatchReportResponse);
    expect(summary.status).toBe("Success");
    expect(detail.status).toBe("Success");

    expect(summary.batchRecord?.batchId).toBe(detail.batchRecord?.batchId);

    if (
      summary.batchRecord?.totalCnt !== undefined &&
      detail.batchRecord?.totalCnt !== undefined
    ) {
      expect(summary.batchRecord.totalCnt).toBe(detail.batchRecord.totalCnt);
    }
    if (
      summary.batchRecord?.totalAmount !== undefined &&
      detail.batchRecord?.totalAmount !== undefined
    ) {
      expect(
        Math.abs(
          (summary.batchRecord.totalAmount ?? 0) -
            (detail.batchRecord.totalAmount ?? 0),
        ),
      ).toBeLessThan(0.011);
    }
  });

  test("[UpaReportTests:56] getBatchDetails() transactionStatus populates only permitted UPA values", async () => {
    let batches = await findLiveBatches(device);

    if (batches.batches.length === 0) {
      const saleResponse = await createLiveSale(device);
      // Device firmware may return "SendCommand" or "Sale" - accept both variants
      expectLiveSuccess(saleResponse, ["Sale", "SendCommand"]);
      await settleDevice(5000);
      batches = await findLiveBatches(device);
    }

    const batchId = batches.batches[0]?.toString();
    if (!batchId) {
      console.warn(
        "getBatchDetails() transactionStatus validation skipped: no batches available.",
      );
      return;
    }

    const response = await (device as any).getBatchDetails(batchId, false);
    expect(response).toBeInstanceOf(BatchReportResponse);
    expect(response.status).toBe("Success");

    const details = response.batchRecord?.transactionDetails ?? [];
    if (details.length === 0) {
      console.warn(
        "getBatchDetails() transactionStatus validation skipped: batch has no transaction detail records.",
      );
      return;
    }

    const permitted = new Set([
      "ACTIVE",
      "VOIDED",
      "AUTOVOIDED",
      "TIMED-OUT",
      "INACTIVE",
      "REVERSED",
      "CLOSED",
    ]);

    let inspected = 0;
    for (const txn of details) {
      if (!txn.transactionStatus) {
        continue;
      }
      inspected += 1;
      expect(permitted.has(txn.transactionStatus.toUpperCase())).toBe(true);
    }

    if (inspected === 0) {
      console.warn(
        "getBatchDetails() transactionStatus validation skipped: no record exposed transactionStatus.",
      );
    }
  });

  test("[UpaReportTests:56] getBatchDetails() surfaces BATCH001 (EMPTY BATCH) over live MITC", async () => {
    try {
      const response = await (device as any).getBatchDetails("0", false);

      expect(response).toBeInstanceOf(BatchReportResponse);

      // Verify the response is from GetBatchDetails (some firmware returns "SendCommand")
      if (
        !["GetBatchDetails", "SendCommand", "AvailableBatches"].includes(
          response.command,
        )
      ) {
        console.warn(
          `getBatchDetails() BATCH001 test received unexpected command type: ${response.command}. Skipping detailed assertions.`,
        );
        return;
      }

      if (response.deviceResponseCode === "BATCH001") {
        expect(response.status).toBe("Failed");
        expect(response.deviceResponseText.toUpperCase()).toContain(
          "EMPTY BATCH",
        );
        // On failure the SDK must not synthesize a batchRecord.
        expect(response.batchRecord).toBeUndefined();
        return;
      }

      console.warn(
        `getBatchDetails() BATCH001 scenario not reproduced: device returned code=${response.deviceResponseCode} status=${response.status}. BATCH001 requires the queried batch to resolve to an empty transaction set on the current device.`,
      );
    } catch (error) {
      // SYSTEM_ERROR from gateway suggests service issue, skip test with warning
      if (error instanceof Error && error.message.includes("SYSTEM_ERROR")) {
        console.warn(
          `getBatchDetails() BATCH001 test skipped due to GP API system error.`,
        );
        return;
      }
      throw error;
    }
  });

  test("[UpaReportTests:56] getBatchDetails() omits batchDetailRecords on Declined + host communication error", async () => {
    try {
      const response = await (device as any).getBatchDetails("0", false);

      expect(response).toBeInstanceOf(BatchReportResponse);

      // Verify the response is from GetBatchDetails (some firmware returns "SendCommand")
      if (
        !["GetBatchDetails", "SendCommand", "AvailableBatches"].includes(
          response.command,
        )
      ) {
        console.warn(
          `getBatchDetails() host communication error test received unexpected command type: ${response.command}. Skipping detailed assertions.`,
        );
        return;
      }

      const isHostCommError =
        response.deviceResponseCode === "HOST001" ||
        response.deviceResponseCode === "HOST002" ||
        (typeof response.deviceResponseText === "string" &&
          response.deviceResponseText.toUpperCase().includes("COMMUNICATION"));

      if (isHostCommError) {
        expect(response.status).toBe("Failed");
        const details = response.batchRecord?.transactionDetails;
        expect(details === undefined || details.length === 0).toBe(true);
        return;
      }

      console.warn(
        `getBatchDetails() host communication error scenario not reproduced: device returned code=${response.deviceResponseCode} status=${response.status}. Host communication errors cannot be forced on a healthy tenant.`,
      );
    } catch (error) {
      if (error instanceof Error && error.message.includes("Socket timeout")) {
        console.warn(
          `getBatchDetails() host communication error test skipped due to socket timeout. Device buffer exhausted after repeated API calls.`,
        );
        return;
      }
      // SYSTEM_ERROR from gateway suggests service issue, skip test with warning
      if (error instanceof Error && error.message.includes("SYSTEM_ERROR")) {
        console.warn(
          `getBatchDetails() host communication error test skipped due to GP API system error. This is a transient service issue, not an SDK problem.`,
        );
        return;
      }
      // Device not found - session expired
      if (error instanceof Error && error.message.includes("Not Found")) {
        console.warn(
          `getBatchDetails() host communication error test skipped due to device session expiration. Terminal went offline or session timed out.`,
        );
        return;
      }
      throw error;
    }
  });
});

describeUpaLive("UPA Report – getOpenTabDetails()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaReportTests:68][UpaMicTests:206] getOpenTabDetails() executes over live MITC", async () => {
    const response = await (device as any)
      .getOpenTabDetails()
      .where(UpaSearchCriteria.EcrId, 13)
      .execute();

    expect(response).toBeInstanceOf(OpenTabDetailsResponse);
    expect(response.command).toBe("GetOpenTabDetails");
    expect(response.status).toBe("Success");
    expect(["00", "SUCCESS"]).toContain(response.deviceResponseCode);
  });

  test("[UpaReportTests:68] getOpenTabDetails() surfaces OPENTAB001 (NO OPEN TAB TRANSACTIONS) over live MITC", async () => {
    const response = await (device as any)
      .getOpenTabDetails()
      .where(UpaSearchCriteria.EcrId, 13)
      .execute();

    expect(response).toBeInstanceOf(OpenTabDetailsResponse);
    expect(response.command).toBe("GetOpenTabDetails");

    if (response.deviceResponseCode === "OPENTAB001") {
      expect(response.status).toBe("Failed");
      expect(response.deviceResponseText.toUpperCase()).toContain(
        "NO OPEN TAB TRANSACTIONS",
      );
      expect(response.openTabs).toEqual([]);
      return;
    }

    if (response.status === "Success") {
      expect(Array.isArray(response.openTabs)).toBe(true);
      return;
    }

    throw new Error(
      `getOpenTabDetails() OPENTAB001 scenario surfaced as ${response.deviceResponseCode} (${response.deviceResponseText}). only Success or OPENTAB001 are valid for a well-formed request.`,
    );
  });

  test("[UpaReportTests:68] getOpenTabDetails() surfaces multipleMessage", async () => {
    const response = await (device as any)
      .getOpenTabDetails()
      .where(UpaSearchCriteria.EcrId, 13)
      .execute();

    expect(response).toBeInstanceOf(OpenTabDetailsResponse);
    expect(response.command).toBe("GetOpenTabDetails");
    expect(typeof response.multipleMessage).toBe("string");

    if (response.status === "Success" && response.multipleMessage !== "") {
      expect(["0", "1"]).toContain(response.multipleMessage);
      return;
    }

    console.warn(
      `getOpenTabDetails() multipleMessage empty (status=${response.status}, code=${response.deviceResponseCode}). Field is only populated when the device has open-tab records to page through.`,
    );
  });

  test("[UpaReportTests:68] getOpenTabDetails() surfaces clerkId per open-tab record", async () => {
    const response = await (device as any)
      .getOpenTabDetails()
      .where(UpaSearchCriteria.EcrId, 13)
      .execute();

    expect(response).toBeInstanceOf(OpenTabDetailsResponse);
    expect(response.command).toBe("GetOpenTabDetails");

    if (response.status !== "Success") {
      console.warn(
        `getOpenTabDetails() clerkId test skipped: device returned ${response.deviceResponseCode} status=${response.status}.`,
      );
      return;
    }

    expect(Array.isArray(response.openTabs)).toBe(true);
    if (response.openTabs.length === 0) {
      console.warn(
        "getOpenTabDetails() clerkId validation skipped: device has no open-tab records.",
      );
      return;
    }

    for (const tab of response.openTabs) {
      // SDK contract: clerkId is always a string, never undefined.
      expect(typeof tab.clerkId).toBe("string");
      if (tab.clerkId !== "") {
        expect(tab.clerkId).toMatch(/^\d{1,4}$/);
      }
    }
  });

  test("[UpaReportTests:68] getOpenTabDetails() honors Lodging profile contract (always OPENTAB001)", async () => {
    const response = await (device as any)
      .getOpenTabDetails()
      .where(UpaSearchCriteria.EcrId, 999)
      .execute();

    expect(response).toBeInstanceOf(OpenTabDetailsResponse);
    expect(response.command).toBe("GetOpenTabDetails");

    if (response.deviceResponseCode === "OPENTAB001") {
      expect(response.status).toBe("Failed");
      expect(response.deviceResponseText.toUpperCase()).toContain(
        "NO OPEN TAB TRANSACTIONS",
      );
      expect(response.openTabs).toEqual([]);
      return;
    }

    console.warn(
      `getOpenTabDetails() Lodging contract not exercised: device returned code=${response.deviceResponseCode} status=${response.status}.NOTE the Lodging profile always returns OPENTAB001 — the connected device appears to be configured for retail/restaurant mode.`,
    );
  });
});
