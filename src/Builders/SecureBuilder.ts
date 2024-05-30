import { PaymentMethod } from "src/PaymentMethods";
import {
  Address,
  AddressType,
  AgeIndicator,
  AuthenticationSource,
  CustomerAuthenticationMethod,
  DeliveryTimeFrame,
  OrderTransactionType,
  PhoneNumber,
  PhoneNumberType,
  PreOrderIndicator,
  PriorAuthenticationMethod,
  ReorderIndicator,
  ShippingMethod,
  TransactionType,
} from "../../src/Entities";
import { BaseBuilder } from "./BaseBuilder";
import { BrowserData } from "src/Entities/BrowserData";

export abstract class SecureBuilder<T> extends BaseBuilder<T> {
  private amount: string | number;
  private currency: string;
  private orderCreateDate: string;
  private orderTransactionType: OrderTransactionType;
  private orderId: string;
  private referenceNumber: string;
  private addressMatchIndicator: boolean;
  private shippingAddress: Address;
  private shippingMethod: ShippingMethod;
  private shippingNameMatchesCardHolderName: boolean;
  private shippingAddressCreateDate: Date;
  public shippingAddressUsageIndicator: AgeIndicator;
  private giftCardAmount: number;
  private giftCardCount: number;
  private giftCardCurrency: string;
  private deliveryEmail: string;
  private deliveryTimeframe: DeliveryTimeFrame;
  private preOrderAvailabilityDate: Date;
  private preOrderIndicator: PreOrderIndicator;
  private reorderIndicator: ReorderIndicator;
  private customerAccountId: string;
  private accountAgeIndicator: AgeIndicator;
  private accountChangeDate: Date;
  private accountCreateDate: Date;
  private accountChangeIndicator: AgeIndicator;
  private passwordChangeDate: Date;
  private passwordChangeIndicator: AgeIndicator;
  private phoneList: Record<PhoneNumberType, any>;
  private homeCountryCode: string;
  private homeNumber: string;
  private workCountryCode: string;
  private workNumber: string;
  private mobileCountryCode: string;
  private mobileNumber: string;
  private paymentAccountCreateDate: Date;
  private paymentAgeIndicator: AgeIndicator;
  private previousSuspiciousActivity: boolean;
  private numberOfPurchasesInLastSixMonths: number;
  private numberOfTransactionsInLast24Hours: number;
  private numberOfAddCardAttemptsInLast24Hours: number;
  private numberOfTransactionsInLastYear: number;
  private browserData: BrowserData;
  private priorAuthenticationData: string;
  private priorAuthenticationMethod: PriorAuthenticationMethod;
  private priorAuthenticationTransactionId: string;
  private priorAuthenticationTimestamp: Date;
  private maxNumberOfInstallments: number;
  private recurringAuthorizationExpiryDate: Date;
  private recurringAuthorizationFrequency: number;
  private customerAuthenticationData: string;
  private customerAuthenticationMethod: CustomerAuthenticationMethod;
  private customerAuthenticationTimestamp: Date;
  public idempotencyKey: string;
  protected authenticationSource: AuthenticationSource;
  public paymentMethod: PaymentMethod | null;
  public billingAddress: Address;

  /**************************************GETTERS**************************************/

  /** @returns string|number */
  public getAmount(): string | number {
    return this.amount;
  }

  /** @returns string */
  public getCurrency(): string {
    return this.currency;
  }

  /** @returns AuthenticationSource */
  public getAuthenticationSource(): AuthenticationSource {
    return this.authenticationSource;
  }

  /** @returns Date */
  public getOrderCreateDate(): string {
    return this.orderCreateDate;
  }

  /** @returns string */
  public getOrderId(): string {
    return this.orderId;
  }

  /** @returns OrderTransactionType */
  public getOrderTransactionType(): OrderTransactionType {
    return this.orderTransactionType;
  }

  /** @returns string */
  public getReferenceNumber(): string {
    return this.referenceNumber;
  }

