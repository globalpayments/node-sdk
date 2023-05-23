import { CreditCardData } from "../../PaymentMethods";

export class RenewAccountData {
    /// <summary>
    /// Supplying a value will change the account's tier under the affiliation upon renewal
    /// If not passed, the tier will not be changed
    /// </summary>
    public tier: string;

    /// <summary>
    /// Credit Card details
    /// </summary>
    public creditCard: CreditCardData;

    /// <summary>
    /// The US zip code of the credit card. 5 or 9 digits without a dash for US cards. Omit for internation credit cards.
    /// </summary>
    public zipCode: string;

    /// <summary>
    /// User to pay for an account via ACH and monthly renewal. Financial institution account number.
    /// *Required if using ACH to pay renewal fee
    /// </summary>
    public paymentBankAccountNumber: string;

    /// <summary>
    /// Used to pay for an account via ACH and monthly renewal. Financial institution account number.
    /// *Required if using ACH to pay renewal fee
    /// </summary>
    public paymentBankRoutingNumber: string;

    /// <summary>
    /// Used to pay for an account via ACH and monthly renewal. Valid values are: Checking and Savings
    /// </summary>
    public paymentBankAccountType: string;

    constructor() {
        this.creditCard = new CreditCardData();
    }
}