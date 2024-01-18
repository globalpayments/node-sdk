import { DeviceType } from "../../src";
import {
  IDeviceCommInterface,
  IDeviceInterface,
  IRequestIdProvider,
  ITerminalConfiguration,
  ITerminalResponse,
  UpaMessageId,
} from ".";
import { ConnectionModes } from "./Enums";
import { TerminalAuthBuilder } from "./Builders/TerminalAuthBuilder";
import { TerminalManageBuilder } from "./Builders";
import { DeviceMessage } from "./DeviceMessage";

export abstract class DeviceController {
  protected _interface: IDeviceInterface;
  protected _settings: ITerminalConfiguration;
  public connector: IDeviceCommInterface;

  public connectionMode: ConnectionModes;
  public deviceType: DeviceType;
  public requestIdProvider: IRequestIdProvider;

  constructor(settings: ITerminalConfiguration) {
    this._settings = settings;
    this.connector = this.configureConnector();
  }

  public getConnectionMode() {
    if (this._settings != null) {
      return this._settings.connectionMode;
    }
    return null;
  }

  public getDeviceType() {
    if (this._settings != null) {
      return this._settings.deviceType;
    }
    return null;
  }

  public getRequestIdProvider() {
    if (this._settings != null) {
      return this._settings.requestIdProvider;
    }
    return null;
  }

  public send(message: DeviceMessage, requestType?: UpaMessageId): any {
    message.awaitResponse = true;
    if (this.connector) {
      return this.connector.send(message);
    }
    requestType;
  }

  abstract configureConnector(): IDeviceCommInterface;
  abstract configureInterface(): IDeviceInterface;

  abstract processTransaction(
    builder: TerminalAuthBuilder,
  ): Promise<ITerminalResponse>;
  abstract manageTransaction(
    builder: TerminalManageBuilder,
  ): Promise<ITerminalResponse>;
}
