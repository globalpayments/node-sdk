import {
  CData as cData,
  Element,
  Element as element,
  ElementTree,
  SubElement as subElement,
  XML as xml,
} from "@azz/elementtree";

import {
  ApiError,
  AuthorizationBuilder,
  BuilderError,
  CreditCardData,
  Customer,
  FraudFilterMode,
  GatewayError,
  GenerationUtils,
  HostedPaymentConfig,
  HppVersion,
  IPaymentMethod,
  IRecurringEntity,
  IRecurringService,
  ManagementBuilder,
  PaymentMethodType,
  RecurringBuilder,
  RecurringPaymentMethod,
  ReportBuilder,
  Schedule,
  StringUtils,
  Transaction,
  TransactionModifier,
  TransactionReference,
  TransactionType,
  UnsupportedTransactionError,
} from "../";
import { XmlGateway } from "./XmlGateway";

export class RealexConnector extends XmlGateway implements IRecurringService {
  public merchantId: string;
  public accountId: string;
  public sharedSecret: string;
  public channel: string;
  public rebatePassword: string;
  public refundPassword: string;
  public supportsHostedPayments = true;
  public supportsRetrieval = false;
  public supportsUpdatePaymentDetails = true;
  public hostedPaymentConfig: HostedPaymentConfig;

  public processAuthorization(
    builder: AuthorizationBuilder,
  ): Promise<Transaction> {
    const timestamp = GenerationUtils.generateTimestamp();
    const orderId = builder.orderId
      ? builder.orderId
      : GenerationUtils.generateOrderId();

    // build Request
    const request = element("request", {
      timestamp,
      type: this.mapAuthRequestType(builder),
    });

    if (this.merchantId) {
      subElement(request, "merchantid").append(cData(this.merchantId));
    }

    if (this.accountId) {
      subElement(request, "account").append(cData(this.accountId));
    }

    if (this.channel) {
      subElement(request, "channel").append(cData(this.channel));
    }

    subElement(request, "orderid").append(cData(orderId));

    if (builder.amount) {
      const amountAttrs = builder.currency
        ? { currency: builder.currency }
        : {};
      subElement(request, "amount", amountAttrs).append(
        cData(this.numberFormat(builder.amount)),
      );
    }

    // hydrate the payment data fields
    if (builder.paymentMethod instanceof CreditCardData) {
      const card = builder.paymentMethod;

      if (builder.transactionModifier === TransactionModifier.EncryptedMobile) {
        subElement(request, "token").append(cData(card.token));
        subElement(request, "mobile").append(cData(card.mobileType));
      } else {
        const cardElement = subElement(request, "card");
        subElement(cardElement, "number").append(cData(card.number));
        const date =
          StringUtils.leftPad(card.expMonth, 2, "0") +
          StringUtils.leftPad((card.expYear || "").substr(2, 2), 2, "0");
        subElement(cardElement, "expdate").append(cData(date));
        subElement(cardElement, "type").append(
          cData(card.getCardType().toUpperCase()),
        );
        subElement(cardElement, "chname").append(cData(card.cardHolderName));

        if (card.cvn) {
          const cvnElement = subElement(cardElement, "cvn");
          subElement(cvnElement, "number").append(cData(card.cvn));
          subElement(cvnElement, "presind").append(
            cData(card.cvnPresenceIndicator.toString()),
          );
        }
        // issueno
      }

      const isVerify = builder.transactionType === TransactionType.Verify;
      subElement(request, "sha1hash").append(
        cData(
          this.generateHash(
            timestamp,
            orderId,
            builder.amount ? this.numberFormat(builder.amount) : "",
            builder.currency,
            builder.transactionModifier === TransactionModifier.EncryptedMobile
              ? card.token
              : card.number,
            isVerify,
          ),
        ),
      );
    }

    if (builder.paymentMethod instanceof RecurringPaymentMethod) {
      const recurring = builder.paymentMethod;

      subElement(request, "payerref").append(cData(recurring.customerKey));
      subElement(request, "paymentmethod").append(
        cData(recurring.key || recurring.id),
      );

      if (builder.cvn) {
        const paymentData = subElement(request, "paymentdata");
        const cvn = subElement(paymentData, "cvn");
        subElement(cvn, "number").append(cData(builder.cvn));
      }

      const isVerify = builder.transactionType === TransactionType.Verify;
      subElement(request, "sha1hash").append(
        cData(
          this.generateHash(
            timestamp,
            orderId,
            builder.amount ? this.numberFormat(builder.amount) : "",
            builder.currency,
            recurring.customerKey,
            isVerify,
          ),
        ),
      );
    }

    // refund hash
    if (builder.transactionType === TransactionType.Refund) {
      subElement(request, "refundhash").append(
        cData(GenerationUtils.generateHash(this.refundPassword) || ""),
      );
    }

    // this needs to be figured out based on txn type and set to 0, 1 or MULTI
    if (
      builder.transactionType === TransactionType.Sale ||
      builder.transactionType === TransactionType.Auth
    ) {
      const autoSettle =
        builder.transactionType === TransactionType.Sale ? "1" : "0";
      subElement(request, "autosettle", { flag: autoSettle });
    }

    if (builder.description) {
      const comments = subElement(request, "comments");
      subElement(comments, "comment", { id: 1 }).append(
        cData(builder.description),
      );
    }

    if (
      builder.customerId ||
      builder.productId ||
      builder.customerIpAddress ||
      builder.clientTransactionId
    ) {
      const tssInfo = subElement(request, "tssinfo");
      subElement(tssInfo, "custnum").append(cData(builder.customerId));
      subElement(tssInfo, "prodid").append(cData(builder.productId));
      subElement(tssInfo, "varref").append(cData(builder.clientTransactionId));
      subElement(tssInfo, "custipaddress").append(
        cData(builder.customerIpAddress),
      );
    }

    if (builder.ecommerceInfo) {
      const mpi = subElement(request, "mpi");
      subElement(mpi, "cavv").append(cData(builder.ecommerceInfo.cavv));
      subElement(mpi, "xid").append(cData(builder.ecommerceInfo.xid));
      subElement(mpi, "eci").append(cData(builder.ecommerceInfo.eci));
    }

    return this.doTransaction(this.buildEnvelope(request)).then((response) =>
      this.mapResponse(response),
    );
  }

