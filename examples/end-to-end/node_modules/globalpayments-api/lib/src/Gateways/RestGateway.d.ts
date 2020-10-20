import { Gateway } from "./Gateway";
export declare abstract class RestGateway extends Gateway {
    static AUTHORIZATION_HEADER: string;
    constructor();
    doTransaction(verb: string, endpoint: string, requestData?: string): Promise<string>;
}
