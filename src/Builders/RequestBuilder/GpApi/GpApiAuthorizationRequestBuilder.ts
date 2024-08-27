import { Card } from "../../../Entities/GpApi/DTO";
import {
  AuthorizationBuilder,
  BaseBuilder,
  CreditCardData,
  ECheck,
  GatewayProvider,
  GenerationUtils,
  Channel,
  GpApiConfig,
  GpApiRequest,
  IRequestBuilder,
  ManualEntryMethod,
  PaymentEntryMode,
  PaymentMethod,
  ProtectSensitiveData,
  Transaction,
  TransactionModifier,
  TransactionType,
  AlternativePaymentMethod,
  EnumMapping,
  EncyptedMobileType,
  PaymentType,
  CaptureMode,
  Credit,
  ApiError,
  FraudRule,
  FraudFilterMode,
  StringUtils,
  PhoneNumberType,
  PhoneNumber,
  CardUtils,
  StoredCredential,
  EntryMethod,
} from "../../../../src";

type FraudManagement = {
  mode: FraudFilterMode;
  rules?: { reference: string; mode: FraudFilterMode }[];
};

export class GpApiAuthorizationRequestBuilder implements IRequestBuilder {
  private builder: AuthorizationBuilder;
  private maskedValues: Record<string, string> = {};

  /***
   * @param AuthorizationBuilder builder
   *
   * @return bool
   */
  public canProcess(builder: BaseBuilder<Transaction>): boolean {
    if (builder instanceof AuthorizationBuilder) {
      return true;
    }

    return false;
  }

  /**
   * @param BaseBuilder builder
   * @param GpApiConfig config
   * @return GpApiRequest|string
   */
  public buildRequest(builder: AuthorizationBuilder, config: GpApiConfig) {
    this.builder = builder;
    let requestData: any = null;
    let endpoint: string;
    const verb: string = "POST";
    switch (builder.transactionType) {
      case TransactionType.Sale:
      case TransactionType.Refund:
      case TransactionType.Auth:
        endpoint = GpApiRequest.TRANSACTION_ENDPOINT;
        requestData = this.createFromAuthorizationBuilder(
          builder as AuthorizationBuilder,
          config,
        );
        break;

      case TransactionType.Verify:
        if (builder.requestMultiUseToken && !builder.paymentMethod.token) {
          endpoint = GpApiRequest.PAYMENT_METHODS_ENDPOINT;
          /* eslint-disable indent */
          const expiry_year = builder.paymentMethod.expYear
            ? builder.paymentMethod.expYear
                .toString()
                .padStart(4, "0")
                .substring(2, 4)
            : undefined;
          /* eslint-enable indent */
          requestData = {
            account_name: config.accessTokenInfo.tokenizationAccountName,
            account_id: config.accessTokenInfo.tokenizationAccountID,
            name: builder.description || undefined,
            reference: builder.clientTransactionId
              ? builder.clientTransactionId
              : GenerationUtils.generateOrderId(),
            usage_mode: builder.paymentMethodUsageMode || undefined,
            fingerprint_mode:
              builder.customerData && builder.customerData.deviceFingerPrint
                ? builder.customerData.deviceFingerPrint
                : undefined,
            card: {
              number: builder.paymentMethod.number,
              expiry_month: builder.paymentMethod.expMonth,
              expiry_year,
              cvv: builder.paymentMethod.cvn,
            },
          };

          this.maskedValues = {
            ...this.maskedValues,
            ...ProtectSensitiveData.hideValues({
              "card.expiry_month": requestData.card.expiry_month,
              "card.expiry_year": requestData.card.expiry_year,
              "card.cvv": requestData.card.cvv,
            }),
          };
          this.maskedValues = {
            ...this.maskedValues,
            ...ProtectSensitiveData.hideValue(
              "card.number",
              requestData.card.number,
              4,
              6,
            ),
          };
        } else {
          endpoint = GpApiRequest.VERIFICATIONS_ENDPOINT;
          requestData = this.generateVerificationRequest(builder, config);
        }
        break;
      case TransactionType.DccRateLookup:
        endpoint = GpApiRequest.DCC_ENDPOINT;
        requestData = {
          account_name: config.accessTokenInfo.transactionProcessingAccountName,
          account_id: config.accessTokenInfo.transactionProcessingAccountID,
          channel: config.channel,
          amount: StringUtils.toNumeric((builder.amount as string) || null),
          currency: builder.currency,
          country: config.country,
          reference: builder.clientTransactionId || GenerationUtils.getGuuid(),
          payment_method: this.createPaymentMethodParam(builder, config),
        };
        break;
      default:
        throw new Error("Unsupported transaction type");
    }

    GpApiRequest.maskedValues = this.maskedValues;

    return new GpApiRequest(endpoint, verb, JSON.stringify(requestData));
  }

