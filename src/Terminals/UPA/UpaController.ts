import {
  CreditCardData,
  GatewayError,
  GpApiConfig,
  NotImplementedError,
  PaymentMethodType,
  StoredCredentialInitiator,
  TerminalReportType,
  TransactionModifier,
  TransactionType,
  UnsupportedTransactionError,
} from "../../../src";
import { UpaMessageId } from "./Entities/UpaMessageId";
import {
  BatchList,
  BatchReportResponse,
  OpenTabDetailsResponse,
  SafReportResponse,
  TransactionResponse,
  UpaInterface,
  UpaMicInterface,
} from ".";
import {
  ConnectionConfig,
  IDeviceCommInterface,
  IDeviceInterface,
  IDeviceMessage,
  ITerminalReport,
  ITerminalResponse,
} from "..";
import {
  TerminalAuthBuilder,
  TerminalManageBuilder,
  TerminalReportBuilder,
} from "../Builders";
import { DeviceController } from "../DeviceController";
import { ConnectionModes } from "../Enums";
import { TerminalUtils } from "../TerminalUtils";
import { DeviceMessage } from "../DeviceMessage";

export class UpaController extends DeviceController {
  public deviceConfig?: ConnectionConfig;

  constructor(config: ConnectionConfig) {
    super(config);
    this.requestIdProvider = config.requestIdProvider;
  }

  configureInterface(): IDeviceInterface {
    if (this._interface == null) {
      this._interface = new UpaInterface(this);
    }
    return this._interface;
  }
  public manageTransaction(
    builder: TerminalManageBuilder,
  ): Promise<ITerminalResponse> {
    const request = this.buildManageTransaction(builder);

    return this.doTransaction(request);
  }

  public processTransaction(
    builder: TerminalAuthBuilder,
  ): Promise<ITerminalResponse> {
    const request = this.buildProcessTransaction(builder);

    return this.doTransaction(request);
  }

  public async processReport(
    builder: TerminalReportBuilder,
  ): Promise<ITerminalReport> {
    const request = this.buildReportTransaction(builder);
    const response = await this.send(request as DeviceMessage);

    if (!response) {
      throw new GatewayError("No gateway response!");
    }

    switch (builder.reportType) {
      case TerminalReportType.GetSAFReport:
        return new SafReportResponse(response);
      case TerminalReportType.GetBatchReport:
      case TerminalReportType.GetBatchDetails:
        return new BatchReportResponse(response);
      case TerminalReportType.GetOpenTabDetails:
        return new OpenTabDetailsResponse(response);
      case TerminalReportType.FindBatches:
        return new BatchList(response);
      default:
        throw new UnsupportedTransactionError(
          "The selected gateway does not support this report type.",
        );
    }
  }

