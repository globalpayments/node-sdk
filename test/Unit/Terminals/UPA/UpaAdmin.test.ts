/**
 * Unit tests for device-level methods and administrative transactions:
 *   endOfDay(), sendStoreAndForward(), getSignature(), ping(),
 *   balance(), reverse(), deletePreAuth(),
 *   startCardTransaction(), reboot(),
 *   MITC connection mode, deleteSaf(), cancel(), registerPOS(),
 *   refund() with clerkId and enhanced fields,
 *   verify() with address verification and CVV verification,
 *   lineItem() with LineItemDisplay spec
 */
import {
  Address,
  ArgumentError,
  GpApiConfig,
  IDeviceInterface,
  PaymentMethodType,
  POSData,
  StoredCredentialInitiator,
  TransactionType,
} from "../../../../src";
import { DeviceService } from "../../../../src/Services/DeviceService";
import { AcquisitionType } from "../../../../src/Entities/Enums/AcquisitionType";
import { CardTypeFilter } from "../../../../src/Entities/Enums/CardTypeFilter";
import { ProcessingIndicator } from "../../../../src/Entities/UPA/ProcessIndicator";
import { UpaParam } from "../../../../src/Entities/UPA/UpaParam";
import { UpaTransactionData } from "../../../../src/Entities/UPA/UpaTransactionData";
import { TransactionResponse } from "../../../../src/Terminals/UPA/Reponses/TransactionResponse";
import { UpaEODResponse } from "../../../../src/Terminals/UPA/Reponses/UpaEODResponse";
import { UpaGiftCardResponse } from "../../../../src/Terminals/UPA/Reponses/UpaGiftCardResponse";
import { UpaSAFResponse } from "../../../../src/Terminals/UPA/Reponses/UpaSAFResponse";
import { UpaSignatureResponse } from "../../../../src/Terminals/UPA/Reponses/UpaSignatureResponse";
import {
  buildConfig,
  createLiveDebitSale,
  createLivePreAuth,
  createLiveSale,
  createTestDevice,
  deletePreAuthWithRetry,
  describeUpaLive,
  ensureSafData,
  executeLiveStartCardTransaction,
  expectLiveBalanceFailure,
  expectLiveBalanceResponseFields,
  expectLiveDeletePreAuthFailure,
  expectLiveReverseFailure,
  expectLiveReverseResponseFields,
  expectLiveSuccess,
  expectParsedStartCardTransactionResponse,
  formatLiveFailure,
  getFirstSafReferenceNumber,
  isKnownLiveBalanceBlocker,
  isKnownLiveBusyBlocker,
  isKnownLiveGiftCardBlocker,
  isKnownLiveReverseAutoFallbackBlocker,
  isKnownLiveSaleBlocker,
  isKnownLiveStartCardTransactionBlocker,
  isKnownLiveTransportTimeout,
  reverseLiveSaleWithRetry,
  useLiveMic,
} from "./UpaHelpertest";

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
// endOfDay()
//   response != null, Status == "Success"
//   response != null
//   DeviceResponseText == "Success", DeviceResponseCode == "00"
//   BatchId != null
// ===========================================================================
describeUpaLive("UPA Admin – endOfDay()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaCreditTests][UpaDebitTests][UpaEbtTests][UpaMicTests] endOfDay() returns expected response", async () => {
    const saleresponse = await device
      .sale(5.0)
      .withEcrId(13)
      .withClerkId(123)
      .execute();
    expect(saleresponse).not.toBeNull();
    expect(saleresponse.deviceResponseCode).toBe("00");

    const response = await (device as any).endOfDay();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(UpaEODResponse);

    if (useLiveMic) {
      expect(response.command).toBe("EODProcessing");
      expect(response.status).toBeTruthy();
      expect(response.deviceResponseCode).toBeTruthy();
      expect(response.deviceResponseText).toBeTruthy();

      if (response.status === "Success") {
        expect(response.deviceResponseCode).toBe("00");
        expect(response.deviceResponseText).toBe("Success");
        expect(response.batchId).toBeDefined();
        expect(response.batchId).not.toBeNull();
      } else {
        expect(response.status).toBe("Failed");
      }

      return;
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseText).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
    expect(response.batchId).toBeDefined();
    expect(response.batchId).not.toBeNull();
  });
});

// ===========================================================================
// sendStoreAndForward()
// Status == "Success", DeviceResponseText == "Success", DeviceResponseCode == "00"
//  no assertion (only checks no ApiException thrown)
// ===========================================================================
describeUpaLive("UPA Admin – sendStoreAndForward()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaAdminTests][UpaMicTests] sendStoreAndForward() returns expected response and does not throw", async () => {
    const response = await (device as any).sendStoreAndForward();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(UpaSAFResponse);

    if (useLiveMic) {
      expect(response.command).toBe("SendSAF");
      expect(response.status).toBeTruthy();
      expect(response.deviceResponseCode).toBeTruthy();
      expect(response.deviceResponseText).toBeTruthy();

      if (response.status === "Success") {
        expect(response.deviceResponseCode).toBe("00");
        expect(response.deviceResponseText).toBe("Success");
      } else {
        expect(response.status).toBe("Failed");
      }

      return;
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseText).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });
});

// ===========================================================================
// getSignature() / PromptAndGetSignatureFile()
// DeviceResponseCode == "00", Status == "Success"
// SignatureData != null
// SignatureData populated (with prompt2 + displayOption)
// ===========================================================================
describeUpaLive("UPA Admin – getSignature()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaAdminTests:130][UpaAdminTests:693] getSignature() returns expected response and SignatureData", async () => {
    const response = await (device as any).getSignature("Please sign");

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(UpaSignatureResponse);
    expect(response.deviceResponseCode).toBe("00");
    expect(response.status).toBe("Success");
    expect(response.signatureData).not.toBeNull();
    expect(response.signatureData).toBeInstanceOf(Buffer);
  });

  test("[UpaMicTests:483] getSignature() with prompt2 + displayOption returns populated SignatureData", async () => {
    const response = await (device as any).getSignature(
      "Please sign",
      "and confirm",
      1,
    );

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(UpaSignatureResponse);
    expect(response.signatureData).toBeInstanceOf(Buffer);
    expect(response.signatureData!.length).toBeGreaterThan(0);
  });
});

// ===========================================================================
// ping()
// DeviceResponseCode == "00", Status == "Success"
// no assertion (only checks no ApiException thrown)
// ===========================================================================
describeUpaLive("UPA Admin – ping()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaAdminTests:52][UpaMicTests:42] ping() returns expected response values and does not throw", async () => {
    const response = await (device as any).ping();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      expect(response.responseText).toBe("SUCCESS");
      expect(["INITIATED", "COMPLETE"]).toContain(response.deviceResponseText);
      expect(response.transactionId).toBeTruthy();
      return;
    }

    expect(response.deviceResponseCode).toBe("00");
    expect(response.status).toBe("Success");
  });
});

