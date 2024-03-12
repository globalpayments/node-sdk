import { StringUtils } from "../../src";
import {
  Address,
  AddressType,
  ApiError,
  CaptureMode,
  Card,
  CardIssuerResponse,
  PagedResult,
  PayerDetails,
  PaymentMethodType,
  PaymentProvider,
  ReportType,
  StoredPaymentMethodSummary,
  Transaction,
  TransactionStatus,
  TransactionSummary,
} from "../../src/Entities";
import { PaymentMethod } from "../../src/Entities/GpApi/DTO";

export class GpApiMapping {
  public static mapResponseAPM(response: string) {
    response;
  }

  public static mapResponse(response: any): Transaction {
    const transaction = new Transaction();

    if (!response) {
      return transaction;
    }

    transaction.responseCode = response.action.result_code;
    transaction.responseMessage = response.status;

    transaction.clientTransactionId = response.reference || null;
    transaction.timestamp = response.time_created || "";
    transaction.referenceNumber = response.reference || null;

    transaction.balanceAmount = StringUtils.toAmount(response.amount);
    if (
      response.status === TransactionStatus.PREAUTHORIZED &&
      response.amount
    ) {
      transaction.authorizedAmount = StringUtils.toAmount(response.amount);
    }

    transaction.multiCapture =
      response.capture_mode && response.capture_mode === CaptureMode.MULTIPLE;
    transaction.fingerprint = response.fingerprint || null;
    transaction.fingerprintIndicator =
      response.fingerprint_presence_indicator || null;

    transaction.token = response.id.startsWith(
      PaymentMethod.PAYMENT_METHOD_TOKEN_PREFIX,
    )
      ? response.id
      : null;
    transaction.tokenUsageMode = response.usage_mode || null;

    if (response.payment_method) {
      GpApiMapping.mapPaymentMethodTransactionDetails(
        transaction,
        response.payment_method,
      );
      GpApiMapping.mapPaymentMethodTransactionDetails(
        transaction,
        response.payment_method,
      );
    }

    if (response.card) {
      const cardDetails = new Card();
      cardDetails.cardNumber = response.card.number || null;
      cardDetails.brand = response.card.brand || null;
      cardDetails.cardExpMonth = response.card.expiry_month || null;
      cardDetails.cardExpYear = response.card.expiry_year || null;

      transaction.cardDetails = cardDetails;
      transaction.cardType = response.card.brand || "";
      transaction.cvnResponseCode = response.card.cvv || null;
      transaction.cardBrandTransactionId =
        response.card.brand_reference || null;
    }

    transaction.multiCapture =
      response.capture_mode && response.capture_mode === CaptureMode.MULTIPLE;

    return transaction;
  }

  private static mapPaymentMethodTransactionDetails(
    transaction: any,
    paymentMethodResponse: any,
  ): void {
    transaction.authorizationCode = paymentMethodResponse.result ?? null;

    if (paymentMethodResponse.id) {
      transaction.token = paymentMethodResponse.id;
    }

    transaction.fingerprint = paymentMethodResponse.fingerprint ?? null;
    transaction.fingerprintIndicator =
      paymentMethodResponse.fingerprint_presence_indicator ?? null;

    if (paymentMethodResponse.card) {
      const card = paymentMethodResponse.card;
      const cardDetails = new Card();
      cardDetails.maskedNumberLast4 = card.masked_number_last4 ?? null;
      cardDetails.brand = card.brand ?? null;
      transaction.cardDetails = cardDetails;

      transaction.cardLast4 = card.masked_number_last4 ?? null;
      transaction.cardType = card.brand ?? null;
      transaction.cvnResponseCode = card.cvv ?? null;
      transaction.cvnResponseMessage = card.cvv_result ?? null;
      transaction.cardBrandTransactionId = card.brand_reference ?? null;
      transaction.avsResponseCode = card.avs_postal_code_result ?? null;
      transaction.avsAddressResponse = card.avs_address_result ?? null;
      transaction.avsResponseMessage = card.avs_action ?? null;

      if (card.provider) {
        GpApiMapping.mapCardIssuerResponse(transaction, card.provider);
      }
    }

    if (
      paymentMethodResponse.apm &&
      paymentMethodResponse.apm.provider ===
        PaymentProvider.OPEN_BANKING.toLowerCase()
    ) {
    } else if (paymentMethodResponse.bank_transfer) {
      const bankTransfer = paymentMethodResponse.bank_transfer;
      transaction.accountNumberLast4 =
        bankTransfer.masked_account_number_last4 ?? null;
      transaction.accountType = bankTransfer.account_type ?? null;
      transaction.paymentMethodType = PaymentMethodType.ACH;
    } else if (paymentMethodResponse.apm) {
      transaction.paymentMethodType = PaymentMethodType.APM;
    }

    if (paymentMethodResponse.shipping_address || paymentMethodResponse.payer) {
      const payerDetails = new PayerDetails();
      payerDetails.email = paymentMethodResponse.payer?.email ?? null;

      if (paymentMethodResponse.payer?.billing_address) {
        const billingAddress = paymentMethodResponse.payer.billing_address;
        payerDetails.firstName = billingAddress.first_name ?? null;
        payerDetails.lastName = billingAddress.last_name ?? null;
        payerDetails.billingAddress = GpApiMapping.mapAddressObject(
          billingAddress,
          AddressType.Billing,
        );
      }

      payerDetails.shippingAddress = GpApiMapping.mapAddressObject(
        paymentMethodResponse.shipping_address,
        AddressType.Shipping,
      );
      transaction.payerDetails = payerDetails;
    }
  }

