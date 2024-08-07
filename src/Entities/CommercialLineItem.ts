import { DiscountDetails } from "./DiscountDetails";
import { CreditDebitIndicator, NetGrossIndicator } from "./Enums";

export class CommercialLineItem {
  alternateTaxId?: string;
  commodityCode?: string;
  description?: string;
  extendedAmount?: string | number;
  creditDebitIndicator?: CreditDebitIndicator;
  netGrossIndicator?: NetGrossIndicator;
  name?: string;
  productCode?: string;
  quantity?: string | number;
  unitOfMeasure?: string;
  unitCost?: string | number;
  taxAmount?: string | number;
  taxName?: string | number;
  upc?: string;
  taxPercentage?: string | number;
  discountDetails?: DiscountDetails;
  totalAmount?: string | number;
}
