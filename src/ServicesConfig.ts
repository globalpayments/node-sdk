import { ConfigurationError, HostedPaymentConfig } from "./";

export class ServicesConfig {
  // portico
  public siteId: string;
  public licenseId: string;
  public deviceId: string;
  public username: string;
  public password: string;
  public developerId: string;
  public versionNumber: string;
  public secretApiKey: string;

  // realex
  public accountId: string;
  public merchantId: string;
  public sharedSecret: string;
  public channel: string;
  public rebatePassword: string;
  public refundPassword: string;
  public hostedPaymentConfig: HostedPaymentConfig;

  // common
  public serviceUrl: string;
  public timeout: number;

  public constructor() {
    this.timeout = 65000;
  }

  public validate() {
    // portico api key
    if (this.secretApiKey) {
      if (
        this.siteId ||
        this.licenseId ||
        this.deviceId ||
        this.username ||
        this.password
      ) {
        throw new ConfigurationError(
          "Configuration contains both secret api key and legacy credentials. These are mutually exclusive.",
        );
      }
    }

    // portico legacy
    if (
      this.siteId ||
      this.licenseId ||
      this.deviceId ||
      this.username ||
      this.password
    ) {
      if (
        !(
          this.siteId &&
          this.licenseId &&
          this.deviceId &&
          this.username &&
          this.password
        )
      ) {
        throw new ConfigurationError(
          "Site, License, Device, Username and Password should all have a values for this configuration.",
        );
      }
    }

    // realex
    if (this.merchantId || this.sharedSecret) {
      if (!this.merchantId) {
        throw new ConfigurationError(
          "MerchantId is required for this configuration.",
        );
      }

      if (!this.sharedSecret) {
        throw new ConfigurationError(
          "SharedSecret is required for this configuration.",
        );
      }
    }

    // service url
    if (!this.serviceUrl) {
      throw new ConfigurationError(
        "Service URL could not be determined from the credentials provided. Please specify an endpoint.",
      );
    }
  }
}
