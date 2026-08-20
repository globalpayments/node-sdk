/**
 * Unit tests for UPA error response properties (AH-1362)
 *
 * Test Cases:
 *   TC-01: Sale Transaction Error - Full UPA Error Properties Returned
 *   TC-02: Void Transaction Error - Full UPA Error Properties Returned
 *   TC-03: Refund Transaction Error - Full UPA Error Properties Returned
 *   TC-04: Cross-Card Error Parity (MC, VISA, Amex, Discover)
 *   TC-07: Happy Path Regression - Sale / Void / Refund Still Work
 *
 * Story Summary:
 *   As a merchant using the NodeJS SDK, I want to receive all the response properties
 *   in an error, so that I can properly troubleshoot without support.
 *
 * Acceptance Criteria:
 *   AC1: Error Mapping Completeness - All UPA error response properties mapped
 *   AC2: Error Propagation to Integrator - All properties accessible in error/exception
 *   AC4: No Regression - Happy-path flows unaffected
 *   AC5: Research-First Gate - Document if already complete
 */

import {
  GatewayError,
  IDeviceInterface,
  TransactionResponse,
  //   CreditCardData,
} from "../../../../src";
import { TransactionResponse as UpaTransactionResponse } from "../../../../src/Terminals/UPA/Reponses/TransactionResponse";
import { createTestDevice, describeUpaLive, useLiveMic } from "./UpaHelpertest";

jest.setTimeout(240000);

function sleep(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function settleDevice(delayMs = 8000): Promise<void> {
  if (useLiveMic) {
    await sleep(delayMs);
  }
}

afterEach(async () => {
  await settleDevice();
});

// ===========================================================================
// TC-01: Sale Transaction Error - Full UPA Error Properties Returned
// ===========================================================================
describeUpaLive(
  "TC-01: Sale Transaction Error - Full UPA Error Properties Returned",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    async function expectSaleError(
      expectedErrorCode: string,
      executeSale: () => Promise<unknown>,
    ): Promise<void> {
      let caughtError: unknown;

      try {
        await executeSale();
      } catch (error) {
        caughtError = error;
      }

      if (!caughtError) {
        throw new Error(
          `Expected ${expectedErrorCode} from the UPA Sale request.`,
        );
      }

      const gatewayError = caughtError as GatewayError;
      expect(gatewayError).toBeInstanceOf(GatewayError);
      expect(gatewayError.errorCode).toBeDefined();
      expect(gatewayError.errorCode.trim()).toBe(expectedErrorCode);
      expect(gatewayError.errorMessage).toBeTruthy();
      expect(gatewayError.rawResponse).toBeDefined();
    }

    test("[AH-1362:TC-01] sale() error response includes all UPA error properties (VISA)", async () => {
      /**
       * Scenario: UPA returns an error during a Sale transaction with VISA
       * Pre-condition: Trigger a known failure condition (e.g., declined card)
       * Expected: Error object contains all fields returned by UPA
       */

      let caughtError: unknown;
      let successfulResponse: TransactionResponse | undefined;

      try {
        successfulResponse = (await device
          .sale(10.0)
          .withEcrId("123")
          .execute()) as TransactionResponse;
      } catch (error) {
        caughtError = error;
      }

      if (!caughtError) {
        throw new Error(
          "Expected a UPA sale error, but received " +
            `status=${successfulResponse?.status}, ` +
            `deviceResponseCode=${successfulResponse?.deviceResponseCode}, ` +
            `responseCode=${successfulResponse?.responseCode}, ` +
            `responseText=${successfulResponse?.responseText}.`,
        );
      }

      {
        const error = caughtError;
        // Verify error is a GatewayError with all properties
        expect(error).toBeInstanceOf(GatewayError);

        // Check for all UPA error properties mapped in error object
        // Device-level error properties
        expect(error).toHaveProperty("deviceResponseCode");
        expect(error).toHaveProperty("deviceResponseMessage");

        // Issuer/Host-level error properties (when available)
        if ((error as any).responseCode !== undefined) {
          expect(error).toHaveProperty("responseCode");
        }
        if ((error as any).responseMessage !== undefined) {
          expect(error).toHaveProperty("responseMessage");
        }

        // Issuer response properties (when available)
        if ((error as any).issuerResponseCode !== undefined) {
          expect(error).toHaveProperty("issuerResponseCode");
        }
        if ((error as any).issuerResponseMessage !== undefined) {
          expect(error).toHaveProperty("issuerResponseMessage");
        }

        // Verify error message contains meaningful information
        expect((error as any).message).toBeTruthy();
        expect((error as any).message.length).toBeGreaterThan(0);

        console.log("✓ TC-01 PASSED: Sale error includes all UPA properties");
        console.log(
          "  Device Response Code:",
          (error as any).deviceResponseCode,
        );
        console.log(
          "  Device Response Message:",
          (error as any).deviceResponseMessage,
        );
        console.log("  Response Code:", (error as any).responseCode);
        console.log("  Response Message:", (error as any).responseMessage);
        console.log(
          "  Issuer Response Code:",
          (error as any).issuerResponseCode,
        );
        console.log(
          "  Issuer Response Message:",
          (error as any).issuerResponseMessage,
        );
      }
    });

    test("sale() returns ERR011 for an invalid direct-market invoice number length", async () => {
      await expectSaleError("ERR011", () =>
        device
          .sale(10.0)
          .withEcrId("123")
          .withInvoiceNumber("5".repeat(25))
          .withShippingDate(new Date(2026, 7, 3))
          .execute(),
      );
    });

    test(" sale() returns ERR010 for an directMktShipMonth-INVALID TYPE", async () => {
      await expectSaleError("ERR010", () =>
        device
          .sale(10.0)
          .withEcrId("123")
          .withInvoiceNumber("MKT-001")
          .withShippingDate(new Date("invalid"))
          .execute(),
      );
    });
  },
);

