import { IRecurringEntity, RecurringBuilder } from "../";
export declare class RecurringService {
    static create<T extends IRecurringEntity>(entity: T): Promise<T>;
    static delete<T extends IRecurringEntity>(entity: T, _force?: boolean): Promise<T>;
    static edit<T extends IRecurringEntity>(entity: T): Promise<T>;
    static get<T extends IRecurringEntity>(key: string): Promise<T>;
    static search<T extends IRecurringEntity>(): RecurringBuilder<T>;
}
