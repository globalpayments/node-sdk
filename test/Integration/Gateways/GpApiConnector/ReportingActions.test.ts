import {
  ActionMetadata,
  ActionPagedResult,
  ActionSortProperty,
  ActionSummary,
  BuilderError,
  Channel,
  CreditCardData,
  GatewayError,
  GpApiMapping,
  Logger,
  ReportBuilder,
  ReportType,
  ReportingService,
  SampleRequestLogger,
  SearchCriteria,
  ServicesContainer,
  SortDirection,
  TransactionSummary,
} from "../../../../src";
import { GpApiReportRequestBuilder } from "../../../../src/Builders/RequestBuilder/GpApi/GpApiReportRequestBuilder";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

const ACTION_ID_PATTERN = /^ACT_/;
const dayOf = (date: Date) => date.toISOString().split("T")[0];

describe("GP-API actions - request and response mapping (offline)", () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  // buildRequest is typed for transaction reports only.
  const buildRequest = (builder: unknown) =>
    new GpApiReportRequestBuilder().buildRequest(
      builder as ReportBuilder<TransactionSummary>,
      config,
    );

  test("GET /actions sends every documented query parameter", () => {
    const builder = ReportingService.findActionsPaged(2, 25).orderBy(
      ActionSortProperty.TimeCreated,
      SortDirection.Asc,
    );
    builder
      .where(SearchCriteria.ActionId, "ACT_id")
      .andWith(SearchCriteria.ActionType, "AUTHORIZE")
      .andWith(SearchCriteria.Resource, "TRANSACTIONS")
      .andWith(SearchCriteria.ResourceStatus, "CAPTURED")
      .andWith(SearchCriteria.ResourceId, "TRN_id")
      .andWith(SearchCriteria.StartDate, new Date("2026-05-01T00:00:00Z"))
      .andWith(SearchCriteria.EndDate, new Date("2026-06-01T00:00:00Z"))
      .andWith(SearchCriteria.MerchantName, "Sandbox_merchant_2")
      .andWith(SearchCriteria.AccountName, "transaction_processing")
      .andWith(SearchCriteria.AppName, "my_app")
      .andWith(SearchCriteria.Version, "2021-03-22")
      .andWith(SearchCriteria.ResponseCode, "SUCCESS")
      .andWith(SearchCriteria.HttpResponseCode, "200");

    const request = buildRequest(builder);

    expect(request.httpVerb).toBe("GET");
    expect(request.endpoint).toBe("/actions");
    expect(request.queryParams).toEqual({
      page: 2,
      page_size: 25,
      order_by: "TIME_CREATED",
      order: "ASC",
      id: "ACT_id",
      type: "AUTHORIZE",
      resource: "TRANSACTIONS",
      resource_status: "CAPTURED",
      resource_id: "TRN_id",
      from_time_created: "2026-05-01",
      to_time_created: "2026-06-01",
      merchant_name: "Sandbox_merchant_2",
      account_name: "transaction_processing",
      app_name: "my_app",
      version: "2021-03-22",
      response_code: "SUCCESS",
      http_response_code: "200",
    });
  });

  test("GET /actions/{id} targets the action", () => {
    const request = buildRequest(ReportingService.actionDetail("ACT_abc123"));

    expect(request.httpVerb).toBe("GET");
    expect(request.endpoint).toBe("/actions/ACT_abc123");
  });

  test("maps every field of an action list response", () => {
    const listItem = {
      id: "ACT_item",
      type: "AUTHORIZE",
      time_created: "2026-10-19T08:48:20.545Z",
      time_last_updated: "2026-10-19T08:49:20.545Z",
      resource: "TRANSACTIONS",
      resource_id: "TRN_item",
      resource_status: "CAPTURED",
      version: "2021-03-22",
      http_response_code: "200",
      response_code: "SUCCESS",
      app_id: "app_id",
      app_name: "app_name",
      merchant_id: "MER_item",
      merchant_name: "merchant_name",
      account_id: "TRA_item",
      account_name: "transaction_processing",
    };

    const page = GpApiMapping.mapReportResponse(
      {
        total_record_count: 1000,
        current_page_size: 1,
        merchant_id: "MER_list",
        merchant_name: "list_merchant",
        filter: {
          type: "AUTHORIZE",
          from_time_created: "2026-09-19T00:00:00.000Z",
          to_time_created: "2026-10-19T23:59:59.999Z",
        },
        paging: {
          page: 3,
          page_size: 1,
          order_by: "TIME_CREATED",
          order: "ASC",
        },
        actions: [listItem],
        action: {
          id: "ACT_list",
          type: "ACTION_LIST",
          time_created: "2026-10-19T08:47:32.313Z",
          result_code: "SUCCESS",
          app_id: "list_app_id",
          app_name: "list_app_name",
        },
      },
      ReportType.FindActionsPaged,
    ) as unknown as ActionPagedResult;

    expect(page).toBeInstanceOf(ActionPagedResult);
    expect(page.totalRecordCount).toBe(1000);
    expect(page.currentPageSize).toBe(1);
    expect(page.page).toBe(3);
    expect(page.pageSize).toBe(1);
    expect(page.order).toBe("ASC");
    expect(page.orderBy).toBe("TIME_CREATED");
    expect(page.merchantId).toBe("MER_list");
    expect(page.merchantName).toBe("list_merchant");
    expect(page.fromTimeCreated).toBe("2026-09-19T00:00:00.000Z");
    expect(page.toTimeCreated).toBe("2026-10-19T23:59:59.999Z");
    expect(page.filter?.type).toBe("AUTHORIZE");
    expect(page.action).toBeInstanceOf(ActionMetadata);
    expect(page.action).toMatchObject({
      id: "ACT_list",
      type: "ACTION_LIST",
      resultCode: "SUCCESS",
      appId: "list_app_id",
      appName: "list_app_name",
    });
    expect(page.action?.timeCreated).toEqual(
      new Date("2026-10-19T08:47:32.313Z"),
    );

    expect(page.result).toHaveLength(1);
    const item = page.result[0];
    expect(item).toBeInstanceOf(ActionSummary);
    expect(item).toMatchObject({
      id: "ACT_item",
      type: "AUTHORIZE",
      resource: "TRANSACTIONS",
      resourceId: "TRN_item",
      resourceStatus: "CAPTURED",
      version: "2021-03-22",
      httpResponseCode: "200",
      responseCode: "SUCCESS",
      appId: "app_id",
      appName: "app_name",
      merchantId: "MER_item",
      merchantName: "merchant_name",
      accountId: "TRA_item",
      accountName: "transaction_processing",
    });
    expect(item.timeCreated).toEqual(new Date("2026-10-19T08:48:20.545Z"));
    expect(item.timeLastUpdated).toEqual(new Date("2026-10-19T08:49:20.545Z"));
  });

  test("sends page, page_size, order_by and order for an ascending list", () => {
    const request = buildRequest(
      ReportingService.findActionsPaged(1, 20).orderBy(
        ActionSortProperty.TimeCreated,
        SortDirection.Asc,
      ),
    );

    expect(request.endpoint).toBe("/actions");
    expect(request.queryParams).toMatchObject({
      page: 1,
      page_size: 20,
      order_by: "TIME_CREATED",
      order: "ASC",
    });
  });

  test("maps sandbox actions that leave fields empty", () => {
    const base = {
      time_last_updated: "",
      version: "2021-03-22",
      http_response_code: "200",
      response_code: "SUCCESS",
      merchant_id: "MER_7e3e2c7df34f42819b3edee31022ee3f",
      merchant_name: "Sandbox_merchant_3",
    };
    const page = GpApiMapping.mapReportResponse(
      {
        total_record_count: 1208937,
        current_page_size: 3,
        merchant_id: "MER_7e3e2c7df34f42819b3edee31022ee3f",
        merchant_name: "Sandbox_merchant_3",
        filter: {
          from_time_created: "2026-09-19T00:00:00.000Z",
          to_time_created: "2026-10-19T23:59:59.999Z",
        },
        paging: {
          page_size: 20,
          page: 1,
          order: "ASC",
          order_by: "TIME_CREATED",
        },
        actions: [
          {
            ...base,
            id: "ACT_LrRVOOCcIIxZkFgDnnavz6sWkWAII9",
            type: "CREATE_TOKEN",
            time_created: "2026-09-19T00:00:02.336Z",
            resource: "ACCESS_TOKENS",
            resource_id: "",
            resource_status: "",
            app_id: "dRSylRXRrA5Xv6CIFe9RHIovfZqt52H8",
            app_name: "travauxexpress_sandbox",
            account_id: "",
            account_name: "",
          },
          {
            ...base,
            id: "ACT_mgniv5xGmoYutosFkbyDysO1Qh5s2H",
            type: "PAYER_CREATE",
            time_created: "2026-09-19T00:00:03.977Z",
            resource: "PAYERS",
            resource_id: "PYR_b9790690d4984d2d8228643af6663511",
            resource_status: "SUCCESS",
            app_id: "dRSylRXRrA5Xv6CIFe9RHIovfZqt52H8",
            app_name: "travauxexpress_sandbox",
            account_id: "TKA_b3a46f0f351f43cfad20acf5c32fea50",
            account_name: "tokenization",
          },
          {
            ...base,
            id: "ACT_kn5H7OGmqCx1gGCbHxfmxlEF8IwuHk",
            type: "TRANSACTION_SINGLE",
            time_created: "2026-09-19T00:00:07.253Z",
            resource: "TRANSACTIONS",
            resource_id: "TRN_95AGLYKqCqazkdEMVOt28IeKuIKele_317054653871",
            resource_status: "",
            app_id: "ButG2hexSYMgZsxqh9GFmGW3YreKVQd6",
            app_name: "samsung_polska_test",
            account_id: "TRA_e30e4de8bb3e44dda8df87c74868587c",
            account_name: "dcc_p",
          },
        ],
        action: {
          id: "ACT_0QbpS5tMB4VWpPeD8ICAwezeo69nMU",
          type: "ACTION_LIST",
          time_created: "2026-10-19T09:55:40.093Z",
          result_code: "SUCCESS",
          app_id: "4gPqnGBkppGYvoE5UX9EWQlotTxGUDbs",
          app_name: "SDK_TESTING_APP",
        },
      },
      ReportType.FindActionsPaged,
    ) as unknown as ActionPagedResult;

    expect(page.totalRecordCount).toBe(1208937);
    expect(page.currentPageSize).toBe(3);
    expect(page.pageSize).toBe(20);
    expect(page.order).toBe("ASC");
    expect(page.result.map((action) => action.type)).toEqual([
      "CREATE_TOKEN",
      "PAYER_CREATE",
      "TRANSACTION_SINGLE",
    ]);

    const [token, payer, transaction] = page.result;
    expect(token).toMatchObject({
      resource: "ACCESS_TOKENS",
      resourceId: "",
      resourceStatus: "",
      accountId: "",
      accountName: "",
      appName: "travauxexpress_sandbox",
      responseCode: "SUCCESS",
    });
    expect(token.timeLastUpdated).toBeUndefined();
    expect(payer).toMatchObject({
      resourceStatus: "SUCCESS",
      accountName: "tokenization",
    });
    expect(transaction).toMatchObject({
      resourceId: "TRN_95AGLYKqCqazkdEMVOt28IeKuIKele_317054653871",
      resourceStatus: "",
      accountId: "TRA_e30e4de8bb3e44dda8df87c74868587c",
      accountName: "dcc_p",
    });
    expect(page.action?.type).toBe("ACTION_LIST");
  });

  test("maps an empty action list", () => {
    const page = GpApiMapping.mapReportResponse(
      {
        total_record_count: 0,
        current_page_size: 0,
        paging: {
          page: 1,
          page_size: 5,
          order_by: "TIME_CREATED",
          order: "ASC",
        },
      },
      ReportType.FindActionsPaged,
    ) as unknown as ActionPagedResult;

    expect(page.result).toEqual([]);
    expect(page.currentPageSize).toBe(0);
    expect(page.action).toBeUndefined();
  });

  test("maps every field of a single action using the documented names", () => {
    const summary = GpApiMapping.mapReportResponse(
      {
        id: "ACT_single",
        type: "MERCHANT_EDIT",
        time_created: "2026-10-19T08:48:20.545Z",
        resource: "MERCHANTS",
        resource_id: "MER_resource",
        resource_parent_id: "MER_parent",
        resource_status: "ACTIVE",
        resource_request_url: "/merchants/MER_resource",
        version: "2021-03-22",
        http_response_code: "400",
        response_code: "INVALID_REQUEST_DATA",
        response_detailed_code: "40100",
        response_detailed_message: "Invalid Value",
        app_id: "app_id",
        app_name: "app_name",
        email: "dev@example.com",
        merchant_id: "MER_single",
        merchant_name: "merchant_name",
        account_id: "TRA_single",
        account_name: "transaction_processing",
        source_location: "10.0.0.1",
        destination_location: "10.0.0.2",
        message_received: "received",
        message_sent: "sent",
        metrics: "x-gp-version:2021-03-22",
        total_time_milliseconds: "927",
        total_time_downstream_milliseconds: "466",
        action: {
          id: "ACT_meta",
          type: "ACTION_SINGLE",
          result_code: "SUCCESS",
        },
      },
      ReportType.ActionDetail,
    ) as unknown as ActionSummary;

    expect(summary).toBeInstanceOf(ActionSummary);
    expect(summary).toMatchObject({
      id: "ACT_single",
      type: "MERCHANT_EDIT",
      resource: "MERCHANTS",
      resourceId: "MER_resource",
      resourceParentId: "MER_parent",
      resourceStatus: "ACTIVE",
      resourceRequestUrl: "/merchants/MER_resource",
      version: "2021-03-22",
      httpResponseCode: "400",
      responseCode: "INVALID_REQUEST_DATA",
      responseDetailedCode: "40100",
      responseDetailedMessage: "Invalid Value",
      appId: "app_id",
      appName: "app_name",
      email: "dev@example.com",
      merchantId: "MER_single",
      merchantName: "merchant_name",
      accountId: "TRA_single",
      accountName: "transaction_processing",
      sourceLocation: "10.0.0.1",
      destinationLocation: "10.0.0.2",
      messageReceived: "received",
      messageSent: "sent",
      metrics: "x-gp-version:2021-03-22",
      totalTimeMilliseconds: 927,
      totalTimeDownstreamMilliseconds: 466,
    });
    expect(summary.timeCreated).toEqual(new Date("2026-10-19T08:48:20.545Z"));
    expect(summary.action).toMatchObject({
      id: "ACT_meta",
      type: "ACTION_SINGLE",
      resultCode: "SUCCESS",
    });
  });

  test("maps the single action fields the gateway returns under other names", () => {
    const summary = GpApiMapping.mapReportResponse(
      {
        id: "ACT_live",
        time_last_updated: "",
        http_response_message: "OK",
        detailed_error_code: "40118",
        detailed_error_description: "not found",
        app_developer: "dev@example.com",
        downstream_message_received: "downstream received",
        downstream_message_sent: "downstream sent",
        metrics: { "x-gp-version": "2021-03-22" },
        total_time_milliseconds: 927,
        total_time_downstreams_milliseconds: 466,
      },
      ReportType.ActionDetail,
    ) as unknown as ActionSummary;

    expect(summary).toMatchObject({
      httpResponseMessage: "OK",
      responseDetailedCode: "40118",
      responseDetailedMessage: "not found",
      appDeveloper: "dev@example.com",
      downstreamMessageReceived: "downstream received",
      downstreamMessageSent: "downstream sent",
      metrics: { "x-gp-version": "2021-03-22" },
      totalTimeMilliseconds: 927,
      totalTimeDownstreamMilliseconds: 466,
    });
    expect(summary.timeLastUpdated).toBeUndefined();
    expect(summary.action).toBeUndefined();
  });
});