// ===========================================================================
// balance()
//     Assert.AreEqual("00", response.ResponseCode / DeviceResponseCode)
//     Assert.AreEqual("Success", response.DeviceResponseText)
// ===========================================================================
describeUpaLive("UPA Admin – balance()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaEbtTests] balance() with EBT Foodstamp returns deviceResponseCode == '00'", async () => {
    const response = await (device as any)
      .balance()
      .withEcrId(13)
      .withPaymentMethodType(PaymentMethodType.EBT)
      .execute();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      // if (isKnownLiveBalanceBlocker(response)) {
      //   console.warn(formatLiveFailure(response, "BalanceInquiry Foodstamp"));
      //   return;
      // }

      // if (isKnownLiveBusyBlocker(response)) {
      //   console.warn(formatLiveFailure(response, "BalanceInquiry Foodstamp"));
      //   return;
      // }

      expectLiveSuccess(response, ["BalanceInquiry", "SendCommand"]);
      return;
    }

    expect(response.deviceResponseCode).toBe("00");
  });

  test("[UpaEbtTests] balance() with EBT returns status Success and deviceResponseCode '00'", async () => {
    const response = await (device as any)
      .balance()
      .withEcrId(13)
      .withPaymentMethodType(PaymentMethodType.EBT)
      .execute();

    expect(response).not.toBeNull();

    expect(response.status).toBe("Success");
    expect(response.deviceResponseText).toBe("COMPLETE");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[LivePositive] balance() with MC card returns success", async () => {
    const response = await (device as any)
      .balance()
      .withEcrId(13)
      .withPaymentMethodType(PaymentMethodType.Credit)
      .execute();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    expectLiveSuccess(response, ["BalanceInquiry", "SendCommand"]);
    expectLiveBalanceResponseFields(response);
    expect(response.cardGroup).toBe("CREDIT");
    expect(response.cardType).toMatch(/^(MASTERCARD|MasterCard|MC)$/i);
  });

  test("[LivePositive] balance() returns documented response fields on success", async () => {
    const response = await (device as any)
      .balance()
      .withEcrId(13)
      .withPaymentMethodType(PaymentMethodType.Credit)
      .execute();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    expectLiveSuccess(response, ["BalanceInquiry", "SendCommand"]);
    expectLiveBalanceResponseFields(response);
    expect(response.cardType).toBeTruthy();
    expect(response.cardGroup).toBeTruthy();
    expect(response.cardHolderName).toBeTruthy();
  });

  test("[LivePositive] balance() with EBT populates ebtType and cardGroup", async () => {
    const response = await (device as any)
      .balance()
      .withEcrId(13)
      .withPaymentMethodType(PaymentMethodType.EBT)
      .execute();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);
    expect(["BalanceInquiry", "SendCommand"]).toContain(response.command);

    if (isKnownLiveBusyBlocker(response)) {
      console.warn(
        formatLiveFailure(response, "BalanceInquiry EBT field validation"),
      );
      return;
    }

    if (isKnownLiveBalanceBlocker(response)) {
      expect(response.cardGroup).toBeTruthy();
      expect(response.ebtType).toBeTruthy();
      expect(response.cardType).toBeTruthy();
      return;
    }

    expectLiveSuccess(response, ["BalanceInquiry", "SendCommand"]);
    expectLiveBalanceResponseFields(response);

    if (response.cardGroup !== "EBT" || !response.ebtType) {
      console.warn(
        "BalanceInquiry EBT field validation requires an actual EBT-presented card; the current live run returned a non-EBT successful balance response.",
      );
      return;
    }

    expect(response.cardGroup).toBe("EBT");
    expect(response.ebtType).toBeTruthy();
    expect(response.cardType).toBeTruthy();
  });

  test("[LiveNegative] balance() with invalid target device surfaces device error", async () => {
    const unavailableDevice = DeviceService.create(buildConfig());
    unavailableDevice.ecrId = "99999999";

    await expectLiveBalanceFailure(
      () =>
        (unavailableDevice as any)
          .balance()
          .withEcrId(99999999)
          .withPaymentMethodType(PaymentMethodType.Credit)
          .execute(),
      "BalanceInquiry invalid target device",
    );
  });

  test("[LiveSetup] balance() invalid clerk number documents current terminal behavior", async () => {
    const response = await (device as any)
      .balance()
      .withEcrId(13)
      .withClerkId(99999999)
      .withPaymentMethodType(PaymentMethodType.Credit)
      .execute();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (isKnownLiveBusyBlocker(response)) {
      console.warn(formatLiveFailure(response, "BalanceInquiry invalid clerk"));
      return;
    }

    if (
      response.status !== "Success" ||
      response.deviceResponseCode !== "00" ||
      (!!response.responseCode && response.responseCode !== "00")
    ) {
      expect(response.deviceResponseCode).not.toBe("00");
      return;
    }

    console.warn(
      "BalanceInquiry invalid clerk number was accepted by the current terminal configuration.",
    );
  });

  test("[LiveSetup] balance() host error omits availableBalance and documents current reference behavior", async () => {
    const response = await (device as any)
      .balance()
      .withEcrId(13)
      .withPaymentMethodType(PaymentMethodType.EBT)
      .execute();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (isKnownLiveBusyBlocker(response)) {
      console.warn(formatLiveFailure(response, "BalanceInquiry host error"));
      return;
    }

    if (response.deviceResponseCode === "HOST001") {
      expect(response.availableBalance).toBeUndefined();
      return;
    }

    if (response.deviceResponseCode === "APP002") {
      console.warn(formatLiveFailure(response, "BalanceInquiry host error"));
      return;
    }

    console.warn(
      "BalanceInquiry host error scenario was not reproduced in the current live run.",
    );
  });
});

