import test from "ava";
import {
  Channel,
  DataServiceCriteria,
  DepositSortProperty,
  DepositSummary,
  GatewayError,
  GenerationUtils,
  ReportingService,
  SearchCriteria,
  ServicesContainer,
  SortDirection,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../../test/Data/BaseGpApiTestConfig";

const startDate = new Date(),
  endDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 1);
startDate.setHours(0);
startDate.setMinutes(0);
startDate.setSeconds(0);

endDate.setDate(endDate.getDate() - 1);
endDate.setHours(0);
endDate.setMinutes(0);
endDate.setSeconds(0);

let depositSummary: DepositSummary = new DepositSummary();

test.before(async () => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
  const response = await ReportingService.findDepositsPaged(1, 1)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Asc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, endDate)
    .execute();

  if (response.result.length === 1) {
    depositSummary = response.result.pop();
  }
});

test.after(() => BaseGpApiTestConfig.resetGpApiConfig());

test("report deposit detail", async (t) => {
  const depositId = depositSummary.depositId || "DEP_2342423443";

  try {
    const response = await ReportingService.depositDetail(depositId).execute();
    t.truthy(response);
    t.true(response instanceof DepositSummary);
    t.is(depositId, response.depositId);
  } catch (e) {
    console.log(e);
    t.true(e.message.includes("Deposit detail failed with"));
  }
});

test("report deposit detail - wrong id", async (t) => {
  const depositId = "DEP_0000000001";

  const error = await t.throwsAsync(
    async () => await ReportingService.depositDetail(depositId).execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40118");
  t.true(
    error?.message.includes(
      `Status Code: RESOURCE_NOT_FOUND - Deposits ${depositId} not found at this /ucp/settlement/deposits/${depositId}`,
    ),
  );
});

test("report find deposits by startDate and order by time created", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
  t.true(startDate.getTime() <= new Date(randomDeposit.depositDate).getTime());
});

test("report find deposits order by deposit id", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.DepositId, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
});

test("report find deposits order by status", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.Status, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
});

test("report find deposits order by type", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.Type, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
});

test("report find deposits with end date", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, endDate)
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
});

test("report find deposits by not found amount", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(DataServiceCriteria.Amount, 1)
    .execute();

  t.truthy(response);
  t.true(response.result.length === 0);
});

test("report find deposits by amount", async (t) => {
  const amount = depositSummary?.amount || 100;

  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(DataServiceCriteria.Amount, amount)
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
  t.true(
    response.result
      .map((deposit: DepositSummary) => deposit.amount)
      .filter((depositAmount: string) => Number(depositAmount) != amount)
      .length === 0,
  );
});

test("report find deposits filter by deposit status", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.DepositStatus, "SPLIT_FUNDING")
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
  t.true(startDate.getTime() <= new Date(randomDeposit.depositDate).getTime());
  t.is(randomDeposit.status, "SPLIT FUNDING");
});

test("report find deposits filter by masked account number last4", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.AccountNumberLastFour, "9999")
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
  t.true(startDate.getTime() <= new Date(randomDeposit.depositDate).getTime());
});

test("report find deposits filter by system hierarchy", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(DataServiceCriteria.SystemHierarchy, "055-70-024-011-019")
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
  t.true(startDate.getTime() <= new Date(randomDeposit.depositDate).getTime());
});

test("report find deposits filter by wrong system hierarchy", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(DataServiceCriteria.SystemHierarchy, "042-70-013-011-018")
    .execute();

  t.truthy(response);
  t.true(response.result.length == 0);
});

test("report find deposits filter by random uuid system hierarchy", async (t) => {
  const error = await t.throwsAsync(
    async () => {
      await ReportingService.findDepositsPaged(1, 10)
        .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
        .where(DataServiceCriteria.SystemHierarchy, GenerationUtils.getGuuid())
        .execute();
    },
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(
    error?.message,
    `Status Code: INVALID_REQUEST_DATA - Invalid Value provided in the input field - system.hierarchy`,
  );
  t.is(error?.responseCode, "40105");
});

test("report find deposits filter by merchant id", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(DataServiceCriteria.MerchantId, "101023947262")
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
  t.true(startDate.getTime() <= new Date(randomDeposit.depositDate).getTime());
});

test("report find deposits filter by wrong merchant id", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(DataServiceCriteria.MerchantId, "000023985843")
    .execute();

  t.truthy(response);
  t.true(response.result.length == 0);
});

test("report find deposits filter by deposit id", async (t) => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .withDepositId("DEP_2342423440")
    .execute();

  t.truthy(response);
  t.true(response.result.length !== 0);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  t.truthy(randomDeposit);
  t.true(randomDeposit instanceof DepositSummary);
  t.true(startDate.getTime() <= new Date(randomDeposit.depositDate).getTime());
});
