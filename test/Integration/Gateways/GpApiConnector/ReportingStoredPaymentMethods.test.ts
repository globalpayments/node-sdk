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
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

const date = new Date();
const card = new CreditCardData();
card.number = "4263970000005262";
card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
card.expYear = (date.getFullYear() + 1).toString();
card.cvn = "131";
card.cardHolderName = "James Mason";

beforeAll(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());

test("find stored payment method by start date and end date", async () => {
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

  expect(response.result.length).toBe(10);

  const paymentMethodList = response.result;

  expect(paymentMethodList).toBeTruthy();

  const paymentMethodListSorted = paymentMethodList.sort((a: any, b: any) => {
    return (
      new Date(a.timeCreated).getTime() < new Date(b.timeCreated).getTime()
    );
  });

  paymentMethodListSorted.forEach((element: any, index: number) => {
    expect(JSON.stringify(element)).toBe(
      JSON.stringify(paymentMethodList[index]),
    );
    expect(startDate.getTime() <= new Date(element.timeCreated).getTime()).toBe(
      true,
    );
    endDate.setDate(endDate.getDate() + 1);
    expect(endDate.getTime() >= new Date(element.timeCreated).getTime()).toBe(
      true,
    );
  });
});

test("find stored payment method by last updated", async () => {
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

  expect(response).toBeTruthy();
  expect(response.result.length).toBe(10);
});

test("find stored payment method by last updated current day", async () => {
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

  expect(response).toBeTruthy();
  expect(response.result.length).toBe(10);
});

test("find stored payment method by id", async () => {
  const tokenizedPayment = await card.tokenize().execute();

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
    .where(SearchCriteria.StoredPaymentMethodId, tokenizedPayment.token)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length).toBe(1);
  expect(response.result[0].paymentMethodId).toBe(tokenizedPayment.token);
});

test("find stored payment method by random id", async () => {
  const paymentMethodId = "PMT_" + GenerationUtils.getGuuid();

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
    .where(SearchCriteria.StoredPaymentMethodId, paymentMethodId)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result).toBeTruthy();
  expect(response.result.length).toBe(0);
});

test("find stored payment method by status", async () => {
  const statuses = ["ACTIVE", "DELETED"];

  for (const status of statuses) {
    const response: any = await ReportingService.findStoredPaymentMethodsPaged(
      1,
      10,
    )
      .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
      .where(SearchCriteria.StoredPaymentMethodStatus, status)
      .execute();

    expect(response).toBeTruthy();
    expect(response.result).toBeTruthy();
    for (const result of response.result) {
      expect(result.status).toBe(status);
    }
  }
});

test("find stored payment method by reference", async () => {
  const reference = "5e3d3885-ceb3-a5ea-015c-945eaa4df8c8";

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    10,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
    .where(SearchCriteria.ReferenceNumber, reference)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result).toBeTruthy();
  for (const result of response.result) {
    expect(result.reference).toBe(reference);
  }
});

test("find stored payment method by card info", async () => {
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

  expect(response).toBeTruthy();
  expect(response.result).toBeTruthy();
  for (const result of response.result) {
    expect(result.cardExpMonth).toBe(card.expMonth);
    expect(result.cardExpYear).toBe(
      card.expYear.substring(card.expYear.length - 2, card.expYear.length),
    );
    expect(
      result.cardNumberLastFour.substring(
        result.cardNumberLastFour.length - 4,
        result.cardNumberLastFour.length,
      ),
    ).toBe(card.number.substring(card.number.length - 4, card.number.length));
  }
});

test("find stored payment method by only card number info", async () => {
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

  expect(response).toBeTruthy();
  expect(response.result).toBeTruthy();
  for (const result of response.result) {
    expect(result.cardExpMonth).toBe(card.expMonth);
    expect(result.cardExpYear).toBe(
      card.expYear.substring(card.expYear.length - 2, card.expYear.length),
    );
    expect(
      result.cardNumberLastFour.substring(
        result.cardNumberLastFour.length - 4,
        result.cardNumberLastFour.length,
      ),
    ).toBe(card.number.substring(card.number.length - 4, card.number.length));
  }
});

test("find stored payment method without mandatory card number", async () => {
  const card = new CreditCardData();

  try {
    await ReportingService.findStoredPaymentMethodsPaged(1, 10)
      .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Asc)
      .where(SearchCriteria.PaymentMethod, card)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40005");
    expect(error?.message).toBe(
      "Status Code: MANDATORY_DATA_MISSING - Request expects the following fields : number",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("find stored payment method detail", async () => {
  const paymentMethodId = "PMT_deea3267-e182-4c03-b3db-c9469a32a6a8";

  // eslint-disable-next-line prettier/prettier
  const response: any = await ReportingService.storedPaymentMethodDetail(
    paymentMethodId,
  ).execute();
  // eslint-enable-next-line prettier/prettier

  expect(response).toBeTruthy();
  expect(response instanceof StoredPaymentMethodSummary).toBe(true);
  expect(response.paymentMethodId).toBe(paymentMethodId);
});

test("find stored payment method detail by random id", async () => {
  const paymentMethodId = "PMT_" + GenerationUtils.getGuuid();

  try {
    await ReportingService.storedPaymentMethodDetail(paymentMethodId).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40118");
    expect(error?.message).toBe(
      `Status Code: RESOURCE_NOT_FOUND - PAYMENT_METHODS ${paymentMethodId} not found at this /ucp/payment-methods/${paymentMethodId}`,
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("find stored payment method detail by wrong format id", async () => {
  const paymentMethodId = GenerationUtils.getGuuid();

  try {
    await ReportingService.storedPaymentMethodDetail(paymentMethodId).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40213");
    expect(error?.message).toBe(
      `Status Code: INVALID_REQUEST_DATA - payment_method.id: ${paymentMethodId} contains unexpected data`,
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});
