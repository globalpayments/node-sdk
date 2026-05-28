import {
  AccessTokenInfo,
  AlternativePaymentMethod,
  AlternativePaymentType,
  Channel,
  Logger,
  PaymentMethodType,
  ReportingService,
  SampleRequestLogger,
  ServicesContainer,
  Transaction,
} from "../../../../src";
import { GpApiConfig } from "../../../../src/ServiceConfigs";

const AMOUNT = 10;
const CURRENCY = "PLN";
const RETURN_URL = "https://www.example.com/returnUrl";
const STATUS_UPDATE_URL = "https://www.example.com/statusUrl";
const DESCRIPTOR = "Test Transaction";
const ACCOUNT_NAME = "James Mason";
const CHARGE_DESCRIPTION = "New APM";

const setupBlikConfig = () => {
  const APP_ID = "p2GgW0PntEUiUh4qXhJHPoDqj3G5GFGI";
  const APP_KEY = "lJk4Np5LoUEilFhH";

  const gpApiConfig = new GpApiConfig();
  gpApiConfig.appId = APP_ID;
  gpApiConfig.appKey = APP_KEY;
  gpApiConfig.channel = Channel.CardNotPresent;
  gpApiConfig.serviceUrl = "https://apis-sit.globalpay.com/ucp";
  gpApiConfig.country = "PL";
  gpApiConfig.requestLogger = new SampleRequestLogger(new Logger("logs"));

  const accessTokenInfo = new AccessTokenInfo();
  accessTokenInfo.transactionProcessingAccountName =
    "GPECOM_BLIK_APM_Transaction_Processing";
  accessTokenInfo.riskAssessmentAccountName = "EOS_RiskAssessment";
  gpApiConfig.accessTokenInfo = accessTokenInfo;

  ServicesContainer.configureService(gpApiConfig, "blikConfig");
};

beforeAll(() => {
  setupBlikConfig();
});

afterAll(() => {
  ServicesContainer.removeConfiguration();
});

