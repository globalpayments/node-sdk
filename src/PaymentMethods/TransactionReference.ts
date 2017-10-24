import { PaymentMethodType } from "../";
import { IPaymentMethod } from "./Interfaces";

export class TransactionReference implements IPaymentMethod {
  public authCode: string;
  public orderId: string;
  public transactionId: string;
  public paymentMethodType: PaymentMethodType;
  public clientTransactionId: string;

  public constructor(transactionId?: string) {
    if (transactionId) {
      this.transactionId = transactionId;
    }
  }
}
