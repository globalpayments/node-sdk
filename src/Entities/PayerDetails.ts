import { Address } from ".";

export class PayerDetails {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  billingAddress: Address;
  shippingAddress: Address;
}
