import {
  IRequestBuilder,
  BaseBuilder,
  SecureBuilder,
  GpApiRequest,
  TransactionType,
  GenerationUtils,
  Secure3dBuilder,
  Transaction,
  GpApiConfig,
  BuilderError,
  UnsupportedTransactionError,
  StringUtils,
  EnumMapping,
  GatewayProvider,
  AuthenticationSource,
  DecoupledFlowRequest,
  PaymentMethod,
  ProtectSensitiveData,
  BrowserData,
  CountryUtils,
} from "../../../"; // Import necessary dependencies

export class GpApiSecureRequestBuilder implements IRequestBuilder {
  private builder: Secure3dBuilder;
  private maskedValues: Record<string, string> = {};

  canProcess(builder: BaseBuilder<Transaction>): boolean {
    return builder instanceof SecureBuilder;
  }

  buildRequest(builder: Secure3dBuilder, config: GpApiConfig): GpApiRequest {
    if (!(builder instanceof SecureBuilder)) {
      throw new BuilderError("Builder must be an instance of SecureBuilder!");
    }

    this.builder = builder;
    let requestData: Record<string, any> = {};
    let verb: string;
    let endpoint: string;

    switch (builder.transactionType) {
      case TransactionType.VerifyEnrolled:
        verb = "POST";
        endpoint = GpApiRequest.AUTHENTICATIONS_ENDPOINT;
        requestData = this.verifyEnrolled(builder, config);
        break;
      case TransactionType.InitiateAuthentication:
        verb = "POST";
        endpoint = `${
          GpApiRequest.AUTHENTICATIONS_ENDPOINT
        }/${builder.getServerTransactionId()}/initiate`;
        requestData = this.initiateAuthenticationData(builder, config);
        break;
      case TransactionType.VerifySignature:
        verb = "POST";
        endpoint = `${
          GpApiRequest.AUTHENTICATIONS_ENDPOINT
        }/${builder.getServerTransactionId()}/result`;
        if (builder.getPayerAuthenticationResponse()) {
          requestData["three_ds"] = {
            challenge_result_value: builder.getPayerAuthenticationResponse(),
          };
        }
        break;
      case TransactionType.RiskAssess:
        verb = "POST";
        endpoint = GpApiRequest.RISK_ASSESSMENTS;
        requestData = {
          account_name: config.accessTokenInfo.riskAssessmentAccountName,
          account_id: config.accessTokenInfo.riskAssessmentAccountID,
          reference: builder.getReferenceNumber()
            ? builder.getReferenceNumber()
            : GenerationUtils.getGuuid(),
          source: builder.getAuthenticationSource(),
          merchant_contact_url: config.merchantContactUrl,
          order: this.setOrderParam(),
          payment_method: this.setPaymentMethodParam(builder.paymentMethod),
          payer: this.setPayerParam(),
          payer_prior_three_ds_authentication_data:
            this.setPayerPrior3DSAuthenticationDataParam(),
          recurring_authorization_data:
            this.setRecurringAuthorizationDataParam(),
          payer_login_data: this.setPayerLoginDataParam(),
          browser_data: this.setBrowserDataParam(builder.getBrowserData()),
        };
        if (this.builder?.getShippingAddress()) {
          requestData["order"]["shipping_address"]["country"] =
            CountryUtils.getCountryCodeByCountry(
              this.builder.getShippingAddress().countryCode,
            );
        }
        break;
      default:
        throw new UnsupportedTransactionError(
          `Your current gateway does not support ${builder.transactionType} transaction type.`,
        );
    }

    GpApiRequest.maskedValues = this.maskedValues;

    return new GpApiRequest(endpoint, verb, JSON.stringify(requestData));
  }

  verifyEnrolled(builder: Secure3dBuilder, config: GpApiConfig): any {
    const threeDS: any = {};
    threeDS["account_name"] =
      config.accessTokenInfo.transactionProcessingAccountName;
    threeDS["account_id"] =
      config.accessTokenInfo.transactionProcessingAccountID;
    threeDS["channel"] = config.channel;
    threeDS["country"] = config.country;
    threeDS["reference"] = builder.getReferenceNumber()
      ? builder.getReferenceNumber()
      : GenerationUtils.getGuuid();
    threeDS["amount"] = StringUtils.toNumeric(String(builder.getAmount()));
    threeDS["currency"] = builder.getCurrency();
    threeDS["preference"] = builder.challengeRequestIndicator;
    threeDS["source"] = builder.getAuthenticationSource().toString();
    threeDS["payment_method"] = this.setPaymentMethodParam(
      builder.paymentMethod,
    );
    threeDS["notifications"] = {
      challenge_return_url: config.challengeNotificationUrl,
      three_ds_method_return_url: config.methodNotificationUrl,
      decoupled_notification_url: builder.decoupledNotificationUrl || undefined,
    };

    if (builder.storedCredential) {
      this.setStoreCredentialParam(builder.storedCredential, threeDS);
    }

    return threeDS;
  }

