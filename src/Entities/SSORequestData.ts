export class SSORequestData {
  /// <summary>
  /// The ProPay system requires that your single-sign-on originate from the URL originally provided here
  /// </summary>
  public referrerURL: string;
  /// <summary>
  /// The ProPay system requires that your single-sign-on originate from the URL originally provided here. Can supply a range of class c or more restrictive
  /// </summary>
  public iPAddress: string;
  /// <summary>
  /// The ProPay system requires that your single-sign-on originate from the URL originally provided here. Can supply a range of class c or more restrictive
  /// </summary>
  public iPSubnetMask: string;
}
