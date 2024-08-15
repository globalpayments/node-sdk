import {
  Address,
  CreditCardData,
  CreditTrackData,
  EncryptionData,
  MobilePaymentMethodType,
  PaymentDataSourceType,
  PorticoConfig,
  ReportingService,
  ServicesContainer,
  StoredCredentialInitiator,
  TaxType,
  Transaction,
  TransactionModifier,
} from "../../../../src";
import {DiscountDetails} from "../../../../src/Entities/DiscountDetails";
import {AdditionalTaxDetails} from "../../../../src/Entities/AdditionalTaxDetails";
import {CommercialLineItem} from "../../../../src/Entities/CommercialLineItem";
import {CommercialData} from "../../../../src/Entities/CommercialData";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

const track = new CreditTrackData();
/* eslint-disable */
track.value =
    "<E1050711%B4012001000000016^VI TEST CREDIT^251200000000000000000000?|LO04K0WFOmdkDz0um+GwUkILL8ZZOP6Zc4rCpZ9+kg2T3JBT4AEOilWTI|+++++++Dbbn04ekG|11;4012001000000016=25120000000000000000?|1u2F/aEhbdoPixyAPGyIDv3gBfF|+++++++Dbbn04ekG|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|>;";
  /* eslint-enable */
track.encryptionData = new EncryptionData();
track.encryptionData.version = "01";

beforeEach(() => {
  const config = new PorticoConfig();
  config.secretApiKey = "skapi_cert_MXDMBQDwa3IAA4GV7NGMqQA_wFR3_TNeamFWoNUu_Q";
  ServicesContainer.configureService(config);
});

test("credit authorization", async () => {
  const authorization = await card
    .authorize("14")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(authorization).toBeTruthy();
  expect(authorization.responseCode).toBe("00");
});

test("credit auth with convenience", async () => {
  const response = await card
    .authorize(14)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withConvenienceAmt(2)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const report = await ReportingService.transactionDetail(
    response.transactionId,
  ).execute();

  expect(report).toBeTruthy();
  expect(report.convenienceAmt).toBe("2.00");
});

