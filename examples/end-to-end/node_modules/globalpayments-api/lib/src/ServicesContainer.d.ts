import { IPaymentGateway, IRecurringService, ServicesConfig } from "./";
export declare class ServicesContainer {
    private static _instance;
    private _gateway;
    private _recurring;
    static instance(): ServicesContainer;
    static configure(config: ServicesConfig): void;
    constructor(gateway?: IPaymentGateway, recurring?: IRecurringService);
    getClient(): IPaymentGateway;
    getRecurringClient(): IRecurringService;
}
