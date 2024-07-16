import {
  BaseBuilder,
  CreditCardData,
  GatewayError,
  GpApiRequest,
  IRequestBuilder,
  ManagementBuilder,
  PaymentMethodType,
  ProtectSensitiveData,
  StringUtils,
  Transaction,
  TransactionType,
} from "../../../../src";
import { Card } from "../../../../src/Entities/GpApi/DTO";

export class GpApiManagementRequestBuilder implements IRequestBuilder {
  private maskedValues: Record<string, string> = {};

  public canProcess(builder: BaseBuilder<Transaction>): boolean {
    return builder instanceof ManagementBuilder;
  }

  buildRequest(builder: BaseBuilder<Transaction>): GpApiRequest {
    let payload: any = {};

    let endpoint: string = "";
    let verb: string = "";
    switch (builder.transactionType) {
      case TransactionType.TokenDelete:
        endpoint =
          GpApiRequest.PAYMENT_METHODS_ENDPOINT +
          "/" +
          (builder.paymentMethod?.token || "");
        verb = "DELETE";
        break;
      case TransactionType.TokenUpdate:
        if (!(builder.paymentMethod instanceof CreditCardData)) {
          throw new GatewayError("Payment method doesn't support this action!");
        }
        endpoint =
          GpApiRequest.PAYMENT_METHODS_ENDPOINT +
          "/" +
          builder.paymentMethod.token;

        verb = "PATCH";

        const card = new Card();
        const builderCard = builder.paymentMethod;

        card.expiry_month = builderCard.expMonth
          ? builderCard.expMonth.toString()
          : "";
        card.expiry_year = builderCard.expYear
          ? builderCard.expYear.toString().padStart(4, "0").substr(2, 2)
          : "";

        if (builderCard.number) {
          card.number = builderCard.number;
        }

        this.maskedValues = {
          ...this.maskedValues,
          ...ProtectSensitiveData.hideValue("card.number", card.number, 4, 6),
          ...ProtectSensitiveData.hideValues({
            "card.expiry_year": card.expiry_year,
            "card.expiry_month": card.expiry_month,
          }),
        };
        this.maskedValues = {
          ...this.maskedValues,
          ...ProtectSensitiveData.hideValues({
            "card.expiry_year": card.expiry_year,
            "card.expiry_month": card.expiry_month,
          }),
        };
        payload = {
          usage_mode: builder.paymentMethodUsageMode || undefined,
          name: builderCard.cardHolderName || undefined,
          card: card,
        };
        break;
      case TransactionType.Capture:
        endpoint =
          GpApiRequest.TRANSACTION_ENDPOINT +
          "/" +
          builder.paymentMethod.transactionId +
          "/capture";
        verb = "POST";
        payload = {
          amount: StringUtils.toNumeric(builder.amount),
          gratuity: builder.gratuity && StringUtils.toNumeric(builder.gratuity),
        };
        break;
      case TransactionType.DisputeAcceptance:
        endpoint =
          GpApiRequest.DISPUTES_ENDPOINT +
          "/" +
          builder.disputeId +
          "/acceptance";
        verb = "POST";
        break;
      case TransactionType.DisputeChallenge:
        endpoint =
          GpApiRequest.DISPUTES_ENDPOINT +
          "/" +
          builder.disputeId +
          "/challenge";
        verb = "POST";
        payload = {
          documents: builder.disputeDocuments,
        };
        break;
      case TransactionType.Refund:
        endpoint =
          GpApiRequest.TRANSACTION_ENDPOINT +
          "/" +
          builder.paymentMethod.transactionId +
          "/refund";
        verb = "POST";
        payload = {
          amount: StringUtils.toNumeric(builder.amount),
        };
        break;
      case TransactionType.Reversal:
        endpoint =
          GpApiRequest.TRANSACTION_ENDPOINT +
          "/" +
          builder.paymentMethod.transactionId +
          "/reversal";
        if (
          builder.paymentMethod.paymentMethodType ===
          PaymentMethodType.Account_Funds
        ) {
          if (builder.fundsData.merchantId) {
            endpoint =
              GpApiRequest.MERCHANT_MANAGEMENT_ENDPOINT +
              "/" +
              builder.fundsData.merchantId;
          }
        }
        verb = "POST";
        payload = {
          amount: StringUtils.toNumeric(builder.amount),
        };

        break;
      case TransactionType.Reauth:
        endpoint = `${GpApiRequest.TRANSACTION_ENDPOINT}/${builder.paymentMethod.transactionId}/reauthorization`;
        verb = "POST";
        payload.amount = StringUtils.toNumeric(builder.amount);

        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH) {
          payload.description = builder.description;
        }

        break;
      case TransactionType.Edit:
        endpoint = `${GpApiRequest.TRANSACTION_ENDPOINT}/${builder.paymentMethod.transactionId}/adjustment`;
        verb = "POST";
        if (builder.amount || builder.amount === 0) {
          payload.amount = StringUtils.toNumeric(builder.amount);
        }
        if (builder.gratuity || builder.gratuity === 0) {
          payload.gratuity_amount = StringUtils.toNumeric(builder.gratuity);
        }
        if (builder.tagData) {
          payload.payment_method = {
            card: {
              tag: builder.tagData,
            },
          };
        }

        break;
      case TransactionType.Auth:
        endpoint = `${GpApiRequest.TRANSACTION_ENDPOINT}/${builder.paymentMethod.transactionId}/incremental`;
        verb = "POST";
        if (builder.amount || builder.amount === 0) {
          payload.amount = StringUtils.toNumeric(builder.amount);
        }
        if (builder.lodgingData) {
          const lodging = builder.lodgingData;
          const lodgingItems = [];
          if (lodging.items && lodging.items.length > 0) {
            for (const item of lodging.items) {
              lodgingItems.push({
                types: item.types,
                reference: item.reference,
                total_amount: item.totalAmount
                  ? StringUtils.toNumeric(item.totalAmount)
                  : null,
                payment_method_program_codes: item.paymentMethodProgramCodes,
              });
            }
          }

          payload.lodging = {
            booking_reference: lodging.bookingReference,
            duration_days: lodging.durationDays,
            date_checked_in: lodging.checkedInDate
              ? new Date(lodging.checkedInDate).toISOString().split("T")[0]
              : null,
            date_checked_out: lodging.checkedOutDate
              ? new Date(lodging.checkedOutDate).toISOString().split("T")[0]
              : null,
            daily_rate_amount: lodging.dailyRateAmount
              ? StringUtils.toNumeric(lodging.dailyRateAmount)
              : null,
            "lodging.charge_items": lodgingItems || null,
          };
        }

        break;
    }

    GpApiRequest.maskedValues = this.maskedValues;

    return new GpApiRequest(endpoint, verb, JSON.stringify(payload));
  }

  buildRequestFromJson(jsonRequest: string): void {
    jsonRequest;
    // Implement buildRequestFromJson() method if needed
  }
}
