import { IRecurringEntity, RecurringBuilder, TransactionType } from "../";

export class RecurringService {
  public static create<T extends IRecurringEntity>(
    entity: T,
    configName: string = "default",
  ) {
    return new RecurringBuilder<T>(TransactionType.Create, entity).execute(
      configName,
    );
  }

  public static delete<T extends IRecurringEntity>(
    entity: T,
    configName: string = "default",
  ) {
    return new RecurringBuilder<T>(TransactionType.Delete, entity).execute(
      configName,
    );
  }

  public static edit<T extends IRecurringEntity>(
    entity: T,
    configName: string = "default",
  ) {
    return new RecurringBuilder<T>(TransactionType.Edit, entity).execute(
      configName,
    );
  }

  public static get<T extends IRecurringEntity>(
    key: string,
    configName: string = "default",
  ) {
    const entity = key;
    return new RecurringBuilder<T>(
      TransactionType.Fetch,
      entity as any as T,
    ).execute(configName);
  }

  public static search<T extends IRecurringEntity>(
    enity: IRecurringEntity | Function,
  ) {
    return new RecurringBuilder<T>(TransactionType.Search, enity);
  }
}
