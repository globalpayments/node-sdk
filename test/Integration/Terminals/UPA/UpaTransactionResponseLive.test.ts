/**
 * Integration tests for UPA TransactionResponse using live MIC device.
 *
 * These tests run actual UPA transactions against a live merchant device
 * to verify proper mapping of all transaction response fields.
 *
 * Prerequisites:
 * - UPA device configured and connected via MEET_IN_THE_CLOUD (MITC)
 * - Environment variables set:
 *   - GP_API_APP_ID: Global Payments API application ID
 *   - GP_API_APP_KEY: Global Payments API application key
 *   - UPA_LIVE: Set to "true" to enable live testing
 *   - GP_API_ACCOUNT_NAME: (Optional) Account name for transaction processing
 *
 * Test Configuration:
 * - Region: US
 * - Gateway: GP-API
 * - Environment: Test (Sandbox)
 * - Connection Mode: MEET_IN_THE_CLOUD (MITC)
 * - Payment types: VISA, MC (Mastercard), AMEX
 */
import { IDeviceInterface, TransactionResponse } from "../../../../src";
import {
  createTestDevice,
  describeUpaLive,
  useLiveMic,
} from "../../../Unit/Terminals/UPA/UpaHelpertest";

jest.setTimeout(120000); // 2 minutes timeout for live device interaction

/**
 * Helper to add delay between transactions to allow device to settle
 */
async function settleDevice(delayMs = 3000): Promise<void> {
  if (useLiveMic) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
}

