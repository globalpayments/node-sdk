import {
  Address,
  CreditCardData,
  CurrencyType,
  IPaymentMethod,
  ITerminalResponse,
  Lodging,
  PaymentMethod,
  PaymentMethodType,
  ServicesContainer,
  StoredCredentialInitiator,
  TaxType,
  TransactionModifier,
  TransactionReference,
  TransactionType,
} from "../../../src";
import { AcquisitionType } from "../../Entities/Enums/AcquisitionType";
import { TerminalBuilder } from "./TerminalBuilder";

export class TerminalAuthBuilder extends TerminalBuilder {
  public address?: Address;

  public allowDuplicates?: boolean;

  public amount?: number;

  public authCode?: string;

  public cashBackAmount?: number;

  public lodging?: Lodging;

  public currency?: CurrencyType;

  public customerCode?: string;

  public gratuity?: number;

  public invoiceNumber?: string;

  public poNumber?: string;

  public requestMultiUseToken?: boolean;

  public signatureCapture?: boolean;

  public taxAmount?: number;

  public taxExempt?: string;

  public taxExemptId?: string;

  public transactionId?: string;

  public shiftId?: string;

  public taxType?: TaxType;

  public terminalRefNumber?: string;

  public lineItemLeft?: string;

  public lineItemRight?: string;

  public cardOnFileIndicator?: StoredCredentialInitiator;

  public cardBrandTransId?: string;

  public preAuthAmount?: number;

  public cardAcquisition?: AcquisitionType;

  public acquisitionTypes?: AcquisitionType[];

  public timeout?: number;

  public transactionDate?: Date;

  public shippingDate?: Date;

  public merchantDecision?: string;

  public language?: string;

  public processCPC?: boolean;

  public allowPartialAuth?: boolean;

  public transactionInitiator?: StoredCredentialInitiator;

  public isQuickChip?: boolean;

  public hasCheckLuhn?: boolean;

  public hasSecurityCode?: boolean;

  public lineItems?: Array<{ leftText: string; rightText?: string }>;

  public cardBrandTransactionId?: string;

  public directMktInvoiceNbr?: string;

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

  public withPreAuthAmount(preAuthAmount?: number) {
    this.preAuthAmount = preAuthAmount;
    return this;
  }

  public withCashBack(amount: number) {
    this.cashBackAmount = amount;
    return this;
  }

  public withLodging(lodging: Lodging) {
    this.lodging = lodging;
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

  public withAuthCode(value: string) {
    if (
      this.paymentMethod == null ||
      !(this.paymentMethod instanceof TransactionReference)
    ) {
      this.paymentMethod = new TransactionReference();
    }
    (this.paymentMethod as TransactionReference).authCode = value;
    return this;
  }

  public withPaymentMethod(paymentMethod?: IPaymentMethod) {
    if (paymentMethod !== undefined) {
      this.paymentMethod = paymentMethod as PaymentMethod;
    }
    return this;
  }

  public withCardBrandStorage(transactionInitiator: StoredCredentialInitiator) {
    this.transactionInitiator = transactionInitiator;
    this.cardOnFileIndicator = transactionInitiator;
    return this;
  }

  public withCardOnFileIndicator(value: StoredCredentialInitiator) {
    this.transactionInitiator = value;
    this.cardOnFileIndicator = value;
    return this;
  }

  public withDirectMktInvoiceNbr(value: string) {
    this.directMktInvoiceNbr = value;
    return this;
  }
  public withCardBrandTransId(value: string) {
    this.cardBrandTransId = value;
    return this;
  }

  public withTerminalRefNumber(terminalRefNumber: string) {
    this.terminalRefNumber = terminalRefNumber;
    return this;
  }

  public withLineItemLeft(lineItemLeft: string) {
    this.lineItemLeft = lineItemLeft;
    return this;
  }

  public withLineItemRight(lineItemRight: string) {
    this.lineItemRight = lineItemRight;
    return this;
  }

  public withCardAcquisition(cardAcquisition: AcquisitionType) {
    this.cardAcquisition = cardAcquisition;
    return this;
  }

  public withAcquisitionTypes(acquisitionTypes: AcquisitionType[]) {
    this.acquisitionTypes = acquisitionTypes;
    return this;
  }

  public withTransactionDate(transactionDate: Date) {
    this.transactionDate = transactionDate;
    return this;
  }

  public withShippingDate(shippingDate: Date) {
    this.shippingDate = shippingDate;
    return this;
  }

  public withTimeout(timeout: number) {
    this.timeout = timeout;
    return this;
  }

  public withMerchantDecision(merchantDecision: string) {
    this.merchantDecision = merchantDecision;
    return this;
  }

  public withLanguage(language: string) {
    this.language = language;
    return this;
  }

  public withProcessCPC(processCPC: boolean) {
    this.processCPC = processCPC;
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
      .when("paymentMethod.transactionId")
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

  public withQuickChip(value: boolean) {
    this.isQuickChip = value;
    return this;
  }

  public withCheckLuhn(value: boolean) {
    this.hasCheckLuhn = value;
    return this;
  }

  public withSecurityCode(value: boolean) {
    this.hasSecurityCode = value;
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

  public withLineItems(
    lineItems: Array<{ leftText: string; rightText?: string }>,
  ) {
    this.lineItems = lineItems;
    return this;
  }

  public withCardBrandTransactionId(cardBrandTransactionId: string) {
    this.cardBrandTransactionId = cardBrandTransactionId;
    this.cardBrandTransId = cardBrandTransactionId;
    return this;
  }
}
