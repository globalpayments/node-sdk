/**
 * Unit tests for UPA TransactionResponse mapping for all fields including EMV tags.
 *
 * Tests verify that all required fields are properly mapped from:
 * - GP-API responses (provider: GatewayProvider.GpApi)
 * - Native UPA device responses
 *
 * Payment types tested: VISA, MC (Mastercard), AMEX (American Express)
 */
import { TransactionResponse } from "../../../../../src/Terminals/UPA/Reponses/TransactionResponse";
import { GatewayProvider } from "../../../../../src";

describe("UPA TransactionResponse Mapping Tests", () => {
  describe("Host Response Fields Mapping", () => {
    describe("responseId", () => {
      it("should map responseId from host.responseId (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            requestId: "req-123",
            response: "Sale",
            data: {
              host: {
                responseId: "12345",
              },
            },
          },
        });

        expect(response.responseId).toBe("12345");
      });

      it("should map responseId from host.responseId (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            requestId: "req-123",
            response: "Sale",
            data: {
              host: {
                responseId: "12345",
              },
            },
          },
        });

        expect(response.responseId).toBe("12345");
      });

      it("should default to empty string if responseId not present", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {},
            },
          },
        });

        expect(response.responseId).toBe("");
      });
    });

    describe("status", () => {
      it("should map status from cmdResult.result (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            cmdResult: {
              result: "Success",
            },
            data: {
              host: {},
            },
          },
        });

        expect(response.status).toBe("Success");
      });

      it("should map status from deviceResponseText (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            cmdResult: {
              result: "Success",
            },
            data: {
              host: {},
            },
          },
        });

        expect(response.status).toBe("Success");
      });
    });

    describe("command", () => {
      it("should map command from response.response (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            response: "Sale",
            data: {
              host: {},
            },
          },
        });

        expect(response.command).toBe("Sale");
      });

      it("should map command from data.response (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            response: "Sale",
            data: {
              host: {},
            },
          },
        });

        expect(response.command).toBe("Sale");
      });
    });

    describe("referenceNumber", () => {
      it("should map referenceNumber from host.referenceNumber (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                referenceNumber: "REF-987654",
              },
            },
          },
        });

        expect(response.referenceNumber).toBe("REF-987654");
      });

      it("should map referenceNumber from host.referenceNumber (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                referenceNumber: "REF-987654",
              },
            },
          },
        });

        expect(response.referenceNumber).toBe("REF-987654");
      });
    });

    describe("terminalRefNumber", () => {
      it("should map terminalRefNumber from host.tranNo (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                tranNo: "TXN-123456",
              },
            },
          },
        });

        expect(response.terminalRefNumber).toBe("TXN-123456");
      });

      it("should map terminalRefNumber from host.tranNo (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                tranNo: "TXN-123456",
              },
            },
          },
        });

        expect(response.terminalRefNumber).toBe("TXN-123456");
      });
    });

    describe("responseCode", () => {
      it("should map responseCode from host.responseCode (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                responseCode: "00",
              },
            },
          },
        });

        expect(response.responseCode).toBe("00");
      });

      it("should map responseCode from host.responseCode (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                responseCode: "00",
              },
            },
          },
        });

        expect(response.responseCode).toBe("00");
      });
    });

    describe("approvalCode", () => {
      it("should map approvalCode from host.approvalCode (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                approvalCode: "APPROVAL123",
              },
            },
          },
        });

        expect(response.approvalCode).toBe("APPROVAL123");
      });

      it("should map approvalCode from host.approvalCode (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                approvalCode: "APPROVAL123",
              },
            },
          },
        });

        expect(response.approvalCode).toBe("APPROVAL123");
      });
    });

    describe("avsResponseCode", () => {
      it("should map avsResponseCode from host.AvsResultCode (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                AvsResultCode: "A",
              },
            },
          },
        });

        expect(response.avsResponseCode).toBe("A");
      });

      it("should map avsResponseCode from host.AvsResultCode (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                AvsResultCode: "A",
              },
            },
          },
        });

        expect(response.avsResponseCode).toBe("A");
      });
    });

    describe("avsResponseText", () => {
      it("should map avsResponseText from host.AvsResultText (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                AvsResultText: "Address Match",
              },
            },
          },
        });

        expect(response.avsResponseText).toBe("Address Match");
      });

      it("should map avsResponseText from host.AvsResultText (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                AvsResultText: "Address Match",
              },
            },
          },
        });

        expect(response.avsResponseText).toBe("Address Match");
      });
    });

    describe("cvvResponseCode", () => {
      it("should map cvvResponseCode from host.CvvResultCode (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                CvvResultCode: "M",
              },
            },
          },
        });

        expect(response.cvvResponseCode).toBe("M");
      });

      it("should map cvvResponseCode from host.CvvResultCode (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                CvvResultCode: "M",
              },
            },
          },
        });

        expect(response.cvvResponseCode).toBe("M");
      });
    });

    describe("cvvResponseText", () => {
      it("should map cvvResponseText from host.CvvResultText (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                CvvResultText: "Match",
              },
            },
          },
        });

        expect(response.cvvResponseText).toBe("Match");
      });

      it("should map cvvResponseText from host.CvvResultText (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                CvvResultText: "Match",
              },
            },
          },
        });

        expect(response.cvvResponseText).toBe("Match");
      });
    });
  });

  describe("Amount Field Mapping", () => {
    describe("baseAmount", () => {
      it("should map baseAmount from host.baseAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                baseAmount: "10000",
              },
            },
          },
        });

        expect(response.baseAmount).toBe(10000);
      });

      it("should fallback to transaction.baseAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              transaction: {
                baseAmount: "10000",
              },
            },
          },
        });

        expect(response.baseAmount).toBe(10000);
      });

      it("should map baseAmount from host.baseAmount (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                baseAmount: "10000",
              },
            },
          },
        });

        expect(response.baseAmount).toBe(10000);
      });
    });

    describe("tipAmount", () => {
      it("should map tipAmount from host.tipAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                tipAmount: "150",
              },
            },
          },
        });

        expect(response.tipAmount).toBe(150);
      });

      it("should fallback to transaction.tipAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              transaction: {
                tipAmount: "150",
              },
            },
          },
        });

        expect(response.tipAmount).toBe(150);
      });

      it("should map tipAmount from host.tipAmount (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                tipAmount: "150",
              },
            },
          },
        });

        expect(response.tipAmount).toBe(150);
      });
    });

    describe("taxAmount", () => {
      it("should map taxAmount from host.taxAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                taxAmount: "500",
              },
            },
          },
        });

        expect(response.taxAmount).toBe(500);
      });

      it("should fallback to transaction.taxAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              transaction: {
                taxAmount: "500",
              },
            },
          },
        });

        expect(response.taxAmount).toBe(500);
      });

      it("should map taxAmount from host.taxAmount (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                taxAmount: "500",
              },
            },
          },
        });

        expect(response.taxAmount).toBe(500);
      });
    });

    describe("transactionAmount", () => {
      it("should map transactionAmount from host.totalAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                totalAmount: "10650",
              },
            },
          },
        });

        expect(response.transactionAmount).toBe(10650);
      });

      it("should fallback to transaction.totalAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              transaction: {
                totalAmount: "10650",
              },
            },
          },
        });

        expect(response.transactionAmount).toBe(10650);
      });

      it("should map transactionAmount from host.totalAmount (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                totalAmount: "10650",
              },
            },
          },
        });

        expect(response.transactionAmount).toBe(10650);
      });
    });

    describe("authorizedAmount", () => {
      it("should map authorizedAmount from host.authorizedAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                authorizedAmount: "10650",
              },
            },
          },
        });

        expect(response.authorizedAmount).toBe(10650);
      });

      it("should map authorizedAmount from host.authorizedAmount (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                authorizedAmount: "10650",
              },
            },
          },
        });

        expect(response.authorizedAmount).toBe(10650);
      });

      it("should default to undefined if not present", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {},
            },
          },
        });

        expect(response.authorizedAmount).toBeUndefined();
      });
    });

    describe("cashBackAmount", () => {
      it("should map cashBackAmount from host.cashBackAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                cashBackAmount: "2000",
              },
            },
          },
        });

        expect(response.cashBackAmount).toBe(2000);
      });

      it("should fallback to transaction.cashBackAmount (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              transaction: {
                cashBackAmount: "2000",
              },
            },
          },
        });

        expect(response.cashBackAmount).toBe(2000);
      });

      it("should map cashBackAmount from host.cashBackAmount (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                cashBackAmount: "2000",
              },
            },
          },
        });

        expect(response.cashBackAmount).toBe(2000);
      });
    });

    describe("merchantFee", () => {
      it("should map merchantFee from host.surcharge (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                surcharge: "100",
              },
            },
          },
        });

        expect(response.merchantFee).toBe(100);
      });
    });

    describe("balanceAmount", () => {
      it("should map balanceAmount from host.balanceDue (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                balanceDue: "0",
              },
            },
          },
        });

        expect(response.balanceAmount).toBe(0);
      });

      it("should map balanceAmount from host.balanceDue (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                balanceDue: "0",
              },
            },
          },
        });

        expect(response.balanceAmount).toBe(0);
      });
    });

    describe("availableBalance", () => {
      it("should map availableBalance from host.availableBalance (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                availableBalance: "50000",
              },
            },
          },
        });

        expect(response.availableBalance).toBe(50000);
      });

      it("should map availableBalance from host.availableBalance (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                availableBalance: "50000",
              },
            },
          },
        });

        expect(response.availableBalance).toBe(50000);
      });
    });
  });

  describe("Token Field Mapping", () => {
    describe("token", () => {
      it("should map token from host.tokenValue (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                tokenValue: "TOKEN-ABC123",
              },
            },
          },
        });

        expect(response.token).toBe("TOKEN-ABC123");
      });

      it("should map token from host.tokenValue (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                tokenValue: "TOKEN-ABC123",
              },
            },
          },
        });

        expect(response.token).toBe("TOKEN-ABC123");
      });
    });

    describe("tokenResponseCode", () => {
      it("should map tokenResponseCode from host.tokenRspCode (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                tokenRspCode: "0",
              },
            },
          },
        });

        expect(response.tokenResponseCode).toBe("0");
      });

      it("should map tokenResponseCode from host.tokenRspCode (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                tokenRspCode: "0",
              },
            },
          },
        });

        expect(response.tokenResponseCode).toBe("0");
      });
    });

    describe("tokenResponseMessage", () => {
      it("should map tokenResponseMessage from host.tokenRspMsg (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                tokenRspMsg: "Token Created",
              },
            },
          },
        });

        expect(response.tokenResponseMessage).toBe("Token Created");
      });

      it("should map tokenResponseMessage from host.tokenRspMsg (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                tokenRspMsg: "Token Created",
              },
            },
          },
        });

        expect(response.tokenResponseMessage).toBe("Token Created");
      });
    });

    describe("cardBrandTransId", () => {
      it("should map cardBrandTransId from host.cardBrandTransId (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {
                cardBrandTransId: "CBTI-123",
              },
            },
          },
        });

        expect(response.cardBrandTransId).toBe("CBTI-123");
      });

      it("should map cardBrandTransId from host.cardBrandTransId (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {
                cardBrandTransId: "CBTI-123",
              },
            },
          },
        });

        expect(response.cardBrandTransId).toBe("CBTI-123");
      });
    });
  });

  describe("Card Information Field Mapping", () => {
    describe("maskedCardNumber", () => {
      it("should map maskedCardNumber from payment.maskedPan (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              payment: {
                maskedPan: "4111****1111",
              },
              host: {},
            },
          },
        });

        expect(response.maskedCardNumber).toBe("4111****1111");
      });

      it("should fallback to payment.maskedPAN (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              payment: {
                maskedPAN: "4111****1111",
              },
              host: {},
            },
          },
        });

        expect(response.maskedCardNumber).toBe("4111****1111");
      });

      it("should map maskedCardNumber from payment.maskedPan (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              payment: {
                maskedPan: "4111****1111",
              },
            },
          },
        });

        expect(response.maskedCardNumber).toBe("4111****1111");
      });
    });

    describe("entryMethod", () => {
      it("should map entryMethod from payment.cardAcquisition (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              payment: {
                cardAcquisition: "CHIP",
              },
              host: {},
            },
          },
        });

        expect(response.entryMethod).toBe("CHIP");
      });

      it("should map entryMethod from payment.cardAcquisition (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              payment: {
                cardAcquisition: "CHIP",
              },
            },
          },
        });

        expect(response.entryMethod).toBe("CHIP");
      });
    });

    describe("paymentType", () => {
      it("should map paymentType from payment.cardType (VISA)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              payment: {
                cardType: "VISA",
              },
              host: {},
            },
          },
        });

        expect(response.paymentType).toBe("VISA");
      });

      it("should map paymentType from payment.cardType (MC - Mastercard)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              payment: {
                cardType: "MC",
              },
              host: {},
            },
          },
        });

        expect(response.paymentType).toBe("MC");
      });

      it("should map paymentType from payment.cardType (AMEX)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              payment: {
                cardType: "AMEX",
              },
              host: {},
            },
          },
        });

        expect(response.paymentType).toBe("AMEX");
      });
    });

    describe("cardBIN", () => {
      it("should map cardBIN from payment.cardBIN (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              payment: {
                cardBIN: "411111",
              },
              host: {},
            },
          },
        });

        expect(response.cardBIN).toBe("411111");
      });

      it("should map cardBIN from payment.cardBIN (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              payment: {
                cardBIN: "411111",
              },
            },
          },
        });

        expect(response.cardBIN).toBe("411111");
      });
    });

    describe("panSequenceNumber", () => {
      it("should map panSequenceNumber from payment.panSequenceNumber (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              payment: {
                panSequenceNumber: "001",
              },
              host: {},
            },
          },
        });

        expect(response.panSequenceNumber).toBe("001");
      });

      it("should map panSequenceNumber from payment.panSequenceNumber (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              payment: {
                panSequenceNumber: "001",
              },
            },
          },
        });

        expect(response.panSequenceNumber).toBe("001");
      });
    });

    describe("cardHolderName", () => {
      it("should map cardHolderName from payment.cardHolderName (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              payment: {
                cardHolderName: "John Doe",
              },
              host: {},
            },
          },
        });

        expect(response.cardHolderName).toBe("John Doe");
      });

      it("should map cardHolderName from payment.cardHolderName (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              payment: {
                cardHolderName: "John Doe",
              },
            },
          },
        });

        expect(response.cardHolderName).toBe("John Doe");
      });
    });

    describe("expirationDate", () => {
      it("should map expirationDate from payment.expiryDate (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              payment: {
                expiryDate: "1225",
              },
              host: {},
            },
          },
        });

        expect(response.expirationDate).toBe("1225");
      });

      it("should map expirationDate from payment.expiryDate (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              payment: {
                expiryDate: "1225",
              },
            },
          },
        });

        expect(response.expirationDate).toBe("1225");
      });
    });
  });

  describe("EMV Tag Field Mapping - GP-API Response", () => {
    describe("applicationLabel (EMV Tag 50)", () => {
      it("should map applicationLabel from emv['50'] (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {},
              emv: {
                "50": "MASTERCARD",
              },
            },
          },
        });

        expect(response.emvApplicationLabel).toBe("MASTERCARD");
      });
    });

    describe("applicationId (EMV Tag 9F06)", () => {
      it("should map applicationId from emv['9F06'] (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {},
              emv: {
                "9F06": "A0000000041010",
              },
            },
          },
        });

        expect(response.emvApplicationId).toBe("A0000000041010");
      });
    });

    describe("applicationPreferredName (EMV Tag 9F12)", () => {
      it("should map applicationPreferredName from emv['9F12'] (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {},
              emv: {
                "9F12": "MASTERCARD",
              },
            },
          },
        });

        expect(response.emvApplicationPreferredName).toBe("MASTERCARD");
      });
    });

    describe("applicationCryptogram (EMV Tag 9F26)", () => {
      it("should map applicationCryptogram from emv['9F26'] (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {},
              emv: {
                "9F26": "A1B2C3D4E5F6G7H8",
              },
            },
          },
        });

        expect(response.emvApplicationCryptogram).toBe("A1B2C3D4E5F6G7H8");
      });
    });

    describe("cardHolderVerificationMethod (EMV Tag 9F34)", () => {
      it("should map cardHolderVerificationMethod from emv['9F34'] (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {},
              emv: {
                "9F34": "1F0102",
              },
            },
          },
        });

        expect(response.cardHolderVerificationMethod).toBe("1F0102");
      });
    });

    describe("terminalVerificationResults (EMV Tag 95)", () => {
      it("should map terminalVerificationResults from emv['95'] (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {},
              emv: {
                "95": "8000008000",
              },
            },
          },
        });

        expect(response.emvTerminalVerificationResults).toBe("8000008000");
      });
    });

    describe("Complete EMV Tag Set (GP-API)", () => {
      it("should map all common EMV tags (GP-API)", () => {
        const response = new TransactionResponse({
          provider: GatewayProvider.GpApi,
          response: {
            data: {
              host: {},
              emv: {
                "4F": "A0000000041010",
                "50": "MASTERCARD",
                "5F20": "John Doe",
                "5F2A": "0840",
                "82": "39C8",
                "84": "A0000000041010",
                "8A": "Y1",
                "95": "8000008000",
                "9A": "210825",
                "9B": "E8C001",
                "9C": "00",
                "9F02": "000000001000",
                "9F03": "000000000000",
                "9F06": "A0000000041010",
                "9F1A": "0840",
                "9F26": "A1B2C3D4E5F6G7H8",
                "9F27": "80",
                "9F34": "1F0102",
                "9F35": "22",
                "9F36": "0001",
                "9F37": "12345678",
                "9F40": "F0F001F8",
                "9F41": "000000",
                "9F53": "9500",
                TacDefault: "000000",
                TacDenial: "000000",
                TacOnline: "AC0000",
              },
            },
          },
        });

        expect(response.applicationIdentifier).toBe("A0000000041010");
        expect(response.emvApplicationLabel).toBe("MASTERCARD");
        expect(response.emvCardholderName).toBe("John Doe");
        expect(response.transactionCurrencyCode).toBe("0840");
        expect(response.applicationAIP).toBe("39C8");
        expect(response.dedicatedDF).toBe("A0000000041010");
        expect(response.authorizedResponse).toBe("Y1");
        expect(response.emvTerminalVerificationResults).toBe("8000008000");
        expect(response.transactionDate).toBe("210825");
        expect(response.transactionTSI).toBe("E8C001");
        expect(response.transactionTypeEMV).toBe("00");
        expect(response.amountAuthorised).toBe("000000001000");
        expect(response.otherAmount).toBe("000000000000");
        expect(response.emvApplicationId).toBe("A0000000041010");
        expect(response.terminalCountryCode).toBe("0840");
        expect(response.emvApplicationCryptogram).toBe("A1B2C3D4E5F6G7H8");
        expect(response.applicationCryptogramType_Tag).toBe("80");
        expect(response.cvmResults).toBe("1F0102");
        expect(response.cardHolderVerificationMethod).toBe("1F0102");
        expect(response.terminalType).toBe("22");
        expect(response.applicationTransactionCounter).toBe("0001");
        expect(response.unpredictableNumber).toBe("12345678");
        expect(response.additionalTerminalCapabilities).toBe("F0F001F8");
        expect(response.transactionSequenceCounter).toBe("000000");
        expect(response.transactionCategoryCode).toBe("9500");
        expect(response.tacDefault).toBe("000000");
        expect(response.tacDenial).toBe("000000");
        expect(response.tacOnline).toBe("AC0000");
      });
    });
  });

  describe("EMV Tag Field Mapping - Native UPA Response", () => {
    describe("Complete EMV Tag Set (Native UPA)", () => {
      it("should map all common EMV tags (Native UPA)", () => {
        const response = new TransactionResponse({
          data: {
            data: {
              host: {},
              emv: {
                "4F": "A0000000041010",
                "50": "MASTERCARD",
                "5F20": "John Doe",
                "5F2A": "0840",
                "82": "39C8",
                "84": "A0000000041010",
                "8A": "Y1",
                "95": "8000008000",
                "9A": "210825",
                "9B": "E8C001",
                "9C": "00",
                "9F02": "000000001000",
                "9F03": "000000000000",
                "9F06": "A0000000041010",
                "9F1A": "0840",
                "9F26": "A1B2C3D4E5F6G7H8",
                "9F27": "80",
                "9F34": "1F0102",
                "9F35": "22",
                "9F36": "0001",
                "9F37": "12345678",
                "9F40": "F0F001F8",
                "9F41": "000000",
                "9F53": "9500",
                TacDefault: "000000",
                TacDenial: "000000",
                TacOnline: "AC0000",
              },
            },
          },
        });

        expect(response.applicationIdentifier).toBe("A0000000041010");
        expect(response.emvApplicationLabel).toBe("MASTERCARD");
        expect(response.emvCardholderName).toBe("John Doe");
        expect(response.transactionCurrencyCode).toBe("0840");
        expect(response.applicationAIP).toBe("39C8");
        expect(response.dedicatedDF).toBe("A0000000041010");
        expect(response.authorizedResponse).toBe("Y1");
        expect(response.emvTerminalVerificationResults).toBe("8000008000");
        expect(response.transactionDate).toBe("210825");
        expect(response.transactionTSI).toBe("E8C001");
        expect(response.transactionTypeEMV).toBe("00");
        expect(response.amountAuthorised).toBe("000000001000");
        expect(response.otherAmount).toBe("000000000000");
        expect(response.emvApplicationId).toBe("A0000000041010");
        expect(response.terminalCountryCode).toBe("0840");
        expect(response.emvApplicationCryptogram).toBe("A1B2C3D4E5F6G7H8");
        expect(response.applicationCryptogramType_Tag).toBe("80");
        expect(response.cvmResults).toBe("1F0102");
        expect(response.cardHolderVerificationMethod).toBe("1F0102");
        expect(response.terminalType).toBe("22");
        expect(response.applicationTransactionCounter).toBe("0001");
        expect(response.unpredictableNumber).toBe("12345678");
        expect(response.additionalTerminalCapabilities).toBe("F0F001F8");
        expect(response.transactionSequenceCounter).toBe("000000");
        expect(response.transactionCategoryCode).toBe("9500");
        expect(response.tacDefault).toBe("000000");
        expect(response.tacDenial).toBe("000000");
        expect(response.tacOnline).toBe("AC0000");
      });
    });
  });

  describe("Full Transaction Response - Sample VISA Sale", () => {
    it("should map complete VISA sale response (GP-API)", () => {
      const response = new TransactionResponse({
        provider: GatewayProvider.GpApi,
        id: "TXN-VISA-001",
        response: {
          requestId: "REQ-VISA-001",
          response: "Sale",
          EcrId: "ECR-001",
          cmdResult: {
            result: "Success",
            errorCode: "00",
            errorMessage: "",
          },
          data: {
            host: {
              responseId: "RESP-001",
              referenceNumber: "REF-VISA-001",
              tranNo: "TXN-NO-001",
              respDateTime: "2024-01-15T10:30:00Z",
              gatewayResponseCode: "00",
              gatewayResponseMessage: "Approved",
              responseCode: "00",
              responseText: "Approved",
              approvalCode: "APPR-001",
              AvsResultCode: "A",
              AvsResultText: "Address Match",
              CvvResultCode: "M",
              CvvResultText: "Match",
              baseAmount: "10000",
              tipAmount: "150",
              taxAmount: "500",
              totalAmount: "10650",
              authorizedAmount: "10650",
              cashBackAmount: "0",
              balanceDue: "0",
              availableBalance: "50000",
              tokenValue: "TOK-VISA-001",
              tokenRspCode: "0",
              tokenRspMsg: "Token Created",
              cardBrandTransId: "CBTI-001",
              storeAndForward: 0,
            },
            payment: {
              cardType: "VISA",
              cardGroup: "CREDIT",
              ebtType: "",
              clerkId: "CLK-001",
              cardAcquisition: "CHIP",
              maskedPan: "4111****1111",
              cardHolderName: "John Smith",
              expiryDate: "1225",
              transactionType: "Sale",
              cardBIN: "411111",
              panSequenceNumber: "001",
              PinVerified: "Y",
              fallback: "0",
              invoiceNbr: "INV-001",
            },
            transaction: {
              baseAmount: "10000",
              tipAmount: "150",
              totalAmount: "10650",
              extraChargeTotal: "0",
            },
            multipleMessage: "1 of 1",
            terminalNumber: "TERM-001",
            emv: {
              "4F": "A0000000031010",
              "50": "VISA",
              "5F20": "John Smith",
              "5F2A": "0840",
              "82": "18C8",
              "84": "A0000000031010",
              "8A": "Y1",
              "95": "8000008000",
              "9A": "240115",
              "9B": "E8C001",
              "9C": "00",
              "9F02": "000000010650",
              "9F03": "000000000000",
              "9F06": "A0000000031010",
              "9F1A": "0840",
              "9F26": "A1B2C3D4E5F6G7H8",
              "9F34": "1F0102",
              "9F35": "22",
              "9F36": "0001",
              TacDefault: "000000",
              TacDenial: "000000",
              TacOnline: "AC0000",
            },
          },
        },
      });

      // Verify host response fields
      expect(response.responseId).toBe("RESP-001");
      expect(response.status).toBe("Success");
      expect(response.command).toBe("Sale");
      expect(response.referenceNumber).toBe("REF-VISA-001");
      expect(response.terminalRefNumber).toBe("TXN-NO-001");
      expect(response.responseCode).toBe("00");
      expect(response.approvalCode).toBe("APPR-001");
      expect(response.avsResponseCode).toBe("A");
      expect(response.avsResponseText).toBe("Address Match");
      expect(response.cvvResponseCode).toBe("M");
      expect(response.cvvResponseText).toBe("Match");

      // Verify amount fields
      expect(response.baseAmount).toBe(10000);
      expect(response.tipAmount).toBe(150);
      expect(response.taxAmount).toBe(500);
      expect(response.transactionAmount).toBe(10650);
      expect(response.authorizedAmount).toBe(10650);
      expect(response.cashBackAmount).toBe(0);
      expect(response.balanceAmount).toBe(0);
      expect(response.availableBalance).toBe(50000);

      // Verify token fields
      expect(response.token).toBe("TOK-VISA-001");
      expect(response.tokenResponseCode).toBe("0");
      expect(response.tokenResponseMessage).toBe("Token Created");
      expect(response.cardBrandTransId).toBe("CBTI-001");

      // Verify card information
      expect(response.paymentType).toBe("VISA");
      expect(response.maskedCardNumber).toBe("4111****1111");
      expect(response.entryMethod).toBe("CHIP");
      expect(response.cardHolderName).toBe("John Smith");
      expect(response.expirationDate).toBe("1225");
      expect(response.cardBIN).toBe("411111");
      expect(response.panSequenceNumber).toBe("001");

      // Verify EMV fields
      expect(response.applicationIdentifier).toBe("A0000000031010");
      expect(response.emvApplicationLabel).toBe("VISA");
      expect(response.emvCardholderName).toBe("John Smith");
      expect(response.transactionCurrencyCode).toBe("0840");
      expect(response.emvApplicationCryptogram).toBe("A1B2C3D4E5F6G7H8");
      expect(response.cardHolderVerificationMethod).toBe("1F0102");
      expect(response.emvTerminalVerificationResults).toBe("8000008000");
      expect(response.tacDefault).toBe("000000");
      expect(response.tacOnline).toBe("AC0000");
    });
  });

  describe("Full Transaction Response - Sample Mastercard Sale", () => {
    it("should map complete Mastercard sale response (Native UPA)", () => {
      const response = new TransactionResponse({
        data: {
          requestId: "REQ-MC-001",
          response: "Sale",
          EcrId: "ECR-002",
          cmdResult: {
            result: "Success",
            errorCode: "00",
            errorMessage: "",
          },
          data: {
            host: {
              responseId: "RESP-002",
              referenceNumber: "REF-MC-001",
              tranNo: "TXN-NO-002",
              respDateTime: "2024-01-15T10:45:00Z",
              gatewayResponseCode: "00",
              gatewayResponseMessage: "Approved",
              responseCode: "00",
              responseText: "Approved",
              approvalCode: "APPR-002",
              AvsResultCode: "A",
              AvsResultText: "Address Match",
              CvvResultCode: "M",
              CvvResultText: "Match",
              baseAmount: "25000",
              tipAmount: "500",
              taxAmount: "1200",
              totalAmount: "26700",
              authorizedAmount: "26700",
              cashBackAmount: "5000",
              balanceDue: "0",
              availableBalance: "75000",
              tokenValue: "TOK-MC-001",
              tokenRspCode: "0",
              tokenRspMsg: "Token Created",
              cardBrandTransId: "CBTI-002",
              storeAndForward: 0,
            },
            payment: {
              cardType: "MC",
              cardGroup: "CREDIT",
              ebtType: "",
              clerkId: "CLK-002",
              cardAcquisition: "CHIP",
              maskedPan: "5555****5555",
              cardHolderName: "Jane Doe",
              expiryDate: "0625",
              transactionType: "Sale",
              cardBIN: "555555",
              panSequenceNumber: "002",
              PinVerified: "Y",
              fallback: "0",
              invoiceNbr: "INV-002",
            },
            transaction: {
              baseAmount: "25000",
              tipAmount: "500",
              totalAmount: "26700",
              extraChargeTotal: "0",
            },
            multipleMessage: "1 of 1",
            terminalNumber: "TERM-002",
            emv: {
              "4F": "A0000000041010",
              "50": "MASTERCARD",
              "5F20": "Jane Doe",
              "5F2A": "0840",
              "82": "39C8",
              "84": "A0000000041010",
              "8A": "Y1",
              "95": "8000008000",
              "9A": "240115",
              "9B": "E8C001",
              "9C": "00",
              "9F02": "000000026700",
              "9F03": "000000000000",
              "9F06": "A0000000041010",
              "9F1A": "0840",
              "9F26": "B2C3D4E5F6G7H8I9",
              "9F34": "1F0102",
              "9F35": "22",
              "9F36": "0002",
              TacDefault: "000000",
              TacDenial: "000000",
              TacOnline: "AC0000",
            },
          },
        },
      });

      // Verify host response fields
      expect(response.responseId).toBe("RESP-002");
      expect(response.command).toBe("Sale");
      expect(response.referenceNumber).toBe("REF-MC-001");
      expect(response.terminalRefNumber).toBe("TXN-NO-002");

      // Verify amount fields
      expect(response.baseAmount).toBe(25000);
      expect(response.tipAmount).toBe(500);
      expect(response.taxAmount).toBe(1200);
      expect(response.transactionAmount).toBe(26700);
      expect(response.cashBackAmount).toBe(5000);

      // Verify card information
      expect(response.paymentType).toBe("MC");
      expect(response.maskedCardNumber).toBe("5555****5555");
      expect(response.cardHolderName).toBe("Jane Doe");

      // Verify EMV fields
      expect(response.emvApplicationLabel).toBe("MASTERCARD");
      expect(response.emvApplicationCryptogram).toBe("B2C3D4E5F6G7H8I9");
    });
  });

  describe("Full Transaction Response - Sample AMEX Sale", () => {
    it("should map complete AMEX sale response (GP-API)", () => {
      const response = new TransactionResponse({
        provider: GatewayProvider.GpApi,
        response: {
          requestId: "REQ-AMEX-001",
          response: "Sale",
          EcrId: "ECR-003",
          cmdResult: {
            result: "Success",
            errorCode: "00",
          },
          data: {
            host: {
              responseId: "RESP-003",
              referenceNumber: "REF-AMEX-001",
              tranNo: "TXN-NO-003",
              responseCode: "00",
              responseText: "Approved",
              approvalCode: "APPR-003",
              baseAmount: "15000",
              tipAmount: "300",
              taxAmount: "750",
              totalAmount: "16050",
              authorizedAmount: "16050",
              tokenValue: "TOK-AMEX-001",
              tokenRspCode: "0",
              tokenRspMsg: "Token Created",
              cardBrandTransId: "CBTI-003",
            },
            payment: {
              cardType: "AMEX",
              cardGroup: "CREDIT",
              cardAcquisition: "CHIP",
              maskedPan: "378282****6000",
              cardHolderName: "Bob Johnson",
              expiryDate: "0825",
              cardBIN: "378282",
              panSequenceNumber: "003",
              invoiceNbr: "INV-003",
            },
            emv: {
              "50": "AMEX",
              "5F20": "Bob Johnson",
              "9F26": "C3D4E5F6G7H8I9J0",
              "9F34": "1F0102",
            },
          },
        },
      });

      // Verify card information
      expect(response.paymentType).toBe("AMEX");
      expect(response.maskedCardNumber).toBe("378282****6000");
      expect(response.cardBIN).toBe("378282");

      // Verify amount fields
      expect(response.baseAmount).toBe(15000);
      expect(response.transactionAmount).toBe(16050);

      // Verify token fields
      expect(response.token).toBe("TOK-AMEX-001");
      expect(response.tokenResponseCode).toBe("0");
    });
  });

  describe("Edge Cases and Null Handling", () => {
    it("should handle null/undefined values gracefully", () => {
      const response = new TransactionResponse({
        provider: GatewayProvider.GpApi,
        response: {
          data: {
            host: null,
            payment: null,
            emv: null,
          },
        },
      });

      expect(response.responseId).toBe("");
      expect(response.baseAmount).toBeUndefined();
      expect(response.taxAmount).toBeUndefined();
      expect(response.authorizedAmount).toBeUndefined();
    });

    it("should handle empty EMV object", () => {
      const response = new TransactionResponse({
        provider: GatewayProvider.GpApi,
        response: {
          data: {
            host: {},
            emv: {},
          },
        },
      });

      expect(response.emvApplicationLabel).toBe("");
      expect(response.emvApplicationId).toBe("");
    });

    it("should handle string JSON input", () => {
      const jsonString = JSON.stringify({
        provider: GatewayProvider.GpApi,
        response: {
          requestId: "REQ-STR-001",
          data: {
            host: {
              responseId: "RESP-STR-001",
              referenceNumber: "REF-STR-001",
            },
          },
        },
      });

      const response = new TransactionResponse(jsonString);
      expect(response.responseId).toBe("RESP-STR-001");
      expect(response.referenceNumber).toBe("REF-STR-001");
    });

    it("should handle invalid JSON string gracefully", () => {
      expect(() => {
        new TransactionResponse("invalid json");
      }).toThrow();
    });
  });

  describe("TYP Loyalty Fields Mapping", () => {
    it("should map TYP sale redemption fields (GP-API)", () => {
      const response = new TransactionResponse({
        provider: GatewayProvider.GpApi,
        response: {
          data: {
            host: {
              redeemId: "REDEEM-001",
              redeemStatus: "COMPLETE",
              currencyAmountRedeemed: "1000",
              pointsRedeemed: "10000",
              discountAmountRedeemed: "500",
            },
          },
        },
      });

      expect(response.redeemId).toBe("REDEEM-001");
      expect(response.redeemStatus).toBe("COMPLETE");
      expect(response.currencyAmountRedeemed).toBe(1000);
      expect(response.pointsRedeemed).toBe(10000);
      expect(response.discountAmountRedeemed).toBe(500);
    });

    it("should map TYP void/reverse redemption fields (Native UPA)", () => {
      const response = new TransactionResponse({
        data: {
          data: {
            host: {
              voidRedeemId: "VOID-REDEEM-001",
              voidRedeemStatus: "REVERSED",
              voidCurrencyAmountRedeemed: "1000",
              voidPointsRedeemed: "10000",
              voidDiscountAmountRedeemed: "500",
            },
          },
        },
      });

      expect(response.voidRedeemId).toBe("VOID-REDEEM-001");
      expect(response.voidRedeemStatus).toBe("REVERSED");
      expect(response.voidCurrencyAmountRedeemed).toBe(1000);
      expect(response.voidPointsRedeemed).toBe(10000);
      expect(response.voidDiscountAmountRedeemed).toBe(500);
    });
  });
});
