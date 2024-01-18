import {
  CurrencyType,
  IPaymentMethod,
  ITerminalResponse,
  PaymentMethod,
  PaymentMethodType,
  ServicesContainer,
  TransactionModifier,
  TransactionReference,
  TransactionType,
} from "../../../src";
import { TerminalBuilder } from "./TerminalBuilder";

export class TerminalManageBuilder extends TerminalBuilder {
  public amount: number;

  public currency: CurrencyType;

  public gratuity: number;

  public transactionId: string;

  public terminalRefNumber?: string;

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

    return client.manageTransaction(this);
  }

  public withAmount(amount: number) {
    this.amount = amount;
    return this;
  }

  public withCurrency(value: CurrencyType) {
    this.currency = value;
    return this;
  }

  public withGratuity(gratuity: number) {
    this.gratuity = gratuity;
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

    this.transactionId = transactionId;

    return this;
  }

  public withPaymentMethod(paymentMethod?: IPaymentMethod) {
    if (paymentMethod !== undefined) {
      this.paymentMethod = paymentMethod as PaymentMethod;
    }
    return this;
  }

  public withTerminalRefNumber(terminalRefNumber: string) {
    this.terminalRefNumber = terminalRefNumber;
    return this;
  }

  public withClientTransactionId(clientTransactionId: string) {
    this.clientTransactionId = clientTransactionId;
    return this;
  }

  protected setupValidations() {
    this.validations
      .of("transactionType", TransactionType.Capture)
      .with("transactionModifier", TransactionModifier.None)
      .check("amount")
      .isNotNull()
      .check("transactionId")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.Void)
      .with("transactionModifier", TransactionModifier.None)
      .check("transactionId")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.Refund)
      .check("transactionId")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.Auth)
      .with("transactionModifier", TransactionModifier.Incremental)
      .check("transactionId")
      .isNotNull();
  }
}