  /** @returns boolean */
  public isAddressMatchIndicator(): boolean {
    return this.addressMatchIndicator;
  }

  /** @returns Address */
  public getShippingAddress(): Address {
    return this.shippingAddress;
  }

  /** @returns ShippingMethod */
  public getShippingMethod(): ShippingMethod {
    return this.shippingMethod;
  }

  /** @returns boolean */
  public getShippingNameMatchesCardHolderName(): boolean {
    return this.shippingNameMatchesCardHolderName;
  }

  /** @returns Date */
  public getShippingAddressCreateDate(): Date {
    return this.shippingAddressCreateDate;
  }

  /** @returns AgeIndicator */
  public getShippingAddressUsageIndicator(): AgeIndicator {
    return this.shippingAddressUsageIndicator;
  }

  /** @returns number */
  public getGiftCardCount(): number {
    return this.giftCardCount;
  }

  /** @returns string */
  public getGiftCardCurrency(): string {
    return this.giftCardCurrency;
  }

  /** @returns number */
  public getGiftCardAmount(): number {
    return this.giftCardAmount;
  }

  /** @returns string */
  public getDeliveryEmail(): string {
    return this.deliveryEmail;
  }

  /** @returns DeliveryTimeFrame */
  public getDeliveryTimeframe(): DeliveryTimeFrame {
    return this.deliveryTimeframe;
  }

  /** @returns Date */
  public getPreOrderAvailabilityDate(): Date {
    return this.preOrderAvailabilityDate;
  }

  /** @returns PreOrderIndicator */
  public getPreOrderIndicator(): PreOrderIndicator {
    return this.preOrderIndicator;
  }

  /** @returns ReorderIndicator */
  public getReorderIndicator(): ReorderIndicator {
    return this.reorderIndicator;
  }

  /** @returns string */
  public getCustomerAccountId(): string {
    return this.customerAccountId;
  }

  /** @returns AgeIndicator */
  public getAccountAgeIndicator(): AgeIndicator {
    return this.accountAgeIndicator;
  }

  /** @returns Date */
  public getAccountChangeDate(): Date {
    return this.accountChangeDate;
  }

  /** @returns Date */
  public getAccountCreateDate(): Date {
    return this.accountCreateDate;
  }

  /** @returns AgeIndicator */
  public getAccountChangeIndicator(): AgeIndicator {
    return this.accountChangeIndicator;
  }

  /** @returns Date */
  public getPasswordChangeDate(): Date {
    return this.passwordChangeDate;
  }

  /** @returns AgeIndicator */
  public getPasswordChangeIndicator(): AgeIndicator {
    return this.passwordChangeIndicator;
  }

  /** @returns string */
  public getHomeCountryCode(): string {
    return this.homeCountryCode;
  }

  /** @returns string */
  public getHomeNumber(): string {
    return this.homeNumber;
  }

  /** @returns string */
  public getWorkCountryCode(): string {
    return this.workCountryCode;
  }

  /** @returns string */
  public getWorkNumber(): string {
    return this.workNumber;
  }

  /** @returns string */
  public getMobileCountryCode(): string {
    return this.mobileCountryCode;
  }

  /** @returns string */
  public getMobileNumber(): string {
    return this.mobileNumber;
  }

  /** @returns Date */
  public getPaymentAccountCreateDate(): Date {
    return this.paymentAccountCreateDate;
  }

  /** @returns AgeIndicator */
  public getPaymentAgeIndicator(): AgeIndicator {
    return this.paymentAgeIndicator;
  }

  /** @returns boolean */
  public getPreviousSuspiciousActivity(): boolean {
    return this.previousSuspiciousActivity;
  }

  /** @returns number */
  public getNumberOfPurchasesInLastSixMonths(): number {
    return this.numberOfPurchasesInLastSixMonths;
  }

  /** @returns number */
  public getNumberOfTransactionsInLast24Hours(): number {
    return this.numberOfTransactionsInLast24Hours;
  }

