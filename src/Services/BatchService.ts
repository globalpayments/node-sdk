import { BatchSummary, ManagementBuilder, TransactionType } from "../";

export class BatchService {
  public static closeBatch(): Promise<BatchSummary> {
    return new ManagementBuilder(TransactionType.BatchClose)
      .execute()
      .then(() => {
        return new BatchSummary();
      });
  }
}