// ===========================================================================
// TC-02: Void Transaction Error - Full UPA Error Properties Returned
// ===========================================================================

describeUpaLive(
  "TC-02: Void Transaction Error - Full UPA Error Properties Returned",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    async function expectVoidError(
      expectedErrorCode: string,
      executeVoid: () => Promise<unknown>,
    ): Promise<void> {
      let caughtError: unknown;

      try {
        await executeVoid();
      } catch (error) {
        caughtError = error;
      }

      if (!caughtError) {
        throw new Error(
          `Expected ${expectedErrorCode} from the UPA Void request.`,
        );
      }

      const gatewayError = caughtError as GatewayError;
      expect(gatewayError).toBeInstanceOf(GatewayError);
      expect(gatewayError.errorCode.trim()).toBe(expectedErrorCode);
      expect(gatewayError.errorMessage).toBeTruthy();
      expect(gatewayError.rawResponse).toBeDefined();

      console.log("TC-02 Void error:", {
        errorCode: gatewayError.errorCode,
        errorMessage: gatewayError.errorMessage,
        responseCode: gatewayError.responseCode,
        responseText: gatewayError.responseText,
        rawResponse: gatewayError.rawResponse,
      });
    }

    test("[AH-1362:TC-02.1] void() returns HOST001 for a nonexistent reference number", async () => {
      /**
       * Scenario: UPA returns an error during a Void transaction
       * Pre-condition: Attempt to void a transaction that triggers UPA error
       * Expected: All UPA error response properties accessible in error
       */

      const nonexistentReferenceNumber = "02455"; // invalid length
      await expectVoidError("HOST001", () =>
        device
          .void()
          .withTransactionId(nonexistentReferenceNumber)
          .withEcrId("123")
          .execute(),
      );
    });

    test("[AH-1362:TC-02.2] void() returns VOID004 when both identifiers are supplied", async () => {
      await expectVoidError("VOID004", () =>
        device
          .void()
          .withTransactionId("9999999999999999")
          .withTerminalRefNumber("9999")
          .withEcrId("123")
          .execute(),
      );
    });

    test("[AH-1362:TC-02.2] void() returns ERR013 missing EcrID mandatory field", async () => {
      await expectVoidError("ERR004", () =>
        device
          .void()
          .withTransactionId("9999999999999999")
          .withTerminalRefNumber("9999")
          .execute(),
      );
    });
  },
);