  /** @returns number */
  public getNumberOfAddCardAttemptsInLast24Hours(): number {
    return this.numberOfAddCardAttemptsInLast24Hours;
  }

  /** @returns number */
  public getNumberOfTransactionsInLastYear(): number {
    return this.numberOfTransactionsInLastYear;
  }

  /** @returns BrowserData */
  public getBrowserData(): BrowserData {
    return this.browserData;
  }

  /** @returns string */
  public getPriorAuthenticationData(): string {
    return this.priorAuthenticationData;
  }

  /** @returns PriorAuthenticationMethod */
  public getPriorAuthenticationMethod(): PriorAuthenticationMethod {
    return this.priorAuthenticationMethod;
  }

  /** @returns string */
  public getPriorAuthenticationTransactionId(): string {
    return this.priorAuthenticationTransactionId;
  }

  /** @returns Date */
  public getPriorAuthenticationTimestamp(): Date {
    return this.priorAuthenticationTimestamp;
  }

  /** @returns number */
  public getMaxNumberOfInstallments(): number {
    return this.maxNumberOfInstallments;
  }

  /** @returns Date */
  public getRecurringAuthorizationExpiryDate(): Date {
    return this.recurringAuthorizationExpiryDate;
  }

  /** @returns number */
  public getRecurringAuthorizationFrequency(): number {
    return this.recurringAuthorizationFrequency;
  }

  /** @returns string */
  public getCustomerAuthenticationData(): string {
    return this.customerAuthenticationData;
  }

  /** @returns CustomerAuthenticationMethod */
  public getCustomerAuthenticationMethod(): CustomerAuthenticationMethod {
    return this.customerAuthenticationMethod;
  }

  /** @returns Date */
  public getCustomerAuthenticationTimestamp(): Date {
    return this.customerAuthenticationTimestamp;
  }

  /************************************************SETTERS****************************/

  /**
   * @param {IPaymentMethod} value
   * @returns {this}
   */
  abstract withPaymentMethod(value: PaymentMethod): this;

  /**
   * @param {TransactionType} transactionType
   * @returns {this}
   */
  withTransactionType(transactionType: TransactionType): this {
    this.transactionType = transactionType;
    return this;
  }

  /**
   * @param {string | number} value
   * @returns {this}
   */
  withAmount(value: string | number): this {
    this.amount = value;
    return this;
  }

  /**
   * @param {string} value
   * @returns {this}
   */
  withCurrency(value: string): this {
    this.currency = value;
    return this;
  }

  /**
   * @param {AuthenticationSource} value
   * @returns {this}
   */
  withAuthenticationSource(value: AuthenticationSource): this {
    this.authenticationSource = value;
    return this;
  }

  /**
   * @param {string} value
   * @returns {this}
   */
  withOrderCreateDate(value: string): this {
    this.orderCreateDate = value;
    return this;
  }

  /**
   * @param {string} referenceNumber
   * @returns {this}
   */
  withReferenceNumber(referenceNumber: string): this {
    this.referenceNumber = referenceNumber;
    return this;
  }

  /**
   * @param {boolean} value
   * @returns {this}
   */
  withAddressMatchIndicator(value: boolean): this {
    this.addressMatchIndicator = value;
    return this;
  }

  /**
   * @param {Address} address
   * @param {string} type
   * @returns {this}
   */
  withAddress(address: Address, type: AddressType = AddressType.Billing): this {
    if (type === AddressType.Billing) {
      this.billingAddress = address;
    } else {
      this.shippingAddress = address;
    }
    return this;
  }

  /**
   * @param {number} giftCardAmount
   * @returns {this}
   */
  withGiftCardAmount(giftCardAmount: number): this {
    this.giftCardAmount = giftCardAmount;

    return this;
  }

  /**
   * @param {number} giftCardCount
   * @returns {this}
   */
  withGiftCardCount(giftCardCount: number): this {
    this.giftCardCount = giftCardCount;
    return this;
  }