  private setStoreCredentialParam(storedCredential: any, threeDS: any): void {
    const initiator = EnumMapping.mapStoredCredentialInitiator(
      GatewayProvider.GpApi,
      storedCredential.initiator,
    );
    threeDS["initiator"] = initiator ? initiator : null;
    threeDS["stored_credential"] = {
      model: storedCredential.type.toUpperCase(),
      reason: storedCredential.reason.toUpperCase(),
      sequence: storedCredential.sequence.toUpperCase(),
    };
  }
  private initiateAuthenticationData(
    builder: Secure3dBuilder,
    config: GpApiConfig,
  ): any {
    const threeDS: any = {
      three_ds: {
        source: builder.getAuthenticationSource(),
        preference: builder.challengeRequestIndicator,
        message_version: builder.threeDSecure.messageVersion,
        message_category: EnumMapping.mapMessageCategory(
          GatewayProvider.GpApi,
          builder.messageCategory,
        ),
      },
    };

    if (builder.storedCredential) {
      this.setStoreCredentialParam(builder.storedCredential, threeDS);
    }

    threeDS["method_url_completion_status"] = builder.methodUrlCompletion;
    threeDS["merchant_contact_url"] = config.merchantContactUrl;
    threeDS["order"] = this.setOrderParam();
    threeDS["payment_method"] = this.setPaymentMethodParam(
      builder.paymentMethod,
    );
    threeDS["payer"] = this.setPayerParam();

    if (builder.billingAddress) {
      threeDS["payer"]["billing_address"] = {
        line1: builder.billingAddress.streetAddress1,
        line2: builder.billingAddress.streetAddress2,
        line3: builder.billingAddress.streetAddress3,
        city: builder.billingAddress.city,
        postal_code: builder.billingAddress.postalCode,
        state: builder.billingAddress.state,
        country: CountryUtils.getNumericCodeByCountry(
          builder.billingAddress.countryCode,
        ),
      };
    }

    threeDS["payer_prior_three_ds_authentication_data"] =
      this.setPayerPrior3DSAuthenticationDataParam();
    threeDS["recurring_authorization_data"] =
      this.setRecurringAuthorizationDataParam();
    threeDS["payer_login_data"] = this.setPayerLoginDataParam();

    if (
      builder.getBrowserData() &&
      builder.getAuthenticationSource() !== AuthenticationSource.MobileSdk
    ) {
      threeDS["browser_data"] = this.setBrowserDataParam(
        builder.getBrowserData(),
      );
    }

    if (
      builder.mobileData &&
      builder.getAuthenticationSource() === AuthenticationSource.MobileSdk
    ) {
      threeDS["mobile_data"] = {
        encoded_data: builder.mobileData.encodedData,
        application_reference: builder.mobileData.applicationReference,
        sdk_interface: builder.mobileData.sdkInterface,
        sdk_ui_type: EnumMapping.mapSdkUiType(
          GatewayProvider.GpApi,
          builder.mobileData.sdkUiTypes,
        ),
        ephemeral_public_key: JSON.parse(builder.mobileData.ephemeralPublicKey),
        maximum_timeout: builder.mobileData.maximumTimeout,
        reference_number: builder.mobileData.referenceNumber,
        sdk_trans_reference: builder.mobileData.sdkTransReference,
      };
    }

    if (builder.decoupledNotificationUrl) {
      threeDS["notifications"] = {
        decoupled_notification_url: builder.decoupledNotificationUrl,
      };
    }

    if (builder.decoupledFlowRequest !== undefined) {
      threeDS["decoupled_flow_request"] = builder.decoupledFlowRequest
        ? DecoupledFlowRequest.DecoupledPreferred
        : DecoupledFlowRequest.DoNotUseDecoupled;
    }

    threeDS["decoupled_flow_timeout"] =
      builder.decoupledFlowTimeout || undefined;

    return threeDS;
  }

  private setPaymentMethodParam(cardData: any): PaymentMethod {
    const paymentMethod: PaymentMethod = new PaymentMethod();

    if (cardData.isTokenizable && cardData.token) {
      paymentMethod.id = cardData.token;
    }

    if (cardData.isCardData && !cardData.token) {
      const expMonth = cardData.expMonth ?? "";
      const expYear = cardData.expYear
        ? cardData.expYear.toString().padStart(4, "0").substring(2, 4)
        : "";

      paymentMethod.card = {
        brand: cardData.getCardType()?.toUpperCase() || "",
        number: cardData.number || "",
        expiry_month: expMonth,
        expiry_year: expYear,
      };

      paymentMethod.name = cardData.cardHolderName || "";

      // Mask sensitive values
      this.maskedValues = {
        ...this.maskedValues,
        ...ProtectSensitiveData.hideValues({
          "payment_method.card.expiry_month": expMonth,
          "payment_method.card.expiry_year": expYear,
        }),
      };

      this.maskedValues = {
        ...this.maskedValues,
        ...ProtectSensitiveData.hideValue(
          "payment_method.card.number",
          cardData.number,
          4,
          6,
        ),
      };
    }

    return paymentMethod;
  }

