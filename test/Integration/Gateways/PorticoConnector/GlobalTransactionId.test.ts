import {
  AdditionalTaxDetails,
  Address,
  CommercialData,
  CommercialLineItem,
  CreditCardData,
  DiscountDetails,
  PorticoConfig,
  ReportingService,
  ServicesContainer,
  TaxType,
  Transaction,
  TransactionModifier,
  Logger,
  SampleRequestLogger,
} from "../../../../src";

const config = new PorticoConfig();

config.requestLogger = new SampleRequestLogger(new Logger("logs"));

const card = new CreditCardData();
card.number = "5473500000000014";
card.expMonth = "12";
card.expYear = "2030";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

beforeAll(() => {
  config.secretApiKey = "skapi_cert_MXDMBQDwa3IAA4GV7NGMqQA_wFR3_TNeamFWoNUu_Q";
  ServicesContainer.configureService(config);
});

test("credit sale returns globalTransactionId", async () => {
  const response = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  console.log("=== Credit Sale - globalTransactionId Mapping Test ===");
  console.log("Response Code:", response.responseCode);
  console.log("Global Transaction ID:", response.globalTransactionId);
  console.log("======================================================");

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
  expect(response.globalTransactionId).toBeTruthy();
});

test("credit authorization returns globalTransactionId", async () => {
  const response = await card
    .authorize("14")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  console.log("=== Credit Auth - globalTransactionId Mapping Test ===");
  console.log("Response Code:", response.responseCode);
  console.log("Global Transaction ID:", response.globalTransactionId);
  console.log("=====================================================");

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
  expect(response.globalTransactionId).toBeTruthy();

  // Also verify capture returns globalTransactionId
  const capture = await response.capture("16").withGratuity("2").execute();

  console.log("=== Capture - globalTransactionId Mapping Test ===");
  console.log("Capture Response Code:", capture.responseCode);
  console.log("Capture Global Transaction ID:", capture.globalTransactionId);
  console.log("==================================================");

  expect(capture).toBeTruthy();
  expect(capture.responseCode).toBe("00");
  expect(capture.globalTransactionId).toBeTruthy();
});

test("credit refund returns globalTransactionId", async () => {
  const saleResponse = await card
    .charge(25)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(saleResponse).toBeTruthy();
  expect(saleResponse.responseCode).toBe("00");

  const refundResponse = await saleResponse
    .refund(25)
    .withCurrency("USD")
    .execute();

  console.log("=== Credit Refund - globalTransactionId Mapping Test ===");
  console.log("Refund Response Code:", refundResponse.responseCode);
  console.log(
    "Refund Global Transaction ID:",
    refundResponse.globalTransactionId,
  );

  expect(refundResponse).toBeTruthy();
  expect(refundResponse.responseCode).toBe("00");
  expect(refundResponse.globalTransactionId).toBeTruthy();
});

test("credit void returns globalTransactionId", async () => {
  const saleResponse = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(saleResponse).toBeTruthy();
  expect(saleResponse.responseCode).toBe("00");

  const voidResponse = await saleResponse.void().execute();

  console.log("=== Credit Void - globalTransactionId Mapping Test ===");
  console.log("Void Response Code:", voidResponse.responseCode);
  console.log("Void Global Transaction ID:", voidResponse.globalTransactionId);
  console.log("======================================================");

  expect(voidResponse).toBeTruthy();
  expect(voidResponse.responseCode).toBe("00");
  expect(voidResponse.globalTransactionId).toBeTruthy();
});

test("report transaction detail returns globalTransactionId", async () => {
  const saleResponse = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(saleResponse).toBeTruthy();
  expect(saleResponse.responseCode).toBe("00");

  const report = await ReportingService.transactionDetail(
    saleResponse.transactionId,
  ).execute();

  console.log(
    "=== Report Transaction Detail - globalTransactionId Mapping Test ===",
  );
  console.log("Report Gateway Response Code:", report.gatewayResponseCode);
  console.log("Report Global Transaction ID:", report.globalTransactionId);
  console.log(
    "====================================================================",
  );

  expect(report).toBeTruthy();
  expect(report.gatewayResponseCode).toBe("00");
  expect(report.globalTransactionId).toBeTruthy();
});

test("credit verify returns globalTransactionId", async () => {
  const response = await card.verify().withAllowDuplicates(true).execute();

  console.log("=== Credit Verify - globalTransactionId Mapping Test ===");
  console.log("Response Code:", response.responseCode);
  console.log("Global Transaction ID:", response.globalTransactionId);
  console.log("========================================================");

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
  expect(response.globalTransactionId).toBeTruthy();
});

