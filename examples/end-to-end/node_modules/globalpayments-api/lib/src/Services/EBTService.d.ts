import { AuthorizationBuilder, InquiryType, ServicesConfig } from "../";
export declare class EBTService {
    constructor(config: ServicesConfig);
    balanceInquiry(type?: InquiryType): AuthorizationBuilder;
    benefitWithdrawal(amount?: number | string): AuthorizationBuilder;
    charge(amount?: number | string): AuthorizationBuilder;
    refund(amount?: number | string): AuthorizationBuilder;
}
