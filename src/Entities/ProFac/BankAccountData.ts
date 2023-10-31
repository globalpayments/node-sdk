export class BankAccountData {
  /// <summary>
  /// ISO 3166 standard 3-character country code
  /// </summary>
  public accountCountryCode: string;
  /// <summary>
  /// Merchant/Individual Name
  /// </summary>
  public accountName: string;
  /// <summary>
  /// Financial Institution account number
  /// </summary>
  public accountNumber: string;
  /// <summary>
  /// Valid values are: Personal and Business
  /// </summary>
  public accountOwnershipType: string;
  /// <summary>
  /// Valid Values are:
  /// C - Checking
  /// S - Savings
  /// G - General Ledger
  /// </summary>
  public accountType: string;
  /// <summary>
  /// Name of financial institution
  /// </summary>
  public bankName: string;
  /// <summary>
  /// Financial institution routing number. Must be a valid ACH routing number.
  /// </summary>
  public routingNumber: string;

  /// <summary>
  /// The account holder's name. This is required if payment method is a bank account.
  /// </summary>
  public accountHolderName: string;
}