describe("GP-API actions - sandbox", () => {
  let reference: ActionSummary;

  beforeAll(async () => {
    const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
    config.requestLogger = new SampleRequestLogger(new Logger("logs"));
    ServicesContainer.configureService(config);

    // Charging a card creates a transaction action with every field populated.
    const date = new Date();
    const card = new CreditCardData();
    card.number = "4263970000005262";
    card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    card.expYear = (date.getFullYear() + 1).toString();
    card.cvn = "131";
    card.cardHolderName = "James Mason";
    const transaction = await card.charge(10).withCurrency("USD").execute();
    expect(transaction.responseCode).toBe("SUCCESS");

    // The action can take a moment to become searchable.
    let found: ActionSummary | undefined;
    for (let attempt = 0; attempt < 10 && !found; attempt++) {
      if (attempt > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      const actions = await ReportingService.findActionsPaged(1, 10)
        .where(SearchCriteria.ResourceId, transaction.transactionId)
        .execute();
      found = actions.result[0];
    }
    if (!found) {
      throw new Error(
        `No action found for transaction ${transaction.transactionId}.`,
      );
    }
    reference = found;
  });

  afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());

  test("get actions returns every response field", async () => {
    const response = await ReportingService.findActionsPaged(1, 5)
      .orderBy(ActionSortProperty.TimeCreated, SortDirection.Desc)
      .execute();

    expect(response).toBeInstanceOf(ActionPagedResult);
    expect(response.page).toBe(1);
    expect(response.pageSize).toBe(5);
    expect(response.order).toBe(SortDirection.Desc);
    expect(response.orderBy).toBe(ActionSortProperty.TimeCreated);
    expect(response.totalRecordCount).toBeGreaterThan(0);
    expect(response.result).toHaveLength(5);
    expect(response.currentPageSize).toBe(response.result.length);
    expect(response.merchantId).toMatch(/^MER_/);
    expect(response.merchantName).toBeTruthy();
    expect(response.fromTimeCreated).toBeTruthy();
    expect(response.toTimeCreated).toBeTruthy();
    expect(response.filter).toMatchObject({
      from_time_created: response.fromTimeCreated,
      to_time_created: response.toTimeCreated,
    });
    expect(response.action).toBeInstanceOf(ActionMetadata);
    expect(response.action?.id).toMatch(ACTION_ID_PATTERN);
    expect(response.action?.type).toBe("ACTION_LIST");
    expect(response.action?.resultCode).toBe("SUCCESS");
    expect(response.action?.timeCreated).toBeInstanceOf(Date);
    expect(response.action?.appId).toBe(BaseGpApiTestConfig.appId);
    expect(response.action?.appName).toBeTruthy();

    for (const action of response.result) {
      expect(action).toBeInstanceOf(ActionSummary);
      expect(action.id).toMatch(ACTION_ID_PATTERN);
      expect(action.type).toBeTruthy();
      expect(action.timeCreated).toBeInstanceOf(Date);
      // Other tenants' actions can leave these empty, so only check they are returned.
      for (const field of [
        action.resource,
        action.version,
        action.httpResponseCode,
        action.responseCode,
        action.appId,
        action.appName,
      ]) {
        expect(field).toBeTruthy();
      }
      expect(action.merchantId).toBe(response.merchantId);
      expect(action.merchantName).toBe(response.merchantName);
    }
  });

  test("get actions pages through the result set", async () => {
    const first = await ReportingService.findActionsPaged(1, 3).execute();
    const second = await ReportingService.findActionsPaged(2, 3).execute();

    expect(first.page).toBe(1);
    expect(second.page).toBe(2);
    expect(second.result).toHaveLength(3);
    const firstIds = first.result.map((action) => action.id);
    for (const action of second.result) {
      expect(firstIds).not.toContain(action.id);
    }
  });

  test.each([
    [SortDirection.Asc, 1],
    [SortDirection.Desc, -1],
  ])("get actions ordered %s by time created", async (direction, sign) => {
    const response = await ReportingService.findActionsPaged(1, 20)
      .orderBy(ActionSortProperty.TimeCreated, direction)
      .execute();

    expect(response.order).toBe(direction);
    expect(response.result.length).toBeGreaterThan(1);
    const times = response.result.map((action) =>
      (action.timeCreated as Date).getTime(),
    );
    for (let i = 1; i < times.length; i++) {
      expect((times[i] - times[i - 1]) * sign).toBeGreaterThanOrEqual(0);
    }
  });

  test.each<[string, SearchCriteria, keyof ActionSummary]>([
    ["id", SearchCriteria.ActionId, "id"],
    ["type", SearchCriteria.ActionType, "type"],
    ["resource", SearchCriteria.Resource, "resource"],
    ["resource status", SearchCriteria.ResourceStatus, "resourceStatus"],
    ["resource id", SearchCriteria.ResourceId, "resourceId"],
    ["merchant name", SearchCriteria.MerchantName, "merchantName"],
    ["account name", SearchCriteria.AccountName, "accountName"],
    ["app name", SearchCriteria.AppName, "appName"],
    ["version", SearchCriteria.Version, "version"],
    ["response code", SearchCriteria.ResponseCode, "responseCode"],
    ["http response code", SearchCriteria.HttpResponseCode, "httpResponseCode"],
  ])("get actions filtered by %s", async (_label, criteria, field) => {
    const value = reference[field] as string;

    const response = await ReportingService.findActionsPaged(1, 20)
      .where(criteria, value)
      .execute();

    expect(response.result.length).toBeGreaterThan(0);
    for (const action of response.result) {
      expect(action[field]).toBe(value);
    }
    expect(Object.values(response.filter ?? {})).toContain(value);
  });

  test("get actions filtered by every field at once", async () => {
    const response = await ReportingService.findActionsPaged(1, 20)
      .where(SearchCriteria.ActionId, reference.id)
      .andWith(SearchCriteria.ActionType, reference.type)
      .andWith(SearchCriteria.Resource, reference.resource)
      .andWith(SearchCriteria.ResourceStatus, reference.resourceStatus)
      .andWith(SearchCriteria.ResourceId, reference.resourceId)
      .andWith(SearchCriteria.MerchantName, reference.merchantName)
      .andWith(SearchCriteria.AccountName, reference.accountName)
      .andWith(SearchCriteria.AppName, reference.appName)
      .andWith(SearchCriteria.Version, reference.version)
      .andWith(SearchCriteria.ResponseCode, reference.responseCode)
      .andWith(SearchCriteria.HttpResponseCode, reference.httpResponseCode)
      .execute();

    expect(response.result).toHaveLength(1);
    expect(response.result[0].id).toBe(reference.id);
  });

  test("get actions within a date range", async () => {
    const created = reference.timeCreated as Date;
    const day = new Date(
      Date.UTC(
        created.getUTCFullYear(),
        created.getUTCMonth(),
        created.getUTCDate(),
      ),
    );

    const response = await ReportingService.findActionsPaged(1, 20)
      .where(SearchCriteria.StartDate, day)
      .andWith(SearchCriteria.EndDate, day)
      .execute();

    expect(response.result.length).toBeGreaterThan(0);
    expect(response.fromTimeCreated?.startsWith(dayOf(day))).toBe(true);
    expect(response.toTimeCreated?.startsWith(dayOf(day))).toBe(true);
    for (const action of response.result) {
      expect(dayOf(action.timeCreated as Date)).toBe(dayOf(day));
    }
  });

  test("get actions with no match returns an empty page", async () => {
    const byType = await ReportingService.findActionsPaged(1, 5)
      .where(SearchCriteria.ActionType, "NO_SUCH_ACTION_TYPE")
      .execute();
    const future = await ReportingService.findActionsPaged(1, 5)
      .where(SearchCriteria.StartDate, new Date("2099-01-01T00:00:00Z"))
      .andWith(SearchCriteria.EndDate, new Date("2099-01-02T00:00:00Z"))
      .execute();

    for (const response of [byType, future]) {
      expect(response.result).toEqual([]);
      expect(response.currentPageSize).toBe(0);
      expect(response.totalRecordCount).toBeNull();
    }
  });

  test("get actions rejects a page size above 1000", async () => {
    const error = await ReportingService.findActionsPaged(1, 1001)
      .execute()
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(GatewayError);
    expect((error as GatewayError).responseCode).toBe("40101");
    expect((error as GatewayError).message).toContain("page_size");
  });

  test("get actions rejects an unknown sort property", async () => {
    const error = await ReportingService.findActionsPaged(1, 5)
      .orderBy("NO_SUCH_PROPERTY" as ActionSortProperty)
      .execute()
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(GatewayError);
    expect((error as GatewayError).responseCode).toBe("40102");
  });

  test("get action returns every response field", async () => {
    // The ID comes from the list call above, as a merchant would use it.
    const response = await ReportingService.actionDetail(
      reference.id as string,
    ).execute();

    expect(response).toBeInstanceOf(ActionSummary);
    expect(response.id).toBe(reference.id);
    expect(response.type).toBe(reference.type);
    expect(response.timeCreated).toEqual(reference.timeCreated);
    expect(response.timeLastUpdated).toBeUndefined();
    expect(response.resource).toBe(reference.resource);
    expect(response.resourceId).toBe(reference.resourceId);
    expect(response.resourceParentId).toBeTruthy();
    expect(response.resourceStatus).toBe(reference.resourceStatus);
    expect(response.resourceRequestUrl).toBeTruthy();
    expect(response.version).toBe(reference.version);
    expect(response.httpResponseCode).toBe(reference.httpResponseCode);
    expect(response.httpResponseMessage).toBeTruthy();
    expect(response.responseCode).toBe(reference.responseCode);
    expect(response.responseDetailedCode).toBeDefined();
    expect(response.responseDetailedMessage).toBeDefined();
    expect(response.appId).toBe(reference.appId);
    expect(response.appName).toBe(reference.appName);
    expect(response.appDeveloper).toBeTruthy();
    expect(response.merchantId).toBe(reference.merchantId);
    expect(response.merchantName).toBe(reference.merchantName);
    expect(response.accountId).toBe(reference.accountId);
    expect(response.accountName).toBe(reference.accountName);
    expect(response.sourceLocation).toBeTruthy();
    expect(response.destinationLocation).toBeTruthy();
    expect(response.messageReceived).toBeTruthy();
    expect(response.messageSent).toBeTruthy();
    expect(response.downstreamMessageReceived).toBeTruthy();
    expect(response.downstreamMessageSent).toBeTruthy();
    expect(typeof response.metrics).toBe("object");
    expect(response.totalTimeMilliseconds).toBeGreaterThan(0);
    expect(response.totalTimeDownstreamMilliseconds).toBeGreaterThan(0);
    expect(response.action).toBeInstanceOf(ActionMetadata);
    expect(response.action?.id).toMatch(ACTION_ID_PATTERN);
    expect(response.action?.type).toBe("ACTION_SINGLE");
    expect(response.action?.resultCode).toBe("SUCCESS");
    expect(response.action?.timeCreated).toBeInstanceOf(Date);
    expect(response.action?.appId).toBe(BaseGpApiTestConfig.appId);
    expect(response.action?.appName).toBeTruthy();
  });

  test("get action rejects an unknown action ID", async () => {
    const error = await ReportingService.actionDetail("ACT_000000000000")
      .execute()
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(GatewayError);
    expect((error as GatewayError).responseCode).toBe("40118");
    expect((error as GatewayError).message).toContain("not found");
  });

  test.each([[""], [undefined]])(
    "get action requires an action ID (%p)",
    (actionId) => {
      expect(() =>
        ReportingService.actionDetail(actionId as string).execute(),
      ).toThrow(BuilderError);
    },
  );
});
