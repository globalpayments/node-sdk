import { AuthorizationBuilder, ManagementBuilder, ReportBuilder, Transaction } from "../";
export interface IPaymentGateway {
    supportsHostedPayments: boolean;
    processAuthorization(builder: AuthorizationBuilder): Promise<Transaction>;
    manageTransaction(builder: ManagementBuilder): Promise<Transaction>;
    processReport<T>(builder: ReportBuilder<T>): Promise<T>;
    serializeRequest(builder: AuthorizationBuilder): string;
}
