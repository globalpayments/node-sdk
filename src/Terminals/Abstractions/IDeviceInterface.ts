import { IDeviceResponse } from ".";
import { TerminalAuthBuilder, TerminalManageBuilder } from "../Builders";

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
}
