import { Gateway } from "./Gateway";
export declare abstract class XmlGateway extends Gateway {
    constructor();
    doTransaction(requestData: string): Promise<string>;
}