  private generateVerificationRequest(
    builder: AuthorizationBuilder,
    config: GpApiConfig,
  ): any {
    const requestBody: any = {
      account_name: config.accessTokenInfo.transactionProcessingAccountName,
      account_id: config.accessTokenInfo.transactionProcessingAccountID,
      channel: config.channel,
      reference: builder.clientTransactionId || GenerationUtils.getGuuid(),
      currency: builder.currency,
      country: config.country,
      payment_method: this.createPaymentMethodParam(builder, config),
    };

    if (builder.storedCredential) {
      this.setRequestStoredCredentials(builder.storedCredential, requestBody);
    }

    return requestBody;
  }

  private createPaymentMethodParam(
    builder: AuthorizationBuilder,
    config: GpApiConfig,
  ): PaymentMethod {
    const paymentMethodContainer = builder.paymentMethod;
    const paymentMethod = new PaymentMethod();
    paymentMethod.entry_mode = this.getEntryMode(builder, config.channel);
    paymentMethod.name =
      paymentMethodContainer instanceof AlternativePaymentMethod
        ? paymentMethodContainer.accountHolderName
        : paymentMethodContainer.cardHolderName
        ? paymentMethodContainer.cardHolderName
        : undefined;
    paymentMethod.narrative = builder.dynamicDescriptor
      ? builder.dynamicDescriptor
      : undefined;

    switch (true) {
      case paymentMethodContainer instanceof CreditCardData:
        paymentMethod.fingerprint_mode =
          builder.customerData && builder.customerData.deviceFingerPrint
            ? builder.customerData.deviceFingerPrint
            : undefined;

        const secureEcom = paymentMethodContainer.threeDSecure;
        if (secureEcom) {
          paymentMethod.authentication = {
            id: secureEcom.serverTransactionId,
            three_ds: {
              exempt_status: secureEcom.exemptStatus,
              message_version: secureEcom.messageVersion,
              eci: secureEcom.eci,
              server_trans_reference: secureEcom.serverTransactionId,
              ds_trans_reference: secureEcom.directoryServerTransactionId,
              value: secureEcom.authenticationValue,
            },
          };
        }
        break;

      case paymentMethodContainer instanceof ECheck:
        paymentMethod.name = paymentMethodContainer.checkHolderName;
        paymentMethod.narrative = paymentMethodContainer.merchantNotes;
        paymentMethod.bank_transfer = {
          account_number: paymentMethodContainer.accountNumber,
          account_type: EnumMapping.mapAccountType(
            GatewayProvider.GpApi,
            paymentMethodContainer.accountType,
          ),
          check_reference: paymentMethodContainer.checkReference,
          sec_code: paymentMethodContainer.secCode,
          bank: {
            code: paymentMethodContainer.routingNumber,
            name: paymentMethodContainer.bankName,
            address: {
              line_1:
                paymentMethodContainer.bankAddress?.streetAddress1 || null,
              line_2:
                paymentMethodContainer.bankAddress?.streetAddress2 || null,
              line_3:
                paymentMethodContainer.bankAddress?.streetAddress3 || null,
              city: paymentMethodContainer.bankAddress?.city || null,
              postal_code:
                paymentMethodContainer.bankAddress?.postalCode || null,
              state: paymentMethodContainer.bankAddress?.state || null,
              country: paymentMethodContainer.bankAddress?.countryCode || null,
            },
          },
        };
        this.maskedValues = {
          ...this.maskedValues,
          ...ProtectSensitiveData.hideValues(
            {
              "payment_method.bank_transfer.account_number":
                paymentMethodContainer.accountNumber,
              "payment_method.bank_transfer.bank.code":
                paymentMethodContainer.routingNumber,
            },
            4,
          ),
        };
        return paymentMethod;

      case paymentMethodContainer instanceof AlternativePaymentMethod:
        paymentMethod.apm = {
          provider: paymentMethodContainer.alternativePaymentMethodType,
          address_override_mode: paymentMethodContainer.addressOverrideMode
            ? paymentMethodContainer.addressOverrideMode
            : undefined,
        };
        return paymentMethod;

      default:
        break;
    }
    if (
      ![
        TransactionModifier.EncryptedMobile,
        TransactionModifier.DecryptedMobile,
      ].includes(builder.transactionModifier)
    ) {
      if (
        paymentMethodContainer instanceof CreditCardData &&
        paymentMethodContainer.token
      ) {
        paymentMethod.id = paymentMethodContainer.token;
      }

      if (!paymentMethod.id) {
        paymentMethod.card = CardUtils.generateCard(
          builder,
          GatewayProvider.GpApi,
          this.maskedValues,
        );
      }
    } else {
      /* digital wallet */
      let digitalWallet: any;
      switch (builder.transactionModifier) {
        case TransactionModifier.EncryptedMobile:
          let paymentToken = null;
          switch (paymentMethodContainer.mobileType) {
            case EncyptedMobileType.ClickToPay:
              paymentToken = { data: paymentMethodContainer.token };
              break;
            default:
              paymentToken =
                (paymentMethodContainer.token &&
                  JSON.parse(
                    paymentMethodContainer.token.replace(/(\\)(\w)/g, "$1$1$2"),
                  )) ||
                "";
          }
          digitalWallet.payment_token = paymentToken;
          break;
        default:
          break;
      }
      digitalWallet.provider = EnumMapping.mapDigitalWalletType(
        GatewayProvider.GpApi,
        paymentMethodContainer.mobileType,
      );
      paymentMethod.digital_wallet = digitalWallet;
    }

    if (builder.cardBrandTransactionId) {
      if (!(paymentMethod.card instanceof Card)) {
        paymentMethod.card = new Card();
      }
      paymentMethod.card.brand_reference = builder.cardBrandTransactionId;
    }

    paymentMethod.storage_mode = builder.requestMultiUseToken
      ? "ON_SUCCESS"
      : undefined;

    return paymentMethod;
  }

