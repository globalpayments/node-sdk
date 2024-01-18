import {
  BaseBuilder,
  GatewayConfig,
  GpApiConfig,
  GpApiRequest,
  IRequestBuilder,
  Transaction,
} from "../../../../src";

export class GpApiMiCRequestBuilder implements IRequestBuilder {
  /***
   * @param  builder
   *
   * @return bool
   */
  public canProcess(builder: BaseBuilder<Transaction>) {
    builder;
    return true;
  }

  /**
   * @param BaseBuilder builder
   * @param GpApiConfig config
   * @return GpApiRequest|string
   */
  public buildRequest(
    builder: BaseBuilder<Transaction>,
    config: GatewayConfig,
  ): GpApiRequest {
    builder;
    config;
    return null as unknown as GpApiRequest;
    // TODO: Implement buildRequest() method.
  }

  public buildRequestFromJson(
    jsonRequest: string,
    config: GpApiConfig,
  ): GpApiRequest {
    const endpoint = GpApiRequest.DEVICE_ENDPOINT;
    const verb = "POST";
    config;
    return new GpApiRequest(endpoint, verb, jsonRequest);
  }
}
