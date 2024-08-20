import {
  AccessTokenInfo,
  Address,
  AddressType,
  AlternativePaymentMethod,
  AlternativePaymentResponse,
  AlternativePaymentType,
  BuilderError,
  Channel,
  GatewayError,
  GenerationUtils,
  MerchantCategory,
  OrderDetails,
  PaymentMethodType,
  PhoneNumberType,
  ReportingService,
  SearchCriteria,
  ServicesContainer,
  Transaction,
  TransactionStatus,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

let paymentMethod: AlternativePaymentMethod;
let shippingAddress: Address;
const currency = "USD";

const setup = () => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );

  paymentMethod = new AlternativePaymentMethod(AlternativePaymentType.Paypal);
  paymentMethod.returnUrl =
    "https://7b8e82a17ac00346e91e984f42a2a5fb.m.pipedream.net";
  paymentMethod.statusUpdateUrl =
    "https://7b8e82a17ac00346e91e984f42a2a5fb.m.pipedream.net";
  paymentMethod.cancelUrl =
    "https://7b8e82a17ac00346e91e984f42a2a5fb.m.pipedream.net";
  paymentMethod.descriptor = "Test Transaction";
  paymentMethod.country = "GB";
  paymentMethod.accountHolderName = "James Mason";

  shippingAddress = new Address();
  shippingAddress.streetAddress1 = "Apartment 852";
  shippingAddress.streetAddress2 = "Complex 741";
  shippingAddress.streetAddress3 = "no";
  shippingAddress.city = "Chicago";
  shippingAddress.postalCode = "5001";
  shippingAddress.state = "IL";
  shippingAddress.country = "US";

  const alipayConfig = BaseGpApiTestConfig.gpApiSetupConfig(
    Channel.CardNotPresent,
  );

  alipayConfig.appId = "QzFNaCAVCSH4tELLYz5iReERAJ3mqHu7";
  alipayConfig.appKey = "0QCyAwox3nRufZhX";
  alipayConfig.accessTokenInfo = new AccessTokenInfo();
  alipayConfig.accessTokenInfo.transactionProcessingAccountID =
    "TRA_c7fdc03bc9354fd3b674dddb22583553";

  ServicesContainer.configureService(alipayConfig, "alipayConfig");
};

beforeAll(() => {
  setup();
});

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// skipped due to human intervention - perform payment in the browser via logged url in the console
test.skip("paypal charge - full cycle", async () => {
  const response = await paymentMethod
    .charge(1.34)
    .withCurrency(currency)
    .withDescription("New APM")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.INITIATED);

  console.log(response.alternativePaymentResponse?.redirectUrl);

  await wait(25000);

  const startDate = new Date();

  const report = await ReportingService.findTransactionsPaged(1, 1)
    .withTransactionId(response.transactionId)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, startDate)
    .execute();

  expect(report).toBeTruthy();
  expect(report.result.length > 0).toBe(true);

  const transactionSummary = report.result.pop();

  expect(
    transactionSummary.alternativePaymentResponse instanceof
      AlternativePaymentResponse,
  ).toBe(true);
  expect(transactionSummary.alternativePaymentResponse.providerName).toBe(
    AlternativePaymentType.Paypal,
  );
  expect(transactionSummary.transactionStatus).toBe(TransactionStatus.PENDING);

  expect(
    transactionSummary.alternativePaymentResponse.providerReference,
  ).toBeTruthy();

  const transaction = await Transaction.fromId(
    transactionSummary.transactionId,
    PaymentMethodType.APM,
  );
  transaction.alternativePaymentResponse =
    transactionSummary.alternativePaymentResponse;

  const confirmResponse = await transaction.confirm().execute();
  expect(confirmResponse).toBeTruthy();
  expect(confirmResponse.responseCode).toBe("SUCCESS");
  expect(confirmResponse.responseMessage).toBe(TransactionStatus.CAPTURED);
});

