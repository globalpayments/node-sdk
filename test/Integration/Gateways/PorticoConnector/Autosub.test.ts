import {
  AutoSubstantiation,
  CreditCardData,
  CreditTrackData,
  EncryptionData,
  PorticoConfig,
  ServicesContainer,
} from "../../../../src";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";

const track = new CreditTrackData();
/* eslint-disable */
track.value =
  "<E1050711%B4012001000000016^VI TEST CREDIT^251200000000000000000000?|LO04K0WFOmdkDz0um+GwUkILL8ZZOP6Zc4rCpZ9+kg2T3JBT4AEOilWTI|+++++++Dbbn04ekG|11;4012001000000016=25120000000000000000?|1u2F/aEhbdoPixyAPGyIDv3gBfF|+++++++Dbbn04ekG|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|>;";
/* eslint-enable */
track.encryptionData = new EncryptionData();
track.encryptionData.version = "01";

beforeEach(() => {
  const config = new PorticoConfig();
  config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
  config.serviceUrl = "https://cert.api2.heartlandportico.com";
  ServicesContainer.configureService(config);
});

test("total amount test", () => {
  const autoSub = new AutoSubstantiation();
  autoSub.setClinicSubTotal("25");
  autoSub.setVisionSubTotal("25");
  autoSub.setDentalSubTotal("25");
  autoSub.setPrescriptionSubTotal("25");

  expect(autoSub.getTotalHealthcareAmount()).toBe("100");
});

test("dental", async () => {
  const autoSub = new AutoSubstantiation();
  autoSub.setMerchantVerificationValue("12345");
  autoSub.setRealTimeSubstantiation(false);
  autoSub.setDentalSubTotal("150");

  const response = await card
    .charge(215)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withAutoSubstantiation(autoSub)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("vision", async () => {
  const autoSub = new AutoSubstantiation();
  autoSub.setMerchantVerificationValue("12345");
  autoSub.setRealTimeSubstantiation(false);
  autoSub.setVisionSubTotal("150");

  const response = await track
    .charge(215)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withAutoSubstantiation(autoSub)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("clinic or other", async () => {
  const autoSub = new AutoSubstantiation();
  autoSub.setMerchantVerificationValue("12345");
  autoSub.setRealTimeSubstantiation(false);
  autoSub.setClinicSubTotal("150");

  const response = await card
    .charge(215)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withAutoSubstantiation(autoSub)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("prescription", async () => {
  const autoSub = new AutoSubstantiation();
  autoSub.setMerchantVerificationValue("12345");
  autoSub.setRealTimeSubstantiation(false);
  autoSub.setPrescriptionSubTotal("150");

  const response = await track
    .charge(215)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withAutoSubstantiation(autoSub)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("all sub totals", async () => {
  const autoSub = new AutoSubstantiation();
  autoSub.setMerchantVerificationValue("12345");
  autoSub.setRealTimeSubstantiation(false);
  autoSub.setClinicSubTotal("25");
  autoSub.setVisionSubTotal("25");
  autoSub.setDentalSubTotal("25");
  autoSub.setPrescriptionSubTotal("25");

  try {
    await card
      .charge(215)
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .withAutoSubstantiation(autoSub)
      .execute();

    // if we get here, the test should fail
    expect(true).toBe(false);
  } catch (error) {
    expect(error.message).toBe(
      "You may only specify three different subtotals in a single transaction.",
    );
  }
});

test("three sub totals", async () => {
  const autoSub = new AutoSubstantiation();
  autoSub.setMerchantVerificationValue("12345");
  autoSub.setRealTimeSubstantiation(false);
  autoSub.setClinicSubTotal("25");
  autoSub.setVisionSubTotal("25");
  autoSub.setDentalSubTotal("25");

  const response = await track
    .charge(215)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withAutoSubstantiation(autoSub)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("two sub totals", async () => {
  const autoSub = new AutoSubstantiation();
  autoSub.setMerchantVerificationValue("12345");
  autoSub.setRealTimeSubstantiation(false);
  autoSub.setClinicSubTotal("25");
  autoSub.setVisionSubTotal("25");

  const response = await card
    .charge(215)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withAutoSubstantiation(autoSub)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});
