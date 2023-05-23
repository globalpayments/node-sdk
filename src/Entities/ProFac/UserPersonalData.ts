import { Address } from "../Address";

export class UserPersonalData {
    /// <summary>
    /// Merchant/Individual first name
    /// </summary>
    public firstName: string;
    /// <summary>
    /// Merchant/Individual middle initial
    /// </summary>
    public middleInitial: string;
    /// <summary>
    /// Merchant/Individual lane name
    /// </summary>
    public lastName: string;
    /// <summary>
    /// Merchant/Individual date of birth. Must be in 'mm-dd-yyyy' format. Individual must be 18+ to obtain an account. The value 01-01-1981 will give a successul response. All others will return a Status 66 (Failed KYC).
    /// </summary>
    public dateOfBirth: string;
    /// <summary>
    /// Merchant/Individual social security number. Must be 9 characters without dashes. Required for USA when using personal validation. If business validated, do not pass!
    /// </summary>
    public sSN: string;
    /// <summary>
    /// Merchant/Individual email address. Must be unique in ProPay system. ProPay's system will send automated emails to the email address on file unless NotificationEmail is provided. This value is truncated beyond 55 characters.
    /// </summary>
    public sourceEmail: string;
    /// <summary>
    /// Merchant/Individual day phone number. For USA, CAN, NZL, and AUS value must be 10 characters
    /// </summary>
    public dayPhone: string;
    /// <summary>
    /// Merchant/Individual evening phone number. For USA, CAN, NZL, and AUS value must be 10 characters
    /// </summary>
    public eveningPhone: string;
    /// <summary>
    /// Communication email address. ProPay's system will send automated emails to the email address on file rather than the source email
    /// </summary>
    public notificationEmail: string;
    /// <summary>
    /// Required to specify the currency in which funds should be held, if other than USD. An affiliation must be granted permission to create accounts in currencies other than USD. ISO 4217 standard 3 character currency code.
    /// </summary>
    public currencyCode: string;
    /// <summary>
    /// One of the previously assigned merchant tiers. If not provided, will default to cheapest available tier.
    /// </summary>
    public tier: string;
    /// <summary>
    /// This is a partner's own unique identifier. Typically used as the distributor or consultant ID
    /// </summary>
    public externalID: string;
    /// <summary>
    ///  Numeric value which will give a user access to ProPay's IVR system. Can also be used to reset password
    /// </summary>
    public phonePIN: string;
    /// <summary>
    /// ProPay account username. Must be unique in ProPay system. Username defaults to <sourceEmail> if userId is not provided
    /// </summary>
    public userID: string;
    public ipSignup: string;
    public uSCitizen: boolean;
    public bOAttestation: boolean;
    public termsAcceptanceIP: string;
    public termsAcceptanceTimeStamp: string;
    public termsVersion: number;
    /// <summary>
    /// Merchant/Individual address
    /// </summary>
    public userAddress: Address;
    /// <summary>
    /// Business physical address
    /// </summary>
    public mailingAddress: Address;

    public UserPersonalData() {
        this.userAddress = new Address();
        this.mailingAddress = new Address();
    }
}