test.skip("test apple for th web", async () => {
  const card = new CreditCardData();
  card.mobileType = MobilePaymentMethodType.APPLEPAY;
  card.paymentSource = PaymentDataSourceType.APPLEPAYWEB;
  card.token = `{"data":"ds7WslKzRRXSN6HSR6nVHFIjpS8h8JPPw8D0rbsumt9M3wZmm5mEHK\/J74mEMSaD0a0Ck5OEW6wi+cpdm1NQx7WOSV1TQhgJuVYPg6NhEP1zetFYAQywKjK9qKM3EBLX1ZpmHwh3pj+I3WimZeW8UjUTEVyzFiD0r1FLKsTzyvtFocRI+hHe02qwkwHg2hJzgD0Gqb7op\/8kkCXv86YZAaL1Isj3\/aBF7hqv71d3sO2bKAQCgxWkj8Fd2uRLSTFXIfILMZVnvvyO73szXmI440CQt4k7\/e2WMWwy\/yWoY3fe\/+nQz1j0dQGlTdaEmDwcFfm1dXDRjdzN0AEVzhNyeeCO70n03RtMFNoOKsVyU7M79t4QXe6nE9WOqIzu20+JfnDI8VMdiCWihQx2PME280y0JMDmhZ79qqKKtjcQgQ==","signature":"MIAGCSqGSIb3DQEHAqCAMIACAQExDTALBglghkgBZQMEAgEwgAYJKoZIhvcNAQcBAACggDCCA+MwggOIoAMCAQICCEwwQUlRnVQ2MAoGCCqGSM49BAMCMHoxLjAsBgNVBAMMJUFwcGxlIEFwcGxpY2F0aW9uIEludGVncmF0aW9uIENBIC0gRzMxJjAkBgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzAeFw0xOTA1MTgwMTMyNTdaFw0yNDA1MTYwMTMyNTdaMF8xJTAjBgNVBAMMHGVjYy1zbXAtYnJva2VyLXNpZ25fVUM0LVBST0QxFDASBgNVBAsMC2lPUyBTeXN0ZW1zMRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABMIVd+3r1seyIY9o3XCQoSGNx7C9bywoPYRgldlK9KVBG4NCDtgR80B+gzMfHFTD9+syINa61dTv9JKJiT58DxOjggIRMIICDTAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFCPyScRPk+TvJ+bE9ihsP6K7\/S5LMEUGCCsGAQUFBwEBBDkwNzA1BggrBgEFBQcwAYYpaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwNC1hcHBsZWFpY2EzMDIwggEdBgNVHSAEggEUMIIBEDCCAQwGCSqGSIb3Y2QFATCB\/jCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjA2BggrBgEFBQcCARYqaHR0cDovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMDQGA1UdHwQtMCswKaAnoCWGI2h0dHA6Ly9jcmwuYXBwbGUuY29tL2FwcGxlYWljYTMuY3JsMB0GA1UdDgQWBBSUV9tv1XSBhomJdi9+V4UH55tYJDAOBgNVHQ8BAf8EBAMCB4AwDwYJKoZIhvdjZAYdBAIFADAKBggqhkjOPQQDAgNJADBGAiEAvglXH+ceHnNbVeWvrLTHL+tEXzAYUiLHJRACth69b1UCIQDRizUKXdbdbrF0YDWxHrLOh8+j5q9svYOAiQ3ILN2qYzCCAu4wggJ1oAMCAQICCEltL786mNqXMAoGCCqGSM49BAMCMGcxGzAZBgNVBAMMEkFwcGxlIFJvb3QgQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMB4XDTE0MDUwNjIzNDYzMFoXDTI5MDUwNjIzNDYzMFowejEuMCwGA1UEAwwlQXBwbGUgQXBwbGljYXRpb24gSW50ZWdyYXRpb24gQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE8BcRhBnXZIXVGl4lgQd26ICi7957rk3gjfxLk+EzVtVmWzWuItCXdg0iTnu6CP12F86Iy3a7ZnC+yOgphP9URaOB9zCB9DBGBggrBgEFBQcBAQQ6MDgwNgYIKwYBBQUHMAGGKmh0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDQtYXBwbGVyb290Y2FnMzAdBgNVHQ4EFgQUI\/JJxE+T5O8n5sT2KGw\/orv9LkswDwYDVR0TAQH\/BAUwAwEB\/zAfBgNVHSMEGDAWgBS7sN6hWDOImqSKmd6+veuv2sskqzA3BgNVHR8EMDAuMCygKqAohiZodHRwOi8vY3JsLmFwcGxlLmNvbS9hcHBsZXJvb3RjYWczLmNybDAOBgNVHQ8BAf8EBAMCAQYwEAYKKoZIhvdjZAYCDgQCBQAwCgYIKoZIzj0EAwIDZwAwZAIwOs9yg1EWmbGG+zXDVspiv\/QX7dkPdU2ijr7xnIFeQreJ+Jj3m1mfmNVBDY+d6cL+AjAyLdVEIbCjBXdsXfM4O5Bn\/Rd8LCFtlk\/GcmmCEm9U+Hp9G5nLmwmJIWEGmQ8Jkh0AADGCAYcwggGDAgEBMIGGMHoxLjAsBgNVBAMMJUFwcGxlIEFwcGxpY2F0aW9uIEludGVncmF0aW9uIENBIC0gRzMxJjAkBgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUwIITDBBSVGdVDYwCwYJYIZIAWUDBAIBoIGTMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTI0MDIyNjE0MTgwNVowKAYJKoZIhvcNAQk0MRswGTALBglghkgBZQMEAgGhCgYIKoZIzj0EAwIwLwYJKoZIhvcNAQkEMSIEIDQj1ygVhd1IUPxoIa2i++DIf9IxPiGtQuZOA6BbGz+TMAoGCCqGSM49BAMCBEYwRAIgJP6JK70mlb0ygdTkvu9CQEAlcrUyE4KfUf3DEP0blToCIGWSySQVRNOZG\/yXOcPYjG9MQhj7Gpw01CI3EAqTrDvdAAAAAAAA","header":{"publicKeyHash":"Kb\/42oDOuLCXiRG5lbBSpPmSeRnStkfSs87ysZRo67s=","ephemeralPublicKey":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEmUrBdMegPP3RRosolYhDXo4wsyx0HqDh\/SRrvEsTptDmb0Z4LwRtMwj4oJq9DIN3nv\/JFHtKGApxVt9vIzy0cg==","transactionId":"44af634acf09631a36a24e6fcb04532c994ad46ac252ec767334a7cca99c9880"},"version":"EC_v1"}`;
  const response = await card
    .charge(10)
    .withCurrency("USD")
    .withInvoiceNumber("1234567890")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
});

