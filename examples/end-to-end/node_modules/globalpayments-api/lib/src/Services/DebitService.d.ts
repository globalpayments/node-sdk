import { AuthorizationBuilder, ServicesConfig } from "../";
export declare class DebitService {
    constructor(config: ServicesConfig);
    charge(amount?: number | string): AuthorizationBuilder;
    refund(amount?: number | string): AuthorizationBuilder;
    reverse(amount?: number | string): AuthorizationBuilder;
}
