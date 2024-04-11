import ava from "ava";
import {
  Address,
  Channel,
  CreditCardData,
  Customer,
  GatewayError,
  GenerationUtils,
  ManagementBuilder,
  ManualEntryMethod,
  PaymentMethodUsageMode,
  ReportingService,
  SearchCriteria,
  ServicesContainer,
  SortDirection,
  StoredCredential,
  StoredCredentialInitiator,
  StoredCredentialReason,
  StoredCredentialSequence,
  StoredCredentialType,
  StoredPaymentMethodSortProperty,
  Transaction,
  TransactionStatus,
  TransactionType,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";
import { PaymentMethod } from "../../../../src/Entities/GpApi/DTO";

const runSerially = true;
const test = runSerially ? ava.serial : ava;

const date = new Date();

const currency = "USD";

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

test.beforeEach(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

test("credit sale", async (t) => {
  const address = new Address();

  address.streetAddress1 = "123 Main St.";
  address.city = "Dallas";
  address.state = "TX";
  address.postalCode = "98765";
  address.country = "USA";

  const response = await card
    .charge(69)
    .withCurrency(currency)
    .withAddress(address)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is(TransactionStatus.CAPTURED as string, response.responseMessage);
  t.falsy(response.payerDetails);
});

test("credit sale with fingerprint", async (t) => {
  const address = new Address();

  address.streetAddress1 = "123 Main St.";
  address.city = "Dallas";
  address.state = "TX";
  address.postalCode = "98765";
  address.country = "USA";

  const customer = new Customer();
  customer.deviceFingerPrint = "ALWAYS";

  const response = await card
    .charge(69)
    .withCurrency(currency)
    .withAddress(address)
    .withCustomerData(customer)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is(TransactionStatus.CAPTURED as string, response.responseMessage);
  t.truthy(response.fingerprint);
  t.truthy(response.fingerprintIndicator);
});

test("credit sale with fingerprint success", async (t) => {
  const customer = new Customer();
  customer.deviceFingerPrint = "ON_SUCCESS";

  const response = await card
    .charge(69)
    .withCurrency(currency)
    .withCustomerData(customer)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is(TransactionStatus.CAPTURED as string, response.responseMessage);
  t.truthy(response.fingerprint);
  t.truthy(response.fingerprintIndicator);
});

test("credit authorization", async (t) => {
  const response = await card
    .authorize(42)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is(TransactionStatus.PREAUTHORIZED as string, response.responseMessage);
  t.falsy(response.payerDetails);
});

test("credit authorization then capture", async (t) => {
  const transaction = await card
    .authorize(42)
    .withCurrency(currency)
    .withOrderId("123456-78910")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.PREAUTHORIZED as string, transaction.responseMessage);

  const capture = await transaction.capture(30).withGratuity(12).execute();

  t.truthy(capture);
  t.is("SUCCESS", capture.responseCode);
  t.is(TransactionStatus.CAPTURED as string, capture.responseMessage);
});

test("credit authorization then capture with fingerprint", async (t) => {
  const customer = new Customer();
  customer.deviceFingerPrint = "ON_SUCCESS";

  const transaction = await card
    .authorize(42)
    .withCurrency(currency)
    .withOrderId("123456-78910")
    .withAllowDuplicates(true)
    .withCustomerData(customer)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.PREAUTHORIZED as string, transaction.responseMessage);
  t.truthy(transaction.fingerprint);
  t.truthy(transaction.fingerprintIndicator);

  const capture = await transaction.capture(30).withGratuity(12).execute();

  t.truthy(capture);
  t.is("SUCCESS", capture.responseCode);
  t.is(TransactionStatus.CAPTURED as string, capture.responseMessage);
});

