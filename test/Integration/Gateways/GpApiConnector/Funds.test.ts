import { randomUUID } from "crypto";
import {
  AccessTokenInfo,
  Channel,
  Environment,
  Fund,
  FundRequest,
  FundsList,
  FundsListFilters,
  FundsService,
  GatewayError,
  GpApiConfig,
  GpApiConnector,
  ServicesContainer,
  SampleRequestLogger,
  Logger,
} from "../../../../src";

interface FundsTestConfig extends FundRequest, FundsListFilters {
  appId: string;
  appKey: string;
  merchantId: string;
  fundId: string;
  idempotencyKey: string;
}

const fundsTestConfig: FundsTestConfig = {
  appId: "PJoqXXSANSbA8292ASpE0ChpAPrmOwqO",
  appKey: "DwUQD4kIgA9cJEKZ",
  merchantId: "MER_20c2b3fcfedd484e9c3723347db56b71",
  accountId: "FMA_99d20eb3e84d43cd98afa26467c43f64",
  fundId: "FND_Nk59LopauGDuzRIB5Hs6lISnV3oFjI",
  idempotencyKey: randomUUID(),
  type: "CREDIT",
  amount: "100",
  currency: "USD",
  paymentMethod: "BANK_TRANSFER",
  fromTimeCreated: "2026-10-28",
  toTimeCreated: "2026-12-31",
};

const describeLive =
  process.env.GPAPI_FUNDS_LIVE === "true" ? describe : describe.skip;
const testFunding =
  process.env.GPAPI_FUNDS_ALLOW_FUNDING === "true" ? test : test.skip;
const configName = "funds-live";
const sandboxUrl = "https://apis.sandbox.globalpay.com/ucp";

function createFundsConfig(): GpApiConfig {
  const config = new GpApiConfig();
  config.appId = fundsTestConfig.appId;
  config.appKey = fundsTestConfig.appKey;
  config.environment = Environment.Test;
  config.serviceUrl = sandboxUrl;
  config.channel = Channel.CardNotPresent;
  config.country = "US";
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));
  return config;
}

