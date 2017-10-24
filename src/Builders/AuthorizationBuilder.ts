import {
  Address,
  AddressType,
  AliasAction,
  EcommerceInfo,
  GiftCard,
  HostedPaymentData,
  InquiryType,
  IPaymentMethod,
  PaymentMethod,
  PaymentMethodType,
  RecurringSequence,
  RecurringType,
  ServicesContainer,
  Transaction,
  TransactionModifier,
  TransactionReference,
  TransactionType,
  UnsupportedTransactionError,
} from "../";
import { TransactionBuilder } from "./TransactionBuilder";

export class AuthorizationBuilder
  extends TransactionBuilder<Transaction> {
  public alias: string;
  public aliasAction: AliasAction;
  public allowDuplicates: boolean;
  public allowPartialAuth: boolean;
  public amount: string | number;
  public authAmount: string | number;
  public balanceInquiryType: InquiryType;
  public billingAddress: Address;
  public cashBackAmount: string | number;
  public clientTransactionId: string;
  public currency: string;
  public customerId: string;
  public customerIpAddress: string;
  public cvn: string;
  public description: string;
  public dynamicDescriptor: string;
  public ecommerceInfo: EcommerceInfo;
  public gratuity: string | number;
  public convenienceAmt: string | number;
  public shippingAmt: string | number;
  public hostedPaymentData: HostedPaymentData;
  public invoiceNumber: string;
  public level2Request: boolean;
  public offlineAuthCode: string;
  public oneTimePayment: boolean;
  public orderId: string;
  public productId: string;
  public recurringSequence: RecurringSequence;
  public recurringType: RecurringType;
  public requestMultiUseToken: boolean;
  public replacementCard: GiftCard;
  public scheduleId: string;
  public shippingAddress: Address;
  public timestamp: string;

  public constructor(type: number, paymentMethod?: IPaymentMethod) {
    super(type, paymentMethod);

    if (paymentMethod) {
      this.paymentMethod = paymentMethod as PaymentMethod;
    }
  }

  /**
   * Executes the authorization builder against the gateway.
   *
   * @returns Promise<Transaction>
   */
  public execute(): Promise<Transaction> {
    super.execute();
    return ServicesContainer.instance()
      .getClient()
      .processAuthorization(this);
  }

  /**
   * Serializes an authorization builder for hosted payment page requests.
   *
   * Requires the gateway and account support hosted payment pages.
   *
   * @throws UnsupportedTransactionError Thrown when gateway doesn't support hosted payments
   * @returns string
   */
  public serialize() {
    this.transactionModifier = TransactionModifier.HostedRequest;
    super.execute();

    const client = ServicesContainer.instance().getClient();
    if (client.supportsHostedPayments) {
      return client.serializeRequest(this);
    }

    throw new UnsupportedTransactionError("Your current gateway does not support hosted payments");
  }

  protected setupValidations(): void {
    this.validations.of(
      "transactionType",
      /* tslint:disable:trailing-comma */
      TransactionType.Auth |
      TransactionType.Sale |
      TransactionType.Refund |
      TransactionType.AddValue
      /* tslint:enable:trailing-comma */
    )
      .with("transactionModifier", TransactionModifier.None)
      .check("amount").isNotNull()
      .check("currency").isNotNull()
      .check("paymentMethod").isNotNull();

    this.validations.of(
      "transactionType",
      /* tslint:disable:trailing-comma */
      TransactionType.Auth |
      TransactionType.Sale |
      TransactionType.Verify
      /* tslint:enable:trailing-comma */
    )
      .with("transactionModifier", TransactionModifier.HostedRequest)
      .check("amount").isNotNull()
      .check("currency").isNotNull();

    this.validations.of(
      "transactionType",
      /* tslint:disable:trailing-comma */
      TransactionType.Auth |
      TransactionType.Sale
      /* tslint:enable:trailing-comma */
    )
      .with("transactionModifier", TransactionModifier.Offline)
      .check("amount").isNotNull()
      .check("currency").isNotNull()
      .check("offlineAuthCode").isNotNull()
      .check("offlineAuthCode").isNotEmpty();

    this.validations.of("transactionType", TransactionType.BenefitWithDrawal)
      .with("transactionModifier", TransactionModifier.CashBack)
      .check("amount").isNotNull()
      .check("currency").isNotNull()
      .check("paymentMethod").isNotNull();

    this.validations.of("transactionType", TransactionType.Balance)
      .check("paymentMethod").isNotNull();

    this.validations.of("transactionType", TransactionType.Alias)
      .check("aliasAction").isNotNull()
      .check("alias").isNotNull();

    this.validations.of("transactionType", TransactionType.Replace)
      .check("replacementCard").isNotNull();

    this.validations.of("paymentMethodType", PaymentMethodType.ACH)
      .check("billingAddress").isNotNull();
  }

  /**
   * Sets an address value; where applicable.
   *
   * Currently supports billing and shipping addresses.
   *
   * @param address The desired address information
   * @param addressType The desired address type
   * @returns AuthorizationBuilder
   */
  public withAddress(address?: Address, addressType = AddressType.Billing) {
    if (address === undefined) {
      return this;
    }

    address.type = addressType;

    if (addressType === AddressType.Billing) {
      this.billingAddress = address;
    } else {
      this.shippingAddress = address;
    }

    return this;
  }

  public withAlias(aliasAction: AliasAction, alias?: string) {
    if (alias !== undefined) {
      this.alias = alias;
    }
    this.aliasAction = aliasAction;
    return this;
  }

  /**
   * Allows duplicate transactions by skipping the
   * gateway's duplicate checking.
   *
   * @param allowDuplicates The duplicate skip flag
   * @returns AuthorizationBuilder
   */
  public withAllowDuplicates(allowDuplicates?: boolean) {
    if (allowDuplicates !== undefined) {
      this.allowDuplicates = allowDuplicates;
    }
    return this;
  }

  /**
   * Allows partial authorizations to occur.
   *
   *
   * @param allowPartialAuth The allow partial flag
   * @returns AuthorizationBuilder
   */
  public withAllowPartialAuth(allowPartialAuth?: boolean) {
    if (allowPartialAuth !== undefined) {
      this.allowPartialAuth = allowPartialAuth;
    }
    return this;
  }

  /**
   * Sets the transaction's amount
   *
   * @param amount The amount
   * @returns AuthorizationBuilder
   */
  public withAmount(amount?: string | number) {
    if (amount !== undefined) {
      this.amount = amount;
    }
    return this;
  }

  /**
   * Sets the transaction's authorization amount; where applicable.
   *
   * This is a specialized field. In most cases,
   * `Authorization.withAmount` should be used.
   *
   * @param authAmount The authorization amount
   * @returns AuthorizationBuilder
   */
  public withAuthAmount(authAmount?: string | number) {
    if (authAmount !== undefined) {
      this.authAmount = authAmount;
    }
    return this;
  }

  public withBalanceInquiryType(inquiry?: InquiryType) {
    if (inquiry !== undefined) {
      this.balanceInquiryType = inquiry;
    }
    return this;
  }

  /**
   * Sets the cash back amount.
   *
   * This is a specialized field for debit or EBT transactions.
   *
   * @param amount The desired cash back amount
   * @returns AuthorizationBuilder
   */
  public withCashBack(amount?: string | number) {
    if (amount !== undefined) {
      this.cashBackAmount = amount;
      this.transactionModifier = TransactionModifier.CashBack;
    }
    return this;
  }

  /**
   * Sets the client transaction ID.
   *
   * This is an application derived value that can be used to identify a
   * transaction in case a gateway transaction ID is not returned, e.g.
   * in cases of timeouts.
   *
   * The supplied value should be unique to the configured merchant or
   * terminal account.
   *
   * @param clientTransactionId The client transaction ID
   * @returns AuthorizationBuilder
   */
  public withClientTransactionId(clientTransactionId?: string) {
    if (clientTransactionId === undefined) {
      return this;
    }

    if (this.transactionType !== TransactionType.Reversal &&
      this.transactionType !== TransactionType.Refund
    ) {
      this.clientTransactionId = clientTransactionId;
      return this;
    }

    if (!(this.paymentMethod instanceof TransactionReference)) {
      this.paymentMethod = (new TransactionReference() as IPaymentMethod) as PaymentMethod;
    }

    ((this.paymentMethod as IPaymentMethod) as TransactionReference).clientTransactionId = clientTransactionId;
    return this;
  }

  /**
   * Sets the transaction's currency; where applicable.
   *
   * The formatting for the supplied value will currently depend on
   * the configured gateway's requirements.
   *
   * @param currency The currency
   * @returns AuthorizationBuilder
   */
  public withCurrency(currency?: string) {
    if (currency !== undefined) {
      this.currency = currency;
    }
    return this;
  }

  /**
   * Sets the customer ID; where applicable.
   *
   * This is an application/merchant generated value.
   *
   * @param customerId The customer ID
   * @returns AuthorizationBuilder
   */
  public withCustomerId(customerId?: string) {
    if (customerId !== undefined) {
      this.customerId = customerId;
    }
    return this;
  }

  /**
   * Sets the customer's IP address; where applicable.
   *
   * This value should be obtained during the payment process.
   *
   * @param customerIpAddress The customer's IP address
   * @returns AuthorizationBuilder
   */
  public withCustomerIpAddress(customerIpAddress?: string) {
    if (customerIpAddress !== undefined) {
      this.customerIpAddress = customerIpAddress;
    }
    return this;
  }

  /**
   * Sets the CVN value for recurring payments; where applicable.
   *
   * @param cvn CVN value to use in the request
   * @returns AuthorizationBuilder
   */
  public withCvn(cvn?: string) {
    if (cvn !== undefined) {
      this.cvn = cvn;
    }
    return this;
  }

  /**
   * Sets the transaction's description.
   *
   * This value is not guaranteed to be sent in the authorization
   * or settlement process.
   *
   * @param description The description
   * @returns AuthorizationBuilder
   */
  public withDescription(description?: string) {
    if (description !== undefined) {
      this.description = description;
    }
    return this;
  }

  /**
   * Sets the transaction's dynamic descriptor.
   *
   * This value is sent during the authorization process and is displayed
   * in the consumer's account.
   *
   * @param dynamicDescriptor The dynamic descriptor
   * @returns AuthorizationBuilder
   */
  public withDynamicDescriptor(dynamicDescriptor?: string) {
    if (dynamicDescriptor !== undefined) {
      this.dynamicDescriptor = dynamicDescriptor;
    }
    return this;
  }

  /**
   * Sets eCommerce specific data; where applicable.
   *
   * This can include:
   *
   *   - Consumer authentication (3DSecure) data
   *   - Direct market data
   *
   * @param ecommerceInfo The eCommerce data
   * @returns AuthorizationBuilder
   */
  public withEcommerceInfo(ecommerceInfo?: EcommerceInfo) {
    if (ecommerceInfo !== undefined) {
      this.ecommerceInfo = ecommerceInfo;
    }
    return this;
  }

  /**
   * Sets the gratuity amount; where applicable.
   *
   * This value is information only and does not affect
   * the authorization amount.
   *
   * @param gratuity The gratuity amount
   * @returns AuthorizationBuilder
   */
  public withGratuity(gratuity?: string | number) {
    if (gratuity !== undefined) {
      this.gratuity = gratuity;
    }
    return this;
  }

  /**
   * Sets the Convenience amount; where applicable.
   *
   * @param convenienceAmt The Convenience amount
   * @returns AuthorizationBuilder
   */
  public withConvenienceAmt(convenienceAmt?: string | number) {
    if (convenienceAmt !== undefined) {
      this.convenienceAmt = convenienceAmt;
    }
    return this;
  }

  /**
   * Sets the Shipping amount; where applicable.
   *
   * @param shippingAmt The Shipping amount
   * @returns AuthorizationBuilder
   */
  public withShippingAmt(shippingAmt?: string | number) {
    if (shippingAmt !== undefined) {
      this.shippingAmt = shippingAmt;
    }
    return this;
  }

  /**
   * Additional hosted payment specific information for Realex HPP implementation.
   *
   * @param hostedPaymentData The hosted payment data
   * @returns AuthorizationBuilder
   */
  public withHostedPaymentData(hostedPaymentData?: HostedPaymentData) {
    const client = ServicesContainer.instance().getClient();

    if (!client.supportsHostedPayments) {
      throw new UnsupportedTransactionError("Your current gateway does not support hosted payments.");
    }

    if (hostedPaymentData !== undefined) {
      this.hostedPaymentData = hostedPaymentData;
    }
    return this;
  }

  /**
   * Sets the invoice number; where applicable.
   *
   * @param invoiceNumber The invoice number
   * @returns AuthorizationBuilder
   */
  public withInvoiceNumber(invoiceNumber?: string) {
    if (invoiceNumber !== undefined) {
      this.invoiceNumber = invoiceNumber;
    }
    return this;
  }

  /**
   * Sets the commercial request flag; where applicable.
   *
   * This flag indicates commercial purchase cards are accepted/expected.
   * The application should inspect the transaction response and pass the
   * appropriate Level II data when necessary.
   *
   * @param level2Request The commercial request flag
   * @returns AuthorizationBuilder
   */
  public withCommercialRequest(level2Request?: boolean) {
    if (level2Request !== undefined) {
      this.level2Request = level2Request;
    }
    return this;
  }

  /**
   * Sets the offline authorization code; where applicable.
   *
   * The merchant is required to supply this value as obtained when
   * calling the issuing bank for the authorization.
   *
   * @param offlineAuthCode The offline authorization code
   * @returns AuthorizationBuilder
   */
  public withOfflineAuthCode(offlineAuthCode?: string) {
    if (offlineAuthCode !== undefined) {
      this.offlineAuthCode = offlineAuthCode;
      this.transactionModifier = TransactionModifier.Offline;
    }
    return this;
  }

  /**
   * Sets the one-time payment flag; where applicable.
   *
   * This is only useful when using recurring payment profiles for
   * one-time payments that are not a part of a recurring schedule.
   *
   * @param oneTimePayment The one-time flag
   * @returns AuthorizationBuilder
   */
  public withOneTimePayment(oneTimePayment?: boolean) {
    if (oneTimePayment !== undefined) {
      this.oneTimePayment = oneTimePayment;
      this.transactionModifier = TransactionModifier.Recurring;
    }
    return this;
  }

  /**
   * Sets the transaction's order ID; where applicable.
   *
   * @param orderId The order ID
   * @returns AuthorizationBuilder
   */
  public withOrderId(orderId?: string) {
    if (orderId !== undefined) {
      this.orderId = orderId;
    }
    return this;
  }

  /**
   * Sets the transaction's product ID; where applicable.
   *
   * @param productId The product ID
   * @returns AuthorizationBuilder
   */
  public withProductId(productId?: string) {
    if (productId !== undefined) {
      this.productId = productId;
    }
    return this;
  }

  /**
   * Sets the Recurring Info for Realex based recurring payments;
   * where applicable.
   *
   * @param type The value can be 'fixed' or 'variable' depending on whether
   *             the amount will change for each transaction.
   * @param sequence  Indicates where in the recurring sequence the transaction
   *                  occurs. Must be 'first' for the first transaction for this
   *                  card, 'subsequent' for transactions after that, and 'last'
   *                  for the final transaction of the set.
   * @returns AuthorizationBuilder
   */
  public withRecurringInfo(type?: RecurringType, sequence?: RecurringSequence) {
    if (type !== undefined) {
      this.recurringType = type;
    }
    if (sequence !== undefined) {
      this.recurringSequence = sequence;
    }
    return this;
  }

  /**
   * Requests multi-use tokenization / card storage.
   *
   * This will depend on a successful transaction. If there was a failure
   * or decline, the multi-use tokenization / card storage will not be
   * successful.
   *
   * @param requestMultiUseToken The request flag
   * @returns AuthorizationBuilder
   */
  public withRequestMultiUseToken(requestMultiUseToken?: boolean) {
    if (requestMultiUseToken !== undefined) {
      this.requestMultiUseToken = requestMultiUseToken;
    }
    return this;
  }

  public withReplacementCard(replacementCard?: GiftCard) {
    if (replacementCard !== undefined) {
      this.replacementCard = replacementCard;
    }
    return this;
  }

  /**
   * Sets the schedule ID associated with the transaction; where applicable.
   *
   * This is specific to transactions against recurring profiles that are
   * a part of a recurring schedule.
   *
   * @param scheduleId The schedule ID
   * @returns AuthorizationBuilder
   */
  public withScheduleId(scheduleId?: string) {
    if (scheduleId !== undefined) {
      this.scheduleId = scheduleId;
    }
    return this;
  }

  /**
   * Sets the related gateway transaction ID; where applicable.
   *
   * This value is used to associated a previous transaction with the
   * current transaction.
   *
   * @param transactionId The gateway transaction ID
   * @returns AuthorizationBuilder
   */
  public withTransactionId(transactionId?: string) {
    if (transactionId === undefined) {
      return this;
    }

    if (this.paymentMethod instanceof TransactionReference) {
      this.paymentMethod.transactionId = transactionId;
      return this;
    }

    return this.withPaymentMethod(new TransactionReference(transactionId));
  }

  public withTimestamp(timestamp?: string) {
    if (timestamp !== undefined) {
      this.timestamp = timestamp;
    }
    return this;
  }
}
