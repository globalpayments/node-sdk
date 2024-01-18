import {
  ITerminalResponse,
  PaymentMethodType,
  TransactionBuilder,
  TransactionType,
} from "../../../src";

export abstract class TerminalBuilder extends TransactionBuilder<ITerminalResponse> {
  paymentMethodType?: PaymentMethodType;
  referenceNumber: number;
  ecrId: number;
  clerkNumber: string;

  public withPaymentMethodType(value: PaymentMethodType) {
    this.paymentMethodType = value;
    return this;
  }
  public withReferenceNumber(value: number) {
    this.referenceNumber = value;
    return this;
  }
  public withRequestId(value: number) {
    this.referenceNumber = value;
    return this;
  }
  public withClerkNumber(value: string) {
    this.clerkNumber = value;
    return this;
  }

  constructor(type: TransactionType, paymentType?: PaymentMethodType) {
    super(type);
    this.paymentMethodType = paymentType;
  }
}
