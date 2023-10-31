// import { AccessTokenInfo } from "./AccessTokenInfo";
import { GpApiAccount } from "./GpApiAccount";

export class GpApiTokenResponse {
  public token: string;
  public type: string;
  public timeCreated: string;
  public secondsToExpire: number;
  public appId: string;
  public appName: string;
  public email: string;
  public merchantId: string;
  public merchantName: string;
  public accounts: GpApiAccount[] = [];
  public dataAccountName: string;
  public disputeManagementAccountName: string;
  public tokenizationAccountName: string;
  public transactionProcessingAccountName: string;
  public merchantManagementAccountName: string;
  public merchantManagementAccountId: string;

  public static DATA_ACCOUNT_NAME_PREFIX = "DAA_";
  public static DISPUTE_MANAGEMENT_ACCOUNT_NAME_PREFIX = "DIA_";
  public static TOKENIZATION_ACCOUNT_NAME_PREFIX = "TKA_";
  public static TRANSACTION_PROCESSING_ACCOUNT_NAME_PREFIX = "TRA_";
  public static RIKS_ASSESSMENT_ACCOUNT_NAME_PREFIX = "RAA_";
  public static MERCHANT_MANAGEMENT_ACCOUNT_PREFIX = "MMA_";

  constructor(response: string) {
    this.mapResponseValues(JSON.parse(response));
  }

  /**
   * @param string accountPrefix
   *
   * @return null|string
   */
  private getAccountName(accountPrefix: string): string {
    for (const account of this.accounts) {
      if (account.id && account.id.substr(0, 4) === accountPrefix) {
        return account.name;
      }
    }

    return "";
  }

  /**
   * @param string accountPrefix
   *
   * @return null|string
   */
  private getAccountID(accountPrefix: string): string {
    for (const account of this.accounts) {
      if (account.id && account.id.substr(0, 4) === accountPrefix) {
        return account.id;
      }
    }

    return "";
  }

  public getDataAccountName() {
    return this.getAccountName(GpApiTokenResponse.DATA_ACCOUNT_NAME_PREFIX);
  }

  public getDataAccountID() {
    return this.getAccountID(GpApiTokenResponse.DATA_ACCOUNT_NAME_PREFIX);
  }

  public getDisputeManagementAccountName() {
    return this.getAccountName(
      GpApiTokenResponse.DISPUTE_MANAGEMENT_ACCOUNT_NAME_PREFIX,
    );
  }

  public getDisputeManagementAccountID() {
    return this.getAccountID(
      GpApiTokenResponse.DISPUTE_MANAGEMENT_ACCOUNT_NAME_PREFIX,
    );
  }

  public getTokenizationAccountName() {
    return this.getAccountName(
      GpApiTokenResponse.TOKENIZATION_ACCOUNT_NAME_PREFIX,
    );
  }

  public getTokenizationAccountID() {
    return this.getAccountID(
      GpApiTokenResponse.TOKENIZATION_ACCOUNT_NAME_PREFIX,
    );
  }

  public getTransactionProcessingAccountName() {
    return this.getAccountName(
      GpApiTokenResponse.TRANSACTION_PROCESSING_ACCOUNT_NAME_PREFIX,
    );
  }

  public getTransactionProcessingAccountID() {
    return this.getAccountID(
      GpApiTokenResponse.TRANSACTION_PROCESSING_ACCOUNT_NAME_PREFIX,
    );
  }

  public getRiskAssessmentAccountName() {
    return this.getAccountName(
      GpApiTokenResponse.RIKS_ASSESSMENT_ACCOUNT_NAME_PREFIX,
    );
  }

  public getRiskAssessmentAccountID() {
    return this.getAccountID(
      GpApiTokenResponse.RIKS_ASSESSMENT_ACCOUNT_NAME_PREFIX,
    );
  }
  public getMerchantManagementAccountName() {
    return this.getAccountName(
      GpApiTokenResponse.MERCHANT_MANAGEMENT_ACCOUNT_PREFIX,
    );
  }

  public getMerchantManagementAccountID() {
    return this.getAccountID(
      GpApiTokenResponse.MERCHANT_MANAGEMENT_ACCOUNT_PREFIX,
    );
  }

  public getToken() {
    return this.token;
  }

  private mapResponseValues(response: Record<string, any>) {
    this.token = response.token;
    this.type = response.type;
    this.appId = response.app_id;
    this.appName = response.app_name;
    this.timeCreated = response.time_created;
    this.secondsToExpire = response.seconds_to_expire;
    this.email = response.email;
    if (response.scope) {
      this.merchantId = response.scope.merchant_id;
      this.merchantName = response.scope.merchant_name;
      for (const account of response.scope.accounts) {
        this.accounts.push(new GpApiAccount(account.id, account.name));
      }
    }
  }
}
