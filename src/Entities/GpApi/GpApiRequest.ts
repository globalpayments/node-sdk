import { Request } from "../Request";

export class GpApiRequest extends Request {
  public static ACCESS_TOKEN_ENDPOINT = "/accesstoken";
  public static TRANSACTION_ENDPOINT = "/transactions";
  public static PAYMENT_METHODS_ENDPOINT = "/payment-methods";
  public static VERIFICATIONS_ENDPOINT = "/verifications";
  public static DEPOSITS_ENDPOINT = "/settlement/deposits";
  public static DISPUTES_ENDPOINT = "/disputes";
  public static SETTLEMENT_DISPUTES_ENDPOINT = "/settlement/disputes";
  public static SETTLEMENT_TRANSACTIONS_ENDPOINT = "/settlement/transactions";
  public static AUTHENTICATIONS_ENDPOINT = "/authentications";
  public static BATCHES_ENDPOINT = "/batches";
  public static ACTIONS_ENDPOINT = "/actions";
  public static MERCHANT_MANAGEMENT_ENDPOINT = "/merchants";
  public static DCC_ENDPOINT = "/currency-conversions";
  public static PAYBYLINK_ENDPOINT = "/links";
  public static RISK_ASSESSMENTS = "/risk-assessments";
  public static ACCOUNTS_ENDPOINT = "/accounts";
  public static TRANSFER_ENDPOINT = "/transfers";
  public static DEVICE_ENDPOINT = "/devices";
}
