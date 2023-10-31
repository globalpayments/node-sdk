import { Address } from "../Address";
import { BankAccountData } from "./BankAccountData";
import { CreditCardData } from "../../PaymentMethods";

export class GrossBillingInformation {
  public grossSettleAddress: Address;
  public grossSettleBankData: BankAccountData;
  public grossSettleCreditCardData: CreditCardData;
}
