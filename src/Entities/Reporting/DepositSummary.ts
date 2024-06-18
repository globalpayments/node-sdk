import { BaseSummary } from "./BaseSummary";

export class DepositSummary extends BaseSummary {
  depositId: string;
  depositDate: Date;
  reference: string;
  type: string;
  routingNumber: string;
  accountNumber: string;
  mode: string;
  summaryModel: string;
  salesTotalCount: number;
  salesTotalAmount: string;
  salesTotalCurrency: string;
  refundsTotalCount: number;
  refundsTotalAmount: string;
  refundsTotalCurrency: string;
  chargebackTotalCount: number;
  chargebackTotalAmount: string;
  chargebackTotalCurrency: string;
  representmentTotalCount: number;
  representmentTotalAmount: number;
  representmentTotalCurrency: string;
  feesTotalAmount: string;
  feesTotalCurrency: string;
  adjustmentTotalCount: number;
  adjustmentTotalAmount: string;
  adjustmentTotalCurrency: string;
  status: string;
}
