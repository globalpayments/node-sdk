import { CustomerDocumentType } from "./Enums";

export class CustomerDocument {
  public reference: string;

  public issuer: string;

  /** @var CustomerDocumentType */
  public type: CustomerDocumentType;

  constructor(reference: string, issuer: string, type: CustomerDocumentType) {
    this.reference = reference;
    this.issuer = issuer;
    this.type = type;
  }
}