  private static mapCardIssuerResponse(
    transaction: any,
    cardIssuerResponse: any,
  ): void {
    transaction.cardIssuerResponse = new CardIssuerResponse();
    transaction.cardIssuerResponse.result = cardIssuerResponse.result ?? null;
    transaction.cardIssuerResponse.avsResult =
      cardIssuerResponse.avs_result ?? null;
    transaction.cardIssuerResponse.cvvResult =
      cardIssuerResponse.cvv_result ?? null;
    transaction.cardIssuerResponse.avsAddressResult =
      cardIssuerResponse.avs_address_result ?? null;
    transaction.cardIssuerResponse.avsPostalCodeResult =
      cardIssuerResponse.avs_postal_code_result ?? null;
  }

  private static mapAddressObject(address: any, type: any = null): Address {
    if (!address) {
      return new Address();
    }

    const userAddress = new Address();
    userAddress.type = type;
    userAddress.streetAddress1 = address.line_1 ?? null;
    userAddress.streetAddress2 = address.line_2 ?? null;
    userAddress.streetAddress3 = address.line_3 ?? null;
    userAddress.city = address.city ?? null;
    userAddress.state = address.state ?? null;
    userAddress.postalCode = address.postal_code ?? null;
    userAddress.countryCode = address.country ?? null;
    userAddress.type = address.functions?.[0] ?? type;

    return userAddress;
  }

  public static mapReportResponse(
    response: any,
    reportType: ReportType,
  ): TransactionSummary {
    let report: any;

    switch (reportType) {
      case ReportType.FindStoredPaymentMethodsPaged:
        report = this.setPagingInfo(response);
        response.payment_methods.forEach((spm: any) => {
          report.result.push(this.mapStoredPaymentMethodSummary(spm));
        });
        break;
      case ReportType.StoredPaymentMethodDetail:
        report = this.mapStoredPaymentMethodSummary(response);
        break;
      default:
        throw new ApiError("Report type not supported!");
    }

    return report;
  }
  public static mapStoredPaymentMethodSummary(
    response: any,
  ): StoredPaymentMethodSummary {
    const summary = new StoredPaymentMethodSummary();
    summary.paymentMethodId = response.id;
    if (response.time_created) {
      summary.timeCreated = new Date(response.time_created);
    }
    summary.status = !!response.status ? response.status : "";
    summary.reference = !!response.reference ? response.reference : "";
    summary.cardHolderName = !!response.name ? response.name : "";
    if (response.card) {
      const card = response.card;
      summary.cardType = !!card.brand ? card.brand : "";
      summary.cardNumberLastFour = !!card.number_last4 ? card.number_last4 : "";
      summary.cardExpMonth = !!card.expiry_month ? card.expiry_month : "";
      summary.cardExpYear = !!card.expiry_year ? card.expiry_year : "";
    }

    return summary;
  }

  private static setPagingInfo(response: any): PagedResult {
    const pageInfo = new PagedResult();
    pageInfo.totalRecordCount = !!response.total_count
      ? response.total_count
      : !!response.total_record_count
      ? response.total_record_count
      : null;
    pageInfo.pageSize = !!response.paging?.page_size
      ? response.paging.page_size
      : null;
    pageInfo.page = !!response.paging?.page ? response.paging.page : null;
    pageInfo.order = !!response.paging?.order ? response.paging.order : null;
    pageInfo.orderBy = !!response.paging?.order_by
      ? response.paging.order_by
      : null;

    return pageInfo;
  }
}
