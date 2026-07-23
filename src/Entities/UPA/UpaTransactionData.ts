import { TransactionType } from "..";

export class UpaTransactionData {
  public totalAmount?: number;
  public cashBackAmount?: number;
  public tranDate?: string | Date;
  public tranTime?: string | Date;
  public transType?: TransactionType;
}
