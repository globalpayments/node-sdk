import { hex_sha1 as sha1 } from "./Sha1";
import * as crypto from "crypto";

import { StringUtils } from "../";

export class GenerationUtils {
  public static generateHash(toHash: string, secret?: string): string {
    const toHashFirstPass = sha1(toHash);
    if (!secret) {
      return toHashFirstPass;
    }
    const toHashSecondPass = `${toHashFirstPass}.${secret}`;
    return sha1(toHashSecondPass);
  }

  public static generateTimestamp(): string {
    const date = new Date();
    return (
      date.getUTCFullYear().toString() +
      StringUtils.leftPad((date.getUTCMonth() + 1).toString(), 2, "0") +
      StringUtils.leftPad(date.getUTCDate().toString(), 2, "0") +
      StringUtils.leftPad(date.getUTCHours().toString(), 2, "0") +
      StringUtils.leftPad(date.getUTCMinutes().toString(), 2, "0") +
      StringUtils.leftPad(date.getUTCSeconds().toString(), 2, "0")
    );
  }

  public static generateOrderId(): string {
    const id = StringUtils.uuid();
    return Buffer.from(id, "ascii")
      .toString("base64")
      .replace("=", "")
      .replace("+", "-")
      .replace("/", "_");
  }

  public static getGuuid() {
    function bin2hex(buffer: Uint8Array): string {
      return Array.prototype.map
        .call(buffer, (byte: number) => {
          return ("0" + (byte & 0xff).toString(16)).slice(-2);
        })
        .join("");
    }

    const data = crypto.getRandomValues(new Uint8Array(16));
    data[6] = (data[6] & 0x0f) | 0x40; // set version to 0100
    data[8] = (data[8] & 0x3f) | 0x80; // set bits 6-7 to 10

    const hexString = bin2hex(data);

    const formattedUUID = [
      hexString.slice(0, 8),
      hexString.slice(8, 12),
      hexString.slice(12, 16),
      hexString.slice(16, 20),
      hexString.slice(20),
    ].join("-");

    return formattedUUID;
  }
}
