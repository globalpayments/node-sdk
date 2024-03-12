import { ParsedUrlQuery } from "querystring";
import {
  CreditCardData,
  GpApiConfig,
  GpApiRequest,
  IRequestBuilder,
  NotImplementedError,
  ReportBuilder,
  ReportType,
  TransactionSummary,
} from "../../../../src";

export class GpApiReportRequestBuilder implements IRequestBuilder {
  canProcess(builder: ReportBuilder<TransactionSummary>): boolean {
    return builder instanceof ReportBuilder;
  }

  buildRequest(
    builder: ReportBuilder<TransactionSummary>,
    config: GpApiConfig,
  ): GpApiRequest {
    let queryParams: ParsedUrlQuery = this.addBasicParams(builder);
    let payload: any;
    let endpoint: string;
    let verb: string;
    switch (builder.reportType) {
      case ReportType.FindStoredPaymentMethodsPaged:
        if (builder?.searchBuilder?.paymentMethod instanceof CreditCardData) {
          endpoint = `${GpApiRequest.PAYMENT_METHODS_ENDPOINT}/search`;
          verb = "POST";

          const paymentMethod = builder.searchBuilder?.paymentMethod;
          const card = {
            number: paymentMethod.number,
            expiry_month: paymentMethod.expMonth?.toString().padStart(2, "0"),
            expiry_year: paymentMethod.expYear
              ?.toString()
              .padStart(4, "0")
              .substring(2, 4),
          };

          payload = {
            account_name: config.accessTokenInfo.tokenizationAccountName,
            account_id: config.accessTokenInfo.tokenizationAccountID,
            reference: builder.searchBuilder?.referenceNumber,
            card: card || null,
          };
          break;
        }
        endpoint = GpApiRequest.PAYMENT_METHODS_ENDPOINT;
        verb = "GET";

        let from_time_last_updated = "";
        if (builder?.searchBuilder?.fromTimeLastUpdated) {
          from_time_last_updated = builder.searchBuilder.fromTimeLastUpdated;
        }

        let to_time_last_updated = "";
        if (builder?.searchBuilder?.toTimeLastUpdated) {
          to_time_last_updated = builder.searchBuilder.toTimeLastUpdated;
        }

        queryParams = {
          ...queryParams,
          order_by: builder.storedPaymentMethodOrderBy,
          order: builder.order,
          number_last4: builder?.searchBuilder?.cardNumberLastFour,
          reference: builder?.searchBuilder?.referenceNumber,
          status: builder?.searchBuilder?.storedPaymentMethodStatus,
          from_time_created: builder?.searchBuilder?.startDate
            ? builder.searchBuilder?.startDate
            : undefined,
          to_time_created: builder?.searchBuilder?.endDate
            ? builder.searchBuilder?.endDate
            : undefined,
          from_time_last_updated,
          to_time_last_updated,
          id: builder.searchBuilder?.storedPaymentMethodId || undefined,
        };
        break;
      case ReportType.StoredPaymentMethodDetail:
        endpoint =
          GpApiRequest.PAYMENT_METHODS_ENDPOINT +
          "/" +
          builder.searchBuilder.storedPaymentMethodId;
        verb = "GET";
        break;
      default:
        throw new NotImplementedError();
    }

    return new GpApiRequest(
      endpoint,
      verb,
      JSON.stringify(payload),
      queryParams,
    );
  }

  public buildRequestFromJson(jsonRequest: string, config: GpApiConfig) {
    // TODO: Implement buildRequestFromJson() method.
    jsonRequest;
    config;
  }

  public addBasicParams(builder: ReportBuilder<TransactionSummary>) {
    return {
      page: builder.page,
      page_size: builder.pageSize,
    };
  }
}