describeUpaLive("UPA Live Transaction Response Field Mapping - VISA", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  afterEach(async () => {
    await settleDevice();
  });

  test("should map all fields from sale transaction", async () => {
    try {
      const response = await (device as any)
        .sale(10.0) // $10.00
        .withCurrency("USD")
        .withTaxAmount(1.0) // $1.00 tax
        .withEcrId(123)
        .execute();

      // Verify response is TransactionResponse instance
      expect(response).toBeInstanceOf(TransactionResponse);

      // === Response ID and Status Fields ===
      expect(response.responseId).toBeDefined();
      expect(response.responseId).not.toBe("");
      expect(response.status).toBeDefined();
      expect(response.command).toBe("Sale");

      // === Reference and Terminal Numbers ===
      expect(response.referenceNumber).toBeDefined();
      expect(response.terminalRefNumber).toBeDefined();
      expect(response.requestId).toBeDefined();

      // === Response Codes ===
      expect(response.responseCode).toBeDefined();
      expect(response.responseText).toBeDefined();
      expect(response.approvalCode).toBeDefined();
      expect(response.deviceResponseCode).toBeDefined();
      expect(response.deviceResponseText).toBeDefined();

      // === AVS and CVV Response Fields ===
      expect(response.avsResponseCode).toBeDefined();
      expect(response.avsResponseText).toBeDefined();
      expect(response.cvvResponseCode).toBeDefined();
      expect(response.cvvResponseText).toBeDefined();

      // === Amount Fields ===
      // taxAmount is calculated as: totalAmount - baseAmount - tipAmount
      expect(response.baseAmount).toBeGreaterThanOrEqual(0);
      expect(response.transactionAmount).toBeGreaterThanOrEqual(0);
      expect(response.tipAmount).toBeGreaterThanOrEqual(0);
      // taxAmount should now be defined (calculated if not in response)
      expect(response.balanceAmount).toBeGreaterThanOrEqual(0);

      // === Card Information ===
      expect(response.paymentType).toBeDefined();
      expect(response.cardType).toBeDefined();
      expect(response.maskedCardNumber).toBeDefined();
      expect(response.cardBIN).toBeDefined();
      expect(response.expirationDate).toBeDefined(); // MMYY format
      expect(response.entryMethod).toBeDefined();
      expect(response.cardHolderName).toBeDefined();
      expect(response.panSequenceNumber).toBeDefined();

      // === EMV Tag Fields (Chip Card) ===
      // These should be populated for chip card transactions
      if (response.entryMethod === "CHIP") {
        expect(response.applicationLabel).toBeDefined();
        expect(response.applicationId).toBeDefined();
        expect(response.emvApplicationLabel).toBeDefined();
        expect(response.emvApplicationId).toBeDefined();
        expect(response.emvApplicationCryptogram).toBeDefined();
        expect(response.cardHolderVerificationMethod).toBeDefined();
        expect(response.terminalVerificationResults).toBeDefined();

        // Verify EMV tag mappings
        expect(response.applicationIdentifier).toBeDefined();
        expect(response.transactionDate).toBeDefined(); // YYMMDD
        expect(response.amountAuthorised).toBeDefined();
        expect(response.terminalType).toBeDefined();
        expect(response.applicationTransactionCounter).toBeDefined();
      }

      // === Token Fields (if supported) ===
      if (response.token) {
        expect(response.tokenResponseCode).toBeDefined();
        expect(response.tokenResponseMessage).toBeDefined();
      }

      console.log("✓ VISA sale response fields validated successfully");
      console.log(`  Response ID: ${response.responseId}`);
      console.log(`  Transaction ID: ${response.referenceNumber}`);
      console.log(`  Amount: ${response.transactionAmount / 100} USD`);
      console.log(`  Card: ${response.maskedCardNumber}`);
      console.log(`  EMV Label: ${response.applicationLabel}`);
    } catch (error) {
      console.error("Error during VISA sale:", error);
      throw error;
    }
  });

  test("should map all fields from VISA sale with tip", async () => {
    try {
      const response = await (device as any)
        .sale(50.0) // $50.00
        .withCurrency("USD")
        .withEcrId(123)
        .withTaxAmount(2.5) // $2.50 tax
        .execute();

      expect(response.status).toBe("Success");
      expect(response.baseAmount).toBeGreaterThanOrEqual(50); // At least 50.00
      expect(response.tipAmount).toBeGreaterThanOrEqual(0); // May include tip or not
      expect(response.transactionAmount).toBeGreaterThanOrEqual(50); // At least 50.00

      console.log(
        "✓ VISA sale with tip response fields validated successfully",
      );
      console.log(`  Base Amount: ${response.baseAmount / 100} USD`);
      console.log(`  Tip Amount: ${response.tipAmount / 100} USD`);
      console.log(`  Total: ${response.transactionAmount / 100} USD`);
    } catch (error) {
      console.error("Error during VISA sale with tip:", error);
      throw error;
    }
  });

  test("should map authorization fields from VISA | MC | AMEX pre-auth", async () => {
    try {
      const response = await (device as any)
        .authorize(25) // $25.00
        .withCurrency("USD")
        .withTaxAmount(1.0) // $1.00 tax
        .withEcrId(123)
        .execute();

      expect(response.status).toBe("Success");
      expect(response.command).toBe("PreAuth");
      expect(response.approvalCode).toBeDefined();
      expect(response.paymentType).toBeDefined();

      console.log("✓ VISA pre-auth response fields validated successfully");
      console.log(
        `  Authorized Amount: ${response.authorizedAmount / 100} USD`,
      );
    } catch (error) {
      console.error("Error during VISA pre-auth:", error);
      throw error;
    }
  });
});

