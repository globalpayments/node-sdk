import { AdditionalTaxDetails } from "./AdditionalTaxDetails";
import { TaxType, TransactionModifier } from "./Enums";
import { CommercialLineItem } from "./CommercialLineItem";

export class CommercialData {
  public additionalTaxDetails?: AdditionalTaxDetails;
  public commercialIndicator: TransactionModifier;
  public customerVAT_Number?: string;
  public customerReferenceId?: string;
  public description?: string;
  public discountAmount?: string | number;
  public dutyAmount?: string | number;
  public destinationPostalCode?: string;
  public destinationCountryCode?: string;
  public freightAmount?: string | number;
  public lineItems: CommercialLineItem[];
  public orderDate?: Date;
  public originPostalCode?: string;
  public poNumber?: string;
  public supplierReferenceNumber?: string;
  public taxAmount?: string | number;
  public taxType: TaxType;
  public summaryCommodityCode?: string;
  public vat_InvoiceNumber?: string;

  constructor(
    taxType: TaxType,
    level: TransactionModifier = TransactionModifier.LevelII,
  ) {
    this.taxType = taxType;
    this.commercialIndicator = level;
    this.lineItems = [];
  }

  public addLineItems(items: CommercialLineItem): CommercialData {
    this.lineItems.push(items);
    return this;
  }
}
