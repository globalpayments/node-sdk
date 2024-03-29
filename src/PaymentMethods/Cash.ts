import {
  AuthorizationBuilder,
  NotImplementedError,
  PaymentMethodType,
} from "../";
import { IChargable, IRefundable } from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";

export class Cash extends PaymentMethod implements IChargable, IRefundable {
  public paymentMethodType = PaymentMethodType.Cash;

  public charge(): AuthorizationBuilder {
    throw new NotImplementedError();
  }

  public refund(): AuthorizationBuilder {
    throw new NotImplementedError();
  }
}
