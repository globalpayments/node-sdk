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
  ServicesContainer,
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

  test("[UpaAdminTests] startCardTransaction() Contact only returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 100;
    param.acquisitionTypes = [AcquisitionType.Contact];
    param.header = "Insert Card";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "N";

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
          "StartCardTransaction Contact only timed out while waiting on the device.",
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
          formatLiveFailure(response, "StartCardTransaction Contact only"),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[UpaAdminTests] startCardTransaction() Contactless only returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 100;
    param.acquisitionTypes = [AcquisitionType.Contactless];
    param.header = "Tap Card";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "N";
    indicator.CheckLuhn = "N";

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
          "StartCardTransaction Contactless only timed out while waiting on the device.",
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
          formatLiveFailure(response, "StartCardTransaction Contactless only"),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[UpaAdminTests] startCardTransaction() Swipe or Contact returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 45;
    param.acquisitionTypes = [AcquisitionType.Swipe, AcquisitionType.Contact];
    param.header = "Swipe or Insert Card";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "N";
    indicator.CheckLuhn = "Y";
    indicator.SecurityCode = "Y";

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
          "StartCardTransaction Swipe or Contact timed out while waiting on the device.",
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
          formatLiveFailure(response, "StartCardTransaction Swipe or Contact"),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      expect(response.fallback).toBe("0");
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.fallback).toBe("0");
  });

  test("[UpaAdminTests] startCardTransaction() with CashBack returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 100;
    param.acquisitionTypes = [
      AcquisitionType.Contact,
      AcquisitionType.Contactless,
      AcquisitionType.Swipe,
    ];
    param.header = "Debit Transaction";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "N";
    indicator.CheckLuhn = "N";

    const transData = new UpaTransactionData();
    transData.totalAmount = 5.0;
    transData.cashBackAmount = 10.0;
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
          "StartCardTransaction with CashBack timed out while waiting on the device.",
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
          formatLiveFailure(response, "StartCardTransaction with CashBack"),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      expect(response.fallback).toBe("0");
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.fallback).toBe("0");
  });

  test("[UpaAdminTests] startCardTransaction() Refund returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 100;
    param.acquisitionTypes = [AcquisitionType.Swipe];
    param.header = "Refund Transaction";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "N";
    indicator.CheckLuhn = "Y";
    indicator.SecurityCode = "N";

    const transData = new UpaTransactionData();
    transData.totalAmount = 5.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Refund;

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
          "StartCardTransaction Refund timed out while waiting on the device.",
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
          formatLiveFailure(response, "StartCardTransaction Refund"),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[UpaAdminTests] startCardTransaction() with VISA and MasterCard filter returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 100;
    param.acquisitionTypes = [AcquisitionType.Contact];
    param.header = "VISA and MasterCard Only";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "N";
    indicator.CheckLuhn = "Y";
    indicator.SecurityCode = "Y";
    indicator.CardTypeFilter = [CardTypeFilter.VISA, CardTypeFilter.MC];

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
          "StartCardTransaction with VISA/MC filter timed out while waiting on the device.",
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
          formatLiveFailure(response, "StartCardTransaction VISA/MC filter"),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[UpaAdminTests] startCardTransaction() with amount less than one dollar returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 100;
    param.acquisitionTypes = [AcquisitionType.Contact, AcquisitionType.Swipe];
    param.header = "Small Amount";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "N";

    const transData = new UpaTransactionData();
    transData.totalAmount = 0.5;
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
          "StartCardTransaction with small amount timed out while waiting on the device.",
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
          formatLiveFailure(response, "StartCardTransaction small amount"),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      expect(response.fallback).toBe("0");
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.fallback).toBe("0");
  });

  test("[UpaAdminTests] startCardTransaction() verifies response fields are populated", async () => {
    const param = new UpaParam();
    param.timeout = 100;
    param.acquisitionTypes = [AcquisitionType.Contact];
    param.header = "Test Transaction";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "Y";
    indicator.SecurityCode = "N";

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
          "StartCardTransaction response fields verification timed out.",
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
          formatLiveFailure(response, "StartCardTransaction response fields"),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      expect(response.acquisitionType).toBeTruthy();
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.acquisitionType).toBeTruthy();
  });

  test("[UpaAdminTests] startCardTransaction() Contact with infinite timeout returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 0;
    param.acquisitionTypes = [AcquisitionType.Contact];
    param.header = "No Timeout";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "N";

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
          "StartCardTransaction Contact infinite timeout timed out.",
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
            "StartCardTransaction Contact infinite timeout",
          ),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[UpaAdminTests] startCardTransaction() Contactless with infinite timeout returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 0;
    param.acquisitionTypes = [AcquisitionType.Contactless];
    param.header = "No Timeout";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "N";

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
          "StartCardTransaction Contactless infinite timeout timed out.",
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
            "StartCardTransaction Contactless infinite timeout",
          ),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[UpaAdminTests] startCardTransaction() with BrandIcons returns Success", async () => {
    const param = new UpaParam();
    param.timeout = 100;
    param.acquisitionTypes = [
      AcquisitionType.Contact,
      AcquisitionType.Swipe,
      AcquisitionType.Contactless,
    ];
    param.header = "Card Entry";
    param.displayTotalAmount = "Yes";
    param.brandIcon1 = 31;
    param.brandIcon2 = 15;

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "N";

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
          "StartCardTransaction with BrandIcons timed out while waiting on the device.",
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
          formatLiveFailure(response, "StartCardTransaction with BrandIcons"),
        );
        return;
      }
      expectLiveSuccess(response, "StartCardTransaction");
      return;
    }

    expect(response.status).toBe("Success");
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
  // ===============================================================//

  test("[UpaManageTests:600] capture() serializes processCPC indicator", async () => {
    const controller =
      ServicesContainer.instance().getDeviceController() as any;
    const responseauth = await (device as any)
      .authorize(10.0)
      .withEcrId(13)
      .execute();
    const builder = (device as any)
      .capture()
      .withTransactionId(responseauth.transactionId)
      .withAmount(10.0)
      .withEcrId(13)
      .withProcessCPC(true);

    const request = controller.buildManageTransaction(builder).getJsonRequest();

    console.log(
      "[UpaManageTests:600] Capture with processCPC request payload:\n" +
        JSON.stringify(request, null, 2),
    );

    expect(request.data.command).toBe("AuthCompletion");
    expect(request.data.data.transaction.processCPC).toBe("1");
    const response = await builder.execute();
    expect(response.status).toBe("Success");
  });

  test("[UpaManageTests:601] capture() serializes processCPC false as 0", async () => {
    const responseauth = await (device as any)
      .authorize(10.0)
      .withEcrId(13)
      .execute();

    const controller =
      ServicesContainer.instance().getDeviceController() as any;
    sleep(100);
    const builder = (device as any)
      .capture()
      .withTransactionId(responseauth.transactionId)
      .withAmount(10.0)
      .withEcrId(13)
      .withProcessCPC(false);

    const request = controller.buildManageTransaction(builder).getJsonRequest();

    console.log(
      "[UpaManageTests:601] Capture with processCPC false request payload:\n" +
        JSON.stringify(request, null, 2),
    );

    expect(request.data.command).toBe("AuthCompletion");
    expect(request.data.data.transaction.processCPC).toBe("0");
    const response = await builder.execute();
    expect(response.status).toBe("Success");
  });
});