test("credit authorization then capture with idempotency", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const transaction = await card
    .authorize(42)
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.PREAUTHORIZED as string, transaction.responseMessage);

  const error = await t.throwsAsync(
    async () =>
      await transaction
        .capture(30)
        .withIdempotencyKey(idempotencyKey)
        .withGratuity(12)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40039");
  t.true(error?.message.includes("Idempotency Key seen before"));
});

test("credit authorization for multicapture", async (t) => {
  const transaction = await card
    .authorize(42)
    .withCurrency("EUR")
    .withMultiCapture(true)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.PREAUTHORIZED as string, transaction.responseMessage);
  t.truthy(transaction.multiCapture);

  const capture = await transaction.capture(10).execute();

  t.truthy(capture);
  t.is("SUCCESS", capture.responseCode);
  t.is(TransactionStatus.CAPTURED as string, capture.responseMessage);

  const capture2 = await transaction.capture(10).execute();

  t.truthy(capture2);
  t.is("SUCCESS", capture2.responseCode);
  t.is(TransactionStatus.CAPTURED as string, capture2.responseMessage);

  const capture3 = await transaction.capture(10).execute();

  t.truthy(capture3);
  t.is("SUCCESS", capture3.responseCode);
  t.is(TransactionStatus.CAPTURED as string, capture3.responseMessage);
});

test("credit charge with same idempotency key", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const transaction = await card
    .charge(69)
    .withCurrency("EUR")
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.CAPTURED as string, transaction.responseMessage);

  const error = await t.throwsAsync(
    async () =>
      await card
        .charge(69)
        .withCurrency("EUR")
        .withIdempotencyKey(idempotencyKey)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40039");
  t.true(error?.message.includes("Idempotency Key seen before"));
  t.true(error?.message.includes("DUPLICATE_ACTION"));
  t.true(error?.message.includes(transaction.transactionId));
});

test("credit refund", async (t) => {
  const response = await card
    .refund(16)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is(TransactionStatus.CAPTURED as string, response.responseMessage);
});

test("credit refund with fingerprint", async (t) => {
  const customer = new Customer();
  customer.deviceFingerPrint = "ON_SUCCESS";

  const response = await card
    .refund(16)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .withCustomerData(customer)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is(TransactionStatus.CAPTURED as string, response.responseMessage);
  t.truthy(response.fingerprint);
  t.truthy(response.fingerprintIndicator);
});

test("credit default refund", async (t) => {
  const transaction = await card
    .charge(50)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.CAPTURED as string, transaction.responseMessage);

  const response = await transaction
    .refund()
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is(TransactionStatus.CAPTURED as string, response.responseMessage);
});

test("credit default refund with idempotency key", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();
  const transaction = await card
    .charge(50)
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.CAPTURED as string, transaction.responseMessage);

  const error = await t.throwsAsync(
    async () =>
      await transaction
        .refund(50)
        .withCurrency(currency)
        .withIdempotencyKey(idempotencyKey)
        .withAllowDuplicates(true)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40039");
  t.true(error?.message.includes("Idempotency Key seen before"));
});

test("credit sale tokenized with stored credentials", async (t) => {
  const storedCredentials = new StoredCredential();
  storedCredentials.initiator = StoredCredentialInitiator.Merchant;
  storedCredentials.type = StoredCredentialType.INSTALLMENT;
  storedCredentials.sequence = StoredCredentialSequence.SUBSEQUENT;
  storedCredentials.reason = StoredCredentialReason.INCREMENTAL;

  const tokenizeResponse = await card.tokenize().execute();

  const tokenId = tokenizeResponse.token;
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  tokenizedCard.cardHolderName = "James Mason";

  const response = await tokenizedCard
    .charge(50)
    .withCurrency("EUR")
    .withStoredCredentials(storedCredentials)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is(TransactionStatus.CAPTURED as string, response.responseMessage);
});

