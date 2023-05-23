import { ProPayAccountStatus } from "../../Entities";

export class AccountPermissions{
    public aCHIn: boolean;
    public aCHOut: boolean;
    public cCProcessing: boolean;
    public proPayIn: boolean;
    public proPayOut: boolean;
    public creditCardMonthLimit: string;
    public creditCardTransactionLimit: string;
    public merchantOverallStatus: ProPayAccountStatus;
    public softLimitEnabled: boolean;
    public aCHPaymentSoftLimitEnabled: boolean;
    public softLimitACHOffPercent: string;
    public aCHPaymentACHOffPercent: string;
}