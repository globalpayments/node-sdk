import { ArgumentError } from "../../src";

export class StringUtils {
  public static leftPad(
    source: string,
    length: number,
    padString: string,
  ): string {
    if (!source) {
      return source;
    }
    const pad = padString.repeat(length);
    return pad.substring(0, pad.length - source.length) + source;
  }

  public static uuid() {
    //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    let uuid = "";
    let ii;
    for (ii = 0; ii < 32; ii += 1) {
      switch (ii) {
        case 8:
        case 20:
          uuid += "-";
          uuid += ((Math.random() * 16) | 0).toString(16);
          break;
        case 12:
          uuid += "-";
          uuid += "4";
          break;
        case 16:
          uuid += "-";
          uuid += ((Math.random() * 4) | 8).toString(16);
          break;
        default:
          uuid += ((Math.random() * 16) | 0).toString(16);
      }
    }
    return uuid;
  }

  public static btoa(t: string) {
    if (Buffer.from) {
      return Buffer.from(t, "ascii").toString("base64");
    }

    return new Buffer(t, "ascii").toString("base64");
  }

  public static atob(t: string) {
    if (Buffer.from) {
      return Buffer.from(t, "base64").toString("ascii");
    }

    return new Buffer(t, "base64").toString("ascii");
  }

  /**
   * Strip all non-numeric characters
   *
   * @param value - The input string
   * @returns The string with non-numeric characters removed
   */
  public static validateToNumber(value: string): string {
    return value.replace(/[^0-9]/g, "");
  }

  static toAmount(str: string | null | undefined): string {
    if (!str) {
      return "0";
    }

    return (parseFloat(str) / 100).toString();
  }

  static toNumeric(value: string | null): string {
    if (value === null) {
      return "";
    }

    if (String(value) === "0") {
      return "000";
    }

    if (isNaN(parseFloat(value)) && !isFinite(parseFloat(value))) {
      throw new ArgumentError("A non well formed numeric value encountered!");
    }

    const f = parseFloat(value.toString()) * 100;
    return parseFloat(f.toFixed(2)).toString();
  }
}