test("credit sale with stored credentials", async (t) => {
  const storedCredentials = new StoredCredential();
  storedCredentials.initiator = StoredCredentialInitiator.Merchant;
  storedCredentials.type = StoredCredentialType.INSTALLMENT;
  storedCredentials.sequence = StoredCredentialSequence.SUBSEQUENT;
  storedCredentials.reason = StoredCredentialReason.INCREMENTAL;

  const response = await card
    .charge(50)
    .withCurrency("EUR")
    .withStoredCredentials(storedCredentials)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is(TransactionStatus.CAPTURED as string, response.responseMessage);
});

test("credit sale with dynamic descriptor", async (t) => {
  const dynamicDescriptor = "My company";

  const response = await card
    .charge(50)
    .withCurrency("EUR")
    .withDynamicDescriptor(dynamicDescriptor)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is(TransactionStatus.CAPTURED as string, response.responseMessage);
});

test("credit reverse with wrong ID", async (t) => {
  const transaction = new Transaction();
  transaction.transactionId = GenerationUtils.getGuuid();

  const error = await t.throwsAsync(
    async () => {
      await transaction
        .reverse()
        .withCurrency(currency)
        .withAllowDuplicates(true)
        .execute();
    },
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40008");
  t.true(error?.message.includes(`RESOURCE_NOT_FOUND`));
});

test("credit verification", async (t) => {
  const response = await card.verify().withCurrency(currency).execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is("VERIFIED", response.responseMessage);
});

test("credit verification with stored credentials", async (t) => {
  const storedCredentials = new StoredCredential();
  storedCredentials.initiator = StoredCredentialInitiator.Merchant;
  storedCredentials.type = StoredCredentialType.INSTALLMENT;
  storedCredentials.sequence = StoredCredentialSequence.SUBSEQUENT;
  storedCredentials.reason = StoredCredentialReason.INCREMENTAL;

  const response = await card
    .verify()
    .withCurrency(currency)
    .withStoredCredentials(storedCredentials)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is("VERIFIED", response.responseMessage);
});

test("credit verification with idempotency key", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const response = await card
    .verify()
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is("VERIFIED", response.responseMessage);

  const error = await t.throwsAsync(
    async () =>
      await card
        .verify()
        .withCurrency(currency)
        .withIdempotencyKey(idempotencyKey)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40039");
  t.true(
    error?.message.includes(
      "Status Code: DUPLICATE_ACTION - Idempotency Key seen before: ",
    ),
  );
});

test("credit verification with address", async (t) => {
  const address = new Address();
  address.streetAddress1 = "123 Main St.";
  address.city = "Downtown";
  address.state = "NJ";
  address.country = "US";
  address.postalCode = "12345";

  const response = await card
    .verify()
    .withCurrency(currency)
    .withAddress(address)
    .execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is("VERIFIED", response.responseMessage);
});

test("credit verification without currency", async (t) => {
  const error = await t.throwsAsync(async () => await card.verify().execute(), {
    instanceOf: GatewayError,
  });

  t.truthy(error);
  t.is(error?.responseCode, "40005");
  t.true(
    error?.message.includes(
      "Status Code: MANDATORY_DATA_MISSING - Request expects the following fields currency",
    ),
  );
});

test("credit verification - invalid CVV", async (t) => {
  const wrongCard = new CreditCardData();
  wrongCard.number = "4263970000005262";
  wrongCard.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  wrongCard.expYear = (date.getFullYear() + 1).toString();
  wrongCard.cardHolderName = "James Mason";

  wrongCard.cvn = "1234";
  const error = await t.throwsAsync(
    async () => await wrongCard.verify().withCurrency(currency).execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40085");
  t.true(
    error?.message.includes(
      "Status Code: INVALID_REQUEST_DATA - Security Code/CVV2/CVC must be 3 digits",
    ),
  );
});

test("credit verification - not numeric CVV", async (t) => {
  const wrongCard = new CreditCardData();
  wrongCard.number = "4263970000005262";
  wrongCard.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  wrongCard.expYear = (date.getFullYear() + 1).toString();
  wrongCard.cardHolderName = "James Mason";
  wrongCard.cvn = "SMA";
  const error = await t.throwsAsync(
    async () => await wrongCard.verify().withCurrency(currency).execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "50018");
  t.true(
    error?.message.includes(
      "Status Code: SYSTEM_ERROR_DOWNSTREAM - The line number 12 which contains '         [number] XXX [/number] ' does not conform to the schema",
    ),
  );
});

test("capture higher amount", async (t) => {
  const transaction = await card
    .authorize(55)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.PREAUTHORIZED, transaction.responseMessage);

  const capture = await transaction.capture("60").execute();

  t.truthy(capture);
  t.is("SUCCESS", capture.responseCode);
  t.is(TransactionStatus.CAPTURED, capture.responseMessage);

  const transaction2 = await card
    .authorize(30)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction2);
  t.is("SUCCESS", transaction2.responseCode);
  t.is(TransactionStatus.PREAUTHORIZED, transaction2.responseMessage);

  const error = await t.throwsAsync(
    async () => await transaction2.capture("40").execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "50020");
  t.true(
    error?.message.includes(
      "INVALID_REQUEST_DATA - Can't settle for more than 115% of that which you authorised",
    ),
  );
});

