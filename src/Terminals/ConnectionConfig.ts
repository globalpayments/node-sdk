import { ApiError, Configuration, DeviceType, GatewayConfig } from "../../src";
import { IRequestIdProvider, ITerminalConfiguration } from "./Abstractions";
import { ConnectionModes, Parity } from "./Enums";
import { ConfiguredServices } from "../../src/ConfiguredServices";
import { UpaController } from "./UPA";

export class ConnectionConfig
  extends Configuration
  implements ITerminalConfiguration
{
  public deviceType: DeviceType;
  public connectionMode: ConnectionModes;
  public parity: Parity;
  public ipAddress: string;
  public port: string;
  public requestIdProvider: IRequestIdProvider;
  public gatewayConfig: GatewayConfig;
  public configName: string;

  public connectionConfig() {
    this.timeout = -1;
  }

  public configureContainer(services: ConfiguredServices) {
    switch (this.deviceType) {
      case DeviceType.UPA_DEVICE:
        services.deviceController = new UpaController(this);
        break;
      default:
        break;
    }
  }
  getGatewayConfig(): GatewayConfig {
    return this.gatewayConfig;
  }

  setConfigName(configName: string) {
    this.configName = configName;
  }

  getConfigName(): string {
    return this.configName;
  }

  public validate() {
    super.validate();

    if (
      this.connectionMode == ConnectionModes.TCP_IP ||
      this.connectionMode == ConnectionModes.HTTP
    ) {
      if (!this.ipAddress)
        throw new ApiError(
          "IpAddress is required for TCP or HTTP communication modes.",
        );
      if (!this.port)
        throw new ApiError(
          "Port is required for TCP or HTTP communication modes.",
        );
    }
  }
}
