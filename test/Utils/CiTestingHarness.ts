import * as fs from "fs";
import * as path from "path";
import {
  IRequestIdProvider,
} from "../../src";

export enum CacheMode {
  Locked = "Locked",
  Unlocked = "Unlocked",
}

const proxyEndpoint = process.env.PROXY_ENDPOINT;

export class CiTestingHarness {
  private static readonly PROXY_ENDPOINT = `https://${proxyEndpoint}/proxy`;

  private targetServiceUrl: string;
  private cacheMode: CacheMode;
  private testName: string;
  private idMap: Record<string, string>;
  private fixedTimestamp: number;

  private language = "node";
  private category: string | null = null;
  private subcategory: string | null = null;
  private currentFunction: string | null = null;

  constructor(
    targetServiceUrl: string,
    cacheMode: CacheMode,
    testName: string,
  ) {
    this.targetServiceUrl = targetServiceUrl;
    this.cacheMode = cacheMode;
    this.testName = testName;

    process.env.SDK_TESTING = "true";

    const jsonFilePath = this.getJsonFilePath();

    if (cacheMode === CacheMode.Locked) {
      const raw = fs.readFileSync(jsonFilePath, "utf-8");
      this.idMap = JSON.parse(raw);
      this.fixedTimestamp = parseInt(this.idMap["_fixedTimestamp"], 10);
    } else {
      this.idMap = this.loadExistingIds();
      if (!this.idMap["_fixedTimestamp"]) {
        this.idMap["_fixedTimestamp"] = Date.now().toString();
        this.writeJsonFile();
      }
      this.fixedTimestamp = parseInt(this.idMap["_fixedTimestamp"], 10);
    }

    jest.useFakeTimers({
      now: this.fixedTimestamp,
      doNotFake: [
        "setTimeout",
        "setInterval",
        "setImmediate",
        "clearTimeout",
        "clearInterval",
        "clearImmediate",
        "queueMicrotask",
      ],
    });
  }

  /**
   * Set the function being tested. The convention is "category|subcategory|function".
   * This is parsed at runtime into the respective fields and appended to the proxy URL
   * so the proxy validates them against its functionality list and records the test run.
   */
  public setFunction(functionPath: string | null): void {
    if (functionPath === null) {
      this.category = null;
      this.subcategory = null;
      this.currentFunction = null;
    } else {
      const parts = functionPath.split("|", 3);
      if (parts.length === 3) {
        this.category = parts[0];
        this.subcategory = parts[1];
        this.currentFunction = parts[2];
      } else {
        this.category = null;
        this.subcategory = null;
        this.currentFunction = functionPath;
      }
    }
  }

  /**
   * Override the default language tag ("node") sent to the proxy.
   * This is rarely needed; it exists for cross-language test scenarios.
   */
  public setLanguage(language: string): void {
    this.language = language;
  }

  /**
   * Reset the harness fields so a stale function tag does not leak from one test
   * method into the next. Call this after the test URL has been consumed.
   */
  public reset(): void {
    this.category = null;
    this.subcategory = null;
    this.currentFunction = null;
  }

  public getTestingUrl(): string {
    const cacheReturns = this.cacheMode === CacheMode.Locked;
    let targetHost = this.targetServiceUrl;

    // Strip protocol prefix and replace with https:/
    targetHost = targetHost.replace(/^https?:\/\//, "");
    targetHost = "https:/" + targetHost;

    let args = `cacheReturns:${cacheReturns}`;
    if (
      this.language !== null &&
      this.category !== null &&
      this.subcategory !== null &&
      this.currentFunction !== null
    ) {
      args += `,language:${this.encodeUrlPathSegment(this.language)}`;
      args += `,category:${this.encodeUrlPathSegment(this.category)}`;
      args += `,subcategory:${this.encodeUrlPathSegment(this.subcategory)}`;
      args += `,function:${this.encodeUrlPathSegment(this.currentFunction)}`;
    }

    return `${CiTestingHarness.PROXY_ENDPOINT}/(${args})/${targetHost}`;
  }

  public generateRandomId(key: string): string {
    if (this.cacheMode === CacheMode.Locked) {
      if (this.idMap[key]) {
        return this.idMap[key];
      }

      throw new Error(
        `Harness is locked but no cached ID found for key: ${key}. Run tests in Unlocked mode first.`,
      );
    }

    const id = (Math.floor(Math.random() * 90000000) + 10000000).toString();
    this.idMap[key] = id;
    this.writeJsonFile();
    return id;
  }

  public generateRandomAmount(
    key: string,
    min: number,
    max: number,
    decimals: number,
  ): string {
    if (this.cacheMode === CacheMode.Locked) {
      if (this.idMap[key]) {
        return this.idMap[key];
      }

      throw new Error(
        `Harness is locked but no cached value found for key: ${key}. Run tests in Unlocked mode first.`,
      );
    }

    const raw = min + Math.random() * (max - min);
    const amount = raw.toFixed(decimals);
    this.idMap[key] = amount;
    this.writeJsonFile();
    return amount;
  }

  public createRequestIdProvider(key: string): IRequestIdProvider {
    let counter = 0;
    return {
      getRequestId: () => {
        return parseInt(this.generateRandomId(`${key}_${counter++}`), 10);
      },
    };
  }

  public getCurrentTime(): Date {
    return new Date();
  }

  private encodeUrlPathSegment(value: string): string {
    return encodeURIComponent(value);
  }

  private loadExistingIds(): Record<string, string> {
    const jsonFilePath = this.getJsonFilePath();
    if (fs.existsSync(jsonFilePath)) {
      const raw = fs.readFileSync(jsonFilePath, "utf-8");
      return JSON.parse(raw);
    }
    return {};
  }

  private getJsonFilePath(): string {
    // __dirname resolves differently depending on whether we are running the
    // TypeScript source directly (test/Utils/) or the compiled output
    // (lib/test/Utils/).  Rather than counting ".." segments, we walk up from
    // __dirname until we find the directory that contains package.json, which
    // is always the project root.  From there we can reliably reach the
    // source-controlled test/resources/citesting directory.
    let dir = __dirname;
    while (!fs.existsSync(path.join(dir, "package.json"))) {
      const parent = path.dirname(dir);
      if (parent === dir) {
        throw new Error(
          "Could not locate project root (package.json not found)",
        );
      }
      dir = parent;
    }
    return path.resolve(
      dir,
      "test",
      "resources",
      "citesting",
      `${this.testName}.json`,
    );
  }

  private writeJsonFile(): void {
    const jsonFilePath = this.getJsonFilePath();
    const dir = path.dirname(jsonFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(this.idMap, null, 2));
  }
}