  /**
   * @param {string} giftCardCurrency
   * @returns {this}
   */
  withGiftCardCurrency(giftCardCurrency: string): this {
    this.giftCardCurrency = giftCardCurrency;
    return this;
  }

  /**
   * @param {string} deliveryEmail
   * @returns {this}
   */
  withDeliveryEmail(deliveryEmail: string): this {
    this.deliveryEmail = deliveryEmail;
    return this;
  }

  /**
   * @param {DeliveryTimeFrame} deliveryTimeframe
   * @returns {this}
   */
  withDeliveryTimeFrame(deliveryTimeframe: DeliveryTimeFrame): this {
    this.deliveryTimeframe = deliveryTimeframe;
    return this;
  }

  /**
   * @param {ShippingMethod} shippingMethod
   * @returns {this}
   */
  withShippingMethod(shippingMethod: ShippingMethod): this {
    this.shippingMethod = shippingMethod;
    return this;
  }

  /**
   * @param {boolean} shippingNameMatchesCardHolderName
   * @returns {this}
   */
  withShippingNameMatchesCardHolderName(
    shippingNameMatchesCardHolderName: boolean,
  ): this {
    this.shippingNameMatchesCardHolderName = shippingNameMatchesCardHolderName;
    return this;
  }

  /**
   * @param {Date} shippingAddressCreateDate
   * @returns {this}
   */
  withShippingAddressCreateDate(shippingAddressCreateDate: Date): this {
    this.shippingAddressCreateDate = shippingAddressCreateDate;
    return this;
  }

  /**
   * @param {any} shippingAddressUsageIndicator
   * @returns {this}
   */
  withShippingAddressUsageIndicator(shippingAddressUsageIndicator: any): this {
    this.shippingAddressUsageIndicator = shippingAddressUsageIndicator;
    return this;
  }

  /**
   * @param {any} preOrderAvailabilityDate
   * @returns {this}
   */
  withPreOrderAvailabilityDate(preOrderAvailabilityDate: any): this {
    this.preOrderAvailabilityDate = preOrderAvailabilityDate;
    return this;
  }

  /**
   * @param {any} preOrderIndicator
   * @returns {this}
   */
  withPreOrderIndicator(preOrderIndicator: any): this {
    this.preOrderIndicator = preOrderIndicator;
    return this;
  }

  /**
   * @param {ReorderIndicator} reorderIndicator
   * @returns {this}
   */
  withReorderIndicator(reorderIndicator: ReorderIndicator): this {
    this.reorderIndicator = reorderIndicator;
    return this;
  }

  /**
   * @param {OrderTransactionType} orderTransactionType
   * @returns {this}
   */
  withOrderTransactionType(orderTransactionType: OrderTransactionType): this {
    this.orderTransactionType = orderTransactionType;
    return this;
  }

  /**
   * @param {string} value
   * @returns {this}
   */
  withOrderId(value: string): this {
    this.orderId = value;
    return this;
  }

  /**
   * @param {string} customerAccountId
   * @returns {this}
   */
  withCustomerAccountId(customerAccountId: string): this {
    this.customerAccountId = customerAccountId;
    return this;
  }

  /**
   * @param {AgeIndicator} ageIndicator
   * @returns {this}
   */
  withAccountAgeIndicator(ageIndicator: AgeIndicator): this {
    this.accountAgeIndicator = ageIndicator;
    return this;
  }

  /**
   * @param {Date} accountChangeDate
   * @returns {this}
   */
  withAccountChangeDate(accountChangeDate: Date): this {
    this.accountChangeDate = accountChangeDate;
    return this;
  }

  /**
   * @param {Date} accountCreateDate
   * @returns {this}
   */
  withAccountCreateDate(accountCreateDate: Date): this {
    this.accountCreateDate = accountCreateDate;
    return this;
  }

  /**
   * @param {AgeIndicator} accountChangeIndicator
   * @returns {this}
   */
  withAccountChangeIndicator(accountChangeIndicator: AgeIndicator): this {
    this.accountChangeIndicator = accountChangeIndicator;
    return this;
  }

