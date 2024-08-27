import {
  AlternativePaymentResponse,
  AuthenticationSource,
  DccRateData,
  DepositSummary,
  DisputeDocument,
  DisputeSummary,
  MessageExtension,
  Secure3dStatus,
  Secure3dVersion,
  StringUtils,
  ThreeDSecure,
} from "../../src";
import {
  Address,
  AddressType,
  ApiError,
  CaptureMode,
  Card,
  CardIssuerResponse,
  PagedResult,
  PayerDetails,
  PaymentMethodName,
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
  static DCC_RESPONSE = "RATE_LOOKUP";

  public static mapResponse(response: any): Transaction {
    const transaction = new Transaction();

    if (!response) {
      return transaction;
    }

    transaction.responseCode = response.action.result_code;
    transaction.responseMessage = response.status;

    transaction.transactionId = response.id;
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

    if (
      response.action.type === GpApiMapping.DCC_RESPONSE ||
      response.currency_conversion
    ) {
      transaction.dccRateData = GpApiMapping.mapDccInfo(response);
    }

    return transaction;
  }

  private static mapPaymentMethodTransactionDetails(
    transaction: Transaction,
    paymentMethodResponse: any,
  ): void {
    let cardIssuerResponse = new CardIssuerResponse();
    cardIssuerResponse.result = paymentMethodResponse.result ?? null;

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
      transaction.authorizationCode = card.authcode ?? null;

      if (card.provider) {
        cardIssuerResponse = GpApiMapping.mapCardIssuerResponse(card.provider);
      }
    }

    transaction.cardIssuerResponse = cardIssuerResponse;

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

  private static mapCardIssuerResponse(cardProvider: any): CardIssuerResponse {
    const cardIssuerResponse = new CardIssuerResponse();
    cardIssuerResponse.result = cardProvider.result ?? null;
    cardIssuerResponse.avsResult = cardProvider.avs_result ?? null;
    cardIssuerResponse.cvvResult = cardProvider.cvv_result ?? null;
    cardIssuerResponse.avsAddressResult =
      cardProvider.avs_address_result ?? null;
    cardIssuerResponse.avsPostalCodeResult =
      cardProvider.avs_postal_code_result ?? null;

    return cardIssuerResponse;
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
      case ReportType.TransactionDetail:
        report = GpApiMapping.mapTransactionSummary(response);
        break;
      case ReportType.FindStoredPaymentMethodsPaged:
        report = this.setPagingInfo(response);
        response.payment_methods.forEach((spm: any) => {
          report.result.push(this.mapStoredPaymentMethodSummary(spm));
        });
        break;
      case ReportType.StoredPaymentMethodDetail:
        report = this.mapStoredPaymentMethodSummary(response);
        break;
      case ReportType.FindTransactionsPaged:
      case ReportType.FindSettlementTransactionsPaged:
        report = this.setPagingInfo(response);
        report.result = response.transactions.map((transaction: any) =>
          GpApiMapping.mapTransactionSummary(transaction),
        );
        break;
      case ReportType.DepositDetail:
        report = this.mapDepositSummary(response);
        break;
      case ReportType.FindDepositsPaged:
        report = this.setPagingInfo(response);
        report.result = response.deposits.map((deposit: any) =>
          this.mapDepositSummary(deposit),
        );
        break;
      case ReportType.DisputeDetail:
      case ReportType.SettlementDisputeDetail:
        report = this.mapDisputeSummary(response);
        break;
      case ReportType.DocumentDisputeDetail:
        report = new DisputeDocument();
        report.id = response.id;
        report.b64Content = response.b64_content;
        break;
      case ReportType.FindDisputesPaged:
      case ReportType.FindSettlementDisputesPaged:
        report = this.setPagingInfo(response);

        report.result = response.disputes.map((dispute: any) =>
          this.mapDisputeSummary(dispute),
        );
        break;
      default:
        throw new ApiError("Report type not supported!");
    }

    return report;
  }

  static mapTransactionSummary(response: any): TransactionSummary {
    const summary: TransactionSummary = this.createTransactionSummary(response);
    let card;
    if (response.time_created_reference) {
      summary.transactionLocalDate = new Date(response.time_created_reference);
    }
    summary.batchSequenceNumber = response.batch_id;
    summary.country = response.country ?? null;
    summary.originalTransactionId = response.parent_resource_id ?? null;
    summary.depositReference = response.deposit_id ?? "";
    summary.depositStatus = response.deposit_status ?? "";
    summary.depositTimeCreated = response.deposit_time_created
      ? new Date(response.deposit_time_created)
      : null;
    summary.orderId = response.order_reference ?? null;

    if (response.system) {
      this.mapSystemResponse(summary, response.system);
    }

    if (response.payment_method) {
      const paymentMethod = response.payment_method;
      card = paymentMethod.card;

      summary.gatewayResponseMessage = paymentMethod.message ?? null;
      summary.entryMode = paymentMethod.entry_mode ?? null;
      summary.cardHolderName = paymentMethod.name ?? "";

      if (paymentMethod.card) {
        const card = paymentMethod.card;
        summary.aquirerReferenceNumber = card.arn ?? null;
        summary.maskedCardNumber = card.masked_number_first6last4 ?? null;
        summary.paymentType = PaymentMethodName.CARD;
      } else if (paymentMethod.digital_wallet) {
        const digitalWallet = paymentMethod.digital_wallet;
        summary.maskedCardNumber =
          digitalWallet.masked_token_first6last4 ?? null;
        summary.paymentType = PaymentMethodName.DIGITAL_WALLET;
      } else if (paymentMethod.bank_transfer && !paymentMethod.apm) {
        summary.paymentType = PaymentMethodName.BANK_TRANSFER;
        const bankTransfer = paymentMethod.bank_transfer;
        summary.accountNumberLast4 =
          bankTransfer.masked_account_number_last4 ?? null;
        summary.accountType = bankTransfer.account_type ?? null;
      }

      if (paymentMethod.card) {
        summary.cardType = card.brand ?? null;
        summary.authCode = card.authcode ?? null;
        summary.brandReference = card.brand_reference ?? null;
      }

      if (response.payment_method?.apm) {
        /** map Open Banking response info */
        if (
          response.payment_method.apm.provider?.toLowerCase() ===
          PaymentProvider.OPEN_BANKING
        ) {
          // To be implemented
        } else {
          /** map APMs (Paypal) response info */
          const apm = response.payment_method.apm;
          const alternativePaymentResponse = new AlternativePaymentResponse();
          alternativePaymentResponse.redirectUrl =
            response.payment_method.redirect_url ?? null;
          alternativePaymentResponse.providerName = apm.provider ?? null;
          alternativePaymentResponse.providerReference =
            apm.provider_reference ?? null;
          summary.alternativePaymentResponse = alternativePaymentResponse;
          summary.paymentType = PaymentMethodName.APM;
        }
      }
    }

    return summary;
  }

  private static createTransactionSummary(response: any): TransactionSummary {
    const transaction: TransactionSummary = new TransactionSummary();
    transaction.transactionId = response.id ? response.id : null;
    const timeCreated: string | null = this.validateStringDate(
      response.time_created,
    );
    if (timeCreated) {
      transaction.transactionDate = new Date(timeCreated);
    }
    transaction.transactionStatus = response.status;
    transaction.transactionType = response.type;
    transaction.channel = response.channel ? response.channel : null;
    transaction.amount = StringUtils.toAmount(response.amount);
    transaction.currency = response.currency;
    transaction.referenceNumber = transaction.clientTransactionId =
      response.reference;
    transaction.description = response.description ?? null;
    transaction.fingerprint = response.payment_method?.fingerprint ?? null;
    transaction.fingerprintIndicator =
      response.payment_method?.fingerprint_presence_indicator ?? null;

    return transaction;
  }

  private static validateStringDate(date: string): string {
    try {
      new Date(date);
    } catch (error) {
      return "";
    }

    return date;
  }

  private static mapSystemResponse(
    summary: TransactionSummary | DepositSummary,
    system: any,
  ): void {
    if (!system) {
      return;
    }

    summary.merchantId = system.mid ?? null;
    summary.merchantHierarchy = system.hierarchy ?? null;
    summary.merchantName = system.name ?? null;
    summary.merchantDbaName = system.dba ?? null;
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

  static mapResponseSecure3D(response: any): Transaction {
    const transaction = new Transaction();
    const threeDSecure = new ThreeDSecure();
    threeDSecure.serverTransactionId = response.id;

    if (response.three_ds && response.three_ds.message_version) {
      const messageVersion = response.three_ds.message_version;
      let version: Secure3dVersion;
      switch (messageVersion.substring(0, 2)) {
        case "1.":
          version = Secure3dVersion.ONE;
          break;
        case "2.":
          version = Secure3dVersion.TWO;
          break;
        default:
          version = Secure3dVersion.ANY;
      }
      threeDSecure.messageVersion = messageVersion;
      threeDSecure.setVersion(version);
    }
    threeDSecure.status = response.status;
    threeDSecure.directoryServerStartVersion =
      response.three_ds?.ds_protocol_version_start || null;
    threeDSecure.directoryServerEndVersion =
      response.three_ds?.ds_protocol_version_end || null;
    threeDSecure.acsStartVersion =
      response.three_ds?.acs_protocol_version_start || null;
    threeDSecure.acsEndVersion =
      response.three_ds?.acs_protocol_version_end || null;
    threeDSecure.enrolled = response.three_ds?.enrolled_status || null;
    threeDSecure.eci = response.three_ds?.eci || null;
    threeDSecure.acsInfoIndicator =
      response.three_ds?.acs_info_indicator || null;
    threeDSecure.acsReferenceNumber =
      response.three_ds?.acs_reference_number || null;
    threeDSecure.providerServerTransRef =
      response.three_ds?.server_trans_ref || null;
    threeDSecure.challengeMandated =
      response.three_ds?.challenge_status === "MANDATED";
    threeDSecure.payerAuthenticationRequest =
      response.three_ds?.method_data?.encoded_method_data || null;
    threeDSecure.issuerAcsUrl = response.three_ds?.method_url || null;
    threeDSecure.authenticationSource =
      response.three_ds?.authentication_source || null;

    if (
      response.three_ds?.acs_challenge_request_url &&
      threeDSecure.status === Secure3dStatus.ChallengeRequired
    ) {
      threeDSecure.issuerAcsUrl = response.three_ds.acs_challenge_request_url;
      threeDSecure.payerAuthenticationRequest =
        response.three_ds?.challenge_value || null;
    }
    if (
      threeDSecure.authenticationSource === AuthenticationSource.MobileSdk &&
      response.three_ds?.mobile_data
    ) {
      const mobileData = response.three_ds.mobile_data;
      threeDSecure.payerAuthenticationRequest =
        mobileData?.acs_signed_content || null;
      threeDSecure.acsInterface =
        mobileData?.acs_rendering_type?.acs_interface || null;
      threeDSecure.acsUiTemplate =
        mobileData?.acs_rendering_type?.acs_ui_template || null;
    }

    threeDSecure.setCurrency(response.currency);
    threeDSecure.setAmount(StringUtils.toAmount(response.amount));
    threeDSecure.authenticationValue =
      response.three_ds?.authentication_value || null;
    threeDSecure.directoryServerTransactionId =
      response.three_ds?.ds_trans_ref || null;
    threeDSecure.acsTransactionId = response.three_ds?.acs_trans_ref || null;
    threeDSecure.statusReason = response.three_ds?.status_reason || null;
    threeDSecure.messageCategory = response.three_ds?.message_category || null;
    threeDSecure.messageType = response.three_ds?.message_type || null;
    threeDSecure.sessionDataFieldName =
      response.three_ds?.session_data_field_name || null;
    threeDSecure.challengeReturnUrl =
      response.notifications?.challenge_return_url || null;
    threeDSecure.liabilityShift = response.three_ds?.liability_shift || null;
    threeDSecure.authenticationType =
      response.three_ds?.authentication_request_type || null;
    threeDSecure.decoupledResponseIndicator =
      response.three_ds?.acs_decoupled_response_indicator || null;
    threeDSecure.whitelistStatus = response.three_ds?.whitelist_status || null;

    if (response.three_ds?.message_extension) {
      for (const messageExtension of response.three_ds.message_extension) {
        const msgItem = new MessageExtension();
        msgItem.criticalityIndicator =
          messageExtension.criticality_indicator || null;
        msgItem.messageExtensionData = messageExtension.data
          ? JSON.stringify(messageExtension.data)
          : "";
        msgItem.messageExtensionId = messageExtension.id || null;
        msgItem.messageExtensionName = messageExtension.name || null;
        threeDSecure.messageExtension.push(msgItem);
      }
    }

    transaction.threeDSecure = threeDSecure;

    return transaction;
  }

  public static mapDepositSummary(response: any): DepositSummary {
    const summary = new DepositSummary();
    summary.depositId = response.id;
    summary.depositDate = new Date(response.time_created);
    summary.status = response.status;
    summary.type = response.funding_type;
    summary.amount = StringUtils.toAmount(response.amount);
    summary.currency = response.currency;

    if (response.system) {
      this.mapSystemResponse(summary, response.system);
    }

    if (response.sales) {
      const sales = response.sales;
      summary.salesTotalCount = sales.count || 0;
      summary.salesTotalAmount = StringUtils.toAmount(sales.amount);
    }

    if (response.refunds) {
      const refunds = response.refunds;
      summary.refundsTotalCount = refunds.count || 0;
      summary.refundsTotalAmount = StringUtils.toAmount(refunds.amount);
    }

    if (response.disputes) {
      const disputes = response.disputes;
      summary.chargebackTotalCount = disputes.chargebacks?.count || 0;
      summary.chargebackTotalAmount = StringUtils.toAmount(
        disputes.chargebacks.amount,
      );

      summary.adjustmentTotalCount = disputes.reversals?.count || 0;
      summary.adjustmentTotalAmount = StringUtils.toAmount(
        disputes.reversals.amount,
      );
    }

    summary.feesTotalAmount = StringUtils.toAmount(response?.fees?.amount);

    return summary;
  }

  static mapDisputeSummary(response: any): DisputeSummary {
    const summary = new DisputeSummary();
    summary.caseId = response.id;
    summary.caseIdTime = response.time_created
      ? new Date(response.time_created)
      : response.stage_time_created
      ? new Date(response.stage_time_created)
      : "";
    summary.caseStatus = response.status;
    summary.caseStage = response.stage;
    summary.caseAmount = StringUtils.toAmount(response.amount);
    summary.caseCurrency = response.currency;

    if (response.system) {
      const system = response.system;
      summary.caseMerchantId = system.mid ?? null;
      summary.merchantHierarchy = system.hierarchy ?? null;
      summary.merchantName = system.name ?? null;
    }

    const card =
      response?.transaction?.payment_method?.card ||
      response?.payment_method?.card;

    if (card) {
      summary.transactionARN = card.arn;
      summary.transactionCardType = card.brand;
      summary.transactionMaskedCardNumber = card.number;
    }

    if (response.transaction) {
      summary.transactionTime = new Date(response.transaction.time_created);
      summary.transactionType = response.transaction.type;
      summary.transactionAmount = StringUtils.toAmount(
        response.transaction.amount,
      );
      summary.transactionCurrency = response.transaction.currency;
      summary.transactionReferenceNumber = response.transaction.reference;

      if (response.transaction.payment_method?.card) {
        const card = response.transaction.payment_method.card;
        summary.transactionMaskedCardNumber =
          card.masked_number_first6last4 ?? "";
        summary.transactionAuthCode = card.authcode;
      }
    }

    if (response.documents) {
      summary.documents = response.documents
        .filter((document: any) => document.id)
        .map((document: any) => {
          const disputeDocument = new DisputeDocument();
          disputeDocument.id = document.id;
          disputeDocument.type = document.type ?? null;
          return disputeDocument;
        });
    }

    summary.reasonCode = response.reason_code;
    summary.reason = response.reason_description;
    summary.respondByDate = new Date(response.time_to_respond_by);
    summary.result = response.result;
    summary.lastAdjustmentAmount = StringUtils.toAmount(
      response.last_adjustment_amount,
    );
    summary.lastAdjustmentCurrency = response.last_adjustment_currency;
    summary.lastAdjustmentFunding = response.last_adjustment_funding;
    summary.depositDate = response.deposit_time_created
      ? new Date(response.deposit_time_created)
      : null;
    summary.depositReference = response.deposit_id ?? null;

    return summary;
  }

  static mapResponseAPM(response: any): Transaction {
    const apm = new AlternativePaymentResponse();
    const transaction = GpApiMapping.mapResponse(response);
    const paymentMethodApm = response.payment_method.apm;

    apm.redirectUrl =
      response.payment_method.redirect_url ??
      paymentMethodApm.redirect_url ??
      null;
    apm.qrCodeImage = response.payment_method.qr_code ?? null;

    if (typeof paymentMethodApm.provider === "string") {
      apm.providerName = paymentMethodApm.provider;
    } else if (typeof paymentMethodApm.provider === "object") {
      apm.providerName = paymentMethodApm.provider?.name ?? null;
      apm.providerReference =
        paymentMethodApm.provider?.merchant_identifier ?? null;
      apm.timeCreatedReference = paymentMethodApm.provider
        ?.time_created_reference
        ? paymentMethodApm.provider.time_created_reference
        : null;
    }

    apm.accountHolderName = paymentMethodApm.provider_payer_name ?? null;
    apm.ack = paymentMethodApm.ack ?? null;
    apm.sessionToken = paymentMethodApm.session_token ?? null;
    apm.correlationReference = paymentMethodApm.correlation_reference ?? null;
    apm.versionReference = paymentMethodApm.version_reference ?? null;
    apm.buildReference = paymentMethodApm.build_reference ?? null;
    apm.timeCreatedReference = paymentMethodApm.time_created_reference
      ? paymentMethodApm.time_created_reference
      : null;
    apm.transactionReference = paymentMethodApm.transaction_reference ?? null;
    apm.secureAccountReference =
      paymentMethodApm.secure_account_reference ?? null;
    apm.reasonCode = paymentMethodApm.reason_code ?? null;
    apm.pendingReason = paymentMethodApm.pending_reason ?? null;
    apm.grossAmount = StringUtils.toAmount(paymentMethodApm.gross_amount);
    apm.paymentTimeReference = paymentMethodApm.payment_time_reference
      ? paymentMethodApm.payment_time_reference
      : null;
    apm.paymentType = paymentMethodApm.payment_type ?? null;
    apm.paymentStatus = paymentMethodApm.payment_status ?? null;
    apm.type = paymentMethodApm.type ?? null;
    apm.protectionEligibilty = paymentMethodApm.protection_eligibilty ?? null;
    apm.feeAmount = StringUtils.toAmount(paymentMethodApm.fee_amount);

    if (response.payment_method.authorization) {
      const authorization = response.payment_method.authorization;
      apm.authStatus = authorization.status ?? null;
      apm.authAmount = StringUtils.toAmount(authorization.amount);
      apm.authAck = authorization.ack ?? null;
      apm.authCorrelationReference =
        authorization.correlation_reference ?? null;
      apm.authVersionReference = authorization.version_reference ?? null;
      apm.authBuildReference = authorization.build_reference ?? null;
      apm.authPendingReason = authorization.pending_reason ?? null;
      apm.authProtectionEligibilty =
        authorization.protection_eligibilty ?? null;
      apm.authProtectionEligibiltyType =
        authorization.protection_eligibilty_type ?? null;
      apm.authReference = authorization.reference ?? null;
    }

    apm.nextAction = paymentMethodApm.next_action ?? null;
    apm.secondsToExpire = paymentMethodApm.seconds_to_expire ?? null;
    transaction.alternativePaymentResponse = apm;

    return transaction;
  }

  private static mapDccInfo(response: any): DccRateData {
    if (response.currency_conversion) {
      response = response.currency_conversion;
    }

    const dccRateData = new DccRateData();
    dccRateData.cardHolderCurrency = response.payer_currency || null;
    dccRateData.cardHolderAmount = response.payer_amount
      ? StringUtils.toAmount(response.payer_amount)
      : null;
    dccRateData.cardHolderRate = response.exchange_rate || null;
    dccRateData.merchantCurrency = response.currency || null;
    dccRateData.merchantAmount = response.amount
      ? StringUtils.toAmount(response.amount)
      : null;
    dccRateData.marginRatePercentage = response.margin_rate_percentage || null;
    dccRateData.exchangeRateSourceName = response.exchange_rate_source || null;
    dccRateData.commissionPercentage = response.commission_percentage || null;
    dccRateData.exchangeRateSourceTimestamp =
      response.exchange_rate_time_created || null;
    dccRateData.dccId = response.id || null;

    return dccRateData;
  }
}
