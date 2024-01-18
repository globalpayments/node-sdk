import {
  ApiError,
  IDeviceResponse,
  PaymentMethodType,
  TransactionType,
} from "../../../src";
import {
  TransactionResponse,
  UpaController,
  UpaMessageId,
  UpaMessageType,
} from ".";
import { TerminalManageBuilder } from "../Builders";
import { DeviceInterface } from "../DeviceInterface";
import { TerminalUtils } from "../TerminalUtils";

export class UpaInterface<T extends UpaController>
  extends DeviceInterface<UpaController>
  implements DeviceInterface<UpaController>
{
  constructor(private readonly upaController: T) {
    super(upaController);
  }

  tipAdjust(amount: number): TerminalManageBuilder {
    return new TerminalManageBuilder(
      TransactionType.Edit,
      PaymentMethodType.Credit,
    ).WithGratuity(amount);
  }

  public async lineItem(
    leftText: string,
    rightText?: string,
  ): Promise<IDeviceResponse> {
    if (!leftText) {
      throw new ApiError("Line item left text cannot be null");
    }

    const requestId = this.upaController.requestIdProvider.getRequestId();
    const data = {
      params: {
        lineItemLeft: leftText,
        lineItemRight: rightText || undefined,
      },
    };

    const requestMessage = {
      message: UpaMessageType.MSG,
      data: {
        command: UpaMessageId.LINEITEM,
        requestId: requestId,
        ecrId: /** builder.ecrId || 12 */ 12,
        data,
      },
    };

    const message = TerminalUtils.buildUpaRequest(requestMessage);
    const rawResponse = await this.upaController.send(
      message,
      UpaMessageId.LINEITEM,
    );
    return new TransactionResponse(rawResponse);
  }
}
