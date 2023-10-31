import { Gateway } from "./Gateway";
import { GatewayResponse } from "./GatewayResponse";

export abstract class XmlGateway extends Gateway {
  public constructor() {
    super("text/xml");
  }

  public doTransaction(requestData: string): Promise<string> {
    return this.sendRequest("POST", "", requestData).then(
      (response: GatewayResponse) => response.rawResponse,
    );
  }
}