  private buildManageTransaction(
    builder: TerminalManageBuilder,
  ): IDeviceMessage {
    const transactionType = builder.transactionType;
    const isTipAdjust = this.isTipAdjust(builder);
    const manageBuilder = builder as TerminalManageBuilder &
      Record<string, any>;

    if (
      builder.paymentMethodType != PaymentMethodType.Credit &&
      builder.paymentMethodType != PaymentMethodType.Debit &&
      builder.paymentMethodType != PaymentMethodType.EBT
    ) {
      throw new UnsupportedTransactionError(
        "The supplied payment method type is not supported",
      );
    }
    let requestId = builder.referenceNumber;

    if (!requestId && this.requestIdProvider) {
      requestId = this.requestIdProvider.getRequestId();
    }

    const request: Record<string, any> = {
      message: "MSG",
      data: {},
    };

    const requestData: Record<string, any> = {
      command: this.mapTransactionType(
        transactionType,
        builder.transactionModifier,
      ),
      EcrId: builder.ecrId?.toString(),
      requestId: requestId?.toString(),
    };

    const transactionData: Record<string, any> = {
      transaction: {},
    };

    if (
      builder.clerkId !== undefined &&
      builder.clerkId !== null &&
      transactionType !== TransactionType.Refund
    ) {
      transactionData.params = {
        clerkId: builder.clerkId,
      };
    }

    if (transactionType === TransactionType.Reversal) {
      if (builder.terminalRefNumber !== undefined) {
        transactionData.transaction.tranNo = builder.terminalRefNumber;
      }
      transactionData.transaction.authorizedAmount = this.formatAmount(
        builder.amount,
      );
    } else if (
      transactionType === TransactionType.Delete &&
      builder.transactionModifier === TransactionModifier.DeletePreAuth
    ) {
      transactionData.transaction.referenceNumber = builder.transactionId;
      transactionData.transaction.preAuthAmount = this.formatAmount(
        builder.amount,
      );
    } else if (
      transactionType === TransactionType.Edit &&
      builder.transactionModifier === TransactionModifier.UpdateLodgingDetails
    ) {
      transactionData.transaction.referenceNumber = builder.transactionId;
      transactionData.transaction.amount = this.formatAmount(builder.amount);
    } else if (transactionType === TransactionType.Refund) {
      // Refund should only have totalAmount, no amount or tax fields
      transactionData.transaction.referenceNumber = builder.transactionId;
      transactionData.transaction.totalAmount = this.formatAmount(
        builder.amount,
      );
      transactionData.transaction.invoiceNbr = builder.invoiceNumber;
    } else if (transactionType === TransactionType.Void) {
      // Per UPA spec §12.4.2.1: transaction sub-node accepts ONLY
      //   `tranNo`  (mapped from builder.terminalRefNumber) OR
      //   `referenceNumber` (mapped from builder.transactionId).
      // Both together is spec error VOID004 ("ENTER TRANNO OR
      // REFERENCENUMBER NOT BOTH"); neither is VOID003.
      const hasTranNo =
        builder.terminalRefNumber !== undefined &&
        builder.terminalRefNumber !== null &&
        builder.terminalRefNumber !== "";
      const hasReferenceNumber =
        builder.transactionId !== undefined &&
        builder.transactionId !== null &&
        builder.transactionId !== "";

      if (hasTranNo && hasReferenceNumber) {
        throw new UnsupportedTransactionError(
          "Void accepts either terminalRefNumber (tranNo) or transactionId (referenceNumber), not both (UPA spec §12.4.2, error VOID004).",
        );
      }
      if (!hasTranNo && !hasReferenceNumber) {
        throw new UnsupportedTransactionError(
          "Void requires either terminalRefNumber (tranNo) or transactionId (referenceNumber) (UPA spec §12.4.2, error VOID003).",
        );
      }
      if (hasTranNo) {
        transactionData.transaction.tranNo = builder.terminalRefNumber;
      } else {
        transactionData.transaction.referenceNumber = builder.transactionId;
      }
    } else {
      transactionData.transaction.referenceNumber = builder.transactionId;
      transactionData.transaction.amount = isTipAdjust
        ? undefined
        : this.formatAmount(builder.amount);
      transactionData.transaction.taxAmount = this.formatAmount(
        builder.taxAmount,
      );
      transactionData.transaction.tipAmount = this.formatAmount(
        builder.gratuity,
      );
      transactionData.transaction.taxIndicator = builder.taxIndicator;
      transactionData.transaction.invoiceNbr = builder.invoiceNumber;
      transactionData.transaction.processCPC =
        builder.processCPC !== undefined
          ? builder.processCPC
            ? "1"
            : "0"
          : undefined;
    }

    if (isTipAdjust) {
      transactionData.transaction.tipAmount = this.formatAmount(
        builder.gratuity,
      );
      transactionData.transaction.tranNo = builder.terminalRefNumber;
    }

    if (builder.transactionType === TransactionType.Void) {
      const hasTranNo =
        builder.terminalRefNumber !== undefined &&
        builder.terminalRefNumber !== null;
      const hasRefNum =
        builder.transactionId !== undefined && builder.transactionId !== null;

      if (hasTranNo && hasRefNum) {
        throw new UnsupportedTransactionError(
          "VOID004: Provide either tranNo (terminalRefNumber) or referenceNumber (transactionId) for Void, not both.",
        );
      }
      if (!hasTranNo && !hasRefNum) {
        throw new UnsupportedTransactionError(
          "VOID003: Void requires either tranNo (terminalRefNumber) or referenceNumber (transactionId).",
        );
      }

      transactionData.transaction.tranNo = builder.terminalRefNumber;
    }

    if (builder.transactionType === TransactionType.Capture) {
      transactionData.transaction.amount = this.formatAmount(builder.amount);
    }

    if (builder.taxExempt !== undefined) {
      transactionData.transaction.taxIndicator = builder.taxExempt;
    }

    if (builder.lodgingData) {
      transactionData.lodging = {
        folioNumber: builder.lodgingData.folioNumber,
        stayDuration: manageBuilder.lodgingData?.stayDuration,
        checkInDate: manageBuilder.lodgingData?.checkInDate,
        checkOutDate: manageBuilder.lodgingData?.checkOutDate,
        dailyRate: this.formatAmount(manageBuilder.lodgingData?.dailyRate),
        preferredCustomer: manageBuilder.lodgingData?.preferredCustomer,
        extraChargeTypes: this.buildExtraChargeTypes(
          manageBuilder.lodgingData?.extraChargeTypes,
        ),
        extraChargeTotal: this.formatAmount(
          manageBuilder.lodgingData?.extraChargeTotal,
        ),
      };
    }

    if (
      (transactionType === TransactionType.Reversal ||
        (transactionType === TransactionType.Edit &&
          builder.transactionModifier ===
            TransactionModifier.UpdateLodgingDetails)) &&
      !builder.transactionId
    ) {
      delete transactionData.transaction.referenceNumber;
    }

    const isDedicatedAmountCommand =
      transactionType === TransactionType.Reversal ||
      transactionType === TransactionType.Void ||
      (transactionType === TransactionType.Delete &&
        builder.transactionModifier === TransactionModifier.DeletePreAuth) ||
      (transactionType === TransactionType.Edit &&
        builder.transactionModifier ===
          TransactionModifier.UpdateLodgingDetails) ||
      transactionType === TransactionType.Refund;

    if (!isDedicatedAmountCommand) {
      transactionData.transaction.baseAmount = builder.amount?.toFixed(2);
    }
    requestData.data = transactionData;

    request.data = requestData;

    return TerminalUtils.buildUpaRequest(request);
  }