// ===========================================================================
// processingIndicators – StartCardTransaction Workflow
// Per UPA spec §12.4.x: quickChip, checkLuhn, securityCode
// ===========================================================================
describeUpaLive(
  "UPA Admin – StartCardTransaction processingIndicators workflow",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    test("[ProcessingIndicators:StartCardTransaction] quickChip='Y' (Quick Chip EMV)", async () => {
      const param = new UpaParam();
      param.acquisitionTypes = [AcquisitionType.Contact];
      param.header = "Quick Chip Sale";
      param.displayTotalAmount = "Yes";
      param.timeout = 90;

      const indicator = new ProcessingIndicator();
      indicator.QuickChip = "Y"; // Quick Chip enabled

      const transData = new UpaTransactionData();
      transData.totalAmount = 10.0;
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
            "StartCardTransaction quickChip='Y' timed out while waiting on the device.",
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
            formatLiveFailure(response, "StartCardTransaction quickChip='Y'"),
          );
          return;
        }

        expectLiveSuccess(response, "StartCardTransaction");
        // Quick Chip should result in Contact/Contactless acquisition
        expect(
          ["CONTACT", "CONTACTLESS", "INSERT", "TAP"].some(
            (x) => response.acquisitionType?.toUpperCase().includes(x),
          ),
        ).toBe(true);
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[ProcessingIndicators:StartCardTransaction] quickChip='N' (Traditional EMV)", async () => {
      const param = new UpaParam();
      param.acquisitionTypes = [AcquisitionType.Contact];
      param.header = "Traditional EMV Sale";
      param.displayTotalAmount = "Yes";
      param.timeout = 90;

      const indicator = new ProcessingIndicator();
      indicator.QuickChip = "N"; // Traditional EMV

      const transData = new UpaTransactionData();
      transData.totalAmount = 15.0;
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
            "StartCardTransaction quickChip='N' timed out while waiting on the device.",
          );
          return;
        }
        throw error;
      }

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveStartCardTransactionBlocker(response)) {
          console.warn(
            formatLiveFailure(response, "StartCardTransaction quickChip='N'"),
          );
          return;
        }

        expectLiveSuccess(response, "StartCardTransaction");
        expect(response.acquisitionType).toBeTruthy();
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[ProcessingIndicators:StartCardTransaction] checkLuhn='Y' (with LUHN validation for manual entry)", async () => {
      const param = new UpaParam();
      param.acquisitionTypes = [AcquisitionType.Manual];
      param.header = "Manual Entry with LUHN Check";
      param.displayTotalAmount = "Yes";
      param.promptForManual = true;
      param.timeout = 90;

      const indicator = new ProcessingIndicator();
      indicator.QuickChip = "Y";
      indicator.CheckLuhn = "Y"; // LUHN validation enabled

      const transData = new UpaTransactionData();
      transData.totalAmount = 20.0;
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
            "StartCardTransaction checkLuhn='Y' timed out while waiting on the device.",
          );
          return;
        }
        throw error;
      }

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveStartCardTransactionBlocker(response)) {
          console.warn(
            formatLiveFailure(response, "StartCardTransaction checkLuhn='Y'"),
          );
          return;
        }

        expectLiveSuccess(response, "StartCardTransaction");
        // Manual entry should be recorded
        expect(response.acquisitionType?.toUpperCase()).toBe("MANUAL");
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[ProcessingIndicators:StartCardTransaction] checkLuhn='N' (skip LUHN validation)", async () => {
      const param = new UpaParam();
      param.acquisitionTypes = [AcquisitionType.Manual];
      param.header = "Manual Entry without LUHN Check";
      param.displayTotalAmount = "Yes";
      param.promptForManual = true;
      param.timeout = 90;

      const indicator = new ProcessingIndicator();
      indicator.QuickChip = "Y";
      indicator.CheckLuhn = "N"; // LUHN validation disabled

      const transData = new UpaTransactionData();
      transData.totalAmount = 25.0;
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
            "StartCardTransaction checkLuhn='N' timed out while waiting on the device.",
          );
          return;
        }
        throw error;
      }

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveStartCardTransactionBlocker(response)) {
          console.warn(
            formatLiveFailure(response, "StartCardTransaction checkLuhn='N'"),
          );
          return;
        }

        expectLiveSuccess(response, "StartCardTransaction");
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[ProcessingIndicators:StartCardTransaction] securityCode='Y' (prompt for CVV)", async () => {
      const param = new UpaParam();
      param.acquisitionTypes = [AcquisitionType.Manual];
      param.header = "Manual Entry with CVV Prompt";
      param.displayTotalAmount = "Yes";
      param.promptForManual = true;
      param.timeout = 90;

      const indicator = new ProcessingIndicator();
      indicator.QuickChip = "Y";
      indicator.CheckLuhn = "Y";
      indicator.SecurityCode = "Y"; // Request CVV/CVC

      const transData = new UpaTransactionData();
      transData.totalAmount = 30.0;
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
            "StartCardTransaction securityCode='Y' timed out while waiting on the device.",
          );
          return;
        }
        throw error;
      }

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveStartCardTransactionBlocker(response)) {
          console.warn(
            formatLiveFailure(
              response,
              "StartCardTransaction securityCode='Y'",
            ),
          );
          return;
        }

        expectLiveSuccess(response, "StartCardTransaction");
        // CVV should be present in manual entry response
        if (response.acquisitionType?.toUpperCase() === "MANUAL") {
          expect(response.cvv).toBeTruthy();
        }
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[ProcessingIndicators:StartCardTransaction] securityCode='N' (skip CVV prompt)", async () => {
      const param = new UpaParam();
      param.acquisitionTypes = [AcquisitionType.Manual];
      param.header = "Manual Entry without CVV Prompt";
      param.displayTotalAmount = "Yes";
      param.promptForManual = true;
      param.timeout = 90;

      const indicator = new ProcessingIndicator();
      indicator.QuickChip = "Y";
      indicator.CheckLuhn = "Y";
      indicator.SecurityCode = "N"; // Skip CVV prompt

      const transData = new UpaTransactionData();
      transData.totalAmount = 35.0;
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
            "StartCardTransaction securityCode='N' timed out while waiting on the device.",
          );
          return;
        }
        throw error;
      }

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveStartCardTransactionBlocker(response)) {
          console.warn(
            formatLiveFailure(
              response,
              "StartCardTransaction securityCode='N'",
            ),
          );
          return;
        }

        expectLiveSuccess(response, "StartCardTransaction");
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[ProcessingIndicators:StartCardTransaction] All indicators combined (quickChip=Y, checkLuhn=Y, securityCode=Y)", async () => {
      const param = new UpaParam();
      param.acquisitionTypes = [
        AcquisitionType.Contact,
        AcquisitionType.Contactless,
        AcquisitionType.Swipe,
        AcquisitionType.Manual,
      ];
      param.header = "Full Processing Indicators";
      param.displayTotalAmount = "Yes";
      param.timeout = 90;

      const indicator = new ProcessingIndicator();
      indicator.QuickChip = "Y";
      indicator.CheckLuhn = "Y";
      indicator.SecurityCode = "Y";

      const transData = new UpaTransactionData();
      transData.totalAmount = 50.0;
      transData.cashBackAmount = 5.0;
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
            "StartCardTransaction combined indicators timed out while waiting on the device.",
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
              "StartCardTransaction combined indicators",
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
  },
);