  private setOrderParam(): any {
    let preorder_availability_date = undefined;
    if (this.builder.getPreOrderAvailabilityDate()) {
      preorder_availability_date = new Date(
        this.builder.getPreOrderAvailabilityDate(),
      )
        .toISOString()
        .split("T")[0];
    }
    const order: any = {
      time_created_reference: this.builder.getOrderCreateDate()
        ? new Date(this.builder.getOrderCreateDate()).toISOString()
        : null,
      amount: StringUtils.toNumeric(String(this.builder.getAmount())),
      currency: this.builder.getCurrency(),
      reference: this.builder.getOrderId() || GenerationUtils.getGuuid(),
      address_match_indicator: StringUtils.boolToString(
        this.builder.isAddressMatchIndicator(),
      ),
      gift_card_count: this.builder.getGiftCardCount(),
      gift_card_currency: this.builder.getGiftCardCurrency(),
      gift_card_amount: this.builder.getGiftCardAmount(),
      delivery_email: this.builder.getDeliveryEmail(),
      delivery_timeframe: this.builder.getDeliveryTimeframe(),
      shipping_method: this.builder.getShippingMethod(),
      shipping_name_matches_cardholder_name: StringUtils.boolToString(
        this.builder.getShippingNameMatchesCardHolderName(),
      ),
      preorder_indicator: this.builder.getPreOrderIndicator(),
      preorder_availability_date,
      category: this.builder.getOrderTransactionType(),
    };

    if (this.builder.getShippingAddress()) {
      const shippingAddress = this.builder.getShippingAddress();
      order["shipping_address"] = {
        line1: shippingAddress.streetAddress1,
        line2: shippingAddress.streetAddress2,
        line3: shippingAddress.streetAddress3,
        city: shippingAddress.city,
        postal_code: shippingAddress.postalCode,
        state: shippingAddress.state,
        country: CountryUtils.getNumericCodeByCountry(
          shippingAddress.countryCode,
        ),
      };
    }

    return order;
  }
  private setPayerParam(): any {
    let account_creation_date = undefined;
    if (this.builder.getAccountCreateDate()) {
      account_creation_date = new Date(this.builder.getAccountCreateDate())
        .toISOString()
        .split("T")[0];
    }

    let account_change_date = undefined;
    if (this.builder.getAccountChangeDate()) {
      account_change_date = new Date(this.builder.getAccountChangeDate())
        .toISOString()
        .split("T")[0];
    }

    let account_password_change_date = undefined;
    if (this.builder.getAccountCreateDate()) {
      account_password_change_date = new Date(
        this.builder.getPasswordChangeDate(),
      )
        .toISOString()
        .split("T")[0];
    }

    let payment_account_creation_date = undefined;
    if (this.builder.getPaymentAccountCreateDate()) {
      payment_account_creation_date = new Date(
        this.builder.getPaymentAccountCreateDate(),
      )
        .toISOString()
        .split("T")[0];
    }

    let provision_attempt_last_24hours_count = undefined;
    if (this.builder.getNumberOfAddCardAttemptsInLast24Hours()) {
      provision_attempt_last_24hours_count = new Date(
        this.builder.getNumberOfAddCardAttemptsInLast24Hours(),
      )
        .toISOString()
        .split("T")[0];
    }
    let home_phone = undefined;
    if (this.builder.getHomeCountryCode() || this.builder.getHomeNumber()) {
      home_phone = {
        country_code: this.builder.getHomeCountryCode(),
        subscriber_number: this.builder.getHomeNumber(),
      };
    }
    let work_phone = undefined;
    if (this.builder.getWorkCountryCode() || this.builder.getWorkNumber()) {
      work_phone = {
        country_code: this.builder.getWorkCountryCode(),
        subscriber_number: this.builder.getWorkNumber(),
      };
    }

    let mobile_phone = undefined;
    if (this.builder.getMobileCountryCode() || this.builder.getMobileNumber()) {
      mobile_phone = {
        country_code: this.builder.getMobileCountryCode(),
        subscriber_number: this.builder.getMobileNumber(),
      };
    }

    const payer = {
      reference: this.builder.getCustomerAccountId(),
      account_age: this.builder.getAccountAgeIndicator()?.toString(),
      account_creation_date,
      account_change_date,
      account_change_indicator: this.builder
        .getAccountChangeIndicator()
        ?.toString(),
      account_password_change_date,
      account_password_change_indicator: this.builder
        .getPasswordChangeIndicator()
        ?.toString(),
      home_phone,
      work_phone,
      mobile_phone,
      payment_account_creation_date,
      payment_account_age_indicator: this.builder
        .getPaymentAgeIndicator()
        ?.toString(),
      suspicious_account_activity: StringUtils.boolToString(
        this.builder.getPreviousSuspiciousActivity(),
      ),
      purchases_last_6months_count:
        this.builder.getNumberOfPurchasesInLastSixMonths()
          ? this.padNumber(this.builder.getNumberOfPurchasesInLastSixMonths())
          : undefined,
      transactions_last_24hours_count:
        this.builder.getNumberOfTransactionsInLast24Hours()
          ? this.padNumber(this.builder.getNumberOfTransactionsInLast24Hours())
          : undefined,
      transaction_last_year_count:
        this.builder.getNumberOfTransactionsInLastYear()
          ? this.padNumber(this.builder.getNumberOfTransactionsInLastYear())
          : undefined,
      provision_attempt_last_24hours_count,
      shipping_address_time_created_reference:
        this.builder.getShippingAddressCreateDate()
          ? new Date(this.builder.getShippingAddressCreateDate()).toISOString()
          : undefined,
      shipping_address_creation_indicator: this.builder
        .getShippingAddressUsageIndicator()
        ?.toString(),
      email: this.builder.getCustomerEmail(),
    };

    return !this.areAllKeysUndefined(payer) ? payer : undefined;
  }