  private createFromAuthorizationBuilder(
    builder: AuthorizationBuilder,
    config: GpApiConfig,
  ): any {
    const captureMode = this.getCaptureMode(builder);

    let requestBody: any = {
      account_name: config.accessTokenInfo.transactionProcessingAccountName,
      account_id: config.accessTokenInfo.transactionProcessingAccountID,
      channel: config.channel,
      country: config.country,
      type:
        builder.transactionType === TransactionType.Refund
          ? PaymentType.REFUND
          : PaymentType.SALE,
      capture_mode: captureMode ? captureMode : CaptureMode.AUTO,
      authorization_mode: builder.allowPartialAuth ? "PARTIAL" : undefined,
      amount: StringUtils.toNumeric(builder.amount.toString()),
      currency: builder.currency,
      reference: builder.clientTransactionId
        ? builder.clientTransactionId
        : GenerationUtils.getGuuid(),
    };

    if (
      builder.paymentMethod instanceof Credit &&
      builder.paymentMethod.mobileType === EncyptedMobileType.ClickToPay
    ) {
      requestBody.masked = builder.maskedDataResponse === true ? "YES" : "NO";
    }

    requestBody.description = builder.description || undefined;
    requestBody.order = builder.orderId
      ? { reference: builder.orderId }
      : undefined;
    requestBody.gratuity_amount = builder.gratuity
      ? StringUtils.toNumeric(builder.gratuity.toString())
      : undefined;
    requestBody.surcharge_amount = builder.surchargeAmount
      ? StringUtils.toNumeric(builder.surchargeAmount)
      : undefined;
    requestBody.convenience_amount = builder.convenienceAmount
      ? StringUtils.toNumeric(builder.convenienceAmount)
      : undefined;
    requestBody.cashback_amount = builder.cashBackAmount
      ? StringUtils.toNumeric(builder.cashBackAmount.toString())
      : undefined;
    requestBody.ip_address = builder.customerIpAddress;
    requestBody.merchant_category = builder.merchantCategory || undefined;
    requestBody.payment_method = this.createPaymentMethodParam(builder, config);
    if (builder.fraudFilter) {
      requestBody.risk_assessment = [this.mapFraudManagement()];
    }

    if (builder.paymentLinkId) {
      requestBody.link = { id: builder.paymentLinkId };
    }

    if (
      builder.paymentMethod instanceof ECheck ||
      builder.paymentMethod instanceof AlternativePaymentMethod
    ) {
      requestBody.payer = this.setPayerInformation(builder);
    }

    if (builder.paymentMethod instanceof AlternativePaymentMethod) {
      const mappedOrder = this.setOrderInformation(builder, requestBody);
      requestBody = {
        ...requestBody,
        order: mappedOrder,
        ...this.setNotificationUrls(),
        amount:
          mappedOrder?.amount ||
          StringUtils.toNumeric(builder.amount.toString()),
      };
    }

    if (builder.dccRateData) {
      requestBody.currency_conversion = { id: builder.dccRateData.dccId };
    }

    if (builder.storedCredential) {
      this.setRequestStoredCredentials(builder.storedCredential, requestBody);
    }

    return requestBody;
  }

