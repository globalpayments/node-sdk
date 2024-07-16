import {
  DebitTrackData,
  EncryptionData,
  PaymentMethodType,
  PorticoConfig,
  ServicesContainer,
  Transaction,
  UnsupportedTransactionError,
} from "../../../../src";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";

const track = new DebitTrackData();
/* eslint-disable */
track.value =
  "&lt;E1050711%B4012001000000016^VI TEST CREDIT^251200000000000000000000?|LO04K0WFOmdkDz0um+GwUkILL8ZZOP6Zc4rCpZ9+kg2T3JBT4AEOilWTI|+++++++Dbbn04ekG|11;4012001000000016=25120000000000000000?|1u2F/aEhbdoPixyAPGyIDv3gBfF|+++++++Dbbn04ekG|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|&gt;";
/* eslint-enable */
track.pinBlock = "32539F50C245A6A93D123412324000AA";
track.encryptionData = new EncryptionData();
track.encryptionData.version = "01";

beforeAll(() => {
  ServicesContainer.configureService(config);
});

test("debit sale", async () => {
  expect.assertions(2);

  const response = await track
    .charge(17.01)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.failing("debit add value", async () => {
  expect.assertions(2);

  const response = await track
    .addValue(15.01)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("debit refund", async () => {
  expect.assertions(2);

  const response = await track
    .refund(16.01)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("debit reverse", async () => {
  expect.assertions(2);

  const response = await track
    .reverse(17.01)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("debit cannot refund from transaction id only", async () => {
  try {
    await Transaction.fromId("1234567890", PaymentMethodType.Debit)
      .refund()
      .withCurrency("USD")
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error).toBeInstanceOf(UnsupportedTransactionError);
  }
});

test("Debit Reversal with fromId method", async () => {
  const response = await track
    .charge(17.01)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const reversalResponse = await Transaction.fromId(
    response.transactionId,
    PaymentMethodType.Debit,
  )
    .reverse()
    .execute();

  expect(reversalResponse).toBeTruthy();
  expect(reversalResponse.responseCode).toBe("00");
});
