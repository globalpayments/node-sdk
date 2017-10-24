import { Gateway } from "./Gateway";

export abstract class XmlGateway extends Gateway {
  public constructor() {
    super("text/xml");
  }

  public doTransaction(requestData: string): Promise<string> {
    return this.sendRequest("POST", "", requestData);
  }
}
