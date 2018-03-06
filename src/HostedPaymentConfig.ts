import { FraudFilterMode, HppVersion } from "./";

export class HostedPaymentConfig {
  public cardStorageEnabled: boolean;
  public directCurrencyConversionEnabled: boolean;
  public displaySavedCards: boolean;
  public fraudFilterMode: FraudFilterMode;
  public language: string;
  public paymentButtonText: string;
  public responseUrl: string;
  public requestTransactionStabilityScore: string;
  public version: HppVersion;
}
