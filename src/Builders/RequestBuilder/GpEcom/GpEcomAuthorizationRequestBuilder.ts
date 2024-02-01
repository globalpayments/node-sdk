import {
  AuthorizationBuilder,
  BaseBuilder,
  CreditCardData,
  EncyptedMobileType,
  GenerationUtils,
  GpEcomConfig,
  GpEcomMapping,
  IRequestBuilder,
  ProtectSensitiveData,
  Request,
  StringUtils,
  Transaction,
  TransactionModifier,
  TransactionType,
} from "../../../../src";
import { GpEcomRequestBuilder } from "./GpEcomRequestBuilder";
import {
  CData as cData,
  Element as element,
  SubElement as subElement,
} from "@azz/elementtree";

export class GpEcomAuthorizationRequestBuilder
  extends GpEcomRequestBuilder
  implements IRequestBuilder
{
  private maskedValues: Record<string, string> = {};
  /***
   * @param AuthorizationBuilder builder
   *
   * @return bool
   */
  canProcess(builder: BaseBuilder<Transaction>): boolean {
    if (builder instanceof AuthorizationBuilder) {
      return true;
    }

    return false;
  }

  buildRequestFromJson(jsonRequest: string, config: GpEcomConfig): void {
    jsonRequest;
    config;
    // do nothing currently
  }

  /**
   * @param BaseBuilder builder
   * @param GpEcomConfig config
   * @return Request
   */
  buildRequest(builder: AuthorizationBuilder, config: GpEcomConfig): Request {
    if (
      !builder.transactionModifier &&
      builder.transactionModifier === TransactionModifier.EncryptedMobile &&
      builder.paymentMethod.mobileType === EncyptedMobileType.GooglePay &&
      (!builder.amount || !builder.currency)
    ) {
      throw new Error("Amount and Currency cannot be null for google payment");
    }

    const timestamp = builder.timestamp || GenerationUtils.generateTimestamp();
    const orderId = builder.orderId || GenerationUtils.generateOrderId();
    const transactionType = GpEcomMapping.mapAuthRequestType(builder);

    const request = element("request", {
      timestamp,
      type: transactionType,
    });

    if (config.merchantId) {
      subElement(request, "merchantid").append(cData(config.merchantId));
    }

    if (config.accountId !== null) {
      subElement(request, "account").append(cData(config.accountId));
    }

    if (config.channel) {
      subElement(request, "channel").append(cData(config.channel));
    }

    if (builder.amount) {
      const amountAttrs = builder.currency
        ? { currency: builder.currency }
        : {};
      subElement(request, "amount", amountAttrs).append(
        cData(this.numberFormat(builder.amount)),
      );
    }

    // refund hash
    if (builder.transactionType === TransactionType.Refund) {
      subElement(request, "refundhash").append(
        cData(GenerationUtils.generateHash(config.refundPassword) || ""),
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

    subElement(request, "orderid").append(cData(orderId));

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
        subElement(cardElement, "chname").append(cData(card.cardHolderName));
        this.maskedValues = {
          ...this.maskedValues,
          ...ProtectSensitiveData.hideValue(
            "card.expdate",
            card.getShortExpiry() || "",
          ),
        };

        subElement(cardElement, "type").append(
          cData(card.getCardType().toUpperCase()),
        );
        if (card.number) {
          this.maskedValues = {
            ...this.maskedValues,
            ...ProtectSensitiveData.hideValue("card.number", card.number, 4, 6),
          };
        }

        if (card.cvn) {
          const cvnElement = subElement(cardElement, "cvn");
          subElement(cvnElement, "number").append(cData(card.cvn));
          subElement(cvnElement, "presind").append(
            cData(card.cvnPresenceIndicator.toString()),
          );
          this.maskedValues = {
            ...this.maskedValues,
            ...ProtectSensitiveData.hideValue(
              "card.cvn.number",
              card.cvn || "",
            ),
          };
        }
        // issueno
      }

      const isVerify = builder.transactionType === TransactionType.Verify;
      subElement(request, "sha1hash").append(
        cData(
          this.generateHash(
            config,
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

    if (
      (builder.transactionType === TransactionType.Auth ||
        builder.transactionType === TransactionType.Capture ||
        builder.transactionType === TransactionType.Refund) &&
      builder.dynamicDescriptor
    ) {
      const narrative = subElement(request, "narrative");

      subElement(narrative, "chargedescription").append(
        cData(builder.dynamicDescriptor.toUpperCase()),
      );
    }

    if (Object.keys(builder.supplementaryData).length) {
      this.buildSupplementaryData(builder.supplementaryData, request);
    }

    Request.maskedValues = this.maskedValues;

    return new Request(config.serviceUrl, "POST", this.buildEnvelope(request));
  }
}