describe("GP API BLIK APM Tests", () => {
  /**
   * Sale for Blik APM
   * Validates a successful sale transaction using Blik APM with all required fields provided
   */
  test("blik apm for sale", async () => {
    const paymentMethodDetails = new AlternativePaymentMethod(
      AlternativePaymentType.Blik,
    );
    paymentMethodDetails.returnUrl = RETURN_URL;
    paymentMethodDetails.statusUpdateUrl = STATUS_UPDATE_URL;
    paymentMethodDetails.descriptor = DESCRIPTOR;
    paymentMethodDetails.country = "PL";
    paymentMethodDetails.accountHolderName = ACCOUNT_NAME;

    const response = await paymentMethodDetails
      .charge(AMOUNT)
      .withCurrency(CURRENCY)
      .withDescription(CHARGE_DESCRIPTION)
      .execute("blikConfig");

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("SUCCESS");
    expect(response.alternativePaymentResponse).toBeTruthy();
    expect(response.alternativePaymentResponse?.redirectUrl).toBeTruthy();
    expect(
      response.alternativePaymentResponse?.providerName?.toUpperCase(),
    ).toBe("BLIK");

    // Log transaction details for refund test
    console.log("\n========================================");
    console.log("TRANSACTION ID:", response.transactionId);
    console.log(
      "REDIRECT URL:",
      response.alternativePaymentResponse?.redirectUrl,
    );
    console.log("========================================");
    console.log("\nINSTRUCTIONS FOR REFUND TEST:");
    console.log("1. Copy the transaction ID above");
    console.log("2. Open the redirect URL in a browser");
    console.log("3. Approve the payment in BLIK mobile app");
    console.log("4. Wait for transaction status to become CAPTURED");
    console.log("5. Update the transactionId in the refund test");
    console.log("========================================\n");
  });

  /**
   * Sale for Blik APM without return url
   * Verifies that a sale transaction using Blik APM throws an exception when the ReturnUrl is missing
   */
  test.only("blik apm for sale without return url", async () => {
    const paymentMethod = new AlternativePaymentMethod(
      AlternativePaymentType.Blik,
    );
    paymentMethod.statusUpdateUrl = STATUS_UPDATE_URL;
    paymentMethod.descriptor = DESCRIPTOR;
    paymentMethod.country = "PL";
    paymentMethod.accountHolderName = ACCOUNT_NAME;

    try {
      await paymentMethod
        .charge(AMOUNT)
        .withCurrency(CURRENCY)
        .withDescription(CHARGE_DESCRIPTION)
        .execute("blikConfig");
      fail("Expected BuilderError to be thrown");
    } catch (error: any) {
      console.log("ERROR MESSAGE:", error.message);
      expect(error).toBeTruthy();
      expect(error.message).toBe(
        "paymentMethod.returnUrl cannot be null for this transaction type.",
      );
    }
  });

  /**
   * Sale for Blik APM without status url
   * Verifies that a sale transaction using Blik APM throws an exception when the statusUpdateUrl is missing
   */
  test("blik apm for sale without status url", async () => {
    const paymentMethod = new AlternativePaymentMethod(
      AlternativePaymentType.Blik,
    );
    paymentMethod.returnUrl = RETURN_URL;
    paymentMethod.descriptor = DESCRIPTOR;
    paymentMethod.country = "PL";
    paymentMethod.accountHolderName = ACCOUNT_NAME;

    try {
      await paymentMethod
        .charge(AMOUNT)
        .withCurrency(CURRENCY)
        .withDescription(CHARGE_DESCRIPTION)
        .execute("blikConfig");
      fail("Expected BuilderError to be thrown");
    } catch (error: any) {
      console.log("ERROR MESSAGE:", error.message);
      expect(error).toBeTruthy();
      expect(error.message).toBe(
        "paymentMethod.statusUpdateUrl cannot be null for this transaction type.",
      );
    }
  });

  /**
   * Refund for Blik APM first time
   * NOTE: This test requires manual intervention:
   * 1. Run a sale transaction and get the transaction ID
   * 2. Go to the redirect URL from the sale response and approve by entering the code
   * 3. Wait until the transaction status changes to "CAPTURED"
   * 4. Update the transactionId variable below and run this test
   */
  test("blik apm for refund", async () => {
    // For refund we have to run sale test and get Transaction ID from that response and paste here in transactionId.
    // Also go to redirect_url from response of sale and approve by entering the code.
    // After some time when status changed to "Captured" run the refund test.
    const transactionId = "TRN_1pcFCWX4YtefjPrsqCZavqfJnFDuPJ_40d956525483";

    // create the rebate transaction object
    const transaction = await Transaction.fromId(
      transactionId,
      PaymentMethodType.APM,
    );

    const transactionDetails =
      await ReportingService.transactionDetail(transactionId).execute(
        "blikConfig",
      );

    transaction.alternativePaymentResponse =
      transactionDetails.alternativePaymentResponse;

    const response = await transaction
      .refund(AMOUNT)
      .withCurrency(CURRENCY)
      .execute("blikConfig");

    expect(response).toBeTruthy();
    expect(
      response.transactionReference?.alternativePaymentResponse?.providerName?.toUpperCase(),
    ).toBe("BLIK");
    expect(response.responseCode).toBe("SUCCESS");
  });

  /**
   * Run refund on same transactionId it will give response as "Declined"
   * NOTE: Run this test after the first refund test with the same transaction ID
   */
  test("blik apm for refund second time", async () => {
    const transactionId = "TRN_1pcFCWX4YtefjPrsqCZavqfJnFDuPJ_40d956525483";

    const transaction = await Transaction.fromId(
      transactionId,
      PaymentMethodType.APM,
    );

    const transactionDetails =
      await ReportingService.transactionDetail(transactionId).execute(
        "blikConfig",
      );

    transaction.alternativePaymentResponse =
      transactionDetails.alternativePaymentResponse;

    const response = await transaction
      .refund(AMOUNT)
      .withCurrency(CURRENCY)
      .execute("blikConfig");

    expect(response).toBeTruthy();
    expect(
      response.transactionReference?.alternativePaymentResponse?.providerName?.toUpperCase(),
    ).toBe("BLIK");
    expect(response.responseCode).toBe("DECLINED");
  });
});