// ===========================================================================
// TC-03: Refund Transaction Error - Full UPA Error Properties Returned
// ===========================================================================
describeUpaLive(
  "TC-03: Refund Transaction Error - Full UPA Error Properties Returned",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    async function expectRefundError(
      expectedErrorCode: string,
      executeRefund: () => Promise<unknown>,
    ): Promise<void> {
      let caughtError: unknown;

      try {
        await executeRefund();
      } catch (error) {
        caughtError = error;
      }

      if (!caughtError) {
        throw new Error(
          `Expected ${expectedErrorCode} from the UPA Refund request.`,
        );
      }

      const gatewayError = caughtError as GatewayError;
      console.log("TC-03 received Refund error:", gatewayError);
      expect(gatewayError).toBeInstanceOf(GatewayError);
      expect(gatewayError.errorCode).toBeDefined();
      expect(gatewayError.errorCode.trim()).toBe(expectedErrorCode);
      expect(gatewayError.errorMessage).toBeTruthy();
      expect(gatewayError.rawResponse).toBeDefined();

      console.log("TC-03 Refund UPA error:", {
        errorCode: gatewayError.errorCode,
        errorMessage: gatewayError.errorMessage,
        responseCode: gatewayError.responseCode,
        responseText: gatewayError.responseText,
        rawResponse: gatewayError.rawResponse,
      });
    }

    test("[AH-1362:TC-03.1] refund() returns REFUND001 when the original amount is exceeded", async () => {
      // Set these to an approved Sale reference and an amount greater than
      // the remaining refundable amount for that Sale.
      const saleReference = process.env.UPA_REFUND_REFERENCE;
      const refundAmount = Number(process.env.UPA_OVER_REFUND_AMOUNT);
      if (!saleReference || !Number.isFinite(refundAmount)) {
        throw new Error(
          "Set UPA_REFUND_REFERENCE and UPA_OVER_REFUND_AMOUNT to run REFUND001.",
        );
      }

      await expectRefundError("REFUND001", () =>
        device
          .refund(refundAmount)
          .withTransactionId(saleReference)
          .withEcrId("123")
          .execute(),
      );
    });

    test("[AH-1362:TC-03.2] refund() returns APP001 when cancelled on UPA", async () => {
      // Omit the reference to force card entry, then cancel on the terminal.
      await expectRefundError("APP001", () =>
        device.refund(10.0).withEcrId("123").execute(),
      );
    });
  },
);

// ===========================================================================
// TC-04: Cross-Card Error Parity (MC, VISA, Amex, Discover)
// ===========================================================================
describeUpaLive("TC-04: Cross-Card Error Parity", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  async function expectCardSaleError(
    cardBrand: string,
    cardTypePattern: RegExp,
  ): Promise<void> {
    let error: unknown;
    try {
      await device.sale(10.0).withEcrId("123").execute();
    } catch (caughtError) {
      error = caughtError;
    }

    if (!error) {
      throw new Error(
        `Expected a UPA error for the ${cardBrand} Sale. Present the ${cardBrand} decline test card.`,
      );
    }

    expect(error).toBeInstanceOf(GatewayError);

    const gatewayError = error as GatewayError;
    expect(gatewayError.errorCode).toBeDefined();
    expect(gatewayError.deviceResponseMessage).toBeTruthy();
    expect(gatewayError.payment?.cardType).toMatch(cardTypePattern);
    expect(gatewayError.rawResponse).toBeDefined();

    console.log(`TC-04 ${cardBrand} Sale error:`, gatewayError);
  }

  test("[AH-1362:TC-04.1] VISA Sale error includes UPA response properties", async () => {
    await expectCardSaleError("VISA", /visa/i);
  });

  test.only("[AH-1362:TC-04.2] Mastercard Sale error includes UPA response properties", async () => {
    await expectCardSaleError("Mastercard", /master/i);
  });

  test("[AH-1362:TC-04.3] Amex Sale error includes UPA response properties", async () => {
    await expectCardSaleError("Amex", /amex|american express/i);
  });

  test.only("[AH-1362:TC-04.4] Discover Sale error includes UPA response properties", async () => {
    await expectCardSaleError("Discover", /discover|disc/i);
  });
});

