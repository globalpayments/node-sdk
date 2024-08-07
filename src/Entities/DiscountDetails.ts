export class DiscountDetails {
  public discountName?: string;
  public discountAmount: string | number | undefined;
  public discountPercentage: string | number | undefined;
  public discountType?: string;
  public discountPriority?: number;
  public discountIsStackable?: boolean;
}
