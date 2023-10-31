import { GpApiAuthorizationRequestBuilder } from ".";
import { GatewayProvider, IRequestBuilder, Transaction } from "../../Entities/";
import { BaseBuilder } from "../BaseBuilder";
import { GpEcomAuthorizationRequestBuilder } from "./GpEcom/GpEcomAuthorizationRequestBuilder";
import { GpEcomManagementRequestBuilder } from "./GpEcom/GpEcomManagementRequestBuilder";

export class RequestBuilderFactory {
  public supplementaryData: Record<string, string | string[]>;

  private static processes: Record<GatewayProvider, IRequestBuilder[]> = {
    [GatewayProvider.GpApi]: [new GpApiAuthorizationRequestBuilder()],
    [GatewayProvider.GpEcom]: [
      new GpEcomAuthorizationRequestBuilder(),
      new GpEcomManagementRequestBuilder(),
    ],
    [GatewayProvider.Portico]: [],
  };

  public getRequestBuilder(
    builder: BaseBuilder<Transaction>,
    gatewayProvider: GatewayProvider,
  ) {
    if (!RequestBuilderFactory.processes[gatewayProvider]) {
      return null;
    }

    for (const processName of RequestBuilderFactory.processes[
      gatewayProvider
    ]) {
      if (processName.canProcess(builder)) {
        return processName;
      }
    }

    return null;
  }
}
