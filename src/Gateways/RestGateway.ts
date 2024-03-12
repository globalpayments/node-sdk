import { RequestIdProvider } from "../../test/Integration/Gateways/Terminals/RequestIdProvider";
import { GatewayError, GpApiConnector, IDictionary } from "../../src";
import { Gateway } from "./Gateway";

export abstract class RestGateway extends Gateway {
  public static AUTHORIZATION_HEADER = "Authorization";

  public constructor() {
    super("application/json");
  }

  public async doTransaction(
    verb: string,
    endpoint: string,
    requestData?: string,
    queryStringParams?: IDictionary<string>,
  ): Promise<string> {
    const requestId = new RequestIdProvider().getRequestId();

    const response = await this.sendRequest(
      verb,
      endpoint,
      requestId,
      requestData,
      queryStringParams,
    );

    const statusCodes = [200, 204, 201];

    if (statusCodes.indexOf(response.statusCode) === -1) {
      const parsed = JSON.parse(response.rawResponse);
      const error = parsed.error ? parsed.error : parsed;
      if (!error) {
        throw new GatewayError(`Status Code: ${response.statusCode}`);
      }

      if (this.isGpApi()) {
        const gatewayException = new GatewayError(
          `Status Code: ${error.error_code} - ` +
            `${
              error.detailed_error_description ||
              error.detailed_error_code ||
              JSON.stringify(error)
            }`,
          error.detailed_error_code || null,
          error.detailed_error_description || "",
        );

        if (this.requestLogger) {
          this.requestLogger.responseError(
            gatewayException,
            requestId,
            response.headers,
          );
        }

        throw gatewayException;
      } else {
        const errMsgProperty = [
          "error_description",
          "error_detail",
          "message",
          "eos_reason",
        ];
        let errorMessage = "";
        for (const propertyName of errMsgProperty) {
          if (error[propertyName]) {
            errorMessage += error[propertyName] + " ";
          }
        }
        throw new GatewayError(
          `Status Code: ${response.statusCode} - ${
            errorMessage || JSON.stringify(error)
          }`,
        );
      }
    }

    if (this.requestLogger) {
      this.requestLogger.responseReceived(response, requestId);
    }

    return response.rawResponse;
  }

  public override maskSensitiveData(data: string) {
    const requestData = JSON.parse(data);
    for (const maskedKey in this.maskedRequestData) {
      if (this.maskedRequestData.hasOwnProperty(maskedKey)) {
        const keys = maskedKey.split(".");
        let currentObject = requestData;

        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          if (!currentObject[key]) {
            currentObject[key] = {};
          }
          currentObject = currentObject[key];
        }

        const lastKey = keys[keys.length - 1];
        currentObject[lastKey] = this.maskedRequestData[maskedKey];
      }
    }

    return JSON.stringify(requestData);
  }

  private isGpApi() {
    return this instanceof GpApiConnector;
  }
}
