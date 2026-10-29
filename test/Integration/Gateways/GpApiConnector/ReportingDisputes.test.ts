import {
  AccessTokenInfo,
  Channel,
  DataServiceCriteria,
  DisputeDocument,
  DisputeStatus,
  DisputeSummary,
  Environment,
  GatewayError,
  GenerationUtils,
  GpApiConfig,
  Logger,
  PagedResult,
  ReportingService,
  SampleRequestLogger,
  SearchCriteria,
  ServicesContainer,
  Transaction,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

// Live sandbox tests for the GP-API disputes endpoints:
// List Disputes, Get a Dispute, Download Document, Challenge, Accept.
// Read-only tests run by default. Accept and Challenge change dispute state in
// the sandbox, so they run only when GPAPI_DISPUTES_MUTATING=true.

const SAMPLE_DOCUMENT_B64 = "R0lGODlhigPCAXAAACwAAAAAigPCAYf///8AQnv";
const SANDBOX_DISPUTE_ID = "DIS_SAND_abcd1234";
const INVALID_TOKEN_CONFIG = "invalid-token";
const describeMutating =
  process.env.GPAPI_DISPUTES_MUTATING === "true" ? describe : describe.skip;

beforeAll(() => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));
  ServicesContainer.configureService(config);

  // No appId/appKey, so the SDK cannot re-authenticate after the 401.
  const invalidTokenConfig = new GpApiConfig();
  invalidTokenConfig.environment = Environment.Test;
  invalidTokenConfig.channel = Channel.CardNotPresent;
  invalidTokenConfig.country = "US";
  invalidTokenConfig.accessTokenInfo = new AccessTokenInfo();
  invalidTokenConfig.accessTokenInfo.accessToken = "invalid_access_token";
  invalidTokenConfig.requestLogger = config.requestLogger;
  ServicesContainer.configureService(invalidTokenConfig, INVALID_TOKEN_CONFIG);
});

afterAll(() => {
  ServicesContainer.removeConfiguration(INVALID_TOKEN_CONFIG);
});

const startDate: Date = new Date();
startDate.setDate(startDate.getDate() - 70);
startDate.setHours(0, 0, 0, 0);
const endDate: Date = new Date();
endDate.setHours(23, 59, 59, 999);

const pageSize = 25;
const details = new Map<string, DisputeSummary>();
let listed: DisputeSummary[] | undefined;

const missingDisputeId = () => `DIS_SAND_${GenerationUtils.getGuuid()}`;
const missingDocumentId = () => `DOC_${GenerationUtils.getGuuid()}`;

function findDisputes() {
  return ReportingService.findDisputesPaged(1, pageSize)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.EndStageDate, endDate);
}

async function listDisputes(): Promise<DisputeSummary[]> {
  if (listed) {
    return listed;
  }
  const result = await findDisputes().execute();
  expect(result).toBeInstanceOf(PagedResult);
  expect(result.action?.resultCode).toBe("SUCCESS");
  for (const item of result.result) {
    expect(item).toBeInstanceOf(DisputeSummary);
    expect(item.caseId).toBeTruthy();
  }
  if (!result.result.length) {
    throw new Error(
      `No disputes between ${startDate.toISOString()} and ${endDate.toISOString()}. Seed a sandbox dispute for this account and rerun.`,
    );
  }
  const records: DisputeSummary[] = result.result;
  listed = records;
  return records;
}

async function detailOf(record: DisputeSummary): Promise<DisputeSummary> {
  if (!details.has(record.caseId)) {
    const detail = await ReportingService.disputeDetail(
      record.caseId,
    ).execute();
    expect(detail).toBeInstanceOf(DisputeSummary);
    expect(detail.caseId).toBe(record.caseId);
    details.set(record.caseId, detail);
  }
  return details.get(record.caseId)!;
}

async function valueOf<K extends keyof DisputeSummary>(
  record: DisputeSummary,
  field: K,
): Promise<DisputeSummary[K]> {
  if (record[field]) {
    return record[field];
  }
  return (await detailOf(record))[field];
}

function documentOf(type: string | undefined): DisputeDocument {
  const document = new DisputeDocument();
  if (type) {
    document.type = type;
  }
  document.b64Content = SAMPLE_DOCUMENT_B64;
  return document;
}

function disputeFor(caseId: string): DisputeSummary {
  const dispute = new DisputeSummary();
  dispute.caseId = caseId;
  return dispute;
}

function expectSuccess(response: Transaction, status: DisputeStatus): void {
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(status);
}

