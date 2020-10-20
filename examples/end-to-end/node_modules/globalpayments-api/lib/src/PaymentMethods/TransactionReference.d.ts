import { PaymentMethodType } from "../";
import { IPaymentMethod } from "./Interfaces";
export declare class TransactionReference implements IPaymentMethod {
    authCode: string;
    orderId: string;
    transactionId: string;
    paymentMethodType: PaymentMethodType;
    clientTransactionId: string;
    constructor(transactionId?: string);
}