  public serializeRequest(builder: AuthorizationBuilder): string {
    if (!this.hostedPaymentConfig) {
      throw new ApiError(
        "Hosted configuration missing. Please check your configuration",
      );
    }

    const encoder =
      this.hostedPaymentConfig.version === HppVersion.Version2
        ? (t: string) => t
        : StringUtils.btoa;
    const request: any = {};

    const orderId = builder.orderId || GenerationUtils.generateOrderId();
    const timestamp = builder.timestamp || GenerationUtils.generateTimestamp();

    if (
      builder.transactionType !== TransactionType.Sale &&
      builder.transactionType !== TransactionType.Auth &&
      builder.transactionType !== TransactionType.Verify
    ) {
      throw new UnsupportedTransactionError();
    }

    request.MERCHANT_ID = encoder(this.merchantId || "");
    request.ACCOUNT = encoder(this.accountId || "");
    request.CHANNEL = encoder(this.channel || "");
    request.ORDER_ID = encoder(orderId || "");
    if (builder.amount) {
      request.AMOUNT = encoder(this.numberFormat(builder.amount) || "");
    }
    request.CURRENCY = encoder(builder.currency || "");
    request.TIMESTAMP = encoder(timestamp || "");
    request.AUTO_SETTLE_FLAG = encoder(
      builder.transactionType === TransactionType.Sale ? "1" : "0" || "",
    );
    request.COMMENT1 = encoder(builder.Description || "");
    // request.COMMENT2 = encoder( || "");
    if (this.hostedPaymentConfig.requestTransactionStabilityScore) {
      request.RETURN_TSS = encoder(
        this.hostedPaymentConfig.requestTransactionStabilityScore
          ? "1"
          : "0" || "",
      );
    }
    if (this.hostedPaymentConfig.directCurrencyConversionEnabled) {
      request.DCC_ENABLE = encoder(
        this.hostedPaymentConfig.directCurrencyConversionEnabled
          ? "1"
          : "0" || "",
      );
    }
    if (builder.hostedPaymentData) {
      request.CUST_NUM = encoder(
        builder.hostedPaymentData.customerNumber || "",
      );
      if (
        this.hostedPaymentConfig.displaySavedCards &&
        builder.hostedPaymentData.customerKey
      ) {
        request.HPP_SELECT_STORED_CARD = encoder(
          builder.hostedPaymentData.customerKey || "",
        );
      }
      if (builder.hostedPaymentData.offerToSaveCard) {
        request.OFFER_SAVE_CARD = encoder(
          builder.hostedPaymentData.offerToSaveCard ? "1" : "0" || "",
        );
      }
      if (builder.hostedPaymentData.customerExists) {
        request.PAYER_EXIST = encoder(
          builder.hostedPaymentData.customerExists ? "1" : "0" || "",
        );
      }
      request.PAYER_REF = encoder(builder.hostedPaymentData.customerKey || "");
      request.PMT_REF = encoder(builder.hostedPaymentData.paymentKey || "");
      request.PROD_ID = encoder(builder.hostedPaymentData.productId || "");
    }
    if (builder.shippingAddress) {
      request.SHIPPING_CODE = encoder(builder.shippingAddress.postalCode || "");
      request.SHIPPING_CO = encoder(builder.shippingAddress.country || "");
    }
    if (builder.sillingAddress) {
      request.BILLING_CODE = encoder(builder.billingAddress.postalCode || "");
      request.BILLING_CO = encoder(builder.billingAddress.country || "");
    }
    request.CUST_NUM = encoder(builder.customerId || "");
    request.VAR_REF = encoder(builder.clientTransactionId || "");
    request.HPP_LANG = encoder(this.hostedPaymentConfig.language || "");
    request.MERCHANT_RESPONSE_URL = encoder(
      this.hostedPaymentConfig.responseUrl || "",
    );
    request.CARD_PAYMENT_BUTTON = encoder(
      this.hostedPaymentConfig.paymentButtonText || "",
    );
    if (this.hostedPaymentConfig.cardStorageEnabled) {
      request.CARD_STORAGE_ENABLE = encoder(
        this.hostedPaymentConfig.cardStorageEnabled ? "1" : "0" || "",
      );
    }
    if (builder.transactionType === TransactionType.Verify) {
      request.VALIDATE_CARD_ONLY = encoder("1" || "");
    }
    if (this.hostedPaymentConfig.fraudFilterMode) {
      request.HPP_FRAUD_FILTER_MODE = encoder(
        this.hostedPaymentConfig.fraudFilterMode.toString() || "",
      );
    }
    if (builder.recurringType || builder.recurringSequence) {
      if (builder.recurringType) {
        request.RECURRING_TYPE = encoder(
          builder.recurringType.toString().toLowerCase() || "",
        );
      }
      if (builder.recurringSequence) {
        request.RECURRING_SEQUENCE = encoder(
          builder.recurringSequence.toString().toLowerCase() || "",
        );
      }
    }
    if (this.hostedPaymentConfig.version) {
      request.HPP_VERSION = encoder(
        this.hostedPaymentConfig.version.toString() || "",
      );
    }

    const toHash = [
      timestamp,
      this.merchantId,
      orderId,
      builder.amount ? this.numberFormat(builder.amount) : null,
      builder.currency,
    ];

    if (
      this.hostedPaymentConfig.cardStorageEnabled ||
      (builder.hostedPaymentData && builder.hostedPaymentData.offerToSaveCard)
    ) {
      toHash.push(
        builder.hostedPaymentData.customerKey
          ? builder.hostedPaymentData.customerKey
          : null,
      );
      toHash.push(
        builder.hostedPaymentData.paymentKey
          ? builder.hostedPaymentData.paymentKey
          : null,
      );
    }

    if (
      this.hostedPaymentConfig.fraudFilterMode &&
      this.hostedPaymentConfig.fraudFilterMode !== FraudFilterMode.None
    ) {
      toHash.push(this.hostedPaymentConfig.fraudFilterMode.toString());
    }

    request.SHA1HASH = encoder(
      GenerationUtils.generateHash(toHash.join("."), this.sharedSecret) || "",
    );

    return JSON.stringify(request);
  }

