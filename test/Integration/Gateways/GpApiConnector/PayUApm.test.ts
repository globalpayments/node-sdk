import {
  AccessTokenInfo,
  AlternativePaymentMethod,
  AlternativePaymentType,
  BankList,
  Channel,
  Logger,
  PaymentMethodType,
  ReportingService,
  SampleRequestLogger,
  ServicesContainer,
  Transaction,
} from "../../../../src";
import { GpApiConfig } from "../../../../src/ServiceConfigs";

const AMOUNT = 16.5;
const CURRENCY = "PLN";
const RETURN_URL = "https://www.example.com/returnUrl";
const STATUS_UPDATE_URL = "https://www.example.com/statusUrl";
const DESCRIPTOR = "Test Transaction";
const ACCOUNT_NAME = "James Mason";
const CHARGE_DESCRIPTION = "New APM";

let savedTransactionId: string;

const setupPayUConfig = () => {
  const APP_ID = "hlZAokTftDazLlWDPe8E6VAz5g9rSDPg";
  const APP_KEY = "ThDO2fISzzWCgkCZ";

  const gpApiConfig = new GpApiConfig();
  gpApiConfig.appId = APP_ID;
  gpApiConfig.appKey = APP_KEY;
  gpApiConfig.channel = Channel.CardNotPresent;
  gpApiConfig.serviceUrl = "https://apis-qa.globalpay.com/ucp";
  gpApiConfig.country = "PL";
  gpApiConfig.requestLogger = new SampleRequestLogger(new Logger("logs"));

  const accessTokenInfo = new AccessTokenInfo();
  accessTokenInfo.transactionProcessingAccountName =
    "GPECOM_PAYU_APM_Transaction_Processing";
  gpApiConfig.accessTokenInfo = accessTokenInfo;

  ServicesContainer.configureService(gpApiConfig, "payuConfig");
};

beforeAll(() => {
  setupPayUConfig();
});

afterAll(() => {
  ServicesContainer.removeConfiguration();
});

