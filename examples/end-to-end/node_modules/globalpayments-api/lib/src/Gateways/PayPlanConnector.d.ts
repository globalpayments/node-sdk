import { AccountType, Address, CheckType, Customer, IPaymentMethod, IRecurringEntity, IRecurringService, RecurringBuilder, RecurringPaymentMethod, Schedule, TransactionType } from "../";
import { RestGateway } from "./RestGateway";
export declare class PayPlanConnector extends RestGateway implements IRecurringService {
    supportsRetrieval: boolean;
    supportsUpdatePaymentDetails: boolean;
    private _secretApiKey;
    siteId: string;
    licenseId: string;
    deviceId: string;
    private _username;
    private _password;
    developerId: string;
    versionNumber: string;
    secretApiKey: string;
    username: string;
    password: string;
    processRecurring<T extends IRecurringEntity>(builder: RecurringBuilder<T>): Promise<T>;
    protected mapResponse<T extends IRecurringEntity>(builder: RecurringBuilder<T>, rawResponse: string): T;
    protected buildCustomer(request: any, entity: Customer): any;
    protected buildPaymentMethod(request: any, entity: RecurringPaymentMethod, transactionType: TransactionType): any;
    protected buildSchedule(request: any, entity: Schedule, transactionType: TransactionType): any;
    protected prepareAccountType(type: AccountType): "Savings" | "Checking";
    protected prepareCheckType(type: CheckType): "Business" | "Payroll" | "Personal";
    protected buildAddress(request: any, address: Address): any;
    protected buildAmount(request: any, name: string, amount: number | string, currency: string, transactionType: TransactionType): any;
    protected buildDate(request: any, name: string, date: Date, force?: boolean): any;
    protected mapMethod(transactionType: TransactionType): "POST" | "PUT" | "DELETE" | "GET";
    protected mapUrl<T extends IRecurringEntity>(builder: RecurringBuilder<T>): string;
    protected hydrateCustomer(response: any): Customer;
    protected hydrateRecurringPaymentMethod(response: any): RecurringPaymentMethod;
    protected hydrateSchedule(response: any): Schedule;
    protected hasToken(paymentMethod: IPaymentMethod): {
        hasToken: boolean;
        tokenValue: string;
    };
    protected setAuthorizationHeader(value: string): void;
    protected maybeSetIdentityHeader(): void;
    protected maybeSetIntegrationHeader(): void;
}