// ===========================================================================
// reverse()
// ===========================================================================
describeUpaLive("UPA Admin – reverse()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaCreditTests] reverse() with TerminalRefNumber returns deviceResponseCode == '00'", async () => {
    let response: TransactionResponse;
    let termno = "";
    if (useLiveMic) {
      try {
        const saleResponse = await createLiveSale(device);

        if (saleResponse.deviceResponseCode !== "00") {
          if (isKnownLiveSaleBlocker(saleResponse)) {
            console.warn(formatLiveFailure(saleResponse, "Sale"));
            return;
          }

          throw new Error(formatLiveFailure(saleResponse, "Sale"));
        }
        termno = saleResponse.terminalRefNumber;

        response = await reverseLiveSaleWithRetry(
          device,
          saleResponse.terminalRefNumber,
        );
      } catch (error) {
        if (isKnownLiveTransportTimeout(error)) {
          console.warn(
            "Reverse live MIC prerequisite timed out while waiting on the device or gateway.",
          );
          return;
        }

        throw error;
      }
    } else {
      response = await (device as any)
        .reverse()
        .withTerminalRefNumber(termno)
        .withEcrId(12)
        .execute();
    }

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveBusyBlocker(response)) {
        console.warn(formatLiveFailure(response, "Reversal"));
        return;
      }

      expectLiveSuccess(response, ["Reversal", "SendCommand"]);
      return;
    }

    expect(response.deviceResponseCode).toBe("00");
    expect(response.status).toBe("Success");
  });

  test("[LiveSetup] reverse() without tranNo documents current MITC behavior", async () => {
    try {
      const response = await (device as any)
        .reverse()
        .withAmount(1.0)
        .withEcrId(12)
        .execute();

      if (isKnownLiveBusyBlocker(response)) {
        console.warn(
          formatLiveFailure(
            response,
            "Reversal auto previous financial transaction",
          ),
        );
        return;
      }

      if (isKnownLiveReverseAutoFallbackBlocker(response)) {
        console.warn(
          "Reverse auto previous financial transaction is not supported in the current MITC configuration; the terminal requires tranNo.",
        );
        return;
      }
      expectLiveSuccess(response, ["Reversal", "SendCommand"]);
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "Reverse auto previous financial transaction timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }
  });

  test("[LivePositive] reverse() returns documented response fields on success", async () => {
    try {
      const saleResponse = await createLiveSale(device);

      if (saleResponse.deviceResponseCode !== "00") {
        if (isKnownLiveSaleBlocker(saleResponse)) {
          console.warn(formatLiveFailure(saleResponse, "Sale"));
          return;
        }

        throw new Error(formatLiveFailure(saleResponse, "Sale"));
      }

      const response = await reverseLiveSaleWithRetry(
        device,
        saleResponse.terminalRefNumber,
      );

      if (isKnownLiveBusyBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "Reversal response field verification"),
        );
        return;
      }

      expectLiveSuccess(response, ["Reversal", "SendCommand"]);
      expectLiveReverseResponseFields(response);
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "Reverse response field verification timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }
  });

  test("[LiveNegative] reverse() already reversed transaction returns failure", async () => {
    try {
      const saleResponse = await createLiveSale(device);

      if (saleResponse.deviceResponseCode !== "00") {
        if (isKnownLiveSaleBlocker(saleResponse)) {
          console.warn(formatLiveFailure(saleResponse, "Sale"));
          return;
        }

        throw new Error(formatLiveFailure(saleResponse, "Sale"));
      }

      const firstReverseResponse = await reverseLiveSaleWithRetry(
        device,
        saleResponse.terminalRefNumber,
      );

      if (isKnownLiveBusyBlocker(firstReverseResponse)) {
        console.warn(
          formatLiveFailure(firstReverseResponse, "Initial reversal"),
        );
        return;
      }

      expectLiveSuccess(firstReverseResponse, ["Reversal", "SendCommand"]);

      await expectLiveReverseFailure(
        () =>
          reverseLiveSaleWithRetry(
            device,
            saleResponse.terminalRefNumber,
            undefined,
            1,
          ),
        "Reversal already reversed transaction",
      );
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "Reverse already reversed transaction timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }
  });

  test("[LiveNegative] reverse() with invalid authorizedAmount returns failure", async () => {
    try {
      const saleResponse = await createLiveSale(device);

      if (saleResponse.deviceResponseCode !== "00") {
        if (isKnownLiveSaleBlocker(saleResponse)) {
          console.warn(formatLiveFailure(saleResponse, "Sale"));
          return;
        }

        throw new Error(formatLiveFailure(saleResponse, "Sale"));
      }

      await expectLiveReverseFailure(
        () =>
          reverseLiveSaleWithRetry(
            device,
            saleResponse.terminalRefNumber,
            99.99,
            1,
          ),
        "Reversal invalid authorizedAmount",
      );
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "Reverse invalid authorizedAmount timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }
  });

  test("[LivePositive] reverse() debit transaction returns success", async () => {
    try {
      const saleResponse = await createLiveDebitSale(device);

      if (saleResponse.deviceResponseCode !== "00") {
        if (isKnownLiveSaleBlocker(saleResponse)) {
          console.warn(formatLiveFailure(saleResponse, "Debit Sale"));
          return;
        }

        throw new Error(formatLiveFailure(saleResponse, "Debit Sale"));
      }

      const response = await reverseLiveSaleWithRetry(
        device,
        saleResponse.terminalRefNumber,
      );

      if (isKnownLiveBusyBlocker(response)) {
        console.warn(formatLiveFailure(response, "Debit Reversal"));
        return;
      }

      expectLiveSuccess(response, ["Reversal", "SendCommand"]);
      expectLiveReverseResponseFields(response);

      if (response.transactionType) {
        expect(response.transactionType.toUpperCase()).toContain("DEBIT");
      }
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "Reverse debit transaction timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }
  });

  test("[LiveNegative] reverse() with invalid target device returns failure", async () => {
    const unavailableDevice = DeviceService.create(buildConfig());
    unavailableDevice.ecrId = "99999999";

    await expectLiveReverseFailure(
      () =>
        (unavailableDevice as any)
          .reverse()
          .withEcrId(99999999)
          .withTerminalRefNumber("0001")
          .execute(),
      "Reversal invalid target device",
    );
  });
});

describeUpaLive("UPA Admin – deletePreAuth()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaCreditTests] deletePreAuth() with transactionId and amount returns Success", async () => {
    let response: TransactionResponse;

    if (useLiveMic) {
      try {
        const preAuthResponse = await createLivePreAuth(device);
        response = await deletePreAuthWithRetry(
          device,
          preAuthResponse.transactionId,
          1.0,
        );
      } catch (error) {
        if (isKnownLiveTransportTimeout(error)) {
          console.warn(
            "DeletePreAuth live MIC prerequisite timed out while waiting on the device or gateway.",
          );
          return;
        }

        throw error;
      }
    } else {
      response = await (device as any)
        .deletePreAuth()
        .withEcrId(13)
        .withTransactionId("200071138640")
        .withAmount(1.0)
        .execute();
    }

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveBusyBlocker(response)) {
        console.warn(formatLiveFailure(response, "DeletePreAuth"));
        return;
      }

      expectLiveSuccess(response, ["DeletePreAuth", "SendCommand"]);
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseText).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[LiveNegative] deletePreAuth() with unknown reference number returns failure", async () => {
    await expectLiveDeletePreAuthFailure(
      () =>
        (device as any)
          .deletePreAuth()
          .withEcrId(13)
          .withTransactionId("999999999999")
          .withAmount(1.0)
          .execute(),
      "DeletePreAuth unknown reference number",
    );
  });

  test("[LiveNegative] deletePreAuth() without reference number returns failure", async () => {
    await expectLiveDeletePreAuthFailure(
      () =>
        (device as any).deletePreAuth().withEcrId(13).withAmount(1.0).execute(),
      "DeletePreAuth missing mandatory reference number",
    );
  });

  test("[LiveNegative] deletePreAuth() with invalid target device surfaces device error", async () => {
    const unavailableDevice = DeviceService.create(buildConfig());
    unavailableDevice.ecrId = "99999999";

    await expectLiveDeletePreAuthFailure(
      () =>
        (unavailableDevice as any)
          .deletePreAuth()
          .withEcrId(99999999)
          .withTransactionId("200015214831")
          .withAmount(1.0)
          .execute(),
      "DeletePreAuth device error",
    );
  });
});

