import { Address, AuthorizationBuilder, IPaymentMethod, PaymentMethodType, Schedule } from "../";
import { RecurringEntity } from "../Entities";
export declare class RecurringPaymentMethod extends RecurringEntity<RecurringPaymentMethod> {
    address: Address;
    commercialIndicator: string;
    customerKey: string;
    expirationDate: string;
    nameOnAccount: string;
    paymentMethodType: PaymentMethodType;
    paymentType: string;
    preferredPayment: boolean;
    status: string;
    taxType: string;
    private _paymentMethod;
    paymentMethod: IPaymentMethod;
    constructor(customerIdOrPaymentMethod?: string | IPaymentMethod, paymentId?: string);
    authorize(amount?: number | string): AuthorizationBuilder;
    charge(amount?: number | string): AuthorizationBuilder;
    refund(amount?: number | string): AuthorizationBuilder;
    verify(): AuthorizationBuilder;
    addSchedule(scheduleId: string): Schedule;
}