test("capture lower amount", async (t) => {
  const transaction = await card
    .authorize("55")
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.PREAUTHORIZED, transaction.responseMessage);

  const capture = await transaction.capture("20").execute();

  t.truthy(capture);
  t.is("SUCCESS", capture.responseCode);
  t.is(TransactionStatus.CAPTURED, capture.responseMessage);
});

test("charge then refund higher amount", async (t) => {
  const transaction = await card
    .charge(50)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.CAPTURED, transaction.responseMessage);

  const error = await t.throwsAsync(
    async () =>
      await transaction
        .refund(60)
        .withCurrency(currency)
        .withAllowDuplicates(true)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40087");
  t.true(
    error?.message.includes(
      "INVALID_REQUEST_DATA - You may only refund up to 115% of the original amount",
    ),
  );
});

test("capture then refund higher amount", async (t) => {
  const transaction = await card
    .authorize(55)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.PREAUTHORIZED as string, transaction.responseMessage);

  const capture = await transaction.capture(55).execute();

  t.truthy(capture);
  t.is("SUCCESS", capture.responseCode);
  t.is(TransactionStatus.CAPTURED as string, capture.responseMessage);

  const error = await t.throwsAsync(
    async () =>
      await transaction
        .refund(70)
        .withCurrency(currency)
        .withAllowDuplicates(true)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40087");
  t.true(
    error?.message.includes(
      "INVALID_REQUEST_DATA - You may only refund up to 115% of the original amount",
    ),
  );
});

test("manual transaction", async (t) => {
  const entryModes = [
    ManualEntryMethod.MOTO,
    ManualEntryMethod.MAIL,
    ManualEntryMethod.PHONE,
  ];
  for (const entryMode of entryModes) {
    const entryModeCard = new CreditCardData();
    entryModeCard.number = "4263970000005262";
    entryModeCard.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    entryModeCard.expYear = (date.getFullYear() + 1).toString();
    entryModeCard.cardHolderName = "James Mason";
    entryModeCard.cvn = "SMA";
    entryModeCard.entryMethod = entryMode;

    const response = await card.charge(69).withCurrency(currency).execute();

    t.truthy(response);
    t.is("SUCCESS", response.responseCode);
    t.is(TransactionStatus.CAPTURED as string, response.responseMessage);
  }
});

