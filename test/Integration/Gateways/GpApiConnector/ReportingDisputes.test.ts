import {
  BuilderError,
  CardType,
  Channel,
  DataServiceCriteria,
  DisputeDocument,
  DisputeSortProperty,
  DisputeStage,
  DisputeStatus,
  DisputeSummary,
  GatewayError,
  GenerationUtils,
  PagedResult,
  ReportingService,
  SearchCriteria,
  ServicesContainer,
  SortDirection,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

beforeAll(async () => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );

  const disputeId = "DIS_SAND_abcd1234";

  const response = await ReportingService.disputeDetail(disputeId).execute();

  expect(response).toBeTruthy();
  expect(response instanceof DisputeSummary).toBe(true);
  expect(disputeId).toBe(response.caseId);
  arn = response.transactionARN;
});

let arn: string;

const startDate: Date = new Date();
startDate.setDate(startDate.getDate() - 70);
startDate.setHours(0, 0, 0, 0);
const endDate: Date = new Date();
startDate.setDate(startDate.getDate() - 3);

endDate.setHours(0, 0, 0, 0);

test("report dispute detail - wrong id", async () => {
  const disputeId = "DIS_SAND_aaaa1111";

  try {
    await ReportingService.disputeDetail(disputeId).execute();
  } catch (e) {
    expect(e).toBeTruthy();
    expect(e instanceof GatewayError).toBe(true);
    expect(e.responseCode).toBe("40073");
    expect(e.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - 101,Unable to locate dispute record for that ID. Please recheck the ID provided.",
    );
  }
});

test("report find disputes by arn", async () => {
  const disputes = await ReportingService.findDisputesPaged(1, 10)
    .where(SearchCriteria.AquirerReferenceNumber, arn)
    .execute();

  expect(disputes).toBeTruthy();
  expect(
    disputes.result.filter(
      (dispute: DisputeSummary) => dispute.transactionARN !== arn,
    ).length === 0,
  ).toBe(true);
});

test("report find disputes by arn - not found", async () => {
  const arn = "874091790340471";

  try {
    await ReportingService.findDisputesPaged(1, 10)
      .where(SearchCriteria.AquirerReferenceNumber, arn)
      .execute();
  } catch (e) {
    expect(e).toBeTruthy();
    expect(e instanceof GatewayError).toBe(true);
    expect(e.responseCode).toBe("40048");
    expect(e.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - 105,Unable to locate dispute record for arn. Please recheck thevalue provided for arn.",
    );
  }
});

test("report find disputes by brand", async () => {
  const cardBrand = "VISA";
  const disputes = await ReportingService.findDisputesPaged(1, 10)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(SearchCriteria.CardBrand, cardBrand)
    .execute();

  expect(disputes).toBeTruthy();
  expect(
    disputes.result.filter(
      (dispute: DisputeSummary) => dispute.transactionCardType !== cardBrand,
    ).length === 0,
  ).toBe(true);
});

test("report find disputes by status", async () => {
  await Promise.all(
    ["UNDER_REVIEW", "WITH_MERCHANT", "CLOSED"].map(async (status) => {
      const disputes = await ReportingService.findDisputesPaged(1, 10)
        .where(DataServiceCriteria.StartStageDate, startDate)
        .andWith(SearchCriteria.DisputeStatus, status)
        .execute();
      expect(disputes).toBeTruthy();
      expect(
        disputes.result.filter(
          (dispute: DisputeSummary) => dispute.caseStatus !== status,
        ).length === 0,
      ).toBe(true);
    }),
  );
});

test("report find disputes by stage", async () => {
  const disputeStage = DisputeStage.Chargeback;
  const disputes = await ReportingService.findDisputesPaged(1, 10)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(SearchCriteria.DisputeStage, disputeStage)
    .execute();

  expect(disputes).toBeTruthy();
  expect(
    disputes.result.filter(
      (dispute: DisputeSummary) => dispute.caseStage !== disputeStage,
    ).length === 0,
  ).toBe(true);
});

test("report find disputes by merchantId and SystemHierarchy", async () => {
  const merchantId = "8593872";
  const systemHierarchy = "111-23-099-002-005";
  const disputes = await ReportingService.findDisputesPaged(1, 10)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.MerchantId, merchantId)
    .andWith(DataServiceCriteria.SystemHierarchy, systemHierarchy)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);
  expect(
    disputes.result.filter(
      (dispute: DisputeSummary) =>
        dispute.caseMerchantId !== merchantId ||
        dispute.merchantHierarchy !== systemHierarchy,
    ).length === 0,
  ).toBe(true);
});