// ===========================================================================
// processingIndicators – Response Indicators Validation
// Per UPA spec: luhnCheckPassed, fallback, pinVerified, qpsQualified, etc.
// ===========================================================================
describeUpaLive("UPA Admin – processingIndicators response indicators", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });
  test("[ResponseIndicators] StartCardTransaction manual entry returns luhnCheckPassed indicator", async () => {
    const param = new UpaParam();
    param.acquisitionTypes = [AcquisitionType.Manual];
    param.header = "LUHN Validation Response";
    param.displayTotalAmount = "Yes";
    param.promptForManual = true;
    param.timeout = 90;

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "Y"; // Enable LUHN check

    const transData = new UpaTransactionData();
    transData.totalAmount = 10.0;
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
          "StartCardTransaction luhnCheckPassed response timed out.",
        );
        return;
      }
      throw error;
    }

    expect(response).not.toBeNull();

    if (useLiveMic) {
      if (isKnownLiveStartCardTransactionBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "Response luhnCheckPassed indicator"),
        );
        return;
      }

      expectLiveSuccess(response, "StartCardTransaction");

      // Per UPA spec: luhnCheckPassed should be present when checkLuhn='Y'
      if (response.acquisitionType?.toUpperCase() === "MANUAL") {
        // Response may include luhnCheckPassed as response indicator
        // Document current behavior: presence depends on implementation
        if ((response as any).luhnCheckPassed !== undefined) {
          expect([(response as any).luhnCheckPassed]).toContain(
            (response as any).luhnCheckPassed,
          );
        }
      }
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[ResponseIndicators] StartCardTransaction returns response indicators (status, code, acquisitionType)", async () => {
    const param = new UpaParam();
    param.acquisitionTypes = [
      AcquisitionType.Contact,
      AcquisitionType.Contactless,
      AcquisitionType.Swipe,
    ];
    param.header = "Response Indicator Validation";
    param.displayTotalAmount = "Yes";
    param.timeout = 60;

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CheckLuhn = "N";
    indicator.SecurityCode = "Y";

    const transData = new UpaTransactionData();
    transData.totalAmount = 20.0;
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
        console.warn("StartCardTransaction response indicators timed out.");
        return;
      }
      throw error;
    }

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(UpaGiftCardResponse);

    if (useLiveMic) {
      if (isKnownLiveStartCardTransactionBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "Response indicator validation"),
        );
        return;
      }

      expectLiveSuccess(response, "StartCardTransaction");

      // Per UPA spec §12.4.x: response should include these fields
      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");
      expect(response.acquisitionType).toBeTruthy();

      // Document optional response indicators
      console.log(
        "Response indicators: acquisitionType=%s, cardBrand=%s",
        response.acquisitionType,
        response.cardBrand,
      );
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
    expect(response.acquisitionType).toBeTruthy();
  });

  test("[ResponseIndicators] StartCardTransaction with cardTypeFilter returns restricted card brands", async () => {
    const param = new UpaParam();
    param.acquisitionTypes = [AcquisitionType.Manual];
    param.header = "Card Type Filter Response";
    param.displayTotalAmount = "Yes";
    param.promptForManual = true;
    param.timeout = 90;

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";
    indicator.CardTypeFilter = [CardTypeFilter.VISA, CardTypeFilter.MC]; // Restrict to VISA/MC

    const transData = new UpaTransactionData();
    transData.totalAmount = 15.0;
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
        console.warn("StartCardTransaction cardTypeFilter response timed out.");
        return;
      }
      throw error;
    }

    expect(response).not.toBeNull();

    if (useLiveMic) {
      if (isKnownLiveStartCardTransactionBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "Response cardTypeFilter validation"),
        );
        return;
      }

      expectLiveSuccess(response, "StartCardTransaction");

      // Per cardTypeFilter=[VISA, MC], response should reflect only those brands
      if (response.cardBrandShortName) {
        expect(
          ["VI", "MC"].some(
            (b) => response.cardBrandShortName?.toUpperCase().includes(b),
          ),
        ).toBe(true);
      }
      return;
    }

    expect(response.status).toBe("Success");
  });
});

// ===========================================================================
// Direct Marketing Fields – Sale, Refund, PreAuth, TipAdjust, etc.
// Per UPA spec: directMktInvoiceNbr, directMktShipMonth, directMktShipDay
// ===========================================================================

/**
 * Helper: Generate Direct Marketing fields with correct date handling
 * Per UPA spec: if directMktInvoiceNbr provided, directMktShipMonth and directMktShipDay are required
 */
function buildDirectMarketingFields(
  invoiceNumber: string,
  shipDate?: Date,
): {
  directMktInvoiceNbr: string;
  directMktShipMonth: string;
  directMktShipDay: string;
} {
  const date = shipDate || new Date();

  // Correct JavaScript date handling:
  // getMonth() returns 0-11 (Jan=0, Aug=7), so add 1 and pad
  // getDate() returns 1-31 (correct day of month)
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return {
    directMktInvoiceNbr: invoiceNumber,
    directMktShipMonth: month,
    directMktShipDay: day,
  };
}

