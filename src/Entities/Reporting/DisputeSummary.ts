import { ManagementBuilder } from "../../Builders";
import { TransactionType } from "../Enums";
import { DisputeDocument } from "../DisputeDocument";

export class DisputeSummary {
  public merchantHierarchy: string;
  public merchantName: string;
  public merchantDbaName: string;
  public merchantNumber: string;
  public merchantCategory: string;
  public depositDate: Date | null;
  public depositReference: string;
  public depositType: string;
  public type: string;
  public caseAmount: string;
  public caseCurrency: string;
  public caseStage: string;
  public caseStatus: string;
  public caseDescription: string;
  public transactionOrderId: string;
  public transactionLocalTime: Date;
  public transactionTime: Date;
  public transactionType: string;
  public transactionAmount: string;
  public transactionCurrency: string;
  public caseNumber: string;
  public caseTime: Date;
  public caseId: string;
  public caseIdTime: Date | string;
  public caseMerchantId: string;
  public caseTerminalId: string;
  public transactionARN: string;
  public transactionReferenceNumber: string;
  public transactionSRD: string;
  public transactionAuthCode: string;
  public transactionCardType: string;
  public transactionMaskedCardNumber: string;
  public reason: string;
  public reasonCode: string;
  public result: string;
  public issuerComment: string;
  public issuerCaseNumber: string;
  public disputeAmount: number;
  public disputeCurrency: string;
  public disputeCustomerAmount: number;
  public disputeCustomerCurrency: string;
  public respondByDate: Date;
  public caseOriginalReference: string;
  public lastAdjustmentAmount: string;
  public lastAdjustmentCurrency: string;
  public lastAdjustmentFunding: string;
  public documents: DisputeDocument[];

  accept(): ManagementBuilder {
    return new ManagementBuilder(
      TransactionType.DisputeAcceptance,
    ).withDisputeId(this.caseId);
  }

  challenge(documents: DisputeDocument[]): ManagementBuilder {
    return new ManagementBuilder(TransactionType.DisputeChallenge)
      .withDisputeId(this.caseId)
      .withDisputeDocuments(documents);
  }
}
