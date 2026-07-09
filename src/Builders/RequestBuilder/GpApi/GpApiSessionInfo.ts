import * as crypto from "crypto";
import {
  GpApiRequest,
  IntervalToExpire,
  PorticoTokenConfig,
} from "../../../../src/Entities";
import { AccessTokenRequest } from "./AccessTokenRequest";

/**
 * Builds the GP API access-token (sign-in) request.
 *
 * com.global.api.entities.gpApi.GpApiSessionInfo: a single signIn()
 * method that takes an optional PorticoTokenConfig and branches on it,
 * plus a buildCredentials() helper for the Portico-credentials flow.
 */
export class GpApiSessionInfo {
  private static generateSecret(nonce: string, appKey: string) {
    return crypto
      .createHash("sha512")
      .update(nonce + appKey)
      .digest("hex")
      .toLowerCase();
  }

  private static generateNonce() {
    return new Date().toISOString();
  }

  public static async signIn(
    appId: string,
    appKey: string,
    secondsToExpire: number = 0,
    intervalToExpire: IntervalToExpire | null = null,
    permissions: string[],
    porticoTokenConfig: PorticoTokenConfig | null = null,
  ) {
    let requestBody: object;

    if (porticoTokenConfig) {
      const credentials = GpApiSessionInfo.buildCredentials(porticoTokenConfig);
      const portico: Record<string, any> = {
        credentials,
        grant_type: "client_credentials",
      };
      if (appId) {
        portico.app_id = appId;
      }
      requestBody = portico;
    } else {
      const nonce = GpApiSessionInfo.generateNonce();
      requestBody = new AccessTokenRequest(
        appId,
        nonce,
        GpApiSessionInfo.generateSecret(nonce, appKey),
        "client_credentials",
        secondsToExpire,
        intervalToExpire,
        permissions,
      );
    }

    return new GpApiRequest(
      GpApiRequest.ACCESS_TOKEN_ENDPOINT,
      "POST",
      JSON.stringify(requestBody),
    );
  }

  public static signOut(): GpApiRequest | null {
    return null;
  }

  private static buildCredentials(
    config: PorticoTokenConfig,
  ): Array<{ name: string; value: string }> {
    const credentials: Array<{ name: string; value: string }> = [];

    const hasDevice = !!config.deviceId;
    const hasSite = !!config.siteId;
    const hasLicense = !!config.licenseId;
    const hasUsername = !!config.username;
    const hasPassword = !!config.password;
    const hasApiKey = !!config.secretApiKey;

    if (hasDevice && hasSite && hasLicense && hasUsername && hasPassword) {
      credentials.push(
        { name: "device_id", value: String(config.deviceId) },
        { name: "site_id", value: String(config.siteId) },
        { name: "license_id", value: String(config.licenseId) },
        { name: "username", value: config.username },
        { name: "password", value: config.password },
      );
    } else if (hasApiKey) {
      credentials.push({ name: "apikey", value: config.secretApiKey });
    }

    return credentials;
  }
}
