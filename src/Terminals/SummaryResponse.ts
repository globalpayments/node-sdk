import { TransactionSummary } from "../../src";

export enum SummaryType {
  Approved,
  PartiallyApproved,
  VoidApproved,
  Pending,
  VoidPending,
  Declined,
  VoidDeclined,
  OfflineApproved,
  Provsional,
  Discarded,
  VoidProvisional,
  VoidDiscarded,
  Reversal,
  EmvDeclined,
  Attachment,
  Unknown,
}

export class SummaryResponse {
  public amount: number;
  public amountDue: number;
  public authorizedAmount: number;
  public count: number;
  public summaryType: SummaryType;
  public totalAmountCount: number;
  public transactions: TransactionSummary;
}
