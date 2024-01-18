import { IDeviceMessage } from ".";

export class DeviceMessage implements IDeviceMessage {
  public keepAlive: boolean;
  public awaitResponse: boolean;
  private buffer: Buffer;
  private jsonRequest: Record<string, any>;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }

  public getSendBuffer(): Buffer {
    return this.buffer;
  }

  public setJsonRequest(jsonRequest: any[]): void {
    this.jsonRequest = jsonRequest;
  }

  public getJsonRequest(): Record<string, any> {
    return this.jsonRequest;
  }

  public toString(): string {
    return this.buffer.toString();
  }

  public getRequestField(key: string): any {
    return this.iterateDeep(this.jsonRequest, key);
  }

  private iterateDeep(obj: Record<string, any>, key: string): any {
    if (!this.jsonRequest || typeof this.jsonRequest !== "object") {
      return undefined;
    }

    if (obj[key]) {
      return obj[key];
    }

    for (const objectKey in obj) {
      if (typeof obj[objectKey] === "object" && obj[objectKey] !== null) {
        return this.iterateDeep(obj[objectKey], key);
      }
    }
  }
}
