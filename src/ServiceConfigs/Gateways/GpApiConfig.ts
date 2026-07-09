import {
  AccessTokenInfo,
  Channel,
  ConfigurationError,
  DataResidency,
  Environment,
  GatewayProvider,
  IntervalToExpire,
  ServiceEndpoints,
} from "../../../src/Entities";
import { GatewayConfig } from "./GatewayConfig";
import { ConfiguredServices } from "../../../src/ConfiguredServices";
import { GpApiConnector, Secure3dVersion } from "../../../src";

export class GpApiConfig extends GatewayConfig {
  public appId: string;

  public appKey: string;

  public accessTokenInfo: AccessTokenInfo;

  public country: string = "US";

  public channel: Channel;

  public secondsToExpire: number;

  public intervalToExpire: IntervalToExpire;

  public methodNotificationUrl: string;

  public challengeNotificationUrl: string;

  public merchantContactUrl: string;

  public permissions: string[];

  public merchantId: string;

  public deviceCurrency: string;

  public dataResidency: DataResidency = DataResidency.None;
  public transactionProcessingAccountName: string;

  // Portico credentials for GPAPI access token via Portico authentication
  public secretApiKey: string;
  public siteId: string;
  public licenseId: string;
  public porticoDeviceId: string;
  public porticoUsername: string;
  public porticoPassword: string;

  constructor() {
    super(GatewayProvider.GpApi);
  }

  public configureContainer(services: ConfiguredServices) {
    if (!this.serviceUrl) {
      if (this.dataResidency === DataResidency.EU) {
        if (this.environment == Environment.Production) {
          this.serviceUrl = ServiceEndpoints.GP_API_EU_PRODUCTION;
        } else if (this.environment == Environment.Qa) {
          this.serviceUrl = ServiceEndpoints.GP_API_EU_QA;
        } else {
          this.serviceUrl = ServiceEndpoints.GP_API_EU_TEST;
        }
      } else {
        this.serviceUrl =
          this.environment == Environment.Production
            ? ServiceEndpoints.GP_API_PRODUCTION
            : ServiceEndpoints.GP_API_TEST;
      }
    }

    const gateway = new GpApiConnector(this);
    gateway.serviceUrl = this.serviceUrl;
    gateway.requestLogger = this.requestLogger;

    services.gatewayConnector = gateway;
    services.reportingService = gateway;
    services.setSecure3dProvider(Secure3dVersion.ONE, gateway);
    services.setSecure3dProvider(Secure3dVersion.TWO, gateway);
  }

  public validate() {
    super.validate();

    const hasAnySiteCred = !!(
      this.siteId ||
      this.licenseId ||
      this.porticoDeviceId ||
      this.porticoUsername ||
      this.porticoPassword
    );
    const hasAllSiteCreds = !!(
      this.siteId &&
      this.licenseId &&
      this.porticoDeviceId &&
      this.porticoUsername &&
      this.porticoPassword
    );

    if (hasAnySiteCred && !hasAllSiteCreds) {
      throw new ConfigurationError(
        "Incomplete Portico site credentials: siteId, licenseId, porticoDeviceId, porticoUsername, and porticoPassword are all required.",
      );
    }

    const hasPorticoCredentials = !!(this.secretApiKey || hasAllSiteCreds);

    if (
      !this.accessTokenInfo &&
      (!this.appId || !this.appKey) &&
      !hasPorticoCredentials
    ) {
      throw new ConfigurationError(
        "AccessTokenInfo or AppId and AppKey or Portico credentials cannot be null",
      );
    }
  }
}
