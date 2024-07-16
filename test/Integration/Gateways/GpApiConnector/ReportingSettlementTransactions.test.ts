import {
  Channel,
  DataServiceCriteria,
  ReportingService,
  SearchCriteria,
  ServicesContainer,
  SortDirection,
  TransactionSortProperty,
  TransactionStatus,
  TransactionSummary,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";
import * as crypto from "crypto";

beforeAll(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

test("report settlement transactions by start date and end date", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const endDate: Date = new Date();
  endDate.setHours(0, 0, 0, 0);

  try {
    const response = await ReportingService.findSettlementTransactionsPaged(
      1,
      10,
    )
      .orderBy(TransactionSortProperty.TIME_CREATED, SortDirection.Desc)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.EndDate, endDate)
      .execute();

    for (const transaction of response.result) {
      expect(
        new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
      ).toBe(true);
      expect(
        new Date(transaction.transactionDate).getTime() < endDate.getTime(),
      ).toBe(true);
    }
  } catch (err) {
    console.log(err);
  }
});

test("report settlement transactions - order by time created", async () => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 25)
    .orderBy(TransactionSortProperty.TIME_CREATED, SortDirection.Asc)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  let transactionList = response.result;

  transactionList = transactionList.sort(
    (a: TransactionSummary, b: TransactionSummary) => {
      return (
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
      );
    },
  );

  for (const [index, transaction] of response.result.entries()) {
    expect(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    ).toBe(true);
  }
});

test("report settlement transactions - order by time created descending", async () => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 25)
    .orderBy(TransactionSortProperty.TIME_CREATED, SortDirection.Desc)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  let transactionList = response.result;

  transactionList = transactionList.sort(
    (a: TransactionSummary, b: TransactionSummary) => {
      return (
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
      );
    },
  );

  for (const [index, transaction] of response.result.entries()) {
    expect(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    ).toBe(true);
  }
});

test("report settlement transactions - order by status", async () => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.STATUS, SortDirection.Asc)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  let transactionList = response.result;

  transactionList = transactionList.sort(
    (a: TransactionSummary, b: TransactionSummary) => {
      return (
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
      );
    },
  );

  for (const [index, transaction] of response.result.entries()) {
    expect(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    ).toBe(true);
  }
});

test("report settlement transactions - order by status descending", async () => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.STATUS, SortDirection.Desc)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  let transactionList = response.result;

  transactionList = transactionList.sort(
    (a: TransactionSummary, b: TransactionSummary) => {
      return (
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
      );
    },
  );

  for (const [index, transaction] of response.result.entries()) {
    expect(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    ).toBe(true);
  }
});

test("report settlement transactions - order by type", async () => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  let transactionList = response.result;

  transactionList = transactionList.sort(
    (a: TransactionSummary, b: TransactionSummary) => {
      return (
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
      );
    },
  );

  for (const [index, transaction] of response.result.entries()) {
    expect(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    ).toBe(true);
  }
});

test("report settlement transactions - order by type descending", async () => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Desc)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  let transactionList = response.result;

  transactionList = transactionList.sort(
    (a: TransactionSummary, b: TransactionSummary) => {
      return (
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
      );
    },
  );

  for (const [index, transaction] of response.result.entries()) {
    expect(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    ).toBe(true);
  }
});

test("report settlement transactions - order by depositId ascending", async () => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.DEPOSIT_ID, SortDirection.Asc)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  let transactionList = response.result;

  transactionList = transactionList.sort(
    (a: TransactionSummary, b: TransactionSummary) => {
      return (
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
      );
    },
  );

  for (const [index, transaction] of response.result.entries()) {
    expect(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    ).toBe(true);
  }
});

test("report settlement transactions - order by depositId descending", async () => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.DEPOSIT_ID, SortDirection.Desc)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  let transactionList = response.result;

  transactionList = transactionList.sort(
    (a: TransactionSummary, b: TransactionSummary) => {
      return (
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
      );
    },
  );

  for (const [index, transaction] of response.result.entries()) {
    expect(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    ).toBe(true);
  }
});

test("report settlement transactions - filter by ARN", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const arn = "24137550037630153798573";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.AquirerReferenceNumber, arn)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(transaction.aquirerReferenceNumber).toBe(arn);
  }
});

