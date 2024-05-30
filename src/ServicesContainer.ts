import {
  Configuration,
  ConfigurationError,
  IDeviceInterface,
  IPaymentGateway,
  IRecurringService,
  Secure3dVersion,
} from "./";
import { ConfiguredServices } from "./ConfiguredServices";
import { IPayFacProvider } from "./Gateways/IPayFacProvider";
import { ServicesConfigs } from "./ServiceConfigs/ServicesConfigs";
import { DeviceController } from "./Terminals/DeviceController";

export class ServicesContainer {
  private static _instance: ServicesContainer;
  private _configs: Record<string, ConfiguredServices> = {};

  public static instance(): ServicesContainer {
    if (ServicesContainer._instance === undefined) {
      ServicesContainer._instance = new ServicesContainer();
    }

    return ServicesContainer._instance;
  }

  public getClient(configName: string = "default"): IPaymentGateway {
    return this._configs[configName].gatewayConnector;
  }

  public getRecurringClient(configName: string = "default"): IRecurringService {
    return this._configs[configName].recurringConnector;
  }

  public getXmlClient(configName: string = "default"): IPayFacProvider {
    return this._configs[configName].getPayFacProvider();
  }

  public getDeviceInterface(configName: string = "default"): IDeviceInterface {
    return this._configs[configName].deviceInterface;
  }

  public getDeviceController(configName: string = "default"): DeviceController {
    return this._configs[configName].deviceController;
  }

  getSecure3d(configName: string, version: Secure3dVersion): any {
    if (this._configs[configName]) {
      const provider = this._configs[configName].getSecure3dProvider(version);
      if (provider !== null) {
        return provider;
      } else {
        throw new ConfigurationError(
          `Secure 3d is not configured for version ${version}.`,
        );
      }
    } else {
      throw new ConfigurationError(
        "Secure 3d is not configured on the connector.",
      );
    }
  }

  public static configure(
    config: ServicesConfigs,
    configName: string = "default",
  ) {
    config.validate();

    ServicesContainer.configureService(config.gatewayConfig, configName);
  }

  public static configureService<T extends Configuration>(
    config: T,
    configName: string = "default",
  ) {
    if (config != null) {
      if (!config.validated) {
        config.validate();
      }

      const configuredService =
        ServicesContainer.instance().getConfiguration(configName);

      config.configureContainer(configuredService);
      ServicesContainer.instance().addConfiguration(
        configName,
        configuredService,
      );
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

  private addConfiguration(
    configName: string,
    configuredService: ConfiguredServices,
  ) {
    const instance = ServicesContainer.instance();
    instance._configs[configName] = configuredService;
  }

  public static removeConfiguration(configName: string = "default") {
    const instance = ServicesContainer.instance();
    if (instance._configs[configName]) {
      delete instance._configs[configName];
    }
  }
}
