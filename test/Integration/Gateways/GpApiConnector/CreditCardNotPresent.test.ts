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

const date = new Date();

const currency = "USD";

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

beforeEach(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

test("credit sale", async () => {
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

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
  expect(response.payerDetails).toBeFalsy();
});

test("credit sale with fingerprint", async () => {
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

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
  expect(response.fingerprint).toBeTruthy();
  expect(response.fingerprintIndicator).toBeTruthy();
});

test("credit sale with fingerprint success", async () => {
  const customer = new Customer();
  customer.deviceFingerPrint = "ON_SUCCESS";

  const response = await card
    .charge(69)
    .withCurrency(currency)
    .withCustomerData(customer)
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
  expect(response.fingerprint).toBeTruthy();
  expect(response.fingerprintIndicator).toBeTruthy();
});

test("credit authorization", async () => {
  const response = await card
    .authorize(42)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.PREAUTHORIZED as string).toBe(
    response.responseMessage,
  );
  expect(response.payerDetails).toBeFalsy();
});

test("credit authorization then capture", async () => {
  const transaction = await card
    .authorize(42)
    .withCurrency(currency)
    .withOrderId("123456-78910")
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.PREAUTHORIZED as string).toBe(
    transaction.responseMessage,
  );

  const capture = await transaction.capture(30).withGratuity(12).execute();

  expect(capture).toBeTruthy();
  expect("SUCCESS").toBe(capture.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(capture.responseMessage);
});

test("credit authorization then capture with fingerprint", async () => {
  const customer = new Customer();
  customer.deviceFingerPrint = "ON_SUCCESS";

  const transaction = await card
    .authorize(42)
    .withCurrency(currency)
    .withOrderId("123456-78910")
    .withAllowDuplicates(true)
    .withCustomerData(customer)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.PREAUTHORIZED as string).toBe(
    transaction.responseMessage,
  );
  expect(transaction.fingerprint).toBeTruthy();
  expect(transaction.fingerprintIndicator).toBeTruthy();

  const capture = await transaction.capture(30).withGratuity(12).execute();

  expect(capture).toBeTruthy();
  expect("SUCCESS").toBe(capture.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(capture.responseMessage);
});

