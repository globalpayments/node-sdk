import { AuthorizationBuilder, ServicesConfig, Transaction } from "../";
export declare class HostedService {
    protected config: ServicesConfig;
    constructor(config: ServicesConfig);
    authorize(amount?: number | string): AuthorizationBuilder;
    charge(amount?: number | string): AuthorizationBuilder;
    verify(amount?: number | string): AuthorizationBuilder;
    parseResponse(json: string, encoded?: boolean): Transaction;
}