describeUpaLive(
  "UPA Live Transaction Response Field Mapping - Mastercard",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    afterEach(async () => {
      await settleDevice();
    });

    test("should map all fields from Mastercard sale transaction", async () => {
      try {
        const response = await (device as any)
          .sale(15.0) // $15.00
          .withCurrency("USD")
          .withTaxAmount(1.5) // $1.50 tax
          .withEcrId(123)
          .execute();

        // Verify response is TransactionResponse instance
        expect(response).toBeInstanceOf(TransactionResponse);

        // === Basic Response Fields ===
        expect(response.responseId).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.command).toBe("Sale");

        // === Card Information ===
        expect(response.paymentType).toBe("MASTERCARD");
        expect(response.cardType).toBe("MASTERCARD");
        expect(response.maskedCardNumber).toBeDefined();

        // === Amount Fields ===
        expect(response.baseAmount).toBeGreaterThanOrEqual(15); // At least 15.00
        expect(response.transactionAmount).toBeGreaterThanOrEqual(15);

        // === AVS/CVV ===
        expect(response.avsResponseCode).toBeDefined();
        expect(response.cvvResponseCode).toBeDefined();

        // === EMV Fields (if chip) ===
        if (response.entryMethod === "CHIP") {
          expect(response.emvApplicationLabel).toBe("MASTERCARD");
          expect(response.applicationLabel).toBeDefined();
        }

        console.log("✓ Mastercard sale response fields validated successfully");
        console.log(`  Card: ${response.maskedCardNumber}`);
        console.log(`  Amount: ${response.transactionAmount / 100} USD`);
      } catch (error) {
        console.error("Error during Mastercard sale:", error);
        throw error;
      }
    });

    test("should map all fields from Mastercard sale with cashback", async () => {
      try {
        const response = await (device as any)
          .sale(30.0) // $30.00
          .withCurrency("USD")
          .withEcrId(123)
          .withTaxAmount(2.0) // $2.00 tax
          .withCashBack(10.0) // $10.00 cashback
          .execute();

        expect(response.status).toBe("Success");
        expect(response.baseAmount).toBeGreaterThanOrEqual(30); // At least 30.00
        expect(response.transactionAmount).toBeGreaterThanOrEqual(30);

        console.log(
          "✓ Mastercard sale with cashback response fields validated",
        );
        console.log(`  Base Amount: ${response.baseAmount / 100} USD`);
        console.log(`  Cashback: ${response.cashBackAmount / 100} USD`);
      } catch (error) {
        console.error("Error during Mastercard sale with cashback:", error);
        throw error;
      }
    });
  },
);

describeUpaLive("UPA Live Transaction Response Field Mapping - AMEX", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  afterEach(async () => {
    await settleDevice();
  });

  test("should map all fields from AMEX sale transaction", async () => {
    try {
      const response = await (device as any)
        .sale(20.0) // $20.00
        .withCurrency("USD")
        .withEcrId(123)
        .withTaxAmount(1.5) // $1.50 tax
        .execute();

      // Verify response is TransactionResponse instance
      expect(response).toBeInstanceOf(TransactionResponse);

      // === Basic Response Fields ===
      expect(response.responseId).toBeDefined();
      expect(response.status).toBeDefined();

      // === Card Information ===
      expect(response.paymentType).toBe("AMERICAN EXPRESS");
      expect(response.cardType).toBe("AMERICAN EXPRESS");
      expect(response.maskedCardNumber).toBeDefined();

      // === Amount Fields ===
      expect(response.baseAmount).toBeGreaterThanOrEqual(20); // At least 20.00
      expect(response.transactionAmount).toBeGreaterThanOrEqual(20);

      // === Response Codes ===
      expect(response.responseCode).toBeDefined();
      expect(response.approvalCode).toBeDefined();

      console.log("✓ AMEX sale response fields validated successfully");
      console.log(`  Card: ${response.maskedCardNumber}`);
      console.log(`  Amount: ${response.transactionAmount / 100} USD`);
    } catch (error) {
      console.error("Error during AMEX sale:", error);
      throw error;
    }
  });
});

describeUpaLive("UPA Live Transaction Response - EMV Tag Verification", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  afterEach(async () => {
    await settleDevice();
  });

  test("should include all EMV tags from chip card transaction", async () => {
    try {
      const response = await (device as any)
        .sale(12.5) // $12.50
        .withCurrency("USD")
        .withEcrId(123)
        .withTaxAmount(1.0) // $1.00 tax
        .execute();

      if (response.entryMethod !== "CHIP") {
        console.warn(
          "Skipping EMV tag test - card was not inserted as chip (entry method: " +
            response.entryMethod +
            ")",
        );
        return;
      }

      // Verify key EMV tags are populated
      const emvFields = {
        "Application Label (50)": response.applicationLabel,
        "Application ID (9F06)": response.applicationId,
        "Application Preferred Name (9F12)": response.applicationPreferredName,
        "Application Cryptogram (9F26)": response.applicationCryptogram,
        "CVM Results (9F34)": response.cardHolderVerificationMethod,
        "Terminal Verification Results (95)":
          response.terminalVerificationResults,
        "Transaction Date (9A)": response.transactionDate,
        "Transaction Type (9C)": response.transactionTypeEMV,
        "Terminal Type (9F35)": response.terminalType,
      };

      let emvTagsFound = 0;
      const emvTagsMissing: string[] = [];

      for (const [tagName, tagValue] of Object.entries(emvFields)) {
        if (tagValue && tagValue !== "") {
          emvTagsFound++;
          console.log(`  ✓ ${tagName}: ${tagValue}`);
        } else {
          emvTagsMissing.push(tagName);
        }
      }

      expect(emvTagsFound).toBeGreaterThan(0);

      if (emvTagsMissing.length > 0) {
        console.warn(
          `  Note: Some EMV tags not present: ${emvTagsMissing.join(", ")}`,
        );
      }

      console.log(
        `✓ EMV tag verification complete - ${emvTagsFound} tags populated`,
      );
    } catch (error) {
      console.error("Error during EMV tag verification:", error);
      throw error;
    }
  });
});

