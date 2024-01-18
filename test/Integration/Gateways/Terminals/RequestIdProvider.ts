import { IRequestIdProvider } from "../../../../src";

export class RequestIdProvider implements IRequestIdProvider {
  public getRequestId() {
    return 10000 + Math.round(10000 * Math.random());
  }
}
