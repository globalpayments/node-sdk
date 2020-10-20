import { IDictionary } from "../Builders";
export declare abstract class Gateway {
    headers: IDictionary<string>;
    timeout: number;
    serviceUrl: string;
    private contentType;
    constructor(contentType: string);
    sendRequest(httpMethod: string, endpoint: string, data?: string, queryStringParams?: IDictionary<string>): Promise<string>;
    protected buildQueryString(queryStringParams?: IDictionary<string>): string;
}