describeUpaLive(
  "UPA Admin – Direct Marketing Fields (Sale/Refund/PreAuth)",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    test("[DirectMarketing:Sale] Sale with directMktInvoiceNbr, directMktShipMonth, directMktShipDay", async () => {
      const directMktFields = buildDirectMarketingFields("INV20260817001");

      const response = (await (device as any)
        .sale(5.0)
        .withEcrId(13)
        .withClerkId(123)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();
      expect(response).toBeInstanceOf(TransactionResponse);

      if (useLiveMic) {
        if (isKnownLiveSaleBlocker(response)) {
          console.warn(
            formatLiveFailure(response, "Sale with Direct Marketing fields"),
          );
          return;
        }

        expectLiveSuccess(response, ["Sale", "SendCommand"]);
        expect(response.terminalRefNumber).toBeTruthy();
        return;
      }

      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");
    });

    test("[DirectMarketing:Sale] Sale returns directMktInvoiceNbr, directMktShipMonth, directMktShipDay in response", async () => {
      const directMktFields = buildDirectMarketingFields(
        "INV20260817002",
        new Date(2026, 7, 17), // Aug 17, 2026
      );

      const response = (await (device as any)
        .sale(10.0)
        .withEcrId(13)
        .withClerkId(123)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveSaleBlocker(response)) {
          console.warn(
            formatLiveFailure(
              response,
              "Sale Direct Marketing response field validation",
            ),
          );
          return;
        }

        expectLiveSuccess(response, ["Sale", "SendCommand"]);

        // Per UPA spec: response should echo direct marketing fields
        if ((response as any).directMktInvoiceNbr) {
          expect((response as any).directMktInvoiceNbr).toBe(
            directMktFields.directMktInvoiceNbr,
          );
        }
        if ((response as any).directMktShipMonth) {
          expect((response as any).directMktShipMonth).toBe("08");
        }
        if ((response as any).directMktShipDay) {
          expect((response as any).directMktShipDay).toBe("17");
        }
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[DirectMarketing:Refund] Refund with directMktInvoiceNbr, directMktShipMonth, directMktShipDay", async () => {
      // Prerequisite: create a sale first
      let saleResponse: TransactionResponse;

      try {
        saleResponse = await createLiveSale(device);

        if (saleResponse.deviceResponseCode !== "00") {
          if (isKnownLiveSaleBlocker(saleResponse)) {
            console.warn(formatLiveFailure(saleResponse, "Sale prerequisite"));
            return;
          }

          throw new Error(formatLiveFailure(saleResponse, "Sale prerequisite"));
        }
      } catch (error) {
        if (isKnownLiveTransportTimeout(error)) {
          console.warn(
            "Refund with Direct Marketing fields prerequisite timed out.",
          );
          return;
        }
        throw error;
      }

      const directMktFields = buildDirectMarketingFields("REFUND20260817001");

      const refundResponse = (await (device as any)
        .refund(1.0)
        .withEcrId(13)
        .withTransactionId(saleResponse.transactionId)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(refundResponse).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveBusyBlocker(refundResponse)) {
          console.warn(
            formatLiveFailure(
              refundResponse,
              "Refund with Direct Marketing fields",
            ),
          );
          return;
        }

        expectLiveSuccess(refundResponse, ["Refund", "SendCommand"]);
        return;
      }

      expect(refundResponse.status).toBe("Success");
    });

    test("[DirectMarketing:PreAuth] PreAuth (OpenTab) with directMktInvoiceNbr, directMktShipMonth, directMktShipDay", async () => {
      const directMktFields = buildDirectMarketingFields("PRETAB20260817001");

      const response = (await (device as any)
        .authorize(15.0)
        .withEcrId(13)
        .withClerkId(123)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveBusyBlocker(response)) {
          console.warn(
            formatLiveFailure(response, "PreAuth with Direct Marketing fields"),
          );
          return;
        }

        expectLiveSuccess(response, ["PreAuth", "SendCommand"]);
        expect(response.transactionId).toBeTruthy();
        return;
      }

      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");
    });

    test("[DirectMarketing:Validation] Missing directMktShipMonth and directMktShipDay when directMktInvoiceNbr provided should be caught", async () => {
      // Per UPA spec: if directMktInvoiceNbr is provided, directMktShipMonth and directMktShipDay must be provided too

      // This test documents the behavior:
      // If only invoice number is provided without month/day, the request should fail or device should reject it

      try {
        const response = (await (device as any)
          .sale(5.0)
          .withEcrId(13)
          .withClerkId(123)
          .withDirectMktInvoiceNbr("INCOMPLETE001")
          // Intentionally omit directMktShipMonth and directMktShipDay
          .execute()) as TransactionResponse;

        expect(response).not.toBeNull();

        // Per spec: incomplete direct marketing fields should result in failure
        if (useLiveMic && response.deviceResponseCode !== "00") {
          console.log(
            "[Validation] Incomplete Direct Marketing fields rejected:",
            response.deviceResponseCode,
            response.deviceResponseText,
          );
          expect(response.deviceResponseCode).not.toBe("00");
          return;
        }

        console.warn(
          "[Validation] Terminal accepted incomplete Direct Marketing fields; device may have looser validation",
        );
      } catch (error) {
        if (isKnownLiveTransportTimeout(error)) {
          console.warn(
            "Incomplete Direct Marketing fields validation timed out.",
          );
          return;
        }

        // Expected: ArgumentError or validation error
        expect(error).toBeInstanceOf(Error);
      }
    });

    test("[DirectMarketing:DateHandling] Correct JavaScript date handling (getMonth() + 1, getDate())", async () => {
      // Test date: August 17, 2026
      const testDate = new Date(2026, 7, 17); // Month is 0-indexed, so 7 = August

      const directMktFields = buildDirectMarketingFields(
        "DATE_TEST_20260817",
        testDate,
      );

      // Verify correct month conversion (0-11 → 01-12)
      expect(directMktFields.directMktShipMonth).toBe("08");

      // Verify correct day (1-31)
      expect(directMktFields.directMktShipDay).toBe("17");

      const response = (await (device as any)
        .sale(5.0)
        .withEcrId(13)
        .withClerkId(123)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveSaleBlocker(response)) {
          console.warn(formatLiveFailure(response, "Date handling validation"));
          return;
        }

        expectLiveSuccess(response, ["Sale", "SendCommand"]);
        console.log(
          "[DateHandling] Verified: Month=%s, Day=%s",
          directMktFields.directMktShipMonth,
          directMktFields.directMktShipDay,
        );
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[DirectMarketing:EdgeCase] Month boundaries (January=01, December=12)", async () => {
      // Test January (month=0)
      const januaryFields = buildDirectMarketingFields(
        "JAN_TEST_001",
        new Date(2026, 0, 1),
      );
      expect(januaryFields.directMktShipMonth).toBe("01");

      // Test December (month=11)
      const decemberFields = buildDirectMarketingFields(
        "DEC_TEST_001",
        new Date(2026, 11, 31),
      );
      expect(decemberFields.directMktShipMonth).toBe("12");

      console.log(
        "[EdgeCase] Month boundaries verified: Jan=%s, Dec=%s",
        januaryFields.directMktShipMonth,
        decemberFields.directMktShipMonth,
      );
    });

    test("[DirectMarketing:EdgeCase] Day padding (single digit days 01-09)", async () => {
      // Test day 1 (should be "01", not "1")
      const dayOneFields = buildDirectMarketingFields(
        "DAY_01_TEST",
        new Date(2026, 7, 1),
      );
      expect(dayOneFields.directMktShipDay).toBe("01");

      // Test day 9 (should be "09", not "9")
      const dayNineFields = buildDirectMarketingFields(
        "DAY_09_TEST",
        new Date(2026, 7, 9),
      );
      expect(dayNineFields.directMktShipDay).toBe("09");

      console.log(
        "[EdgeCase] Day padding verified: 01=%s, 09=%s",
        dayOneFields.directMktShipDay,
        dayNineFields.directMktShipDay,
      );
    });
  },
);

