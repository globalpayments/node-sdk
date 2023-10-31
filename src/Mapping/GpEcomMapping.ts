import { Element, XML as xml } from "@azz/elementtree";

import {
  BaseBuilder,
  ManagementBuilder,
  TransactionReference,
} from "../../src";
import {
  GatewayError,
  PaymentMethodType,
  Transaction,
  TransactionModifier,
  TransactionType,
  UnsupportedTransactionError,
} from "../../src/Entities";

export class GpEcomMapping {
  public static mapAuthRequestType(builder: BaseBuilder<Transaction>): string {
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
        throw new UnsupportedTransactionError(
          "The selected gateway does not support this transaction type.",
        );
      default:
        return "unknown";
    }
  }

  public static mapResponse(rawResponse: string, acceptedCodes: string[]) {
    const result = new Transaction();
    const root = xml(rawResponse);

    this.checkResponse(root, acceptedCodes);

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

  protected static checkResponse(root: Element, acceptedCodes?: string[]) {
    if (!acceptedCodes) {
      acceptedCodes = ["00"];
    }

    const responseCode = root.findtext(".//result");
    const responseMessage = root.findtext(".//message");

    if (acceptedCodes.indexOf(responseCode) === -1) {
      throw new GatewayError(
        `Unexpected Gateway Response: ${responseCode} - ${responseMessage}`,
        responseCode,
      );
    }
  }

  static mapManageRequestType(builder: ManagementBuilder) {
    switch (builder.transactionType) {
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
}
