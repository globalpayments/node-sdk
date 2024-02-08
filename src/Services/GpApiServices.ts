import {
  AccessTokenInfo,
  Environment,
  GpApiConfig,
  GpApiConnector,
  ServiceEndpoints,
} from "../../src";

export class GpApiService {
  public static async generateTransactionKey(config: GpApiConfig) {
    const gateway = new GpApiConnector(config);
    if (!gateway.serviceUrl) {
      gateway.serviceUrl =
        config.environment == Environment.Production
          ? ServiceEndpoints.GP_API_PRODUCTION
          : ServiceEndpoints.GP_API_TEST;
    }

    gateway.requestLogger = config.requestLogger;

    // TODO to be backfilled when implemented
    // gateway.webProxy = config.webProxy;
    // gateway.dynamicHeaders = config.dynamicHeaders;

    const data = await gateway.getAccessToken();

    const accessTokenInfo = new AccessTokenInfo();
    accessTokenInfo.accessToken = data.token;
    accessTokenInfo.dataAccountName = data.getDataAccountName();
    accessTokenInfo.disputeManagementAccountName =
      data.getDisputeManagementAccountName();
    accessTokenInfo.transactionProcessingAccountName =
      data.getTransactionProcessingAccountName();
    accessTokenInfo.tokenizationAccountName = data.getTokenizationAccountName();
    accessTokenInfo.riskAssessmentAccountName =
      data.getRiskAssessmentAccountName();
    accessTokenInfo.merchantManagementAccountName =
      data.getMerchantManagementAccountName();
    accessTokenInfo.dataAccountID = data.getDataAccountID();
    accessTokenInfo.disputeManagementAccountID =
      data.getDisputeManagementAccountID();
    accessTokenInfo.transactionProcessingAccountID =
      data.getTransactionProcessingAccountID();
    accessTokenInfo.tokenizationAccountID = data.getTokenizationAccountID();
    accessTokenInfo.riskAssessmentAccountID = data.getRiskAssessmentAccountID();
    accessTokenInfo.merchantManagementAccountID =
      data.getMerchantManagementAccountID();

    return accessTokenInfo;
  }
}
