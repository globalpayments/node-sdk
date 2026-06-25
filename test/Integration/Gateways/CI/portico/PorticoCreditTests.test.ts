import {
  AdditionalTaxDetails,
  CommercialData,
  CommercialLineItem,
  CreditCardData,
  CreditTrackData,
  DiscountDetails,
  EncryptionData,
  PorticoConfig,
  ServicesContainer,
  TaxType,
  Transaction,
  TransactionModifier,
} from "../../../../../src";
import {
  CacheMode,
  CiTestingHarness,
} from "../../../../Utils/CiTestingHarness";

const ciTestingHarness = new CiTestingHarness(
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
track.encryptionData = EncryptionData.version1();

const commercialData = new CommercialData(
  TaxType.SalesTax,
  TransactionModifier.LevelIII,
);
commercialData.poNumber = "9876543210";
commercialData.taxAmount = "10";
commercialData.destinationPostalCode = "85212";
commercialData.destinationCountryCode = "USA";
commercialData.originPostalCode = "22193";
commercialData.summaryCommodityCode = "SSC";
commercialData.customerReferenceId = "UVATREF162";
commercialData.orderDate = ciTestingHarness.getCurrentTime();
commercialData.freightAmount = "10";
commercialData.dutyAmount = "10";

const ad = new AdditionalTaxDetails();
ad.taxAmount = "10";
ad.taxRate = "10";
commercialData.additionalTaxDetails = ad;

const commercialLineItem = new CommercialLineItem();
commercialLineItem.description = "PRODUCT 1 NOTES";
commercialLineItem.productCode = "PRDCD1";
commercialLineItem.unitCost = "0.01";
commercialLineItem.quantity = "1";
commercialLineItem.unitOfMeasure = "METER";
commercialLineItem.totalAmount = "10";

const discountDetails = new DiscountDetails();
discountDetails.discountAmount = "1";
commercialLineItem.discountDetails = discountDetails;

commercialData.addLineItems(commercialLineItem);

function configurePorticoService(): void {
  const config = new PorticoConfig();
  config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
  config.developerId = "002914";
  config.versionNumber = "3026";
  config.serviceUrl = ciTestingHarness.getTestingUrl();
  ServicesContainer.configureService(config);
  ciTestingHarness.reset();
}

test("creditSale", async () => {
  ciTestingHarness.setFunction("Portico|Credit Transactions|CreditSale");
  configurePorticoService();

  const clientTxnID = ciTestingHarness.generateRandomId("creditSale");
  const response = await card
    .charge("15.5")
    .withCurrency("USD")
    .withClientTransactionId(clientTxnID)
    .withAllowDuplicates(true)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
  expect(response.clientTransactionId).toBe(clientTxnID);
});

test("creditTxnEdit", async () => {
  ciTestingHarness.setFunction(
    "Portico|Credit Transactions|CreditTxnEdit - aka Gratuity",
  );
  configurePorticoService();

  const clientTxnID = ciTestingHarness.generateRandomId("creditTxnEdit_charge");
  const chargeResponse = await card
    .charge("15")
    .withCurrency("USD")
    .withClientTransactionId(clientTxnID)
    .withAllowDuplicates(true)
    .execute();

  expect(chargeResponse).toBeTruthy();
  expect(chargeResponse.responseCode).toBe("00");

  const editClientTxnID =
    ciTestingHarness.generateRandomId("creditTxnEdit_edit");
  const editResponse = await chargeResponse
    .edit()
    .withCurrency("USD")
    .withGratuity("2")
    .withClientTransactionId(editClientTxnID)
    .execute();

  expect(editResponse).toBeTruthy();
  expect(editResponse.responseCode).toBe("00");
  expect(editResponse.clientTransactionId).toBe(editClientTxnID);
});

test("creditAdditionalAuth", async () => {
  ciTestingHarness.setFunction(
    "Portico|Credit Transactions|CreditAdditionalAuth",
  );
  configurePorticoService();

  const clientTxnID = ciTestingHarness.generateRandomId(
    "creditAdditionalAuth_auth",
  );
  const authResponse = await card
    .authorize("10")
    .withCurrency("USD")
    .withClientTransactionId(clientTxnID)
    .withAllowDuplicates(true)
    .execute();

  expect(authResponse).toBeTruthy();
  expect(authResponse.responseCode).toBe("00");
  expect(authResponse.clientTransactionId).toBe(clientTxnID);

  const additionalAuthClientTxnID = ciTestingHarness.generateRandomId(
    "creditAdditionalAuth_additional",
  );
  const additionalAuthResponse = await Transaction.fromId(
    authResponse.transactionId,
  )
    .additionalAuth("10")
    .withCurrency("USD")
    .withModifier(TransactionModifier.Incremental)
    .withClientTransactionId(additionalAuthClientTxnID)
    .execute();

  expect(additionalAuthResponse).toBeTruthy();
  expect(additionalAuthResponse.responseCode).toBe("00");
  expect(additionalAuthResponse.clientTransactionId).toBe(
    additionalAuthClientTxnID,
  );
});
