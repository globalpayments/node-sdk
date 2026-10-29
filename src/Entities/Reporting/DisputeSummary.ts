import { ManagementBuilder } from "../../Builders";
import { TransactionType } from "../Enums";
import { DisputeDocument } from "../DisputeDocument";
import { Action } from "../Action";

export interface DisputePaymentMethodProvider {
  comment: string;
  reference: string;
  documents: DisputeDocument[];
}

export class DisputeSummary {
  public action: Action | null;
  public merchantId: string;
  public platformMerchantName: string;
  public accountId: string;
  public accountName: string;
  public caseStageTime: Date | null;
  public caseStatusTime: Date | null;
  public merchantAmount: string;
  public merchantCurrency: string;
  public investigatorComment: string;
  public fundingType: string;
  public lastAdjustmentTimeCreated: Date | null;
  public netFinancialAmount: string;
  public netFinancialCurrency: string;
  public netFinancialFunding: string;
  public foreignIssuedCard: string;
  public dispositionDescription: string;
  public dispositionDate: Date | null;
  public storeReference: string;
  public regionCode: string;
  public acquirerCode: string;
  public globalTransactionReference: string;
  public globalTransactionSource: string;
  public paymentMethodProvider: DisputePaymentMethodProvider[];
  public terminalCapacityCode: string;
  public transactionBrandReference: string;
  public transactionCardFunding: string;
  public transactionCardIssuer: string;
  public transactionIssuerBin: string;
  public transactionAcquirerBin: string;
  public transactionRemarks: string;
  public transactionTerminalCapabilityCode: string;
  public transactionMerchantCategoryCode: string;
  public transactionAvsResult: string;
  public transactionEntryModeCode: string;
  public transactionInvoiceNumber: string;
  public merchantHierarchy: string | null;
  public merchantName: string | null;
  public merchantDbaName: string | null;
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
  public caseIdTime: Date | null;
  public caseMerchantId: string;
  public caseTerminalId: string | null;
  public transactionARN: string;
  public transactionReferenceNumber: string;
  public transactionSRD: string;
  public transactionAuthCode: string;
  public transactionCardType: string;
  public transactionMaskedCardNumber: string;
  public reason: string;
  public reasonCode: string;
  public result: string;
  public issuerComment: string[];
  public issuerCaseNumber: string[];
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
