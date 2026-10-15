import { GpApiAccount } from "./GpApiAccount";

export class AccessTokenInfo {
  public accessToken: string;

  public token: string;

  public type: string;

  public appId: string;

  public appName: string;

  public timeCreated: string;

  public secondsToExpire: number;

  public intervalToExpire: string;

  public email: string;

  public merchantId: string;

  public merchantName: string;

  public accounts: GpApiAccount[] = [];

  public dataAccountName: string;

  public disputeManagementAccountName: string;

  public tokenizationAccountName: string;

  public transactionProcessingAccountName: string;

  public riskAssessmentAccountName: string;

  public fileProcessingAccountName: string;

  public dataAccountID: string;

  public disputeManagementAccountID: string;

  public tokenizationAccountID: string;

  public transactionProcessingAccountID: string;

  public riskAssessmentAccountID: string;

  public fileProcessingAccountID: string;

  public merchantManagementAccountName: string;

  public merchantManagementAccountID: string;
}