test("report find disputes by from and to stage time created", async () => {
  const disputes = await ReportingService.findDisputesPaged(1, 10)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.EndStageDate, endDate)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);
  expect(
    disputes.result.filter(
      (dispute: DisputeSummary) =>
        new Date(dispute.caseIdTime).getTime() < startDate.getTime() ||
        new Date(dispute.caseIdTime).getTime() > endDate.getTime(),
    ).length === 0,
  ).toBe(true);
});

test("report find disputes order by id", async () => {
  const disputes = await ReportingService.findDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Desc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .execute();

  expect(disputes).toBeTruthy();

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) =>
      Number(a.caseId) - Number(b.caseId),
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
  }
});

test("report find disputes order by ARN", async () => {
  const disputes = await ReportingService.findDisputesPaged(1, 25)
    .orderBy(DisputeSortProperty.Arn, SortDirection.Desc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.EndStageDate, endDate)
    .execute();

  expect(disputes).toBeTruthy();

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) =>
      Number(a.transactionARN) - Number(b.transactionARN),
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
  }
});

test("report find disputes order by brand", async () => {
  const disputes = await ReportingService.findDisputesPaged(1, 25)
    .orderBy(DisputeSortProperty.Brand, SortDirection.Desc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.EndStageDate, endDate)
    .execute();

  expect(disputes).toBeTruthy();

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) =>
      a.transactionARN < b.transactionARN,
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
  }
});

test("report find disputes order by status", async () => {
  const disputes = await ReportingService.findDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Status, SortDirection.Desc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.EndStageDate, endDate)
    .execute();

  expect(disputes).toBeTruthy();

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) => a.caseStatus < b.caseStatus,
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
  }
});

test("report find disputes order by stage", async () => {
  const disputes = await ReportingService.findDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Stage, SortDirection.Desc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .execute();

  expect(disputes).toBeTruthy();

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) => a.caseStage < b.caseStage,
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
  }
});

test("report find disputes order by id with brand visa", async () => {
  const disputes = await ReportingService.findDisputesPaged(1, 30)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(SearchCriteria.CardBrand, CardType.VISA)
    .execute();

  expect(disputes).toBeTruthy();

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) => a.caseId < b.caseId,
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
    expect(dispute.transactionCardType).toBe(CardType.VISA);
  }
});

test("report find disputes order by Id with stage chargeback", async () => {
  const disputes = await ReportingService.findDisputesPaged(1, 30)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(SearchCriteria.DisputeStage, DisputeStage.Chargeback)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) => a.caseStage < b.caseStage,
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
    expect(dispute.caseStage).toBe(DisputeStage.Chargeback);
  }
});

test("report find document associated with dispute", async () => {
  const disputeId = "DIS_SAND_abcd1235";
  const documentId = "DOC_MyEvidence_234234AVCDE-1";

  const response = await ReportingService.documentDisputeDetail(disputeId)
    .where(SearchCriteria.DisputeDocumentId, documentId)
    .execute();

  expect(response).toBeTruthy();
  expect(response instanceof DisputeDocument).toBe(true);
  expect(response.id).toBe(documentId);
  expect(response.b64Content).toBeTruthy();
});

test("report find document associated with dispute - random dispute id", async () => {
  const disputeId = GenerationUtils.getGuuid();
  const documentId = "DOC_MyEvidence_234234AVCDE-1";

  try {
    await ReportingService.documentDisputeDetail(disputeId)
      .where(SearchCriteria.DisputeDocumentId, documentId)
      .execute();
  } catch (e) {
    expect(e).toBeTruthy();
    expect(e.responseCode).toBe("40073");
    expect(e.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - 101,Unable to locate dispute record for that ID. Please recheck the ID provided.",
    );
    expect(e instanceof GatewayError).toBe(true);
  }
});

test("report find document associated with dispute - random document id", async () => {
  const documentId = GenerationUtils.getGuuid();
  const disputeId = "DIS_SAND_abcd1235";

  try {
    await ReportingService.documentDisputeDetail(disputeId)
      .where(SearchCriteria.DisputeDocumentId, documentId)
      .execute();
  } catch (e) {
    expect(e).toBeTruthy();
    expect(e.responseCode).toBe("40071");
    expect(e.message).toBe(
      "Status Code: MANDATORY_DATA_MISSING - 128,No document found, please recheck the values provided",
    );
    expect(e instanceof GatewayError).toBe(true);
  }
});

test("report find document associated with dispute - missing document id", async () => {
  const disputeId = "DIS_SAND_abcd1235";

  try {
    await ReportingService.documentDisputeDetail(disputeId).execute();
  } catch (e) {
    expect(e).toBeTruthy();
    expect(
      e.message.includes(
        "disputeDocumentId cannot be null for this transaction type.",
      ),
    ).toBe(true);
    expect(e instanceof BuilderError).toBe(true);
  }
});

