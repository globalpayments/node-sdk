import {
  DisputeDocument,
  LodgingData,
  PaymentMethod,
  PaymentMethodUsageMode,
  ReasonCode,
  ServicesContainer,
  StoredCredentialSequence,
  TaxType,
  Transaction,
  TransactionModifier,
  TransactionReference,
  TransactionType,
} from "../";
import { TransactionBuilder } from "./TransactionBuilder";

export class ManagementBuilder extends TransactionBuilder<Transaction> {
  public amount: string | number | null;
  public authAmount: string | number;
  public get authorizationCode() {
    if (this.paymentMethod instanceof TransactionReference) {
      return this.paymentMethod.authCode;
    }
    return undefined;
  }
  public get clientTransactionId() {
    if (this.paymentMethod instanceof TransactionReference) {
      return this.paymentMethod.clientTransactionId;
    }
    return undefined;
  }
  public currency: string;
  public description: string;
  public gratuity: string | number | null;
  public lodgingData: LodgingData;
  public get orderId() {
    if (this.paymentMethod instanceof TransactionReference) {
      return this.paymentMethod.orderId;
    }
    return undefined;
  }
  public poNumber: string;
  public reasonCode?: ReasonCode;
  public taxAmount: string | number;
  public taxType: TaxType;
  public get transactionId() {
    if (this.paymentMethod instanceof TransactionReference) {
      return this.paymentMethod.transactionId;
    }
    return undefined;
  }

  public constructor(type: number, paymentMethod?: PaymentMethod) {
    super(type, paymentMethod);
    this.supplementaryData = {};
  }

  /**
   * Executes the builder against the gateway.
   *
   * @returns Promise<Transaction>
   */
  public execute(configName: string = "default"): Promise<Transaction> {
    super.execute();
    return ServicesContainer.instance()
      .getClient(configName)
      .manageTransaction(this);
  }

  protected setupValidations() {
    this.validations
      .of(
        "transactionType",
        /* tslint:disable:trailing-comma */
        TransactionType.Capture |
          TransactionType.Edit |
          TransactionType.Hold |
          TransactionType.Release,
        /* tslint:enable:trailing-comma */
      )
      .check("transactionId")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.Edit)
      .with("transactionModifier", TransactionModifier.LevelII)
      .check("taxType")
      .isNotNull();

    this.validations
      .of("transactionType", TransactionType.Refund)
      .when("amount")
      .isNotNull()
      .check("currency")
      .isNotNull();
  }

  /**
   * Sets the current transaction's amount.
   *
   * @param amount The amount
   * @returns ManagementBuilder
   */
  public withAmount(amount?: string | number | null) {
    if (amount !== undefined) {
      this.amount = amount;
    }
    return this;
  }

  /**
   * Sets the current transaction's authorized amount; where applicable.
   *
   * @param amount The authorized amount
   * @returns ManagementBuilder
   */
  public withAuthAmount(amount?: string | number) {
    if (amount !== undefined) {
      this.authAmount = amount;
    }
    return this;
  }

  /**
   * Sets the currency.
   *
   * The formatting for the supplied value will currently depend on
   * the configured gateway's requirements.
   *
   * @param currency The currency
   * @returns ManagementBuilder
   */
  public withCurrency(currency?: string) {
    if (currency !== undefined) {
      this.currency = currency;
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
   * @returns ManagementBuilder
   */
  public withDescription(description?: string) {
    if (description !== undefined) {
      this.description = description;
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
   * @returns ManagementBuilder
   */
  public withGratuity(gratuity: string | number | null = null) {
    if (gratuity !== undefined) {
      this.gratuity = gratuity;
    }
    return this;
  }

  /**
   * Sets the purchase order number; where applicable.
   *
   * @param poNumber The PO number
   * @returns ManagementBuilder
   */
  public withPoNumber(poNumber?: string) {
    this.transactionModifier = TransactionModifier.LevelII;
    if (poNumber !== undefined) {
      this.poNumber = poNumber;
    }
    return this;
  }

  /**
   * Sets the reason code for the transaction.
   *
   * @param reasonCode The reason code
   * @returns ManagementBuilder
   */
  public withReasonCode(reasonCode?: ReasonCode) {
    if (reasonCode !== undefined) {
      this.reasonCode = reasonCode;
    }
    return this;
  }

  /**
   * Sets the tax amount.
   *
   * Useful for commercial purchase card requests.
   *
   * @see AuthorizationBuilder.WithCommercialRequest
   * @param amount The tax amount
   * @returns ManagementBuilder
   */
  public withTaxAmount(amount?: string | number) {
    this.transactionModifier = TransactionModifier.LevelII;
    if (amount !== undefined) {
      this.taxAmount = amount;
    }
    return this;
  }

  /**
   * Sets the tax type.
   *
   * Useful for commercial purchase card requests.
   *
   * @see AuthorizationBuilder.withCommercialRequest
   * @param type The tax type
   * @returns ManagementBuilder
   */
  public withTaxType(type?: TaxType) {
    this.transactionModifier = TransactionModifier.LevelII;
    if (type !== undefined) {
      this.taxType = type;
    }
    return this;
  }

  public withDynamicDescriptor(dynamicDescriptor: string) {
    this.dynamicDescriptor = dynamicDescriptor;

    return this;
  }

  /**
   * Sets the idempotency key
   *
   * @param idempotencyKey string
   * @returns {this}
   */
  public withIdempotencyKey(idempotencyKey: string) {
    this.idempotencyKey = idempotencyKey;

    return this;
  }

  /**
   * Sets the idempotency key
   *
   * @param idempotencyKey string
   * @returns {this}
   */
  public withPaymentMethodUsageMode(
    paymentMethodUsageMode: PaymentMethodUsageMode,
  ) {
    this.paymentMethodUsageMode = paymentMethodUsageMode;

    return this;
  }

  public withMultiCapture(
    sequence: StoredCredentialSequence = StoredCredentialSequence.FIRST,
    paymentCount: number = 1,
  ) {
    this.multiCapture = true;
    this.multiCaptureSequence = sequence;
    this.multiCapturePaymentCount = paymentCount;

    return this;
  }

  public withTagData(tagData: string) {
    this.tagData = tagData;
    return this;
  }

  public withLodgingData(value: LodgingData) {
    this.lodgingData = value;

    return this;
  }

  /**
   * Sets the Dispute Id.
   *
   * @param string value
   *
   * @return $this
   */
  public withDisputeId(value: string) {
    this.disputeId = value;
    return this;
  }

  /**
   * Sets the Dispute Documents.
   *
   * @param DisputeDocument[] $value
   *
   * @return $this
   */
  public withDisputeDocuments(value: DisputeDocument[]) {
    this.disputeDocuments = value;
    return this;
  }
}