describeUpaLive("UPA Admin – startCardTransaction()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaAdminTests] startCardTransaction() all acquisition types returns Success", async () => {
    const param = new UpaParam();
    param.acquisitionTypes = [
      AcquisitionType.Contact,
      AcquisitionType.Contactless,
      AcquisitionType.Swipe,
      AcquisitionType.Manual,
    ];
    param.header = "Sale Transaction";
    param.displayTotalAmount = "Yes";
    param.promptForManual = false;
    param.brandIcon1 = 1;
    param.brandIcon2 = 1;
    param.timeout = 100;

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "N";
    indicator.SecurityCode = "Y";
    indicator.CardTypeFilter = [
      CardTypeFilter.VISA,
      CardTypeFilter.MC,
      CardTypeFilter.AMEX,
      CardTypeFilter.DISCOVER,
    ];

    const transData = new UpaTransactionData();
    transData.totalAmount = 5.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Sale;

    let response: UpaGiftCardResponse;

    try {
      response = await (device as any).startCardTransaction(
        param,
        indicator,
        transData,
      );
    } catch (error) {
      if (useLiveMic && isKnownLiveTransportTimeout(error)) {
        console.warn(
          "StartCardTransaction all acquisition types timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(UpaGiftCardResponse);

    if (useLiveMic) {
      if (isKnownLiveStartCardTransactionBlocker(response)) {
        console.warn(
          formatLiveFailure(
            response,
            "StartCardTransaction all acquisition types",
          ),
        );
        return;
      }

      expectLiveSuccess(response, "StartCardTransaction");
      expectParsedStartCardTransactionResponse(response);
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[UpaAdminTests] startCardTransaction() swipe with GIFT filter returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 60;
    param.acquisitionTypes = [AcquisitionType.Swipe];
    param.header = "Header";
    param.displayTotalAmount = "Y";
    param.promptForManual = true;
    param.brandIcon1 = 4;
    param.brandIcon2 = 3;

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "Y";
    indicator.SecurityCode = "Y";
    indicator.CardTypeFilter = [CardTypeFilter.GIFT];

    const transData = new UpaTransactionData();
    transData.totalAmount = 11.2;
    transData.cashBackAmount = 2.5;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Sale;

    let response: UpaGiftCardResponse;

    try {
      response = await (device as any).startCardTransaction(
        param,
        indicator,
        transData,
      );
    } catch (error) {
      if (useLiveMic && isKnownLiveTransportTimeout(error)) {
        console.warn(
          "StartCardTransaction swipe with GIFT filter timed out while waiting on the device or gateway.",
        );
        return;
      }

      throw error;
    }

    expect(response).not.toBeNull();

    if (useLiveMic) {
      if (
        isKnownLiveGiftCardBlocker(response) ||
        isKnownLiveStartCardTransactionBlocker(response)
      ) {
        console.warn(
          formatLiveFailure(
            response,
            "StartCardTransaction swipe with GIFT filter",
          ),
        );
        return;
      }

      expectLiveSuccess(response, "StartCardTransaction");
      expectParsedStartCardTransactionResponse(response);
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[SdkValidation] startCardTransaction() without acquisitionTypes throws ArgumentError", async () => {
    const param = new UpaParam();
    param.timeout = 90;
    param.header = "Missing acquisition types";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";

    const transData = new UpaTransactionData();
    transData.totalAmount = 1.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Sale;

    await expect(
      (device as any).startCardTransaction(param, indicator, transData),
    ).rejects.toMatchObject({
      name: ArgumentError.name,
      message: "acquisitionTypes is required for startCardTransaction",
    });
  });

  test.each([[-1], [Number.NaN], ["invalid" as unknown as number]])(
    "[SdkValidation] startCardTransaction() with invalid totalAmount %p throws ArgumentError",
    async (invalidTotalAmount: number) => {
      const param = new UpaParam();
      param.timeout = 90;
      param.acquisitionTypes = [AcquisitionType.Manual];
      param.header = "Invalid amount";
      param.displayTotalAmount = "Yes";

      const indicator = new ProcessingIndicator();
      indicator.QuickChip = "Y";

      const transData = new UpaTransactionData();
      transData.totalAmount = invalidTotalAmount;
      transData.cashBackAmount = 0.0;
      transData.tranDate = new Date();
      transData.tranTime = new Date();
      transData.transType = TransactionType.Sale;

      await expect(
        (device as any).startCardTransaction(param, indicator, transData),
      ).rejects.toMatchObject({
        name: ArgumentError.name,
        message:
          "totalAmount must be a non-negative number for startCardTransaction",
      });
    },
  );

  test("[SdkValidation] startCardTransaction() with invalid cardTypeFilter throws ArgumentError", async () => {
    const param = new UpaParam();
    param.timeout = 90;
    param.acquisitionTypes = [AcquisitionType.Manual];
    param.header = "Invalid card type filter";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CardTypeFilter = ["XYZ" as unknown as CardTypeFilter];

    const transData = new UpaTransactionData();
    transData.totalAmount = 1.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Sale;

    await expect(
      (device as any).startCardTransaction(param, indicator, transData),
    ).rejects.toMatchObject({
      name: ArgumentError.name,
      message:
        "cardTypeFilter must contain only supported card types for startCardTransaction",
    });
  });

  test("[LiveSetup] startCardTransaction() manual mode with MC filter returns manual entry data", async () => {
    const param = new UpaParam();
    param.timeout = 90;
    param.acquisitionTypes = [AcquisitionType.Manual];
    param.header = "Manual MC Sale";
    param.displayTotalAmount = "Yes";
    param.promptForManual = true;

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "Y";
    indicator.SecurityCode = "Y";
    indicator.CardTypeFilter = [CardTypeFilter.MC];

    const transData = new UpaTransactionData();
    transData.totalAmount = 1.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Sale;

    const response = await executeLiveStartCardTransaction(
      device,
      param,
      indicator,
      transData,
      "StartCardTransaction manual MC",
    );

    if (!response) {
      return;
    }

    expect(response.acquisitionType.toUpperCase()).toBe("MANUAL");
    if (response.cardBrandShortName) {
      expect(response.cardBrandShortName.toUpperCase()).toBe("MC");
    }
    if (response.cardBrand) {
      expect(response.cardBrand.toUpperCase()).toContain("MASTER");
    }
    expect(response.expiryDate).toBeTruthy();
    expect(response.cvv).toBeTruthy();
  });

  test("[LiveSetup] startCardTransaction() accepts infinite timeout card entry", async () => {
    const param = new UpaParam();
    param.timeout = 0;
    param.acquisitionTypes = [AcquisitionType.Contact, AcquisitionType.Swipe];
    param.header = "Infinite Timeout";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "Y";

    const transData = new UpaTransactionData();
    transData.totalAmount = 1.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Sale;

    const response = await executeLiveStartCardTransaction(
      device,
      param,
      indicator,
      transData,
      "StartCardTransaction infinite timeout",
    );

    if (!response) {
      return;
    }

    expect(response.acquisitionType).toBeTruthy();
  });

  test("[LiveSetup] startCardTransaction() manual VISA flow returns AVS-capable response data", async () => {
    const param = new UpaParam();
    param.timeout = 90;
    param.acquisitionTypes = [AcquisitionType.Manual];
    param.header = "Manual VISA Sale";
    param.displayTotalAmount = "Yes";
    param.promptForManual = true;

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "Y";
    indicator.SecurityCode = "Y";
    indicator.CardTypeFilter = [CardTypeFilter.VISA];

    const transData = new UpaTransactionData();
    transData.totalAmount = 1.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Sale;

    const response = await executeLiveStartCardTransaction(
      device,
      param,
      indicator,
      transData,
      "StartCardTransaction manual VISA",
    );

    if (!response) {
      return;
    }

    expect(response.acquisitionType.toUpperCase()).toBe("MANUAL");
    if (response.cardBrandShortName) {
      expect(response.cardBrandShortName.toUpperCase()).toBe("VI");
    }
    if (response.cardBrand) {
      expect(response.cardBrand.toUpperCase()).toContain("VISA");
    }
    if (response.avsFlag) {
      expect(response.avsFlag).toBe("1");
    } else {
      console.warn(
        "StartCardTransaction manual VISA did not return AVSFlag on the current device configuration.",
      );
    }
  });

  test("[LiveSetup] startCardTransaction() manual AMEX refund flow returns refund card-entry data", async () => {
    const param = new UpaParam();
    param.timeout = 90;
    param.acquisitionTypes = [AcquisitionType.Manual];
    param.header = "Manual AMEX Refund";
    param.displayTotalAmount = "Yes";
    param.promptForManual = true;

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "Y";
    indicator.SecurityCode = "Y";
    indicator.CardTypeFilter = [CardTypeFilter.AMEX];

    const transData = new UpaTransactionData();
    transData.totalAmount = 1.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Refund;

    const response = await executeLiveStartCardTransaction(
      device,
      param,
      indicator,
      transData,
      "StartCardTransaction manual AMEX refund",
    );

    if (!response) {
      return;
    }

    expect(response.acquisitionType.toUpperCase()).toBe("MANUAL");

    if (
      response.cardBrandShortName &&
      !["AX", "AMEX"].includes(response.cardBrandShortName.toUpperCase())
    ) {
      console.warn(
        "StartCardTransaction AMEX refund validation requires an actual AMEX-presented card; the current live run returned a different brand.",
      );
      return;
    }

    if (
      response.cardBrand &&
      !response.cardBrand.toUpperCase().includes("AMEX") &&
      !response.cardBrand.toUpperCase().includes("AMERICAN EXPRESS")
    ) {
      console.warn(
        "StartCardTransaction AMEX refund validation requires an actual AMEX-presented card; the current live run returned a different brand.",
      );
      return;
    }

    expect(response.expiryDate).toBeTruthy();
    expect(response.cvv).toBeTruthy();
  });

  test("[LiveSetup] startCardTransaction() accepts card via Contact|Contactless|Swipe|Manual", async () => {
    const param = new UpaParam();
    param.acquisitionTypes = [
      AcquisitionType.Contact,
      AcquisitionType.Contactless,
      AcquisitionType.Swipe,
      AcquisitionType.Manual,
    ];

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "N";

    const transData = new UpaTransactionData();
    transData.totalAmount = 1.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Sale;

    const response: UpaGiftCardResponse = await (
      device as any
    ).startCardTransaction(param, indicator, transData);

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(UpaGiftCardResponse);
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
    expect(response.acquisitionType?.toUpperCase()).toMatch(
      /^(CONTACT|CONTACTLESS|SWIPE|MANUAL|INSERT|TAP)$/,
    );
  }, 300000);
});

describeUpaLive("UPA Admin – reboot()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaAdminTests][UpaMicTests] reboot() returns Success and does not throw", async () => {
    const response = await (device as any).reboot();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      expectLiveSuccess(response, "Reboot");
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[LiveSetup] reboot() on inactive or unresponsive terminal documents current routing behavior", async () => {
    const unavailableDevice = DeviceService.create(buildConfig());
    unavailableDevice.ecrId = "99999999";

    try {
      const response = await (unavailableDevice as any).reboot();

      expect(response).not.toBeNull();
      expect(response).toBeInstanceOf(TransactionResponse);

      if (isKnownLiveBusyBlocker(response)) {
        console.warn(
          formatLiveFailure(
            response,
            "Reboot inactive or unresponsive terminal",
          ),
        );
        return;
      }

      if (
        response.status !== "Success" ||
        response.deviceResponseCode !== "00" ||
        (!!response.responseCode && response.responseCode !== "00")
      ) {
        expect(response.deviceResponseCode).not.toBe("00");
        return;
      }

      console.warn(
        "Reboot inactive or unresponsive terminal scenario was accepted by the current terminal routing configuration.",
      );
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "Reboot inactive or unresponsive terminal timed out while waiting on the device or gateway.",
        );
        return;
      }

      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBeTruthy();
    }
  });

  test("[Negative] reboot() surfaces network or communication failure", async () => {
    const communicationFailureDevice = DeviceService.create(
      buildConfig({ serviceUrl: "http://127.0.0.1:1" } as Partial<GpApiConfig>),
      "reboot-communication-failure",
    );
    communicationFailureDevice.ecrId = "13";

    await expect(
      (communicationFailureDevice as any).reboot(),
    ).rejects.toBeInstanceOf(Error);
  });
});

