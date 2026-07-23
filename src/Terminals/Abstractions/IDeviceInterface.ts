import {
  IDeviceResponse,
  IEODResponse,
  ISAFResponse,
  ITerminalReport,
} from ".";
import { ISignatureResponse } from ".";
import {
  TerminalAuthBuilder,
  TerminalManageBuilder,
  TerminalReportBuilder,
} from "../Builders";
import {
  POSData,
  ProcessingIndicator,
  UpaParam,
  UpaTransactionData,
} from "../../Entities/UPA";

export interface IDeviceInterface {
  ecrId: string;

  lineItem(
    leftText: string,
    rightText?: string,
    runningLeftText?: string,
    runningRightText?: string,
  ): Promise<IDeviceResponse>;

  //region Generic Calls
  authorize(amount?: number): TerminalAuthBuilder;
  capture(amount?: number): TerminalManageBuilder;
  refund(amount?: number): TerminalAuthBuilder;
  refundById(amount: number): TerminalManageBuilder;
  sale(amount?: number): TerminalAuthBuilder;
  verify(): TerminalAuthBuilder;
  void(): TerminalManageBuilder;
  //endregion

  //region Admin
  endOfDay(): Promise<IEODResponse>;
  tokenize(): TerminalAuthBuilder;
  balance(): TerminalAuthBuilder;
  reverse(): TerminalManageBuilder;
  deletePreAuth(): TerminalManageBuilder;
  updateLodginDetail(amount?: number): TerminalManageBuilder;
  startCardTransaction(
    param?: UpaParam,
    indicator?: ProcessingIndicator,
    transData?: UpaTransactionData,
  ): Promise<IDeviceResponse>;
  reboot(): Promise<IDeviceResponse>;
  cancel(): Promise<void>;
  sendStoreAndForward(printSafReports?: boolean): Promise<ISAFResponse>;
  deleteSaf(
    safReferenceNumber?: string,
    tranNo?: string,
  ): Promise<ISAFResponse>;
  getSAFReport(): TerminalReportBuilder<ITerminalReport>;
  getBatchReport(): TerminalReportBuilder<ITerminalReport>;
  getBatchDetails(
    batchId: string,
    printReport?: boolean,
  ): Promise<ITerminalReport>;
  getOpenTabDetails(): TerminalReportBuilder<ITerminalReport>;
  findBatches(): TerminalReportBuilder<ITerminalReport>;
  registerPOS(posData: POSData): Promise<IDeviceResponse>;
  getSignature(
    prompt1: string,
    prompt2?: string,
    displayOption?: number,
  ): Promise<ISignatureResponse>;
  ping(): Promise<IDeviceResponse>;
  //endregion
}
