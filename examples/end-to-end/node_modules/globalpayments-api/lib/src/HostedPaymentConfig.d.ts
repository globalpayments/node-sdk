import { FraudFilterMode, HppVersion } from "./";
export declare class HostedPaymentConfig {
    cardStorageEnabled: boolean;
    directCurrencyConversionEnabled: boolean;
    displaySavedCards: boolean;
    fraudFilterMode: FraudFilterMode;
    language: string;
    paymentButtonText: string;
    responseUrl: string;
    requestTransactionStabilityScore: string;
    version: HppVersion;
}
