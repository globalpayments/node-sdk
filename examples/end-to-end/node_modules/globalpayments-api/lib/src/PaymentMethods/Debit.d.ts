import { AuthorizationBuilder, EncryptionData, PaymentMethodType } from "../";
import { IChargable, IEncryptable, IPinProtected, IPrePayable, IRefundable, IReversable } from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";
export declare abstract class Debit extends PaymentMethod implements IChargable, IEncryptable, IRefundable, IReversable, IPrePayable, IPinProtected {
    encryptionData: EncryptionData;
    paymentMethodType: PaymentMethodType;
    pinBlock: string;
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    charge(amount?: string | number): AuthorizationBuilder;
    /**
     * Adds value to the payment method
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    addValue(amount?: string | number): AuthorizationBuilder;
    /**
     * Refunds the payment method
     *
     * @param string|number amount Amount to refund
     *
     * @return AuthorizationBuilder
     */
    refund(amount?: string | number): AuthorizationBuilder;
    /**
     * Reverses the payment method
     *
     * @param string|number amount Amount to reverse
     *
     * @return AuthorizationBuilder
     */
    reverse(amount?: string | number): AuthorizationBuilder;
}