test("credit authorization then capture with idempotency", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const transaction = await card
    .authorize(42)
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.PREAUTHORIZED as string).toBe(
    transaction.responseMessage,
  );

  try {
    await transaction
      .capture(30)
      .withIdempotencyKey(idempotencyKey)
      .withGratuity(12)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40039");
    expect(error?.message.includes("Idempotency Key seen before")).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("credit authorization for multicapture", async () => {
  const transaction = await card
    .authorize(42)
    .withCurrency("EUR")
    .withMultiCapture(true)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.PREAUTHORIZED as string).toBe(
    transaction.responseMessage,
  );
  expect(transaction.multiCapture).toBeTruthy();

  const capture = await transaction.capture(10).execute();

  expect(capture).toBeTruthy();
  expect("SUCCESS").toBe(capture.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(capture.responseMessage);

  const capture2 = await transaction.capture(10).execute();

  expect(capture2).toBeTruthy();
  expect("SUCCESS").toBe(capture2.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(capture2.responseMessage);

  const capture3 = await transaction.capture(10).execute();

  expect(capture3).toBeTruthy();
  expect("SUCCESS").toBe(capture3.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(capture3.responseMessage);
});

test("credit charge with same idempotency key", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const transaction = await card
    .charge(69)
    .withCurrency("EUR")
    .withIdempotencyKey(idempotencyKey)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(
    transaction.responseMessage,
  );

  try {
    await card
      .charge(69)
      .withCurrency("EUR")
      .withIdempotencyKey(idempotencyKey)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40039");
    expect(error?.message.includes("Idempotency Key seen before")).toBe(true);
    expect(error?.message.includes("DUPLICATE_ACTION")).toBe(true);
    expect(error?.message.includes(transaction.transactionId)).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("credit refund", async () => {
  const response = await card
    .refund(16)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

test("credit refund with fingerprint", async () => {
  const customer = new Customer();
  customer.deviceFingerPrint = "ON_SUCCESS";

  const response = await card
    .refund(16)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .withCustomerData(customer)
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
  expect(response.fingerprint).toBeTruthy();
  expect(response.fingerprintIndicator).toBeTruthy();
});

test.skip("credit default refund", async () => {
  const transaction = await card
    .charge(50)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(
    transaction.responseMessage,
  );

  const response = await transaction
    .refund()
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

test("credit default refund with idempotency key", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();
  const transaction = await card
    .charge(50)
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(
    transaction.responseMessage,
  );

  try {
    await transaction
      .refund(50)
      .withCurrency(currency)
      .withIdempotencyKey(idempotencyKey)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40039");
    expect(error?.message.includes("Idempotency Key seen before")).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("credit sale tokenized with stored credentials", async () => {
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

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

test("credit sale with stored credentials", async () => {
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

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

test("credit sale with dynamic descriptor", async () => {
  const dynamicDescriptor = "My company";

  const response = await card
    .charge(50)
    .withCurrency("EUR")
    .withDynamicDescriptor(dynamicDescriptor)
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

test("credit reverse with wrong ID", async () => {
  const transaction = new Transaction();
  transaction.transactionId = GenerationUtils.getGuuid();

  try {
    await transaction
      .reverse()
      .withCurrency(currency)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40008");
    expect(error?.message.includes(`RESOURCE_NOT_FOUND`)).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("credit verification", async () => {
  const response = await card.verify().withCurrency(currency).execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("VERIFIED").toBe(response.responseMessage);
});

test("credit verification with stored credentials", async () => {
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

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("VERIFIED").toBe(response.responseMessage);
});

test("credit verification with idempotency key", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const response = await card
    .verify()
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("VERIFIED").toBe(response.responseMessage);

  try {
    await card
      .verify()
      .withCurrency(currency)
      .withIdempotencyKey(idempotencyKey)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40039");
    expect(
      error?.message.includes(
        "Status Code: DUPLICATE_ACTION - Idempotency Key seen before: ",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("credit verification with address", async () => {
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

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("VERIFIED").toBe(response.responseMessage);
});

test("credit verification without currency", async () => {
  try {
    await card.verify().execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40005");
    expect(
      error?.message.includes(
        "Status Code: MANDATORY_DATA_MISSING - Request expects the following fields currency",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("credit verification - invalid CVV", async () => {
  const wrongCard = new CreditCardData();
  wrongCard.number = "4263970000005262";
  wrongCard.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  wrongCard.expYear = (date.getFullYear() + 1).toString();
  wrongCard.cardHolderName = "James Mason";

  wrongCard.cvn = "1234";

  try {
    await wrongCard.verify().withCurrency(currency).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40085");
    expect(
      error?.message.includes(
        "Status Code: INVALID_REQUEST_DATA - Security Code/CVV2/CVC must be 3 digits",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("credit verification - not numeric CVV", async () => {
  const wrongCard = new CreditCardData();
  wrongCard.number = "4263970000005262";
  wrongCard.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  wrongCard.expYear = (date.getFullYear() + 1).toString();
  wrongCard.cardHolderName = "James Mason";
  wrongCard.cvn = "SMA";

  try {
    await wrongCard.verify().withCurrency(currency).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("50018");
    expect(
      error?.message.includes(
        "Status Code: SYSTEM_ERROR_DOWNSTREAM - The line number 12 which contains '         [number] XXX [/number] ' does not conform to the schema",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("capture higher amount", async () => {
  const transaction = await card
    .authorize(55)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.PREAUTHORIZED).toBe(transaction.responseMessage);

  const capture = await transaction.capture("60").execute();

  expect(capture).toBeTruthy();
  expect("SUCCESS").toBe(capture.responseCode);
  expect(TransactionStatus.CAPTURED).toBe(capture.responseMessage);

  const transaction2 = await card
    .authorize(30)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction2).toBeTruthy();
  expect("SUCCESS").toBe(transaction2.responseCode);
  expect(TransactionStatus.PREAUTHORIZED).toBe(transaction2.responseMessage);

  try {
    await transaction2.capture("40").execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("50020");
    expect(
      error?.message.includes(
        "INVALID_REQUEST_DATA - Can't settle for more than 115% of that which you authorised",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("capture lower amount", async () => {
  const transaction = await card
    .authorize("55")
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.PREAUTHORIZED).toBe(transaction.responseMessage);

  const capture = await transaction.capture("20").execute();

  expect(capture).toBeTruthy();
  expect("SUCCESS").toBe(capture.responseCode);
  expect(TransactionStatus.CAPTURED).toBe(capture.responseMessage);
});

test("charge then refund higher amount", async () => {
  const transaction = await card
    .charge(50)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.CAPTURED).toBe(transaction.responseMessage);

  try {
    await transaction
      .refund(60)
      .withCurrency(currency)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40087");
    expect(
      error?.message.includes(
        "INVALID_REQUEST_DATA - You may only refund up to 115% of the original amount",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("capture then refund higher amount", async () => {
  const transaction = await card
    .authorize(55)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.PREAUTHORIZED as string).toBe(
    transaction.responseMessage,
  );

  const capture = await transaction.capture(55).execute();

  expect(capture).toBeTruthy();
  expect("SUCCESS").toBe(capture.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(capture.responseMessage);

  try {
    await transaction
      .refund(70)
      .withCurrency(currency)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40087");
    expect(
      error?.message.includes(
        "INVALID_REQUEST_DATA - You may only refund up to 115% of the original amount",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("manual transaction", async () => {
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

    expect(response).toBeTruthy();
    expect("SUCCESS").toBe(response.responseCode);
    expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
  }
});

test.skip("credit sale - expiry card", async () => {
  card.expYear = (date.getFullYear() - 1).toString();

  try {
    await card.charge(1).withCurrency("USD").execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40085");
    expect(
      error?.message.includes(
        "Status Code: INVALID_REQUEST_DATA - Expiry date invalid",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("verify tokenized payment method with fingerprint", async () => {
  const customer = new Customer();
  customer.deviceFingerPrint = "ALWAYS";

  const response = await card.tokenize().withCustomerData(customer).execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect(response.fingerprint).toBeTruthy();

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = response.token;

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .withCustomerData(customer)
    .execute();

  expect(verifyResponse).toBeTruthy();
  expect("SUCCESS").toBe(verifyResponse.responseCode);
  expect("VERIFIED").toBe(verifyResponse.responseMessage);
  expect(verifyResponse.fingerprint).toBeTruthy();
});

test("verify tokenized payment method with invalid fingerprint", async () => {
  const customer = new Customer();
  customer.deviceFingerPrint = "NOT_ALWAYS";

  try {
    await card
      .charge(60)
      .withCurrency(currency)
      .withCustomerData(customer)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40213");
    expect(
      error?.message.includes(
        "Status Code: INVALID_REQUEST_DATA - fingerprint_mode contains unexpected data",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("credit sale without permissions", async () => {
  const config = BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent);
  config.permissions = ["TRN_POST_Capture"];

  ServicesContainer.configureService(config, "configWithoutSalePermission");

  try {
    await card
      .charge(50)
      .withCurrency(currency)
      .withAllowDuplicates(true)
      .execute("configWithoutSalePermission");
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40212");
    expect(error?.message).toBe(
      "Status Code: ACTION_NOT_AUTHORIZED - Permission not enabled to execute action",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("transaction then refund", async () => {
  const transaction = await card
    .charge(50)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(
    transaction.responseMessage,
  );

  const partialAmount = "7.51";
  const partialRefund = await transaction
    .refund(partialAmount)
    .withCurrency(currency)
    .execute();

  expect(partialRefund).toBeTruthy();
  expect("SUCCESS").toBe(partialRefund.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(
    partialRefund.responseMessage,
  );
  expect(partialAmount).toBe(partialRefund.balanceAmount);

  try {
    await transaction.refund().withCurrency(currency).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40087");
    expect(
      error?.message.includes(
        "INVALID_REQUEST_DATA - You may only refund up to 115% of the original amount",
      ),
    ).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("transaction then reverersal", async () => {
  const transaction = await card
    .charge(20)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(
    transaction.responseMessage,
  );

  const reverse = await transaction.reverse(20).execute();

  expect(reverse).toBeTruthy();
  expect("SUCCESS").toBe(reverse.responseCode);
  expect(TransactionStatus.REVERSED as string).toBe(reverse.responseMessage);
});

test("transaction then default reverersal", async () => {
  const transaction = await card
    .charge(20)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(
    transaction.responseMessage,
  );

  const reverse = await transaction.reverse().execute();

  expect(reverse).toBeTruthy();
  expect("SUCCESS").toBe(reverse.responseCode);
  expect(TransactionStatus.REVERSED as string).toBe(reverse.responseMessage);
});

test("transaction then reverersal with idempotency key", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();
  const transaction = await card
    .charge(20)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(
    transaction.responseMessage,
  );

  try {
    await transaction.reverse().withIdempotencyKey(idempotencyKey).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40039");
    expect(error?.message.includes("Idempotency Key seen before")).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("transaction then partial reverersal", async () => {
  const transaction = await card
    .charge(20)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  expect(transaction).toBeTruthy();
  expect("SUCCESS").toBe(transaction.responseCode);
  expect(TransactionStatus.CAPTURED as string).toBe(
    transaction.responseMessage,
  );

  try {
    await transaction.reverse(10).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40214");
    expect(error?.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - partial reversal not supported",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("card tokenization", async () => {
  const response = await card.tokenize().execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("ACTIVE").toBe(response.responseMessage);
});

test("card tokenization then paying with token - Single to Multi-Use", async () => {
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

  expect(chargeResponse).toBeTruthy();
  expect(chargeResponse.responseCode).toBe("SUCCESS");
  expect(chargeResponse.responseMessage).toBe(TransactionStatus.CAPTURED);
  expect(
    chargeResponse.token.startsWith(PaymentMethod.PAYMENT_METHOD_TOKEN_PREFIX),
  ).toBeTruthy();

  tokenizedCard.token = chargeResponse.token;

  const secondChargeResponse = await tokenizedCard
    .charge(10)
    .withCurrency("USD")
    .execute();

  expect(secondChargeResponse).toBeTruthy();
  expect(secondChargeResponse.responseCode).toBe("SUCCESS");
  expect(secondChargeResponse.responseMessage).toBe(TransactionStatus.CAPTURED);
});

test("card tokenization with idempotency key", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const response = await card
    .tokenize()
    .withIdempotencyKey(idempotencyKey)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe("ACTIVE");

  let exceptionCaught = false;
  try {
    await card.tokenize().withIdempotencyKey(idempotencyKey).execute();
  } catch (e) {
    exceptionCaught = true;
    expect(e.responseCode).toBe("40039");
    expect(e.message.includes("Idempotency Key seen before")).toBe(true);
  } finally {
    expect(exceptionCaught).toBe(true);
  }
});

test("card tokenization then paying with token", async () => {
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

  expect(chargeResponse).toBeTruthy();
  expect(chargeResponse.responseCode).toBe("SUCCESS");
  expect(chargeResponse.responseMessage).toBe(TransactionStatus.CAPTURED);
});

test("verify tokenized payment method", async () => {
  const tokenizeResponse = await card.tokenize().execute();

  expect(tokenizeResponse).toBeTruthy();
  expect(tokenizeResponse.responseCode).toBe("SUCCESS");
  expect(tokenizeResponse.responseMessage).toBe("ACTIVE");

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenizeResponse.token;

  const response = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe("VERIFIED");
});

test("verify tokenized payment method with idempotency key", async () => {
  const idempotencyKey = GenerationUtils.getGuuid();

  const tokenizeResponse = await card.tokenize().execute();

  expect(tokenizeResponse).toBeTruthy();
  expect(tokenizeResponse.responseCode).toBe("SUCCESS");
  expect(tokenizeResponse.responseMessage).toBe("ACTIVE");

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenizeResponse.token;

  const response = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe("VERIFIED");

  try {
    await tokenizedCard.verify().withIdempotencyKey(idempotencyKey).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40039");
    expect(error?.message.includes(`Idempotency Key seen before`)).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("verify tokenized payment method with wrong ID", async () => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  try {
    await tokenizedCard.verify().withCurrency(currency).execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40116");
    expect(error?.message).toBe(
      `Status Code: RESOURCE_NOT_FOUND - payment_method ${tokenizedCard.token} not found at this location.`,
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test.skip("card tokenization then delete", async () => {
  //Permission not enabled to execute action for this appId/appKey
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;

  const deleteTokenExpiryRes = await tokenizedCard.deleteToken();
  expect(deleteTokenExpiryRes).toBeTruthy();

  const deleteTokenExpiryRes2 = await tokenizedCard.deleteToken();
  expect(deleteTokenExpiryRes2).toBeFalsy();
});

test.skip("card tokenization then delete with idempotency key", async () => {
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

  expect(deleteTokenExpiryRes).toBeTruthy();
  expect(deleteTokenExpiryRes.responseCode).toBe("SUCCESS");
  expect(deleteTokenExpiryRes.responseMessage).toBe("DELETED");

  try {
    await new ManagementBuilder(TransactionType.TokenDelete)
      .withPaymentMethod(tokenizedCard)
      .withIdempotencyKey(idempotencyKey)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40039");
    expect(error?.message).toMatch(new RegExp("Idempotency Key seen before"));
    expect(error instanceof GatewayError).toBe(true);
  }
});

test.skip("card delete wrong id", async () => {
  //Permission not enabled to execute action for this appId/appKey

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  try {
    await tokenizedCard.deleteToken();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40116");
    expect(error?.message).toBe(
      `Status Code: RESOURCE_NOT_FOUND - payment_method ${tokenizedCard.token} not found at this location.`,
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("card tokenization then update", async () => {
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  const date = new Date();
  tokenizedCard.expMonth = (date.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (date.getFullYear() + 2).toString();

  const updateTokenExpiryRes = await tokenizedCard.updateTokenExpiry();

  expect(updateTokenExpiryRes).toBeTruthy();
});

test("card update wrong ID", async () => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = "PMT_" + GenerationUtils.getGuuid();
  const date = new Date();
  tokenizedCard.expMonth = (date.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (date.getFullYear() + 2).toString();

  try {
    await tokenizedCard.updateTokenExpiry();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      `Status Code: RESOURCE_NOT_FOUND - payment_method ${tokenizedCard.token} not found at this location.`,
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("card tokenization then update with idempotency key", async () => {
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

  expect(updateTokenExpiryRes).toBeTruthy();
  expect(updateTokenExpiryRes.responseCode).toBe("SUCCESS");
  expect(updateTokenExpiryRes.responseMessage).toBe("ACTIVE");

  try {
    await new ManagementBuilder(TransactionType.TokenUpdate)
      .withPaymentMethod(tokenizedCard)
      .withIdempotencyKey(idempotencyKey)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("40039");
    expect(error?.responseMessage).toMatch(
      new RegExp("Idempotency Key seen before"),
    );
    expect(error instanceof GatewayError).toBe(true);
  }

  const verifyResponse = await tokenizedCard
    .verify()
    .withCurrency(currency)
    .withIdempotencyKey(idempotencyKey)
    .execute();

  expect(verifyResponse).toBeTruthy();
  expect(verifyResponse.responseCode).toBe("SUCCESS");
  expect(verifyResponse.responseMessage).toBe("VERIFIED");

  tokenizedCard.expYear = (date.getFullYear() + 3).toString();
  const updateTokenExpiryRes2 = await tokenizedCard.updateTokenExpiry();

  expect(updateTokenExpiryRes2).toBeTruthy();
});

test("credit refund transaction wrong ID", async () => {
  const transaction = new Transaction();
  transaction.transactionId = GenerationUtils.getGuuid();

  try {
    await transaction
      .refund(10)
      .withCurrency(currency)
      .withAllowDuplicates(true)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message.includes(`RESOURCE_NOT_FOUND`)).toBe(true);
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("card tokenization - Missing card number", async () => {
  const card = new CreditCardData();

  try {
    await card.tokenize().execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: MANDATORY_DATA_MISSING - Request expects the following fields : number",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("update payment token", async () => {
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

  expect(response.result.length).toBe(1);

  const pmtToken = response.result[0];

  expect(pmtToken).toBeTruthy();

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

  expect(responseUpdateToken).toBeTruthy();
  expect(responseUpdateToken.responseCode).toBe("SUCCESS");
  expect(responseUpdateToken.responseMessage).toBe("ACTIVE");
  expect(responseUpdateToken.token).toBe(pmtToken.paymentMethodId);
  expect(responseUpdateToken.tokenUsageMode).toBe(
    PaymentMethodUsageMode.MULTIPLE,
  );
});

test("card tokenization then update then charge", async () => {
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

  expect(responseUpdateToken).toBeTruthy();
  expect(responseUpdateToken.responseCode).toBe("SUCCESS");
  expect(responseUpdateToken.responseMessage).toBe("ACTIVE");
  expect(responseUpdateToken.tokenUsageMode).toBe(
    PaymentMethodUsageMode.MULTIPLE,
  );

  const chargeResponse = await tokenizedCard
    .charge(1)
    .withCurrency(currency)
    .execute();

  expect(chargeResponse).toBeTruthy();
  expect(chargeResponse.responseCode).toBe("SUCCESS");
  expect(chargeResponse.responseMessage).toBe(TransactionStatus.CAPTURED);
});

test("card tokenization then update to single usage", async () => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;

  try {
    await tokenizedCard
      .updateToken()
      .withPaymentMethodUsageMode(PaymentMethodUsageMode.SINGLE)
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("50020");
    expect(error?.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - Tokentype can only be MULTI",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

test("card tokenization then update to without usage mode", async () => {
  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = `PMT_${GenerationUtils.getGuuid()}`;
  try {
    await tokenizedCard.updateToken().execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.responseCode).toBe("50021");
    expect(error?.message).toBe(
      "Status Code: MANDATORY_DATA_MISSING - Mandatory Fields missing [card expdate] See Developers Guide",
    );
    expect(error instanceof GatewayError).toBe(true);
  }
});

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());

afterEach(() => BaseGpApiTestConfig.resetGpApiConfig());
