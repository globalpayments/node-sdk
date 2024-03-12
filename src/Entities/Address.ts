import { AddressType } from "../Entities";

export class Address {
  // TODO backfill address with missing fields
  public type: AddressType;
  public streetAddress1: string;
  public streetAddress2: string;
  public streetAddress3: string;
  public city: string;
  public province: string;
  public postalCode: string;
  public country: string;
  public countryCode: string;

  get state(): string {
    return this.province;
  }

  set state(value: string) {
    this.province = value;
  }
}