test("report find document associated with dispute - empty dispute id", async () => {
  const documentId = "DOC_MyEvidence_234234AVCDE-1";
  const disputeId = null;

  try {
    await ReportingService.documentDisputeDetail(disputeId)
      .where(SearchCriteria.DisputeDocumentId, documentId)
      .execute();
  } catch (e) {
    expect(e).toBeTruthy();
    expect(
      e.message.includes("disputeId cannot be null for this transaction type."),
    ).toBe(true);
    expect(e instanceof BuilderError).toBe(true);
  }
});

test("report settlement dispute detail", async () => {
  const settlementDisputeId = "DIS_810";

  // eslint-disable-next-line prettier/prettier
  const response = await ReportingService.settlementDisputeDetail(
    // eslint-disable-next-line prettier/prettier
    settlementDisputeId,
  ).execute();

  expect(response).toBeTruthy();
  expect(response instanceof DisputeSummary).toBe(true);
  expect(response.caseId).toBe(settlementDisputeId);
});

test("report settlement dispute detail - wrong id", async () => {
  const settlementDisputeId = "DIS_010";

  try {
    await ReportingService.settlementDisputeDetail(
      settlementDisputeId,
    ).execute();
  } catch (e) {
    expect(e).toBeTruthy();
    expect(e.responseCode).toBe("40118");
    expect(e.message).toBe(
      "Status Code: RESOURCE_NOT_FOUND - Disputes DIS_010 not found at this /ucp/settlement/disputes/DIS_010",
    );
  }
});

test("report settlement dispute order by id with status funded", async () => {
  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartDepositDate, startDate)
    .andWith(SearchCriteria.DisputeStatus, DisputeStatus.SettleDisputeFunded)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) => a.caseStage < b.caseStage,
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
    expect(dispute.caseStatus).toBe(DisputeStatus.SettleDisputeFunded);
  }
});
test("report settlement dispute order by id", async () => {
  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartDepositDate, startDate)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) => a.caseStage < b.caseStage,
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
  }
});

test("report settlement dispute order by ARN", async () => {
  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Arn, SortDirection.Asc)
    .where(DataServiceCriteria.StartDepositDate, startDate)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) => a.caseStage < b.caseStage,
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
  }
});

test("report settlement dispute order by brand", async () => {
  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Brand, SortDirection.Asc)
    .where(DataServiceCriteria.StartDepositDate, startDate)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) =>
      a.transactionCardType < b.transactionCardType,
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
  }
});

test("report settlement dispute order by stage", async () => {
  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Stage, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  let disputeList = disputes.result;

  disputeList = disputeList.sort(
    (a: DisputeSummary, b: DisputeSummary) => a.caseStage < b.caseStage,
  );

  for (const [index, dispute] of disputes.result.entries()) {
    expect(JSON.stringify(dispute) === JSON.stringify(disputeList[index])).toBe(
      true,
    );
  }
});

test("report settlement dispute filter by arn", async () => {
  const arn = "74500010037624410827759";

  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(SearchCriteria.AquirerReferenceNumber, arn)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  for (const dispute of disputes.result) {
    expect(dispute.transactionARN).toBe(arn);
  }
});

test("report settlement dispute filter by arn not found", async () => {
  const arn = "00000010037624410827111";

  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(SearchCriteria.AquirerReferenceNumber, arn)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);
  expect(disputes.result.length).toBe(0);
});

test("report settlement dispute filter by brand", async () => {
  const brand = "VISA";

  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(SearchCriteria.CardBrand, brand)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  for (const dispute of disputes.result) {
    expect(dispute.transactionCardType).toBe(brand);
  }
});

test("report settlement dispute filter by brand not found", async () => {
  const brand = "MASTERCAR";

  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(SearchCriteria.CardBrand, brand)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  for (const dispute of disputes.result) {
    expect(dispute.transactionCardType).toBe(brand);
  }
});

test("report settlement dispute filter by stage", async () => {
  const stage = DisputeStage.Chargeback;

  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(SearchCriteria.DisputeStage, stage)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  for (const dispute of disputes.result) {
    expect(dispute.caseStage).toBe(stage);
  }
});

test("report settlement dispute filter by from and to stage time created", async () => {
  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.EndStageDate, endDate)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  for (const dispute of disputes.result) {
    expect(dispute.caseIdTime.getTime() <= endDate.getTime()).toBe(true);
  }
});

test("report settlement dispute filter by system mid and hierarchy", async () => {
  const systemMId = "101023947262";
  const systemHierarchy = "055-70-024-011-019";
  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.MerchantId, systemMId)
    .andWith(DataServiceCriteria.SystemHierarchy, systemHierarchy)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  for (const dispute of disputes.result) {
    expect(dispute.merchantHierarchy).toBe(systemHierarchy);
    expect(dispute.caseMerchantId).toBe(systemMId);
  }
});

