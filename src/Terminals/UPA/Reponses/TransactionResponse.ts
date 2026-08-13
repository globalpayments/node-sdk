import {
  ApplicationCryptogramType,
  GatewayProvider,
  ITerminalResponse,
  NotImplementedError,
} from "../../../../src";

export class TransactionResponse implements ITerminalResponse {
  public availableBalance?: number;
  public transactionId: string;
  public terminalRefNumber: string;
  public token?: string;
  public cardBrandTransId?: string;
  public signatureStatus?: string;
  public signatureData?: Buffer;
  public transactionType?: string;
  public maskedCardNumber: string;
  public entryMethod: string;
  public authorizationCode: string;
  public transactionAmount: number;
  public amountDue?: number;
  public balanceAmount?: number;
  public cardBIN?: string;
  public cardPresent?: boolean;
  public expirationDate?: string;
  public avsResponseCode?: string;
  public avsResponseText?: string;
  public cvvResponseCode?: string;
  public cvvResponseText?: string;
  public taxExempt?: boolean;
  public taxExemptId?: string;
  public ticketNumber?: string;
  public paymentType: string;
  public cardType = "";
  public cardGroup = "";
  public ebtType = "";
  public clerkId = "";
  public pinVerified = "";
  public fallback = "";
  public applicationPreferredName?: string;
  public applicationLabel?: string;
  public applicationId?: string;
  public applicationCryptogramType?: ApplicationCryptogramType;
  public applicationCryptogram?: string;
  public cardHolderVerificationMethod?: string;
  public terminalVerificationResults?: string;
  public merchantFee?: number;
  public storeAndForward?: number;
  public safTransaction?: boolean;
  public status: string;
  public command: string;
  public version = "";
  public deviceResponseCode: string;
  public deviceResponseText: string;
  public responseCode: string;
  public responseText: string;
  public approvalCode: string;
  public tipAmount?: number;
  public baseAmount?: number;
  public cashBackAmount?: number;
  public referenceNumber = "";
  public cardHolderName?: string;
  public requestId: string;
  public deviceResponseMessage: string;
  public ecrId: string;
  public multipleMessage = "";
  public terminalNumber = "";
  public responseId = "";
  public respDateTime = "";
  public gatewayResponseCode = "";
  public gatewayResponseMessage = "";
  public invoiceNumber = "";
  public extraChargeTotal?: number;
  public scanData = "";

  // === TYP (Thank You Points) loyalty fields - Sale ===
  /** Loyalty programme redemption ID returned by TYP host (Sale only). */
  public redeemId?: string;
  /** Status of TYP redemption (e.g., "COMPLETE"). */
  public redeemStatus?: string;
  /** Monetary value redeemed from TYP balance, in transaction currency. */
  public currencyAmountRedeemed?: number;
  /** Number of TYP loyalty points redeemed in this transaction. */
  public pointsRedeemed?: number;
  /** Discount amount applied as a result of TYP redemption. */
  public discountAmountRedeemed?: number;

  // === TYP (Thank You Points) loyalty fields - Void / Reverse ===
  /** Loyalty redemption ID for voided/reversed TYP redemption. */
  public voidRedeemId?: string;
  /** Status of voided TYP redemption (e.g., "COMPLETE"). */
  public voidRedeemStatus?: string;
  /** Monetary value reversed from TYP balance on void/reverse. */
  public voidCurrencyAmountRedeemed?: number;
  /** TYP loyalty points reversed in void/reverse transaction. */
  public voidPointsRedeemed?: number;
  /** Discount amount reversed on TYP void/reverse. */
  public voidDiscountAmountRedeemed?: number;

