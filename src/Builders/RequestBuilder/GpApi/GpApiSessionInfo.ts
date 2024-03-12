import * as crypto from "crypto";
import { GpApiRequest, IntervalToExpire } from "../../../../src/Entities";
import { AccessTokenRequest } from "./AccessTokenRequest";

export class GpApiSessionInfo {
  private static generateSecret(nonce: string, appKey: string) {
    return crypto
      .createHash("sha512")
      .update(nonce + appKey)
      .digest("hex")
      .toLowerCase();
  }

  private static generateNonce() {
    const base = new Date();
    return base.toISOString();
  }

  public static async signIn(
    appId: string,
    appKey: string,
    secondsToExpire: number = 0,
    intervalToExpire: IntervalToExpire | null = null,
    permissions: string[],
  ) {
    const nonce = GpApiSessionInfo.generateNonce();

    const requestBody = new AccessTokenRequest(
      appId,
      nonce,
      GpApiSessionInfo.generateSecret(nonce, appKey),
      "client_credentials",
      secondsToExpire,
      intervalToExpire,
      permissions,
    );

    return new GpApiRequest(
      GpApiRequest.ACCESS_TOKEN_ENDPOINT,
      "POST",
      JSON.stringify(requestBody),
    );
  }
}