test("credit sale - expiry card", async (t) => {
  const previousCardExpYear = card.expYear;
  card.expYear = (date.getFullYear() - 1).toString();

  const error = await t.throwsAsync(
    async () => await card.charge(1).withCurrency("USD").execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40085");
  t.true(
    error?.message.includes(
      "Status Code: INVALID_REQUEST_DATA - Expiry date invalid",
    ),
  );
  card.expYear = previousCardExpYear;
});

test("verify tokenized payment method with fingerprint", async (t) => {
  const customer = new Customer();
  customer.deviceFingerPrint = "ALWAYS";

  const response = await card.tokenize().withCustomerData(customer).execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.truthy(response.fingerprint);

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .withCustomerData(customer)
    .execute();

  t.truthy(verifyResponse);
  t.is("SUCCESS", verifyResponse.responseCode);
  t.is("VERIFIED", verifyResponse.responseMessage);
  t.truthy(verifyResponse.fingerprint);
});

test("verify tokenized payment method with invalid fingerprint", async (t) => {
  const customer = new Customer();
  customer.deviceFingerPrint = "NOT_ALWAYS";

  const error = await t.throwsAsync(
    async () =>
      await card
        .charge(60)
        .withCurrency(currency)
        .withCustomerData(customer)
        .execute(),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40213");
  t.true(
    error?.message.includes(
      "Status Code: INVALID_REQUEST_DATA - fingerprint_mode contains unexpected data",
    ),
  );
});

test("credit sale without permissions", async (t) => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.permissions = ["TRN_POST_Capture"];

  ServicesContainer.configureService(config, "configWithoutSalePermission");

  const error = await t.throwsAsync(
    async () =>
      await card
        .charge(50)
        .withCurrency(currency)
        .withAllowDuplicates(true)
        .execute("configWithoutSalePermission"),
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40212");
  t.is(
    error?.message,
    "Status Code: ACTION_NOT_AUTHORIZED - Permission not enabled to execute action",
  );
});

test("transaction then refund", async (t) => {
  const transaction = await card
    .charge(50)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.CAPTURED as string, transaction.responseMessage);

  const partialAmount = "7.51";
  const partialRefund = await transaction
    .refund(partialAmount)
    .withCurrency(currency)
    .execute();

  t.truthy(partialRefund);
  t.is("SUCCESS", partialRefund.responseCode);
  t.is(TransactionStatus.CAPTURED as string, partialRefund.responseMessage);
  t.is(partialAmount, partialRefund.balanceAmount);

  const error = await t.throwsAsync(
    async () => await transaction.refund().withCurrency(currency).execute(),
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40087");
  t.true(
    error?.message.includes(
      "INVALID_REQUEST_DATA - You may only refund up to 115% of the original amount",
    ),
  );
});

test("transaction then reverersal", async (t) => {
  const transaction = await card
    .charge(20)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.CAPTURED as string, transaction.responseMessage);

  const reverse = await transaction.reverse(20).execute();

  t.truthy(reverse);
  t.is("SUCCESS", reverse.responseCode);
  t.is(TransactionStatus.REVERSED as string, reverse.responseMessage);
});

test("transaction then default reverersal", async (t) => {
  const transaction = await card
    .charge(20)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.CAPTURED as string, transaction.responseMessage);

  const reverse = await transaction.reverse().execute();

  t.truthy(reverse);
  t.is("SUCCESS", reverse.responseCode);
  t.is(TransactionStatus.REVERSED as string, reverse.responseMessage);
});

test("transaction then reverersal with idempotency key", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();
  const transaction = await card
    .charge(20)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.CAPTURED as string, transaction.responseMessage);

  const error = await t.throwsAsync(
    async () =>
      await transaction.reverse().withIdempotencyKey(idempotencyKey).execute(),
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40039");
  t.true(error?.message.includes("Idempotency Key seen before"));
});

