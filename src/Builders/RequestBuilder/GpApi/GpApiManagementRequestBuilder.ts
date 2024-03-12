import {
  BaseBuilder,
  CreditCardData,
  GatewayError,
  GpApiRequest,
  IRequestBuilder,
  ManagementBuilder,
  ProtectSensitiveData,
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
    let payload: any = null;

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
        this.maskedValues = ProtectSensitiveData.hideValues({
          "card.expiry_year": card.expiry_year,
          "card.expiry_month": card.expiry_month,
        });
        payload = {
          usage_mode: builder.paymentMethodUsageMode || undefined,
          name: builderCard.cardHolderName || undefined,
          card: card,
        };
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
