import test from "ava";
import {
  Channel,
  CreditCardData,
  GatewayError,
  GenerationUtils,
  ReportingService,
  SearchCriteria,
  ServicesContainer,
  SortDirection,
  StoredPaymentMethodSortProperty,
  StoredPaymentMethodSummary,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../../test/Data/BaseGpApiTestConfig";

const date = new Date();
const card = new CreditCardData();
card.number = "4263970000005262";
card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
card.expYear = (date.getFullYear() + 1).toString();
card.cvn = "131";
card.cardHolderName = "James Mason";

test.before(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

test.after(() => BaseGpApiTestConfig.resetGpApiConfig());

test("find stored payment method by start date and end date", async (t) => {
  const startDate = new Date(),
    endDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  endDate.setDate(endDate.getDate() - 3);

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Desc)
    .where(
      SearchCriteria.StartDate,
      `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`,
    )
    .andWith(
      SearchCriteria.EndDate,
      `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`,
    )
    .execute();

  t.is(response.result.length, 10);

  const paymentMethodList = response.result;

  t.truthy(paymentMethodList);

  const paymentMethodListSorted = paymentMethodList.sort((a: any, b: any) => {
    return (
      new Date(a.timeCreated).getTime() < new Date(b.timeCreated).getTime()
    );
  });

  paymentMethodListSorted.forEach((element: any, index: number) => {
    t.is(JSON.stringify(element), JSON.stringify(paymentMethodList[index]));
    t.is(startDate.getTime() <= new Date(element.timeCreated).getTime(), true);
    endDate.setDate(endDate.getDate() + 1);
    t.is(endDate.getTime() >= new Date(element.timeCreated).getTime(), true);
  });
});

test("find stored payment method by last updated", async (t) => {
  const startDate = new Date(),
    endDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  endDate.setDate(endDate.getDate() - 3);

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Desc)
    .where(
      SearchCriteria.FromTimeLastUpdated,
      `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`,
    )
    .andWith(
      SearchCriteria.ToTimeLastUpdated,
      `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`,
    )
    .execute();

  t.truthy(response);
  t.is(response.result.length, 10);
});

test("find stored payment method by last updated current day", async (t) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 30);
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Desc)
    .where(
      SearchCriteria.FromTimeLastUpdated,
      `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`,
    )
    .andWith(
      SearchCriteria.ToTimeLastUpdated,
      `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`,
    )
    .execute();

  t.truthy(response);
  t.is(response.result.length, 10);
});

test("find stored payment method by id", async (t) => {
  const tokenizedPayment = await card.tokenize().execute();

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
    .where(SearchCriteria.StoredPaymentMethodId, tokenizedPayment.token)
    .execute();

  t.truthy(response);
  t.is(response.result.length, 1);
  t.is(response.result[0].paymentMethodId, tokenizedPayment.token);
});

test("find stored payment method by random id", async (t) => {
  const paymentMethodId = "PMT_" + GenerationUtils.getGuuid();

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
    .where(SearchCriteria.StoredPaymentMethodId, paymentMethodId)
    .execute();

  t.truthy(response);
  t.truthy(response.result);
  t.is(response.result.length, 0);
});

test("find stored payment method by status", async (t) => {
  const statuses = ["ACTIVE", "DELETED"];

  for (const status of statuses) {
    const response: any = await ReportingService.findStoredPaymentMethodsPaged(
      1,
      10,
    )
      .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
      .where(SearchCriteria.StoredPaymentMethodStatus, status)
      .execute();

    t.truthy(response);
    t.truthy(response.result);
    for (const result of response.result) {
      t.is(result.status, status);
    }
  }
});

test("find stored payment method by reference", async (t) => {
  const reference = "5e3d3885-ceb3-a5ea-015c-945eaa4df8c8";

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
    .where(SearchCriteria.ReferenceNumber, reference)
    .execute();

  t.truthy(response);
  t.truthy(response.result);
  for (const result of response.result) {
    t.is(result.reference, reference);
  }
});

test("find stored payment method by card info", async (t) => {
  const card = new CreditCardData();
  card.number = "4242424242424242";
  card.expMonth = "12";
  card.expYear = (new Date().getFullYear() + 1).toString();

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
    .where(SearchCriteria.PaymentMethod, card)
    .execute();

  t.truthy(response);
  t.truthy(response.result);
  for (const result of response.result) {
    t.is(result.cardExpMonth, card.expMonth);
    t.is(
      result.cardExpYear,
      card.expYear.substring(card.expYear.length - 2, card.expYear.length),
    );
    t.is(
      result.cardNumberLastFour.substring(
        result.cardNumberLastFour.length - 4,
        result.cardNumberLastFour.length,
      ),
      card.number.substring(card.number.length - 4, card.number.length),
    );
  }
});

test("find stored payment method by only card number info", async (t) => {
  const card = new CreditCardData();
  card.number = "4242424242424242";
  card.expMonth = "12";
  card.expYear = (new Date().getFullYear() + 1).toString();

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
    .where(SearchCriteria.PaymentMethod, card)
    .execute();

  t.truthy(response);
  t.truthy(response.result);
  for (const result of response.result) {
    t.is(result.cardExpMonth, card.expMonth);
    t.is(
      result.cardExpYear,
      card.expYear.substring(card.expYear.length - 2, card.expYear.length),
    );
    t.is(
      result.cardNumberLastFour.substring(
        result.cardNumberLastFour.length - 4,
        result.cardNumberLastFour.length,
      ),
      card.number.substring(card.number.length - 4, card.number.length),
    );
  }
});

test("find stored payment method without mandatory card number", async (t) => {
  const card = new CreditCardData();
  const error = await t.throwsAsync(
    async () => {
      await ReportingService.findStoredPaymentMethodsPaged(1, 10)
        .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
        .where(SearchCriteria.PaymentMethod, card)
        .execute();
    },
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40005");
  t.is(
    error?.message,
    "Status Code: MANDATORY_DATA_MISSING - Request expects the following fields : number",
  );
});

test("find stored payment method detail", async (t) => {
  const paymentMethodId = "PMT_deea3267-e182-4c03-b3db-c9469a32a6a8";

  // eslint-disable-next-line prettier/prettier
  const response: any = await ReportingService.storedPaymentMethodDetail(
    paymentMethodId,
  ).execute();
  // eslint-enable-next-line prettier/prettier

  t.truthy(response);
  t.true(response instanceof StoredPaymentMethodSummary);
  t.is(response.paymentMethodId, paymentMethodId);
});

test("find stored payment method detail by random id", async (t) => {
  const paymentMethodId = "PMT_" + GenerationUtils.getGuuid();

  const error = await t.throwsAsync(
    async () => {
      await ReportingService.storedPaymentMethodDetail(
        paymentMethodId,
      ).execute();
    },
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40118");
  t.is(
    error?.message,
    `Status Code: RESOURCE_NOT_FOUND - PAYMENT_METHODS ${paymentMethodId} not found at this /ucp/payment-methods/${paymentMethodId}`,
  );
});

test("find stored payment method detail by wrong format id", async (t) => {
  const paymentMethodId = GenerationUtils.getGuuid();

  const error = await t.throwsAsync(
    async () => {
      await ReportingService.storedPaymentMethodDetail(
        paymentMethodId,
      ).execute();
    },
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40213");
  t.is(
    error?.message,
    `Status Code: INVALID_REQUEST_DATA - payment_method.id: ${paymentMethodId} contains unexpected data`,
  );
});