// skipped due to human intervention - perform payment in the browser via logged url in the console
test.skip("paypal capture - full cycle", async () => {
  const response = await paymentMethod
    .authorize(1.34)
    .withCurrency(currency)
    .withDescription("New APM")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.INITIATED);

  console.log(response.alternativePaymentResponse?.redirectUrl);

  await wait(25000);

  const startDate = new Date();

  const report = await ReportingService.findTransactionsPaged(1, 1)
    .withTransactionId(response.transactionId)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, startDate)
    .execute();

  expect(report).toBeTruthy();
  expect(report.result.length > 0).toBe(true);

  const transactionSummary = report.result.pop();

  expect(transactionSummary.transactionId).toBeTruthy();
  expect(
    transactionSummary.alternativePaymentResponse instanceof
      AlternativePaymentResponse,
  ).toBe(true);
  expect(transactionSummary.alternativePaymentResponse.providerName).toBe(
    AlternativePaymentType.Paypal,
  );
  expect(transactionSummary.transactionStatus).toBe(TransactionStatus.PENDING);

  expect(
    transactionSummary.alternativePaymentResponse.providerReference,
  ).toBeTruthy();

  const transaction = await Transaction.fromId(
    transactionSummary.transactionId,
    PaymentMethodType.APM,
  );
  transaction.alternativePaymentResponse =
    transactionSummary.alternativePaymentResponse;

  const confirmResponse = await transaction.confirm().execute();
  expect(confirmResponse).toBeTruthy();
  expect(confirmResponse.responseCode).toBe("SUCCESS");
  expect(confirmResponse.responseMessage).toBe(TransactionStatus.PREAUTHORIZED);

  const capture = await transaction.capture().execute();

  expect(capture).toBeTruthy();
  expect(capture.responseCode).toBe("SUCCESS");
  expect(capture.responseMessage).toBe(TransactionStatus.CAPTURED);
});

// skipped due to human intervention - perform payment in the browser via logged url in the console
test.skip("paypal refund - full cycle", async () => {
  const response = await paymentMethod
    .charge(1.22)
    .withCurrency(currency)
    .withDescription("New APM")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.INITIATED);

  console.log(response.alternativePaymentResponse?.redirectUrl);

  await wait(25000);

  const startDate = new Date();

  const report = await ReportingService.findTransactionsPaged(1, 1)
    .withTransactionId(response.transactionId)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, startDate)
    .execute();

  expect(report).toBeTruthy();
  expect(report.result.length > 0).toBe(true);

  const transactionSummary = report.result.pop();

  expect(transactionSummary.transactionId).toBeTruthy();
  expect(
    transactionSummary.alternativePaymentResponse instanceof
      AlternativePaymentResponse,
  ).toBe(true);
  expect(transactionSummary.alternativePaymentResponse.providerName).toBe(
    AlternativePaymentType.Paypal,
  );
  expect(transactionSummary.transactionStatus).toBe(TransactionStatus.PENDING);

  expect(
    transactionSummary.alternativePaymentResponse.providerReference,
  ).toBeTruthy();

  const transaction = await Transaction.fromId(
    transactionSummary.transactionId,
    PaymentMethodType.APM,
  );
  transaction.alternativePaymentResponse =
    transactionSummary.alternativePaymentResponse;

  const confirmResponse = await transaction.confirm().execute();
  expect(confirmResponse).toBeTruthy();
  expect(confirmResponse.responseCode).toBe("SUCCESS");
  expect(confirmResponse.responseMessage).toBe(TransactionStatus.CAPTURED);

  const refund = await transaction.refund().withCurrency(currency).execute();

  expect(refund).toBeTruthy();
  expect(refund.responseCode).toBe("SUCCESS");
  expect(refund.responseMessage).toBe(TransactionStatus.CAPTURED);
});