  public manageTransaction(builder: ManagementBuilder): Promise<Transaction> {
    const timestamp = GenerationUtils.generateTimestamp();
    const orderId = builder.orderId || GenerationUtils.generateOrderId();

    // build Request
    const request = element("request", {
      timestamp,
      type: this.mapManageRequestType(builder.transactionType),
    });

    if (this.merchantId) {
      subElement(request, "merchantid").append(cData(this.merchantId));
    }

    if (this.accountId) {
      subElement(request, "account").append(cData(this.accountId));
    }

    if (this.channel) {
      subElement(request, "channel").append(cData(this.channel));
    }

    subElement(request, "orderid").append(cData(orderId));

    if (builder.paymentMethod) {
      const ref = (builder.paymentMethod as IPaymentMethod) as TransactionReference;
      subElement(request, "pasref").append(cData(ref.transactionId));
    }

    if (builder.amount) {
      const amountAttrs = builder.currency
        ? { currency: builder.currency }
        : {};
      subElement(request, "amount", amountAttrs).append(
        cData(this.numberFormat(builder.amount)),
      );
    } else if (builder.transactionType === TransactionType.Capture) {
      throw new BuilderError("Amount cannot be null for capture");
    }

    if (builder.transactionType === TransactionType.Refund) {
      if (builder.authorizationCode) {
        subElement(request, "authcode").append(
          cData(builder.authorizationCode),
        );
      }
      subElement(request, "refundhash").append(
        cData(GenerationUtils.generateHash(this.rebatePassword)),
      );
    }

    if (builder.reasonCode) {
      subElement(request, "reasoncode").append(
        cData(builder.reasonCode.toString()),
      );
    }

    if (builder.description) {
      const comments = subElement(request, "comments");
      subElement(comments, "comment", { id: 1 }).append(
        cData(builder.description),
      );
    }

    subElement(request, "sha1hash").append(
      cData(
        this.generateHash(
          timestamp,
          orderId,
          builder.amount ? this.numberFormat(builder.amount) : "",
          builder.currency,
          "",
        ),
      ),
    );

    return this.doTransaction(this.buildEnvelope(request)).then((response) =>
      this.mapResponse(response),
    );
  }

