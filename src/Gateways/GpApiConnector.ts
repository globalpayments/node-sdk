import * as fs from "fs";
import { IPayFacProvider } from "./IPayFacProvider";
import { IPaymentGateway } from "./IPaymentGateway";
import { RestGateway } from "./RestGateway";
import {
  AccessTokenInfo,
  ApiError,
  GpApiRequest,
  GpApiTokenResponse,
  NotImplementedError,
  Request,
  Secure3dVersion,
  Transaction,
} from "../../src/Entities";
import {
  AuthorizationBuilder,
  BaseBuilder,
  GpApiConfig,
  GpApiMapping,
  GpApiSessionInfo,
  IDictionary,
  ManagementBuilder,
  ReportBuilder,
  RequestBuilderFactory,
} from "../../src";
import { PayFacBuilder } from "src/Builders/PayFacBuilder";

export class GpApiConnector
  extends RestGateway
  implements IPaymentGateway, IPayFacProvider
{
  public static GP_API_VERSION: string = "2021-03-22";

  public static IDEMPOTENCY_HEADER: string = "x-gp-idempotency";

  private gpApiConfig: GpApiConfig;

  private accessToken: string;

  private builtInMerchantManagementService: boolean = true;

  public supportsHostedPayments: boolean = true;

  public supportsOpenBanking(): boolean {
    return true;
  }

  public hasBuiltInMerchantManagementService(): boolean {
    return this.builtInMerchantManagementService;
  }

  constructor(config: GpApiConfig) {
    super();

    this.gpApiConfig = config;
    this.headers["X-GP-Version"] = GpApiConnector.GP_API_VERSION;
    this.headers["Accept"] = "application/json";
    this.headers["Accept-Encoding"] = "gzip";
    this.headers["x-gp-sdk"] = "node;version=" + this.getReleaseVersion();
    this.headers["Content-Type"] = "charset=UTF-8";
  }

  /**
   * Get the SDK release version
   *
   * @return string|null
   */
  private getReleaseVersion(): string | null {
    const filename = __dirname + "/../../../package.json";
    if (!fs.existsSync(filename)) {
      return null;
    }

    const packageJson = JSON.parse(fs.readFileSync(filename).toString());

    return packageJson.version || "";
  }

  public getVersion(): string {
    return Secure3dVersion.ANY;
  }

  /**
   * Serializes and executes authorization transactions
   *
   * @param AuthorizationBuilder builder The transaction's builder
   *
   * @return Transaction
   */
  public async processAuthorization(
    builder: AuthorizationBuilder,
  ): Promise<Transaction> {
    if (!this.accessToken) {
      await this.signIn();
    }
    return this.executeProcess(builder).then((response: string) =>
      GpApiMapping.mapResponse(response),
    );
  }

  public async signIn() {
    let accessTokenInfo = this.gpApiConfig.accessTokenInfo;
    if (accessTokenInfo && accessTokenInfo.accessToken) {
      this.headers["Authorization"] = `Bearer {accessTokenInfo.accessToken}`;
      return;
    }

    const response = await this.getAccessToken();

    this.accessToken = response.getToken();
    this.headers["Authorization"] = `Bearer ${this.accessToken}`;
    if (!(accessTokenInfo instanceof AccessTokenInfo)) {
      accessTokenInfo = new AccessTokenInfo();
    }

    accessTokenInfo.merchantId = response.merchantId;

    if (!accessTokenInfo.accessToken) {
      accessTokenInfo.accessToken = response.getToken();
    }

    if (!accessTokenInfo.dataAccountID) {
      accessTokenInfo.dataAccountID = response.getDataAccountID();
    }
    if (
      !accessTokenInfo.tokenizationAccountID &&
      !accessTokenInfo.tokenizationAccountName
    ) {
      accessTokenInfo.tokenizationAccountID =
        response.getTokenizationAccountID();
      accessTokenInfo.tokenizationAccountName =
        response.getTokenizationAccountName();
    }

    if (
      !accessTokenInfo.transactionProcessingAccountID &&
      !accessTokenInfo.transactionProcessingAccountName
    ) {
      accessTokenInfo.transactionProcessingAccountID =
        response.getTransactionProcessingAccountID();
      accessTokenInfo.transactionProcessingAccountName =
        response.getTransactionProcessingAccountName();
    }
    if (
      !accessTokenInfo.disputeManagementAccountID &&
      !accessTokenInfo.disputeManagementAccountName
    ) {
      accessTokenInfo.disputeManagementAccountID =
        response.getDisputeManagementAccountID();
    }
    if (
      !accessTokenInfo.riskAssessmentAccountID &&
      !accessTokenInfo.riskAssessmentAccountName
    ) {
      accessTokenInfo.riskAssessmentAccountID =
        response.getRiskAssessmentAccountID();
    }

    if (
      !accessTokenInfo.merchantManagementAccountID &&
      !accessTokenInfo.merchantManagementAccountName
    ) {
      accessTokenInfo.merchantManagementAccountID =
        response.getMerchantManagementAccountID();
    }
    this.gpApiConfig.accessTokenInfo = accessTokenInfo;
  }

  public async getAccessToken(): Promise<GpApiTokenResponse> {
    this.accessToken = "";

    const request = await GpApiSessionInfo.signIn(
      this.gpApiConfig.appId,
      this.gpApiConfig.appKey,
      this.gpApiConfig.secondsToExpire,
      this.gpApiConfig.intervalToExpire,
      this.gpApiConfig.permissions,
    );

    return super
      .doTransaction(request.httpVerb, request.endpoint, request.requestBody)
      .then((response) => new GpApiTokenResponse(response));
  }

  async manageTransaction(builder: ManagementBuilder): Promise<Transaction> {
    builder; // avoid lint error
    throw new NotImplementedError();
  }
  async processReport<T>(builder: ReportBuilder<T>): Promise<T> {
    builder; // avoid lint error
    throw new NotImplementedError();
  }
  serializeRequest(builder: AuthorizationBuilder): string {
    builder; // avoid lint error
    throw new NotImplementedError();
  }

  async processPayFac(builder: PayFacBuilder): Promise<Transaction> {
    builder; // avoid lint error
    throw new NotImplementedError();
  }

  private executeProcess(builder: BaseBuilder<Transaction>) {
    const processFactory = new RequestBuilderFactory();

    const requestBuilder = processFactory.getRequestBuilder(
      builder,
      this.gpApiConfig.gatewayProvider,
    );
    if (!requestBuilder) {
      throw new ApiError("Request builder not found!");
    }
    /**.
     * @var GpApiRequest request
     */
    const request = requestBuilder.buildRequest(builder, this.gpApiConfig);
    request.endpoint = this.getMerchantUrl(request) + request.endpoint;

    if (!request) {
      throw new ApiError("Request was not generated!");
    }

    const idempotencyKey = builder.idempotencyKey || null;

    if (Request.maskedValues) {
      this.maskedRequestData = Request.maskedValues;
    }

    return this.doTransaction(
      request.httpVerb,
      request.endpoint,
      request.requestBody,
      request.queryParams as IDictionary<string>,
      idempotencyKey,
    );
  }

  private getMerchantUrl(request: GpApiRequest) {
    return !this.gpApiConfig.merchantId &&
      request.endpoint.indexOf(GpApiRequest.MERCHANT_MANAGEMENT_ENDPOINT) !== -1
      ? GpApiRequest.MERCHANT_MANAGEMENT_ENDPOINT +
          "/" +
          this.gpApiConfig.merchantId
      : "";
  }

  public async doTransaction(
    verb: string,
    endpoint: string,
    data?: string,
    queryStringParams?: IDictionary<string>,
    idempotencyKey?: string,
  ) {
    if (!this.accessToken) {
      this.signIn();
    }
    if (idempotencyKey) {
      this.headers[GpApiConnector.IDEMPOTENCY_HEADER] = idempotencyKey;
    }

    //weird bug where if you populate the contentType header on this endpoint it throws a 502 bad gateway error
    //if you don't send it the error is even weirder, you just have to send it empty
    if (
      endpoint.indexOf("settlement") !== -1 ||
      (endpoint.indexOf("disputes") !== -1 &&
        endpoint.indexOf("challenge") !== -1)
    ) {
      this.contentType = "";
    }
    let response;

    try {
      response = await super.doTransaction(
        verb,
        endpoint,
        data,
        queryStringParams,
      );
    } catch (exception) {
      if (
        exception.getMessage().indexOf("NOT_AUTHENTICATED") !== -1 &&
        this.gpApiConfig.appKey &&
        this.gpApiConfig.appKey
      ) {
        this.accessToken = "";
        this.signIn();
        return super.doTransaction(verb, endpoint, data, queryStringParams);
      }

      throw exception;
    } finally {
      delete this.headers[GpApiConnector.IDEMPOTENCY_HEADER];
    }

    return JSON.parse(response);
  }
}
