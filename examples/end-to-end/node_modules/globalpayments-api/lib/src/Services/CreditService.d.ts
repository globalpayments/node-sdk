import { AuthorizationBuilder, ManagementBuilder, ServicesConfig } from "../";
export declare class CreditService {
    constructor(config: ServicesConfig);
    authorize(amount?: number | string): AuthorizationBuilder;
    capture(transactionId: string): ManagementBuilder;
    charge(amount?: number | string): AuthorizationBuilder;
    edit(transactionId?: string): ManagementBuilder;
    refund(amount?: number | string): AuthorizationBuilder;
    reverse(amount?: number | string): AuthorizationBuilder;
    verify(): AuthorizationBuilder;
    void(transactionId: string): ManagementBuilder;
}
