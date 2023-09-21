import { ParsedUrlQuery } from "querystring";

export class Request {

    public endpoint: string;

    public httpVerb: string;

    public requestBody: string;

    public queryParams: ParsedUrlQuery | undefined;

    constructor (
        endpoint: string,
        httpVerb: string,
        requestBody: string = '',
        queryParams?: ParsedUrlQuery,
    ) {
        this.endpoint = endpoint;
        this.httpVerb = httpVerb;
        this.requestBody = requestBody;
        this.queryParams = queryParams;
    }
}