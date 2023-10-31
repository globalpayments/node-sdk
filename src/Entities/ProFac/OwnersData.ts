import { Address } from "../../Entities";

export class OwnersData {
  /// <summary>
  /// Owner title
  /// </summary>
  public title: string;
  /// <summary>
  /// Owner first name
  /// </summary>
  public firstName: string;
  /// <summary>
  /// Owner last name
  /// </summary>
  public lastName: string;
  /// <summary>
  /// Owner email ID
  /// </summary>
  public email: string;
  /// <summary>
  /// Date of birth of the owner. Must be in 'mm-dd-yyyy' format.
  /// </summary>
  public DateOfBirth: string;
  /// <summary>
  /// Social Security Number of the owner. Should be 9 digits.
  /// </summary>
  public sSN: string;
  /// <summary>
  /// Percentage stake in company by owner. Must be whole number between 0 and 100.
  /// </summary>
  public percentage: string;
  /// <summary>
  /// Address of the owner
  /// </summary>
  public ownerAddress: Address;

  constructor() {
    this.ownerAddress = new Address();
  }
}