  private setNotificationUrls() {
    return {
      notifications: {
        return_url: this.builder.paymentMethod.returnUrl || undefined,
        status_url: this.builder.paymentMethod.statusUpdateUrl || undefined,
        cancel_url: this.builder.paymentMethod.cancelUrl || undefined,
      },
    };
  }

  private setOrderInformation(builder: AuthorizationBuilder, request: any) {
    let order: Record<string, any> = {};
    if (builder.orderDetails) {
      order = {
        description: builder.orderDetails.description,
      };
    }

    if (builder.shippingAddress) {
      order = {
        ...order,
        shipping_address: {
          line_1: builder.shippingAddress.streetAddress1,
          line_2: builder.shippingAddress.streetAddress2,
          line_3: builder.shippingAddress.streetAddress3,
          city: builder.shippingAddress.city,
          postal_code: builder.shippingAddress.postalCode,
          state: builder.shippingAddress.state,
          country: builder.shippingAddress.country,
        },
      };
    }

    const [phoneNumber, phoneCountryCode] = this.getPhoneNumber(
      builder,
      PhoneNumberType.SHIPPING,
    );

    if (phoneCountryCode || phoneNumber) {
      order["shipping_phone"] = {
        country_code: phoneCountryCode,
        subscriber_number: phoneNumber,
      };
    }

    switch (true) {
      case builder.paymentMethod instanceof AlternativePaymentMethod:
        if (builder.productData) {
          order = {
            ...order,
            ...this.setItemDetailsListForApm(builder),
          };
        }
        break;
    }

    if (request.order) {
      order = {
        ...order,
        ...request.order,
      };
    }

    return Object.keys(order).length ? order : undefined;
  }