// skipped due to human intervention - perform payment in the browser via logged url in the console
// problems with the API
test.skip("paypal reverse - full cycle", async () => {
  const response = await paymentMethod
    .charge(1.22)
    .withCurrency(currency)
    .withDescription("New APM")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.INITIATED);

  console.log(response.alternativePaymentResponse?.redirectUrl);

  await wait(25000);

  const startDate = new Date();

  const report = await ReportingService.findTransactionsPaged(1, 1)
    .withTransactionId(response.transactionId)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, startDate)
    .execute();

  expect(report).toBeTruthy();
  expect(report.result.length > 0).toBe(true);

  const transactionSummary = report.result.pop();

  expect(transactionSummary.transactionId).toBeTruthy();
  expect(
    transactionSummary.alternativePaymentResponse instanceof
      AlternativePaymentResponse,
  ).toBe(true);
  expect(transactionSummary.alternativePaymentResponse.providerName).toBe(
    AlternativePaymentType.Paypal,
  );
  expect(transactionSummary.transactionStatus).toBe(TransactionStatus.PENDING);

  expect(
    transactionSummary.alternativePaymentResponse.providerReference,
  ).toBeTruthy();

  const transaction = await Transaction.fromId(
    transactionSummary.transactionId,
    PaymentMethodType.APM,
  );
  transaction.alternativePaymentResponse =
    transactionSummary.alternativePaymentResponse;

  const confirmResponse = await transaction.confirm().execute();
  expect(confirmResponse).toBeTruthy();
  expect(confirmResponse.responseCode).toBe("SUCCESS");
  expect(confirmResponse.responseMessage).toBe(TransactionStatus.CAPTURED);

  const reverse = await transaction.reverse().withCurrency().execute();

  expect(reverse).toBeTruthy();
  expect(reverse.responseCode).toBe("SUCCESS");
  expect(reverse.responseMessage).toBe(TransactionStatus.REVERSED);
});

// skipped due to human intervention - perform payment in the browser via logged url in the console
test.skip("paypal multicapture - full cycle", async () => {
  const response = await paymentMethod
    .authorize(3)
    .withCurrency(currency)
    .withMultiCapture(true)
    .withDescription("New APM")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.INITIATED);

  console.log(response.alternativePaymentResponse?.redirectUrl);

  await wait(25000);

  const startDate = new Date();

  const report = await ReportingService.findTransactionsPaged(1, 1)
    .withTransactionId(response.transactionId)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, startDate)
    .execute();

  expect(report).toBeTruthy();
  expect(report.result.length > 0).toBe(true);

  const transactionSummary = report.result.pop();

  expect(transactionSummary.transactionId).toBeTruthy();
  expect(
    transactionSummary.alternativePaymentResponse instanceof
      AlternativePaymentResponse,
  ).toBe(true);
  expect(transactionSummary.alternativePaymentResponse.providerName).toBe(
    AlternativePaymentType.Paypal,
  );
  expect(transactionSummary.transactionStatus).toBe(TransactionStatus.PENDING);

  expect(
    transactionSummary.alternativePaymentResponse.providerReference,
  ).toBeTruthy();

  const transaction = await Transaction.fromId(
    transactionSummary.transactionId,
    PaymentMethodType.APM,
  );
  transaction.alternativePaymentResponse =
    transactionSummary.alternativePaymentResponse;

  const confirmResponse = await transaction.confirm().execute();
  expect(confirmResponse).toBeTruthy();
  expect(confirmResponse.responseCode).toBe("SUCCESS");
  expect(confirmResponse.responseMessage).toBe(TransactionStatus.PREAUTHORIZED);

  const capture1 = await transaction.capture(1).execute();

  expect(capture1).toBeTruthy();
  expect(capture1.responseCode).toBe("SUCCESS");
  expect(capture1.responseMessage).toBe(TransactionStatus.CAPTURED);

  const capture2 = await transaction.capture(2).execute();

  expect(capture2).toBeTruthy();
  expect(capture2.responseCode).toBe("SUCCESS");
  expect(capture2.responseMessage).toBe(TransactionStatus.CAPTURED);
});

