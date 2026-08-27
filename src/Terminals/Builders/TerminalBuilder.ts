import {
  ITerminalResponse,
  PaymentMethodType,
  TransactionBuilder,
  TransactionType,
} from "../../../src";

export abstract class TerminalBuilder extends TransactionBuilder<ITerminalResponse> {
  paymentMethodType?: PaymentMethodType;
  referenceNumber?: string;
  ecrId?: number;
  clerkNumber?: string;
  clerkId?: number;

  public withPaymentMethodType(value: PaymentMethodType) {
    this.paymentMethodType = value;
    return this;
  }
  public withReferenceNumber(value: string) {
    this.referenceNumber = value;
    return this;
  }
  public withRequestId(value: string) {
    this.referenceNumber = value;
    return this;
  }
  public withClerkNumber(value: string) {
    this.clerkNumber = value;
    return this;
  }
  public withEcrId(ecrId: number | string) {
    this.ecrId = typeof ecrId === "string" ? Number(ecrId) : ecrId;
    return this;
  }

  public withClerkId(clerkId: number) {
    this.clerkId = clerkId;
    return this;
  }

  constructor(type: TransactionType, paymentType?: PaymentMethodType) {
    super(type);
    this.paymentMethodType = paymentType;
  }
}
