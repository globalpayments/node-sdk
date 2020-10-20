import { AuthorizationBuilder, EncryptionData, InquiryType, PaymentMethodType } from "../";
import { IAuthable, IBalanceable, IChargable, IEncryptable, IPrePayable, IRefundable, IReversable, ITokenizable, IVerifyable } from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";
export declare abstract class Credit extends PaymentMethod implements IEncryptable, ITokenizable, IChargable, IAuthable, IRefundable, IReversable, IVerifyable, IPrePayable, IBalanceable {
    encryptionData: EncryptionData;
    paymentMethodType: PaymentMethodType;
    /**
     * The token value representing the card.
     *
     * For `TransactionModifier.EncryptedMobile` transactions, this value is the
     * encrypted payload from the mobile payment scheme.
     */
    token: string;
    /**
     * The type of mobile device used in `Transaction.Modifier.EncryptedMobile`
     * transactions.
     */
    mobileType: string;
    /**
     * Authorizes the payment method
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    authorize(amount?: string | number): AuthorizationBuilder;
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
    /**
     * Verifies the payment method
     *
     * @return AuthorizationBuilder
     */
    verify(): AuthorizationBuilder;
    /**
     * Tokenizes the payment method
     *
     * @return AuthorizationBuilder
     */
    tokenize(): AuthorizationBuilder;
}
