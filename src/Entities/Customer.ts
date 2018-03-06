import { Address, IPaymentMethod, RecurringPaymentMethod } from "../";
import { RecurringEntity } from "./RecurringEntity";

export class Customer extends RecurringEntity<Customer> {
  /**
   * Customer's title
   */
  public title: string;

  /**
   * Customer's first name
   */
  public firstName: string;

  /**
   * Customer's last name
   */
  public lastName: string;

  /**
   * Customer's company
   */
  public company: string;

  /**
   * Customer's address
   */
  public address: Address;

  /**
   * Customer's home phone number
   */
  public homePhone: string;

  /**
   * Customer's work phone number
   */
  public workPhone: string;

  /**
   * Customer's fax phone number
   */
  public fax: string;

  /**
   * Customer's mobile phone number
   */
  public mobilePhone: string;

  /**
   * Customer's email address
   */
  public email: string;

  /**
   * Customer comments
   */
  public comments: string;

  /**
   * Customer's department within its organization
   */
  public department: string;

  /**
   * Customer resource's status
   */
  public status: string;

  /**
   * Adds a payment method to the customer
   *
   * @param paymentId An application derived ID for the payment method
   * @param paymentMethod The payment method
   * @returns RecurringPaymentMethod
   */
  public addPaymentMethod(paymentId: string, paymentMethod: IPaymentMethod) {
    let nameOnAccount = `${this.firstName} ${this.lastName}`;
    if (!this.firstName && !this.lastName) {
      nameOnAccount = this.company;
    }

    const result = new RecurringPaymentMethod(paymentMethod);
    result.address = this.address;
    result.customerKey = this.key;
    result.id = paymentId;
    result.nameOnAccount = nameOnAccount;
    return result;
  }
}
