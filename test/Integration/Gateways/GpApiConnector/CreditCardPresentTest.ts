import ava, { ExecutionContext } from "ava";
import {
  Channel,
  CreditCardData,
  CreditTrackData,
  EmvLastChipRead,
  EntryMethod,
  GatewayError,
  GenerationUtils,
  LodgingData,
  LodgingItemType,
  LodgingItems,
  PaymentMethodProgram,
  ReportingService,
  SearchCriteria,
  ServicesContainer,
  SortDirection,
  StoredCredentialSequence,
  Transaction,
  TransactionSortProperty,
  TransactionStatus,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

const runSerially = true;
const test = runSerially ? ava.serial : ava;

const currency = "USD";

const amount = 15.11;

test.beforeEach(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardPresent),
  );
});

const initCreditTrackData = (
  entryMethod: EntryMethod = EntryMethod.Swipe,
): CreditTrackData => {
  const card = new CreditTrackData();
  card.setTrackData(
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?",
  );
  card.entryMethod = entryMethod;

  return card;
};

const initCreditCardData = (): CreditCardData => {
  const date = new Date();

  const card = new CreditCardData();
  card.number = "5425230000004415";
  card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  card.expYear = (date.getFullYear() + 1).toString();
  card.cvn = "852";
  card.cardHolderName = "James Mason";
  card.cardPresent = true;

  return card;
};

const assertTransactionResponse = (
  t: ExecutionContext<unknown>,
  transaction: Transaction,
  responseCode: string,
  transactionStatus: TransactionStatus,
): void => {
  t.truthy(transaction);
  t.is(responseCode, transaction.responseCode);
  t.is(transactionStatus as string, transaction.responseMessage);
};

