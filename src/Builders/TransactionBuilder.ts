import {
  IPaymentMethod,
  PaymentMethod,
  TransactionModifier,
  TransactionType,
} from "../";
import { BaseBuilder } from "./BaseBuilder";

export abstract class TransactionBuilder<T> extends BaseBuilder<T> {
  public paymentMethod: PaymentMethod;
  public transactionType: TransactionType;
  public transactionModifier = TransactionModifier.None;
  public supplementaryData: Record<string, string | string[]> = {};

  public constructor(type: TransactionType, paymentMethod?: IPaymentMethod) {
    super();

    this.transactionType = type;
    if (paymentMethod) {
      this.paymentMethod = paymentMethod as PaymentMethod;
    }
  }

  public withModifier(modifier?: TransactionModifier) {
    if (modifier !== undefined) {
      this.transactionModifier = modifier;
    }
    return this;
  }

  public withPaymentMethod(paymentMethod?: IPaymentMethod) {
    if (paymentMethod !== undefined) {
      this.paymentMethod = paymentMethod as PaymentMethod;
    }
    return this;
  }

  public withSupplementaryData(
    key: Record<string, string | string[]> | string,
    value?: string | string[],
  ) {
    if (key instanceof Object) {
      for (const supplementaryDataKey of Object.keys(key)) {
        this.withSupplementaryData(
          supplementaryDataKey,
          key[supplementaryDataKey],
        );
      }
    }

    if (key && typeof key === "string" && !!value) {
      this.supplementaryData[key] = value;
    }

    return this;
  }

  public withAllowDuplicates(allowDuplicates: boolean) {
    this.allowDupplicates = allowDuplicates;

    return this;
  }
}
