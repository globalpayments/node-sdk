import {
  Address,
  AuthorizationBuilder,
  IPaymentMethod,
  PaymentMethodType,
  Schedule,
  ServicesContainer,
  TransactionType,
  UnsupportedTransactionError,
} from "../";
import { RecurringEntity } from "../Entities";

export class RecurringPaymentMethod extends RecurringEntity<
  RecurringPaymentMethod
> {
  public address: Address;
  public commercialIndicator: string;
  public customerKey: string;
  public expirationDate: string;
  public nameOnAccount: string;
  public paymentMethodType = PaymentMethodType.Recurring;
  public paymentType: string;
  public preferredPayment: boolean;
  public status: string;
  public taxType: string;
  private _paymentMethod: IPaymentMethod;

  public get paymentMethod() {
    return this._paymentMethod;
  }

  public set paymentMethod(value: IPaymentMethod) {
    const client = ServicesContainer.instance().getRecurringClient();
    if (!client.supportsUpdatePaymentDetails) {
      throw new UnsupportedTransactionError();
    }
    this._paymentMethod = value;
  }

  public constructor(
    customerIdOrPaymentMethod?: string | IPaymentMethod,
    paymentId?: string,
  ) {
    super();

    if (
      (customerIdOrPaymentMethod &&
        typeof customerIdOrPaymentMethod === "string") ||
      customerIdOrPaymentMethod instanceof String
    ) {
      this.paymentType = "Credit Card";
      this.customerKey = customerIdOrPaymentMethod;
      if (paymentId) {
        this.key = paymentId;
      }
    } else if (customerIdOrPaymentMethod) {
      this._paymentMethod = customerIdOrPaymentMethod;
    }
  }

  public authorize(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Auth, this)
      .withAmount(amount)
      .withOneTimePayment(true);
  }

  public charge(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Sale, this)
      .withAmount(amount)
      .withOneTimePayment(true);
  }

  public refund(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Refund, this).withAmount(
      amount,
    );
  }

  public verify() {
    return new AuthorizationBuilder(TransactionType.Verify, this);
  }

  public addSchedule(scheduleId: string) {
    const schedule = new Schedule(this.customerKey, this.key);
    schedule.id = scheduleId;
    return schedule;
  }
}