test("card present with chip transaction", async (t) => {
  const card = initCreditTrackData();

  const response = await card
    .charge(amount)
    .withCurrency(currency)
    .withChipCondition(EmvLastChipRead.SUCCESSFUL)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("card present with swipe transaction", async (t) => {
  const card = initCreditTrackData();

  const response = await card
    .charge(amount)
    .withCurrency(currency)
    .withOrderId("124214-214221")
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("refund on card present chip card", async (t) => {
  const card = initCreditTrackData();

  const tag =
    "9F4005F000F0A0019F02060000000025009F03060000000000009F2608D90A06501B48564E82027C005F3401019F360200029F0702FF009F0802008C9F0902008C9F34030403029F2701809F0D05F0400088009F0E0508000000009F0F05F0400098005F280208409F390105FFC605DC4000A800FFC7050010000000FFC805DC4004F8009F3303E0B8C89F1A0208409F350122950500000080005F2A0208409A031409109B02E8009F21030811539C01009F37045EED3A8E4F07A00000000310109F0607A00000000310108407A00000000310109F100706010A03A400029F410400000001";

  const response = await card
    .charge(amount)
    .withCurrency(currency)
    .withOrderId("124214-214221")
    .withTagData(tag)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("card present with manual entry mode transaction", async (t) => {
  const card = initCreditCardData();

  const response = await card.charge(amount).withCurrency(currency).execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("credit verification - card present", async (t) => {
  const card = initCreditTrackData();

  const response = await card.verify().withCurrency(currency).execute();

  assertTransactionResponse(t, response, "SUCCESS", "VERIFIED");
});

test("credit verification - card present with cvv not matched", async (t) => {
  const card = initCreditCardData();
  card.number = "30450000000985";

  const response = await card.verify().withCurrency(currency).execute();

  assertTransactionResponse(t, response, "NOT_VERIFIED", "NOT_VERIFIED");
});

test("reauth a reversed sale", async (t) => {
  const card = initCreditCardData();

  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const reverse = await transaction.reverse().execute();

  assertTransactionResponse(t, reverse, "SUCCESS", TransactionStatus.REVERSED);

  const response = await reverse.reauthorized().execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("reauth a reversed authorization transaction", async (t) => {
  const card = initCreditCardData();

  const transaction = await card
    .authorize(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );

  const reverse = await transaction.reverse().execute();

  assertTransactionResponse(t, reverse, "SUCCESS", TransactionStatus.REVERSED);

  const response = await reverse.reauthorized().execute();

  assertTransactionResponse(
    t,
    response,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );
});

test("reauth an existing transaction", async (t) => {
  const startDate: Date = new Date();
  startDate.setDate(startDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);
  const endDate: Date = new Date();
  endDate.setHours(0, 0, 0, 0);

  const reportResponse = await ReportingService.findTransactionsPaged(1, 1)
    .orderBy(TransactionSortProperty.TIME_CREATED, SortDirection.Desc)
    .where(SearchCriteria.TransactionStatus, TransactionStatus.PREAUTHORIZED)
    .andWith(SearchCriteria.Channel, Channel.CardPresent)
    .andWith(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, endDate)
    .execute();

  t.truthy(reportResponse);
  t.true(reportResponse.result.length >= 1);

  const result = reportResponse.result[0];

  const transaction = new Transaction();
  transaction.transactionId = result.transactionId;

  const reverse = await transaction.reverse().execute();

  assertTransactionResponse(t, reverse, "SUCCESS", TransactionStatus.REVERSED);

  const response = await reverse.reauthorized().execute();

  assertTransactionResponse(
    t,
    response,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );
});

test("reauth a reversed authorization transaction with idempotency key", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();
  const card = initCreditCardData();

  const transaction = await card
    .authorize(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );

  const reverse = await transaction.reverse().execute();

  assertTransactionResponse(t, reverse, "SUCCESS", TransactionStatus.REVERSED);

  const response = await reverse
    .reauthorized()
    .withIdempotencyKey(idempotencyKey)
    .execute();

  assertTransactionResponse(
    t,
    response,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );

  const error = await t.throwsAsync(
    async () =>
      await transaction
        .reauthorized()
        .withIdempotencyKey(idempotencyKey)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40039");
  t.true(error?.message.includes("Idempotency Key seen before"));
});

test("reauth a reversed sale with amount", async (t) => {
  const card = initCreditCardData();

  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const reverse = await transaction.reverse().execute();

  assertTransactionResponse(t, reverse, "SUCCESS", TransactionStatus.REVERSED);

  const response = await reverse.reauthorized(15).execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
  t.is(response.balanceAmount, "15");
  t.true(response.transactionId !== reverse.transactionId);
});

test("reauth a reversed refund", async (t) => {
  const card = initCreditCardData();

  const transaction = await card
    .refund(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const error = await t.throwsAsync(
    async () => await transaction.reauthorized().execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40213");
  t.true(error?.message.includes("Status Code: INVALID_REQUEST_DATA"));
});

test("reauth a sale with captured status", async (t) => {
  const card = initCreditCardData();

  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const error = await t.throwsAsync(
    async () => await transaction.reauthorized().execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40044");
  t.true(
    error?.message.includes(
      "Status Code: INVALID_REQUEST_DATA - 36, Invalid original transaction for reauthorization-This error is returned from a CreditAuth or CreditSale if the original transaction referenced by GatewayTxnId cannot be found. This is typically because the original does not meet the criteria for the sale or authorization by GatewayTxnID. This error can also be returned if the original transaction is found, but the card number has been written over with nulls after 30 days.",
    ),
  );
});

test("reauth a sale non existent id", async (t) => {
  const transaction = new Transaction();
  transaction.transactionId = GenerationUtils.getGuuid();

  const error = await t.throwsAsync(
    async () => await transaction.reauthorized().execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40008");
  t.true(
    error?.message.includes(
      `Status Code: RESOURCE_NOT_FOUND - Transaction ${transaction.transactionId} not found at this location.`,
    ),
  );
});

test("credit sale with contactless chip", async (t) => {
  const card = new CreditTrackData();
  card.setTrackData(
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?",
  );
  const tagData =
    "9F4005F000F0A0019F02060000000025009F03060000000000009F2608D90A06501B48564E82027C005F3401019F360200029F0702FF009F0802008C9F0902008C9F34030403029F2701809F0D05F0400088009F0E0508000000009F0F05F0400098005F280208409F390105FFC605DC4000A800FFC7050010000000FFC805DC4004F8009F3303E0B8C89F1A0208409F350122950500000080005F2A0208409A031409109B02E8009F21030811539C01009F37045EED3A8E4F07A00000000310109F0607A00000000310108407A00000000310109F100706010A03A400029F410400000001";
  card.entryMethod = EntryMethod.Proximity;
  const transaction = await card
    .charge(10)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withTagData(tagData)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );
});

test("credit sale with contactless swipe", async (t) => {
  const card = new CreditTrackData();
  card.setTrackData(
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?",
  );
  const tagData =
    "9F4005F000F0A0019F02060000000025009F03060000000000009F2608D90A06501B48564E82027C005F3401019F360200029F0702FF009F0802008C9F0902008C9F34030403029F2701809F0D05F0400088009F0E0508000000009F0F05F0400098005F280208409F390191FFC605DC4000A800FFC7050010000000FFC805DC4004F8009F3303E0B8C89F1A0208409F350122950500000080005F2A0208409A031409109B02E8009F21030811539C01009F37045EED3A8E4F07A00000000310109F0607A00000000310108407A00000000310109F100706010A03A400029F410400000001";

  const transaction = await card
    .charge(10)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withTagData(tagData)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );
});

test("adjust sale transaction", async (t) => {
  const card = new CreditTrackData();
  card.setTrackData(
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?",
  );
  const tagData =
    "9F4005F000F0A0019F02060000000025009F03060000000000009F2608D90A06501B48564E82027C005F3401019F360200029F0702FF009F0802008C9F0902008C9F34030403029F2701809F0D05F0400088009F0E0508000000009F0F05F0400098005F280208409F390105FFC605DC4000A800FFC7050010000000FFC805DC4004F8009F3303E0B8C89F1A0208409F350122950500000080005F2A0208409A031409109B02E8009F21030811539C01009F37045EED3A8E4F07A00000000310109F0607A00000000310108407A00000000310109F100706010A03A400029F410400000001";
  card.entryMethod = EntryMethod.Proximity;

  const transaction = await card
    .charge(10)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withTagData(tagData)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const response = await transaction
    .edit()
    .withAmount(10.01)
    .withTagData(tagData)
    .withGratuity(5.01)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("adjust auth transaction", async (t) => {
  const card = initCreditTrackData(EntryMethod.Proximity);
  const tagData =
    "9F4005F000F0A0019F02060000000025009F03060000000000009F2608D90A06501B48564E82027C005F3401019F360200029F0702FF009F0802008C9F0902008C9F34030403029F2701809F0D05F0400088009F0E0508000000009F0F05F0400098005F280208409F390105FFC605DC4000A800FFC7050010000000FFC805DC4004F8009F3303E0B8C89F1A0208409F350122950500000080005F2A0208409A031409109B02E8009F21030811539C01009F37045EED3A8E4F07A00000000310109F0607A00000000310108407A00000000310109F100706010A03A400029F410400000001";

  const transaction = await card
    .authorize(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .withTagData(tagData)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );

  const response = await transaction
    .edit()
    .withAmount(10.01)
    .withTagData(tagData)
    .withGratuity(5.01)
    .withMultiCapture(StoredCredentialSequence.FIRST, 1)
    .execute();

  assertTransactionResponse(
    t,
    response,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );
});

test("adjust sale transaction adjust amount higher than sale", async (t) => {
  const card = initCreditTrackData();

  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const response = await transaction
    .edit()
    .withAmount(amount + 2)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("adjust sale transaction adjust only tag", async (t) => {
  const card = initCreditTrackData(EntryMethod.Proximity);
  const tagData =
    "9F4005F000F0A0019F02060000000025009F03060000000000009F2608D90A06501B48564E82027C005F3401019F360200029F0702FF009F0802008C9F0902008C9F34030403029F2701809F0D05F0400088009F0E0508000000009F0F05F0400098005F280208409F390105FFC605DC4000A800FFC7050010000000FFC805DC4004F8009F3303E0B8C89F1A0208409F350122950500000080005F2A0208409A031409109B02E8009F21030811539C01009F37045EED3A8E4F07A00000000310109F0607A00000000310108407A00000000310109F100706010A03A400029F410400000001";

  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .withTagData(tagData)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const response = await transaction.edit().withTagData(tagData).execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("adjust sale transaction adjust only gratuity", async (t) => {
  const card = initCreditTrackData(EntryMethod.Proximity);

  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const response = await transaction.edit().withGratuity(1).execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("adjust sale transaction - adjust amount to zero", async (t) => {
  const card = initCreditTrackData(EntryMethod.Proximity);

  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withChipCondition(EmvLastChipRead.SUCCESSFUL)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const response = await transaction.edit().withAmount(0).execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("adjust sale transaction - adjust gratuity to 0", async (t) => {
  const card = initCreditTrackData(EntryMethod.Proximity);

  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withChipCondition(EmvLastChipRead.SUCCESSFUL)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const response = await transaction.edit().withGratuity(0).execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("adjust sale transaction - without mandatory", async (t) => {
  const card = initCreditTrackData(EntryMethod.Proximity);

  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .withChipCondition(EmvLastChipRead.SUCCESSFUL)
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const error = await t.throwsAsync(
    async () => await transaction.edit().execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40005");
  t.true(
    error?.message.includes(
      `Status Code: MANDATORY_DATA_MISSING - Request expects the following fields [amount or tag or gratuityAmount]`,
    ),
  );
});

test("adjust sale transaction - transaction not found", async (t) => {
  const transaction = new Transaction();
  transaction.transactionId = GenerationUtils.getGuuid();

  const error = await t.throwsAsync(
    async () => await transaction.edit().execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40008");
  t.true(
    error?.message.includes(
      `Status Code: RESOURCE_NOT_FOUND - Transaction ${transaction.transactionId} not found at this location.`,
    ),
  );
});

test("incremental auth", async (t) => {
  const card = initCreditCardData();

  const transaction = await card.authorize(50).withCurrency(currency).execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );

  const lodgingInfo = new LodgingData();
  lodgingInfo.bookingReference = "s9RpaDwXq1sPRkbP";
  lodgingInfo.durationDays = 10;
  lodgingInfo.checkedInDate = new Date().toISOString();
  lodgingInfo.checkedOutDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toISOString();
  lodgingInfo.dailyRateAmount = "13.49";

  const item1 = new LodgingItems();
  item1.types = [LodgingItemType.NO_SHOW];
  item1.reference = "item_1";
  item1.totalAmount = "13.49";
  item1.paymentMethodProgramCodes = [PaymentMethodProgram.ASSURED_RESERVATION];

  lodgingInfo.items.push(item1);

  const response = await transaction
    .additionalAuth(10)
    .withCurrency(currency)
    .withLodgingData(lodgingInfo)
    .execute();

  assertTransactionResponse(
    t,
    response,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );
});

test("incremental auth - without currency and lodging data", async (t) => {
  const card = initCreditCardData();

  const transaction = await card.authorize(50).withCurrency(currency).execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );

  const response = await transaction.additionalAuth(10).execute();

  assertTransactionResponse(
    t,
    response,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );
  t.is(60, Number(response.authorizedAmount));
});

test("incremental auth - zero amount", async (t) => {
  const card = initCreditCardData();

  const transaction = await card.authorize(50).withCurrency(currency).execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );

  const response = await transaction.additionalAuth(0).execute();

  assertTransactionResponse(
    t,
    response,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );
  t.is(50, Number(response.authorizedAmount));
});

test("incremental auth - charge transaction", async (t) => {
  const card = initCreditCardData();

  const transaction = await card.charge(50).withCurrency(currency).execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const error = await t.throwsAsync(
    async () => await transaction.additionalAuth(0).execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40290");
  t.true(
    error?.message.includes(
      `Status Code: INVALID_ACTION - Cannot PROCESS Incremental Authorization over a transaction that does not have a status of PREAUTHORIZED.`,
    ),
  );
});

test("incremental auth - without amount", async (t) => {
  const card = initCreditCardData();

  const transaction = await card.charge(50).withCurrency(currency).execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const error = await t.throwsAsync(
    async () => await transaction.additionalAuth().execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40005");
  t.true(
    error?.message.includes(
      `Status Code: MANDATORY_DATA_MISSING - Request expects the following fields [amount]`,
    ),
  );
});

test("incremental auth - transaction not found", async (t) => {
  const transaction = new Transaction();
  transaction.transactionId = GenerationUtils.getGuuid();

  const error = await t.throwsAsync(
    async () => await transaction.additionalAuth().execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40008");
  t.true(
    error?.message.includes(
      `Status Code: RESOURCE_NOT_FOUND - Transaction ${transaction.transactionId} not found at this location.`,
    ),
  );
});

test.afterEach(() => BaseGpApiTestConfig.resetGpApiConfig());
