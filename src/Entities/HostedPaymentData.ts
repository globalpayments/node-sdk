export class HostedPaymentData {
  public customerExists: boolean;
  public customerKey: string;
  public customerNumber: string;
  public offerToSaveCard: boolean;
  public paymentKey: string;
  public productId: string;
  public supplementaryData: object;
  public addressCapture?: boolean = false;
  public notReturnAddress?: boolean = false;
  public removeShipping?: boolean = false;

  public constructor() {
    this.supplementaryData = {};
  }
}
