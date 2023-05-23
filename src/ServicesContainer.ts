import {
  ApiError,
  IPaymentGateway,
  IRecurringService,
  PayPlanConnector,
  PorticoConnector,
  RealexConnector,
  ServicesConfig,
} from "./";
import { IPayFacProvider } from "./Gateways/IPayFacProvider";
import { ProPayConnector } from "./Gateways/ProPayConnector";

export class ServicesContainer {
  private static _instance: ServicesContainer;
  private _gateway: IPaymentGateway;
  private _recurring: IRecurringService;
  private _xmlGateway: IPayFacProvider;

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
      gateway.sdkNameVersion = config.sdkNameVersion;
      gateway.timeout = config.timeout;
      gateway.serviceUrl =
        config.serviceUrl + "/Hps.Exchange.PosGateway/PosGatewayService.asmx";
      const payplan = new PayPlanConnector();
      payplan.siteId = config.siteId;
      payplan.licenseId = config.licenseId;
      payplan.deviceId = config.deviceId;
      payplan.username = config.username;
      payplan.password = config.password;
      payplan.secretApiKey = config.secretApiKey;
      payplan.developerId = config.developerId;
      payplan.versionNumber = config.versionNumber;
      payplan.timeout = config.timeout;
      payplan.serviceUrl = config.serviceUrl
        + (config.serviceUrl.includes('cert.') ? "/Portico.PayPlan.v2/" : "/payplan.v2/");
      const gatewayObj = new ProPayConnector();
      gatewayObj.serviceUrl = config.serviceUrl;
      gatewayObj.certStr = config.certificationStr;
      gatewayObj.termID = config.terminalID;
      gatewayObj.timeout = config.timeout;

      gatewayObj.x509CertificatePath = config.x509CertificationPath;
      gatewayObj.x509CertStr = config.x509CertificateString;
      ServicesContainer._instance = new ServicesContainer(gateway, payplan, gatewayObj);
    }
  }

  public constructor(gateway?: IPaymentGateway, recurring?: IRecurringService, xmlGateway?: IPayFacProvider) {
    if (gateway) {
      this._gateway = gateway;
    }
    if (recurring) {
      this._recurring = recurring;
    }
    if (xmlGateway) {
      this._xmlGateway = xmlGateway;
    }
  }

  public getClient(): IPaymentGateway {
    return this._gateway;
  }

  public getRecurringClient(): IRecurringService {
    return this._recurring;
  }

  public getXmlClient(): IPayFacProvider {
    return this._xmlGateway;
  }
}