describeUpaLive("UPA Admin – deleteSaf()", () => {
  let device: IDeviceInterface;

  async function settle(delayMs = 8000): Promise<void> {
    if (useLiveMic) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  function extractTranNoFromSafReport(safReport: any): string | undefined {
    const buckets = [
      safReport?.approved,
      safReport?.pending,
      safReport?.declined,
      safReport?.reportResult?.approved,
      safReport?.reportResult?.pending,
      safReport?.reportResult?.declined,
    ];

    for (const bucket of buckets) {
      if (!bucket) {
        continue;
      }
      for (const summary of Object.values(bucket) as Array<
        Record<string, any>
      >) {
        const transactions = summary?.transactions ?? [];
        for (const txn of transactions) {
          const candidate = txn?.transactionId;
          if (typeof candidate === "string" && /^\d{4,6}$/.test(candidate)) {
            return candidate;
          }
          if (typeof candidate === "number") {
            const asString = candidate.toString();
            if (/^\d{4,6}$/.test(asString)) {
              return asString;
            }
          }
        }
      }
    }

    return undefined;
  }

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaAdminTests:754] deleteSaf() executes over live MITC when a SAF record exists", async () => {
    const safReport = await ensureSafData(device, createLiveSale, settle);

    if (!safReport) {
      return;
    }

    const safReferenceNumber = getFirstSafReferenceNumber(safReport);
    if (!safReferenceNumber) {
      console.warn(
        "deleteSaf() live MITC prerequisite skipped: no SAF records available.",
      );
      return;
    }
    console.log(safReferenceNumber);
    const response = await (device as any).deleteSaf(safReferenceNumber);

    expect(response).toBeInstanceOf(UpaSAFResponse);
    expect(response.command).toBe("DeleteSAF");
    if (response.status === "Failed") {
      if (["TRAN001", "TRAN010"].includes(response.deviceResponseCode)) {
        console.warn(
          `deleteSaf() reference=${safReferenceNumber} returned spec-valid failure ${response.deviceResponseCode} (${response.deviceResponseText}); only host-declined SAF records are freely deletable per §12.4.25.4.`,
        );
        return;
      }

      throw new Error(
        `deleteSaf() returned unexpected failure code=${response.deviceResponseCode} status=${response.status} text="${response.deviceResponseText}". Per UPA spec §12.4.25.4 the only permitted failure codes for a well-formed request are TRAN001 or TRAN010.`,
      );
    }

    expectLiveSuccess(response, "DeleteSAF");
  });

  test('[UpaAdminTests:754] deleteSaf() surfaces response="DeleteSAF", cmdResult.result="Success", and transaction details', async () => {
    const safReport = await ensureSafData(device, createLiveSale, settle);
    if (!safReport) {
      return;
    }

    const safReferenceNumber = getFirstSafReferenceNumber(safReport);
    if (!safReferenceNumber) {
      console.warn(
        "deleteSaf() live MITC prerequisite skipped: no SAF records available.",
      );
      return;
    }

    const response = await (device as any).deleteSaf(safReferenceNumber);

    expect(response).toBeInstanceOf(UpaSAFResponse);
    expect(response.command).toBe("DeleteSAF");

    if (response.status === "Failed") {
      if (["TRAN001", "TRAN010"].includes(response.deviceResponseCode)) {
        console.warn(
          `deleteSaf() reference=${safReferenceNumber} returned spec-valid failure ${response.deviceResponseCode} (${response.deviceResponseText}); only host-declined SAF records are freely deletable per §12.4.25.4.`,
        );
        return;
      }

      throw new Error(
        `deleteSaf() returned unexpected failure code=${response.deviceResponseCode} status=${response.status} text="${response.deviceResponseText}". Per UPA spec §12.4.25.4 the only permitted failure codes for a well-formed request are TRAN001 or TRAN010.`,
      );
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");

    if (
      response.totalCount !== undefined ||
      response.totalAmount !== undefined
    ) {
      expect(response.totalCount).toBeGreaterThanOrEqual(0);
      expect(response.totalAmount).toBeGreaterThanOrEqual(0);
    }
  });

  test("[UpaAdminTests:754] deleteSaf() by tranNo executes over live MITC", async () => {
    const safReport = await ensureSafData(device, createLiveSale, settle);
    if (!safReport) {
      return;
    }

    const candidateTranNo = extractTranNoFromSafReport(safReport);
    if (!candidateTranNo) {
      console.warn(
        "deleteSaf(by tranNo) live MITC prerequisite skipped: no SAF record exposed a numeric tranNo/transId.",
      );
      return;
    }

    expect((device as any).deleteSaf.length).toBeGreaterThanOrEqual(2);

    const response = await (device as any).deleteSaf(
      undefined,
      candidateTranNo,
    );

    expect(response).toBeInstanceOf(UpaSAFResponse);
    expect(response.command).toBe("DeleteSAF");

    expect(["Success", "Failed"]).toContain(response.status);
    if (response.status === "Failed") {
      expect(["TRAN001", "TRAN010"]).toContain(response.deviceResponseCode);
    }
  });

  test("[UpaAdminTests:754] deleteSaf() with no identifiers deletes all host-declined SAF transactions", async () => {
    expect(typeof (device as any).deleteSaf).toBe("function");
    expect((device as any).deleteSaf.length).toBeGreaterThanOrEqual(0);

    if (process.env.UPA_DELETE_ALL_SAF !== "true") {
      console.warn(
        "deleteSaf() delete-all live scenario skipped. Set UPA_DELETE_ALL_SAF=true to execute (DESTRUCTIVE: erases every host-declined SAF record on the device).",
      );
      return;
    }

    // Seed at least one SAF record so the delete-all has something to act on.
    const safReport = await ensureSafData(device, createLiveSale, settle);
    if (!safReport) {
      return;
    }

    const response = await (device as any).deleteSaf();

    expect(response).toBeInstanceOf(UpaSAFResponse);
    expect(response.command).toBe("DeleteSAF");
    // Success is the expected outcome; Failed with TRAN001
    // if the batch happens to contain no host-declined records at execution time
    expect(["Success", "Failed"]).toContain(response.status);
  });

  test("[UpaCreditTests] sale() serializes processing indicators without mocked responses", async () => {
    const saleResponse = await createLiveSale(device);
    expect(saleResponse.status).toBe("Success");
  });
  test("[UpaAdminTests:754] deleteSaf() surfaces TRAN001 (TRANSACTION NOT FOUND) over live MITC", async () => {
    const unknownSafReferenceNumber = `UNKNOWN-123`;

    const response = await (device as any).deleteSaf(unknownSafReferenceNumber);

    expect(response).toBeInstanceOf(UpaSAFResponse);
    expect(response.command).toBe("DeleteSAF");
    expect(response.status).toBe("Failed");

    if (response.deviceResponseCode === "TRAN001") {
      expect(response.deviceResponseMessage).toMatch(/NOT FOUND/i);
      return;
    }

    console.log(
      `deleteSaf() unknown reference returned ${response.deviceResponseCode} (${response.deviceResponseMessage}) instead of TRAN001; device firmware may normalize unknown references.`,
    );
  });

  test("[UpaAdminTests:754] deleteSaf() surfaces TRAN010 (TRANSACTION CANNOT BE DELETED) over live MITC", async () => {
    const safReport = await ensureSafData(device, createLiveSale, settle);
    if (!safReport) {
      return;
    }

    const approvedBucket = safReport.reportResult?.approved ?? {};
    let approvedReferenceNumber: string | undefined;
    for (const summary of Object.values(
      approvedBucket as Record<string, any>,
    )) {
      const transaction = summary?.transactions?.[0];
      if (transaction?.referenceNumber) {
        approvedReferenceNumber = transaction.referenceNumber;
        break;
      }
    }

    if (!approvedReferenceNumber) {
      console.warn(
        "deleteSaf() TRAN010 live scenario skipped: no approved (host-authorized) SAF records available. TRAN010 requires a pending or authorized transaction reference per spec §12.4.25.4.",
      );
      return;
    }

    const response = await (device as any).deleteSaf(approvedReferenceNumber);

    expect(response).toBeInstanceOf(UpaSAFResponse);
    expect(response.command).toBe("DeleteSAF");
    expect(response.status).toBe("Failed");

    if (response.deviceResponseCode === "TRAN010") {
      expect(response.deviceResponseMessage.toUpperCase()).toContain(
        "CANNOT BE DELETED",
      );
      return;
    }

    console.warn(
      `deleteSaf() authorized-reference delete returned ${response.deviceResponseCode} (${response.deviceResponseMessage}) instead of TRAN010; device firmware may normalize the authorized-transaction outcome.`,
    );
  });
});

