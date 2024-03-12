export class CardIssuerResponse {
  /**
   * The result code of the AVS check from the card issuer.
   */
  public avsResult: string;

  /**
   * Result code from the card issuer.
   */
  public result: string;

  /**
   * The result code of the CVV check from the card issuer.
   */
  public cvvResult: string;

  /**
   * The result code of the AVS address check from the card issuer.
   */
  public avsAddressResult: string;

  /**
   * The result of the AVS postal code check from the card issuer.
   */
  public avsPostalCodeResult: string;
}
