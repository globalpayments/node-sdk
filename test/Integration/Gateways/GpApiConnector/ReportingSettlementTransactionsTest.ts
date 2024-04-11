import test from "ava";
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
import { BaseGpApiTestConfig } from "../../../../test/Data/BaseGpApiTestConfig";
import * as crypto from "crypto";

test.before(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

test("report settlement transactions by start date and end date", async (t) => {
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
      t.true(
        new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
      );
      t.true(
        new Date(transaction.transactionDate).getTime() < endDate.getTime(),
      );
    }
  } catch (err) {
    console.log(err);
  }
});

test("report settlement transactions - order by time created", async (t) => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 25)
    .orderBy(TransactionSortProperty.TIME_CREATED, SortDirection.Asc)
    .execute();

  t.true(response.result?.length > 0);

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
    t.true(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    );
  }
});

test("report settlement transactions - order by time created descending", async (t) => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 25)
    .orderBy(TransactionSortProperty.TIME_CREATED, SortDirection.Desc)
    .execute();

  t.true(response.result?.length > 0);

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
    t.true(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    );
  }
});

test("report settlement transactions - order by status", async (t) => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.STATUS, SortDirection.Asc)
    .execute();

  t.true(response.result?.length > 0);

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
    t.true(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    );
  }
});

test("report settlement transactions - order by status descending", async (t) => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.STATUS, SortDirection.Desc)
    .execute();

  t.true(response.result?.length > 0);

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
    t.true(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    );
  }
});

test("report settlement transactions - order by type", async (t) => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .execute();

  t.true(response.result?.length > 0);

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
    t.true(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    );
  }
});

test("report settlement transactions - order by type descending", async (t) => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Desc)
    .execute();

  t.true(response.result?.length > 0);

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
    t.true(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    );
  }
});

test("report settlement transactions - order by depositId ascending", async (t) => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.DEPOSIT_ID, SortDirection.Asc)
    .execute();

  t.true(response.result?.length > 0);

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
    t.true(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    );
  }
});

test("report settlement transactions - order by depositId descending", async (t) => {
  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.DEPOSIT_ID, SortDirection.Desc)
    .execute();

  t.true(response.result?.length > 0);

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
    t.true(
      JSON.stringify(transaction) === JSON.stringify(transactionList[index]),
    );
  }
});

test("report settlement transactions - filter by ARN", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const arn = "24137550037630153798573";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.AquirerReferenceNumber, arn)
    .execute();

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.is(transaction.aquirerReferenceNumber, arn);
  }
});

test("report settlement transactions - filter by invalid ARN", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const arn = "00000010037624410827527";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.AquirerReferenceNumber, arn)
    .execute();

  t.is(response.result.length, 0);
});

test("report settlement transactions - filter by CardNumber First 6 and Last 4", async (t) => {
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

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.true(
      transaction.maskedCardNumber.startsWith(firstSix) &&
        transaction.maskedCardNumber.endsWith(lastFour),
    );
  }
});

test("report settlement transactions - filter by card brand", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const cardBrand = "MASTERCARD";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.CardBrand, cardBrand)
    .execute();

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.is(transaction.cardType, cardBrand);
  }
});

test("report settlement transactions - filter by invalid card brand", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const cardBrand = "MIT";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.CardBrand, cardBrand)
    .execute();

  t.is(response.result.length, 0);
});

test("report settlement transactions - filter by Deposit Status", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const depositStatus = "SPLIT_FUNDING";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.DepositStatus, depositStatus)
    .execute();

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.is(transaction.depositStatus, depositStatus);
  }
});

test("report settlement transactions - filter by Brand Reference", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const brandReference = "MCF1CZ5ME5405";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.BrandReference, brandReference)
    .execute();

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.is(transaction.brandReference, brandReference);
  }
});

test("report settlement transactions - filter by invalid Brand Reference", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const brandReference = "MCF1CZ5ME5001";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.BrandReference, brandReference)
    .execute();

  t.is(response.result.length, 0);
});

test("report settlement transactions - filter by CardBrand and AuthCode", async (t) => {
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

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.is(transaction.cardType, cardBrand);
    t.is(transaction.authCode, authCode);
  }
});

test("report settlement transactions - filter by Reference", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const reference = "50080513769";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.ReferenceNumber, reference)
    .execute();

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.is(transaction.referenceNumber, reference);
  }
});

test("report settlement transactions - filter by random Reference", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.ReferenceNumber, crypto.randomUUID())
    .execute();

  t.is(response.result.length, 0);
});

test("report settlement transactions - filter by Status", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.TransactionStatus, TransactionStatus.FUNDED)
    .execute();

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.is(transaction.transactionStatus, TransactionStatus.FUNDED);
  }
});

test("report settlement transactions - filter by Deposit Reference", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const depositReference = "DEP_2342423429";

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(DataServiceCriteria.DepositReference, depositReference)
    .execute();

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.is(transaction.depositReference, depositReference);
  }
});

test("report settlement transactions - filter by FromDepositTimeCreated and ToDepositTimeCreated", async (t) => {
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

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.true(new Date(transaction.transactionDate).getTime() < endDate.getTime());
    t.is(transaction.referenceNumber, reference);
  }
});

test("report settlement transactions - filter by FromBatchTimeCreated and ToBatchTimeCreated", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();

  const response = await ReportingService.findSettlementTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE, SortDirection.Asc)
    .where(DataServiceCriteria.StartBatchDate, startDate)
    .andWith(DataServiceCriteria.EndBatchDate, endDate)
    .execute();

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.true(new Date(transaction.transactionDate).getTime() < endDate.getTime());
  }
});

test("report settlement transactions - filter by MerchantId and SystemHierarchy", async (t) => {
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

  t.true(response.result?.length > 0);

  for (const transaction of response.result) {
    t.true(transaction instanceof TransactionSummary);
    t.true(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    );
    t.true(new Date(transaction.transactionDate).getTime() < endDate.getTime());

    t.is(transaction.merchantId, systemMid);
    t.is(transaction.merchantHierarchy, systemHierarchy);
  }
});

test.after(() => BaseGpApiTestConfig.resetGpApiConfig());
