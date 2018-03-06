import { IRecurringEntity, ServicesContainer, TransactionType } from "../";
import { TransactionBuilder } from "./TransactionBuilder";

export interface IDictionary<T> {
  [key: string]: T;
}

export class RecurringBuilder<
  T extends IRecurringEntity
> extends TransactionBuilder<T> {
  public key: string;
  public orderId: string;
  public entity: IRecurringEntity;
  public searchCriteria: IDictionary<string>;

  public constructor(type: TransactionType, entity?: IRecurringEntity) {
    super(type);
    this.searchCriteria = {};
    if (entity) {
      this.entity = entity;
      this.key = entity.key;
    }
  }

  public execute(): Promise<T> {
    super.execute();
    return ServicesContainer.instance()
      .getRecurringClient()
      .processRecurring(this);
  }

  public setupValidations() {
    // todo
  }
}
