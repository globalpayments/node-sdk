import { AuthorizationBuilder, InquiryType, PaymentMethodType } from "../";
import { IBalanceable, IChargable, IPinProtected, IPrePayable, IRefundable, IReversable } from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";
export declare abstract class EBT extends PaymentMethod implements IBalanceable, IChargable, IRefundable, IReversable, IPrePayable, IPinProtected {
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
     * Inquires the balance of the payment method
     *
     * @param InquiryType inquiry Type of inquiry
     *
     * @return AuthorizationBuilder
     */
    balanceInquiry(inquiry?: InquiryType): AuthorizationBuilder;
    benefitWithdrawal(amount?: number | string): AuthorizationBuilder;
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
    reverse(_amount?: string | number): AuthorizationBuilder;
}
