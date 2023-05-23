import { Address } from "../../Entities";

export class BusinessData {
    /// <summary>
    /// The legal name of the business as registered
    /// </summary>
    public businessLegalName: string;
    /// <summary>
    /// This field can be used to provide DBA information on an account. ProPay accounts can be configured to display DBA on cc statements. (Note most banks' CC statements allow for 29 characters)
    /// </summary>
    public doingBusinessAs: string;
    /// <summary>
    /// EIN - 9 characters without dashes 
    /// </summary>
    public employerIdentificationNumber: string;

    /// <summary>
    /// Merchant Category Code
    /// </summary>
    public merchantCategoryCode: string;

    /// <summary>
    /// The business' website URL
    /// </summary>
    public websiteURL: string;
    /// <summary>
    /// The business' description
    /// </summary>
    public businessDescription: string;
    /// <summary>
    /// The monthly colume of bank card transactions; Value representing the number of pennies in USD, or the number of [currency] without decimals. Defaults to $1000.00 if not sent.
    /// </summary>
    public monthlyBankCardVolume: string;
    /// <summary>
    /// The average amount of an individual transaction; Value representing the number of pennies in USD, or the number of [currency] without decimals. Defaults to $300.00 if not sent.
    /// </summary>
    public averageTicket: string;
    /// <summary>
    /// The highest transaction amount; Value representing the number of pennies in USD, or the number of [currency] without decimals. Defaults to $300.00 if not sent.
    /// </summary>
    public highestTicket: string;
    // The business' address
    public businessAddress: Address;

    constructor() {
        this.businessAddress = new Address();
    }
}