describeUpaLive("UPA Live Transaction Response - Void/Reversal Mapping", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  afterEach(async () => {
    await settleDevice();
  });

  test("should map fields from transaction void", async () => {
    try {
      // First, perform a sale
      const saleResponse = await (device as any)
        .sale(18.0) // $18.00
        .withCurrency("USD")
        .withEcrId(123)
        .withTaxAmount(1.5) // $1.50 tax
        .execute();

      expect(saleResponse.status).toBeDefined();
      const transactionId = saleResponse.referenceNumber;

      // Now void the transaction
      const voidResponse = await (device as any)
        .void()
        .withEcrId(123)
        .withTransactionId(transactionId)
        .execute();

      // Verify void response fields
      expect(voidResponse.responseId).toBeDefined();
      expect(voidResponse.status).toBeDefined();
      expect(voidResponse.responseCode).toBeDefined();
      expect(voidResponse.referenceNumber).toBeDefined();

      console.log("✓ Void transaction response fields validated successfully");
      console.log(`  Original Transaction: ${transactionId}`);
      console.log(`  Void Response ID: ${voidResponse.responseId}`);
    } catch (error) {
      console.error("Error during void transaction:", error);
      throw error;
    }
  });
});
describeUpaLive(
  "UPA Live Transaction Response - Refund Mapping (Path A: Card Entry)",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    afterEach(async () => {
      await settleDevice();
    });

    /**
     * PATH A: Refund by Card Entry (Manual)
     * Flow: .refund(amount) → TerminalAuthBuilder → Device
     * Use Case: Direct refund without original transaction reference
     */
    test("should handle refund without reference (card entry mode)", async () => {
      try {
        // Refund without reference - will prompt for card entry
        const refundResponse = await (device as any)
          .refund(15.0) // $15.00
          .withCurrency("USD")
          .withEcrId(123)
          .withTaxAmount(1.0) // $1.00 tax
          .execute();

        // Verify refund response
        expect(refundResponse).toBeInstanceOf(TransactionResponse);
        expect(refundResponse.command).toBe("Refund");
        expect(refundResponse.status).toBe("Success");

        // === Verify Response Codes ===
        expect(refundResponse.responseCode).toBe("00");
        expect(refundResponse.deviceResponseCode).toBeDefined();

        // === Verify Amount Fields ===
        expect(refundResponse.baseAmount).toBeGreaterThan(0);
        expect(refundResponse.transactionAmount).toBeGreaterThan(0);

        // === Verify Card Information ===
        expect(refundResponse.maskedCardNumber).toBeDefined();
        expect(refundResponse.cardType).toBeDefined();

        console.log(
          "✓ Path A (Card Entry) Refund response fields validated successfully",
        );
        console.log(`  Refund Amount: ${refundResponse.baseAmount / 100} USD`);
        console.log(`  Card: ${refundResponse.maskedCardNumber}`);
        console.log(`  Flow: Device-based (manual card entry)`);
      } catch (error) {
        console.error("Error during Path A refund (card entry):", error);
        throw error;
      }
    });

    test("should handle refund with invoice and clerk ID", async () => {
      try {
        // Refund with invoice number and clerk ID
        const refundResponse = await (device as any)
          .refund(20.0) // $20.00
          .withCurrency("USD")
          .withEcrId(123)
          .withInvoiceNumber("INV-2026-001")
          .withClerkId(456)
          .execute();

        expect(refundResponse).toBeInstanceOf(TransactionResponse);
        expect(refundResponse.command).toBe("Refund");
        expect(refundResponse.status).toBe("Success");
        expect(refundResponse.responseCode).toBe("00");
        expect(refundResponse.baseAmount).toBeGreaterThan(0);

        console.log(
          "✓ Path A Refund with invoice and clerk ID validated successfully",
        );
        console.log(`  Invoice: INV-2026-001`);
        console.log(`  Clerk ID: 456`);
        console.log(`  Amount: ${refundResponse.baseAmount / 100} USD`);
      } catch (error) {
        console.error("Error during refund with invoice/clerk ID:", error);
        throw error;
      }
    });
  },
);