test("credit auth with shipping", async () => {
  const response = await card
    .authorize(14)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withShippingAmt(2)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const report = await ReportingService.transactionDetail(
    response.transactionId,
  ).execute();

  expect(report).toBeTruthy();
  expect(report.shippingAmt).toBe("2.00");
});

test.skip("credit auth with cof", async () => {
  const response = await card
    .authorize(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withCardBrandStorage(StoredCredentialInitiator.CardHolder)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
  expect(response.cardBrandTransactionId).toBeTruthy();

  const cofResponse = await card
    .authorize(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withCardBrandStorage(
      StoredCredentialInitiator.Merchant,
      response.cardBrandTransactionId,
    )
    .execute();

  expect(cofResponse).toBeTruthy();
  expect(cofResponse.responseCode).toBe("00");

  const capture = await cofResponse.capture().execute();

  expect(capture).toBeTruthy();
  expect(capture.responseCode).toBe("00");
});

test("credit sale", async () => {
  const response = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit sale with convenience", async () => {
  const response = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withConvenienceAmt(2)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const report = await ReportingService.transactionDetail(
    response.transactionId,
  ).execute();

  expect(report).toBeTruthy();
  expect(report.convenienceAmt).toBe("2.00");
});

test("credit sale with shipping", async () => {
  const response = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withShippingAmt(2)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const report = await ReportingService.transactionDetail(
    response.transactionId,
  ).execute();

  expect(report).toBeTruthy();
  expect(report.shippingAmt).toBe("2.00");
});

test("credit sale with cof", async () => {
  const response = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withCardBrandStorage(StoredCredentialInitiator.CardHolder)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
  expect(response.cardBrandTransactionId).toBeTruthy();

  const cofResponse = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withCardBrandStorage(
      StoredCredentialInitiator.Merchant,
      response.cardBrandTransactionId,
    )
    .execute();

  expect(cofResponse).toBeTruthy();
  expect(cofResponse.responseCode).toBe("00");
});

test("credit offline authorization", async () => {
  const authorization = await card
    .authorize("16")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withOfflineAuthCode("123456")
    .execute();

  expect(authorization).toBeTruthy();
  expect(authorization.responseCode).toBe("00");
});

test("credit offline auth with convenience", async () => {
  const response = await card
    .authorize(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withConvenienceAmt(2)
    .withOfflineAuthCode("123456")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const report = await ReportingService.transactionDetail(
    response.transactionId,
  ).execute();

  expect(report).toBeTruthy();
  expect(report.convenienceAmt).toBe("2.00");
});

test("credit offline auth with shipping", async () => {
  const response = await card
    .authorize(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withShippingAmt(2)
    .withOfflineAuthCode("123456")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const report = await ReportingService.transactionDetail(
    response.transactionId,
  ).execute();

  expect(report).toBeTruthy();
  expect(report.shippingAmt).toBe("2.00");
});

test("credit offline sale", async () => {
  const response = await card
    .charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withOfflineAuthCode("123456")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit offline sale with convenience", async () => {
  const response = await card
    .charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withConvenienceAmt(2)
    .withOfflineAuthCode("123456")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const report = await ReportingService.transactionDetail(
    response.transactionId,
  ).execute();

  expect(report).toBeTruthy();
  expect(report.convenienceAmt).toBe("2.00");
});

test("credit offline sale with shipping", async () => {
  const response = await card
    .charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withShippingAmt(2)
    .withOfflineAuthCode("123456")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const report = await ReportingService.transactionDetail(
    response.transactionId,
  ).execute();

  expect(report).toBeTruthy();
  expect(report.shippingAmt).toBe("2.00");
});

test("credit refund", async () => {
  const response = await card
    .refund(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit reverse", async () => {
  const response = await card
    .reverse(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit verify", async () => {
  const response = await card
    .verify()
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit verify with cof", async () => {
  const response = await card
    .verify()
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withRequestMultiUseToken(true)
    .withCardBrandStorage(StoredCredentialInitiator.Merchant)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
  expect(response.cardBrandTransactionId).toBeTruthy();
});

test.skip("credit swipe authorization", async () => {
  const authorization = await track
    .authorize("14")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(authorization).toBeTruthy();
  expect(authorization.responseCode).toBe("00");

  const capture = await authorization
    .capture("16")
    .withGratuity("2.00")
    .execute();

  expect(capture).toBeTruthy();
  expect(capture.responseCode).toBe("00");
});

test('authorize and capture from transaction', async ()=> {


  const card = new CreditCardData();
  card.number = "4111111111111111";
  card.expMonth = "12";
  card.expYear = "2030";
  card.cvn = "123";

  const address =  new Address();
  address.postalCode = "750241234";

  const authResponse = await card.authorize(10)
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .withAddress(address)
      .execute();

  const captureResponse =  await Transaction.fromId(authResponse.transactionId)
      .capture(10)
      .withCurrency("USD")
      .execute();

  expect(authResponse).toBeTruthy();
  expect(captureResponse).toBeTruthy();

});

test("credit swipe sale", async () => {
  const response = await track
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit swipe offline authorization", async () => {
  const authorization = await track
    .authorize("16")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withOfflineAuthCode("123456")
    .execute();

  expect(authorization).toBeTruthy();
  expect(authorization.responseCode).toBe("00");
});

test("credit swipe offline sale", async () => {
  const response = await track
    .charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withOfflineAuthCode("123456")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.skip("credit swipe add value", async () => {
  const response = await track
    .addValue(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit swipe balance inquiry", async () => {
  const response = await track.balanceInquiry().execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit swipe refund", async () => {
  const response = await track
    .refund(16)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit swipe reverse", async () => {
  const sale = await track
    .charge(19)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(sale).toBeTruthy();
  expect(sale.responseCode).toBe("00");

  const response = await track
    .reverse(19)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit swipe verify", async () => {
  const response = await track
    .verify()
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.skip("credit void from transaction id", async () => {
  const auth = await card
    .authorize(10)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(auth).toBeTruthy();
  expect(auth.responseCode).toBe("00");

  const voidResponse = await Transaction.fromId(auth.transactionId)
    .void()
    .execute();

  expect(voidResponse).toBeTruthy();
  expect(voidResponse.responseCode).toBe("00");
});

test("level_iii_response", async () => {
  const address = new Address();
  address.postalCode = "75024";
  address.streetAddress1 = "6860";

  const commercialData = new CommercialData(
    TaxType.SalesTax,
    TransactionModifier.LevelIII,
  );
  commercialData.poNumber = "9876543210";
  commercialData.taxAmount = 10;
  commercialData.destinationPostalCode = "85212";
  commercialData.destinationCountryCode = "USA";
  commercialData.originPostalCode = "22193";
  commercialData.summaryCommodityCode = "SSC";
  commercialData.customerReferenceId = "UVATREF162";
  commercialData.orderDate = new Date();
  commercialData.freightAmount = 10;
  commercialData.dutyAmount = 10;

  const additionalTaxDetails = new AdditionalTaxDetails();
  additionalTaxDetails.taxAmount = 10;
  additionalTaxDetails.taxRate = 10;

  commercialData.additionalTaxDetails = additionalTaxDetails;
  const commercialLineItem = new CommercialLineItem();

  commercialLineItem.description = "PRODUCT 1 NOTES";
  commercialLineItem.productCode = "PRDCD1";
  commercialLineItem.quantity = 1;

  const discountDetails = new DiscountDetails();
  discountDetails.discountAmount = 10;
  commercialLineItem.discountDetails = discountDetails;

  commercialData.addLineItems(commercialLineItem);

  const chargeResponse = await card
    .charge("111.12")
    .withCurrency("USD")
    .withAddress(address)
    .withCommercialRequest(true)
    .execute();

  expect(chargeResponse).toBeTruthy();
  expect(chargeResponse.responseCode).toBe("00");
  expect(chargeResponse.commercialIndicator).toBe("0");
  const mb = chargeResponse.edit();
  const cpcResponse = await mb.withCommercialData(commercialData).execute();
  expect(cpcResponse).toBeTruthy();
  expect(cpcResponse.responseCode).toBe("00");
});

test("incremental auth", async () => {
  const address = new Address();
  address.postalCode = "750241234";

  const origResponse = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  const captureResponse = await Transaction.fromId(origResponse.transactionId)
    .additionalAuth(12)
    .withModifier(TransactionModifier.Incremental)
    .withCurrency("USD")
    .execute();

  expect(origResponse).toBeTruthy();
  expect(captureResponse).toBeTruthy();
});