  constructor(jsonResponse: any) {
    if (typeof jsonResponse === "string")
      try {
        jsonResponse = JSON.parse(jsonResponse);
      } catch {
        throw new NotImplementedError("Invalid JSON string");
      }
    this.version = this.extractVersion(jsonResponse);
    this.referenceNumber = this.extractReferenceNumber(jsonResponse);
    if (this.isGpApiResponse(jsonResponse)) {
      const response = jsonResponse.response;
      const cmdResult = response?.cmdResult;
      const responseData = response?.data;
      const host = responseData?.host;
      const payment = responseData?.payment;
      const transaction = responseData?.transaction;

      this.requestId = this.toStringValue(
        response?.requestId ?? jsonResponse.id,
      );
      this.transactionId = this.toStringValue(
        host?.referenceNumber ?? jsonResponse.id,
      );
      this.command = response?.response ?? "";
      this.ecrId = response?.EcrId ?? "";
      this.status = cmdResult?.result ?? jsonResponse.status ?? "";
      this.deviceResponseCode = this.normalizeDeviceResponseCode(
        cmdResult?.errorCode,
        jsonResponse.action?.result_code,
      );
      this.deviceResponseText = jsonResponse.status ?? this.status;
      this.deviceResponseMessage = cmdResult?.errorMessage ?? "";
      this.responseCode = host?.responseCode ?? this.deviceResponseCode;
      this.responseText =
        host?.responseText ?? jsonResponse.action?.result_code ?? "";
      this.approvalCode = host?.approvalCode ?? "";
      this.referenceNumber = this.toStringValue(host?.referenceNumber);
      this.terminalRefNumber = this.toStringValue(host?.tranNo);
      this.authorizationCode = host?.approvalCode ?? "";
      this.avsResponseCode = host?.AvsResultCode ?? "";
      this.avsResponseText = host?.AvsResultText ?? "";
      this.cvvResponseCode = host?.CvvResultCode ?? "";
      this.cvvResponseText = host?.CvvResultText ?? "";
      this.token = host?.tokenValue ?? "";
      this.cardBrandTransId = host?.cardBrandTransId ?? "";
      this.storeAndForward = this.toNumber(
        payment?.storeAndForward ?? host?.storeAndForward,
      );
      this.safTransaction = this.storeAndForward === 1;
      this.baseAmount = this.toNumber(
        host?.baseAmount ?? transaction?.baseAmount,
      );
      this.tipAmount = this.toNumber(host?.tipAmount ?? transaction?.tipAmount);
      this.cashBackAmount = this.toNumber(
        host?.cashBackAmount ?? transaction?.cashBackAmount,
      );
      this.transactionAmount =
        this.toNumber(host?.totalAmount ?? transaction?.totalAmount) ?? 0;
      this.availableBalance = this.toNumber(host?.availableBalance);
      this.balanceAmount = this.toNumber(host?.balanceDue) ?? 0;
      this.paymentType = payment?.cardType ?? "";
      this.cardType = payment?.cardType ?? "";
      this.cardGroup = payment?.cardGroup ?? "";
      this.ebtType = payment?.ebtType ?? "";
      this.clerkId = payment?.clerkId ?? "";
      this.pinVerified = payment?.PinVerified ?? "";
      this.fallback = payment?.fallback ?? "";
      this.maskedCardNumber = payment?.maskedPan ?? payment?.maskedPAN ?? "";
      this.entryMethod = payment?.cardAcquisition ?? "";
      this.cardHolderName = payment?.cardHolderName ?? "";
      this.expirationDate = payment?.expiryDate ?? "";
      this.transactionType = payment?.transactionType ?? "";
      this.multipleMessage = this.toStringValue(responseData?.multipleMessage);
      this.terminalNumber = this.toStringValue(responseData?.terminalNumber);
      this.responseId = this.toStringValue(host?.responseId);
      this.respDateTime = this.toStringValue(host?.respDateTime);
      this.gatewayResponseCode = this.toStringValue(host?.gatewayResponseCode);
      this.gatewayResponseMessage = this.toStringValue(
        host?.gatewayResponseMessage,
      );
      this.invoiceNumber = this.toStringValue(payment?.invoiceNbr);
      this.extraChargeTotal = this.toNumber(transaction?.extraChargeTotal);
      this.scanData = this.toStringValue(responseData?.scanData);

      // TYP - Sale redemption (only present when device returns it)
      if (host?.redeemId) {
        this.redeemId = this.toStringValue(host.redeemId);
        this.redeemStatus = this.toStringValue(host.redeemStatus);
        this.currencyAmountRedeemed = this.toNumber(
          host.currencyAmountRedeemed,
        );
        this.pointsRedeemed = this.toNumber(host.pointsRedeemed);
        this.discountAmountRedeemed = this.toNumber(
          host.discountAmountRedeemed,
        );
      }

      // TYP - Void / Reverse redemption
      if (host?.voidRedeemId) {
        this.voidRedeemId = this.toStringValue(host.voidRedeemId);
        this.voidRedeemStatus = this.toStringValue(host.voidRedeemStatus);
        this.voidCurrencyAmountRedeemed = this.toNumber(
          host.voidCurrencyAmountRedeemed,
        );
        this.voidPointsRedeemed = this.toNumber(host.voidPointsRedeemed);
        this.voidDiscountAmountRedeemed = this.toNumber(
          host.voidDiscountAmountRedeemed,
        );
      }
    } else {
      // Native UPA device response (semi-integrated socket format).
      // Wire shape per AH-2327 contract:
      //   { message, data: { cmdResult, data: { host, payment, multipleMessage },
      //     response, EcrId, requestId } }
      const data = jsonResponse?.data;
      const cmdResult = data?.cmdResult;
      const responseData = data?.data;
      const transaction = responseData?.transaction;
      const inner = data?.data;
      const host = inner?.host;
      const payment = inner?.payment;
      this.deviceResponseText = cmdResult?.result ?? "";
      this.deviceResponseCode = cmdResult?.errorCode ?? "00";
      this.status = this.deviceResponseText;
      this.deviceResponseMessage = cmdResult?.errorMessage ?? "";
      this.requestId = this.toStringValue(data?.requestId);
      this.command = data?.response ?? "";
      this.ecrId = data?.EcrId ?? "";
      this.multipleMessage = this.toStringValue(responseData?.multipleMessage);
      this.terminalNumber = this.toStringValue(responseData?.terminalNumber);
      this.responseCode = this.toStringValue(host?.responseCode);
      this.responseText = this.toStringValue(host?.responseText);
      this.responseId = this.toStringValue(host?.responseId);
      this.respDateTime = this.toStringValue(host?.respDateTime);
      this.gatewayResponseCode = this.toStringValue(host?.gatewayResponseCode);
      this.gatewayResponseMessage = this.toStringValue(
        host?.gatewayResponseMessage,
      );
      this.cardType = this.toStringValue(payment?.cardType);
      this.paymentType = this.cardType;
      this.entryMethod = this.toStringValue(payment?.cardAcquisition);
      this.cardGroup = this.toStringValue(payment?.cardGroup);
      this.clerkId = this.toStringValue(payment?.clerkId);
      this.invoiceNumber = this.toStringValue(payment?.invoiceNbr);
      this.maskedCardNumber = this.toStringValue(
        payment?.maskedPan ?? payment?.maskedPAN,
      );
      this.transactionAmount =
        this.toNumber(transaction?.totalAmount ?? host?.totalAmount) ?? 0;
      this.extraChargeTotal = this.toNumber(transaction?.extraChargeTotal);
      this.scanData = this.toStringValue(responseData?.scanData);
      this.transactionId = this.toStringValue(host?.referenceNumber);
      this.terminalRefNumber = this.toStringValue(host?.tranNo);
      this.approvalCode = this.toStringValue(host?.approvalCode);
      this.authorizationCode = this.approvalCode;
      this.referenceNumber =
        this.referenceNumber || this.toStringValue(host?.referenceNumber);

      if (host) {
        this.responseCode = host.responseCode ?? "";
        this.responseText = host.responseText ?? "";
        this.approvalCode = host.approvalCode ?? "";
        this.authorizationCode = host.approvalCode ?? "";
        this.referenceNumber = this.toStringValue(host.referenceNumber);
        this.transactionId = this.toStringValue(host.referenceNumber);
        this.terminalRefNumber = this.toStringValue(host.tranNo);
        this.avsResponseCode = host.AvsResultCode ?? "";
        this.avsResponseText = host.AvsResultText ?? "";
        this.baseAmount = this.toNumber(host.baseAmount);
        this.tipAmount = this.toNumber(host.tipAmount);
        this.cashBackAmount = this.toNumber(host.cashBackAmount);
        this.transactionAmount = this.toNumber(host.totalAmount) ?? 0;

        // TYP - Sale redemption
        if (host.redeemId) {
          this.redeemId = this.toStringValue(host.redeemId);
          this.redeemStatus = this.toStringValue(host.redeemStatus);
          this.currencyAmountRedeemed = this.toNumber(
            host.currencyAmountRedeemed,
          );
          this.pointsRedeemed = this.toNumber(host.pointsRedeemed);
          this.discountAmountRedeemed = this.toNumber(
            host.discountAmountRedeemed,
          );
        }

        // TYP - Void / Reverse redemption
        if (host.voidRedeemId) {
          this.voidRedeemId = this.toStringValue(host.voidRedeemId);
          this.voidRedeemStatus = this.toStringValue(host.voidRedeemStatus);
          this.voidCurrencyAmountRedeemed = this.toNumber(
            host.voidCurrencyAmountRedeemed,
          );
          this.voidPointsRedeemed = this.toNumber(host.voidPointsRedeemed);
          this.voidDiscountAmountRedeemed = this.toNumber(
            host.voidDiscountAmountRedeemed,
          );
        }
      }

      if (payment) {
        this.paymentType = payment.cardType ?? "";
        this.cardType = payment.cardType ?? "";
        this.cardGroup = payment.cardGroup ?? "";
        this.maskedCardNumber = payment.maskedPan ?? payment.maskedPAN ?? "";
        this.cardHolderName = payment.cardHolderName ?? "";
      }
    }
  }