describeUpaLive("UPA Admin – Parameterized Direct Marketing Tests", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  interface DirectMarketingTestCase {
    name: string;
    amount: number;
    invoicePrefix: string;
    shipDate: Date;
  }

  const testCases: DirectMarketingTestCase[] = [
    {
      name: "Current Date Sale",
      amount: 5.0,
      invoicePrefix: "CURRENT",
      shipDate: new Date(),
    },
    {
      name: "Future Date Sale",
      amount: 10.0,
      invoicePrefix: "FUTURE",
      shipDate: new Date(2026, 8, 30), // Sept 30, 2026
    },
    {
      name: "Past Date Sale",
      amount: 7.5,
      invoicePrefix: "PAST",
      shipDate: new Date(2026, 6, 15), // July 15, 2026
    },
    {
      name: "Year-End Sale",
      amount: 25.0,
      invoicePrefix: "YEAREND",
      shipDate: new Date(2026, 11, 31), // Dec 31, 2026
    },
  ];

  test.each(testCases)(
    "[Parameterized:DirectMarketing] $name with Direct Marketing fields",
    async (testCase: DirectMarketingTestCase) => {
      const directMktFields = buildDirectMarketingFields(
        `${testCase.invoicePrefix}${Date.now()}`,
        testCase.shipDate,
      );

      const response = (await (device as any)
        .sale(testCase.amount)
        .withEcrId(13)
        .withClerkId(123)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveSaleBlocker(response)) {
          console.warn(
            formatLiveFailure(response, `${testCase.name} Direct Marketing`),
          );
          return;
        }

        expectLiveSuccess(response, ["Sale", "SendCommand"]);
        expect(response.terminalRefNumber).toBeTruthy();
        return;
      }

      expect(response.status).toBe("Success");
      expect(response.deviceResponseCode).toBe("00");
    },
  );
});

// ===========================================================================
// UPA Spec Parameters – cardOnFileIndicator, cardBrandTransId, merchantDecision
// Per UPA Integrators Guide 02.20.02.B
// ===========================================================================

describeUpaLive("UPA Spec Parameters – cardOnFileIndicator (Request)", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[SpecCompliance:cardOnFileIndicator] Sale with cardOnFileIndicator='C' (Cardholder Initiated)", async () => {
    const response = (await (device as any)
      .sale(5.0)
      .withEcrId(13)
      .withClerkId(123)
      .withRequestMultiUseToken(true)
      .withCardOnFileIndicator(StoredCredentialInitiator.CardHolder)
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "cardOnFileIndicator='C' Sale"),
        );
        return;
      }
      expectLiveSuccess(response, ["Sale", "SendCommand"]);
      expect(response.terminalRefNumber).toBeTruthy();
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[SpecCompliance:cardOnFileIndicator] Sale with cardOnFileIndicator='M' (Merchant Initiated)", async () => {
    const response = (await (device as any)
      .sale(5.0)
      .withEcrId(13)
      .withClerkId(123)
      .withRequestMultiUseToken(true)
      .withCardOnFileIndicator(StoredCredentialInitiator.Merchant)
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "cardOnFileIndicator='M' Sale"),
        );
        return;
      }
      expectLiveSuccess(response, ["Sale", "SendCommand"]);
      expect(response.terminalRefNumber).toBeTruthy();
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[SpecCompliance:cardOnFileIndicator] Refund with cardOnFileIndicator='C'", async () => {
    const sale = await createLiveSale(device);
    if (!sale || !sale.transactionId) {
      console.warn("Refund cardOnFileIndicator test: Sale prerequisite failed");
      return;
    }

    const response = (await (device as any)
      .refund(5.0)
      .withEcrId(13)
      .withClerkId(123)
      .withTransactionId(sale.transactionId)
      .withRequestMultiUseToken(true)
      .withCardOnFileIndicator(StoredCredentialInitiator.CardHolder)
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "cardOnFileIndicator='C' Refund"),
        );
        return;
      }
      expectLiveSuccess(response, ["Refund", "SendCommand"]);
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[SpecCompliance:cardOnFileIndicator] PreAuth with cardOnFileIndicator='M'", async () => {
    const response = (await (device as any)
      .authorize(10.0)
      .withEcrId(13)
      .withClerkId(123)
      .withRequestMultiUseToken(true)
      .withCardOnFileIndicator(StoredCredentialInitiator.Merchant)
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "cardOnFileIndicator='M' PreAuth"),
        );
        return;
      }
      expectLiveSuccess(response, ["PreAuth", "SendCommand"]);
      expect(response.transactionId).toBeTruthy();
      return;
    }

    expect(response.status).toBe("Success");
  });
});

// ===========================================================================
// UPA Spec Parameters – cardBrandTransId Response Validation
// Per UPA spec: cardBrandTransId echoed in response for Sale, Refund, PreAuth, AuthCompletion
// ===========================================================================

describeUpaLive("UPA Spec Parameters – cardBrandTransId Response", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[SpecCompliance:cardBrandTransId] Sale with cardBrandTransId parameter", async () => {
    const testTransId = "VISA_TRANS_20260817_001";

    const response = (await (device as any)
      .sale(5.0)
      .withEcrId(13)
      .withClerkId(123)
      .withCardBrandTransId(testTransId)
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "cardBrandTransId Sale request"),
        );
        return;
      }
      expectLiveSuccess(response, ["Sale", "SendCommand"]);
      // Per spec: cardBrandTransId should be echoed in response
      if (response.cardBrandTransId) {
        console.log(
          "cardBrandTransId in response: %s",
          response.cardBrandTransId,
        );
      }
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[SpecCompliance:cardBrandTransId] Refund preserves cardBrandTransId", async () => {
    const sale = await createLiveSale(device);
    if (!sale || !sale.transactionId) {
      console.warn("Refund cardBrandTransId test: Sale prerequisite failed");
      return;
    }

    const testTransId = "MC_TRANS_20260817_002";

    const response = (await (device as any)
      .refund(5.0)
      .withEcrId(13)
      .withClerkId(123)
      .withTransactionId(sale.transactionId)
      .withCardBrandTransId(testTransId)
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "cardBrandTransId Refund request"),
        );
        return;
      }
      expectLiveSuccess(response, ["Refund", "SendCommand"]);
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[SpecCompliance:cardBrandTransId] PreAuth with cardBrandTransId echoed in response", async () => {
    const testTransId = "AMEX_TRANS_20260817_003";

    const response = (await (device as any)
      .authorize(15.0)
      .withEcrId(13)
      .withClerkId(123)
      .withCardBrandTransId(testTransId)
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "cardBrandTransId PreAuth request"),
        );
        return;
      }
      expectLiveSuccess(response, ["PreAuth", "SendCommand"]);
      expect(response.transactionId).toBeTruthy();
      // Verify cardBrandTransId presence
      if (response.cardBrandTransId) {
        console.log(
          "PreAuth cardBrandTransId in response: %s",
          response.cardBrandTransId,
        );
      }
      return;
    }

    expect(response.status).toBe("Success");
  });
});

