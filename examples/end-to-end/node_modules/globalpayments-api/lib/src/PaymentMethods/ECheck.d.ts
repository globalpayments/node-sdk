import { AccountType, AuthorizationBuilder, CheckType, EntryMethod, PaymentMethodType, SecCode } from "../";
import { IChargable } from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";
export declare class ECheck extends PaymentMethod implements IChargable {
    accountNumber: string;
    accountType: AccountType;
    achVerify: boolean;
    birthYear: string;
    checkHolderName: string;
    checkName: string;
    checkNumber: string;
    checkType: CheckType;
    checkVerify: boolean;
    driversLicenseNumber: string;
    driversLicenseState: string;
    entryMode: EntryMethod;
    micrNumber: string;
    paymentMethodType: PaymentMethodType;
    phoneNumber: string;
    routingNumber: string;
    secCode: SecCode;
    ssnLast4: string;
    token: string;
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    charge(amount?: string | number): AuthorizationBuilder;
}
