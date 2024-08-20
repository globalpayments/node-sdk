import { TestCards } from "../../../Data";
import {
  Channel,
  EBTCardData,
  EBTTrackData,
  ServicesContainer,
  TransactionStatus,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

let card: EBTCardData;
let track: EBTTrackData;

const amount = 10;
const currency = "USD";

const setup = () => {
  card = TestCards.asEBTManual(
    TestCards.visaManual(true),
    "32539F50C245A6A93D123412324000AA",
  );
  track = TestCards.asEBTTrack(
    TestCards.visaSwipe(),
    "32539F50C245A6A93D123412324000AA",
  );
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardPresent),
  );
};

beforeAll(() => {
  setup();
});

const assertEbtTransactionResponse = (
  response: any,
  transactionStatus: TransactionStatus,
) => {
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(transactionStatus);
};

test("ebt sale manual", async () => {
  card.cardHolderName = "Jane Doe";
  const response = await card.charge(amount).withCurrency(currency).execute();

  assertEbtTransactionResponse(response, TransactionStatus.CAPTURED);
});

test("ebt sale swipe", async () => {
  const response = await track
    .charge(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  assertEbtTransactionResponse(response, TransactionStatus.CAPTURED);
});

test("ebt refund", async () => {
  card.cardHolderName = "Jane Doe";
  const response = await card.refund(amount).withCurrency(currency).execute();

  assertEbtTransactionResponse(response, TransactionStatus.CAPTURED);
});

test("ebt sale refund swipe", async () => {
  const response = await track
    .refund(amount)
    .withCurrency(currency)
    .withAllowDuplicates(true)
    .execute();

  assertEbtTransactionResponse(response, TransactionStatus.CAPTURED);
});

test("ebt transaction refund", async () => {
  card.cardHolderName = "Jane Doe";
  const transaction = await card
    .charge(amount)
    .withCurrency(currency)
    .execute();

  assertEbtTransactionResponse(transaction, TransactionStatus.CAPTURED);

  const response = await transaction.refund().withCurrency(currency).execute();

  assertEbtTransactionResponse(response, TransactionStatus.CAPTURED);
});

test("ebt sale refund swipe", async () => {
  const transaction = await track
    .charge(amount)
    .withCurrency(currency)
    .execute();

  assertEbtTransactionResponse(transaction, TransactionStatus.CAPTURED);

  const response = await transaction.refund().withCurrency(currency).execute();

  assertEbtTransactionResponse(response, TransactionStatus.CAPTURED);
});

test("ebt transaction reverse", async () => {
  card.cardHolderName = "Jane Doe";
  const transaction = await card
    .refund(amount)
    .withCurrency(currency)
    .execute();

  assertEbtTransactionResponse(transaction, TransactionStatus.CAPTURED);

  const response = await transaction.reverse().withCurrency(currency).execute();

  assertEbtTransactionResponse(response, TransactionStatus.REVERSED);
});

test("ebt sale reverse track data", async () => {
  const transaction = await track
    .charge(amount)
    .withCurrency(currency)
    .execute();

  assertEbtTransactionResponse(transaction, TransactionStatus.CAPTURED);

  const response = await transaction.reverse().withCurrency(currency).execute();

  assertEbtTransactionResponse(response, TransactionStatus.REVERSED);
});

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());
