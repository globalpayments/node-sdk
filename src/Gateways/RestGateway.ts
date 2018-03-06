import { Gateway } from "./Gateway";

export abstract class RestGateway extends Gateway {
  public static AUTHORIZATION_HEADER = "Authorization";

  public constructor() {
    super("application/json");
  }

  public doTransaction(
    verb: string,
    endpoint: string,
    requestData?: string,
  ): Promise<string> {
    return this.sendRequest(verb, endpoint, requestData);
  }
}
