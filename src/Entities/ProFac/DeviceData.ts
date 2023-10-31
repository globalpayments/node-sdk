import { DeviceInfo } from "./DeviceInfo";

export class DeviceData {
  public devices: Array<DeviceInfo>;

  constructor() {
    this.devices = new Array<DeviceInfo>();
  }
}