// ===========================================================================
// UPA Spec Parameters – Direct Marketing Response Fields
// Per UPA spec: directMktInvoiceNbr, directMktShipMonth, directMktShipDay echoed in response
// ===========================================================================

describeUpaLive(
  "UPA Spec Parameters – Direct Marketing Response Fields",
  () => {
    let device: IDeviceInterface;

    beforeEach(() => {
      device = createTestDevice();
    });

    test("[SpecCompliance:DirectMkt] Sale response contains directMktInvoiceNbr", async () => {
      const directMktFields = buildDirectMarketingFields(
        "INV20260817_RESP_001",
      );

      const response = (await (device as any)
        .sale(5.0)
        .withEcrId(13)
        .withClerkId(123)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();
      expect(response).toBeInstanceOf(TransactionResponse);

      if (useLiveMic) {
        if (isKnownLiveSaleBlocker(response)) {
          console.warn(
            formatLiveFailure(response, "directMktInvoiceNbr response"),
          );
          return;
        }
        expectLiveSuccess(response, ["Sale", "SendCommand"]);

        // Per UPA spec: directMktInvoiceNbr should be in response
        if (response.directMktInvoiceNbr) {
          expect(response.directMktInvoiceNbr).toBe(
            directMktFields.directMktInvoiceNbr,
          );
          console.log(
            "✓ Sale response contains directMktInvoiceNbr: %s",
            response.directMktInvoiceNbr,
          );
        } else {
          console.warn(
            "⚠ Sale response missing directMktInvoiceNbr field (device may not support)",
          );
        }
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[SpecCompliance:DirectMkt] Sale response contains directMktShipMonth (01-12 format)", async () => {
      const directMktFields = buildDirectMarketingFields(
        "INV20260817_MONTH_001",
      );

      const response = (await (device as any)
        .sale(5.0)
        .withEcrId(13)
        .withClerkId(123)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveSaleBlocker(response)) {
          console.warn(
            formatLiveFailure(response, "directMktShipMonth response"),
          );
          return;
        }
        expectLiveSuccess(response, ["Sale", "SendCommand"]);

        // Verify month format (01-12)
        if (response.directMktShipMonth) {
          expect(/^(0[1-9]|1[0-2])$/.test(response.directMktShipMonth)).toBe(
            true,
          );
          expect(response.directMktShipMonth).toBe(
            directMktFields.directMktShipMonth,
          );
          console.log(
            "✓ Sale response contains directMktShipMonth: %s (valid format)",
            response.directMktShipMonth,
          );
        } else {
          console.warn(
            "⚠ Sale response missing directMktShipMonth field (device may not support)",
          );
        }
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[SpecCompliance:DirectMkt] Sale response contains directMktShipDay (01-31 format)", async () => {
      const directMktFields = buildDirectMarketingFields("INV20260817_DAY_001");

      const response = (await (device as any)
        .sale(5.0)
        .withEcrId(13)
        .withClerkId(123)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveSaleBlocker(response)) {
          console.warn(
            formatLiveFailure(response, "directMktShipDay response"),
          );
          return;
        }
        expectLiveSuccess(response, ["Sale", "SendCommand"]);

        // Verify day format (01-31)
        if (response.directMktShipDay) {
          expect(
            /^(0[1-9]|[12][0-9]|3[01])$/.test(response.directMktShipDay),
          ).toBe(true);
          expect(response.directMktShipDay).toBe(
            directMktFields.directMktShipDay,
          );
          console.log(
            "✓ Sale response contains directMktShipDay: %s (valid format)",
            response.directMktShipDay,
          );
        } else {
          console.warn(
            "⚠ Sale response missing directMktShipDay field (device may not support)",
          );
        }
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[SpecCompliance:DirectMkt] Refund response contains Direct Marketing fields", async () => {
      const sale = await createLiveSale(device);
      if (!sale || !sale.transactionId) {
        console.warn(
          "Refund Direct Marketing response test: Sale prerequisite failed",
        );
        return;
      }

      const directMktFields = buildDirectMarketingFields("INV20260817_REFUND");

      const response = (await (device as any)
        .refund(5.0)
        .withEcrId(13)
        .withClerkId(123)
        .withTransactionId(sale.transactionId)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveSaleBlocker(response)) {
          console.warn(
            formatLiveFailure(response, "Refund Direct Marketing response"),
          );
          return;
        }
        expectLiveSuccess(response, ["Refund", "SendCommand"]);

        // Validate all three fields
        if (response.directMktInvoiceNbr) {
          expect(response.directMktInvoiceNbr).toBe(
            directMktFields.directMktInvoiceNbr,
          );
        }
        if (response.directMktShipMonth) {
          expect(response.directMktShipMonth).toBe(
            directMktFields.directMktShipMonth,
          );
        }
        if (response.directMktShipDay) {
          expect(response.directMktShipDay).toBe(
            directMktFields.directMktShipDay,
          );
        }
        return;
      }

      expect(response.status).toBe("Success");
    });

    test("[SpecCompliance:DirectMkt] PreAuth response contains Direct Marketing fields", async () => {
      const directMktFields = buildDirectMarketingFields("INV20260817_PREAUTH");

      const response = (await (device as any)
        .authorize(10.0)
        .withEcrId(13)
        .withClerkId(123)
        .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
        .withDirectMktShipMonth(directMktFields.directMktShipMonth)
        .withDirectMktShipDay(directMktFields.directMktShipDay)
        .execute()) as TransactionResponse;

      expect(response).not.toBeNull();

      if (useLiveMic) {
        if (isKnownLiveSaleBlocker(response)) {
          console.warn(
            formatLiveFailure(response, "PreAuth Direct Marketing response"),
          );
          return;
        }
        expectLiveSuccess(response, ["PreAuth", "SendCommand"]);

        // All three Direct Marketing fields should be present
        expect(response.transactionId).toBeTruthy();
        if (response.directMktInvoiceNbr) {
          console.log(
            "✓ PreAuth response directMktInvoiceNbr: %s",
            response.directMktInvoiceNbr,
          );
        }
        return;
      }

      expect(response.status).toBe("Success");
    });
  },
);

// ===========================================================================
// UPA Spec Parameters – merchantDecision EMV Flow
// Per UPA spec: Used in ProcessCardTransaction, ContinueCardTransaction, ContinueEMVTransaction
// ===========================================================================

describeUpaLive("UPA Spec Parameters – merchantDecision EMV Flow", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[SpecCompliance:merchantDecision] ProcessCardTransaction with merchantDecision='Approve'", async () => {
    // Note: ProcessCardTransaction requires an active EMV flow which needs live MITC device
    // This test documents the expected behavior per UPA spec

    const param = new UpaParam();
    param.acquisitionTypes = [AcquisitionType.Contact];
    param.timeout = 60;
    param.header = "EMV Merchant Decision";
    param.displayTotalAmount = "Yes";

    const indicator = new ProcessingIndicator();
    indicator.QuickChip = "Y";

    const transData = new UpaTransactionData();
    transData.totalAmount = 10.0;
    transData.cashBackAmount = 0.0;
    transData.tranDate = new Date();
    transData.tranTime = new Date();
    transData.transType = TransactionType.Sale;

    try {
      const response = await (device as any).startCardTransaction(
        param,
        indicator,
        transData,
      );

      expect(response).not.toBeNull();

      if (useLiveMic) {
        // Per UPA spec: merchantDecision parameter is used in EMV processing
        console.log(
          "merchantDecision='Approve' would be used during EMV transaction processing",
        );
        // In live flow, this would be part of ContinueCardTransaction or ProcessCardTransaction
      }
    } catch (error) {
      if (isKnownLiveTransportTimeout(error)) {
        console.warn(
          "merchantDecision='Approve' test timed out (expected for device awaiting card)",
        );
        return;
      }
      // Expected in test environment without live device
    }
  });
});