  public processReport<T>(_builder: ReportBuilder<T>): Promise<T> {
    throw new UnsupportedTransactionError(
      "Reporting functionality is not supported through this gateway.",
    );
  }

  public processRecurring<T extends IRecurringEntity>(
    builder: RecurringBuilder<T>,
  ): Promise<T> {
    const timestamp = GenerationUtils.generateTimestamp();
    const orderId = builder.orderId || GenerationUtils.generateOrderId();

    // build Request
    const request = element("request", {
      timestamp,
      type: this.mapRecurringRequestType(builder),
    });

    if (this.merchantId) {
      subElement(request, "merchantid").append(cData(this.merchantId));
    }

    if (this.accountId) {
      subElement(request, "account").append(cData(this.accountId));
    }

    subElement(request, "orderid").append(cData(orderId));

    if (
      builder.transactionType === TransactionType.Create ||
      builder.transactionType === TransactionType.Edit
    ) {
      if (builder.entity instanceof Customer) {
        const customer = builder.entity;
        request.append(this.buildCustomer(customer));
        subElement(request, "sha1hash").append(
          cData(
            GenerationUtils.generateHash(
              [timestamp, this.merchantId, orderId, "", "", customer.key].join(
                ".",
              ),
              this.sharedSecret,
            ),
          ),
        );
      } else if (builder.entity instanceof RecurringPaymentMethod) {
        const payment = builder.entity;
        const cardElement = subElement(request, "card");
        subElement(cardElement, "ref").append(cData(payment.key || payment.id));
        subElement(cardElement, "payerref").append(cData(payment.customerKey));

        if (payment.paymentMethod) {
          const card = payment.paymentMethod as CreditCardData;
          const expiry =
            StringUtils.leftPad(card.expMonth, 2, "0") +
            StringUtils.leftPad((card.expYear || "").substr(2, 2), 2, "0");
          subElement(cardElement, "number").append(cData(card.number));
          subElement(cardElement, "expdate").append(cData(expiry));
          subElement(cardElement, "chname").append(cData(card.cardHolderName));
          subElement(cardElement, "type").append(cData(card.getCardType()));

          let sha1hash = "";
          if (builder.transactionType === TransactionType.Create) {
            sha1hash = GenerationUtils.generateHash(
              [
                timestamp,
                this.merchantId,
                orderId,
                "",
                "",
                payment.customerKey,
                card.cardHolderName,
                card.number,
              ].join("."),
              this.sharedSecret,
            );
          } else {
            sha1hash = GenerationUtils.generateHash(
              [
                timestamp,
                this.merchantId,
                payment.customerKey,
                payment.key || payment.id,
                expiry,
                card.number,
              ].join("."),
              this.sharedSecret,
            );
          }
          subElement(request, "sha1hash").append(cData(sha1hash));
        }
      }
    } else if (builder.transactionType === TransactionType.Delete) {
      if (builder.entity instanceof RecurringPaymentMethod) {
        const payment = builder.entity;
        const cardElement = subElement(request, "card");
        subElement(cardElement, "ref").append(cData(payment.key || payment.id));
        subElement(cardElement, "payerref").append(cData(payment.customerKey));
      }
    }

    return this.doTransaction(this.buildEnvelope(request)).then((response) =>
      this.mapRecurringResponse<T>(response, builder),
    );
  }

