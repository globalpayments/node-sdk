import { OwnersData } from "./OwnersData";

export class SignificantOwnerData {
    /// <summary>
    /// Seller's authorized Signer First Name. By default Merchant's First name is saved.
    /// </summary>
    public authorizedSignerFirstName: string;
    /// <summary>
    /// Seller's Authorized Signer Last Name. By default Merchant's Last name is saved.
    /// </summary>
    public authorizedSignerLastName: string;
    /// <summary>
    /// This field contains the Seller's Authorized Signer Title
    /// </summary>
    public authorizedSignerTitle: string;
    /// <summary>
    /// Seller's Authorized Signer owner information
    /// </summary>
    public significantOwner: OwnersData;

    constructor() {
        this.significantOwner = new OwnersData();
    }
}