describe("List Disputes", () => {
  test("lists disputes in the stage-date window", async () => {
    const records = await listDisputes();
    expect(records.length).toBeGreaterThan(0);
  });

  test("lists disputes filtered by acquirer_code", async () => {
    const [source] = await listDisputes();
    const acquirerCode = await valueOf(source, "acquirerCode");
    expect(acquirerCode).toBeTruthy();

    const result = await findDisputes()
      .andWith(SearchCriteria.AcquirerCode, acquirerCode)
      .execute();

    expect(result.action?.resultCode).toBe("SUCCESS");
    expect(result.result.length).toBeGreaterThan(0);
    for (const record of result.result) {
      expect(await valueOf(record, "acquirerCode")).toBe(acquirerCode);
    }
  });

  test("lists disputes filtered by order.reference", async () => {
    const [source] = await listDisputes();
    const orderReference = await valueOf(source, "transactionOrderId");
    expect(orderReference).toBeTruthy();

    const result = await findDisputes()
      .andWith(SearchCriteria.OrderReference, orderReference)
      .execute();

    expect(result.action?.resultCode).toBe("SUCCESS");
    expect(result.result.length).toBeGreaterThan(0);
    for (const record of result.result) {
      expect(await valueOf(record, "transactionOrderId")).toBe(orderReference);
    }
  });

  test("lists disputes filtered by acquirer_code and order.reference", async () => {
    const [source] = await listDisputes();
    const acquirerCode = await valueOf(source, "acquirerCode");
    const orderReference = await valueOf(source, "transactionOrderId");

    const result = await findDisputes()
      .andWith(SearchCriteria.AcquirerCode, acquirerCode)
      .andWith(SearchCriteria.OrderReference, orderReference)
      .execute();

    expect(result.action?.resultCode).toBe("SUCCESS");
    expect(result.result.length).toBeGreaterThan(0);
    for (const record of result.result) {
      expect(await valueOf(record, "acquirerCode")).toBe(acquirerCode);
      expect(await valueOf(record, "transactionOrderId")).toBe(orderReference);
    }
  });
});

describe("Get a Dispute", () => {
  test("gets a dispute by id", async () => {
    const [source] = await listDisputes();
    const response = await ReportingService.disputeDetail(
      source.caseId,
    ).execute();

    expect(response).toBeInstanceOf(DisputeSummary);
    expect(response.caseId).toBe(source.caseId);
    expect(response.action?.resultCode).toBe("SUCCESS");
  });
});

describe("Download Document", () => {
  async function documentFixture(): Promise<{
    caseId: string;
    documentId: string;
  }> {
    for (const record of await listDisputes()) {
      const detail = await detailOf(record);
      const document = detail.documents?.find((item) => item.id);
      if (document) {
        return { caseId: detail.caseId, documentId: document.id };
      }
    }
    throw new Error(
      "No dispute with a downloadable document in the stage-date window. Seed a sandbox dispute with a document and rerun.",
    );
  }

  test("downloads a document for a dispute", async () => {
    const { caseId, documentId } = await documentFixture();

    const response = await ReportingService.documentDisputeDetail(caseId)
      .withDisputeDocumentId(documentId)
      .execute();

    expect(response).toBeInstanceOf(DisputeDocument);
    expect(response.id).toBe(documentId);
    expect(response.b64Content).toBeTruthy();
    expect(response.b64_content).toBe(response.b64Content);
  });
});

describeMutating("Challenge a Dispute", () => {
  test("challenges a dispute with a single document", async () => {
    const SANDBOX_DISPUTE_ID_single = "DIS_SAND_abcd1235";
    const response = await disputeFor(SANDBOX_DISPUTE_ID_single)
      .challenge([documentOf("SALES_RECEIPT")])
      .execute();

    expectSuccess(response, DisputeStatus.UnderReview);
  });

  test("challenges a dispute with multiple documents", async () => {
    const SANDBOX_MULTI_DOCUMENT_DISPUTEID = "DIS_SAND_abcd1234";
    const response = await disputeFor(SANDBOX_MULTI_DOCUMENT_DISPUTEID)
      .challenge([documentOf("SALES_RECEIPT")])
      .execute();
    expect(response.responseCode).toBe("SUCCESS");
  });

  test("accepts a document without a type", async () => {
    const response = await disputeFor(SANDBOX_DISPUTE_ID)
      .challenge([documentOf(undefined)])
      .execute();

    expectSuccess(response, DisputeStatus.Closed);
  });
});