  private setItemDetailsListForApm(builder: AuthorizationBuilder) {
    let taxTotalAmount = 0;
    let itemsAmount = 0;
    let orderAmount = 0;
    const items: any[] = [];
    const order: Record<string, any> = {};

    for (const product of builder.productData) {
      const qta = product.quantity ?? 0;
      const taxAmount = StringUtils.toNumeric(product.tax_amount);
      const unitAmount = StringUtils.toNumeric(product.unit_amount);

      items.push({
        reference: product.reference ?? null,
        label: product.label ?? null,
        description: product.description ?? null,
        quantity: qta,
        unit_amount: unitAmount,
        unit_currency: product.unit_currency ?? null,
        tax_amount: taxAmount,
        amount: (Number(qta) * Number(unitAmount)).toString(),
      });

      if (product.tax_amount) {
        taxTotalAmount += Number(product.tax_amount);
      }
      if (product.unit_amount) {
        itemsAmount += Number(product.quantity) * Number(product.unit_amount);
      }
    }

    order.tax_amount = StringUtils.toNumeric(taxTotalAmount.toString());
    order.item_amount = StringUtils.toNumeric(itemsAmount.toString());

    if (builder.shippingAmount) {
      order.shipping_amount = StringUtils.toNumeric(
        String(builder.shippingAmount || ""),
      );
      orderAmount += Number(builder.shippingAmount);
    }

    order.insurance_offered =
      builder.orderDetails && builder.orderDetails.hasInsurance !== undefined
        ? builder.orderDetails.hasInsurance
          ? "YES"
          : "NO"
        : null;
    order.shipping_discount = builder.shippingDiscount
      ? StringUtils.toNumeric(builder.shippingDiscount)
      : 0;

    if (builder.orderDetails && builder.orderDetails.insuranceAmount) {
      order.insurance_amount = StringUtils.toNumeric(
        String(builder.orderDetails.insuranceAmount || ""),
      );
      orderAmount += Number(builder.orderDetails.insuranceAmount);
    }

    if (builder.orderDetails && builder.orderDetails.handlingAmount) {
      order.handling_amount = StringUtils.toNumeric(
        String(builder.orderDetails.handlingAmount || ""),
      );
      orderAmount += Number(builder.orderDetails.handlingAmount);
    }

    orderAmount += itemsAmount + taxTotalAmount;
    order.amount = StringUtils.toNumeric(String(orderAmount || ""));
    order.currency = builder.currency ?? null;
    order.items = items;
    return order;
  }

  private setRequestStoredCredentials(
    storedCredential: StoredCredential,
    request: any,
  ) {
    request.initiator = null;

    if (storedCredential.initiator) {
      request.initiator = EnumMapping.mapStoredCredentialInitiator(
        GatewayProvider.GpApi,
        storedCredential.initiator,
      );
    }
    request.stored_credential = {
      model: storedCredential.type ? storedCredential.type.toUpperCase() : null,
      reason: storedCredential.reason
        ? storedCredential.reason.toUpperCase()
        : null,
      sequence: storedCredential.sequence
        ? storedCredential.sequence.toUpperCase()
        : null,
    };
  }

  private setPayerInformation(builder: AuthorizationBuilder): any {
    const payer: any = {};

    if (builder.customerId || builder.customerData?.id) {
      payer["id"] = builder.customerId || builder.customerData?.id;
    }
    if (builder.customerData) {
      payer["reference"] = builder.customerData.key;
    }

    switch (builder.paymentMethod.constructor) {
      case AlternativePaymentMethod:
        if (builder.homePhone?.countryCode || builder.homePhone?.number) {
          payer["home_phone"] = {
            country_code: builder.homePhone?.countryCode
              ? StringUtils.validateToNumber(builder.homePhone.countryCode)
              : undefined,
            subscriber_number: builder.homePhone?.number
              ? StringUtils.validateToNumber(builder.homePhone.number)
              : undefined,
          };
        }
        if (builder.workPhone?.countryCode || builder.workPhone?.number) {
          payer["work_phone"] = {
            country_code: builder.workPhone?.countryCode
              ? StringUtils.validateToNumber(builder.workPhone.countryCode)
              : undefined,
            subscriber_number: builder.workPhone?.number
              ? StringUtils.validateToNumber(builder.workPhone.number)
              : undefined,
          };
        }
        break;
      case ECheck:
        payer["billing_address"] = {
          line_1: builder.billingAddress.streetAddress1,
          line_2: builder.billingAddress.streetAddress2,
          city: builder.billingAddress.city,
          postal_code: builder.billingAddress.postalCode,
          state: builder.billingAddress.state,
          country: builder.billingAddress.countryCode,
        };
        if (builder.customerData) {
          const payerName = `${builder.customerData.firstName} ${builder.customerData.lastName}`;
          payer["name"] = payerName;
          payer["date_of_birth"] = builder.customerData.dateOfBirth;
        }
        const homePhone = this.getPhoneNumber(builder, PhoneNumberType.HOME);
        payer["landline_phone"] = homePhone[1] + homePhone[0];
        const mobilePhone = this.getPhoneNumber(
          builder,
          PhoneNumberType.MOBILE,
        );
        payer["mobile_phone"] = mobilePhone[1] + mobilePhone[0];
        break;
      default:
        break;
    }

    return Object.keys(payer).length ? payer : undefined;
  }

