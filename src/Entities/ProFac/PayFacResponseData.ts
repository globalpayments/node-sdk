import { Address } from "../Address";
import { BeneficialOwnerDataResult } from "./BeneficialOwnerDataResult";
import { UserPersonalData } from "./UserPersonalData";
import { BusinessData } from "./BusinessData";
import { AccountPermissions } from "./AccountPermissions";
import { AccountBalanceResponseData } from "./AccountBalanceResponseData";
import { BankAccountData } from "./BankAccountData";
import { GrossBillingInformation } from "./GrossBillingInformation";

export class PayFacResponseData {
  public accountNumber: string;
  public recAccountNum: string;
  public password: string;
  public amount: string;
  public transNum: string;
  public pending: string;
  public secondaryAmount: string;
  public secondaryTransNum: string;
  public sourceEmail: string;
  public authToken: string;
  public beneficialOwnerDataResults: Array<BeneficialOwnerDataResult>;

  // Account information
  public accountStatus: string;
  public physicalAddress: Address;
  public affiliation: string;
  public aPIReady: string;
  public currencyCode: string;
  public expiration: string;
  public signupDate: string;
  public tier: string;
  public visaCheckoutMerchantID: string;
  public creditCardTransactionLimit: string;
  public creditCardMonthLimit: string;
  public aCHPaymentPerTranLimit: string;
  public aCHPaymentMonthLimit: string;
  public creditCardMonthlyVolume: string;
  public aCHPaymentMonthlyVolume: string;
  public reserveBalance: string;
  public masterPassCheckoutMerchantID: string;

  // Enhanced Account Details
  public personalData: UserPersonalData;
  public homeAddress: Address;
  public mailAddress: Address;
  public businessData: BusinessData;
  public accountLimits: AccountPermissions;
  public availableBalance: string;
  public pendingBalance: string;
  public accountBalance: AccountBalanceResponseData;
  public primaryBankAccountData: BankAccountData;
  public secondaryBankAccountData: BankAccountData;
  public grossBillingInformation: GrossBillingInformation;

  // Account balance
  public pendingAmount: string;
  public reserveAmount: string;
  public aCHOut: AccountBalanceResponseData;
  public flashFunds: AccountBalanceResponseData;

  // Portico data

  /// <summary>
  /// A unique transaction ID assigned by the payment facilitator
  /// </summary>
  public transactionId: string;
  /// <summary>
  /// A unique sub-merchant account ID assigned by the payment facilitator
  /// </summary>
  public transactionNumber: string;
}
