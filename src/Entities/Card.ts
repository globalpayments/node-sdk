export class Card {
  public cardholderName: string;

  public cardNumber: string;

  public maskedCardNumber: string;

  public cardExpMonth: string;

  public cardExpYear: string;

  public token: string;

  /**
   * Masked card number with last 4 digits showing.
   */
  public maskedNumberLast4: string;

  /**
   * Indicates the card brand that issued the card.
   */
  public brand: string;

  /**
   * The unique reference created by the brands/schemes to uniquely identify the transaction.
   */
  public brandReference: string;

  /**
   * Contains the first 6 digits of the card
   */
  public bin: string;

  /**
   * The issuing country that the bin is associated with.
   */
  public binCountry: string;

  /**
   * The card provider's description of their card product.
   */
  public accountType: string;

  /**
   * The label of the issuing bank or financial institution of the bin.
   */
  public issuer: string;
}