  private isGpApiResponse(jsonResponse: any): boolean {
    return !!(
      jsonResponse.provider && jsonResponse.provider === GatewayProvider.GpApi
    );
  }

  private toNumber(value: any): number | undefined {
    if (value === undefined || value === null || value === "") {
      return undefined;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  private toStringValue(value: any): string {
    if (value === undefined || value === null) {
      return "";
    }

    return String(value);
  }

  private normalizeDeviceResponseCode(
    cmdErrorCode?: string,
    actionResultCode?: string,
  ): string {
    if (cmdErrorCode) {
      return cmdErrorCode;
    }

    return actionResultCode === "SUCCESS" ? "00" : actionResultCode ?? "";
  }

  private extractVersion(jsonResponse: any): string {
    return (
      jsonResponse?.version ??
      jsonResponse?.response?.version ??
      jsonResponse?.data?.version ??
      jsonResponse?.data?.data?.version ??
      ""
    );
  }

  private extractReferenceNumber(jsonResponse: any): string {
    return this.toStringValue(
      jsonResponse?.referenceNumber ??
        jsonResponse?.response?.referenceNumber ??
        jsonResponse?.response?.data?.referenceNumber ??
        jsonResponse?.response?.data?.host?.referenceNumber ??
        jsonResponse?.data?.referenceNumber ??
        jsonResponse?.data?.data?.referenceNumber ??
        jsonResponse?.data?.data?.host?.referenceNumber,
    );
  }
}