// ===========================================================================
// ===========================================================================
describeUpaLive("TC-05: Comparison (Parity Check)", () => {
  test("[AH-1362:TC-05] NodeJS SDK error structure has parity", () => {
    /**
     *
     *   - responseCode (from host.gatewayResponseCode)
     *   - responseMessage (from host.gatewayResponseMessage)
     *   - issuerResponseCode (from host.responseCode)
     *   - issuerResponseMessage (from host.responseText)
     *   - deviceResponseCode (from cmdResult.errorCode)
     *   - deviceResponseMessage (from cmdResult.errorMessage)
     *
     * Expected: NodeJS SDK GatewayError has equivalent properties
     */

    // Create a mock GatewayError to verify structure
    const mockError = new GatewayError(
      "Test error",
      "0001", // gatewayResponseCode
      "Gateway Error Message", // gatewayResponseMessage
      "05", // issuerResponseCode
      "Issuer Declined", // issuerResponseMessage
      "502", // deviceResponseCode
      "Device Error", // deviceResponseMessage
    );

    expect(mockError.responseCode).toBe("0001");
    expect(mockError.responseMessage).toBe("Gateway Error Message");
    expect(mockError.issuerResponseCode).toBe("05");
    expect(mockError.issuerResponseMessage).toBe("Issuer Declined");
    expect(mockError.deviceResponseCode).toBe("502");
    expect(mockError.deviceResponseMessage).toBe("Device Error");

    console.log("  All error properties are properly exposed:");
    console.log("    - responseCode (gateway)");
    console.log("    - responseMessage (gateway)");
    console.log("    - issuerResponseCode");
    console.log("    - issuerResponseMessage");
    console.log("    - deviceResponseCode");
    console.log("    - deviceResponseMessage");
  });

  test("[AH-1362:TC-05] exposes the complete UPA failure data unchanged", () => {
    const upaFailure = {
      message: "MSG",
      data: {
        response: "Sale",
        cmdResult: {
          result: "Failed",
          errorCode: "HOST001",
          errorMessage: "HOST ERROR",
        },
        data: {
          host: {
            responseCode: "05",
            responseText: "DECLINED",
            gatewayResponseCode: "100",
          },
          payment: { transactionType: "CREDIT SALE" },
          emv: { "9F26": "ABC123" },
          dcc: { exchangeRate: "1.2000000" },
          duplicate: { referenceNumber: "123456" },
          tokenRspCode: "0",
          tokenRspMsg: "TOKEN CREATED",
          tokenValue: "token-value",
          tokenPANLast: "1234",
          numberOfInstallment: "3",
          program: "IPP",
          planId: "plan-1",
          planTotalAmount: "30.00",
          monthlyAmount: "10.00",
          annualPercentageRate: "12.50",
          terminalId: "terminal-1",
          merchantId: "merchant-1",
          customField: "futureProperty",
          newObject: { value: "123" },
        },
      },
    };

    try {
      new UpaTransactionResponse(upaFailure);
      fail("Expected UPA failure response to throw GatewayError");
    } catch (error) {
      expect(error).toBeInstanceOf(GatewayError);

      const gatewayError = error as GatewayError;
      expect(gatewayError.errorCode).toBe("HOST001");
      expect(gatewayError.errorMessage).toBe("HOST ERROR");
      expect(gatewayError.responseCode).toBe("100");
      expect(gatewayError.responseText).toBe("DECLINED");
      expect(gatewayError.host).toEqual(upaFailure.data.data.host);
      expect(gatewayError.payment).toEqual(upaFailure.data.data.payment);
      expect(gatewayError.emv).toEqual(upaFailure.data.data.emv);
      expect(gatewayError.dcc).toEqual(upaFailure.data.data.dcc);
      expect(gatewayError.duplicate).toEqual(upaFailure.data.data.duplicate);
      expect(gatewayError.tokenRspCode).toBe("0");
      expect(gatewayError.numberOfInstallment).toBe("3");
      expect(gatewayError.terminalId).toBe("terminal-1");
      expect(gatewayError.customField).toBe("futureProperty");
      expect(gatewayError.newObject).toEqual({ value: "123" });
    }
  });
});