  protected buildEnvelope(transaction: Element): string {
    return new ElementTree(transaction).write();
  }

  protected buildCustomer(customer: Customer) {
    const payer = element("payer", {
      ref: customer.key || StringUtils.uuid(),
      type: "Retail",
    });
    subElement(payer, "title").append(cData(customer.title));
    subElement(payer, "firstname").append(cData(customer.firstName));
    subElement(payer, "surname").append(cData(customer.lastName));
    subElement(payer, "company").append(cData(customer.company));

    if (customer.address) {
      const address = subElement(payer, "address");
      subElement(address, "line1").append(
        cData(customer.address.streetAddress1),
      );
      subElement(address, "line2").append(
        cData(customer.address.streetAddress2),
      );
      subElement(address, "line3").append(
        cData(customer.address.streetAddress3),
      );
      subElement(address, "city").append(cData(customer.address.city));
      subElement(address, "county").append(cData(customer.address.province));
      subElement(address, "postcode").append(
        cData(customer.address.postalCode),
      );
      if (customer.address.country) {
        subElement(address, "country", { code: "GB" }).append(
          cData(customer.address.country),
        );
      }
    }

    const phone = subElement(payer, "phonenumbers");
    subElement(phone, "home").append(cData(customer.homePhone));
    subElement(phone, "work").append(cData(customer.workPhone));
    subElement(phone, "fax").append(cData(customer.fax));
    subElement(phone, "mobile").append(cData(customer.mobilePhone));

    subElement(payer, "email").append(cData(customer.email));

    return payer;
  }

