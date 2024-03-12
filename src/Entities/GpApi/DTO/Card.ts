export class Card {
  public number: string;
  public expiry_month: string;
  public expiry_year: string;
  public cvv: string;
  public cvv_indicator?: string;
  public avs_address?: string;
  public avs_postal_code?: string;
  public track?: string;
  public tag?: string;
  public funding?: string;
  public chip_condition?: string;
  public pin_block?: string;
  public brand_reference?: string;
  public authcode?: string;
}