test("report settlement dispute filter by wrong system hierarchy ", async () => {
  const systemHierarchy = "000-70-024-011-111";
  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.SystemHierarchy, systemHierarchy)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);
  expect(disputes.result.length === 0).toBe(true);
});

test("report settlement dispute filter by wrong systemMId", async () => {
  const systemMid = "000023947222";
  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .orderBy(DisputeSortProperty.Id, SortDirection.Asc)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.MerchantId, systemMid)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);
  expect(disputes.result.length === 0).toBe(true);
});

test("report settlement dispute filter by deposit id", async () => {
  const depositReference = "DEP_2342423443";

  const disputes = await ReportingService.findSettlementDisputesPaged(1, 10)
    .where(DataServiceCriteria.StartStageDate, startDate)
    .andWith(DataServiceCriteria.DepositReference, depositReference)
    .execute();

  expect(disputes).toBeTruthy();
  expect(disputes instanceof PagedResult).toBe(true);

  for (const dispute of disputes.result) {
    expect(depositReference == dispute.depositReference).toBe(true);
  }
});

test("report dispute acceptance", async () => {
  const disputeId = "DIS_SAND_abcd1234";
  const dispute = await ReportingService.disputeDetail(disputeId).execute();

  const response = await dispute.accept().execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
});

test("report dispute acceptance wrong ID", async () => {
  const disputeId = "DIS_SAND_abcd1234ZZ";
  const dispute = new DisputeSummary();
  dispute.caseId = disputeId;

  try {
    await dispute.accept().execute();
  } catch (e) {
    expect(e.responseCode).toBe("40067");
    expect(e.message.includes("INVALID_DISPUTE_ACTION")).toBe(true);
  }
});

test("report dispute challenge", async () => {
  const dispute = new DisputeSummary();
  dispute.caseId = "DIS_SAND_abcd1234";
  const document = new DisputeDocument();
  document.type = "SALES_RECEIPT";
  document.b64_content = "R0lGODlhigPCAXAAACwAAAAAigPCAYf///8AQnv";

  const response = await dispute.challenge([document]).execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
});

test("report dispute challenge missing type", async () => {
  const dispute = new DisputeSummary();
  dispute.caseId = "DIS_SAND_abcd1234";
  const document = new DisputeDocument();
  document.b64_content = "R0lGODlhigPCAXAAACwAAAAAigPCAYf///8AQnv";

  const response = await dispute.challenge([document]).execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
});

test("report dispute challenge multiple documents", async () => {
  const dispute = new DisputeSummary();
  dispute.caseId = "DIS_SAND_abcd1241";

  const document = new DisputeDocument();
  document.type = "SALES_RECEIPT";
  document.b64_content = "R0lGODlhigPCAXAAACwAAAAAigPCAYf///8AQnv";

  const document2 = new DisputeDocument();
  document2.type = "SALES_RECEIPT";
  document2.b64_content = "R0lGODlhigPCAXAAACwAAAAAigPCAYf///8AQnv";

  const response = await dispute.challenge([document, document2]).execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
});

test("report dispute challenge multiple documents - closed status", async () => {
  const dispute = new DisputeSummary();
  dispute.caseId = "DIS_SAND_abcd1234";

  const document = new DisputeDocument();
  document.type = "SALES_RECEIPT";
  document.b64_content = "R0lGODlhigPCAXAAACwAAAAAigPCAYf///8AQnv";

  const document2 = new DisputeDocument();
  document2.type = "SALES_RECEIPT";
  document2.b64_content = "R0lGODlhigPCAXAAACwAAAAAigPCAYf///8AQnv";

  try {
    await dispute.challenge([document, document2]).execute();
  } catch (e) {
    expect(e.responseCode).toBe("40072");
    expect(e.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - 131,The dispute stage, Retrieval, can be challenged with a single document only. Please correct the request and resubmit",
    );
  }
});

test("report dispute challenge missing document", async () => {
  const dispute = new DisputeSummary();
  dispute.caseId = "DIS_SAND_abcd1234";
  const document = new DisputeDocument();

  try {
    await dispute.challenge([document]).execute();
  } catch (e) {
    expect(e.responseCode).toBe("40065");
    expect(e.message).toBe(
      "Status Code: MANDATORY_DATA_MISSING - Unable to challenge as No document provided with the request",
    );
  }
});

test("report dispute challenge wrong Id", async () => {
  const dispute = new DisputeSummary();
  dispute.caseId = "DIS_SAND_aaaa0000";
  const document = new DisputeDocument();
  document.type = "SALES_RECEIPT";
  document.b64_content = "R0lGODlhigPCAXAAACwAAAAAigPCAYf///8AQnv";

  try {
    await dispute.challenge([document]).execute();
  } catch (e) {
    expect(e.responseCode).toBe("40060");
    expect(e.message.includes("INVALID_DISPUTE_ACTION")).toBe(true);
  }
});

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());
