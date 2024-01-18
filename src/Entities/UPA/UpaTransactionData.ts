import { TransactionType } from "..";

export class UpaTransactionData {
  public totalAmount: number;
  public cashBackAmount: number;
  public tranDate: string;
  public tranTime: string;
  public transType: TransactionType;
}
