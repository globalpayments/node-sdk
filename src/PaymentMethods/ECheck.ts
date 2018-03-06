import {
  AccountType,
  AuthorizationBuilder,
  CheckType,
  EntryMethod,
  PaymentMethodType,
  SecCode,
  TransactionType,
} from "../";
import { IChargable } from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";

export class ECheck extends PaymentMethod implements IChargable {
  public accountNumber: string;
  public accountType: AccountType;
  public achVerify: boolean;
  public birthYear: string;
  public checkHolderName: string;
  public checkName: string;
  public checkNumber: string;
  public checkType: CheckType;
  public checkVerify: boolean;
  public driversLicenseNumber: string;
  public driversLicenseState: string;
  public entryMode: EntryMethod;
  public micrNumber: string;
  public paymentMethodType = PaymentMethodType.ACH;
  public phoneNumber: string;
  public routingNumber: string;
  public secCode: SecCode;
  public ssnLast4: string;
  public token: string;

  /**
   * Authorizes the payment method and captures the entire authorized amount
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public charge(amount?: string | number) {
    return new AuthorizationBuilder(TransactionType.Sale, this).withAmount(
      amount,
    );
  }
}
