import { IPaymentMethod, PaymentMethod, TransactionModifier, TransactionType } from "../";
import { BaseBuilder } from "./BaseBuilder";
export declare abstract class TransactionBuilder<T> extends BaseBuilder<T> {
    paymentMethod: PaymentMethod;
    transactionType: TransactionType;
    transactionModifier: TransactionModifier;
    constructor(type: TransactionType, paymentMethod?: IPaymentMethod);
    withModifier(modifier?: TransactionModifier): this;
    withPaymentMethod(paymentMethod?: IPaymentMethod): this;
}
