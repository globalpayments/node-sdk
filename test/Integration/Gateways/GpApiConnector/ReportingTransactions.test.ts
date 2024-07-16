import {
  Channel,
  DataServiceCriteria,
  GatewayError,
  GenerationUtils,
  PaymentEntryMode,
  PaymentMethodName,
  PaymentType,
  ReportingService,
  SearchCriteria,
  ServicesContainer,
  TransactionSortProperty,
  TransactionStatus,
  TransactionSummary,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

const startDate = new Date(),
  endDate = new Date();
startDate.setDate(startDate.getDate() - 30);
startDate.setHours(0);
startDate.setMinutes(0);
startDate.setSeconds(0);

let batchId: string;

let amount: number;
let country: any;
let currency: any;

let brandReference: string;

let reference: string;

let cardBrand: string;
let authCode: string;

let transactionId: string;
beforeAll(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());

test("report find transactions by start date and end date", async () => {
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TIME_CREATED)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, endDate)
    .execute();

  expect(response).toBeTruthy();
  expect(response.result.length > 0).toBe(true);

  for (const transaction of response.result) {
    expect(
      new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
    ).toBe(true);
    expect(
      new Date(transaction.transactionDate).getTime() < endDate.getTime(),
    ).toBe(true);
    transactionId = transaction.transactionId;
    if (!batchId && transaction.batchSequenceNumber) {
      batchId = transaction.batchSequenceNumber;
    }

    if (!amount) {
      amount = transaction.amount;
      country = transaction.country;
      currency = transaction.currency;
    }

    if (!brandReference && transaction.brandReference) {
      brandReference = transaction.brandReference;
    }

    if (!reference) {
      reference = transaction.referenceNumber;
    }

    if (!cardBrand) {
      cardBrand = transaction.cardType;
      authCode = transaction.authCode;
    }
  }
});