  private getPhoneNumber(builder: any, type: string): [string, string] {
    const phoneKey = type.toLowerCase() + "Phone";
    let phoneCountryCode = "";
    let phoneNumber = "";

    if (
      builder.customerData &&
      builder.customerData[phoneKey] &&
      builder.customerData[phoneKey] instanceof PhoneNumber
    ) {
      phoneCountryCode = builder.customerData[phoneKey].countryCode;
      phoneNumber = builder.customerData[phoneKey].number;
    }

    if (
      phoneNumber === "" &&
      builder[phoneKey] &&
      builder[phoneKey] instanceof PhoneNumber
    ) {
      phoneCountryCode = builder[phoneKey].countryCode;
      phoneNumber = builder[phoneKey].number;
    }

    return [
      StringUtils.validateToNumber(phoneNumber),
      StringUtils.validateToNumber(phoneCountryCode),
    ];
  }

  private getEntryMode(
    builder: AuthorizationBuilder,
    channel: Channel,
  ): PaymentEntryMode {
    if (channel === Channel.CardPresent) {
      if (builder.paymentMethod.isTrackData) {
        if (builder.tagData) {
          if (builder.paymentMethod.entryMethod === EntryMethod.Proximity) {
            return PaymentEntryMode.CONTACTLESS_CHIP;
          }
          return PaymentEntryMode.CHIP;
        }

        if (builder.paymentMethod.entryMethod === PaymentEntryMode.SWIPE) {
          return PaymentEntryMode.SWIPE;
        }
      }

      if (
        builder.paymentMethod.isCardData &&
        builder.paymentMethod.cardPresent
      ) {
        return PaymentEntryMode.MANUAL;
      }
      return PaymentEntryMode.SWIPE;
    } else if (channel === Channel.CardNotPresent) {
      if (builder.paymentMethod.isCardData) {
        if (builder.paymentMethod.readerPresent === true) {
          return PaymentEntryMode.ECOM;
        }

        if (
          builder.paymentMethod.readerPresent === false &&
          builder.paymentMethod.entryMethod
        ) {
          switch (builder.paymentMethod.entryMethod) {
            case ManualEntryMethod.PHONE:
              return PaymentEntryMode.PHONE;
            case ManualEntryMethod.MOTO:
              return PaymentEntryMode.MOTO;
            case ManualEntryMethod.MAIL:
              return PaymentEntryMode.MAIL;
            default:
              break;
          }
        }

        if (
          builder.transactionModifier === TransactionModifier.EncryptedMobile &&
          builder.paymentMethod instanceof CreditCardData &&
          builder.paymentMethod.hasInAppPaymentData()
        ) {
          return PaymentEntryMode.IN_APP;
        }
      }

      return PaymentEntryMode.ECOM;
    }

    throw new ApiError("Please configure the channel!");
  }

  private getCaptureMode(builder: AuthorizationBuilder): CaptureMode {
    if (builder.multiCapture) {
      return CaptureMode.MULTIPLE;
    }
    if (builder.transactionType === TransactionType.Auth) {
      return CaptureMode.LATER;
    }
    return CaptureMode.AUTO;
  }

  public mapFraudManagement(): FraudManagement {
    let rules: { reference: string; mode: FraudFilterMode }[] | undefined;

    if (this.builder.fraudRules && this.builder.fraudRules.length > 0) {
      rules = this.builder.fraudRules.map((fraudRule: FraudRule) => ({
        reference: fraudRule.key,
        mode: fraudRule.mode,
      }));
    }

    return {
      mode: this.builder.fraudFilter,
      rules: rules || undefined,
    };
  }

  public buildRequestFromJson(jsonRequest: string, config: GpApiConfig) {
    // TODO: Implement buildRequestFromJson() method.
    jsonRequest;
    config;
  }
}