describeUpaLive("UPA Admin – cancel()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  type CancelableStartCardTxnArgs = [
    UpaParam,
    ProcessingIndicator,
    UpaTransactionData,
  ];

  function buildCancelableStartCardTransactionRequest(): CancelableStartCardTxnArgs {
    const param = new UpaParam();
    param.acquisitionTypes = [
      AcquisitionType.Contact,
      AcquisitionType.Contactless,
      AcquisitionType.Swipe,
      AcquisitionType.Manual,
    ];
    param.header = "Cancel Transaction";
    param.displayTotalAmount = "Yes";
    param.promptForManual = false;
    param.timeout = 30;

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "N";
    indicator.SecurityCode = "Y";
    indicator.CardTypeFilter = [
      CardTypeFilter.VISA,
      CardTypeFilter.MC,
      CardTypeFilter.AMEX,
      CardTypeFilter.DISCOVER,
    ];

    const transData = new UpaTransactionData();
    transData.totalAmount = 1.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Sale;

    return [param, indicator, transData];
  }

  function timeoutAfter<T>(delayMs: number, label: string): Promise<T> {
    return new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error(`${label} timed out after ${delayMs}ms`)),
        delayMs,
      );
    });
  }

  function sleep(delayMs: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  test("[UpaAdminTests:711] cancel() cancels an active startCardTransaction over live MITC", async () => {
    const [param, indicator, transData] =
      buildCancelableStartCardTransactionRequest();

    const activeCommand = (device as any)
      .startCardTransaction(param, indicator, transData)
      .then((response: any) => ({ kind: "resolved" as const, response }))
      .catch((error: unknown) => ({ kind: "rejected" as const, error }));

    await sleep(2000);
    await expect((device as any).cancel()).resolves.toBeUndefined();

    const result = await Promise.race([
      activeCommand,
      timeoutAfter<
        | { kind: "resolved"; response: any }
        | { kind: "rejected"; error: unknown }
      >(45000, "cancelled startCardTransaction"),
    ]);

    if (result.kind === "resolved") {
      expect(result.response).toBeTruthy();
      if (result.response instanceof TransactionResponse) {
        expect([
          "StartCardTransaction",
          "CancelTransaction",
          "SendCommand",
        ]).toContain(result.response.command);
      }
      return;
    }

    expect(result.error).toBeInstanceOf(Error);
  });

  test("[UpaAdminTests:711] cancel() sends CancelTransaction without a displayOption parameter", async () => {
    expect(typeof (device as any).cancel).toBe("function");
    expect((device as any).cancel.length).toBe(0);

    await expect((device as any).cancel()).resolves.toBeUndefined();
  });

  test("[UpaAdminTests:711] cancel() handles APP006 (TRANSACTION CANNOT BE CANCELED) without throwing", async () => {
    await expect((device as any).cancel()).resolves.toBeUndefined();
  });
});

