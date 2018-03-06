import { AddressType } from "../Entities";

export class Address {
  public type: AddressType;
  public streetAddress1: string;
  public streetAddress2: string;
  public streetAddress3: string;
  public city: string;
  public province: string;
  public postalCode: string;
  public country: string;

  get state(): string {
    return this.province;
  }

  set state(value: string) {
    this.province = value;
  }
}
