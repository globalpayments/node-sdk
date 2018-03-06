import { IRecurringEntity, RecurringBuilder, TransactionType } from "../";

export class RecurringService {
  public static create<T extends IRecurringEntity>(entity: T) {
    return new RecurringBuilder<T>(TransactionType.Create, entity).execute();
  }

  public static delete<T extends IRecurringEntity>(entity: T, _force = false) {
    return new RecurringBuilder<T>(TransactionType.Delete, entity).execute();
  }

  public static edit<T extends IRecurringEntity>(entity: T) {
    return new RecurringBuilder<T>(TransactionType.Edit, entity).execute();
  }

  public static get<T extends IRecurringEntity>(key: string) {
    const entity = {
      key,
    };
    return new RecurringBuilder<T>(
      TransactionType.Fetch,
      (entity as any) as T,
    ).execute();
  }

  public static search<T extends IRecurringEntity>() {
    return new RecurringBuilder<T>(TransactionType.Search);
  }
}