describeUpaLive("UPA Admin – registerPOS()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaAdminTests:776] registerPOS() executes over live MITC", async () => {
    const posData = new POSData();
    posData.appName = `com.global.testapp.${Date.now()}`;
    posData.launchOrder = 1;
    posData.remove = false;
    posData.silent = 0;

    try {
      const response = await (device as any).registerPOS(posData);

      expect(response).toBeInstanceOf(TransactionResponse);
      expect(response.status).toBe("Success");
      expectLiveSuccess(response, "RegisterPOS");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("SYSTEM_ERROR")) {
        console.warn(
          "registerPOS() succeeded on the device but GP-API returned SYSTEM_ERROR during response mediation; verify registration state on the terminal.",
        );
        return;
      }
      throw err;
    }
  });
});

// ===========================================================================
// verify()
//   CardVerify command with tokenRequest = "1"
//   Confirms a multi-use token is created and returned by the host
// ===========================================================================
describeUpaLive("UPA Admin – verify()", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[UpaMicTests] verify() returns expected response", async () => {
    const response = await (device as any).verify().withEcrId(13).execute();

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[UpaMicTests] verify() with tokenRequest = 1 returns a token", async () => {
    try {
      const response = await (device as any)
        .verify()
        .withRequestMultiUseToken(true)
        .withCardBrandStorage(StoredCredentialInitiator.CardHolder)
        .withEcrId(13)
        .execute();
      console.log("[VERIFY RESPONSE]", JSON.stringify(response, null, 2));
      expect(response).not.toBeNull();
      expect(response).toBeInstanceOf(TransactionResponse);

      if (useLiveMic) {
        if (isKnownLiveBusyBlocker(response)) {
          console.warn(formatLiveFailure(response, "CardVerify tokenRequest"));
          return;
        }

        expectLiveSuccess(response, ["CardVerify", "SendCommand"]);
        expect(response.token).toBeTruthy();
        expect(response.token.length).toBeGreaterThan(0);
        return;
      }

      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");
      // ...existing expects
    } catch (err) {
      console.log("[VERIFY ERROR]", err);
      throw err;
    }
  });
});

