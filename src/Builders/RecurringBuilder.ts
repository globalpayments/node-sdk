import { IRecurringEntity, ServicesContainer, TransactionType } from "../";
import { TransactionBuilder } from "./TransactionBuilder";
import { IDictionary } from "./BaseBuilder";

export class RecurringBuilder<
  T extends IRecurringEntity
> extends TransactionBuilder<T> {
  public key: string;
  public orderId: string;
  public entity: IRecurringEntity | Function;
  public searchCriteria: IDictionary<string>;

  public constructor(type: TransactionType, entity?: IRecurringEntity | Function) {
    super(type);
    this.searchCriteria = {};
    if (entity) {
      this.entity = entity;
      this.key = (entity as unknown as IRecurringEntity).key;
    }
  }

  public addSearchCriteria(key: string, value: string) {
    this.searchCriteria[key] = value;
    return this
  }

  public execute(configName: string = 'default'): Promise<T> {
    super.execute();
    return ServicesContainer.instance()
      .getRecurringClient(configName)
      .processRecurring(this);
  }

  public setupValidations() {
    // todo
  }
}
