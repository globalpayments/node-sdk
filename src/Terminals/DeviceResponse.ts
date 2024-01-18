import { IDeviceResponse } from ".";

export abstract class DeviceResponse implements IDeviceResponse {
  status: string;
  command: string;
  version: string;
  deviceResponseCode: string;
  deviceResponseText: string;
  referenceNumber: string;

  constructor() {
    this.status = "";
  }
}
