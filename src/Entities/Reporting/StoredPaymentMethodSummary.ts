export class StoredPaymentMethodSummary {
  paymentMethodId: string;
  timeCreated: Date;
  status: string;
  reference: string;
  cardHolderName: string;
  cardType: string;
  cardNumberLastFour: string;
  cardExpMonth: number;
  cardExpYear: number;
}