test("report find transactions by transactionId", async () => {
  try {
    // transactionId is used from list of transactions in test: report find transactions by start date and end date
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .withTransactionId(transactionId)
      .where(SearchCriteria.StartDate, startDate)
      .execute();

    expect(response.result.length === 1).toBe(true);
    expect(transactionId).toBe(response.result[0].transactionId);
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions with wrong transactionId", async () => {
  try {
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .withTransactionId("TRN_B2RDfsrhwhzvsbkci4JdTiZ9mHVmvC")
      .where(SearchCriteria.StartDate, startDate)
      .execute();

    expect(response.result.length).toBe(0);
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions by batchId", async () => {
  try {
    // batchId is used from list of transactions in test: report find transactions by start date and end date

    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.BatchId, batchId)
      .execute();

    expect(response.result.length >= 1).toBe(true);
    for (const transaction of response.result) {
      expect(batchId).toBe(transaction.batchSequenceNumber);
    }
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions by payment type", async () => {
  try {
    const paymentType = PaymentType.SALE;
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.PaymentType, paymentType)
      .execute();

    expect(response.result.length >= 1).toBe(true);
    for (const transaction of response.result) {
      expect(paymentType).toBe(transaction.transactionType);
    }
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions by amount, currency and country", async () => {
  // amount, currency, country is used from list of transactions in test: report find transactions by start date and end date

  try {
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(DataServiceCriteria.Amount, amount)
      .andWith(DataServiceCriteria.Currency, currency)
      .andWith(DataServiceCriteria.Country, country)
      .execute();

    expect(response.result.length >= 1).toBe(true);
    for (const transaction of response.result) {
      expect(amount).toBe(transaction.amount);
      expect(currency).toBe(transaction.currency);
      expect(country).toBe(transaction.country);
    }
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions by Channel", async () => {
  try {
    const channel = Channel.CardNotPresent;
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.Channel, channel)
      .execute();

    expect(response.result.length >= 1).toBe(true);
    for (const transaction of response.result) {
      expect(channel).toBe(transaction.channel);
    }
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions by status", async () => {
  try {
    const status = TransactionStatus.CAPTURED;
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.TransactionStatus, status)
      .execute();

    expect(response.result.length >= 1).toBe(true);
    expect(status).toBe(response.result[0].transactionStatus);
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions by card brand and authCode", async () => {
  // authCode, cardBrand is used from list of transactions in test: report find transactions by start date and end date
  try {
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.CardBrand, cardBrand)
      .andWith(SearchCriteria.AuthCode, authCode)
      .execute();

    expect(response.result.length >= 1).toBe(true);
    expect(cardBrand).toBe(response.result[0].cardType);
    expect(authCode).toBe(response.result[0].authCode);
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions by reference", async () => {
  try {
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.ReferenceNumber, reference)
      .execute();

    expect(response.result.length >= 1).toBe(true);
    expect(reference).toBe(response.result[0].referenceNumber);
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

//failed
test("report find transactions by brandReference", async () => {
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.BrandReference, brandReference)
    .execute();

  expect(response.result.length >= 1).toBe(true);
  for (const transaction of response.result) {
    expect(brandReference).toBe(transaction.brandReference);
  }
});

test("report find transactions by entryMode", async () => {
  const paymentEntryMode = PaymentEntryMode.ECOM;
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.PaymentEntryMode, paymentEntryMode)
    .execute();

  expect(response.result.length >= 1).toBe(true);
  expect(paymentEntryMode).toBe(response.result[0].entryMode);
});

test("report find transactions by number first6 and last4", async () => {
  const firstSix = "426397";
  const lastFour = "5262";
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.CardNumberFirstSix, firstSix)
    .andWith(SearchCriteria.CardNumberLastFour, lastFour)
    .execute();

  expect(response.result.length >= 1).toBe(true);
  expect(
    response.result[0].maskedCardNumber.startsWith(firstSix) &&
      response.result[0].maskedCardNumber.endsWith(lastFour),
  ).toBe(true);
});

test("report find transactions by token first6 and last4 and wrong payment method", async () => {
  const firstSix = "426397";
  const lastFour = "5262";

  try {
    await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.TokenFirstSix, firstSix)
      .andWith(SearchCriteria.TokenLastFour, lastFour)
      .andWith(SearchCriteria.PaymentMethodName, PaymentMethodName.CARD)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40043");
    expect(
      error?.message.includes(
        "Status Code: INVALID_REQUEST_DATA - Request contains unexpected fields: payment_method",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("report find transactions by payment method name", async () => {
  const paymentMethodName = PaymentMethodName.DIGITAL_WALLET;
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.PaymentMethodName, paymentMethodName)
    .execute();

  expect(response.result.length >= 1).toBe(true);
  expect(paymentMethodName).toBe(response.result[0].paymentType);
});

test("report find transactions by name", async () => {
  const cardHolderName = "James Mason";
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.Name, cardHolderName)
    .execute();

  expect(response.result.length >= 1).toBe(true);
  expect(cardHolderName).toBe(response.result[0].cardHolderName);
});

test("report find transactions order by Id", async () => {
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.ID)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  expect(response.result.length > 1).toBe(true);
  let transactions = response.result;
  transactions = transactions.sort((a: any, b: any) => {
    return a.transactionId < b.transactionId;
  });
  for (const [index, responseTransaction] of response.result.entries()) {
    expect(responseTransaction.transactionId).toBe(
      transactions[index].transactionId,
    );
  }
});

test("report find transactions order by Type", async () => {
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  expect(response.result.length > 1).toBe(true);
  let transactions = response.result;
  transactions = transactions.sort((a: any, b: any) => {
    return a.transactionType < b.transactionType;
  });
  for (const [index, responseTransaction] of response.result.entries()) {
    expect(responseTransaction.transactionType).toBe(
      transactions[index].transactionType,
    );
  }
});

test("report find transactions order by TimeCreated", async () => {
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TIME_CREATED)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  expect(response.result.length > 1).toBe(true);
  let transactions = response.result;
  transactions = transactions.sort((a: any, b: any) => {
    return (
      new Date(a.transactionDate).getTime() <
      new Date(b.transactionDate).getTime()
    );
  });
  for (const [index, responseTransaction] of response.result.entries()) {
    expect(new Date(responseTransaction.transactionDate).getTime()).toBe(
      new Date(transactions[index].transactionDate).getTime(),
    );
  }
});

test("report find transactions without mandatory startDate", async () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  const tonight = new Date();
  tonight.setDate(tonight.getDate() + 1);
  tonight.setHours(0);
  tonight.setMinutes(0);
  tonight.setSeconds(0);
  const response = await ReportingService.findTransactionsPaged(
    1,
    10,
  ).execute();

  expect(response.result.length >= 0).toBe(true);

  for (const transaction of response.result) {
    expect(
      tonight.getTime() >= new Date(transaction.transactionDate).getTime(),
    ).toBe(true);
    expect(
      tonight.getTime() >= new Date(transaction.transactionDate).getTime(),
    ).toBe(true);
  }
});

test("transaction details report", async () => {
  const transactionId = "TRN_RyWZELCUbOq12IPDowbOevTC9BZxZi_6827116a3d1b";
  const response =
    await ReportingService.transactionDetail(transactionId).execute();
  expect(response).toBeTruthy();
  expect(response instanceof TransactionSummary).toBe(true);
  expect(response.transactionId).toBe(transactionId);
});

test("transaction details report - wrong ID", async () => {
  const transactionId = GenerationUtils.getGuuid();

  try {
    await ReportingService.transactionDetail(transactionId).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40118");
    expect(
      error?.message.includes(
        `Status Code: RESOURCE_NOT_FOUND - Transactions ${transactionId} not found at this /ucp/transactions/${transactionId}`,
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});