describeLive("GP API Funds sandbox", () => {
  let service: FundsService;
  let merchantId: string;
  let accountId: string;
  let accountName: string;
  let emptySearchDate: string;

  function expectFundScope(fund: Fund) {
    expect(fund).toBeInstanceOf(Fund);
    expect(fund.id).toMatch(/^FND_/);
    expect(fund.merchantId).toBe(merchantId);
    expect(fund.accountId).toBe(accountId);
  }

  function expectFund(fund: Fund) {
    expectFundScope(fund);
    expect(fund.amount).toMatch(/^[0-9]+$/);
    expect(fund.currency).toMatch(/^[A-Z]{3}$/);
    expect(["CREDIT", "DEBIT"]).toContain(fund.type);
    expect(["BANK_TRANSFER", "CARD"]).toContain(fund.paymentMethod);
  }

  beforeAll(async () => {
    merchantId = fundsTestConfig.merchantId;
    accountId = fundsTestConfig.accountId;
    const config = createFundsConfig();
    ServicesContainer.configureService(config, configName);
    service = new FundsService(merchantId, configName);

    const connector = ServicesContainer.instance().getClient(
      configName,
    ) as GpApiConnector;
    const account = await connector.doTransaction(
      "GET",
      `/merchants/${encodeURIComponent(
        merchantId,
      )}/accounts/${encodeURIComponent(accountId)}`,
    );
    expect(account.id).toBe(accountId);
    expect(account.type).toBe("FUND_MANAGEMENT");
    expect(typeof account.name).toBe("string");
    expect(account.name.length).toBeGreaterThan(0);
    if (account.merchant_id) {
      expect(account.merchant_id).toBe(merchantId);
    }
    accountName = account.name;
    const beforeCreation = new Date(account.time_created);
    beforeCreation.setUTCDate(beforeCreation.getUTCDate() - 1);
    emptySearchDate = beforeCreation.toISOString().slice(0, 10);
  }, 60000);

  afterAll(() => ServicesContainer.removeConfiguration(configName));

  test("list funds without filters, independently of funding", async () => {
    const result = await service.listFunds(accountId);
    expect(result).toBeInstanceOf(FundsList);
    expect(result.accountId).toBeTruthy();
    expect(result.merchantId).toBe(merchantId);
    expect(result.currentPageSize).toBe(result.funds.length);
    expect(result.action?.resultCode).toBe("SUCCESS");
    if (result.totalRecordCount !== undefined) {
      expect(result.totalRecordCount).toBeGreaterThanOrEqual(
        result.funds.length,
      );
    }
    if (result.paging) {
      expect(result.paging.page).toBeGreaterThanOrEqual(1);
      expect(result.paging.pageSize).toBeGreaterThanOrEqual(
        result.funds.length,
      );
      expect(["ASC", "DESC"]).toContain(result.paging.order);
      expect(result.paging.orderBy).toBeTruthy();
    }
    result.funds.forEach(expectFundScope);
  }, 60000);

  test("list funds with the configured date range", async () => {
    const today = new Date().toISOString().slice(0, 10);
    const fromTimeCreated = fundsTestConfig.fromTimeCreated || today;
    const toTimeCreated = fundsTestConfig.toTimeCreated || today;
    const result = await service.listFunds(accountId, {
      fromTimeCreated,
      toTimeCreated,
    });
    expect(result.merchantId).toBe(merchantId);
    expect(result.filter?.fromTimeCreated?.slice(0, 10)).toBe(fromTimeCreated);
    expect(result.filter?.toTimeCreated?.slice(0, 10)).toBe(toTimeCreated);
    expect(result.action?.resultCode).toBe("SUCCESS");
    result.funds.forEach(expectFundScope);
  }, 60000);

  test("get an existing fund without creating a new funding event", async () => {
    const fundId =
      fundsTestConfig.fundId ||
      (await service.listFunds(accountId)).funds[0]?.id;
    if (!fundId) {
      throw new Error(
        "No existing fund is available. Set fundsTestConfig.fundId to a fund belonging to this FMA.",
      );
    }
    const fund = await service.getFund(fundId);
    expectFund(fund);
    expect(fund.id).toBe(fundId);
    expect(fund.action?.resultCode).toBe("SUCCESS");
    expect(Number.isFinite(Date.parse(fund.timeCreated))).toBe(true);
    expect(Number.isFinite(Date.parse(fund.timeLastUpdated))).toBe(true);
    expect(fund.accountName).toBe(accountName);
    expect(fund.merchantName).toBeTruthy();
    expect(fund.provider?.result).toBeTruthy();
    expect(fund.actionCreateId).toBeTruthy();
    expect(fund.action?.id).toBeTruthy();
  }, 60000);

  test("list returns an empty result for a range before this FMA existed", async () => {
    const result = await service.listFunds(accountId, {
      fromTimeCreated: emptySearchDate,
      toTimeCreated: emptySearchDate,
    });
    expect(result).toBeInstanceOf(FundsList);
    expect(result.merchantId).toBe(merchantId);
    expect(result.funds).toEqual([]);
    expect(result.currentPageSize).toBe(0);
    if (result.totalRecordCount !== undefined) {
      expect(result.totalRecordCount).toBe(0);
    }
    expect(result.action?.resultCode).toBe("SUCCESS");
  }, 60000);

  test("list rejects dates outside the gateway's two-year search window", async () => {
    await expect(
      service.listFunds(accountId, {
        fromTimeCreated: "2000-01-01",
        toTimeCreated: "2000-01-02",
      }),
    ).rejects.toMatchObject({
      name: "GatewayError",
      message: expect.stringMatching(/INVALID_REQUEST_DATA.*2 years/),
    });
  }, 60000);

  test("list for a nonexistent FMA returns a gateway error", async () => {
    const missingAccountId = `FMA_${randomUUID().replace(/-/g, "")}`;
    await expect(service.listFunds(missingAccountId)).rejects.toBeInstanceOf(
      GatewayError,
    );
  }, 60000);

  test("get with an invalid access token returns an authentication error", async () => {
    const invalidConfigName = "funds-invalid-token";
    const config = new GpApiConfig();
    config.environment = Environment.Test;
    config.serviceUrl = sandboxUrl;
    config.accessTokenInfo = new AccessTokenInfo();
    config.accessTokenInfo.accessToken = "invalid_access_token";
    config.requestLogger = new SampleRequestLogger(new Logger("logs"));
    ServicesContainer.configureService(config, invalidConfigName);
    try {
      const unauthorized = new FundsService(merchantId, invalidConfigName);
      await expect(
        unauthorized.getFund(fundsTestConfig.fundId),
      ).rejects.toMatchObject({
        name: "GatewayError",
        message: expect.stringMatching(/NOT_AUTHENTICATED|401/),
      });
    } finally {
      ServicesContainer.removeConfiguration(invalidConfigName);
    }
  }, 60000);

  test("get a nonexistent fund returns a gateway error", async () => {
    await expect(
      service.getFund("FND_00000000000000000000000000000000"),
    ).rejects.toBeInstanceOf(GatewayError);
  }, 60000);

  testFunding.each([
    {
      type: "CREDIT",
      paymentMethod: "BANK_TRANSFER",
      idempotencyKey: fundsTestConfig.idempotencyKey,
    },
    {
      type: "DEBIT",
      paymentMethod: "BANK_TRANSFER",
      idempotencyKey: randomUUID(),
    },
    { type: "DEBIT", paymentMethod: "CARD", idempotencyKey: randomUUID() },
  ] as const)(
    "$type via $paymentMethod funds the verified FMA",
    async ({ type, paymentMethod, idempotencyKey }) => {
      const { amount, currency } = fundsTestConfig;
      const fund = await service.fund(
        { accountId, accountName, type, paymentMethod, amount, currency },
        idempotencyKey,
      );
      expectFund(fund);
      expect(fund).toMatchObject({
        type,
        amount,
        currency,
        accountName,
        status: "CAPTURED",
      });
      expect(fund.action?.resultCode).toBe("SUCCESS");
    },
    60000,
  );
});