test("report settlement transactions - filter by invalid ARN", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const arn = "00000010037624410827527";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.AquirerReferenceNumber, arn)
    .execute();

  expect(response.result.length).toBe(0);
});

test("report settlement transactions - filter by CardNumber First 6 and Last 4", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const firstSix = "543458";
  const lastFour = "7652";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.CardNumberFirstSix, firstSix)
    .andWith(SearchCriteria.CardNumberLastFour, lastFour)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(
      transaction.maskedCardNumber.startsWith(firstSix) &&
        transaction.maskedCardNumber.endsWith(lastFour),
    ).toBe(true);
  }
});

test("report settlement transactions - filter by card brand", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const cardBrand = "MASTERCARD";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.CardBrand, cardBrand)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(transaction.cardType).toBe(cardBrand);
  }
});

test("report settlement transactions - filter by invalid card brand", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const cardBrand = "MIT";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.CardBrand, cardBrand)
    .execute();

  expect(response.result.length).toBe(0);
});

test("report settlement transactions - filter by Deposit Status", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const depositStatus = "SPLIT_FUNDING";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.DepositStatus, depositStatus)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(transaction.depositStatus).toBe(depositStatus);
  }
});

test("report settlement transactions - filter by Brand Reference", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const brandReference = "MCF1CZ5ME5405";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.BrandReference, brandReference)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(transaction.brandReference).toBe(brandReference);
  }
});

test("report settlement transactions - filter by invalid Brand Reference", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const brandReference = "MCF1CZ5ME5001";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.BrandReference, brandReference)
    .execute();

  expect(response.result.length).toBe(0);
});

test("report settlement transactions - filter by CardBrand and AuthCode", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const cardBrand = "MASTERCARD";
  const authCode = "028010";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.CardBrand, cardBrand)
    .andWith(SearchCriteria.AuthCode, authCode)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(transaction.cardType).toBe(cardBrand);
    expect(transaction.authCode).toBe(authCode);
  }
});

test("report settlement transactions - filter by Reference", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const reference = "50080513769";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.ReferenceNumber, reference)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(transaction.referenceNumber).toBe(reference);
  }
});

test("report settlement transactions - filter by random Reference", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.ReferenceNumber, crypto.randomUUID())
    .execute();

  expect(response.result.length).toBe(0);
});

test("report settlement transactions - filter by Status", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.TransactionStatus, TransactionStatus.FUNDED)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(transaction.transactionStatus).toBe(TransactionStatus.FUNDED);
  }
});

test("report settlement transactions - filter by Deposit Reference", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const depositReference = "DEP_2342423429";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(DataServiceCriteria.DepositReference, depositReference)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(transaction.depositReference).toBe(depositReference);
  }
});

test("report settlement transactions - filter by FromDepositTimeCreated and ToDepositTimeCreated", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();
  const reference = "50080513769";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(DataServiceCriteria.StartDepositDate, startDate)
    .andWith(DataServiceCriteria.EndDepositDate, endDate)
    .andWith(SearchCriteria.ReferenceNumber, reference)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() < endDate.getTime(),
    ).toBe(true);
    expect(transaction.referenceNumber).toBe(reference);
  }
});

test("report settlement transactions - filter by FromBatchTimeCreated and ToBatchTimeCreated", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(DataServiceCriteria.StartBatchDate, startDate)
    .andWith(DataServiceCriteria.EndBatchDate, endDate)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() < endDate.getTime(),
    ).toBe(true);
  }
});

test("report settlement transactions - filter by MerchantId and SystemHierarchy", async () => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();

  const systemMid = "101023947262";
  const systemHierarchy = "055-70-024-011-019";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(DataServiceCriteria.MerchantId, systemMid)
    .andWith(DataServiceCriteria.SystemHierarchy, systemHierarchy)
    .execute();

  expect(response.result?.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(transaction instanceof TransactionSummary).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() < endDate.getTime(),
    ).toBe(true);

    expect(transaction.merchantId).toBe(systemMid);
    expect(transaction.merchantHierarchy).toBe(systemHierarchy);
  }
});

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());
