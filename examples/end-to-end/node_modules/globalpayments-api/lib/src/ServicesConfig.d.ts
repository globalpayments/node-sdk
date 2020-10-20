import { HostedPaymentConfig } from "./";
export declare class ServicesConfig {
    siteId: string;
    licenseId: string;
    deviceId: string;
    username: string;
    password: string;
    developerId: string;
    versionNumber: string;
    secretApiKey: string;
    accountId: string;
    merchantId: string;
    sharedSecret: string;
    channel: string;
    rebatePassword: string;
    refundPassword: string;
    hostedPaymentConfig: HostedPaymentConfig;
    serviceUrl: string;
    timeout: number;
    constructor();
    validate(): void;
}
