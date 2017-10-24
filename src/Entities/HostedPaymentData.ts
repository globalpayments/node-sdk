export class HostedPaymentData {
  public customerExists: boolean;
  public customerKey: string;
  public customerNumber: string;
  public offerToSaveCard: boolean;
  public paymentKey: string;
  public productId: string;
  public supplementaryData: object;

  public constructor() {
    this.supplementaryData = {};
  }
}