  protected mapResponse(rawResponse: string) {
    const result = new Transaction();
    const root = xml(rawResponse);

    this.checkResponse(root);

    result.responseCode = root.findtext(".//result");
    result.responseMessage = root.findtext(".//message");
    result.cvnResponseCode = root.findtext(".//cvnresult");
    result.avsResponseCode = root.findtext(".//avspostcoderesponse");
    result.timestamp = root.findtext(".//timestamp");
    result.transactionReference = new TransactionReference();
    result.transactionReference.authCode = root.findtext(".//authcode");
    result.transactionReference.orderId = root.findtext(".//orderid");
    result.transactionReference.paymentMethodType = PaymentMethodType.Credit;
    result.transactionReference.transactionId = root.findtext(".//pasref");

    return result;
  }

  protected mapRecurringResponse<T extends IRecurringEntity>(
    rawResponse: string,
    builder: RecurringBuilder<T>,
  ) {
    const root = xml(rawResponse);

    this.checkResponse(root);
    return builder.entity as T;
  }

  protected checkResponse(root: Element, acceptedCodes?: string[]) {
    if (!acceptedCodes) {
      acceptedCodes = ["00"];
    }

    const responseCode = root.findtext(".//result");
    const responseMessage = root.findtext(".//message");

    if (acceptedCodes.indexOf(responseCode) === -1) {
      throw new GatewayError(
        `Unexpected Gateway Response: ${responseCode} - ${responseMessage}`,
        responseCode,
        responseMessage,
      );
    }
  }

  protected generateHash(
    timestamp: string,
    orderId: string,
    amount: string,
    currency: string,
    paymentData: string,
    verify = false,
  ): string {
    const data = [timestamp, this.merchantId, orderId];

    if (false === verify) {
      data.push(amount);
      data.push(currency);
    }

    data.push(paymentData);

    return GenerationUtils.generateHash(data.join("."), this.sharedSecret);
  }

  protected mapAuthRequestType(builder: AuthorizationBuilder): string {
    switch (builder.transactionType) {
      case TransactionType.Sale:
      case TransactionType.Auth:
        if (
          builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit
        ) {
          if (builder.transactionModifier === TransactionModifier.Offline) {
            return "offline";
          }
          if (
            builder.transactionModifier === TransactionModifier.EncryptedMobile
          ) {
            return "auth-mobile";
          }
          return "auth";
        }
        return "receipt-in";
      case TransactionType.Capture:
        return "settle";
      case TransactionType.Verify:
        if (
          builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit
        ) {
          return "otb";
        }
        return "receipt-in-otb";
      case TransactionType.Refund:
        if (
          builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit
        ) {
          return "credit";
        }
        return "payment-out";
      case TransactionType.Reversal:
      default:
        throw new UnsupportedTransactionError(
          "The selected gateway does not support this transaction type.",
        );
    }
  }

  protected mapManageRequestType(type: TransactionType): string {
    switch (type) {
      case TransactionType.Capture:
        return "settle";
      case TransactionType.Hold:
        return "hold";
      case TransactionType.Refund:
        return "rebate";
      case TransactionType.Release:
        return "release";
      case TransactionType.Void:
      case TransactionType.Reversal:
        return "void";
      default:
        return "unknown";
    }
  }

  protected mapRecurringRequestType<T extends IRecurringEntity>(
    builder: RecurringBuilder<T>,
  ) {
    const entity = builder.entity;
    switch (builder.transactionType) {
      case TransactionType.Create:
        if (entity instanceof Customer) {
          return "payer-new";
        }
        if (entity instanceof Schedule) {
          throw new UnsupportedTransactionError();
        }
        return "card-new";
      case TransactionType.Edit:
        if (entity instanceof Customer) {
          return "payer-edit";
        }
        if (entity instanceof Schedule) {
          throw new UnsupportedTransactionError();
        }
        return "card-update-card";
      case TransactionType.Delete:
        if (entity instanceof Customer || entity instanceof Schedule) {
          throw new UnsupportedTransactionError();
        }
        return "card-cancel-card";
      default:
        throw new UnsupportedTransactionError();
    }
  }

  protected numberFormat(amount: number | string) {
    const f = parseFloat(amount.toString());
    return (parseFloat(f.toFixed(2)) * 100).toString();
  }
}
