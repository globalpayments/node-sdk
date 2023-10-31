import { IPaymentGateway, IRecurringService } from "./Gateways";
import { IPayFacProvider } from "./Gateways/IPayFacProvider";
import { ReportingService } from "./Services";

export class ConfiguredServices {
  private payFacProvider: IPayFacProvider;

  public gatewayConnector: IPaymentGateway;

  public recurringConnector: IRecurringService;

  public reportingService: ReportingService;

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
}
