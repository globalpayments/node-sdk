import { RequestOptions } from "https";
import * as url from "url";

import { IDictionary } from "../Builders";
import { request } from "./https-wrapper";
import { GatewayResponse } from "./GatewayResponse";
import { Environment, IRequestLogger } from "../../src";

export abstract class Gateway {
  public headers: IDictionary<string>;
  public timeout: number;
  public serviceUrl: string;
  protected contentType: string;
  public maskedRequestData: Record<string, string>;
  public requestLogger: IRequestLogger;
  public environment: Environment;

  public constructor(contentType: string) {
    this.contentType = contentType;
    this.headers = {};
    this.headers["Content-Type"] = this.contentType;
  }

  public async sendRequest(
    httpMethod: string,
    endpoint: string,
    requestId: number,
    data?: string,
    queryStringParams?: IDictionary<string>,
  ): Promise<GatewayResponse> {
    const uri = url.parse(this.serviceUrl);
    const queryString = this.buildQueryString(queryStringParams);
    const options: RequestOptions = {
      headers: this.headers,
      host: uri.host,
      method: httpMethod,
      path: uri.path + endpoint + queryString,
      port: uri.port ? parseInt(uri.port, 10) : 443,
      timeout: this.timeout || 100000,
    };

    if (data !== undefined && options && options.headers) {
      options.headers["Content-Length"] = data.length;
    }

    if (this.requestLogger) {
      const environment = this.environment;
      this.environment = Environment.Production;
      const dataLogged =
        data &&
        this.maskedRequestData &&
        this.environment === Environment.Production
          ? this.maskSensitiveData(data)
          : data;
      this.environment = environment;

      this.requestLogger.requestSent(
        httpMethod,
        this.serviceUrl + endpoint + (queryStringParams || ""),
        requestId,
        this.headers,
        dataLogged,
      );
    }
    try {
      const response = await request(data, options);

      if (this.requestLogger) {
        this.requestLogger.responseReceived(response, requestId);
      }

      return response;
    } catch (e) {
      if (this.requestLogger) {
        this.requestLogger.responseError(e, requestId, e.headers);
      }

      throw e;
    }
  }

  maskSensitiveData(data: string) {
    // overriden in XmlGateway and RestGateway
    data;
  }

  protected buildQueryString(queryStringParams?: IDictionary<string>) {
    if (queryStringParams === undefined) {
      return "";
    }
    const params: string[] = [];
    for (const param in queryStringParams) {
      if (queryStringParams.hasOwnProperty(param)) {
        params.push(
          `${encodeURIComponent(param)}=${encodeURIComponent(
            queryStringParams[param],
          )}`,
        );
      }
    }

    return `?${params.join("&")}`;
  }
}
