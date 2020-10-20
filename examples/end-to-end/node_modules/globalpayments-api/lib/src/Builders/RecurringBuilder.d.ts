import { IRecurringEntity, TransactionType } from "../";
import { TransactionBuilder } from "./TransactionBuilder";
export interface IDictionary<T> {
    [key: string]: T;
}
export declare class RecurringBuilder<T extends IRecurringEntity> extends TransactionBuilder<T> {
    key: string;
    orderId: string;
    entity: IRecurringEntity;
    searchCriteria: IDictionary<string>;
    constructor(type: TransactionType, entity?: IRecurringEntity);
    execute(): Promise<T>;
    setupValidations(): void;
}
