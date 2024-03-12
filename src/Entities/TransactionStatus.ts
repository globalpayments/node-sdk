export class TransactionStatus {
  static INITIATED = "INITIATED";
  static AUTHENTICATED = "AUTHENTICATED";
  static PENDING = "PENDING";
  static DECLINED = "DECLINED";
  static PREAUTHORIZED = "PREAUTHORIZED";
  static CAPTURED = "CAPTURED";
  static BATCHED = "BATCHED";
  static REVERSED = "REVERSED";
  static FUNDED = "FUNDED";
  static REJECTED = "REJECTED";

  static mapTransactionStatusResponse: Record<string, string> = {
    [TransactionStatus.INITIATED]: TransactionStatus.INITIATED,
    [TransactionStatus.AUTHENTICATED]: "SUCCESS_AUTHENTICATED",
    [TransactionStatus.PENDING]: TransactionStatus.PENDING,
    [TransactionStatus.DECLINED]: TransactionStatus.DECLINED,
    [TransactionStatus.PREAUTHORIZED]: TransactionStatus.PREAUTHORIZED,
    [TransactionStatus.CAPTURED]: TransactionStatus.CAPTURED,
    [TransactionStatus.BATCHED]: TransactionStatus.BATCHED,
    [TransactionStatus.REVERSED]: TransactionStatus.REVERSED,
    [TransactionStatus.FUNDED]: TransactionStatus.FUNDED,
    [TransactionStatus.REJECTED]: TransactionStatus.REJECTED,
  };
}
