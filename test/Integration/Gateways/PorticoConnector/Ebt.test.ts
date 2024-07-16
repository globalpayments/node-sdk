import {
  ApiError,
  EBTCardData,
  EBTTrackData,
  EncryptionData,
  PaymentMethodType,
  PorticoConfig,
  ServicesContainer,
  Transaction,
} from "../../../../src";

const config = new PorticoConfig();

const card = new EBTCardData();
card.number = "4012002000060016";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.pinBlock = "32539F50C245A6A93D123412324000AA";

const track = new EBTTrackData();

track.value =
  "<E1050711%B4012001000000016^VI TEST CREDIT^251200000000000000000000?|LO04K0WFOmdkDz0um+GwUkILL8ZZOP6Zc4rCpZ9+kg2T3JBT4AEOilWTI|+++++++Dbbn04ekG|11;4012001000000016=25120000000000000000?|1u2F/aEhbdoPixyAPGyIDv3gBfF|+++++++Dbbn04ekG|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|>;";

track.pinBlock = "32539F50C245A6A93D123412324000AA";
track.encryptionData = new EncryptionData();
track.encryptionData.version = "01";

beforeAll(() => {
  config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";
  ServicesContainer.configureService(config);
});

test("ebt balance inquiry", async () => {
  const response = await card.balanceInquiry().execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("ebt sale", async () => {
  const response = await card.charge(10).withCurrency("USD").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("ebt refund", async () => {
  const response = await card.refund(10).withCurrency("USD").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("ebt track balance inquiry", async () => {
  expect.assertions(2);

  const response = await track.balanceInquiry().execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("ebt track sale", async () => {
  const response = await track.charge(11).withCurrency("USD").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("ebt track refund", async () => {
  const response = await track.refund(11).withCurrency("USD").execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("ebt refund fails from transaction id only", async () => {
  try {
    await Transaction.fromId("1234567890", PaymentMethodType.EBT)
      .refund()
      .execute();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error).toBeInstanceOf(ApiError);
  }
});
