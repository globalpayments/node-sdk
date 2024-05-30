import { ReportBuilder, Secure3dBuilder } from "src";
import { GpApiAuthorizationRequestBuilder } from ".";
import {
  GatewayProvider,
  IRequestBuilder,
  Transaction,
  TransactionSummary,
} from "../../Entities/";
import { BaseBuilder } from "../BaseBuilder";
import { GpApiManagementRequestBuilder } from "./GpApi/GpApiManagementRequestBuilder";
import { GpApiMiCRequestBuilder } from "./GpApi/GpApiMiCRequestBuilder";
import { GpEcomAuthorizationRequestBuilder } from "./GpEcom/GpEcomAuthorizationRequestBuilder";
import { GpEcomManagementRequestBuilder } from "./GpEcom/GpEcomManagementRequestBuilder";
import { GpApiReportRequestBuilder } from "./GpApi/GpApiReportRequestBuilder";
import { GpApiSecureRequestBuilder } from "./GpApi/GpApiSecureRequestBuilder";

export class RequestBuilderFactory {
  public supplementaryData: Record<string, string | string[]>;

  private static processes: Record<GatewayProvider, IRequestBuilder[]> = {
    [GatewayProvider.GpApi]: [
      new GpApiAuthorizationRequestBuilder(),
      new GpApiManagementRequestBuilder(),
      new GpApiReportRequestBuilder(),
      new GpApiSecureRequestBuilder(),
      new GpApiMiCRequestBuilder(),
    ],
    [GatewayProvider.GpEcom]: [
      new GpEcomAuthorizationRequestBuilder(),
      new GpEcomManagementRequestBuilder(),
    ],
    [GatewayProvider.Portico]: [],
  };

  public getRequestBuilder(
    builder:
      | BaseBuilder<Transaction>
      | ReportBuilder<TransactionSummary>
      | Secure3dBuilder,
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
