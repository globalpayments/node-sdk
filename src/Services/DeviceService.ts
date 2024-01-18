import {
  ConnectionConfig,
  IDeviceInterface,
  ServicesContainer,
} from "../../src";

export class DeviceService {
  public static create(
    config: ConnectionConfig,
    configName: string = "default",
  ): IDeviceInterface {
    ServicesContainer.configureService(config, configName);
    if (config.gatewayConfig != null) {
      config.setConfigName(configName);
      ServicesContainer.configureService(config.gatewayConfig, configName);
    }
    return ServicesContainer.instance().getDeviceInterface(configName);
  }

  public static findDeviceController(
    configName: string = "default",
  ): IDeviceInterface {
    return ServicesContainer.instance().getDeviceInterface(configName);
  }
}