describeMutating("Accept a Dispute", () => {
  test("accepts a dispute", async () => {
    const response = await disputeFor(SANDBOX_DISPUTE_ID).accept().execute();

    expectSuccess(response, DisputeStatus.Closed);
  });
});

// Sandbox answers unknown ids and malformed payloads with 502/50046, so those assert GatewayError only.
describe("Negative cases", () => {
  const expectGatewayError = (
    request: Promise<unknown>,
    responseCode?: string,
  ) =>
    expect(request).rejects.toMatchObject({
      name: GatewayError.name,
      ...(responseCode && { responseCode }),
    });

  describe("invalid access token", () => {
    const expectNotAuthenticated = (request: Promise<unknown>) =>
      expect(request).rejects.toMatchObject({
        name: GatewayError.name,
        responseCode: "40001",
        message: expect.stringContaining("NOT_AUTHENTICATED"),
      });

    test("List Disputes returns 401", async () => {
      await expectNotAuthenticated(
        findDisputes().execute(INVALID_TOKEN_CONFIG),
      );
    });

    test("Get a Dispute returns 401", async () => {
      await expectNotAuthenticated(
        ReportingService.disputeDetail(SANDBOX_DISPUTE_ID).execute(
          INVALID_TOKEN_CONFIG,
        ),
      );
    });

    test("Download Document returns 401", async () => {
      await expectNotAuthenticated(
        ReportingService.documentDisputeDetail(SANDBOX_DISPUTE_ID)
          .withDisputeDocumentId(missingDocumentId())
          .execute(INVALID_TOKEN_CONFIG),
      );
    });

    test("Challenge a Dispute returns 401", async () => {
      await expectNotAuthenticated(
        disputeFor(SANDBOX_DISPUTE_ID)
          .challenge([documentOf("SALES_RECEIPT")])
          .execute(INVALID_TOKEN_CONFIG),
      );
    });

    test("Accept a Dispute returns 401", async () => {
      await expectNotAuthenticated(
        disputeFor(SANDBOX_DISPUTE_ID).accept().execute(INVALID_TOKEN_CONFIG),
      );
    });
  });

  describe("List Disputes validation", () => {
    test("rejects a negative page", async () => {
      await expectGatewayError(
        ReportingService.findDisputesPaged(-1, pageSize)
          .where(DataServiceCriteria.StartStageDate, startDate)
          .andWith(DataServiceCriteria.EndStageDate, endDate)
          .execute(),
        "40090",
      );
    });

    test("rejects a negative page size", async () => {
      await expectGatewayError(
        ReportingService.findDisputesPaged(1, -1)
          .where(DataServiceCriteria.StartStageDate, startDate)
          .andWith(DataServiceCriteria.EndStageDate, endDate)
          .execute(),
        "40090",
      );
    });

    test("rejects a start date after the end date", async () => {
      await expectGatewayError(
        ReportingService.findDisputesPaged(1, pageSize)
          .where(DataServiceCriteria.StartStageDate, endDate)
          .andWith(DataServiceCriteria.EndStageDate, startDate)
          .execute(),
        "40090",
      );
    });
  });

  describe("unknown or malformed ids", () => {
    test("Get a Dispute rejects an unknown dispute id", async () => {
      await expectGatewayError(
        ReportingService.disputeDetail(missingDisputeId()).execute(),
      );
    });

    test("Get a Dispute rejects a malformed dispute id", async () => {
      await expectGatewayError(
        ReportingService.disputeDetail("@@bad-id@@").execute(),
      );
    });

    test("Download Document rejects an unknown dispute id", async () => {
      await expectGatewayError(
        ReportingService.documentDisputeDetail(missingDisputeId())
          .withDisputeDocumentId(missingDocumentId())
          .execute(),
      );
    });

    test("Download Document rejects an unknown document id", async () => {
      await expectGatewayError(
        ReportingService.documentDisputeDetail(SANDBOX_DISPUTE_ID)
          .withDisputeDocumentId(missingDocumentId())
          .execute(),
      );
    });

    test("Challenge a Dispute rejects an unknown dispute id", async () => {
      await expectGatewayError(
        disputeFor(missingDisputeId())
          .challenge([documentOf("SALES_RECEIPT")])
          .execute(),
      );
    });

    test("Accept a Dispute rejects an unknown dispute id", async () => {
      await expectGatewayError(
        disputeFor(missingDisputeId()).accept().execute(),
      );
    });
  });

  describe("invalid challenge payload", () => {
    test("rejects a challenge without documents", async () => {
      await expectGatewayError(
        disputeFor(SANDBOX_DISPUTE_ID).challenge([]).execute(),
      );
    });
  });
});
