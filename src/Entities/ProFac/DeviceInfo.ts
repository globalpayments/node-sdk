import { DeviceAttributeInfo } from "../ProFac/DeviceAttributeInfo";

export class DeviceInfo {
    /// <summary>
    /// Unique name of the device being ordered
    /// </summary>
    public name: string;
    /// <summary>
    /// Number of devices ordered. Defaults to 0
    /// </summary>
    public quantity: number

    /// <summary>
    /// A list of attributes for the specific device. This will be null if no attributes are set
    /// </summary>
    public attributes: Array<DeviceAttributeInfo>;
}