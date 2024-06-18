import test from "ava";
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
import { BaseGpApiTestConfig } from "../../../../test/Data/BaseGpApiTestConfig";

const startDate = new Date(),
  endDate = new Date();
startDate.setDate(startDate.getDate() - 30);
startDate.setHours(0);
startDate.setMinutes(0);
startDate.setSeconds(0);

endDate.setDate(endDate.getDate() - 30);

let batchId: string;

let amount: number;
let country: any;
let currency: any;

let brandReference: string;

let reference: string;

let cardBrand: string;
let authCode: string;

let transactionId: string;
test.before(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

test.after(() => BaseGpApiTestConfig.resetGpApiConfig());

test.serial(
  "report find transactions by start date and end date",
  async (t) => {
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .orderBy(TransactionSortProperty.TIME_CREATED)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.EndDate, endDate)
      .execute();

    t.truthy(response);
    t.true(response.result.length > 0);

    for (const transaction of response.result) {
      t.true(
        new Date(transaction.transactionDate).getTime() >= startDate.getTime(),
      );
      t.true(
        new Date(transaction.transactionDate).getTime() < endDate.getTime(),
      );
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
  },
);

test.serial("report find transactions by transactionId", async (t) => {
  try {
    // transactionId is used from list of transactions in test: report find transactions by start date and end date
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .withTransactionId(transactionId)
      .where(SearchCriteria.StartDate, startDate)
      .execute();

    t.true(response.result.length === 1);
    t.is(transactionId, response.result[0].transactionId);
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions with wrong transactionId", async (t) => {
  try {
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .withTransactionId("TRN_B2RDfsrhwhzvsbkci4JdTiZ9mHVmvC")
      .where(SearchCriteria.StartDate, startDate)
      .execute();

    t.is(response.result.length, 0);
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test.serial("report find transactions by batchId", async (t) => {
  try {
    // batchId is used from list of transactions in test: report find transactions by start date and end date

    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.BatchId, batchId)
      .execute();

    t.true(response.result.length >= 1);
    for (const transaction of response.result) {
      t.is(batchId, transaction.batchSequenceNumber);
    }
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions by payment type", async (t) => {
  try {
    const paymentType = PaymentType.SALE;
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.PaymentType, paymentType)
      .execute();

    t.true(response.result.length >= 1);
    for (const transaction of response.result) {
      t.is(paymentType, transaction.transactionType);
    }
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test.serial(
  "report find transactions by amount, currency and country",
  async (t) => {
    // amount, currency, country is used from list of transactions in test: report find transactions by start date and end date

    try {
      const response = await ReportingService.findTransactionsPaged(1, 10)
        .where(SearchCriteria.StartDate, startDate)
        .andWith(DataServiceCriteria.Amount, amount)
        .andWith(DataServiceCriteria.Currency, currency)
        .andWith(DataServiceCriteria.Country, country)
        .execute();

      t.true(response.result.length >= 1);
      for (const transaction of response.result) {
        t.is(amount, transaction.amount);
        t.is(currency, transaction.currency);
        t.is(country, transaction.country);
      }
    } catch (e) {
      console.log(`Find transactions by Id failed: ${e.message}`);
    }
  },
);

test("report find transactions by Channel", async (t) => {
  try {
    const channel = Channel.CardNotPresent;
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.Channel, channel)
      .execute();

    t.true(response.result.length >= 1);
    for (const transaction of response.result) {
      t.is(channel, transaction.channel);
    }
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test("report find transactions by status", async (t) => {
  try {
    const status = TransactionStatus.CAPTURED;
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.TransactionStatus, status)
      .execute();

    t.true(response.result.length >= 1);
    t.is(status, response.result[0].transactionStatus);
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test.serial(
  "report find transactions by card brand and authCode",
  async (t) => {
    // authCode, cardBrand is used from list of transactions in test: report find transactions by start date and end date
    try {
      const response = await ReportingService.findTransactionsPaged(1, 10)
        .where(SearchCriteria.StartDate, startDate)
        .andWith(SearchCriteria.CardBrand, cardBrand)
        .andWith(SearchCriteria.AuthCode, authCode)
        .execute();

      t.true(response.result.length >= 1);
      t.is(cardBrand, response.result[0].cardType);
      t.is(authCode, response.result[0].authCode);
    } catch (e) {
      console.log(`Find transactions by Id failed: ${e.message}`);
    }
  },
);

test.serial("report find transactions by reference", async (t) => {
  try {
    const response = await ReportingService.findTransactionsPaged(1, 10)
      .where(SearchCriteria.StartDate, startDate)
      .andWith(SearchCriteria.ReferenceNumber, reference)
      .execute();

    t.true(response.result.length >= 1);
    t.is(reference, response.result[0].referenceNumber);
  } catch (e) {
    console.log(`Find transactions by Id failed: ${e.message}`);
  }
});

test.serial("report find transactions by brandReference", async (t) => {
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.BrandReference, brandReference)
    .execute();

  t.true(response.result.length >= 1);
  for (const transaction of response.result) {
    t.is(brandReference, transaction.brandReference);
  }
});

test("report find transactions by entryMode", async (t) => {
  const paymentEntryMode = PaymentEntryMode.ECOM;
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.PaymentEntryMode, paymentEntryMode)
    .execute();

  t.true(response.result.length >= 1);
  t.is(paymentEntryMode, response.result[0].entryMode);
});

test("report find transactions by number first6 and last4", async (t) => {
  const firstSix = "426397";
  const lastFour = "5262";
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.CardNumberFirstSix, firstSix)
    .andWith(SearchCriteria.CardNumberLastFour, lastFour)
    .execute();

  t.true(response.result.length >= 1);
  t.true(
    response.result[0].maskedCardNumber.startsWith(firstSix) &&
      response.result[0].maskedCardNumber.endsWith(lastFour),
  );
});

test("report find transactions by token first6 and last4 and wrong payment method", async (t) => {
  const firstSix = "426397";
  const lastFour = "5262";
  const error = await t.throwsAsync(
    async () =>
      await ReportingService.findTransactionsPaged(1, 10)
        .where(SearchCriteria.StartDate, startDate)
        .andWith(SearchCriteria.TokenFirstSix, firstSix)
        .andWith(SearchCriteria.TokenLastFour, lastFour)
        .andWith(SearchCriteria.PaymentMethodName, PaymentMethodName.CARD)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40043");
  t.true(
    error?.message.includes(
      "Status Code: INVALID_REQUEST_DATA - Request contains unexpected fields: payment_method",
    ),
  );
});

test("report find transactions by payment method name", async (t) => {
  const paymentMethodName = PaymentMethodName.DIGITAL_WALLET;
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.PaymentMethodName, paymentMethodName)
    .execute();

  t.true(response.result.length >= 1);
  t.is(paymentMethodName, response.result[0].paymentType);
});

test("report find transactions by name", async (t) => {
  const cardHolderName = "James Mason";
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.Name, cardHolderName)
    .execute();

  t.true(response.result.length >= 1);
  t.is(cardHolderName, response.result[0].cardHolderName);
});

test("report find transactions order by Id", async (t) => {
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.ID)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  t.true(response.result.length > 1);
  let transactions = response.result;
  transactions = transactions.sort((a: any, b: any) => {
    return a.transactionId < b.transactionId;
  });
  for (const [index, responseTransaction] of response.result.entries()) {
    t.is(responseTransaction.transactionId, transactions[index].transactionId);
  }
});

test("report find transactions order by Type", async (t) => {
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TYPE)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  t.true(response.result.length > 1);
  let transactions = response.result;
  transactions = transactions.sort((a: any, b: any) => {
    return a.transactionType < b.transactionType;
  });
  for (const [index, responseTransaction] of response.result.entries()) {
    t.is(
      responseTransaction.transactionType,
      transactions[index].transactionType,
    );
  }
});

test("report find transactions order by TimeCreated", async (t) => {
  const response = await ReportingService.findTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TIME_CREATED)
    .where(SearchCriteria.StartDate, startDate)
    .execute();

  t.true(response.result.length > 1);
  let transactions = response.result;
  transactions = transactions.sort((a: any, b: any) => {
    return (
      new Date(a.transactionDate).getTime() <
      new Date(b.transactionDate).getTime()
    );
  });
  for (const [index, responseTransaction] of response.result.entries()) {
    t.is(
      new Date(responseTransaction.transactionDate).getTime(),
      new Date(transactions[index].transactionDate).getTime(),
    );
  }
});

test("report find transactions without mandatory startDate", async (t) => {
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

  t.true(response.result.length >= 0);

  for (const transaction of response.result) {
    t.true(
      tonight.getTime() >= new Date(transaction.transactionDate).getTime(),
    );
    t.true(
      tonight.getTime() >= new Date(transaction.transactionDate).getTime(),
    );
  }
});

test("transaction details report", async (t) => {
  const transactionId = "TRN_RyWZELCUbOq12IPDowbOevTC9BZxZi_6827116a3d1b";
  const response =
    await ReportingService.transactionDetail(transactionId).execute();
  t.truthy(response);
  t.true(response instanceof TransactionSummary);
  t.is(response.transactionId, transactionId);
});

test("transaction details report - wrong ID", async (t) => {
  const transactionId = GenerationUtils.getGuuid();

  const error = await t.throwsAsync(
    async () =>
      await ReportingService.transactionDetail(transactionId).execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40118");
  t.true(
    error?.message.includes(
      `Status Code: RESOURCE_NOT_FOUND - Transactions ${transactionId} not found at this /ucp/transactions/${transactionId}`,
    ),
  );
});