  /**
   * @param {Date} passwordChangeDate
   * @returns {this}
   */
  withPasswordChangeDate(passwordChangeDate: Date): this {
    this.passwordChangeDate = passwordChangeDate;

    return this;
  }

  /**
   * @param {AgeIndicator} passwordChangeIndicator
   * @returns {this}
   */
  withPasswordChangeIndicator(passwordChangeIndicator: AgeIndicator): this {
    this.passwordChangeIndicator = passwordChangeIndicator;
    return this;
  }

  /**
   * @param {string} phoneCountryCode
   * @param {string} number
   * @param {PhoneNumberType} type
   *
   * @returns {this}
   */
  withPhoneNumber(
    phoneCountryCode: string,
    number: string,
    type: PhoneNumberType,
  ): this {
    const phoneNumber = new PhoneNumber(phoneCountryCode, number, type);
    this.phoneList[type] = phoneNumber;
    switch (phoneNumber.type) {
      case PhoneNumberType.HOME:
        this.homeNumber = number;
        this.homeCountryCode = phoneCountryCode;
        break;
      case PhoneNumberType.WORK:
        this.workNumber = number;
        this.workCountryCode = phoneCountryCode;
        break;
      case PhoneNumberType.MOBILE:
        this.mobileNumber = number;
        this.mobileCountryCode = phoneCountryCode;
        break;
      default:
        break;
    }

    return this;
  }

  /**
   * @deprecated  Will be replaced with method withPhoneNumber($phoneCountryCode, $number, $type)
   * @param {string} countryCode
   * @param {string} number
   *
   * @returns {this}
   */
  withHomeNumber(countryCode: string, number: string): this {
    this.homeCountryCode = countryCode;
    this.homeNumber = number;

    return this;
  }

  /**
   * @deprecated  Will be replaced with method withPhoneNumber($phoneCountryCode, $number, $type)
   *
   * @param {string} countryCode
   * @param {string} number
   * @returns {this}
   */
  withWorkNumber(countryCode: string, number: string): this {
    this.workCountryCode = countryCode;
    this.workNumber = number;
    return this;
  }

  /**
   * @deprecated  Will be replaced with method withPhoneNumber($phoneCountryCode, $number, $type)
   *
   * @param {string} countryCode
   * @param {string} number
   * @returns {this}
   */
  withMobileNumber(countryCode: string, number: string): this {
    this.mobileCountryCode = countryCode;
    this.mobileNumber = number;
    return this;
  }

  /**
   * @param {Date} paymentAccountCreateDate
   * @returns {this}
   */
  withPaymentAccountCreateDate(paymentAccountCreateDate: Date): this {
    this.paymentAccountCreateDate = paymentAccountCreateDate;
    return this;
  }

  /**
   * @param {AgeIndicator} paymentAgeIndicator
   * @returns {this}
   */
  withPaymentAccountAgeIndicator(paymentAgeIndicator: AgeIndicator): this {
    this.paymentAgeIndicator = paymentAgeIndicator;
    return this;
  }

  /**
   * @param {any} previousSuspiciousActivity
   * @returns {this}
   */
  withPreviousSuspiciousActivity(previousSuspiciousActivity: any): this {
    this.previousSuspiciousActivity = previousSuspiciousActivity;
    return this;
  }

  /**
   * @param {string} numberOfPurchasesInLastSixMonths
   * @returns {this}
   */
  withNumberOfPurchasesInLastSixMonths(
    numberOfPurchasesInLastSixMonths: number,
  ): this {
    this.numberOfPurchasesInLastSixMonths = numberOfPurchasesInLastSixMonths;
    return this;
  }

  /**
   * @param {number} numberOfTransactionsInLast24Hours
   * @returns {this}
   */
  withNumberOfTransactionsInLast24Hours(
    numberOfTransactionsInLast24Hours: number,
  ): this {
    this.numberOfTransactionsInLast24Hours = numberOfTransactionsInLast24Hours;
    return this;
  }