test("credit CPC edit returns globalTransactionId", async () => {
  const address = new Address();
  address.postalCode = "75024";

  const commercialData = new CommercialData(
    TaxType.SalesTax,
    TransactionModifier.LevelII,
  );
  commercialData.poNumber = "9876544321";
  commercialData.taxAmount = 10;
  commercialData.destinationPostalCode = "85212";
  commercialData.destinationCountryCode = "USA";
  commercialData.originPostalCode = "22185";
  commercialData.summaryCommodityCode = "SCC";
  commercialData.customerVAT_Number = "123456789";
  commercialData.vat_InvoiceNumber = "UVATREF162";
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
    .withAllowDuplicates(true)
    .execute();

  expect(chargeResponse).toBeTruthy();
  expect(chargeResponse.responseCode).toBe("00");

  const cpcResponse = await chargeResponse
    .edit()
    .withCommercialData(commercialData)
    .withTaxType(TaxType.SalesTax)
    .execute();

  console.log("=== Credit CPC Edit - globalTransactionId Mapping Test ===");
  console.log("CPC Edit Response Code:", cpcResponse.responseCode);
  console.log("CPC Edit Transaction ID:", cpcResponse.transactionId);
  console.log(
    "CPC Edit Global Transaction ID:",
    cpcResponse.globalTransactionId,
  );
  console.log("==========================================================");

  expect(cpcResponse).toBeTruthy();
  expect(cpcResponse.responseCode).toBe("00");
  expect(cpcResponse.globalTransactionId).toBeTruthy();
});

test("credit incremental auth returns globalTransactionId", async () => {
  const origResponse = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(origResponse).toBeTruthy();
  expect(origResponse.responseCode).toBe("00");

  const incrementalResponse = await Transaction.fromId(
    origResponse.transactionId,
  )
    .additionalAuth(12)
    .withModifier(TransactionModifier.Incremental)
    .withCurrency("USD")
    .execute();

  console.log(
    "=== Credit Incremental Auth - globalTransactionId Mapping Test ===",
  );
  console.log(
    "Incremental Auth Response Code:",
    incrementalResponse.responseCode,
  );
  console.log(
    "Incremental Auth Global Transaction ID:",
    incrementalResponse.globalTransactionId,
  );
  console.log(
    "==================================================================",
  );

  expect(incrementalResponse).toBeTruthy();
  expect(incrementalResponse.responseCode).toBe("00");
  expect(incrementalResponse.globalTransactionId).toBeTruthy();
});

test("credit offline sale returns globalTransactionId", async () => {
  const response = await card
    .charge(17)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withOfflineAuthCode("123456")
    .execute();

  console.log("=== Credit Offline Sale - globalTransactionId Mapping Test ===");
  console.log("Response Code:", response.responseCode);
  console.log("Global Transaction ID:", response.globalTransactionId);
  console.log("==============================================================");

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
  expect(response.globalTransactionId).toBeTruthy();
});

test("credit txn edit returns globalTransactionId", async () => {
  const chargeResponse = await card
    .charge("15")
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(chargeResponse).toBeTruthy();
  expect(chargeResponse.responseCode).toBe("00");

  const editResponse = await chargeResponse
    .edit()
    .withCurrency("USD")
    .withGratuity("2")
    .execute();

  console.log("=== Credit Txn Edit - globalTransactionId Mapping Test ===");
  console.log("Edit Response Code:", editResponse.responseCode);
  console.log("Edit Global Transaction ID:", editResponse.globalTransactionId);
  console.log("==========================================================");

  expect(editResponse).toBeTruthy();
  expect(editResponse.responseCode).toBe("00");
  expect(editResponse.globalTransactionId).toBeTruthy();
});

test("credit reversal returns globalTransactionId", async () => {
  const saleResponse = await card
    .charge(15)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  expect(saleResponse).toBeTruthy();
  expect(saleResponse.responseCode).toBe("00");

  const reversalResponse = await saleResponse
    .reverse(15)
    .withCurrency("USD")
    .execute();

  console.log("=== Credit Reversal - globalTransactionId Mapping Test ===");
  console.log("Reversal Response Code:", reversalResponse.responseCode);
  console.log(
    "Reversal Global Transaction ID:",
    reversalResponse.globalTransactionId,
  );
  console.log("==========================================================");

  expect(reversalResponse).toBeTruthy();
  expect(reversalResponse.responseCode).toBe("00");
  expect(reversalResponse.globalTransactionId).toBeTruthy();
});
