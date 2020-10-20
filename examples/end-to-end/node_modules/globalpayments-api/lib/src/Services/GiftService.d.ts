import { AuthorizationBuilder, GiftCard, InquiryType, ManagementBuilder, ServicesConfig } from "../";
export declare class GiftService {
    constructor(config: ServicesConfig);
    activate(amount?: number | string): AuthorizationBuilder;
    addValue(amount?: number | string): AuthorizationBuilder;
    addAlias(phoneNumber: string): AuthorizationBuilder;
    balanceInquiry(type?: InquiryType): AuthorizationBuilder;
    charge(amount?: number | string): AuthorizationBuilder;
    create(phoneNumber: string): Promise<GiftCard>;
    deactivate(): AuthorizationBuilder;
    removeAlias(phoneNumber: string): AuthorizationBuilder;
    replaceWith(newCard: GiftCard): AuthorizationBuilder;
    reverse(amount?: number | string): AuthorizationBuilder;
    rewards(amount?: number | string): AuthorizationBuilder;
    void(transactionId: string): ManagementBuilder;
}
