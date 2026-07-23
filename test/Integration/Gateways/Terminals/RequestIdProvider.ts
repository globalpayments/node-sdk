import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { IRequestIdProvider } from "../../../../src";

export class RandomIdProvider implements IRequestIdProvider {
  public getRequestId(): number {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }
}

export class IncrementalNumberProvider implements IRequestIdProvider {
  private static _instance: IncrementalNumberProvider;
  private _currentNumber: number = 1000000;
  private readonly _fileName: string = path.join(
    process.env.REQUEST_ID_PROVIDER_DIR ?? os.tmpdir(),
    "requestNumber.dat",
  );

  private reportPersistenceError(operation: string, error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(
      `RequestIdProvider ${operation} failed for ${this._fileName}: ${message}`,
    );
  }

  public static getInstance(): IncrementalNumberProvider {
    if (!IncrementalNumberProvider._instance) {
      IncrementalNumberProvider._instance = new IncrementalNumberProvider();
    }
    return IncrementalNumberProvider._instance;
  }

  public get currentNumber(): number {
    return this._currentNumber;
  }

  private constructor() {
    try {
      const savedValue = fs.readFileSync(this._fileName, "utf8").split("\n")[0];
      if (savedValue && savedValue.trim() !== "") {
        this._currentNumber = parseInt(savedValue.trim(), 10);
      } else {
        this.saveCurrentNumber();
      }
    } catch (e) {
      this.saveCurrentNumber();
    }
  }

  public getRequestId(): number {
    if (this._currentNumber === 999999) {
      this._currentNumber = 100000;
    } else {
      this._currentNumber += 1;
    }
    this.saveCurrentNumber();
    return this._currentNumber;
  }

  private saveCurrentNumber(): void {
    try {
      const dir = path.dirname(this._fileName);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this._fileName, `${this._currentNumber}\n`, "utf8");
    } catch (e) {
      this.reportPersistenceError("save", e);
    }
  }
}

/** @deprecated Use RandomIdProvider instead */
export class RequestIdProvider extends RandomIdProvider {}
