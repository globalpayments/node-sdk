import { CreditCardData } from "../../PaymentMethods/CreditCardData";
import { Address } from "../Address";

export class FlashFundsPaymentCardData {
  public creditCard: CreditCardData;
  public cardholderAddress: Address;

  constructor() {
    this.creditCard = new CreditCardData();
    this.cardholderAddress = new Address();
  }
}
