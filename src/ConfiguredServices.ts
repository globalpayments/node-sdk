import { Secure3dVersion } from "./Entities";
import { IPaymentGateway, IRecurringService } from "./Gateways";
import { IPayFacProvider } from "./Gateways/IPayFacProvider";
import { ReportingService, Secure3dService } from "./Services";
import { IDeviceInterface } from "./Terminals";
import { DeviceController } from "./Terminals/DeviceController";

export class ConfiguredServices {
  private payFacProvider: IPayFacProvider;

  public gatewayConnector: IPaymentGateway;

  public recurringConnector: IRecurringService;

  public reportingService: ReportingService;

  public deviceInterface: IDeviceInterface;

  private _deviceController: DeviceController;

  private secure3dProviders: Map<Secure3dVersion, Secure3dService> = new Map();

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

  getSecure3dProvider(version: Secure3dVersion) {
    if (this.secure3dProviders.get(version)) {
      return this.secure3dProviders.get(version);
    } else if (version === Secure3dVersion.ANY) {
      let provider = this.secure3dProviders.get(Secure3dVersion.TWO);
      if (provider === null) {
        provider = this.secure3dProviders.get(Secure3dVersion.ONE);
      }
      return provider;
    } else {
      return null;
    }
  }

  setSecure3dProvider(
    version: Secure3dVersion,
    provider: Secure3dService,
  ): void {
    this.secure3dProviders.set(version, provider);
  }
}
