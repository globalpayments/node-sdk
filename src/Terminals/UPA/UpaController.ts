import {
  CreditCardData,
  GatewayError,
  GpApiConfig,
  NotImplementedError,
  PaymentMethodType,
  StoredCredentialInitiator,
  TransactionType,
  UnsupportedTransactionError,
} from "../../../src";
import {
  TransactionResponse,
  UpaInterface,
  UpaMessageId,
  UpaMicInterface,
} from ".";
import {
  ConnectionConfig,
  IDeviceCommInterface,
  IDeviceInterface,
  IDeviceMessage,
  ITerminalResponse,
} from "..";
import { TerminalAuthBuilder, TerminalManageBuilder } from "../Builders";
import { DeviceController } from "../DeviceController";
import { ConnectionModes } from "../Enums";
import { TerminalUtils } from "../TerminalUtils";
import { DeviceMessage } from "../DeviceMessage";

export class UpaController extends DeviceController {
  public deviceConfig: ConnectionConfig;

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

  private buildManageTransaction(
    builder: TerminalManageBuilder,
  ): IDeviceMessage {
    const transactionType = builder.transactionType;

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
      command: this.mapTransactionType(transactionType),
      ecrId: builder.ecrId,
      requestId: requestId.toString(),
    };

    const transactionData: Record<string, any> = {
      params: {
        clerkId: builder.clerkId,
      },
      transaction: {},
    };

    transactionData.transaction.referenceNumber = builder.transactionId;

    transactionData.transaction.amount = builder.amount?.toFixed(2);
    transactionData.transaction.taxAmount = builder.taxAmount;
    transactionData.transaction.tipAmount = builder.tipAmount;
    transactionData.transaction.taxIndicator = builder.taxIndicator;
    transactionData.transaction.invoiceNbr = builder.invoiceNumber;
    transactionData.transaction.processCPC = builder.processCPC;

    requestData.data = transactionData;

    request.data = requestData;

    return TerminalUtils.buildUpaRequest(request);
  }

  private buildProcessTransaction(builder: TerminalAuthBuilder): DeviceMessage {
    const transactionType = builder.transactionType;

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
    };

    const requestData: Record<string, any> = {
      command: this.mapTransactionType(transactionType),
      ecrId: builder.ecrId?.toString(),
      requestId: requestId.toString(),
    };

    const transactionData: Record<string, any> = {
      params: {
        clerkId: builder.clerkId,
      },
      transaction: {},
    };

    if (!this.isTokenRequestApplicable(transactionType)) {
      transactionData.params.tokenRequest = builder.requestMultiUseToken
        ? "1"
        : "0";
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
      if (builder.cardOnFileIndicator) {
        transactionData.params.cardOnFileIndicator =
          StoredCredentialInitiator.CardHolder ? "C" : "M";
      }
      if (builder.cardBrandTransId !== "") {
        transactionData.params.cardBrandTransId = builder.cardBrandTransId;
      }
    }
    transactionData.params.lineItemLeft = builder.lineItemLeft;
    transactionData.params.lineItemRight = builder.lineItemRight;

    if (transactionType === TransactionType.Auth) {
      transactionData.params.invoiceNbr = builder.invoiceNumber;
    }

    if (builder.shippingDate && builder.invoiceNumber !== null) {
      transactionData.params.directMktInvoiceNbr = builder.invoiceNumber;
      transactionData.params.directMktShipMonth = new Date(
        builder.shippingDate,
      ).getMonth();
      transactionData.params.directMktShipDay = new Date(
        builder.shippingDate,
      ).getDay();
    }

    if (
      transactionType != TransactionType.Verify &&
      transactionType != TransactionType.Refund &&
      // @ts-ignore
      transactionType != TransactionType.Tokenize
    ) {
      if (transactionType === TransactionType.Auth) {
        transactionData.transaction.amount = builder.amount?.toFixed(2);
        transactionData.transaction.preAuthAmount =
          builder.preAuthAmount?.toString(2);
      } else {
        transactionData.transaction.amount = builder.amount?.toFixed(2);
        transactionData.transaction.cashBackAmount =
          builder.cashBackAmount?.toFixed(2);
        transactionData.transaction.tipAmount = builder.gratuity?.toFixed(2);
        transactionData.transaction.taxIndicator = builder.taxExempt;
        transactionData.transaction.invoiceNbr = builder.invoiceNumber;
        transactionData.transaction.processCPC = builder.processCPC;
        transactionData.transaction.taxAmount = builder.taxAmount;
      }

      transactionData.transaction.referenceNumber = builder.terminalRefNumber;

      transactionData.transaction.prescriptionAmount =
        builder.prescriptionAmount?.toFixed(2);
      transactionData.transaction.clinicAmount =
        builder.clinicAmount?.toFixed(2);
      transactionData.transaction.dentalAmount =
        builder.dentalAmount?.toFixed(2);
      transactionData.transaction.visionOpticalAmount =
        builder.visionOpticalAmount?.toFixed(2);
      transactionData.transaction.cardAcquisition =
        StoredCredentialInitiator.CardHolder ? "C" : "M";
    }

    if (transactionType === TransactionType.Refund) {
      transactionData.transaction.totalAmount = builder.amount?.toFixed(2);
      transactionData.transaction.invoiceNbr = builder.invoiceNumber;
      transactionData.transaction.referenceNumber = builder.terminalRefNumber;
    }

    requestData.data = transactionData;

    request.data = requestData;

    return TerminalUtils.buildUpaRequest(request);
  }

  private isTokenRequestApplicable(transactionType: TransactionType) {
    switch (transactionType) {
      case TransactionType.Refund:
        return true;
      default:
        return false;
    }
  }

  private mapTransactionType(type: TransactionType) {
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
      default:
        throw new UnsupportedTransactionError(
          "The selected gateway does not support this transaction type.",
        );
    }
  }

  private async doTransaction(
    request: IDeviceMessage,
  ): Promise<TransactionResponse> {
    const response = await this.connector.send(request);
    if (!response) {
      throw new GatewayError("No gateway response!");
    }

    return new TransactionResponse(response);
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
