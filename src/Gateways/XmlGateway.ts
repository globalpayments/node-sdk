import { RequestIdProvider } from "../../test/Integration/Gateways/Terminals/RequestIdProvider";
import { Gateway } from "./Gateway";
import { GatewayResponse } from "./GatewayResponse";
import { ElementTree, XML as xml } from "@azz/elementtree";
export abstract class XmlGateway extends Gateway {
  public constructor() {
    super("text/xml");
  }

  public doTransaction(requestData: string): Promise<string> {
    const requestId = new RequestIdProvider().getRequestId();

    return this.sendRequest("POST", "", requestId, requestData).then(
      (response: GatewayResponse) => response.rawResponse,
    );
  }

  public override maskSensitiveData(data: string) {
    const root = xml(data);

    Object.keys(this.maskedRequestData).forEach((key) => {
      const splittedKeys = key.split(".");
      if (splittedKeys.length) {
        const element = root.find(splittedKeys[0]);
        if (element) {
          if (splittedKeys[1]) {
            const subElement = element.find(splittedKeys[1]);
            if (splittedKeys[2]) {
              subElement.find(splittedKeys[2]).text =
                this.maskedRequestData[key];
            } else {
              subElement.text = this.maskedRequestData[key];
            }
          } else {
            element.text = this.maskedRequestData[key];
          }
        }
      } else {
        root.find(key) && (root.find(key).text = this.maskedRequestData[key]);
      }
    });

    return new ElementTree(root)
      .write({
        indent: "    ",
      })
      .replaceAll("    1", "    ");
  }
}