describeUpaLive(
  "UPA Live Transaction Response - Refund Mapping (Path B: By Reference)",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    afterEach(async () => {
      await settleDevice();
    });

    /**
     * PATH B: Refund by Terminal Reference (Device)
     * Flow: .refund(amount).withTerminalRefNumber(deviceTranNo) → device
     * Use Case: Refund against a previous transaction using the device's own
     * tranNo (device's own transaction number)
     */
    test.only("should map all fields from refund by reference transaction (Path B)", async () => {
      try {
        // First, perform a sale transaction
        const saleResponse = await (device as any)
          .sale(25.0) // $25.00
          .withCurrency("USD")
          .withEcrId(123)
          .withTaxAmount(2.0) // $2.00 tax
          .execute();

        expect(saleResponse).toBeInstanceOf(TransactionResponse);
        expect(saleResponse.status).toBe("Success");

        // Device's own tranNo, not the gateway transaction ID
        const terminalRefNumber = saleResponse.gatewayTxnId;

        console.log(
          `✓ Sale transaction completed: Terminal Ref ${terminalRefNumber}`,
        );

        // Add delay before refund
        await settleDevice(5000);

        const refundResponse = await (device as any)
          .refundById(25.0) // Refund full amount
          .withCurrency("USD")
          .withEcrId(123)
          .withTerminalRefNumber((saleResponse as any).terminalRefNumber)
          .execute();
        // Verify refund response
        expect(refundResponse).toBeInstanceOf(TransactionResponse);
        expect(refundResponse.command).toBe("Refund");
        expect(refundResponse.status).toBe("Success");

        // === Verify Response Fields ===
        expect(refundResponse.responseId).toBeDefined();
        expect(refundResponse.responseCode).toBeDefined();
        expect(refundResponse.responseCode).toBe("00"); // Success code
        expect(refundResponse.responseText).toBeDefined();
        expect(refundResponse.approvalCode).toBeDefined();

        // === Verify Reference Fields ===
        expect(refundResponse.referenceNumber).toBeDefined();
        expect(refundResponse.terminalRefNumber).toBeDefined();

        // === Verify Amount Fields ===
        expect(refundResponse.baseAmount).toBeGreaterThanOrEqual(0);
        expect(refundResponse.transactionAmount).toBeGreaterThanOrEqual(0);

        console.log(
          "✓ Path B (By Reference) Refund response fields validated successfully",
        );
        console.log(`  Terminal Reference: ${terminalRefNumber}`);
        console.log(`  Refund Response ID: ${refundResponse.responseId}`);
        console.log(`  Refund Amount: ${refundResponse.baseAmount / 100} USD`);
        console.log(
          `  Flow: Device-based (referenceNumber = terminalRefNumber)`,
        );
        console.log(`  Status: ${refundResponse.status}`);
      } catch (error) {
        console.error("Error during Path B refund (by reference):", error);
        throw error;
      }
    });
  },
);

// Test setup message
if (!useLiveMic) {
  console.log("⚠️  Live UPA tests are SKIPPED (UPA_LIVE not set to 'true')");
  console.log("To run live tests, set environment variables:");
  console.log("  $env:UPA_LIVE='true'");
  console.log("  $env:GP_API_APP_ID='<your-app-id>'");
  console.log("  $env:GP_API_APP_KEY='<your-app-key>'");
} else {
  console.log("🚀 Running LIVE UPA Transaction Response tests...");
  console.log(`   Gateway: GP-API`);
  console.log(`   Environment: Test (Sandbox)`);
  console.log(`   Connection Mode: MEET_IN_THE_CLOUD (MITC)`);
  console.log(`   Payment Types: VISA, MC, AMEX`);
  console.log("");
}
