import { Address, IPaymentMethod, RecurringPaymentMethod } from "../";
import { RecurringEntity } from "./RecurringEntity";
export declare class Customer extends RecurringEntity<Customer> {
    /**
     * Customer's title
     */
    title: string;
    /**
     * Customer's first name
     */
    firstName: string;
    /**
     * Customer's last name
     */
    lastName: string;
    /**
     * Customer's company
     */
    company: string;
    /**
     * Customer's address
     */
    address: Address;
    /**
     * Customer's home phone number
     */
    homePhone: string;
    /**
     * Customer's work phone number
     */
    workPhone: string;
    /**
     * Customer's fax phone number
     */
    fax: string;
    /**
     * Customer's mobile phone number
     */
    mobilePhone: string;
    /**
     * Customer's email address
     */
    email: string;
    /**
     * Customer comments
     */
    comments: string;
    /**
     * Customer's department within its organization
     */
    department: string;
    /**
     * Customer resource's status
     */
    status: string;
    /**
     * Adds a payment method to the customer
     *
     * @param paymentId An application derived ID for the payment method
     * @param paymentMethod The payment method
     * @returns RecurringPaymentMethod
     */
    addPaymentMethod(paymentId: string, paymentMethod: IPaymentMethod): RecurringPaymentMethod;
}