test("paypal charge without confirmation", async () => {
  const products = [
    {
      reference: "SKU251584",
      label: "Magazine Subscription",
      description: "Product description 1",
      quantity: "1",
      unit_amount: "7",
      unit_currency: currency,
      tax_amount: "0.5",
    },
    {
      reference: "SKU8884784",
      label: "Charger",
      description: "Product description 2",
      quantity: "2",
      unit_amount: "6",
      unit_currency: currency,
      tax_amount: "0.5",
    },
  ];

  const order = new OrderDetails();
  order.insuranceAmount = 10;
  order.handlingAmount = 2;
  order.hasInsurance = true;
  order.description = "Order description";

  const response = await paymentMethod
    .charge(29)
    .withCurrency(currency)
    .withDescription("New Apm Uplift")
    .withAddress(shippingAddress, AddressType.Shipping)
    .withCustomerId("PYR_6278c861f6e34e1fb2949f272ced0aa9")
    .withProductData(products)
    .withPhoneNumber("44", "124 445 556", PhoneNumberType.WORK)
    .withPhoneNumber("44", "124 444 333", PhoneNumberType.HOME)
    .withPhoneNumber("1", "258 3697 133", PhoneNumberType.SHIPPING)
    .withOrderId(GenerationUtils.generateOrderId())
    .withShippingAmount(3)
    .withOrderDetails(order)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.INITIATED);
  expect(response?.alternativePaymentResponse?.redirectUrl).toBeTruthy();
});

test("APM pending transaction", async () => {
  const paymentMethod = new AlternativePaymentMethod(
    AlternativePaymentType.TestPay,
  );
  paymentMethod.returnUrl = "https://example.com/returnUrl";
  paymentMethod.statusUpdateUrl = "https://example.com/statusUpdateUrl";
  paymentMethod.cancelUrl = "https://example.com/cancelUrl";
  paymentMethod.country = "GB";
  paymentMethod.accountHolderName = "Jane Doe";

  const response = await paymentMethod
    .charge(19.99)
    .withCurrency("EUR")
    .withClientTransactionId("APM-20200417")
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.INITIATED);
  expect(response.alternativePaymentResponse?.redirectUrl).toBeTruthy();
  expect(response.alternativePaymentResponse?.providerName).toBe(
    AlternativePaymentType.TestPay,
  );
});

test("ali pay", async () => {
  const paymentMethod = new AlternativePaymentMethod(
    AlternativePaymentType.Alipay,
  );
  paymentMethod.returnUrl = "https://example.com/returnUrl";
  paymentMethod.statusUpdateUrl = "https://example.com/statusUrl";
  paymentMethod.country = "US";
  paymentMethod.accountHolderName = "Jane Doe";

  const response = await paymentMethod
    .charge(19.99)
    .withCurrency("HKD")
    .withMerchantCategory(MerchantCategory.Other)
    .execute("alipayConfig");

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.INITIATED);
  expect(response.alternativePaymentResponse?.redirectUrl).toBeTruthy();
  expect(response.alternativePaymentResponse?.providerName.toLowerCase()).toBe(
    AlternativePaymentType.Alipay,
  );
});

test("ali pay - missing return url", async () => {
  const paymentMethod = new AlternativePaymentMethod(
    AlternativePaymentType.Alipay,
  );
  paymentMethod.statusUpdateUrl = "https://example.com/statusUpdateUrl";
  paymentMethod.country = "US";
  paymentMethod.accountHolderName = "Jane Doe";
  try {
    await paymentMethod
      .charge(19.0)
      .withCurrency("HKD")
      .withMerchantCategory(MerchantCategory.Other)
      .execute();
  } catch (e) {
    expect(e instanceof BuilderError).toBe(true);
    expect(
      e.message.includes("returnUrl cannot be null for this transaction type."),
    ).toBe(true);
  }
});

