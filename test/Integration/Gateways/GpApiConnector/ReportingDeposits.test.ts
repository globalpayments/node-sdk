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
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

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

beforeAll(async () => {
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

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());

test("report deposit detail", async () => {
  const depositId = depositSummary.depositId || "DEP_2342423443";

  try {
    const response = await ReportingService.depositDetail(depositId).execute();
    expect(response).toBeTruthy();
    expect(response instanceof DepositSummary).toBe(true);
    expect(depositId).toBe(response.depositId);
  } catch (e) {
    console.log(e);
    expect(e.message.includes("Deposit detail failed with")).toBe(true);
  }
});

test("report deposit detail - wrong id", async () => {
  const depositId = "DEP_0000000001";

  try {
    await ReportingService.depositDetail(depositId).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40118");
    expect(
      error?.message.includes(
        `Status Code: RESOURCE_NOT_FOUND - Deposits ${depositId} not found at this /ucp/settlement/deposits/${depositId}`,
      ),
    ).toBe(true);
    expect(error).toBeInstanceOf(GatewayError);
  }
});

test("report find deposits by startDate and order by time created", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
  expect(
    startDate.getTime() <= new Date(randomDeposit.depositDate).getTime(),
  ).toBe(true);
});

test("report find deposits order by deposit id", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.DepositId, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
});

test("report find deposits order by status", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.Status, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
});

test("report find deposits order by type", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.Type, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
});

test("report find deposits with end date", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, endDate)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
});

test("report find deposits by not found amount", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(DataServiceCriteria.Amount, 1)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length === 0).toBe(true);
});

test("report find deposits by amount", async () => {
  const amount = depositSummary?.amount || 100;

  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(DataServiceCriteria.Amount, amount)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
  expect(
    response.result
      .map((deposit: DepositSummary) => deposit.amount)
      .filter((depositAmount: string) => Number(depositAmount) != amount)
      .length === 0,
  ).toBe(true);
});

test("report find deposits filter by deposit status", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.DepositStatus, "SPLIT_FUNDING")
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
  expect(
    startDate.getTime() <= new Date(randomDeposit.depositDate).getTime(),
  ).toBe(true);
  expect(randomDeposit.status).toBe("SPLIT FUNDING");
});

test("report find deposits filter by masked account number last4", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(SearchCriteria.AccountNumberLastFour, "9999")
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
  expect(
    startDate.getTime() <= new Date(randomDeposit.depositDate).getTime(),
  ).toBe(true);
});

test("report find deposits filter by system hierarchy", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(DataServiceCriteria.SystemHierarchy, "055-70-024-011-019")
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
  expect(
    startDate.getTime() <= new Date(randomDeposit.depositDate).getTime(),
  ).toBe(true);
});

test("report find deposits filter by wrong system hierarchy", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(DataServiceCriteria.SystemHierarchy, "042-70-013-011-018")
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length == 0).toBe(true);
});

test("report find deposits filter by random uuid system hierarchy", async () => {
  try {
    await ReportingService.findDepositsPaged(1, 10)
      .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
      .where(DataServiceCriteria.SystemHierarchy, GenerationUtils.getGuuid())
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      `Status Code: INVALID_REQUEST_DATA - Invalid Value provided in the input field - system.hierarchy`,
    );
    expect(error?.responseCode).toBe("40105");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

test("report find deposits filter by merchant id", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(DataServiceCriteria.MerchantId, "101023947262")
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
  expect(
    startDate.getTime() <= new Date(randomDeposit.depositDate).getTime(),
  ).toBe(true);
});

test("report find deposits filter by wrong merchant id", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .where(DataServiceCriteria.MerchantId, "000023985843")
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length == 0).toBe(true);
});

test("report find deposits filter by deposit id", async () => {
  const response = await ReportingService.findDepositsPaged(1, 10)
    .orderBy(DepositSortProperty.TimeCreated, SortDirection.Desc)
    .withDepositId("DEP_2342423440")
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length !== 0).toBe(true);

  const randomDeposit =
    response.result[Math.round(Math.random() * (response.result.length - 1))];

  expect(randomDeposit).toBeTruthy();
  expect(randomDeposit instanceof DepositSummary).toBe(true);
  expect(
    startDate.getTime() <= new Date(randomDeposit.depositDate).getTime(),
  ).toBe(true);
});
