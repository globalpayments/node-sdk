export interface IDeviceCommInterface {
  connect(): unknown;

  disconnect(): unknown;

  send(message: any, requestType?: string): unknown;

  parseResponse(gatewayResponse: any): unknown;
}