test("transaction then partial reverersal", async (t) => {
  const transaction = await card
    .charge(20)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(transaction);
  t.is("SUCCESS", transaction.responseCode);
  t.is(TransactionStatus.CAPTURED as string, transaction.responseMessage);

  const error = await t.throwsAsync(
    async () => await transaction.reverse(10).execute(),
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40214");
  t.is(
    error?.message,
    "Status Code: INVALID_REQUEST_DATA - partial reversal not supported",
  );
});

test("card tokenization", async (t) => {
  const response = await card.tokenize().execute();

  t.truthy(response);
  t.is("SUCCESS", response.responseCode);
  t.is("ACTIVE", response.responseMessage);
});

test("card tokenization then paying with token - Single to Multi-Use", async (t) => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.permissions = ["PMT_POST_Create_Single"];
  ServicesContainer.configureService(config, "singleUseToken");

  const response = await card
    .tokenize(true, PaymentMethodUsageMode.SINGLE)
    .execute("singleUseToken");
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  tokenizedCard.cardHolderName = "James Mason";

  const chargeResponse = await tokenizedCard
    .charge(10)
    .withCurrency("USD")
    .withRequestMultiUseToken(true)
    .execute();

  t.truthy(chargeResponse);
  t.is(chargeResponse.responseCode, "SUCCESS");
  t.is(chargeResponse.responseMessage, TransactionStatus.CAPTURED);
  t.truthy(
    chargeResponse.token.startsWith(PaymentMethod.PAYMENT_METHOD_TOKEN_PREFIX),
  );

  tokenizedCard.token = chargeResponse.token;

  const secondChargeResponse = await tokenizedCard
    .charge(10)
    .withCurrency("USD")
    .execute();

  t.truthy(secondChargeResponse);
  t.is(secondChargeResponse.responseCode, "SUCCESS");
  t.is(secondChargeResponse.responseMessage, TransactionStatus.CAPTURED);
});

test("card tokenization with idempotency key", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const response = await card
    .tokenize()
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "SUCCESS");
  t.is(response.responseMessage, "ACTIVE");

  let exceptionCaught = false;
  try {
    await card.tokenize().withIdempotencyKey(idempotencyKey).execute();
  } catch (e) {
    exceptionCaught = true;
    t.is(e.responseCode, "40039");
    t.true(e.message.includes("Idempotency Key seen before"));
  } finally {
    t.true(exceptionCaught);
  }
});

test("card tokenization then paying with token", async (t) => {
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  tokenizedCard.cardHolderName = "James Mason";

  const chargeResponse = await tokenizedCard
    .charge(69)
    .withCurrency("EUR")
    .withOrderId("124214-214221")
    .execute();

  t.truthy(chargeResponse);
  t.is(chargeResponse.responseCode, "SUCCESS");
  t.is(chargeResponse.responseMessage, TransactionStatus.CAPTURED);
});

test("verify tokenized payment method", async (t) => {
  const tokenizeResponse = await card.tokenize().execute();

  t.truthy(tokenizeResponse);
  t.is(tokenizeResponse.responseCode, "SUCCESS");
  t.is(tokenizeResponse.responseMessage, "ACTIVE");

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenizeResponse.token;

  const response = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "SUCCESS");
  t.is(response.responseMessage, "VERIFIED");
});

test("verify tokenized payment method with idempotency key", async (t) => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const tokenizeResponse = await card.tokenize().execute();

  t.truthy(tokenizeResponse);
  t.is(tokenizeResponse.responseCode, "SUCCESS");
  t.is(tokenizeResponse.responseMessage, "ACTIVE");

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenizeResponse.token;

  const response = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "SUCCESS");
  t.is(response.responseMessage, "VERIFIED");

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.verify().withIdempotencyKey(idempotencyKey).execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40039");
  t.is(error?.message.includes(`Idempotency Key seen before`), true);
});

test("verify tokenized payment method with wrong ID", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.verify().withCurrency(currency).execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40116");
  t.is(
    error?.message,
    `Status Code: RESOURCE_NOT_FOUND - payment_method ${tokenizedCard.token} not found at this location.`,
  );
});

