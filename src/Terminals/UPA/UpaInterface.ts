import {
  ArgumentError,
  ApiError,
  IDeviceResponse,
  IEODResponse,
  ISAFResponse,
  ISignatureResponse,
  PaymentMethodType,
  POSData,
  ReportOutput,
  TerminalReportType,
  TransactionModifier,
  TransactionType,
  UnsupportedTransactionError,
} from "../../../src";
import {
  BatchList,
  BatchReportResponse,
  OpenTabDetailsResponse,
  SafReportResponse,
  TransactionResponse,
  UpaController,
  UpaEODResponse,
  UpaGiftCardResponse,
  UpaMessageId,
  UpaMessageType,
  UpaSAFResponse,
  UpaSearchCriteria,
  UpaSignatureResponse,
} from ".";
import {
  TerminalAuthBuilder,
  TerminalManageBuilder,
  TerminalReportBuilder,
} from "../Builders";
import { CardTypeFilter } from "../../Entities/Enums/CardTypeFilter";
import { ScanData } from "../../Entities/UPA/ScanData";
import { DeviceInterface } from "../DeviceInterface";
import { TerminalUtils } from "../TerminalUtils";
import { UpaParam } from "../../Entities/UPA/UpaParam";
import { ProcessingIndicator } from "../../Entities/UPA/ProcessIndicator";
import { UpaTransactionData } from "../../Entities/UPA/UpaTransactionData";

