import {
  Address,
  CreditCardData,
  CurrencyType,
  IPaymentMethod,
  ITerminalResponse,
  PaymentMethod,
  PaymentMethodType,
  ServicesContainer,
  StoredCredentialInitiator,
  TaxType,
  TransactionModifier,
  TransactionReference,
  TransactionType,
} from "../../../src";
import { TerminalBuilder } from "./TerminalBuilder";

export class TerminalAuthBuilder extends TerminalBuilder {
  public address: Address;

  public allowDuplicates: boolean;

  public amount?: number;

  public authCode: string;

  public cashBackAmount: number;

  public currency: CurrencyType;

  public customerCode: string;

  public gratuity: number;

  public invoiceNumber: string;

  public poNumber: string;

  public requestMultiUseToken: boolean;

  public signatureCapture: boolean;

  public taxAmount: number;

  public taxExempt: string;

  public taxExemptId: string;

  public transactionId: string;

  public shiftId: string;

  public taxType: TaxType;

  public terminalRefNumber?: string;

  public allowPartialAuth: boolean;

  public transactionInitiator: StoredCredentialInitiator;

  constructor(
    transactionType: TransactionType,
    paymentMethodType?: PaymentMethodType,
  ) {
    super(transactionType, paymentMethodType);
    this.transactionType = transactionType;
    this.paymentMethodType = paymentMethodType;
  }

  /**
   * @param string configName
   * @return TerminalResponse
   * @throws \GlobalPayments\Api\Entities\Exceptions\ApiException
   */
  public execute(configName: string = "default"): Promise<ITerminalResponse> {
    super.execute();
    const client = ServicesContainer.instance().getDeviceController(configName);

    return client.processTransaction(this);
  }

  public withAddress(address: Address) {
    this.address = address;
    return this;
  }

  public withAllowDuplicates(allowDuplicates: boolean) {
    this.allowDuplicates = allowDuplicates;
    return this;
  }

  public withAmount(amount?: number) {
    this.amount = amount;
    return this;
  }

  public withCashBack(amount: number) {
    this.cashBackAmount = amount;
    return this;
  }

  public withCurrency(value: CurrencyType) {
    this.currency = value;
    return this;
  }

  public withCustomerCode(customerCode: string) {
    this.customerCode = customerCode;
    return this;
  }

  public withGratuity(gratuity: number) {
    this.gratuity = gratuity;
    return this;
  }

  public withInvoiceNumber(invoiceNumber: string) {
    this.invoiceNumber = invoiceNumber;
    return this;
  }

  public withPoNumber(poNumber: string) {
    this.poNumber = poNumber;
    return this;
  }

  public withRequestMultiUseToken(requestMultiUseToken: boolean) {
    this.requestMultiUseToken = requestMultiUseToken;
    return this;
  }

  public withSignatureCapture(signatureCapture: boolean) {
    this.signatureCapture = signatureCapture;
    return this;
  }

  public withTaxAmount(taxAmount: number) {
    this.taxAmount = taxAmount;
    return this;
  }

  public withToken(value: string) {
    if (
      this.paymentMethod == null ||
      !(this.paymentMethod instanceof CreditCardData)
    ) {
      this.paymentMethod = new CreditCardData();
      (this.paymentMethod as CreditCardData).token = value;
    }
    return this;
  }

  /**
   * Previous request's transaction ID
   *
   * @param string transactionId
   * @return this
   */
  public withTransactionId(transactionId: string) {
    if (transactionId === undefined) {
      return this;
    }

    if (this.paymentMethod instanceof TransactionReference) {
      this.paymentMethod.transactionId = transactionId;
      return this;
    }

    return this.withPaymentMethod(new TransactionReference(transactionId));
  }

  public withPaymentMethod(paymentMethod?: IPaymentMethod) {
    if (paymentMethod !== undefined) {
      this.paymentMethod = paymentMethod as PaymentMethod;
    }
    return this;
  }

  public withCardBrandStorage(transactionInitiator: StoredCredentialInitiator) {
    this.transactionInitiator = transactionInitiator;
    return this;
  }

  public withEcrId(ecrId: number) {
    this.ecrId = ecrId;
    return this;
  }

  public withTerminalRefNumber(terminalRefNumber: string) {
    this.terminalRefNumber = terminalRefNumber;
    return this;
  }

  protected setupValidations() {
    this.validations
      .of(
        "transactionType",
        TransactionType.Auth | TransactionType.Sale | TransactionType.Refund,
      )
      .with("transactionModifier", TransactionModifier.None)
      .check("amount")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.Refund)
      .check("amount")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.Refund)
      .with("paymentMethodType", PaymentMethodType.Credit)
      .check("transactionId")
      .isNotNull()
      .check("authCode")
      .isNotNull();
  }

  public withTaxType(taxType: TaxType, taxExemptId: string = "") {
    this.taxType = taxType;
    this.taxExempt = taxType === TaxType.TaxExempt ? "1" : "0";
    this.taxExemptId = taxExemptId;
    return this;
  }

  public withClientTransactionId(clientTransactionId: string) {
    this.clientTransactionId = clientTransactionId;
    return this;
  }

  /**
   *
   * @param bool value
   * @return this
   */
  public withAllowPartialAuth(value: boolean) {
    this.allowPartialAuth = value;
    return this;
  }
}