  private buildProcessTransaction(builder: TerminalAuthBuilder): DeviceMessage {
    const transactionType = builder.transactionType;
    const authBuilder = builder as TerminalAuthBuilder & Record<string, any>;

    if (
      builder.paymentMethodType != PaymentMethodType.Credit &&
      builder.paymentMethodType != PaymentMethodType.Debit &&
      builder.paymentMethodType != PaymentMethodType.EBT &&
      builder.paymentMethodType != PaymentMethodType.Gift
    ) {
      throw new UnsupportedTransactionError(
        "The supplied payment method type is not supported",
      );
    }
    let requestId = builder.referenceNumber;

    if (!requestId && this.requestIdProvider) {
      requestId = this.requestIdProvider.getRequestId();
    }

    const request: Record<string, any> = {
      message: "MSG",
    };

    const requestData: Record<string, any> = {
      command: this.mapTransactionType(
        transactionType,
        builder.transactionModifier,
      ),
      EcrId: builder.ecrId?.toString(),
      requestId: requestId?.toString(),
    };

    // Balance has a flat request — no data.data sub-node at all
    if (transactionType === TransactionType.Balance) {
      if (builder.clerkId !== undefined && builder.clerkId !== null) {
        requestData.params = {
          clerkId: builder.clerkId,
        };
      }

      request.data = requestData;
      return TerminalUtils.buildUpaRequest(request);
    }

    const transactionData: Record<string, any> = {
      params: {
        clerkId: builder.clerkId,
      },
    };

    if (builder.requestMultiUseToken) {
      transactionData.params.tokenRequest = "1";
    }

    if (
      builder.paymentMethod !== null &&
      builder.paymentMethod instanceof CreditCardData &&
      builder.paymentMethod.token !== ""
    ) {
      transactionData.params.tokenValue = builder.paymentMethod.token;
    }

    if (
      builder.requestMultiUseToken &&
      (transactionType == TransactionType.Sale ||
        transactionType == TransactionType.Refund ||
        transactionType == TransactionType.Verify ||
        transactionType == TransactionType.Auth)
    ) {
      const cardOnFileIndicator =
        authBuilder.transactionInitiator ?? authBuilder.cardOnFileIndicator;
      if (cardOnFileIndicator) {
        transactionData.params.cardOnFileIndicator =
          cardOnFileIndicator === StoredCredentialInitiator.CardHolder
            ? StoredCredentialInitiator.CardHolder
            : cardOnFileIndicator;
      }
      const cardBrandTransId =
        authBuilder.cardBrandTransactionId ?? authBuilder.cardBrandTransId;
      if (cardBrandTransId) {
        transactionData.params.cardBrandTransId = cardBrandTransId;
      }
    }
    transactionData.params.lineItemLeft = authBuilder.lineItemLeft;
    transactionData.params.lineItemRight = authBuilder.lineItemRight;
    transactionData.params.timeOut = authBuilder.timeout;
    transactionData.params.merchantDecision = authBuilder.merchantDecision;
    transactionData.params.languageCode = authBuilder.language;

    const acquisitionTypes = authBuilder.acquisitionTypes;
    if (Array.isArray(acquisitionTypes) && acquisitionTypes.length > 0) {
      transactionData.params.acquisitionTypes = acquisitionTypes.join("|");
    }

    if (transactionType === TransactionType.Auth) {
      transactionData.params.invoiceNbr = builder.invoiceNumber;
    }

    if (authBuilder.shippingDate && builder.invoiceNumber !== null) {
      const shippingDate = new Date(authBuilder.shippingDate);
      transactionData.params.directMktInvoiceNbr = builder.invoiceNumber;
      transactionData.params.directMktShipMonth = `${
        shippingDate.getMonth() + 1
      }`.padStart(2, "0");
      transactionData.params.directMktShipDay =
        `${shippingDate.getDate()}`.padStart(2, "0");
    }

    const processingIndicators: Record<string, string> = {};
    if (builder.isQuickChip !== undefined) {
      processingIndicators.quickChip = builder.isQuickChip ? "Y" : "N";
    }
    if (builder.hasCheckLuhn !== undefined) {
      processingIndicators.checkLuhn = builder.hasCheckLuhn ? "Y" : "N";
    }
    if (builder.hasSecurityCode !== undefined) {
      processingIndicators.securityCode = builder.hasSecurityCode ? "Y" : "N";
    }
    if (Object.keys(processingIndicators).length > 0) {
      transactionData.processingIndicators = processingIndicators;
    }

    if (authBuilder.lodging) {
      transactionData.lodging = {
        folioNumber: authBuilder.lodging.folioNumber,
        stayDuration: authBuilder.lodging.stayDuration,
        checkInDate: authBuilder.lodging.checkInDate,
        checkOutDate: authBuilder.lodging.checkOutDate,
        dailyRate: this.formatAmount(authBuilder.lodging.dailyRate),
        preferredCustomer: authBuilder.lodging.preferredCustomer,
        extraChargeTypes: this.buildExtraChargeTypes(
          authBuilder.lodging.extraChargeTypes,
        ),
        extraChargeTotal: this.formatAmount(
          authBuilder.lodging.extraChargeTotal,
        ),
      };
    }

    if (
      transactionType !== TransactionType.Verify &&
      transactionType !== TransactionType.Refund &&
      (transactionType as number) !== (TransactionType.Tokenize as number)
    ) {
      transactionData.transaction = {};
      if (transactionType === TransactionType.Auth) {
        // start line 412 mid
        transactionData.transaction.amount = this.formatAmount(builder.amount);
        transactionData.transaction.preAuthAmount = this.formatAmount(
          authBuilder.preAuthAmount,
        );
      } else if (transactionType === TransactionType.Sale) {
        transactionData.transaction.invoiceNbr = builder.invoiceNumber;
        transactionData.transaction.baseAmount = this.formatAmount(
          builder.amount,
        );
        transactionData.transaction.tipAmount = this.formatAmount(
          builder.gratuity,
        );
        transactionData.transaction.cashBackAmount = this.formatAmount(
          builder.cashBackAmount,
        );
      } else {
        transactionData.transaction.baseAmount = this.formatAmount(
          builder.amount,
        );
        //amount change to baseAmount for tip adjust, cash back amount is not sent for tip adjust
        transactionData.transaction.cashBackAmount = this.formatAmount(
          builder.cashBackAmount,
        );
        transactionData.transaction.tipAmount = this.formatAmount(
          builder.gratuity,
        );

        transactionData.transaction.taxIndicator = builder.taxExempt;
        transactionData.transaction.invoiceNbr = builder.invoiceNumber;
        transactionData.transaction.processCPC =
          authBuilder.processCPC !== undefined
            ? authBuilder.processCPC
              ? "1"
              : "0"
            : undefined;
        transactionData.transaction.taxAmount = this.formatAmount(
          builder.taxAmount,
        );
      }

      transactionData.transaction.referenceNumber = builder.terminalRefNumber;

      transactionData.transaction.prescriptionAmount = this.formatAmount(
        authBuilder.prescriptionAmount,
      );
      transactionData.transaction.clinicAmount = this.formatAmount(
        authBuilder.clinicAmount,
      );
      transactionData.transaction.dentalAmount = this.formatAmount(
        authBuilder.dentalAmount,
      );
      transactionData.transaction.visionOpticalAmount = this.formatAmount(
        authBuilder.visionOpticalAmount,
      );
      transactionData.transaction.cardAcquisition = authBuilder.cardAcquisition;

      if (authBuilder.transactionDate) {
        transactionData.transaction.tranDate =
          `${authBuilder.transactionDate.getMonth() + 1}`.padStart(2, "0") +
          `${authBuilder.transactionDate.getDate()}`.padStart(2, "0") +
          authBuilder.transactionDate.getFullYear();
        transactionData.transaction.tranTime = [
          authBuilder.transactionDate.getHours(),
          authBuilder.transactionDate.getMinutes(),
          authBuilder.transactionDate.getSeconds(),
        ]
          .map((value) => String(value).padStart(2, "0"))
          .join(":");
      }
    }

    if (transactionType === TransactionType.Refund) {
      transactionData.transaction ??= {};
      transactionData.transaction.totalAmount = this.formatAmount(
        builder.amount,
      );
      transactionData.transaction.invoiceNbr = builder.invoiceNumber;
      // Use transactionId if available (refund by transaction ID), otherwise use terminalRefNumber
      if (builder.paymentMethod?.transactionId) {
        transactionData.transaction.referenceNumber =
          builder.paymentMethod.transactionId;
      } else {
        transactionData.transaction.referenceNumber = builder.terminalRefNumber;
      }
    }

    requestData.data = transactionData;

    request.data = requestData;

    return TerminalUtils.buildUpaRequest(request);
  }

