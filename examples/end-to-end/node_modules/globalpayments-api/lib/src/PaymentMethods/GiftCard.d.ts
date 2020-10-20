import { AuthorizationBuilder, InquiryType, PaymentMethodType } from "../";
import { IBalanceable, IChargable, IPrePayable, IReversable } from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";
export declare class GiftCard extends PaymentMethod implements IPrePayable, IBalanceable, IReversable, IChargable {
    /**
     * Payment method value types
     *
     * @var string[]
     */
    protected static valueTypes: string[];
    /**
     * Payment method type
     *
     * @var PaymentMethodType
     */
    paymentMethodType: PaymentMethodType;
    /**
     * Payment method PIN
     *
     * @var string
     */
    pin: string;
    /**
     * Payment method value
     *
     * @internal
     * @var string
     */
    value: string;
    /**
     * Payment method value type
     *
     * @internal
     * @var string
     */
    valueType: string;
    /**
     * Creates a new payment method
     *
     * @param string alias Alias to use
     *
     * @return GiftCard
     */
    static create(alias?: string): Promise<GiftCard>;
    /**
     * Adds an alias to the payment method
     *
     * @param string alias Alias to add
     *
     * @return AuthorizationBuilder
     */
    addAlias(alias?: string): AuthorizationBuilder;
    /**
     * Activates the payment method with the given amount
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    activate(amount?: string | number): AuthorizationBuilder;
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
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    charge(amount?: string | number): AuthorizationBuilder;
    /**
     * Deactivates the payment method
     *
     * @return AuthorizationBuilder
     */
    deactivate(): AuthorizationBuilder;
    /**
     * Removes an alias to the payment method
     *
     * @param string alias Alias to remove
     *
     * @return AuthorizationBuilder
     */
    removeAlias(alias?: string): AuthorizationBuilder;
    /**
     * Replaces the payment method with the given one
     *
     * @param GiftCard newCard Replacement gift card
     *
     * @return AuthorizationBuilder
     */
    replaceWith(newCard?: GiftCard): AuthorizationBuilder;
    /**
     * Reverses the payment method
     *
     * @param string|number amount Amount to reverse
     *
     * @return AuthorizationBuilder
     */
    reverse(amount?: string | number): AuthorizationBuilder;
    /**
     * Rewards the payment method
     *
     * @param string|number amount Amount to reward
     *
     * @return AuthorizationBuilder
     */
    rewards(amount?: string | number): AuthorizationBuilder;
    alias: string;
    number: string;
    token: string;
    trackData: string;
}