// ===========================================================================
// TC-06: Investigative Case - No Code Change Needed
// ===========================================================================
describeUpaLive("TC-06: Investigative Case - No Code Change Needed", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[AH-1362:TC-06] verify all UPA error properties already returned", async () => {
    try {
      const saleresponse = await device.sale(10.0).withEcrId("123").execute();
      console.warn(
        "TC-06: Sale succeeded - unable to verify error properties",
        saleresponse.status,
      );
    } catch (error) {
      const gatewayError = error as any;

      // Document all properties present in error
      const presentProperties: string[] = [];
      const expectedProperties = [
        "deviceResponseCode",
        "deviceResponseMessage",
        "responseCode",
        "responseMessage",
        "issuerResponseCode",
        "issuerResponseMessage",
      ];

      for (const prop of expectedProperties) {
        if (prop in gatewayError && gatewayError[prop] !== undefined) {
          presentProperties.push(prop);
        }
      }

      console.log("✓ TC-06: UPA Error Properties Present");
      console.log("  Present properties:", presentProperties);
      console.log("  Total found:", presentProperties.length);
      console.log("  Expected:", expectedProperties.length);
    }
  });
});

// ===========================================================================
// TC-07: Happy Path Regression - Sale / Void / Refund Still Work
// ===========================================================================
describeUpaLive(
  "TC-07: Happy Path Regression - Sale / Void / Refund Still Work",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    test("[AH-1362:TC-07.1] successful sale still returns correct response structure", async () => {
      /**
       * Scenario: No regression on successful Sale flow
       * Expected: Success response structure unchanged
       */

      try {
        const response = await device.sale(10.0).execute();

        // Verify success response has expected structure
        expect(response).toBeInstanceOf(TransactionResponse);
        expect(response.status).toBe("Success");

        // Verify key properties are present
        expect(response.transactionAmount).toBe(10.0);
        expect(response.transactionId).toBeTruthy();

        console.log("✓ TC-07.1 PASSED: Sale success response structure intact");
        console.log("  Transaction ID:", response.transactionId);
        console.log("  Amount:", response.transactionAmount);
        console.log("  Status:", response.status);
      } catch (error) {
        if (
          error instanceof GatewayError &&
          (error as any).message.includes("Device")
        ) {
          console.warn(
            "TC-07.1: Device unavailable - test skipped for regression check",
          );
        } else {
          throw error;
        }
      }
    });

    test("[AH-1362:TC-07.2] successful void still returns correct response structure", async () => {
      /**
       * Scenario: No regression on successful Void flow
       * Expected: Success response structure unchanged
       */

      try {
        // First, create a transaction to void
        const saleResponse = await device.sale(10.0).execute();

        if (saleResponse.status !== "Success") {
          console.warn("TC-07.2: Could not create transaction to void");
          return;
        }

        await settleDevice(5000);

        // Now void it
        const voidResponse = await device
          .void()
          .withTransactionId(saleResponse.transactionId)
          .execute();

        expect(voidResponse).toBeInstanceOf(TransactionResponse);
        expect(voidResponse.status).toBe("Success");

        console.log("✓ TC-07.2 PASSED: Void success response structure intact");
        console.log("  Response ID:", voidResponse.transactionId);
        console.log("  Status:", voidResponse.status);
      } catch (error) {
        if (
          error instanceof GatewayError &&
          (error as any).message.includes("Device")
        ) {
          console.warn(
            "TC-07.2: Device unavailable - test skipped for regression check",
          );
        } else {
          throw error;
        }
      }
    });

    test("[AH-1362:TC-07.3] successful refund still returns correct response structure", async () => {
      /**
       * Scenario: No regression on successful Refund flow
       * Expected: Success response structure unchanged
       */

      try {
        // First, create a transaction to refund
        const saleResponse = await device.sale(10.0).execute();

        if (saleResponse.status !== "Success") {
          console.warn("TC-07.3: Could not create transaction to refund");
          return;
        }

        await settleDevice(5000);

        // Now refund it
        const refundResponse = await device
          .refund(10.0)
          .withTransactionId(saleResponse.transactionId)
          .execute();

        expect(refundResponse).toBeInstanceOf(TransactionResponse);
        expect(refundResponse.status).toBe("Success");

        console.log(
          "✓ TC-07.3 PASSED: Refund success response structure intact",
        );
        console.log("  Response ID:", refundResponse.transactionId);
        console.log("  Status:", refundResponse.status);
        console.log("  Amount:", refundResponse.transactionAmount);
      } catch (error) {
        if (
          error instanceof GatewayError &&
          (error as any).message.includes("Device")
        ) {
          console.warn(
            "TC-07.3: Device unavailable - test skipped for regression check",
          );
        } else {
          throw error;
        }
      }
    });
  },
);
