import { DeviceType, GatewayConfig } from "../../../src";
import { ConnectionModes, Parity } from "../Enums";
import { IRequestIdProvider } from ".";

export interface ITerminalConfiguration {
  connectionMode: ConnectionModes;
  deviceType: DeviceType;
  requestIdProvider: IRequestIdProvider;

  // Ethernet
  ipAddress: string;
  port: string;

  // Serial
  parity: Parity;

  // Timeout
  timeout: number;

  // Associated Gateway
  gatewayConfig: GatewayConfig;

  getGatewayConfig(): GatewayConfig;

  setConfigName(configName: string): void;

  getConfigName(): string;
}
