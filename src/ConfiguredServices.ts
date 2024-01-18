import { IPaymentGateway, IRecurringService } from "./Gateways";
import { IPayFacProvider } from "./Gateways/IPayFacProvider";
import { ReportingService } from "./Services";
import { IDeviceInterface } from "./Terminals";
import { DeviceController } from "./Terminals/DeviceController";

export class ConfiguredServices {
  private payFacProvider: IPayFacProvider;

  public gatewayConnector: IPaymentGateway;

  public recurringConnector: IRecurringService;

  public reportingService: ReportingService;

  public deviceInterface: IDeviceInterface;

  private _deviceController: DeviceController;

  constructor() {}

  /**
   * @return void
   */
  public setPayFacProvider(provider: IPayFacProvider) {
    this.payFacProvider = provider;
  }

  /**
   * @return IPayFacProvider
   */
  public getPayFacProvider() {
    return this.payFacProvider || null;
  }

  public get deviceController() {
    return this._deviceController;
  }

  public set deviceController(deviceController: DeviceController) {
    this._deviceController = deviceController;
    this.deviceInterface = deviceController.configureInterface();
  }
}
