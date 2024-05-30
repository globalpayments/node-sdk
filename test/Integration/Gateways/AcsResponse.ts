export class AcsResponse {
  private authResponse: string;
  private merchantData: string;
  private status: boolean;

  constructor() {
    this.authResponse = "";
    this.merchantData = "";
    this.status = false;
  }

  public getAuthResponse(): string {
    return this.authResponse;
  }

  public setAuthResponse(authResponse: string): void {
    this.authResponse = authResponse;
  }

  public getMerchantData(): string {
    return this.merchantData;
  }

  public setMerchantData(merchantData: string): void {
    this.merchantData = merchantData;
  }

  public getStatus(): boolean {
    return this.status;
  }

  public setStatus(status: boolean): void {
    this.status = status;
  }
}