  private areAllKeysUndefined(obj: Record<string, any>): boolean {
    for (const key in obj) {
      if (obj[key] !== undefined) {
        return false;
      }
    }
    return true;
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, "0");
  }

  private setBrowserDataParam(browserData: BrowserData): any {
    if (!browserData) {
      return;
    }

    return {
      accept_header: browserData.acceptHeader,
      color_depth: browserData.colorDepth.toString(),
      ip: browserData.ipAddress,
      java_enabled: StringUtils.boolToString(browserData.javaEnabled),
      javascript_enabled: StringUtils.boolToString(
        browserData.javaScriptEnabled,
      ),
      language: browserData.language,
      screen_height: browserData.screenHeight,
      screen_width: browserData.screenWidth,
      challenge_window_size: browserData.challengWindowSize.toString(),
      timezone: browserData.timeZone.toString(),
      user_agent: browserData.userAgent,
    };
  }

  private setPayerPrior3DSAuthenticationDataParam(): any {
    const payerPrior3DSAuthenticationDataParam = {
      authentication_method: this.builder
        .getPriorAuthenticationMethod()
        ?.toString(),
      acs_transaction_reference:
        this.builder.getPriorAuthenticationTransactionId(),
      authentication_timestamp: this.builder.getPriorAuthenticationTimestamp()
        ? new Date(this.builder.getPriorAuthenticationTimestamp()).toISOString()
        : undefined,
      authentication_data: this.builder.getPriorAuthenticationData(),
    };
    return !this.areAllKeysUndefined(payerPrior3DSAuthenticationDataParam)
      ? payerPrior3DSAuthenticationDataParam
      : undefined;
  }

  private setRecurringAuthorizationDataParam(): any {
    const recurringAuthorizationDataParam = {
      max_number_of_instalments: this.builder.getMaxNumberOfInstallments()
        ? this.padNumber(this.builder.getMaxNumberOfInstallments())
        : undefined,
      frequency: this.builder.getRecurringAuthorizationFrequency(),
      expiry_date: this.builder.getRecurringAuthorizationExpiryDate(),
    };
    return !this.areAllKeysUndefined(recurringAuthorizationDataParam)
      ? recurringAuthorizationDataParam
      : undefined;
  }

  private setPayerLoginDataParam(): any {
    let authentication_timestamp = undefined;
    if (this.builder.getCustomerAuthenticationTimestamp()) {
      authentication_timestamp = new Date(
        this.builder.getCustomerAuthenticationTimestamp(),
      )
        .toISOString()
        .split("T")[0];
    }

    const payerLoginDataParam = {
      authentication_data: this.builder.getCustomerAuthenticationData(),
      authentication_timestamp,
      authentication_type: this.builder
        .getCustomerAuthenticationMethod()
        ?.toString(),
    };

    return !this.areAllKeysUndefined(payerLoginDataParam)
      ? payerLoginDataParam
      : undefined;
  }

  public buildRequestFromJson(jsonRequest: string, config: GpApiConfig) {
    // TODO: Implement buildRequestFromJson() method.
    jsonRequest;
    config;
  }
}