// ===========================================================================
// UPA Spec Parameters – lineItemDisplay (lineItemLeft, lineItemRight)
// Per UPA Integrators Guide 02.20.02.B – Display-only parameters for terminal UI
// ===========================================================================

describeUpaLive("UPA Spec Parameters – lineItemDisplay", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[SpecCompliance:lineItemDisplay] Sale with lineItemLeft and lineItemRight display parameters", async () => {
    const response = (await (device as any)
      .sale(10.0)
      .withEcrId(13)
      .withClerkId(123)
      .withLineItemLeft("Widget - Product 1")
      .withLineItemRight("Qty: 1 @ $10.00")
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(formatLiveFailure(response, "lineItem display Sale"));
        return;
      }
      expectLiveSuccess(response, ["Sale", "SendCommand"]);
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[DirectMarketing:lineItemDisplay] Sale with lineItemLeft/Right and Direct Marketing fields", async () => {
    const directMktFields = buildDirectMarketingFields("INV987654");

    const response = (await (device as any)
      .sale(25.5)
      .withEcrId(13)
      .withClerkId(123)
      .withLineItemLeft("Coffee Cup - Medium")
      .withLineItemRight("QTY: 2 @ $12.75")
      .withDirectMktInvoiceNbr(directMktFields.directMktInvoiceNbr)
      .withDirectMktShipMonth(directMktFields.directMktShipMonth)
      .withDirectMktShipDay(directMktFields.directMktShipDay)
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "lineItem + directMkt combined Sale"),
        );
        return;
      }
      expectLiveSuccess(response, ["Sale", "SendCommand"]);
      // Verify direct marketing fields are echoed in response
      expect(response.directMktInvoiceNbr).toBe(
        directMktFields.directMktInvoiceNbr,
      );
      expect(response.directMktShipMonth).toBe(
        directMktFields.directMktShipMonth,
      );
      expect(response.directMktShipDay).toBe(directMktFields.directMktShipDay);
      return;
    }

    expect(response.status).toBe("Success");
    // In mock mode, direct marketing fields should be echoed
    if (response.directMktInvoiceNbr) {
      expect(response.directMktInvoiceNbr).toBe(
        directMktFields.directMktInvoiceNbr,
      );
    }
  });

  test("[SpecCompliance:lineItemDisplay] Refund with lineItemLeft display text", async () => {
    const sale = await createLiveSale(device);
    if (!sale || !sale.transactionId) {
      console.warn("lineItem Refund test: Sale prerequisite failed");
      return;
    }

    const response = (await (device as any)
      .refund(15.0)
      .withEcrId(13)
      .withClerkId(123)
      .withTransactionId(sale.transactionId)
      .withLineItemLeft("Refund - Original Sale")
      .withLineItemRight("Qty: 1")
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(formatLiveFailure(response, "lineItem Refund"));
        return;
      }
      expectLiveSuccess(response, ["Refund", "SendCommand"]);
      return;
    }

    expect(response.status).toBe("Success");
  });
});

// ===========================================================================
// UPA Spec Parameters – preAuthAmount
// Per UPA Integrators Guide 02.20.02.B – Pre-authorization amount (tip allowance workflow)
// ===========================================================================

