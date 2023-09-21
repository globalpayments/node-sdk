import {
  IPaymentGateway,
  IRecurringService,
} from "./";
import { ConfiguredServices } from "./ConfiguredServices";
import { IPayFacProvider } from "./Gateways/IPayFacProvider";
import { GatewayConfig } from "./ServiceConfigs/Gateways/GatewayConfig";
import { ServicesConfigs } from "./ServiceConfigs/ServicesConfigs";

export class ServicesContainer {

  private static _instance: ServicesContainer;
  private _configs: Record<string, ConfiguredServices> = {};

  public static instance(): ServicesContainer {
    if (ServicesContainer._instance === undefined) {
      ServicesContainer._instance = new ServicesContainer();
    }

    return ServicesContainer._instance;
  }

  public getClient(configName: string = 'default'): IPaymentGateway {
    return this._configs[configName].gatewayConnector;
  }

  public getRecurringClient(configName: string = 'default'): IRecurringService {
    return this._configs[configName].recurringConnector;
  }

  public getXmlClient(configName: string = 'default'): IPayFacProvider {
    return this._configs[configName].getPayFacProvider();
  }

  public static configure(config: ServicesConfigs, configName: string = 'default') {
    config.validate();

    ServicesContainer.configureService(config.gatewayConfig, configName)
  }

  public static configureService(config: GatewayConfig, configName: string = "default") {
    if (config != null) {
      if (!config.validated) {
        config.validate();
      }

      const configuredService = ServicesContainer.instance().getConfiguration(configName);

      config.configureContainer(configuredService);
      ServicesContainer.instance().addConfiguration(configName, configuredService);
    }
  }

  private getConfiguration(configName: string) {
    const instance = ServicesContainer.instance();
      if (instance._configs[configName]) {
          return instance._configs[configName];
      } else {
          return new ConfiguredServices();
      }
  }

  private addConfiguration(configName: string, configuredService: ConfiguredServices) {
    const instance = ServicesContainer.instance();
    instance._configs[configName] = configuredService;
  }

}