  private buildReportTransaction(
    builder: TerminalReportBuilder,
  ): IDeviceMessage {
    const requestId = this.requestIdProvider?.getRequestId();

    const request: Record<string, any> = {
      message: "MSG",
      data: {
        command: this.mapReportType(builder.reportType),
        EcrId: builder.ecrId ?? (this._interface as any)?.ecrId,
        requestId: requestId?.toString(),
      },
    };

    if (builder.reportType === TerminalReportType.GetOpenTabDetails) {
      return TerminalUtils.buildUpaRequest(request);
    }

    const params: Record<string, any> = {};
    if (builder.reportOutput) {
      params.reportOutput = builder.reportOutput;
    }
    if (builder.batch) {
      params.batch = builder.batch;
    }
    if (
      builder.background &&
      builder.reportType === TerminalReportType.GetSAFReport
    ) {
      params.background = builder.background;
    }
    if (
      builder.printReportType &&
      (builder.reportType === TerminalReportType.GetBatchDetails ||
        builder.reportType === TerminalReportType.GetBatchReport ||
        builder.reportType === TerminalReportType.GetSAFReport)
    ) {
      params.reportType = builder.printReportType;
    }
    // === TYP Report Extra Fields ===
    if (builder.reportTypeValue) {
      params.reportType = builder.reportTypeValue;
    }
    if (builder.reportSubType) {
      params.reportSubType = builder.reportSubType;
    }
    if (builder.bothReports !== undefined) {
      params.bothReports = builder.bothReports ? "1" : "0";
    }
    if (builder.clerkId) {
      params.clerkId = builder.clerkId;
    }
    if (builder.previousBatchReport !== undefined) {
      params.previousBatchReport = builder.previousBatchReport ? "1" : "0";
    }

    if (Object.keys(params).length > 0) {
      request.data.data = { params };
    }

    return TerminalUtils.buildUpaRequest(request);
  }

