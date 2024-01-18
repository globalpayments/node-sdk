/* eslint-disable indent */
import {
  PaymentMethodType,
  TransactionType,
  UnsupportedTransactionError,
} from "../../src";
import { IDeviceInterface, IDeviceResponse, IRequestIdProvider } from ".";
import { DeviceController } from "./DeviceController";
import { TerminalAuthBuilder, TerminalManageBuilder } from "./Builders";
export abstract class DeviceInterface<T extends DeviceController>
  implements IDeviceInterface
{
  public controller: DeviceController;
  public requestIdProvider: IRequestIdProvider;

  public ecrId: string;

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
}
