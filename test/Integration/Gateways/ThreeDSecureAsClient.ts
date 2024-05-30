import {
  ApiError,
  GatewayProvider,
  StringUtils,
  ThreeDSecure,
} from "../../../src";
import { AcsResponse } from "./AcsResponse";
import { request } from "https";

export class ThreeDSecureAcsClient {
  private serviceUrl: URL;
  private gatewayProvider: GatewayProvider;
  public authenticationResultCode: string;

  constructor(url: string) {
    this.serviceUrl = new URL(url);
  }

  public getGatewayProvider(): GatewayProvider {
    return this.gatewayProvider;
  }

  public setGatewayProvider(value: GatewayProvider): void {
    this.gatewayProvider = value;
  }

  public async authenticate_v2(
    secureEcom: ThreeDSecure,
  ): Promise<AcsResponse | boolean> {
    let kvps: { key: string; value: string }[] = [];
    let postData: string;
    const header = [
      "Content-Type: application/x-www-form-urlencoded",
      "cache-control: no-cache",
    ];
    const verb = "POST";
    let rawResponse: string;

    switch (this.gatewayProvider) {
      case GatewayProvider.GpEcom:
      case GatewayProvider.GpApi:
        const messageType =
          this.gatewayProvider === GatewayProvider.GpApi
            ? secureEcom.messageType
            : "creq";
        kvps.push({
          key: messageType,
          value: encodeURIComponent(secureEcom.payerAuthenticationRequest),
        });
        postData = this.buildData(kvps);
        await this.sendRequest(verb, postData, header);
        kvps = [{ key: "get-status-type", value: "true" }];
        do {
          postData = this.buildData(kvps);
          rawResponse = await this.sendRequest(verb, postData, header);
          await new Promise((res) => setTimeout(res, 5000));
        } while (rawResponse.trim() === "IN_PROGRESS");
        rawResponse = await this.sendRequest(verb, "", header);

        kvps = [];
        const cres = this.getInputValue(rawResponse, "cres");
        kvps.push({ key: "cres", value: encodeURIComponent(cres) });
        postData = this.buildData(kvps);
        this.serviceUrl = new URL(
          this.getInputValue(rawResponse, undefined, "ResForm"),
        );
        rawResponse = await this.sendRequest(verb, postData, header);
        const rValue = new AcsResponse();
        let status = false;
        if (StringUtils.isJson(rawResponse)) {
          const parsedResponse = JSON.parse(rawResponse);
          status = !!parsedResponse.success;
        }
        rValue.setStatus(status);
        if (cres) {
          const acsDecodedRS = JSON.parse(atob(cres));
          if (acsDecodedRS.threeDSServerTransID) {
            rValue.setMerchantData(acsDecodedRS.threeDSServerTransID);
          }
        }
        return rValue;
      default:
        return false;
    }
  }

  public async authenticate_v1(
    secureEcom: ThreeDSecure,
  ): Promise<AcsResponse | boolean> {
    let kvps: { key: string; value: string }[] = [];
    let postData: string;
    const header = [
      "Content-Type: application/x-www-form-urlencoded",
      "cache-control: no-cache",
    ];
    const verb = "POST";
    let rawResponse: string;

    switch (this.gatewayProvider) {
      case GatewayProvider.GpApi:
        kvps.push({
          key: "TermUrl",
          value: encodeURIComponent(secureEcom.challengeReturnUrl),
        });
        kvps.push({
          key: secureEcom.sessionDataFieldName,
          value: secureEcom.serverTransactionId,
        });
        kvps.push({
          key: secureEcom.messageType,
          value: encodeURIComponent(secureEcom.payerAuthenticationRequest),
        });
        kvps.push({
          key: "AuthenticationResultCode",
          value: this.authenticationResultCode,
        });

        postData = this.buildData(kvps);
        rawResponse = await this.sendRequest(verb, postData, header);
        kvps = [];
        const paRes = this.getInputValue(rawResponse, "PaRes");
        kvps.push({ key: "PaRes", value: encodeURIComponent(paRes) });
        kvps.push({ key: "MD", value: this.getInputValue(rawResponse, "MD") });
        postData = this.buildData(kvps);
        this.serviceUrl = new URL(
          this.getInputValue(rawResponse, undefined, "PAResForm"),
        );
        const rawResponse2 = await this.sendRequest(verb, postData, header);

        const rValue = new AcsResponse();
        if (StringUtils.isJson(rawResponse2)) {
          const parsedResponse = JSON.parse(rawResponse2);
          rValue.setStatus(!!parsedResponse.success);
          rValue.setAuthResponse(paRes);
          rValue.setMerchantData(this.getInputValue(rawResponse, "MD"));
        }
        return rValue;
      default:
        return false;
    }
  }

  public async authenticate(
    payerAuthRequest: string,
    merchantData = "",
  ): Promise<AcsResponse | boolean> {
    const kvps: { key: string; value: string }[] = [];
    let postData: string;
    const header = [
      "Content-Type: application/x-www-form-urlencoded",
      "cache-control: no-cache",
    ];
    const verb = "POST";
    let rawResponse: string;

    switch (this.gatewayProvider) {
      case GatewayProvider.GpEcom:
        kvps.push({
          key: "PaReq",
          value: encodeURIComponent(payerAuthRequest),
        });
        kvps.push({
          key: "TermUrl",
          value: encodeURIComponent(
            "https://www.mywebsite.com/process3dSecure",
          ),
        });
        kvps.push({ key: "MD", value: encodeURIComponent(merchantData) });
        postData = this.buildData(kvps);
        rawResponse = await this.sendRequest(verb, postData, header);

        const rValue = new AcsResponse();
        rValue.setAuthResponse(this.getInputValue(rawResponse, "PaRes"));
        rValue.setMerchantData(this.getInputValue(rawResponse, "MD"));
        return rValue;
      default:
        return false;
    }
  }

  private async sendRequest(
    verb: string,
    data: string,
    headers: string[],
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      /* eslint-disable */
      const mappedHeaders = headers.reduce((acc, header) => {
        const [key, value] = header.split(": ");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
      /* eslint-enable  */

      const req = request(
        {
          host: this.serviceUrl.hostname,
          path: this.serviceUrl.pathname,
          method: verb,
          headers: mappedHeaders,
        },
        (res) => {
          let responseBody = "";

          // Listen for data chunks
          res.on("data", (chunk) => {
            responseBody += chunk;
          });

          // Handle the end of the response
          res.on("end", () => {
            resolve(responseBody);
          });
        },
      );

      // Handle request errors
      req.on("error", (error) => {
        reject(
          new ApiError(`Acs request failed with message: ${error.message}`),
        );
      });

      // Write data to request body
      req.write(data);

      // End the request
      req.end();
    });
  }

  private buildData(kvps: { key: string; value: string }[]): string {
    return kvps.map((kvp) => `${kvp.key}=${kvp.value}`).join("&");
  }

  private getInputValue(
    raw: string,
    inputValue?: string,
    formName?: string,
  ): string {
    if (!raw) {
      return "";
    }
    let searchString: string;
    if (inputValue) {
      searchString = `name="${inputValue}" value="`;
    } else if (formName) {
      searchString = `name="${formName}" action="`;
    } else {
      return "";
    }

    const index = raw.indexOf(searchString);
    if (index > -1) {
      const startIndex = index + searchString.length;
      const length = raw.indexOf('"', startIndex) - startIndex;
      return raw.substring(startIndex, startIndex + length);
    }
    return "";
  }
}