  private mapTransactionType(
    type: TransactionType,
    modifier?: TransactionModifier,
  ) {
    switch (type) {
      case TransactionType.Sale:
        return UpaMessageId.SALE;
      case TransactionType.Auth:
        return UpaMessageId.PRE_AUTH;
      case TransactionType.Capture:
        return UpaMessageId.AUTH_COMPLETION;
      case TransactionType.Refund:
        return UpaMessageId.REFUND;
      case TransactionType.Verify:
        return UpaMessageId.CARD_VERIFY;
      case TransactionType.Void:
        return UpaMessageId.VOID;
      case TransactionType.Tokenize:
        return UpaMessageId.TOKENIZE;
      case TransactionType.Balance:
        return UpaMessageId.BALANCE_INQUIRY;
      case TransactionType.Reversal:
        return UpaMessageId.REVERSAL;
      case TransactionType.Edit:
        if (modifier === TransactionModifier.UpdateLodgingDetails) {
          return UpaMessageId.UPDATE_LODGING_DETAILS;
        }
        return UpaMessageId.TIPADJUST;
      case TransactionType.Delete:
        if (modifier === TransactionModifier.DeletePreAuth) {
          return UpaMessageId.DELETE_PRE_AUTH;
        }
        throw new UnsupportedTransactionError(
          "Delete transaction requires TransactionModifier.DeletePreAuth.",
        );
      default:
        throw new UnsupportedTransactionError(
          "The selected gateway does not support this transaction type.",
        );
    }
  }