  /**
   * @param {number} numberOfAddCardAttemptsInLast24Hours
   * @returns {this}
   */
  withNumberOfAddCardAttemptsInLast24Hours(
    numberOfAddCardAttemptsInLast24Hours: number,
  ): this {
    this.numberOfAddCardAttemptsInLast24Hours =
      numberOfAddCardAttemptsInLast24Hours;
    return this;
  }

  /**
   * @param {number} numberOfTransactionsInLastYear
   * @returns {this}
   */
  withNumberOfTransactionsInLastYear(
    numberOfTransactionsInLastYear: number,
  ): this {
    this.numberOfTransactionsInLastYear = numberOfTransactionsInLastYear;
    return this;
  }

  /**
   * @param {BrowserData} value
   * @returns {this}
   */
  withBrowserData(value: BrowserData): this {
    this.browserData = value;
    return this;
  }

  /**
   * @param {string} priorAuthenticationData
   * @returns {this}
   */
  withPriorAuthenticationData(priorAuthenticationData: string): this {
    this.priorAuthenticationData = priorAuthenticationData;
    return this;
  }

  /**
   * @param {PriorAuthenticationMethod} priorAuthenticationMethod
   * @returns {this}
   */
  withPriorAuthenticationMethod(
    priorAuthenticationMethod: PriorAuthenticationMethod,
  ): this {
    this.priorAuthenticationMethod = priorAuthenticationMethod;
    return this;
  }

  /**
   * @param {string} priorAuthenticationTransactionId
   * @returns {this}
   */
  withPriorAuthenticationTransactionId(
    priorAuthenticationTransactionId: string,
  ): this {
    this.priorAuthenticationTransactionId = priorAuthenticationTransactionId;
    return this;
  }

  /**
   * @param {Date} priorAuthenticationTimestamp
   * @returns {this}
   */
  withPriorAuthenticationTimestamp(priorAuthenticationTimestamp: Date): this {
    this.priorAuthenticationTimestamp = priorAuthenticationTimestamp;
    return this;
  }

  /**
   * @param {number} maxNumberOfInstallments
   * @returns {this}
   */
  withMaxNumberOfInstallments(maxNumberOfInstallments: number): this {
    this.maxNumberOfInstallments = maxNumberOfInstallments;
    return this;
  }

  /**
   * @param {Date} recurringAuthorizationExpiryDate
   * @returns {this}
   */
  withRecurringAuthorizationExpiryDate(
    recurringAuthorizationExpiryDate: Date,
  ): this {
    this.recurringAuthorizationExpiryDate = recurringAuthorizationExpiryDate;
    return this;
  }

  /**
   * @param {number} recurringAuthorizationFrequency
   * @returns {this}
   */
  withRecurringAuthorizationFrequency(
    recurringAuthorizationFrequency: number,
  ): this {
    this.recurringAuthorizationFrequency = recurringAuthorizationFrequency;
    return this;
  }

  /**
   * @param {string} customerAuthenticationData
   * @returns {this}
   */
  withCustomerAuthenticationData(customerAuthenticationData: string): this {
    this.customerAuthenticationData = customerAuthenticationData;
    return this;
  }

  /**
   * @param {CustomerAuthenticationMethod} customerAuthenticationMethod
   * @returns {this}
   */
  withCustomerAuthenticationMethod(
    customerAuthenticationMethod: CustomerAuthenticationMethod,
  ): this {
    this.customerAuthenticationMethod = customerAuthenticationMethod;
    return this;
  }

  /**
   * @param {Date} customerAuthenticationTimestamp
   * @returns {this}
   */
  withCustomerAuthenticationTimestamp(
    customerAuthenticationTimestamp: Date,
  ): this {
    this.customerAuthenticationTimestamp = customerAuthenticationTimestamp;
    return this;
  }

  /**
   * @param {string} value
   * @returns {SecureBuilder}
   */
  withIdempotencyKey(value: string): this {
    this.idempotencyKey = value;

    return this;
  }
}