test.skip("card tokenization then delete", async (t) => {
  //Permission not enabled to execute action for this appId/appKey
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;

  const deleteTokenExpiryRes = await tokenizedCard.deleteToken();
  t.truthy(deleteTokenExpiryRes);

  const deleteTokenExpiryRes2 = await tokenizedCard.deleteToken();
  t.falsy(deleteTokenExpiryRes2);
});

test.skip("card tokenization then delete with idempotency key", async (t) => {
  //Permission not enabled to execute action for this appId/appKey
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  const idempotencyKey = GenerationUtils.getGuuid();

  const deleteTokenExpiryRes = await new ManagementBuilder(
    TransactionType.TokenDelete,
  )
    .withPaymentMethod(tokenizedCard)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(deleteTokenExpiryRes);
  t.is(deleteTokenExpiryRes.responseCode, "SUCCESS");
  t.is(deleteTokenExpiryRes.responseMessage, "DELETED");

  const error = await t.throwsAsync(
    async () => {
      await new ManagementBuilder(TransactionType.TokenDelete)
        .withPaymentMethod(tokenizedCard)
        .withIdempotencyKey(idempotencyKey)
        .execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40039");
  if (error?.message) {
    t.regex(error?.message, new RegExp("Idempotency Key seen before"));
  }
});

test.skip("card delete wrong id", async (t) => {
  //Permission not enabled to execute action for this appId/appKey

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.deleteToken();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "40116");
  t.is(
    error?.message,
    `Status Code: RESOURCE_NOT_FOUND - payment_method ${tokenizedCard.token} not found at this location.`,
  );
});

test("card tokenization then update", async (t) => {
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  const date = new Date();
  tokenizedCard.expMonth = (date.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (date.getFullYear() + 2).toString();

  const updateTokenExpiryRes = await tokenizedCard.updateTokenExpiry();

  t.truthy(updateTokenExpiryRes);
});

test("card update wrong ID", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "PMT_" + GenerationUtils.getGuuid();
  const date = new Date();
  tokenizedCard.expMonth = (date.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (date.getFullYear() + 2).toString();

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.updateTokenExpiry();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(
    error?.message,
    `Status Code: RESOURCE_NOT_FOUND - payment_method ${tokenizedCard.token} not found at this location.`,
  );
});

test("card tokenization then update with idempotency key", async (t) => {
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  const date = new Date();
  tokenizedCard.expMonth = (date.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (date.getFullYear() + 2).toString();
  const idempotencyKey = GenerationUtils.getGuuid();

  const updateTokenExpiryRes = await new ManagementBuilder(
    TransactionType.TokenUpdate,
  )
    .withPaymentMethod(tokenizedCard)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(updateTokenExpiryRes);
  t.is(updateTokenExpiryRes.responseCode, "SUCCESS");
  t.is(updateTokenExpiryRes.responseMessage, "ACTIVE");

  const error = await t.throwsAsync(
    async () => {
      await new ManagementBuilder(TransactionType.TokenUpdate)
        .withPaymentMethod(tokenizedCard)
        .withIdempotencyKey(idempotencyKey)
        .execute();
    },
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.is(error?.responseCode, "40039");
  if (error?.responseMessage) {
    t.regex(error?.responseMessage, new RegExp("Idempotency Key seen before"));
  }

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  t.truthy(verifyResponse);
  t.is(verifyResponse.responseCode, "SUCCESS");
  t.is(verifyResponse.responseMessage, "VERIFIED");

  tokenizedCard.expYear = (date.getFullYear() + 3).toString();
  const updateTokenExpiryRes2 = await tokenizedCard.updateTokenExpiry();

  t.truthy(updateTokenExpiryRes2);
});

test("credit refund transaction wrong ID", async (t) => {
  const transaction = new Transaction();
  transaction.transactionId = GenerationUtils.getGuuid();

  const error = await t.throwsAsync(
    async () => {
      await transaction
        .refund(10)
        .withCurrency(currency)
        .withAllowDuplicates(true)
        .execute();
    },
    {
      instanceOf: GatewayError,
    },
  );

  t.truthy(error);
  t.true(error?.message.includes(`RESOURCE_NOT_FOUND`));
});

test("card tokenization - Missing card number", async (t) => {
  const card = new CreditCardData();

  const error = await t.throwsAsync(
    async () => {
      await card.tokenize().execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(
    error?.message,
    "Status Code: MANDATORY_DATA_MISSING - Request expects the following fields : number",
  );
});

test("update payment token", async (t) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  const response: any = await ReportingService.findStoredPaymentMethodsPaged(
    1,
    1,
  )
    .orderBy(StoredPaymentMethodSortProperty.TimeCreated, SortDirection.Desc)
    .where(
      SearchCriteria.StartDate,
      `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`,
    )
    .execute();

  t.is(response.result.length, 1);

  const pmtToken = response.result[0];

  t.truthy(pmtToken);

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = pmtToken.paymentMethodId;
  const date = new Date();
  tokenizedCard.cardHolderName = "James BondUp";
  tokenizedCard.expMonth = (date.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (date.getFullYear() + 4).toString();
  tokenizedCard.number = "4263970000005262";

  const responseUpdateToken = await tokenizedCard
    .updateToken()
    .withPaymentMethodUsageMode(PaymentMethodUsageMode.MULTIPLE)
    .execute();

  t.truthy(responseUpdateToken);
  t.is(responseUpdateToken.responseCode, "SUCCESS");
  t.is(responseUpdateToken.responseMessage, "ACTIVE");
  t.is(responseUpdateToken.token, pmtToken.paymentMethodId);
  t.is(responseUpdateToken.tokenUsageMode, PaymentMethodUsageMode.MULTIPLE);
});

test("card tokenization then update then charge", async (t) => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.permissions = ["PMT_POST_Create_Single"];
  ServicesContainer.configureService(config, "singleUseToken");

  const response = await card
    .tokenize()
    .withPaymentMethodUsageMode(PaymentMethodUsageMode.SINGLE)
    .execute("singleUseToken");

  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  tokenizedCard.cardHolderName = "GpApi";

  const responseUpdateToken = await tokenizedCard
    .updateToken()
    .withPaymentMethodUsageMode(PaymentMethodUsageMode.MULTIPLE)
    .execute();

  t.truthy(responseUpdateToken);
  t.is(responseUpdateToken.responseCode, "SUCCESS");
  t.is(responseUpdateToken.responseMessage, "ACTIVE");
  t.is(responseUpdateToken.tokenUsageMode, PaymentMethodUsageMode.MULTIPLE);

  const chargeResponse = await tokenizedCard
    .charge(1)
    .withCurrency(currency)
    .execute();

  t.truthy(chargeResponse);
  t.is(chargeResponse.responseCode, "SUCCESS");
  t.is(chargeResponse.responseMessage, TransactionStatus.CAPTURED);
});

test("card tokenization then update to single usage", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard
        .updateToken()
        .withPaymentMethodUsageMode(PaymentMethodUsageMode.SINGLE)
        .execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "50020");
  t.is(
    error?.message,
    "Status Code: INVALID_REQUEST_DATA - Tokentype can only be MULTI",
  );
});

test("card tokenization then update to without usage mode", async (t) => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  const error = await t.throwsAsync(
    async () => {
      await tokenizedCard.updateToken().execute();
    },
    {
      instanceOf: GatewayError,
    },
  );
  t.truthy(error);
  t.is(error?.responseCode, "50021");
  t.is(
    error?.message,
    "Status Code: MANDATORY_DATA_MISSING - Mandatory Fields missing [card expdate] See Developers Guide",
  );
});

test.after(() => BaseGpApiTestConfig.resetGpApiConfig());

test.afterEach(() => BaseGpApiTestConfig.resetGpApiConfig());
