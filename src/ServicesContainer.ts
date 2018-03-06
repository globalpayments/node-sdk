import {
  ApiError,
  IPaymentGateway,
  IRecurringService,
  PayPlanConnector,
  PorticoConnector,
  RealexConnector,
  ServicesConfig,
} from "./";

export class ServicesContainer {
  private static _instance: ServicesContainer;
  private _gateway: IPaymentGateway;
  private _recurring: IRecurringService;

  public static instance(): ServicesContainer {
    if (ServicesContainer._instance === null) {
      throw new ApiError("Services container not configured.");
    }

    return ServicesContainer._instance;
  }

  public static configure(config: ServicesConfig): void {
    config.validate();
    if (config.merchantId && config.merchantId !== "") {
      const gateway = new RealexConnector();
      gateway.merchantId = config.merchantId;
      gateway.sharedSecret = config.sharedSecret;
      gateway.accountId = config.accountId;
      gateway.channel = config.channel;
      gateway.rebatePassword = config.rebatePassword;
      gateway.refundPassword = config.refundPassword;
      gateway.timeout = config.timeout;
      gateway.serviceUrl = config.serviceUrl;
      gateway.hostedPaymentConfig = config.hostedPaymentConfig;
      gateway.channel = config.channel;
      ServicesContainer._instance = new ServicesContainer(gateway, gateway);
    } else {
      const gateway = new PorticoConnector();
      gateway.siteId = config.siteId;
      gateway.licenseId = config.licenseId;
      gateway.deviceId = config.deviceId;
      gateway.username = config.username;
      gateway.password = config.password;
      gateway.secretApiKey = config.secretApiKey;
      gateway.developerId = config.developerId;
      gateway.versionNumber = config.versionNumber;
      gateway.timeout = config.timeout;
      gateway.serviceUrl =
        config.serviceUrl + "/Hps.Exchange.PosGateway/PosGatewayService.asmx";
      const payplan = new PayPlanConnector();
      payplan.secretApiKey = config.secretApiKey;
      payplan.timeout = config.timeout;
      payplan.serviceUrl = config.serviceUrl + "/Portico.PayPlan.v2/";
      ServicesContainer._instance = new ServicesContainer(gateway, payplan);
    }
  }

  public constructor(gateway?: IPaymentGateway, recurring?: IRecurringService) {
    if (gateway) {
      this._gateway = gateway;
    }
    if (recurring) {
      this._recurring = recurring;
    }
  }

  public getClient(): IPaymentGateway {
    return this._gateway;
  }

  public getRecurringClient(): IRecurringService {
    return this._recurring;
  }
}