  private mapReportType(type: TerminalReportType): UpaMessageId {
    switch (type) {
      case TerminalReportType.GetSAFReport:
        return UpaMessageId.GET_SAF_REPORT;
      case TerminalReportType.GetBatchReport:
        return UpaMessageId.GET_BATCH_REPORT;
      case TerminalReportType.GetBatchDetails:
        return UpaMessageId.GET_BATCH_DETAILS;
      case TerminalReportType.GetOpenTabDetails:
        return UpaMessageId.GET_OPEN_TAB_DETAILS;
      case TerminalReportType.FindBatches:
        return UpaMessageId.AVAILABLE_BATCHES;
      default:
        throw new UnsupportedTransactionError(
          "The selected gateway does not support this report type.",
        );
    }
  }

  /**
   * Override DeviceController.send() to delegate to the connector.
   * Mock responses are handled inside UpaMicInterface.send().
   */
  public send(message: DeviceMessage, requestType?: UpaMessageId): any {
    return super.send(message, requestType);
  }

  private async doTransaction(
    request: IDeviceMessage,
  ): Promise<TransactionResponse> {
    const response = await this.send(request as DeviceMessage);
    if (!response) {
      throw new GatewayError("No gateway response!");
    }
    return new TransactionResponse(response);
  }

  private formatAmount(value?: number): string | undefined {
    return value !== undefined && value !== null ? value.toFixed(2) : undefined;
  }

  private buildExtraChargeTypes(
    extraChargeTypes?: number[],
  ): number[] | undefined {
    if (!extraChargeTypes || extraChargeTypes.length === 0) {
      return undefined;
    }

    const chargeTypes = new Array(10).fill(0);
    extraChargeTypes.forEach((value) => {
      if (value > 0 && value <= chargeTypes.length) {
        chargeTypes[value - 1] = 1;
      }
    });

    return chargeTypes;
  }

  private isTipAdjust(builder: TerminalManageBuilder): boolean {
    return (
      builder.transactionType === TransactionType.Edit &&
      builder.gratuity !== undefined &&
      builder.gratuity !== null
    );
  }

  public configureConnector(): IDeviceCommInterface {
    switch (this._settings.connectionMode) {
      case ConnectionModes.HTTP:
      case ConnectionModes.SERIAL:
      case ConnectionModes.SSL_TCP:
      case ConnectionModes.MEET_IN_THE_CLOUD:
        if (this._settings.gatewayConfig instanceof GpApiConfig) {
          return new UpaMicInterface(this._settings);
        }
      case ConnectionModes.TCP_IP:
      default:
        throw new NotImplementedError();
    }
  }
}
