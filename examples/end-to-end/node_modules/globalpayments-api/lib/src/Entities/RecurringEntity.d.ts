export interface IRecurringEntity {
    id: string;
    key: string;
}
export declare class RecurringEntity<TResult extends IRecurringEntity> implements IRecurringEntity {
    id: string;
    key: string;
    static find<TResult extends IRecurringEntity>(id: string): Promise<TResult | undefined>;
    static findAll<TResult extends IRecurringEntity>(): Promise<TResult>;
    private static getIdentifierName();
    create(): Promise<TResult>;
    delete(force?: boolean): Promise<TResult>;
    saveChanges(): Promise<TResult>;
}
