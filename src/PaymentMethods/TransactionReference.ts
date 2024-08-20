import {
  AlternativePaymentResponse,
  IPaymentMethod,
  PaymentMethodType,
} from "../";

export class TransactionReference implements IPaymentMethod {
  public authCode: string;
  public orderId: string;
  public transactionId: string;
  public declare paymentMethodType: PaymentMethodType;
  public clientTransactionId: string;
  public alternativePaymentResponse: AlternativePaymentResponse;
  [key: string]: any;

  public constructor(transactionId?: string) {
    if (transactionId) {
      this.transactionId = transactionId;
    }
  }
}
