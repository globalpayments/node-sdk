import { AuthorizationBuilder, PaymentMethodType } from "../";
import { IChargable, IRefundable } from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";
export declare class Cash extends PaymentMethod implements IChargable, IRefundable {
    paymentMethodType: PaymentMethodType;
    charge(_amount?: string | number): AuthorizationBuilder;
    refund(_amount?: string | number): AuthorizationBuilder;
}