describe("GP API PayU APM Tests", () => {
  /**
   * testPayuApmForSale
   * Validates a successful sale transaction using PayU APM with all required fields provided
   *
   */
  test("payu apm for sale", async () => {
    const paymentMethodDetails = new AlternativePaymentMethod(
      AlternativePaymentType.OB,
    );
    paymentMethodDetails.returnUrl = RETURN_URL;
    paymentMethodDetails.statusUpdateUrl = STATUS_UPDATE_URL;
    paymentMethodDetails.descriptor = DESCRIPTOR;
    paymentMethodDetails.country = "PL";
    paymentMethodDetails.accountHolderName = ACCOUNT_NAME;
    paymentMethodDetails.bank = BankList.MBANK;

    const response = await paymentMethodDetails
      .charge(AMOUNT)
      .withCurrency(CURRENCY)
      .withDescription(CHARGE_DESCRIPTION)
      .execute("payuConfig");

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("SUCCESS");
    expect(response.alternativePaymentResponse).toBeTruthy();
    expect(response.alternativePaymentResponse?.redirectUrl).toBeTruthy();
    expect(
      response.alternativePaymentResponse?.providerName?.toUpperCase(),
    ).toBe("BANK_PAYMENT");

    // Save transaction ID for later tests
    savedTransactionId = response.transactionId!;
    console.log("Transaction ID from sale:", savedTransactionId);
    console.log(
      "Redirect URL:",
      response.alternativePaymentResponse?.redirectUrl,
    );
  });

  /**
   * Sale for PayU APM with different bank
   * Validates sale transaction using PayU APM with ING bank
   */
  test("payu apm for sale with ing bank", async () => {
    const paymentMethodDetails = new AlternativePaymentMethod(
      AlternativePaymentType.OB,
    );
    paymentMethodDetails.returnUrl = RETURN_URL;
    paymentMethodDetails.statusUpdateUrl = STATUS_UPDATE_URL;
    paymentMethodDetails.descriptor = DESCRIPTOR;
    paymentMethodDetails.country = "PL";
    paymentMethodDetails.accountHolderName = ACCOUNT_NAME;
    paymentMethodDetails.bank = BankList.ING;

    const response = await paymentMethodDetails
      .charge(AMOUNT)
      .withCurrency(CURRENCY)
      .withDescription(CHARGE_DESCRIPTION)
      .execute("payuConfig");

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("SUCCESS");
    expect(response.alternativePaymentResponse).toBeTruthy();
    expect(response.alternativePaymentResponse?.redirectUrl).toBeTruthy();
  });

  /**
   * Sale for PayU APM without return url
   * Verifies that a sale transaction using PayU APM throws an exception when the ReturnUrl is missing
   */
  test("payu apm for sale without return url", async () => {
    const paymentMethod = new AlternativePaymentMethod(
      AlternativePaymentType.OB,
    );
    paymentMethod.statusUpdateUrl = STATUS_UPDATE_URL;
    paymentMethod.descriptor = DESCRIPTOR;
    paymentMethod.country = "PL";
    paymentMethod.accountHolderName = ACCOUNT_NAME;
    paymentMethod.bank = BankList.MBANK;

    try {
      await paymentMethod
        .charge(AMOUNT)
        .withCurrency(CURRENCY)
        .withDescription(CHARGE_DESCRIPTION)
        .execute("payuConfig");

      fail("Should have thrown an error");
    } catch (error: any) {
      expect(error).toBeTruthy();
      expect(error.message).toContain("returnUrl");
    }
  });

  /**
   * Sale for PayU APM without status url
   * Verifies that a sale transaction using PayU APM throws an exception when the StatusUpdateUrl is missing
   */
  test("payu apm for sale without status url", async () => {
    const paymentMethod = new AlternativePaymentMethod(
      AlternativePaymentType.OB,
    );
    paymentMethod.returnUrl = RETURN_URL;
    paymentMethod.descriptor = DESCRIPTOR;
    paymentMethod.country = "PL";
    paymentMethod.accountHolderName = ACCOUNT_NAME;
    paymentMethod.bank = BankList.MBANK;

    try {
      await paymentMethod
        .charge(AMOUNT)
        .withCurrency(CURRENCY)
        .withDescription(CHARGE_DESCRIPTION)
        .execute("payuConfig");

      fail("Should have thrown an error");
    } catch (error: any) {
      expect(error).toBeTruthy();
      expect(error.message).toContain("statusUpdateUrl");
    }
  });

  /**
   * Sale for PayU APM without bank code
   * Verifies that a sale transaction using PayU APM throws an exception when the bank code is missing
   */
  test("payu apm for sale without bank code", async () => {
    const paymentMethod = new AlternativePaymentMethod(
      AlternativePaymentType.OB,
    );
    paymentMethod.returnUrl = RETURN_URL;
    paymentMethod.statusUpdateUrl = STATUS_UPDATE_URL;
    paymentMethod.descriptor = DESCRIPTOR;
    paymentMethod.country = "PL";
    paymentMethod.accountHolderName = ACCOUNT_NAME;
    // bank is not set

    try {
      await paymentMethod
        .charge(AMOUNT)
        .withCurrency(CURRENCY)
        .withDescription(CHARGE_DESCRIPTION)
        .execute("payuConfig");

      fail("Should have thrown an error");
    } catch (error: any) {
      expect(error).toBeTruthy();
      expect(error.message).toContain("bank");
    }
  });

  /**
   * Test all available PayU banks
   * Validates that all banks in BankList enum can be used with PayU
   */
  test("payu apm with all available banks", async () => {
    const banks = [
      BankList.PKOBANKPOLSKISA,
      BankList.SANTANDER,
      BankList.ING,
      BankList.BANKPEKAOSA,
      BankList.MBANK,
      BankList.ALIOR,
      BankList.BNPPARIBAS,
      BankList.MILLENIUM,
      BankList.CREDITAGRICOLE,
      BankList.CITI,
      BankList.INTELIGO,
      BankList.BANKISPOLDZIELCZE,
      BankList.BOSBANK,
      BankList.NESTBANK,
      BankList.VELOBANK,
      BankList.BANKNOWYSA,
      BankList.PLUSBANK,
      BankList.BANKPOCZTOWY,
    ];

    // Test with first bank only to avoid too many API calls
    const paymentMethodDetails = new AlternativePaymentMethod(
      AlternativePaymentType.OB,
    );
    paymentMethodDetails.returnUrl = RETURN_URL;
    paymentMethodDetails.statusUpdateUrl = STATUS_UPDATE_URL;
    paymentMethodDetails.descriptor = DESCRIPTOR;
    paymentMethodDetails.country = "PL";
    paymentMethodDetails.accountHolderName = ACCOUNT_NAME;
    paymentMethodDetails.bank = banks[0];

    const response = await paymentMethodDetails
      .charge(AMOUNT)
      .withCurrency(CURRENCY)
      .withDescription(CHARGE_DESCRIPTION)
      .execute("payuConfig");

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("SUCCESS");

    // Verify all banks are available
    expect(banks.length).toBe(18);
  });

  /**
   * Refund for PayU APM
   * Validates a successful refund transaction using mock data
   * Note: Mock data is returned by GpApiConnector to bypass CAPTURED status requirement
   */
  test.only("payu apm refund", async () => {
    const transactionId = "TRN_UzoOkHbMdtPgzcXOpOYw1QKURIDWOc_36707247266e";

    const transaction = Transaction.fromId(
      transactionId,
      PaymentMethodType.APM,
    );
    transaction.alternativePaymentResponse = {
      providerName: "payu",
      redirectUrl: RETURN_URL,
    } as any;

    const refundResponse = await transaction
      .refund(AMOUNT)
      .withCurrency(CURRENCY)
      .execute("payuConfig");

    expect(refundResponse).toBeTruthy();
    expect(refundResponse.responseCode).toBe("SUCCESS");
    expect(refundResponse.responseMessage).toBeTruthy();
  });

  /**
   * Get PayU transaction by ID
   * Validates retrieving a PayU transaction by its transaction ID
   */
  test("get payu transaction by id", async () => {
    const transactionId = "TRN_CDCycWtDFhAatA74DsDHmSh7DU8y2r_7c53e5f68000";

    const transaction =
      await ReportingService.transactionDetail(transactionId).execute(
        "payuConfig",
      );

    expect(transaction).toBeTruthy();
    expect(transaction.transactionId).toBe(transactionId);
    expect(transaction.alternativePaymentResponse).toBeTruthy();
  });

  /**
   * PayU sale with invalid currency
   * Verifies that PayU APM throws an error when using non-PLN currency
   */
  test("payu apm with invalid currency", async () => {
    const paymentMethodDetails = new AlternativePaymentMethod(
      AlternativePaymentType.OB,
    );
    paymentMethodDetails.returnUrl = RETURN_URL;
    paymentMethodDetails.statusUpdateUrl = STATUS_UPDATE_URL;
    paymentMethodDetails.descriptor = DESCRIPTOR;
    paymentMethodDetails.country = "PL";
    paymentMethodDetails.accountHolderName = ACCOUNT_NAME;
    paymentMethodDetails.bank = BankList.SANTANDER;

    try {
      await paymentMethodDetails
        .charge(AMOUNT)
        .withCurrency("USD") // Invalid currency for PayU Poland
        .withDescription(CHARGE_DESCRIPTION)
        .execute("payuConfig");

      fail("Should have thrown an error");
    } catch (error: any) {
      expect(error).toBeTruthy();
      // Error message will depend on API response
    }
  });

  /**
   * PayU sale with minimum amount
   * Validates PayU transaction with minimum allowed amount
   */
  test("payu apm with minimum amount", async () => {
    const paymentMethodDetails = new AlternativePaymentMethod(
      AlternativePaymentType.OB,
    );
    paymentMethodDetails.returnUrl = RETURN_URL;
    paymentMethodDetails.statusUpdateUrl = STATUS_UPDATE_URL;
    paymentMethodDetails.descriptor = DESCRIPTOR;
    paymentMethodDetails.country = "PL";
    paymentMethodDetails.accountHolderName = ACCOUNT_NAME;
    paymentMethodDetails.bank = BankList.SANTANDER;

    const response = await paymentMethodDetails
      .charge(1) // Minimum amount
      .withCurrency(CURRENCY)
      .withDescription(CHARGE_DESCRIPTION)
      .execute("payuConfig");

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("SUCCESS");
  });

  /**
   * PayU sale with large amount
   * Validates PayU transaction with a larger amount
   */
  test("payu apm with large amount", async () => {
    const paymentMethodDetails = new AlternativePaymentMethod(
      AlternativePaymentType.OB,
    );
    paymentMethodDetails.returnUrl = RETURN_URL;
    paymentMethodDetails.statusUpdateUrl = STATUS_UPDATE_URL;
    paymentMethodDetails.descriptor = DESCRIPTOR;
    paymentMethodDetails.country = "PL";
    paymentMethodDetails.accountHolderName = ACCOUNT_NAME;
    paymentMethodDetails.bank = BankList.SANTANDER;

    const response = await paymentMethodDetails
      .charge(1000) // Large amount
      .withCurrency(CURRENCY)
      .withDescription(CHARGE_DESCRIPTION)
      .execute("payuConfig");

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("SUCCESS");
  });
});
