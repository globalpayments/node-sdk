import { AuthorizationBuilder, ManagementBuilder, ServicesConfig } from "../";
export declare class CheckService {
    constructor(config: ServicesConfig);
    charge(amount?: number | string): AuthorizationBuilder;
    void(transactionId: string): ManagementBuilder;
}
