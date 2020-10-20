import { ReasonCode, TaxType, Transaction } from "../";
import { TransactionBuilder } from "./TransactionBuilder";
export declare class ManagementBuilder extends TransactionBuilder<Transaction> {
    amount: string | number;
    authAmount: string | number;
    readonly authorizationCode: string | undefined;
    readonly clientTransactionId: string | undefined;
    currency: string;
    description: string;
    gratuity: string | number;
    readonly orderId: string | undefined;
    poNumber: string;
    reasonCode?: ReasonCode;
    taxAmount: string | number;
    taxType: TaxType;
    readonly transactionId: string | undefined;
    constructor(type: number);
    /**
     * Executes the builder against the gateway.
     *
     * @returns Promise<Transaction>
     */
    execute(): Promise<Transaction>;
    protected setupValidations(): void;
    /**
     * Sets the current transaction's amount.
     *
     * @param amount The amount
     * @returns ManagementBuilder
     */
    withAmount(amount?: string | number): this;
    /**
     * Sets the current transaction's authorized amount; where applicable.
     *
     * @param amount The authorized amount
     * @returns ManagementBuilder
     */
    withAuthAmount(amount?: string | number): this;
    /**
     * Sets the currency.
     *
     * The formatting for the supplied value will currently depend on
     * the configured gateway's requirements.
     *
     * @param currency The currency
     * @returns ManagementBuilder
     */
    withCurrency(currency?: string): this;
    /**
     * Sets the transaction's description.
     *
     * This value is not guaranteed to be sent in the authorization
     * or settlement process.
     *
     * @param description The description
     * @returns ManagementBuilder
     */
    withDescription(description?: string): this;
    /**
     * Sets the gratuity amount; where applicable.
     *
     * This value is information only and does not affect
     * the authorization amount.
     *
     * @param gratuity The gratuity amount
     * @returns ManagementBuilder
     */
    withGratuity(gratuity?: string | number): this;
    /**
     * Sets the purchase order number; where applicable.
     *
     * @param poNumber The PO number
     * @returns ManagementBuilder
     */
    withPoNumber(poNumber?: string): this;
    /**
     * Sets the reason code for the transaction.
     *
     * @param reasonCode The reason code
     * @returns ManagementBuilder
     */
    withReasonCode(reasonCode?: ReasonCode): this;
    /**
     * Sets the tax amount.
     *
     * Useful for commercial purchase card requests.
     *
     * @see AuthorizationBuilder.WithCommercialRequest
     * @param amount The tax amount
     * @returns ManagementBuilder
     */
    withTaxAmount(amount?: string | number): this;
    /**
     * Sets the tax type.
     *
     * Useful for commercial purchase card requests.
     *
     * @see AuthorizationBuilder.withCommercialRequest
     * @param type The tax type
     * @returns ManagementBuilder
     */
    withTaxType(type?: TaxType): this;
}
