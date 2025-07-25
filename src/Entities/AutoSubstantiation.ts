export class AutoSubstantiation {
  /**
   * Merchant verification value
   */
  public merchantVerificationValue: string | undefined;
  /**
   * Real time substantiation flag
   */
  public realTimeSubstantiation: boolean;
  private amounts: Map<string, string>;

  constructor() {
    this.amounts = new Map<string, string>();
    this.amounts.set("TOTAL_HEALTHCARE_AMT", "0");
    this.amounts.set("SUBTOTAL_PRESCRIPTION_AMT", "0");
    this.amounts.set("SUBTOTAL_VISION__OPTICAL_AMT", "0");
    this.amounts.set("SUBTOTAL_CLINIC_OR_OTHER_AMT", "0");
    this.amounts.set("SUBTOTAL_DENTAL_AMT", "0");
    this.amounts.set("SUBTOTAL_COPAY_AMT", "0");

    this.merchantVerificationValue = undefined;
    this.realTimeSubstantiation = false;
  }

  public getAmounts(): Map<string, string> {
    return this.amounts;
  }

  public getMerchantVerificationValue(): string | undefined {
    return this.merchantVerificationValue;
  }

  public setMerchantVerificationValue(
    merchantVerificationValue: string | undefined,
  ): void {
    this.merchantVerificationValue = merchantVerificationValue;
  }

  public isRealTimeSubstantiation(): boolean {
    return this.realTimeSubstantiation;
  }

  public setRealTimeSubstantiation(realTimeSubstantiation: boolean): void {
    this.realTimeSubstantiation = realTimeSubstantiation;
  }

  public getClinicSubTotal(): string {
    return this.amounts.get("SUBTOTAL_CLINIC_OR_OTHER_AMT") || "0";
  }

  public setClinicSubTotal(value: string): void {
    this.amounts.set("SUBTOTAL_CLINIC_OR_OTHER_AMT", value);
    const currentTotal = parseFloat(
      this.amounts.get("TOTAL_HEALTHCARE_AMT") || "0",
    );
    const newValue = parseFloat(value);
    this.amounts.set(
      "TOTAL_HEALTHCARE_AMT",
      (currentTotal + newValue).toString(),
    );
  }

  public getDentalSubTotal(): string {
    return this.amounts.get("SUBTOTAL_DENTAL_AMT") || "0";
  }

  public setDentalSubTotal(value: string): void {
    this.amounts.set("SUBTOTAL_DENTAL_AMT", value);
    const currentTotal = parseFloat(
      this.amounts.get("TOTAL_HEALTHCARE_AMT") || "0",
    );
    const newValue = parseFloat(value);
    this.amounts.set(
      "TOTAL_HEALTHCARE_AMT",
      (currentTotal + newValue).toString(),
    );
  }

  public getPrescriptionSubTotal(): string {
    return this.amounts.get("SUBTOTAL_PRESCRIPTION_AMT") || "0";
  }

  public setPrescriptionSubTotal(value: string): void {
    this.amounts.set("SUBTOTAL_PRESCRIPTION_AMT", value);
    const currentTotal = parseFloat(
      this.amounts.get("TOTAL_HEALTHCARE_AMT") || "0",
    );
    const newValue = parseFloat(value);
    this.amounts.set(
      "TOTAL_HEALTHCARE_AMT",
      (currentTotal + newValue).toString(),
    );
  }

  public getTotalHealthcareAmount(): string {
    return this.amounts.get("TOTAL_HEALTHCARE_AMT") || "0";
  }

  public getVisionSubTotal(): string {
    return this.amounts.get("SUBTOTAL_VISION__OPTICAL_AMT") || "0";
  }

  public setVisionSubTotal(value: string): void {
    this.amounts.set("SUBTOTAL_VISION__OPTICAL_AMT", value);
    const currentTotal = parseFloat(
      this.amounts.get("TOTAL_HEALTHCARE_AMT") || "0",
    );
    const newValue = parseFloat(value);
    this.amounts.set(
      "TOTAL_HEALTHCARE_AMT",
      (currentTotal + newValue).toString(),
    );
  }

  public getCopaySubTotal(): string {
    return this.amounts.get("SUBTOTAL_COPAY_AMT") || "0";
  }

  public setCopaySubTotal(value: string): void {
    this.amounts.set("SUBTOTAL_COPAY_AMT", value);
    const currentTotal = parseFloat(
      this.amounts.get("TOTAL_HEALTHCARE_AMT") || "0",
    );
    const newValue = parseFloat(value);
    this.amounts.set(
      "TOTAL_HEALTHCARE_AMT",
      (currentTotal + newValue).toString(),
    );
  }
}