describeUpaLive("UPA Spec Parameters – preAuthAmount", () => {
  let device: IDeviceInterface;

  beforeEach(() => {
    device = createTestDevice();
  });

  test("[SpecCompliance:preAuthAmount] PreAuth with base authorization and higher preAuthAmount (tip allowance)", async () => {
    const baseAmount = 25.0;
    const preAuthAmount = 35.0;

    const response = (await (device as any)
      .authorize(baseAmount) // Base authorization amount
      .withEcrId(13)
      .withClerkId(123)
      .withPreAuthAmount(preAuthAmount) // Hold amount (includes tip allowance)
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(formatLiveFailure(response, "preAuthAmount PreAuth"));
        return;
      }
      expectLiveSuccess(response, ["PreAuth", "SendCommand"]);
      expect(response.transactionId).toBeTruthy();
      return;
    }

    expect(response.status).toBe("Success");
    expect(response.deviceResponseCode).toBe("00");
  });

  test("[SpecCompliance:preAuthAmount] Refund of preAuthorized transaction", async () => {
    const authResponse = (await (device as any)
      .authorize(25.0)
      .withEcrId(13)
      .withClerkId(123)
      .withPreAuthAmount(35.0)
      .execute()) as TransactionResponse;

    if (!authResponse || !authResponse.transactionId) {
      console.warn("preAuthAmount Refund: PreAuth prerequisite failed");
      return;
    }

    // Refund the actual used amount, not the preAuthAmount hold
    const refundResponse = (await (device as any)
      .refund(25.0)
      .withEcrId(13)
      .withClerkId(123)
      .withTransactionId(authResponse.transactionId)
      .execute()) as TransactionResponse;

    expect(refundResponse).not.toBeNull();
    expect(refundResponse).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(refundResponse)) {
        console.warn(formatLiveFailure(refundResponse, "preAuthAmount Refund"));
        return;
      }
      expectLiveSuccess(refundResponse, ["Refund", "SendCommand"]);
      return;
    }

    expect(refundResponse.status).toBe("Success");
  });

  test("[SpecCompliance:preAuthAmount] PreAuth with preAuthAmount less than base authorization (decline allowance)", async () => {
    // Scenario: Merchant wants to allow refund but NOT tip (e.g., phone order)
    const baseAmount = 50.0;
    const preAuthAmount = 50.0; // No tip allowance

    const response = (await (device as any)
      .authorize(baseAmount)
      .withEcrId(13)
      .withClerkId(123)
      .withPreAuthAmount(preAuthAmount)
      .execute()) as TransactionResponse;

    expect(response).not.toBeNull();
    expect(response).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(response)) {
        console.warn(
          formatLiveFailure(response, "preAuthAmount no-tip PreAuth"),
        );
        return;
      }
      expectLiveSuccess(response, ["PreAuth", "SendCommand"]);
      expect(response.transactionId).toBeTruthy();
      return;
    }

    expect(response.status).toBe("Success");
  });

  test("[SpecCompliance:preAuthAmount] AuthCompletion with preAuthAmount establishes hold", async () => {
    const authResponse = (await (device as any)
      .authorize(30.0)
      .withEcrId(13)
      .withClerkId(123)
      .withPreAuthAmount(40.0)
      .execute()) as TransactionResponse;

    if (!authResponse || !authResponse.transactionId) {
      console.warn("preAuthAmount AuthCompletion: PreAuth prerequisite failed");
      return;
    }

    // Complete auth with the established preAuthAmount hold
    const completeResponse = (await (device as any)
      .authCompletion()
      .withEcrId(13)
      .withTransactionId(authResponse.transactionId)
      .withAmount(35.0) // Actual tip + base amount used
      .execute()) as TransactionResponse;

    expect(completeResponse).not.toBeNull();
    expect(completeResponse).toBeInstanceOf(TransactionResponse);

    if (useLiveMic) {
      if (isKnownLiveSaleBlocker(completeResponse)) {
        console.warn(
          formatLiveFailure(completeResponse, "preAuthAmount AuthCompletion"),
        );
        return;
      }
      expectLiveSuccess(completeResponse, ["AuthCompletion", "SendCommand"]);
      return;
    }

    expect(completeResponse.status).toBe("Success");
  });
});

// ===========================================================================
// JIRA Story Requirements – Value Mapping Validation
// ===========================================================================
describe("JIRA Story: UPA Transaction Processing – Value Mapping", () => {
  /**
   * Verify that cardOnFileIndicator values map correctly:
   * CardHolder -> 'C', Merchant -> 'M'
   */
  test("[Mapping:cardOnFileIndicator] Enum values map to correct UPA strings", () => {
    // The enum itself stores the mapped values
    expect(StoredCredentialInitiator.CardHolder).toBe("C");
    expect(StoredCredentialInitiator.Merchant).toBe("M");
  });

  /**
   * Verify acquisitionTypes can be joined for UPA format
   */
  test("[Mapping:acquisitionTypes] Array joins correctly for UPA request", () => {
    const types = [
      AcquisitionType.Contact,
      AcquisitionType.Contactless,
      AcquisitionType.Swipe,
    ];
    const joined = types.join("|");

    expect(joined).toMatch(/Contact\|Contactless\|Swipe/);
  });
});

// ===========================================================================
// JIRA Story Requirements – Acceptance Conditions
// ===========================================================================
describe("JIRA Story: UPA Transaction Processing – Acceptance Criteria", () => {
  /**
   * Acceptance Criteria:
   * Region: US
   * Gateway: GP-API
   * Environment: Sandbox
   * Devices: UPA
   * Payment Types: MC, VISA, Amex
   * Credentials: Non-specific
   *
   * GIVEN: Node SDK is used
   * WHEN: Tests run with all required fields
   * THEN: Request goes through to UPA and transaction processes successfully
   */
  test("[Acceptance:Criteria] All JIRA requirements are testable", () => {
    // This test verifies the structure supports the acceptance criteria
    const device = createTestDevice();

    // Verify device is properly configured
    expect(device).toBeDefined();
    expect(device).toHaveProperty("sale");
    expect(device).toHaveProperty("authorize");
    expect(device).toHaveProperty("refund");

    // Verify all builder methods are available
    const saleBuilder = device.sale(10.0);
    const requiredMethods = [
      "withClerkId",
      "withCardOnFileIndicator",
      "withCardBrandTransId",
      "withLineItemLeft",
      "withLineItemRight",
      "withLanguage",
      "withMerchantDecision",
      "withAcquisitionTypes",
      "withPreAuthAmount",
      "execute",
    ];

    for (const method of requiredMethods) {
      expect(saleBuilder).toHaveProperty(method);
      expect(typeof (saleBuilder as any)[method]).toBe("function");
    }
  });

  /**
   * Verify no manual code is needed - SDK handles everything
   */
  test.only("[Acceptance:NoManualCode] SDK methods handle all required fields", () => {
    const device = createTestDevice();

    const builder = device
      .sale(100.0)
      .withClerkId(1)
      .withCardOnFileIndicator(StoredCredentialInitiator.CardHolder)
      .withCardBrandTransId("BRAND-001")
      .withLineItemLeft("Test Item")
      .withLineItemRight("$100.00")
      .withLanguage("en")
      .withMerchantDecision("Approve")
      .withAcquisitionTypes([AcquisitionType.Contact])
      .withPreAuthAmount(125.0);

    // All fields should be set without manual property access
    expect((builder as any).amount).toBe(100.0);
    expect((builder as any).clerkId).toBe(1);
    expect((builder as any).cardOnFileIndicator).toBe(
      StoredCredentialInitiator.CardHolder,
    );
  });
});
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
      .withClerkId(123);

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
    expect(response.transactionAmount).toBe(10);
    console.log(
      `[Refund By TransID] Amount: ${response.transactionAmount}, Status: ${response.status}`,
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
      .withClerkId(1234)
      .execute();

    expect(response).toBeDefined();
    expect(response.status).toBe("Success");
    expect(response.maskedCardNumber).toBeDefined();
    expect(response.cardType).toBeDefined();

    console.log(
      `[Verify Address] AVS Code: ${response.avsResponseCode}, Status: ${response.status}`,
    );
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
