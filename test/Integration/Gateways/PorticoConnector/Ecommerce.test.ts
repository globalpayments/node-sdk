import {
  CreditCardData,
  EcommerceChannel,
  EcommerceInfo,
  MobilePaymentMethodType,
  PaymentDataSourceType,
  PorticoConfig,
  ServicesContainer,
} from "../../../../src";
import { TestCards } from "../../../Data";

const card = TestCards.visaManual();
card.tokenize();

beforeEach(() => {
  const config = new PorticoConfig();
  config.secretApiKey = "skapi_cert_MXDMBQDwa3IAA4GV7NGMqQA_wFR3_TNeamFWoNUu_Q";
  ServicesContainer.configureService(config);
});

test("ecom with moto", async () => {
  const ecom = new EcommerceInfo();
  ecom.channel = EcommerceChannel.Moto;

  const response = await card
    .charge(9)
    .withCurrency("USD")
    .withEcommerceInfo(ecom)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("ecom with direct market ship date", async () => {
  const ecom = new EcommerceInfo();
  ecom.shipDay = "25";
  ecom.shipMonth = "12";

  const response = await card
    .charge(9)
    .withCurrency("USD")
    .withEcommerceInfo(ecom)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("ecom with direct market invoice no ship date", async () => {
  const response = await card
    .charge(9)
    .withCurrency("USD")
    .withEcommerceInfo(new EcommerceInfo())
    .withInvoiceNumber("1234567890")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("ecom with direct market invoice and ship date", async () => {
  const ecom = new EcommerceInfo();
  ecom.channel = EcommerceChannel.Moto;
  ecom.shipDay = "25";
  ecom.shipMonth = "12";

  const response = await card
    .charge(9)
    .withCurrency("USD")
    .withEcommerceInfo(ecom)
    .withInvoiceNumber("1234567890")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("ecom with secure ecommerce", async () => {
  const ecom = new EcommerceInfo();
  ecom.paymentDataSource = "ApplePay";
  ecom.cavv = "XXXXf98AAajXbDRg3HSUMAACAAA=";
  ecom.eci = "5";

  const response = await card
    .charge(9)
    .withCurrency("USD")
    .withEcommerceInfo(ecom)
    .withInvoiceNumber("1234567890")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.skip("ecom with walletdata", async () => {
  card.mobileType = MobilePaymentMethodType.GOOGLEPAY;
  card.paymentSource = PaymentDataSourceType.GOOGLEPAYWEB;
  card.token = `{
    "signature": "MEQCICd1jRuaiWW5z9olPR+xBi6Z7CmW019Ys+EOKO2RIgy9AiA2d/hWKuRYtayJl//Cc1r2wifxv69lRrRHTTPbelKhzA==",
    "protocolVersion": "ECv1",
    "signedMessage": {
      "encryptedMessage": "wuSFSWEDYmECYdL57Glj1jtQ4hVN69cp82vsXyWN7Nw05ocSTqh6dYBb1FRboq1IjYhPf4MPOliBSJHugiHbeYilrT8HeXD+cU+rF9nNtucMFjMIFltik9aOSnpM0E8t9AJ60CFBwLebhHXvA53TlrziBTCQbhoVk2IAMO/tJKl1mI5rR+7sUI+BlIXFBcUba6T8eLz4z7wYwPxuBptP20u5C5QqMV5kY4aF6mCKwbLT5AzDLBiKA+eW9VtlP9icuxigYMOTP6wsrdiW7FMtHc0o3/MnBpZwWRpcponfnoNQnQMjOSiROZVHcHUK0i/lFUJg9p1Xi20qSyXIjq2WjCF7hSoDw1KzRnYO7uyx1yHN9vmLo+NqVfipRSpT7AtBt9CR8yHQftNQlady+VKSIhmigPTXVIapIf7CA27hiRysVGpWbrMZrJJYilFXh6eFPbk2",
      "ephemeralPublicKey": "BFe4YpEa1hfmaYlcWR4eyVxZmanOCzDak9yy90PCIAfIMeeRCT9zX5KAnj2k/vWa+oZIv1McjgBIKAp/BoWKNkM=",
      "tag": "IpXW8ECpNCLzN36M3S7nbQ1YnXxDeMx1RLwElW0xCg0="
    }
  }`;
  const response = await card
    .charge(10)
    .withCurrency("USD")
    .withInvoiceNumber("1234567890")
    .withAllowDuplicates(true)
    .execute();
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

/**
 * This test demonstrates and tests behavior around requesting unique
 * Multi-Use Tokens
 *
 * @return void
 * @throws ApiException
 * @throws InvalidArgumentException
 * @throws ExpectationFailedException
 */
test("Should return a unique token upon request", async () => {
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "10";
  card.expYear = "2025";
  card.cvn = "131";

  card.tokenize();

  const response1 = await card
    .verify()
    .withRequestMultiUseToken(true)
    .execute();

  expect(response1).toBeTruthy();
  expect(response1.token).toBeTruthy();

  const response2 = await card
    .verify()
    .withRequestMultiUseToken(true)
    .execute();

  expect(response2).toBeTruthy();
  expect(response2.token).toBeTruthy();
  expect(response1.token).toBe(response2.token);

  const response3 = await card
    .verify()
    .withRequestMultiUseToken(true, true)
    .execute();

  expect(response3).toBeTruthy();
  expect(response3.token).toBeTruthy();
  expect(response1.token).not.toEqual(response3.token);
});