export class UpaInterface<T extends UpaController>
  extends DeviceInterface<UpaController>
  implements DeviceInterface<UpaController>
{
  constructor(private readonly upaController: T) {
    super(upaController);
  }

  private getUpaTransactionTypeValue(
    transactionType?: TransactionType | string,
  ): string | undefined {
    if (transactionType === undefined || transactionType === null) {
      return undefined;
    }

    if (typeof transactionType === "string") {
      return transactionType;
    }

    return TransactionType[transactionType] ?? transactionType.toString();
  }

  public tipAdjust(amount: number): TerminalManageBuilder {
    return new TerminalManageBuilder(
      TransactionType.Edit,
      PaymentMethodType.Credit,
    ).withGratuity(amount);
  }

  public tokenize(): TerminalAuthBuilder {
    return new TerminalAuthBuilder(
      TransactionType.Tokenize,
      PaymentMethodType.Credit,
    );
  }

  public async endOfDay(): Promise<IEODResponse> {
    const requestId = this.upaController.requestIdProvider.getRequestId();
    const request = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.EOD,
        EcrId: this.ecrId,
        requestId: requestId.toString(),
      },
    };
    const message = TerminalUtils.buildUpaRequest(request);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.EOD,
    );
    return new UpaEODResponse(rawResponse);
  }

  public async sendStoreAndForward(
    printSafReports?: boolean,
  ): Promise<ISAFResponse> {
    const requestId = this.upaController.requestIdProvider.getRequestId();
    const params =
      printSafReports === undefined
        ? undefined
        : { PrintSAFReports: printSafReports ? "true" : "false" };
    const request = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.SENDSAF,
        EcrId: this.ecrId,
        requestId: requestId.toString(),
        data: params ? { params } : undefined,
      },
    };
    const message = TerminalUtils.buildUpaRequest(request);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.SENDSAF,
    );
    if (rawResponse && typeof rawResponse === "object") {
      rawResponse.requestType = UpaMessageId.SENDSAF;
    }
    return new UpaSAFResponse(rawResponse);
  }

  public async getSignature(
    prompt1: string,
    prompt2?: string,
    displayOption?: number,
  ): Promise<ISignatureResponse> {
    const requestId = this.upaController.requestIdProvider.getRequestId();
    const params: Record<string, any> = { prompt1 };
    if (prompt2) {
      params.prompt2 = prompt2;
    }
    if (displayOption !== undefined) {
      params.displayOption = displayOption;
    }

    const request = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.GET_SIGNATURE,
        EcrId: this.ecrId,
        requestId: requestId.toString(),
        data: {
          params,
        },
      },
    };
    const message = TerminalUtils.buildUpaRequest(request);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.GET_SIGNATURE,
    );
    return new UpaSignatureResponse(rawResponse);
  }

  public async scan(scanData?: ScanData): Promise<IDeviceResponse> {
    const requestId = this.upaController.requestIdProvider.getRequestId();
    const innerData: Record<string, any> = {};

    if (scanData) {
      const params: Record<string, any> = {};
      if (scanData.header) {
        params.header = scanData.header.toUpperCase();
      }
      if (scanData.prompt1) {
        params.prompt1 = scanData.prompt1.toUpperCase();
      }
      if (scanData.prompt2) {
        params.prompt2 = scanData.prompt2.toUpperCase();
      }
      if (scanData.displayOption !== undefined) {
        params.displayOption = scanData.displayOption;
      }
      if (scanData.timeOut !== undefined) {
        params.timeOut = scanData.timeOut;
      }
      if (Object.keys(params).length > 0) {
        innerData.params = params;
      }
    }

    const request: Record<string, any> = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.SCAN,
        EcrId: this.ecrId,
        requestId: requestId.toString(),
      },
    };

    if (Object.keys(innerData).length > 0) {
      request.data.data = innerData;
    }

    const message = TerminalUtils.buildUpaRequest(request);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.SCAN,
    );
    return new TransactionResponse(rawResponse);
  }

  public async ping(): Promise<IDeviceResponse> {
    const requestId = this.upaController.requestIdProvider.getRequestId();
    const request = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.PING,
        EcrId: this.ecrId,
        requestId: requestId.toString(),
      },
    };
    const message = TerminalUtils.buildUpaRequest(request);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.PING,
    );
    return new TransactionResponse(rawResponse);
  }

  public async reboot(): Promise<IDeviceResponse> {
    const requestId = this.upaController.requestIdProvider.getRequestId();
    const request = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.REBOOT,
        EcrId: this.ecrId,
        requestId: requestId.toString(),
      },
    };
    const message = TerminalUtils.buildUpaRequest(request);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.REBOOT,
    );
    return new TransactionResponse(rawResponse);
  }

  public async lineItem(
    leftText: string,
    rightText?: string,
  ): Promise<IDeviceResponse> {
    if (!leftText) {
      throw new ApiError("Line item left text cannot be null");
    }

    const requestId = this.upaController.requestIdProvider.getRequestId();
    const request = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.LINEITEM,
        requestId: requestId.toString(),
        EcrId: this.ecrId ?? "12",
        data: {
          params: {
            lineItemLeft: leftText,
            lineItemRight: rightText,
          },
        },
      },
    };

    const message = TerminalUtils.buildUpaRequest(request);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.LINEITEM,
    );
    return new TransactionResponse(rawResponse);
  }

  public balance(): TerminalAuthBuilder {
    return new TerminalAuthBuilder(
      TransactionType.Balance,
      PaymentMethodType.Gift,
    );
  }

  public reverse(): TerminalManageBuilder {
    return new TerminalManageBuilder(
      TransactionType.Reversal,
      PaymentMethodType.Credit,
    );
  }

  public deletePreAuth(): TerminalManageBuilder {
    return new TerminalManageBuilder(
      TransactionType.Delete,
      PaymentMethodType.Credit,
    ).withModifier(TransactionModifier.DeletePreAuth);
  }

  public updateLodginDetail(amount?: number): TerminalManageBuilder {
    const builder = new TerminalManageBuilder(
      TransactionType.Edit,
      PaymentMethodType.Credit,
    ).withModifier(TransactionModifier.UpdateLodgingDetails);

    if (amount !== undefined) {
      builder.withAmount(amount);
    }

    return builder;
  }

  public async startCardTransaction(
    param?: UpaParam,
    indicator?: ProcessingIndicator,
    transData?: UpaTransactionData,
  ): Promise<IDeviceResponse> {
    if (
      !Array.isArray(param?.acquisitionTypes) ||
      param?.acquisitionTypes.length === 0
    ) {
      throw new ArgumentError(
        "acquisitionTypes is required for startCardTransaction",
      );
    }

    if (
      transData?.totalAmount === undefined ||
      typeof transData.totalAmount !== "number" ||
      !Number.isFinite(transData.totalAmount) ||
      transData.totalAmount < 0
    ) {
      throw new ArgumentError(
        "totalAmount must be a non-negative number for startCardTransaction",
      );
    }

    const cardTypeFilters: CardTypeFilter[] = Array.isArray(
      indicator?.CardTypeFilter,
    )
      ? indicator?.CardTypeFilter ?? []
      : indicator?.CardTypeFilter !== undefined
      ? [indicator.CardTypeFilter]
      : [];

    if (
      cardTypeFilters.some(
        (cardTypeFilter: string) =>
          !Object.values(CardTypeFilter).includes(
            cardTypeFilter as CardTypeFilter,
          ),
      )
    ) {
      throw new ArgumentError(
        "cardTypeFilter must contain only supported card types for startCardTransaction",
      );
    }

    const requestId = this.upaController.requestIdProvider.getRequestId();
    const innerData: Record<string, any> = {};

    if (param) {
      innerData.params = {
        timeOut: param.timeout,
        acquisitionTypes:
          param.acquisitionTypes?.length > 0
            ? param.acquisitionTypes.join("|")
            : undefined,
        header: param.header,
        displayTotalAmount:
          param.displayTotalAmount === "Yes"
            ? "Y"
            : param.displayTotalAmount === "No"
            ? "N"
            : param.displayTotalAmount,
        PromptForManualEntryPassword: param.promptForManual ? 1 : 0,
        brandIcon1: param.brandIcon1,
        brandIcon2: param.brandIcon2,
      };
    }

    if (indicator) {
      innerData.processingIndicators = {
        quickChip: indicator.QuickChip,
        checkLuhn: indicator.CheckLuhn,
        securityCode: indicator.SecurityCode,
        ...(cardTypeFilters.length > 0 && {
          cardTypeFilter: cardTypeFilters.join("|"),
        }),
      };
    }

    if (transData) {
      // UpaTransactionData.tranDate / tranTime are typed as `Date | string`
      // so callers can either supply a Date (which we format to the UPA
      // wire format below) or a pre-formatted string that we pass through.
      const formatDate = (date: Date | string) => {
        if (typeof date === "string") {
          return date;
        }
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${month}${day}${date.getFullYear()}`;
      };
      const formatTime = (date: Date | string) => {
        if (typeof date === "string") {
          return date;
        }
        return [date.getHours(), date.getMinutes(), date.getSeconds()]
          .map((value) => String(value).padStart(2, "0"))
          .join(":");
      };

      innerData.transaction = {
        totalAmount: transData.totalAmount?.toFixed(2),
        cashBackAmount: transData.cashBackAmount?.toFixed(2),
        tranDate: transData.tranDate
          ? formatDate(transData.tranDate)
          : undefined,
        tranTime: transData.tranTime
          ? formatTime(transData.tranTime)
          : undefined,
        transactionType: this.getUpaTransactionTypeValue(transData.transType),
      };
    }

    const request = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.START_CARD_TRANSACTION,
        EcrId: this.ecrId,
        requestId: requestId.toString(),
        data: innerData,
      },
    };
    const message = TerminalUtils.buildUpaRequest(request);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.START_CARD_TRANSACTION,
    );
    return new UpaGiftCardResponse(rawResponse);
  }

  public async cancel(): Promise<void> {
    const requestId = this.upaController.requestIdProvider.getRequestId();
    const request = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.CANCEL,
        EcrId: this.ecrId,
        requestId: requestId.toString(),
      },
    };

    const message = TerminalUtils.buildUpaRequest(request);
    await this.upaController.send(message, UpaMessageId.CANCEL);
  }

  public async deleteSaf(
    safReferenceNumber?: string,
    tranNo?: string,
  ): Promise<ISAFResponse> {
    const requestId = this.upaController.requestIdProvider.getRequestId();
    const transaction: Record<string, any> = {};

    if (tranNo) {
      transaction.tranNo = tranNo;
    }
    if (safReferenceNumber) {
      transaction.referenceNumber = safReferenceNumber;
    }

    const request = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.DELETE_SAF,
        EcrId: this.ecrId,
        requestId: requestId.toString(),
        data: {
          transaction,
        },
      },
    };

    const message = TerminalUtils.buildUpaRequest(request);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.DELETE_SAF,
    );
    if (rawResponse && typeof rawResponse === "object") {
      rawResponse.requestType = UpaMessageId.DELETE_SAF;
    }
    return new UpaSAFResponse(rawResponse);
  }

  public getSAFReport(): TerminalReportBuilder<SafReportResponse> {
    return new TerminalReportBuilder<SafReportResponse>(
      TerminalReportType.GetSAFReport,
    );
  }

  public getBatchReport(): TerminalReportBuilder<BatchReportResponse> {
    return new TerminalReportBuilder<BatchReportResponse>(
      TerminalReportType.GetBatchReport,
    );
  }

  public async getBatchDetails(
    batchId: string,
    printReport = false,
  ): Promise<BatchReportResponse> {
    const builder = new TerminalReportBuilder<BatchReportResponse>(
      TerminalReportType.GetBatchDetails,
    ).where(UpaSearchCriteria.Batch, batchId);

    if (printReport) {
      builder.and(
        UpaSearchCriteria.ReportOutput,
        `${ReportOutput.Print}|${ReportOutput.ReturnData}`,
      );
    }

    return builder.execute();
  }

  public getOpenTabDetails(): TerminalReportBuilder<OpenTabDetailsResponse> {
    return new TerminalReportBuilder<OpenTabDetailsResponse>(
      TerminalReportType.GetOpenTabDetails,
    );
  }

  public findBatches(): TerminalReportBuilder<BatchList> {
    return new TerminalReportBuilder<BatchList>(TerminalReportType.FindBatches);
  }

  public async registerPOS(posData: POSData): Promise<IDeviceResponse> {
    if (!posData?.appName) {
      throw new UnsupportedTransactionError(
        "appName is a mandatory parameter.",
      );
    }

    const requestId = this.upaController.requestIdProvider.getRequestId();
    const params: Record<string, any> = {
      appName: posData.appName,
    };
    if (posData.launchOrder && posData.launchOrder > 0) {
      params.launchOrder = posData.launchOrder.toString();
    }
    if (posData.remove !== undefined) {
      params.remove = posData.remove ? "true" : "false";
    }
    if (posData.silent !== undefined && posData.silent !== 0) {
      params.silent = posData.silent.toString();
    }

    const request = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.REGISTER_POS,
        EcrId: this.ecrId,
        requestId: requestId.toString(),
        data: {
          params,
        },
      },
    };

    const message = TerminalUtils.buildUpaRequest(request);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.REGISTER_POS,
    );
    return new TransactionResponse(rawResponse);
  }
}
