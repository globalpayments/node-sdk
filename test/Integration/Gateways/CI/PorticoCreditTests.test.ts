import {
  CreditCardData,
  CreditTrackData,
  EncryptionData,
  PorticoConfig,
  ServicesContainer,
} from "../../../../src";
import { CacheMode, CiTestingHarness } from "../../../Utils/CiTestingHarness";

const harness = new CiTestingHarness(
  "https://cert.api2.heartlandportico.com",
  CacheMode.Locked,
  "PorticoCreditTests",
);

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";

const track = new CreditTrackData();
track.value =
  "<E1050711%B4012001000000016^VI TEST CREDIT^251200000000000000000000?|LO04K0WFOmdkDz0um+GwUkILL8ZZOP6Zc4rCpZ9+kg2T3JBT4AEOilWTI|+++++++Dbbn04ekG|11;4012001000000016=25120000000000000000?|1u2F/aEhbdoPixyAPGyIDv3gBfF|+++++++Dbbn04ekG|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|>;";
track.encryptionData = new EncryptionData();
track.encryptionData.version = "01";

beforeAll(() => {
  const config = new PorticoConfig();
  config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
  config.serviceUrl = harness.getTestingUrl();
  config.developerId = "002914";
  config.versionNumber = "3026";
  ServicesContainer.configureService(config);
});

test("credit authorization", async () => {
  const response = await card
    .authorize("14")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const capture = await response.capture("16").withGratuity("2").execute();
  expect(capture).toBeTruthy();
  expect(capture.responseCode).toBe("00");
});

test("credit sale", async () => {
  const clientTxnID = harness.generateRandomId("creditSale");
  const response = await card
    .charge("15")
    .withCurrency("USD")
    .withClientTransactionId(clientTxnID)
    .withAllowDuplicates(true)
    .execute();
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit swipe sale", async () => {
  const clientTxnID = harness.generateRandomId("creditSwipeSale");
  const response = await track
    .charge("15")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withClientTransactionId(clientTxnID)
    .execute();
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("credit verify", async () => {
  const response = await card.verify().withAllowDuplicates(true).execute();
  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});
