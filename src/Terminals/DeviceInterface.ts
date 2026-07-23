/* eslint-disable indent */
import {
  ISAFResponse,
  ITerminalReport,
  PaymentMethodType,
  TransactionType,
  UnsupportedTransactionError,
} from "../../src";
import {
  IDeviceInterface,
  IDeviceResponse,
  IEODResponse,
  IRequestIdProvider,
} from ".";
import { DeviceController } from "./DeviceController";
import {
  TerminalAuthBuilder,
  TerminalManageBuilder,
  TerminalReportBuilder,
} from "./Builders";
export abstract class DeviceInterface<T extends DeviceController>
  implements IDeviceInterface
{
  public controller: DeviceController;
  public requestIdProvider?: IRequestIdProvider;
  public ecrId!: string;

  constructor(controller: T) {
    this.controller = controller;
    this.requestIdProvider = controller.requestIdProvider;
  }

  public async lineItem(
    leftText: string,
    rightText?: string,
    runningLeftText?: string,
    runningRightText?: string,
  ): Promise<IDeviceResponse> {
    // TODO add DeviceResponse
    leftText; // lint handling
    rightText; // lint handling
    runningLeftText; // lint handling
    runningRightText; // lint handling
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  /**********START Transactions ************/

  /**
   * @return TerminalAuthBuilder
   */

  public authorize(amount?: number): TerminalAuthBuilder {
    return new TerminalAuthBuilder(
      TransactionType.Auth,
      PaymentMethodType.Credit,
    ).withAmount(amount);
  }

  public capture(amount: number): TerminalManageBuilder {
    return new TerminalManageBuilder(
      TransactionType.Capture,
      PaymentMethodType.Credit,
    ).withAmount(amount);
  }

  public refund(amount?: number): TerminalAuthBuilder {
    return new TerminalAuthBuilder(
      TransactionType.Refund,
      PaymentMethodType.Credit,
    ).withAmount(amount);
  }

  public refundById(amount: number): TerminalManageBuilder {
    return new TerminalManageBuilder(
      TransactionType.Refund,
      PaymentMethodType.Credit,
    ).withAmount(amount);
  }

  public sale(amount?: number): TerminalAuthBuilder {
    return new TerminalAuthBuilder(
      TransactionType.Sale,
      PaymentMethodType.Credit,
    ).withAmount(amount);
  }

  public verify(): TerminalAuthBuilder {
    return new TerminalAuthBuilder(
      TransactionType.Verify,
      PaymentMethodType.Credit,
    );
  }

  public void(): TerminalManageBuilder {
    return new TerminalManageBuilder(
      TransactionType.Void,
      PaymentMethodType.Credit,
    );
  }

  public endOfDay(): Promise<IEODResponse> {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public tokenize(): TerminalAuthBuilder {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public balance(): TerminalAuthBuilder {
    return new TerminalAuthBuilder(
      TransactionType.Balance,
      PaymentMethodType.Gift,
    );
  }

  public reverse(): TerminalManageBuilder {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public deletePreAuth(): TerminalManageBuilder {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public updateLodginDetail(_amount?: number): TerminalManageBuilder {
    void _amount;
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public startCardTransaction(
    _param?: any,
    _indicator?: any,
    _transData?: any,
  ): Promise<IDeviceResponse> {
    void _param;
    void _indicator;
    void _transData;
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public reboot(): Promise<IDeviceResponse> {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public cancel(): Promise<void> {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public sendStoreAndForward(
    _printSafReports?: boolean,
  ): Promise<ISAFResponse> {
    void _printSafReports;
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public deleteSaf(
    _safReferenceNumber?: string,
    _tranNo?: string,
  ): Promise<ISAFResponse> {
    void _safReferenceNumber;
    void _tranNo;
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public getSAFReport(): TerminalReportBuilder<ITerminalReport> {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public getBatchReport(): TerminalReportBuilder<ITerminalReport> {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public getBatchDetails(
    _batchId: string,
    _printReport = false,
  ): Promise<ITerminalReport> {
    void _batchId;
    void _printReport;
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public getOpenTabDetails(): TerminalReportBuilder<ITerminalReport> {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public findBatches(): TerminalReportBuilder<ITerminalReport> {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public registerPOS(_posData: any): Promise<IDeviceResponse> {
    void _posData;
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public getSignature(_transactionId: string): Promise<IDeviceResponse> {
    void _transactionId;
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }

  public ping(): Promise<IDeviceResponse> {
    throw new UnsupportedTransactionError(
      "This is not supported by the currently configured device.",
    );
  }
}
