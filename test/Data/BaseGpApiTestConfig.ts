import {
  Environment,
  GpApiConfig,
  Logger,
  SampleRequestLogger,
  ServicesContainer,
} from "../../src";

export class BaseGpApiTestConfig {
  public static PARTNER_SOLUTION_APP_ID: string =
    "A1feRdMmEB6m0Y1aQ65H0bDi9ZeAEB2t";
  public static PARTNER_SOLUTION_APP_KEY: string = "5jPt1OpB6LLitgi7";

  public static appId: string = "4gPqnGBkppGYvoE5UX9EWQlotTxGUDbs";
  public static appKey: string = "FQyJA5VuEQfcji2M";

  public static UPA_MIC_DEVICE_APP_ID: string =
    "83cdNQ0YBmzxzkLpFHpDGn2ir0WKTW0N";
  public static UPA_MIC_DEVICE_APP_KEY: string = "1ASrcQZb0AEqR6ZT";

  private static dynamicHeaderEnabled: boolean = false;
  private static permissionsEnabled: boolean = false;

  private static logEnabled: boolean = true;

  public static gpApiSetupConfig(channel: string): GpApiConfig {
    const config = new GpApiConfig();
    config.appId = BaseGpApiTestConfig.appId;
    config.appKey = BaseGpApiTestConfig.appKey;
    config.environment = Environment.Test;
    config.channel = channel;
    config.country = "US";

    config.challengeNotificationUrl = "https://ensi808o85za.x.pipedream.net/";
    config.methodNotificationUrl = "https://ensi808o85za.x.pipedream.net/";
    config.merchantContactUrl = "https://ensi808o85za.x.pipedream.net/";

    if (BaseGpApiTestConfig.dynamicHeaderEnabled) {
      config.dynamicHeaders = {
        "x-gp-platform": "prestashop;version=1.7.2",
        "x-gp-extension": "coccinet;version=2.4.1",
      };
    }

    if (BaseGpApiTestConfig.permissionsEnabled) {
      config.permissions = ["TRN_POST_Authorize"];
    }

    if (BaseGpApiTestConfig.logEnabled) {
      config.requestLogger = new SampleRequestLogger(new Logger("logs"));
    }

    return config;
  }

  static resetGpApiConfig() {
    ServicesContainer.removeConfiguration();
    BaseGpApiTestConfig.appId = BaseGpApiTestConfig.appId;
    BaseGpApiTestConfig.appKey = BaseGpApiTestConfig.appKey;
  }
}
