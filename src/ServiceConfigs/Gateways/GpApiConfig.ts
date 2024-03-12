import {
  AccessTokenInfo,
  Channel,
  ConfigurationError,
  Environment,
  GatewayProvider,
  IntervalToExpire,
  ServiceEndpoints,
} from "../../../src/Entities";
import { GatewayConfig } from "./GatewayConfig";
import { ConfiguredServices } from "../../../src/ConfiguredServices";
import { GpApiConnector } from "../../../src";

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

  constructor() {
    super(GatewayProvider.GpApi);
  }

  public configureContainer(services: ConfiguredServices) {
    if (!this.serviceUrl) {
      this.serviceUrl =
        this.environment == Environment.Production
          ? ServiceEndpoints.GP_API_PRODUCTION
          : ServiceEndpoints.GP_API_TEST;
    }

    const gateway = new GpApiConnector(this);
    gateway.serviceUrl = this.serviceUrl;
    gateway.requestLogger = this.requestLogger;

    services.gatewayConnector = gateway;
    services.reportingService = gateway;
  }

  public validate() {
    super.validate();

    if (!this.accessTokenInfo && (!this.appId || !this.appKey)) {
      throw new ConfigurationError(
        "AccessTokenInfo or AppId and AppKey cannot be null",
      );
    }
  }
}