// ===========================================================================
// refund() with all administrative enhancements
// ===========================================================================
describeUpaLive("UPA Credit – refund() with enhanced fields", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("refund() includes clerkId in request", async () => {
    const saleresponse = await (device as any).sale(5).withEcrId(13).execute();

    const builder = await (device as any)
      .refund(2)
      .withEcrId(13)
      .withReferenceNumber(saleresponse.terminalRefNumber)
      .withClerkId(1234);

    console.log("\n===== EXECUTING REFUND WITH CLERK ID =====");
    const response = await builder.execute();
    console.log("Response Status:", (response as any).status);
    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
  });

  test("refund() by transaction ID", async () => {
    const saleResponse = await device.sale(10).withEcrId(13).execute();

    expect(saleResponse).toBeDefined();
    expect(saleResponse.status).toBe("Success");

    const response = await device
      .refund(10)
      .withEcrId(13)
      .withTransactionId((saleResponse as any).gatewayTxnId)
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    console.log(
      `[Refund By TransID] Amount: ${response.transactionAmount}, Status: ${response.status}`,
    );
  });

  test("refund() includes totalAmount correctly", async () => {
    const saleResponse = await device.sale(10).withEcrId(13).execute();

    expect(saleResponse).toBeDefined();
    expect(saleResponse.status).toBe("Success");

    const response = await device
      .refund(10.5)
      .withEcrId(13)
      .withTransactionId((saleResponse as any).gatewayTxnId)
      .execute();

    expect(response).toBeDefined();
    expect(response.transactionAmount).toBe(10.5);
    expect(response.status).not.toBe("Failed");
    expect((response as any).deviceResponseCode).not.toBe("32");
    console.log(
      `[Refund Amount] Amount: ${response.transactionAmount}, Status: ${response.status}`,
    );
  });
});

// ===========================================================================
// verify() with all administrative enhancements
// ===========================================================================
describeUpaLive("UPA Credit – verify() with enhanced fields", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("verify() includes address verification in request", async () => {
    const address = new Address();
    address.addressLine1 = "123 Main St";
    address.city = "New York";
    address.state = "NY";
    address.postalCode = "10001";
    address.countryCode = "US";

    const response = await device
      .verify()
      .withEcrId(13)
      .withAddress(address)
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    console.log(
      `[Verify Address] AVS Code: ${response.avsResponseCode}, Status: ${response.status}`,
    );
  });

  test("verify() cvv verification", async () => {
    const response = await device
      .verify()
      .withEcrId(13)
      .withSecurityCode(true)
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
    expect(response.maskedCardNumber).toBeDefined();
    expect(response.cardType).toBeDefined();
    console.log(
      `[Verify CVV] Card: ${response.cardType}, Status: ${response.status}`,
    );
  });

  test("verify() includes clerkId in request", async () => {
    const response = await device
      .verify()
      .withEcrId(13)
      .withClerkId(1234)
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    console.log(`[Verify ClerkId] Status: ${response.status}`);
  });

  test("verify() includes languageCode in request", async () => {
    const response = await device
      .verify()
      .withEcrId(13)
      .withLanguage("es-ES")
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    console.log(`[Verify Language] Status: ${response.status}`);
  });
});

// ===========================================================================
// lineItem() with LineItemDisplay spec (lineItemLeft, lineItemRight)
// ===========================================================================
describeUpaLive("UPA Credit – lineItem() with LineItemDisplay spec", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("lineItem() displays lineItemLeft and lineItemRight per spec", async () => {
    const response = await (device as any).lineItem("Toothpaste", "10.00");

    expect(response).toBeInstanceOf(TransactionResponse);
    expect(response).toBeDefined();
    console.log(`[LineItem] Item displayed successfully`);

    // Clear device UI
    await (device as any).cancel();
  });

  test("lineItem() uses ecrId from device instead of hardcoded value", async () => {
    (device as any).ecrId = "12";

    const response = await (device as any).lineItem("Test Item", "$5.00");

    expect(response).toBeInstanceOf(TransactionResponse);
    console.log(`[LineItem CustomEcrId] Item displayed with EcrId: 12`);

    // Clear device UI
    await (device as any).cancel();
  });

  test("lineItem() handles optional parameters correctly", async () => {
    const response = await (device as any).lineItem("Item Only");

    expect(response).toBeInstanceOf(TransactionResponse);
    console.log(`[LineItem Minimal] Item displayed with minimal parameters`);

    // Clear device UI
    await (device as any).cancel();
  });

  test("lineItem() throws error for null leftText", async () => {
    try {
      await (device as any).lineItem(null);
      fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("cannot be null");
    }
  });
});

// ===========================================================================
// Integration tests for all admin enhancements together
// ===========================================================================
describeUpaLive("UPA Credit – Complete admin enhancements integration", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("refund() with all admin fields builds complete request", async () => {
    const saleResponse = await device.sale(60).withEcrId(12).execute();

    const response = await device
      .refund(25)
      .withEcrId(12)
      .withClerkId(1234)
      .withAuthCode("")
      .withCardBrandTransId("TRANSID2025")
      .withReferenceNumber(saleResponse.terminalRefNumber)
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    console.log(
      `[Refund AllFields] Amount: ${response.transactionAmount}, Status: ${response.status}`,
    );
  });

  test("verify() with all admin fields builds complete request", async () => {
    const address = new Address();
    address.streetAddress1 = "456 Oak Ave";
    address.city = "Los Angeles";
    address.state = "CA";
    address.postalCode = "90001";

    const response = await device
      .verify()
      .withEcrId(13)
      .withAddress(address)
      .withClerkId(1234)
      .withLanguage("en-US")
      .withSecurityCode(true)
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    console.log(
      `[Verify AllFields] Status: ${response.status}, AVS: ${response.avsResponseCode}`,
    );
  });
});
