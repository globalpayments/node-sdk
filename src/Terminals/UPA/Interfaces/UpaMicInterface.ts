import {
  DeviceMessage,
  GatewayConfig,
  GatewayError,
  GenerationUtils,
  GpApiConfig,
  GpApiConnector,
  IDeviceCommInterface,
  IPaymentGateway,
  ITerminalConfiguration,
  ServicesContainer,
} from "../../../../src";

export class UpaMicInterface implements IDeviceCommInterface {
  private config: ITerminalConfiguration;
  private gatewayConfig: GatewayConfig;
  private connector: IPaymentGateway;

  constructor(config: ITerminalConfiguration) {
    this.config = config;
    this.gatewayConfig = config.gatewayConfig;
  }

  connect(): void {
    this.connector = ServicesContainer.instance().getClient(
      this.config.getConfigName(),
    );
    if (
      this.gatewayConfig instanceof GpApiConfig &&
      !this.gatewayConfig.accessTokenInfo.accessToken &&
      this.connector instanceof GpApiConnector
    ) {
      this.connector.signIn();
    }
  }

  disconnect(): void {
    // TODO: Implement disconnect() method.
  }

  send(message: DeviceMessage): any {
    this.connect();
    try {
      let out: Promise<string>;
      if (this.gatewayConfig instanceof GpApiConfig) {
        const requestData = {
          merchant_id: this.gatewayConfig.accessTokenInfo.merchantId,
          account_id:
            this.gatewayConfig.accessTokenInfo.transactionProcessingAccountID,
          account_name:
            this.gatewayConfig.accessTokenInfo.transactionProcessingAccountName,
          channel: this.gatewayConfig.channel,
          country: this.gatewayConfig.country,
          currency: this.gatewayConfig.deviceCurrency,
          reference:
            message.getRequestField("requestId") ||
            GenerationUtils.generateOrderId(),
          request: message.getJsonRequest(),
          notifications: {
            status_url: this.gatewayConfig.methodNotificationUrl,
          },
        };
        if (this.connector instanceof GpApiConnector) {
          out = this.connector.processPassThrough(JSON.stringify(requestData));
          return out.then((response) => this.parseResponse(response));
        }
      }
    } catch (e) {
      throw new GatewayError(`Device error: ${e.message}`, e.message);
    }
  }

  parseResponse(gatewayResponse: any): any {
    const gatewayResponseParsed = gatewayResponse;
    gatewayResponseParsed.provider = this.gatewayConfig.gatewayProvider;

    return gatewayResponse;
  }

  private arrayCastRecursive(array: any): any {
    if (Array.isArray(array)) {
      array.forEach((value, key) => {
        if (Array.isArray(value)) {
          array[key] = this.arrayCastRecursive(value);
        }
        if (typeof value === "object" && value !== null) {
          array[key] = this.arrayCastRecursive(value);
        }
      });
    }

    if (typeof array === "object" && array !== null) {
      return this.arrayCastRecursive(Object.entries(array));
    }

    return array;
  }
}
