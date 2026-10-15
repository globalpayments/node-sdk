import {
  ApplicationCryptogramType,
  GatewayError,
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
  public directMktInvoiceNbr?: string;
  public directMktShipMonth?: string;
  public directMktShipDay?: string;
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
  public cvvResultCode: any;
  public cvvResultText: any;
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
  public taxAmount?: number;
  public cashBackAmount?: number;
  public authorizedAmount?: number;
  public tokenResponseCode?: string;
  public tokenResponseMessage?: string;
  public panSequenceNumber?: string;
  public preAuthAmount?: number;
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

  // === EMV Tag Properties ===
  /** EMV Tag 4F - Application Dedicated File (ADF). */
  public applicationIdentifier?: string;
  /** EMV Tag 50 - Application Label. */
  public emvApplicationLabel?: string;
  /** EMV Tag 5F20 - Cardholder Name. */
  public emvCardholderName?: string;
  /** EMV Tag 5F2A - Transaction Currency Code. */
  public transactionCurrencyCode?: string;
  /** EMV Tag 5F34 - Application Primary Account Number (PAN). */
  public applicationPAN?: string;
  /** EMV Tag 82 - Application Dedicated File (ADF) Name / Application Indicator. */
  public applicationAIP?: string;
  /** EMV Tag 84 - Dedicated File (DF) Name. */
  public dedicatedDF?: string;
  /** EMV Tag 8A - Authorised Response Code. */
  public authorizedResponse?: string;
  /** EMV Tag 95 - Terminal Verification Results. */
  public emvTerminalVerificationResults?: string;
  /** EMV Tag 99 - Transaction PIN Data. */
  public transactionPIN?: string;
  /** EMV Tag 9A - Transaction Date. */
  public transactionDate?: string;
  /** EMV Tag 9B - Transaction Status Information (TSI). */
  public transactionTSI?: string;
  /** EMV Tag 9C - Transaction Type. */
  public transactionTypeEMV?: string;
  /** EMV Tag 9F02 - Amount, Authorised. */
  public amountAuthorised?: string;
  /** EMV Tag 9F03 - Amount, Other. */
  public otherAmount?: string;
  /** EMV Tag 9F06 - Application Identifier (AID). */
  public emvApplicationId?: string;
  /** EMV Tag 9F08 - Application Dedicated File (ADF) Name / Application Effective Date. */
  public applicationICC?: string;
  /** EMV Tag 9F0D - Issuer Action Code (IAC) - Default. */
  public iacDefault?: string;
  /** EMV Tag 9F0E - Issuer Action Code (IAC) - Denial. */
  public iacDenial?: string;
  /** EMV Tag 9F0F - Issuer Action Code (IAC) - Online. */
  public iacOnline?: string;
  /** EMV Tag 9F10 - Issuer Application Data (IAD). */
  public issuerApplicationData?: string;
  /** EMV Tag 9F12 - Application Preferred Name. */
  public emvApplicationPreferredName?: string;
  /** EMV Tag 9F1A - Terminal Country Code. */
  public terminalCountryCode?: string;
  /** EMV Tag 9F1E - Interface Device (IFD) Serial Number. */
  public ifdSerialNumber?: string;
  /** EMV Tag 9F26 - Cryptogram, Application (AC). */
  public emvApplicationCryptogram?: string;
  /** EMV Tag 9F27 - Cryptogram, Application Type. */
  public applicationCryptogramType_Tag?: string;
  /** EMV Tag 9F33 - Terminal Capabilities. */
  public terminalCapabilities?: string;
  /** EMV Tag 9F34 - CVM Results. */
  public cvmResults?: string;
  /** EMV Tag 9F35 - Terminal Type. */
  public terminalType?: string;
  /** EMV Tag 9F36 - Application Transaction Counter (ATC). */
  public applicationTransactionCounter?: string;
  /** EMV Tag 9F37 - Unpredictable Number (UN). */
  public unpredictableNumber?: string;
  /** EMV Tag 9F40 - Additional Terminal Capabilities. */
  public additionalTerminalCapabilities?: string;
  /** EMV Tag 9F41 - Transaction Sequence Counter (TSC). */
  public transactionSequenceCounter?: string;
  /** EMV Tag 9F53 - Transaction Category Code (TCC). */
  public transactionCategoryCode?: string;
  /** Terminal Action Code (TAC) - Default. */
  public tacDefault?: string;
  /** Terminal Action Code (TAC) - Denial. */
  public tacDenial?: string;
  /** Terminal Action Code (TAC) - Online. */
  public tacOnline?: string;

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

  // === CPC (Card Present Capable) processing indicator ===
  /** Card Present Capable processing indicator: "1" or "0" / "Y" or "N". */
  public processCPC?: string;

  constructor(jsonResponse: any) {
    if (typeof jsonResponse === "string")
      try {
        jsonResponse = JSON.parse(jsonResponse);
      } catch {
        throw new NotImplementedError("Invalid JSON string");
      }
    this.version = this.extractVersion(jsonResponse);
    this.referenceNumber = this.extractReferenceNumber(jsonResponse);
    TransactionResponse.checkResponse(jsonResponse);
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
      this.cvvResultCode = host?.CvvResultCode ?? "";
      this.cvvResultText = host?.CvvResultText ?? "";
      this.token = host?.tokenValue ?? "";
      this.cardBrandTransId = host?.cardBrandTransId ?? "";
      this.directMktInvoiceNbr = this.toStringValue(
        payment?.directMktInvoiceNbr ?? host?.directMktInvoiceNbr,
      );
      this.directMktShipMonth = this.toStringValue(
        payment?.directMktShipMonth ?? host?.directMktShipMonth,
      );
      this.directMktShipDay = this.toStringValue(
        payment?.directMktShipDay ?? host?.directMktShipDay,
      );
      this.storeAndForward = this.toNumber(
        payment?.storeAndForward ?? host?.storeAndForward,
      );
      this.safTransaction = this.storeAndForward === 1;
      this.baseAmount = this.toNumber(
        host?.baseAmount ?? transaction?.baseAmount,
      );
      this.tipAmount = this.toNumber(host?.tipAmount ?? transaction?.tipAmount);
      this.taxAmount = this.toNumber(host?.taxAmount ?? transaction?.taxAmount);
      this.cashBackAmount = this.toNumber(
        host?.cashBackAmount ?? transaction?.cashBackAmount,
      );
      this.authorizedAmount = this.toNumber(host?.authorizedAmount);
      this.preAuthAmount = this.toNumber(
        host?.preAuthAmount ?? transaction?.preAuthAmount,
      );
      this.taxAmount = this.toNumber(host?.taxAmount ?? transaction?.taxAmount);
      this.transactionAmount =
        this.toNumber(host?.totalAmount ?? transaction?.totalAmount) ?? 0;

      // Fallback: if baseAmount is missing but we have transactionAmount,
      // use transactionAmount as baseAmount (for refunds and other transaction types
      // where device doesn't return separate baseAmount)
      if (!this.baseAmount && this.transactionAmount) {
        this.baseAmount = this.transactionAmount;
      }
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
      this.cardBrandTransId = this.toStringValue(host?.cardBrandTransId);
      this.respDateTime = this.toStringValue(host?.respDateTime);
      this.gatewayResponseCode = this.toStringValue(host?.gatewayResponseCode);
      this.gatewayResponseMessage = this.toStringValue(
        host?.gatewayResponseMessage,
      );
      this.invoiceNumber = this.toStringValue(payment?.invoiceNbr);
      this.extraChargeTotal = this.toNumber(transaction?.extraChargeTotal);
      this.scanData = this.toStringValue(responseData?.scanData);
      this.token = host?.tokenValue ?? "";
      this.tokenResponseCode = this.toStringValue(host?.tokenRspCode);
      this.tokenResponseMessage = this.toStringValue(host?.tokenRspMsg);
      this.cardBIN = this.toStringValue(payment?.cardBIN);
      this.panSequenceNumber = this.toStringValue(payment?.panSequenceNumber);

      // CPC (Card Present Capable) processing indicator
      // Note: processCPC is request-only; device does not echo it in response
      if (
        transaction?.processCPC !== undefined &&
        transaction?.processCPC !== null
      ) {
        this.processCPC = this.toStringValue(transaction.processCPC);
      } else if (host?.processCPC !== undefined && host?.processCPC !== null) {
        this.processCPC = this.toStringValue(host.processCPC);
      }

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

      // EMV Tag Mappings
      const emv = responseData?.emv;
      if (emv) {
        this.applicationIdentifier = this.toStringValue(emv["4F"]);
        this.emvApplicationLabel = this.toStringValue(emv["50"]);
        this.emvCardholderName = this.toStringValue(emv["5F20"]);
        this.transactionCurrencyCode = this.toStringValue(emv["5F2A"]);
        this.applicationPAN = this.toStringValue(emv["5F34"]);
        this.applicationAIP = this.toStringValue(emv["82"]);
        this.dedicatedDF = this.toStringValue(emv["84"]);
        this.authorizedResponse = this.toStringValue(emv["8A"]);
        this.emvTerminalVerificationResults = this.toStringValue(emv["95"]);
        this.transactionPIN = this.toStringValue(emv["99"]);
        this.transactionDate = this.toStringValue(emv["9A"]);
        this.transactionTSI = this.toStringValue(emv["9B"]);
        this.transactionTypeEMV = this.toStringValue(emv["9C"]);
        this.amountAuthorised = this.toStringValue(emv["9F02"]);
        this.otherAmount = this.toStringValue(emv["9F03"]);
        this.emvApplicationId = this.toStringValue(emv["9F06"]);
        this.applicationICC = this.toStringValue(emv["9F08"]);
        this.iacDefault = this.toStringValue(emv["9F0D"]);
        this.iacDenial = this.toStringValue(emv["9F0E"]);
        this.iacOnline = this.toStringValue(emv["9F0F"]);
        this.issuerApplicationData = this.toStringValue(emv["9F10"]);
        this.emvApplicationPreferredName = this.toStringValue(emv["9F12"]);
        this.terminalCountryCode = this.toStringValue(emv["9F1A"]);
        this.ifdSerialNumber = this.toStringValue(emv["9F1E"]);
        this.emvApplicationCryptogram = this.toStringValue(emv["9F26"]);
        this.applicationCryptogramType_Tag = this.toStringValue(emv["9F27"]);
        this.terminalCapabilities = this.toStringValue(emv["9F33"]);
        this.cvmResults = this.toStringValue(emv["9F34"]);
        this.cardHolderVerificationMethod = this.toStringValue(emv["9F34"]);
        this.terminalType = this.toStringValue(emv["9F35"]);
        this.applicationTransactionCounter = this.toStringValue(emv["9F36"]);
        this.unpredictableNumber = this.toStringValue(emv["9F37"]);
        this.additionalTerminalCapabilities = this.toStringValue(emv["9F40"]);
        this.transactionSequenceCounter = this.toStringValue(emv["9F41"]);
        this.transactionCategoryCode = this.toStringValue(emv["9F53"]);
        this.tacDefault = this.toStringValue(emv["TacDefault"]);
        this.tacDenial = this.toStringValue(emv["TacDenial"]);
        this.tacOnline = this.toStringValue(emv["TacOnline"]);

        // Fallback to alternate tag names if available
        this.applicationLabel =
          this.applicationLabel || this.emvApplicationLabel;
        this.applicationId = this.applicationId || this.emvApplicationId;
        this.applicationPreferredName =
          this.applicationPreferredName || this.emvApplicationPreferredName;
        this.applicationCryptogram =
          this.applicationCryptogram || this.emvApplicationCryptogram;
        this.terminalVerificationResults =
          this.terminalVerificationResults ||
          this.emvTerminalVerificationResults;
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
      this.cvvResultCode = host?.CvvResultCode ?? "";
      this.cvvResultText = host?.CvvResultText ?? "";
      this.cardType = this.toStringValue(payment?.cardType);
      this.paymentType = this.cardType;
      this.entryMethod = this.toStringValue(payment?.cardAcquisition);
      this.cardGroup = this.toStringValue(payment?.cardGroup);
      this.clerkId = this.toStringValue(payment?.clerkId);
      this.invoiceNumber = this.toStringValue(payment?.invoiceNbr);
      this.maskedCardNumber = this.toStringValue(
        payment?.maskedPan ?? payment?.maskedPAN,
      );
      this.directMktInvoiceNbr = this.toStringValue(
        payment?.directMktInvoiceNbr,
      );
      this.directMktShipMonth = this.toStringValue(payment?.directMktShipMonth);
      this.directMktShipDay = this.toStringValue(payment?.directMktShipDay);
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

      // CPC (Card Present Capable) processing indicator
      // Note: processCPC is request-only; device does not echo it in response
      if (
        transaction?.processCPC !== undefined &&
        transaction?.processCPC !== null
      ) {
        this.processCPC = this.toStringValue(transaction.processCPC);
      }

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
        this.taxAmount = this.toNumber(host.taxAmount);
        this.cashBackAmount = this.toNumber(host.cashBackAmount);
        this.authorizedAmount = this.toNumber(host.authorizedAmount);
        this.directMktInvoiceNbr = this.toStringValue(host.directMktInvoiceNbr);
        this.directMktShipMonth = this.toStringValue(host.directMktShipMonth);
        this.directMktShipDay = this.toStringValue(host.directMktShipDay);
        this.preAuthAmount = this.toNumber(host.preAuthAmount);
        this.taxAmount = this.toNumber(host.taxAmount);
        this.transactionAmount = this.toNumber(host.totalAmount) ?? 0;
        this.token = this.toStringValue(host.tokenValue);
        this.tokenResponseCode = this.toStringValue(host.tokenRspCode);
        this.tokenResponseMessage = this.toStringValue(host.tokenRspMsg);

        // Fallback: if baseAmount is missing but we have transactionAmount,
        // use transactionAmount as baseAmount (for refunds and other transaction types
        // where device doesn't return separate baseAmount)
        if (!this.baseAmount && this.transactionAmount) {
          this.baseAmount = this.transactionAmount;
        }

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
        this.cardBIN = this.toStringValue(payment.cardBIN);
        this.panSequenceNumber = this.toStringValue(payment.panSequenceNumber);
      }

      // EMV Tag Mappings for native UPA response
      const emv = responseData?.emv;
      if (emv) {
        this.applicationIdentifier = this.toStringValue(emv["4F"]);
        this.emvApplicationLabel = this.toStringValue(emv["50"]);
        this.emvCardholderName = this.toStringValue(emv["5F20"]);
        this.transactionCurrencyCode = this.toStringValue(emv["5F2A"]);
        this.applicationPAN = this.toStringValue(emv["5F34"]);
        this.applicationAIP = this.toStringValue(emv["82"]);
        this.dedicatedDF = this.toStringValue(emv["84"]);
        this.authorizedResponse = this.toStringValue(emv["8A"]);
        this.emvTerminalVerificationResults = this.toStringValue(emv["95"]);
        this.transactionPIN = this.toStringValue(emv["99"]);
        this.transactionDate = this.toStringValue(emv["9A"]);
        this.transactionTSI = this.toStringValue(emv["9B"]);
        this.transactionTypeEMV = this.toStringValue(emv["9C"]);
        this.amountAuthorised = this.toStringValue(emv["9F02"]);
        this.otherAmount = this.toStringValue(emv["9F03"]);
        this.emvApplicationId = this.toStringValue(emv["9F06"]);
        this.applicationICC = this.toStringValue(emv["9F08"]);
        this.iacDefault = this.toStringValue(emv["9F0D"]);
        this.iacDenial = this.toStringValue(emv["9F0E"]);
        this.iacOnline = this.toStringValue(emv["9F0F"]);
        this.issuerApplicationData = this.toStringValue(emv["9F10"]);
        this.emvApplicationPreferredName = this.toStringValue(emv["9F12"]);
        this.terminalCountryCode = this.toStringValue(emv["9F1A"]);
        this.ifdSerialNumber = this.toStringValue(emv["9F1E"]);
        this.emvApplicationCryptogram = this.toStringValue(emv["9F26"]);
        this.applicationCryptogramType_Tag = this.toStringValue(emv["9F27"]);
        this.terminalCapabilities = this.toStringValue(emv["9F33"]);
        this.cvmResults = this.toStringValue(emv["9F34"]);
        this.cardHolderVerificationMethod = this.toStringValue(emv["9F34"]);
        this.terminalType = this.toStringValue(emv["9F35"]);
        this.applicationTransactionCounter = this.toStringValue(emv["9F36"]);
        this.unpredictableNumber = this.toStringValue(emv["9F37"]);
        this.additionalTerminalCapabilities = this.toStringValue(emv["9F40"]);
        this.transactionSequenceCounter = this.toStringValue(emv["9F41"]);
        this.transactionCategoryCode = this.toStringValue(emv["9F53"]);
        this.tacDefault = this.toStringValue(emv["TacDefault"]);
        this.tacDenial = this.toStringValue(emv["TacDenial"]);
        this.tacOnline = this.toStringValue(emv["TacOnline"]);

        // Fallback to alternate tag names if available
        this.applicationLabel =
          this.applicationLabel || this.emvApplicationLabel;
        this.applicationId = this.applicationId || this.emvApplicationId;
        this.applicationPreferredName =
          this.applicationPreferredName || this.emvApplicationPreferredName;
        this.applicationCryptogram =
          this.applicationCryptogram || this.emvApplicationCryptogram;
        this.terminalVerificationResults =
          this.terminalVerificationResults ||
          this.emvTerminalVerificationResults;
      }
    }
  }

  private isGpApiResponse(jsonResponse: any): boolean {
    return !!(
      jsonResponse.provider && jsonResponse.provider === GatewayProvider.GpApi
    );
  }

  private static checkResponse(jsonResponse: any): void {
    const isGpApi = !!(
      jsonResponse?.provider && jsonResponse.provider === GatewayProvider.GpApi
    );
    const root = isGpApi ? jsonResponse?.response : jsonResponse?.data;
    const cmdResult = root?.cmdResult;

    if (!cmdResult || cmdResult.result !== "Failed") {
      return;
    }

    const errorCode = cmdResult.errorCode;
    const errorMessage = cmdResult.errorMessage;
    const host = root?.data?.host;
    const responseData = {
      ...(root?.data ?? {}),
      ...(errorCode !== undefined ? { errorCode } : {}),
      ...(errorMessage !== undefined ? { errorMessage } : {}),
      ...(host?.responseText !== undefined
        ? { responseText: host.responseText }
        : {}),
    };

    if (host) {
      throw new GatewayError(
        `Unexpected Gateway Response : ${errorCode} - ${errorMessage}`,
        host.gatewayResponseCode,
        host.gatewayResponseMessage,
        host.responseCode,
        host.responseText,
        errorCode,
        errorMessage,
        root,
        responseData,
      );
    }

    throw new GatewayError(
      `Unexpected Device Response : ${errorCode} - ${errorMessage}`,
      errorCode,
      errorMessage,
      undefined,
      undefined,
      errorCode,
      errorMessage,
      root,
      responseData,
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
