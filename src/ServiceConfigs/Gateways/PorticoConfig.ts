import {
  ConfigurationError,
  Environment,
  GatewayProvider,
  ServiceEndpoints,
} from "../../../src/Entities";
import { GatewayConfig } from "./GatewayConfig";
import {
  PayPlanConnector,
  PorticoConnector,
  ProPayConnector,
} from "../../../src/Gateways/";
import { ConfiguredServices } from "../../../src/ConfiguredServices";

export class PorticoConfig extends GatewayConfig {
  public siteId: string;
  public licenseId: string;
  public deviceId: string;
  public username: string;
  public password: string;
  public developerId: string;
  public versionNumber: string;
  public secretApiKey: string;
  public uniqueDeviceId: string;

  //ProPay
  public certificationStr: string;
  public terminalId: string;
  public selfSignedCertLocation: string;
  public proPayUS: boolean = true;

  constructor() {
    super(GatewayProvider.Portico);
  }

  public getPayPlanEndpoint() {
    if (
      (this.secretApiKey &&
        this.secretApiKey.toLowerCase().indexOf("cert") !== -1) ||
      (!this.secretApiKey && this.environment == Environment.Test)
    ) {
      return "/Portico.PayPlan.v2/";
    }

    return "/PayPlan.v2/";
  }

  // Common
  public curlOptions: unknown;

  public configureContainer(services: ConfiguredServices) {
    // parent::configureContainer(services); // must implement data services first

    if (!this.serviceUrl) {
      this.serviceUrl =
        this.environment == Environment.Test
          ? ServiceEndpoints.PORTICO_TEST
          : ServiceEndpoints.PORTICO_PRODUCTION;
    }

    const gateway = new PorticoConnector(this);
    gateway.siteId = this.siteId;
    gateway.licenseId = this.licenseId;
    gateway.deviceId = this.deviceId;
    gateway.username = this.username;
    gateway.password = this.password;
    gateway.secretApiKey = this.secretApiKey;
    gateway.developerId = this.developerId;
    gateway.versionNumber = this.versionNumber;
    gateway.timeout = this.timeout;
    gateway.serviceUrl =
      this.serviceUrl + "/Hps.Exchange.PosGateway/PosGatewayService.asmx";
    gateway.uniqueDeviceId = this.uniqueDeviceId;

    services.gatewayConnector = gateway;

    if (!this.dataClientId) {
      services.reportingService = gateway;
    }

    const payplan = new PayPlanConnector();
    payplan.secretApiKey = this.secretApiKey;
    payplan.developerId = this.developerId;
    payplan.versionNumber = this.versionNumber;
    payplan.timeout = this.timeout;
    payplan.serviceUrl = this.serviceUrl + this.getPayPlanEndpoint();

    services.recurringConnector = payplan;

    if (this.certificationStr) {
      if (this.environment === Environment.Test) {
        this.serviceUrl = this.proPayUS
          ? ServiceEndpoints.PROPAY_TEST
          : ServiceEndpoints.PROPAY_TEST_CANADIAN;
      } else {
        this.serviceUrl = this.proPayUS
          ? ServiceEndpoints.PROPAY_PRODUCTION
          : ServiceEndpoints.PROPAY_PRODUCTION_CANADIAN;
      }

      const payFac = new ProPayConnector();
      payFac.certStr = this.certificationStr;
      payFac.termID = this.terminalId;
      payFac.timeout = this.timeout;
      payFac.serviceUrl = this.serviceUrl;
      payFac.selfSignedCert = this.selfSignedCertLocation;

      services.setPayFacProvider(payFac);
    }
  }

  public validate() {
    super.validate();

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
  }
}