test("ali pay - missing status url", async () => {
  const paymentMethod = new AlternativePaymentMethod(
    AlternativePaymentType.Alipay,
  );
  paymentMethod.returnUrl = "https://example.com/returnUrl";
  paymentMethod.country = "US";
  paymentMethod.accountHolderName = "Jane Doe";
  try {
    await paymentMethod
      .charge(19.0)
      .withCurrency("HKD")
      .withMerchantCategory(MerchantCategory.Other)
      .execute();
  } catch (e) {
    expect(e instanceof BuilderError).toBe(true);
    expect(
      e.message.includes(
        "statusUpdateUrl cannot be null for this transaction type.",
      ),
    ).toBe(true);
  }
});

test("ali pay - missing country", async () => {
  const paymentMethod = new AlternativePaymentMethod(
    AlternativePaymentType.Alipay,
  );
  paymentMethod.returnUrl = "https://example.com/returnUrl";
  paymentMethod.statusUpdateUrl = "https://example.com/statusUpdateUrl";
  paymentMethod.accountHolderName = "Jane Doe";
  try {
    await paymentMethod
      .charge(19.0)
      .withCurrency("HKD")
      .withMerchantCategory(MerchantCategory.Other)
      .execute();
  } catch (e) {
    expect(e instanceof BuilderError).toBe(true);
    expect(
      e.message.includes("country cannot be null for this transaction type."),
    ).toBe(true);
  }
});

test("ali pay - missing account holder name", async () => {
  const paymentMethod = new AlternativePaymentMethod(
    AlternativePaymentType.Alipay,
  );
  paymentMethod.returnUrl = "https://example.com/returnUrl";
  paymentMethod.statusUpdateUrl = "https://example.com/statusUpdateUrl";
  paymentMethod.country = "US";
  try {
    await paymentMethod
      .charge(19.0)
      .withCurrency("HKD")
      .withMerchantCategory(MerchantCategory.Other)
      .execute();
  } catch (e) {
    expect(e instanceof BuilderError).toBe(true);
    expect(
      e.message.includes(
        "accountHolderName cannot be null for this transaction type.",
      ),
    ).toBe(true);
  }
});

test("ali pay - missing currency", async () => {
  const paymentMethod = new AlternativePaymentMethod(
    AlternativePaymentType.Alipay,
  );
  paymentMethod.returnUrl = "https://example.com/returnUrl";
  paymentMethod.statusUpdateUrl = "https://example.com/statusUpdateUrl";
  paymentMethod.country = "US";
  paymentMethod.accountHolderName = "Jane Doe";
  try {
    await paymentMethod
      .charge(19.0)
      .withMerchantCategory(MerchantCategory.Other)
      .execute();
  } catch (e) {
    expect(e instanceof BuilderError).toBe(true);
    expect(
      e.message.includes("currency cannot be null for this transaction type."),
    ).toBe(true);
  }
});

test("ali pay - missing merchant category", async () => {
  const paymentMethod = new AlternativePaymentMethod(
    AlternativePaymentType.Alipay,
  );
  paymentMethod.returnUrl = "https://example.com/returnUrl";
  paymentMethod.statusUpdateUrl = "https://example.com/statusUpdateUrl";
  paymentMethod.country = "US";
  paymentMethod.accountHolderName = "Jane Doe";
  try {
    await paymentMethod
      .charge(19.0)
      .withCurrency("HKD")
      .execute("alipayConfig");
  } catch (e) {
    expect(e instanceof GatewayError).toBe(true);

    expect(e.message).toBe(
      "Status Code: MANDATORY_DATA_MISSING - Request expects the following fields merchant_category",
    );
    expect(e.responseCode).toBe("40005");
  }
});
afterAll(() => {
  BaseGpApiTestConfig.resetGpApiConfig();
  ServicesContainer.removeConfiguration("alipayConfig");
});
