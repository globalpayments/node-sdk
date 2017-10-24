import {
  CData as cData,
  Element,
  Element as element,
  ElementTree,
  SubElement as subElement,
  XML as xml,
} from "@azz/elementtree";

import {
  AccountType,
  AliasAction,
  AuthorizationBuilder,
  CheckType,
  CreditCardData,
  CreditTrackData,
  DebitTrackData,
  EBTCardData,
  EBTTrackData,
  ECheck,
  EntryMethod,
  GatewayError,
  GiftCard,
  ICardData,
  IEncryptable,
  InquiryType,
  IPaymentGateway,
  IPaymentMethod,
  IPinProtected,
  ITokenizable,
  ITrackData,
  ManagementBuilder,
  NotImplementedError,
  PaymentMethodType,
  RecurringPaymentMethod,
  ReportBuilder,
  ReportType,
  SecCode,
  TaxType,
  Transaction,
  TransactionBuilder,
  TransactionModifier,
  TransactionReference,
  TransactionReportBuilder,
  TransactionSummary,
  TransactionType,
  UnsupportedTransactionError,
} from "../";
import {
  XmlGateway,
} from "./XmlGateway";

export class PorticoConnector extends XmlGateway implements IPaymentGateway {
  protected static XmlNamespace = "http://Hps.Exchange.PosGateway";
  public siteId: string;
  public licenseId: string;
  public deviceId: string;
  public username: string;
  public password: string;
  public secretApiKey: string;
  public developerId: string;
  public versionNumber: string;
  public supportsHostedPayments = false;

  public processAuthorization(builder: AuthorizationBuilder): Promise<Transaction> {
    // build request
    const transaction = element(this.mapRequestType(builder));
    const block1 = subElement(transaction, "Block1");
    let allowDuplicates: Element | undefined;

    if (builder.transactionType === TransactionType.Sale
      || builder.transactionType === TransactionType.Auth
    ) {
      if (builder.paymentMethod.paymentMethodType !== PaymentMethodType.Gift
        && builder.paymentMethod.paymentMethodType !== PaymentMethodType.ACH
      ) {
        allowDuplicates = subElement(block1, "AllowDup");
        allowDuplicates.append(cData(builder.allowDuplicates ? "Y" : "N"));

        if (builder.transactionModifier === TransactionModifier.None
          && builder.paymentMethod.paymentMethodType !== PaymentMethodType.EBT
          && builder.paymentMethod.paymentMethodType !== PaymentMethodType.Recurring
        ) {
          subElement(block1, "AllowPartialAuth").append(cData(builder.allowPartialAuth ? "Y" : "N"));
        }
      }
    }

    if (builder.amount !== undefined && builder.amount !== "") {
      subElement(block1, "Amt").append(cData(builder.amount.toString()));
    }
    if (builder.gratuity) {
      subElement(block1, "GratuityAmtInfo").append(cData(builder.gratuity.toString()));
    }
    if (builder.convenienceAmt) {
      subElement(block1, "ConvenienceAmtInfo").append(cData(builder.convenienceAmt.toString()));
    }
    if (builder.shippingAmt) {
      subElement(block1, "ShippingAmtInfo").append(cData(builder.shippingAmt.toString()));
    }

    if (builder.cashBackAmount !== undefined && builder.cashBackAmount !== "") {
      subElement(
        block1,
        // because plano
        builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit
          ? "CashbackAmtInfo"
          : "CashBackAmount",
      ).append(cData(builder.cashBackAmount.toString()));
    }

    if (builder.offlineAuthCode) {
      subElement(block1, "OfflineAuthCode").append(cData(builder.offlineAuthCode));
    }

    if (builder.transactionType === TransactionType.Alias) {
      subElement(block1, "Action").append(cData(builder.aliasAction.toString()));
      subElement(block1, "Alias").append(cData(builder.alias));
    }

    const isCheck = builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH;
    if (isCheck || builder.billingAddress) {
      const holder = subElement(block1, isCheck ? "ConsumerInfo" : "CardHolderData");

      if (builder.billingAddress) {
        subElement(holder, isCheck ? "Address1" : "CardHolderAddr").append(cData(builder.billingAddress.streetAddress1));
        subElement(holder, isCheck ? "City" : "CardHolderCity").append(cData(builder.billingAddress.city));
        subElement(holder, isCheck ? "State" : "CardHolderState")
          .append(cData(builder.billingAddress.province || builder.billingAddress.state));
        subElement(holder, isCheck ? "Zip" : "CardHolderZip").append(cData(builder.billingAddress.postalCode));
      }

      if (isCheck) {
        const check = builder.paymentMethod as ECheck;

        if (check.checkHolderName) {
          const names = check.checkHolderName.split(" ", 2);
          subElement(holder, "FirstName").append(cData(names[0]));
          subElement(holder, "LastName").append(cData(names[1]));
        }

        subElement(holder, "CheckName").append(cData(check.checkName || check.checkHolderName));
        subElement(holder, "PhoneNumber").append(cData(check.phoneNumber));
        subElement(holder, "DLNumber").append(cData(check.driversLicenseNumber));
        subElement(holder, "DLState").append(cData(check.driversLicenseState));

        if (check.ssnLast4 || check.birthYear) {
          const identity = subElement(holder, "IdentityInfo");
          subElement(identity, "SSNL4").append(cData(check.ssnLast4));
          subElement(identity, "DOBYear").append(cData(check.birthYear));
        }
      }
    }

    const {hasToken, tokenValue} = this.hasToken(builder.paymentMethod);

    let cardData: Element;
    if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit
      || builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH
    ) {
      cardData = block1;
    } else {
      cardData = element("CardData");
    }

    if (builder.paymentMethod.isCardData) {
      const card = (builder.paymentMethod as any) as ICardData;

      const manualEntry = subElement(cardData, hasToken ? "TokenData" : "ManualEntry");
      subElement(manualEntry, hasToken ? "TokenValue" : "CardNbr").append(cData(tokenValue || card.number));
      subElement(manualEntry, "ExpMonth").append(cData(card.expMonth.toString()));
      subElement(manualEntry, "ExpYear").append(cData(card.expYear.toString()));
      subElement(manualEntry, "CVV2").append(cData(card.cvn));
      subElement(manualEntry, "ReaderPresent").append(cData(card.readerPresent ? "Y" : "N"));
      subElement(manualEntry, "CardPresent").append(cData(card.cardPresent ? "Y" : "N"));
      block1.append(cardData);

      if (builder.transactionModifier === TransactionModifier.Recurring) {
        const recurring = subElement(block1, "RecurringData");
        subElement(recurring, "ScheduleID").append(cData(builder.scheduleId));
        subElement(recurring, "OneTime").append(cData(builder.oneTimePayment ? "Y" : "N"));
      }
    } else if (builder.paymentMethod.isTrackData) {
      const track = (builder.paymentMethod as any) as ITrackData;

      const trackData = subElement(cardData, hasToken ? "TokenData" : "TrackData");
      if (!hasToken) {
        trackData.append(cData(track.value));
        if (builder.paymentMethod.paymentMethodType !== PaymentMethodType.Debit) {
          trackData.set("method", track.entryMethod === EntryMethod.Swipe ? "swipe" : "proximity");
          block1.append(cardData);
        }
      } else if (tokenValue) {
        subElement(trackData, "TokenValue").append(cData(tokenValue));
      }
    } else if (builder.paymentMethod instanceof GiftCard) {
      const card = builder.paymentMethod;

      if (builder.currency) {
        subElement(block1, "Currency").append(cData(builder.currency.toUpperCase()));
      }

      // if it's replace, add the new card, and change the card data name to be old card data
      if (builder.transactionType === TransactionType.Replace) {
        const newCardData = subElement(block1, "NewCardData");
        subElement(newCardData, builder.replacementCard.valueType).append(cData(builder.replacementCard.value));
        subElement(newCardData, "PIN").append(cData(builder.replacementCard.pin));

        cardData = element("OldCardData");
      }

      subElement(cardData, card.valueType).append(cData(card.value));
      if (card.pin) {
        subElement(cardData, "PIN").append(cData(card.pin));
      }

      if (builder.aliasAction !== AliasAction.Create) {
        block1.append(cardData);
      }
    } else if (builder.paymentMethod instanceof ECheck) {
      const check = builder.paymentMethod;

      subElement(block1, "CheckAction").append(cData("SALE"));

      if (!hasToken) {
        const accountInfo = subElement(block1, "AccountInfo");
        subElement(accountInfo, "RoutingNumber").append(cData(check.routingNumber));
        subElement(accountInfo, "AccountNumber").append(cData(check.accountNumber));
        subElement(accountInfo, "CheckNumber").append(cData(check.checkNumber));
        subElement(accountInfo, "MICRData").append(cData(check.micrNumber));
        subElement(accountInfo, "AccountType").append(cData(check.accountType.toString()));
      } else if (tokenValue) {
        subElement(block1, "TokenValue").append(cData(tokenValue));
      }

      subElement(block1, "DataEntryMode").append(cData(check.entryMode.toString().toUpperCase()));
      subElement(block1, "CheckType").append(cData(check.checkType.toString()));
      subElement(block1, "SECCode").append(cData(check.secCode.toString()));

      const verify = subElement(block1, "VerifyInfo");
      subElement(verify, "CheckVerify").append(cData(check.checkVerify ? "Y" : "N"));
      subElement(verify, "ACHVerify").append(cData(check.achVerify ? "Y" : "N"));
    }

    if (builder.paymentMethod instanceof TransactionReference) {
      const reference = builder.paymentMethod;
      if (reference.transactionId) {
        subElement(block1, "GatewayTxnId").append(cData(reference.transactionId));
      }
      if (reference.clientTransactionId) {
        subElement(block1, "ClientTxnId").append(cData(reference.clientTransactionId));
      }
    }

    if (builder.paymentMethod instanceof RecurringPaymentMethod) {
      const method = builder.paymentMethod;

      if (method.paymentType === "ACH") {
        if (allowDuplicates) {
          block1.remove(allowDuplicates);
        }
        subElement(block1, "CheckAction").append(cData("SALE"));
      }

      subElement(block1, "PaymentMethodKey").append(cData(method.key));

      if (method.paymentMethod && method.paymentMethod instanceof CreditCardData) {
        const card = method.paymentMethod;
        const data = subElement(block1, "PaymentMethodKeyData");
        subElement(data, "ExpMonth").append(cData(card.expMonth));
        subElement(data, "ExpYear").append(cData(card.expYear));
        subElement(data, "CVV2").append(cData(card.cvn));
      }

      const recurring = subElement(block1, "RecurringData");
      subElement(recurring, "ScheduleID").append(cData(builder.scheduleId));
      subElement(recurring, "OneTime").append(cData(builder.oneTimePayment ? "Y" : "N"));
    }

    if (builder.paymentMethod.isPinProtected && builder.transactionType !== TransactionType.Reversal) {
      subElement(block1, "PinBlock").append(cData(((builder.paymentMethod as any) as IPinProtected).pinBlock));
    }

    if (builder.paymentMethod.isEncryptable) {
      const encryptionData = ((builder.paymentMethod as any) as IEncryptable).encryptionData;

      if (encryptionData) {
        const enc = subElement(cardData, "EncryptionData");
        if (encryptionData.version) {
          subElement(enc, "Version").append(cData(encryptionData.version));
        }
        if (encryptionData.trackNumber) {
          subElement(enc, "EncryptedTrackNumber").append(cData(encryptionData.trackNumber));
        }
        if (encryptionData.ktb) {
          subElement(enc, "KTB").append(cData(encryptionData.ktb));
        }
        if (encryptionData.ksn) {
          subElement(enc, "KSN").append(cData(encryptionData.ksn));
        }
      }
    }

    if (builder.paymentMethod.isTokenizable && builder.paymentMethod.paymentMethodType !== PaymentMethodType.ACH) {
      subElement(cardData, "TokenRequest").append(cData("Y"));
    }

    if (builder.paymentMethod.isBalanceable && builder.balanceInquiryType) {
      subElement(block1, "BalanceInquiryType").append(cData(builder.balanceInquiryType.toString()));
    }

    if (builder.level2Request) {
      subElement(block1, "CPCReq").append(cData("Y"));
    }

    if (builder.customerId || builder.description || builder.invoiceNumber) {
      const fields = subElement(block1, "AdditionalTxnFields");
      subElement(fields, "CustomerID").append(cData(builder.customerId));
      subElement(fields, "Description").append(cData(builder.description));
      subElement(fields, "InvoiceNbr").append(cData(builder.invoiceNumber));
    }

    if (builder.ecommerceInfo) {
      if (builder.ecommerceInfo.channel) {
        subElement(block1, "Ecommerce").append(cData(builder.ecommerceInfo.channel.toString()));
      }

      if (builder.invoiceNumber || builder.ecommerceInfo.shipMonth) {
        const direct = subElement(block1, "DirectMktData");
        subElement(direct, "DirectMktInvoiceNbr").append(cData(builder.invoiceNumber));
        subElement(direct, "DirectMktShipDay").append(cData(builder.ecommerceInfo.shipDay));
        subElement(direct, "DirectMktShipMonth").append(cData(builder.ecommerceInfo.shipMonth));
      }

      if (builder.ecommerceInfo.cavv || builder.ecommerceInfo.eci || builder.ecommerceInfo.xid) {
        const secure = subElement(block1, "SecureECommerce");
        subElement(secure, "PaymentDataSource").append(cData(builder.ecommerceInfo.paymentDataSource));
        subElement(secure, "TypeOfPaymentData").append(cData(builder.ecommerceInfo.paymentDataType));
        subElement(secure, "PaymentData").append(cData(builder.ecommerceInfo.cavv));
        subElement(secure, "ECommerceIndicator").append(cData(builder.ecommerceInfo.eci));
        subElement(secure, "XID").append(cData(builder.ecommerceInfo.xid));
      }
    }

    if (builder.dynamicDescriptor) {
      subElement(block1, "TxnDescriptor").append(cData(builder.dynamicDescriptor));
    }

    return this.doTransaction(this.buildEnvelope(transaction, builder.clientTransactionId))
      .then((response) => this.mapResponse(response, builder));
  }

  public serializeRequest(_builder: AuthorizationBuilder): string {
    throw new UnsupportedTransactionError("Portico does not support hosted payments.");
  }

  public manageTransaction(builder: ManagementBuilder): Promise<Transaction> {
    // build request
    const transaction = element(this.mapRequestType(builder));

    if (builder.transactionType !== TransactionType.BatchClose) {
      let root: Element;
      if (builder.transactionType === TransactionType.Reversal
        || builder.transactionType === TransactionType.Refund
        || builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift
        || builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH
      ) {
        root = new Element("Block1");
      } else {
        root = transaction;
      }

      // amount
      if (builder.amount) {
        subElement(root, "Amt").append(cData(builder.amount.toString()));
      }

      // auth amount
      if (builder.authAmount) {
        subElement(root, "AuthAmt").append(cData(builder.authAmount.toString()));
      }

      // gratuity
      if (builder.gratuity) {
        subElement(root, "GratuityAmtInfo").append(cData(builder.gratuity.toString()));
      }

      if (builder.clientTransactionId) {
        subElement(root, "ClientTxnId").append(cData(builder.clientTransactionId));
      }

      // transaction ID
      if (builder.paymentMethod && ((builder.paymentMethod as object) as TransactionReference).transactionId) {
        const ref = (builder.paymentMethod as object) as TransactionReference;
        subElement(root, "GatewayTxnId").append(cData(ref.transactionId));
      }

      // level II Data
      if (builder.transactionType === TransactionType.Edit
        && builder.transactionModifier === TransactionModifier.LevelII) {
        const cpc = subElement(root, "CPCData");
        if (builder.poNumber) {
          subElement(cpc, "CardHolderPONbr").append(cData(builder.poNumber));
        }
        if (builder.taxType) {
          subElement(cpc, "TaxType")
            .append(cData(this.hydrateTaxType(builder.taxType)));
        }
        if (builder.taxAmount) {
          subElement(cpc, "TaxAmt").append(cData(builder.taxAmount.toString()));
        }
      }

      if (builder.transactionType === TransactionType.Reversal
        || builder.transactionType === TransactionType.Refund
        || builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift
        || builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH
      ) {
        transaction.append(root);
      }
    }

    return this.doTransaction(this.buildEnvelope(transaction, builder.clientTransactionId))
      .then((response) => this.mapResponse(response, builder));
  }

  public processReport<T>(builder: ReportBuilder<T>): Promise<T> {
    const transaction = element(this.mapReportRequestType(builder));

    if (builder.timeZoneConversion) {
      subElement(transaction, "TzConversion").append(cData(builder.timeZoneConversion.toString()));
    }

    if (builder instanceof TransactionReportBuilder) {
      const trb = builder as TransactionReportBuilder<T>;

      if (trb.deviceId) {
        subElement(transaction, "DeviceId").append(cData(trb.deviceId));
      }

      if (trb.startDate) {
        subElement(transaction, "RptStartUtcDT").append(cData(trb.startDate.toISOString()));
      }

      if (trb.endDate) {
        subElement(transaction, "RptEndUtcDT").append(cData(trb.endDate.toISOString()));
      }

      if (trb.transactionId) {
        subElement(transaction, "TxnId").append(cData(trb.transactionId));
      }
    }
    return this.doTransaction(this.buildEnvelope(transaction))
      .then((response) => this.mapReportResponse(response, builder));
  }

  protected buildEnvelope(transaction: Element, clientTransactionId?: string): string {
    const envelope = element("soap:Envelope", {
      "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
    });
    const body = subElement(envelope, "soap:Body");
    const request = subElement(body, "PosRequest", {xmlns: PorticoConnector.XmlNamespace});
    const version1 = subElement(request, "Ver1.0");

    // header
    const header = subElement(version1, "Header");
    if (this.secretApiKey) {
      subElement(header, "SecretAPIKey").append(cData(this.secretApiKey));
    }
    if (this.siteId) {
      subElement(header, "SiteId").append(cData(this.siteId));
    }
    if (this.licenseId) {
      subElement(header, "LicenseId").append(cData(this.licenseId));
    }
    if (this.deviceId) {
      subElement(header, "DeviceId").append(cData(this.deviceId));
    }
    if (this.username) {
      subElement(header, "UserName").append(cData(this.username));
    }
    if (this.password) {
      subElement(header, "Password").append(cData(this.password));
    }
    if (this.developerId) {
      subElement(header, "DeveloperID").append(cData(this.developerId));
    }
    if (this.versionNumber) {
      subElement(header, "VersionNumber").append(cData(this.versionNumber));
    }
    if (clientTransactionId) {
      subElement(header, "ClientTxnId").append(cData(clientTransactionId));
    }

    // transaction
    subElement(version1, "Transaction").append(transaction);
    return new ElementTree(envelope).write();
  }

  protected mapRequestType(builder: TransactionBuilder<Transaction>): string {
    switch (builder.transactionType) {
      case TransactionType.BatchClose:
        return "BatchClose";
      case TransactionType.Decline:
        if (builder.transactionModifier === TransactionModifier.ChipDecline) {
          return "ChipCardDecline";
        } else if (builder.transactionModifier === TransactionModifier.FraudDecline) {
          return "OverrideFraudDecline";
        }
        throw new UnsupportedTransactionError();
      case TransactionType.Verify:
        return "CreditAccountVerify";
      case TransactionType.Capture:
        return "CreditAddToBatch";
      case TransactionType.Auth:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          if (builder.transactionModifier === TransactionModifier.Additional) {
            return "CreditAdditionalAuth";
          } else if (builder.transactionModifier === TransactionModifier.Incremental) {
            return "CreditIncrementalAuth";
          } else if (builder.transactionModifier === TransactionModifier.Offline) {
            return "CreditOfflineAuth";
          } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Recurring) {
            return "RecurringBillingAuth";
          }

          return "CreditAuth";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Recurring) {
          return "RecurringBillingAuth";
        }
        throw new UnsupportedTransactionError();
      case TransactionType.Sale:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          if (builder.transactionModifier === TransactionModifier.Offline) {
            return "CreditOfflineSale";
          } else if (builder.transactionModifier === TransactionModifier.Recurring) {
            return "RecurringBilling";
          } else {
            return "CreditSale";
          }
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Recurring) {
          if (builder.paymentMethod.paymentType === "ACH") {
            return "CheckSale";
          }
          return "RecurringBilling";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit) {
          return "DebitSale";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Cash) {
          return "CashSale";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH) {
          return "CheckSale";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.EBT) {
          if (builder.transactionModifier === TransactionModifier.CashBack) {
            return "EBTCashBackPurchase";
          } else if (builder.transactionModifier === TransactionModifier.Voucher) {
            return "EBTVoucherPurchase";
          } else {
            return "EBTFSPurchase";
          }
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardSale";
        }
        throw new UnsupportedTransactionError();
      case TransactionType.Refund:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          return "CreditReturn";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit) {
          if (builder.paymentMethod instanceof TransactionReference) {
            throw new UnsupportedTransactionError();
          }
          return "DebitReturn";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Cash) {
          return "CashReturn";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.EBT) {
          if (builder.paymentMethod instanceof TransactionReference) {
            throw new UnsupportedTransactionError();
          }
          return "EBTFSReturn";
        }
        throw new UnsupportedTransactionError();
      case TransactionType.Reversal:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          return "CreditReversal";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit) {
          if (builder.paymentMethod instanceof TransactionReference) {
            throw new UnsupportedTransactionError();
          }
          return "DebitReversal";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardReversal";
        }
        throw new UnsupportedTransactionError();
      case TransactionType.Edit:
        if (builder.transactionModifier === TransactionModifier.LevelII) {
          return "CreditCPCEdit";
        }
        return "CreditTxnEdit";
      case TransactionType.Void:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          return "CreditVoid";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.ACH) {
          return "CheckVoid";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardVoid";
        }
        throw new UnsupportedTransactionError();
      case TransactionType.AddValue:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          return "PrePaidAddValue";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit) {
          return "DebitAddValue";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardAddValue";
        }
        throw new UnsupportedTransactionError();
      case TransactionType.Balance:
        if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Credit) {
          return "PrePaidBalanceInquiry";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.EBT) {
          return "EBTBalanceInquiry";
        } else if (builder.paymentMethod.paymentMethodType === PaymentMethodType.Gift) {
          return "GiftCardBalance";
        }
        throw new UnsupportedTransactionError();
      case TransactionType.BenefitWithDrawal:
        return "EBTCashBenefitWithdrawal";
      case TransactionType.Activate:
        return "GiftCardActivate";
      case TransactionType.Alias:
        return "GiftCardAlias";
      case TransactionType.Deactivate:
        return "GiftCardDeactivate";
      case TransactionType.Replace:
        return "GiftCardReplace";
      case TransactionType.Reward:
        return "GiftCardReward";
      default:
        break;
    }

    throw new NotImplementedError();
  }

  protected mapReportRequestType<T>(builder: ReportBuilder<T>): string {
    switch (builder.reportType) {
      case ReportType.Activity:
        return "ReportActivity";
      case ReportType.TransactionDetail:
        return "ReportTxnDetail";
      default:
        throw new UnsupportedTransactionError();
    }
  }

  protected mapResponse(rawResponse: string, builder: TransactionBuilder<Transaction>): Transaction {
    const result = new Transaction();
    const root = xml(rawResponse).find(".//PosResponse");
    const acceptedCodes = [ "00", "0", "85", "10" ];

    const gatewayRspCode = this.normalizeResponse(root.findtext(".//GatewayRspCode"));
    const gatewayRspText = root.findtext(".//GatewayRspMsg");

    if (acceptedCodes.indexOf(gatewayRspCode) === -1) {
      throw new GatewayError(`Unexpected Gateway Response: ${gatewayRspCode} - ${gatewayRspText}`);
    }

    result.responseCode = root.findtext(".//RspCode")
      ? this.normalizeResponse(root.findtext(".//RspCode"))
      : gatewayRspCode;
    result.responseMessage = root.findtext(".//RspText")
      ? root.findtext(".//RspText")
      : gatewayRspText;

    result.authorizedAmount = root.findtext(".//AuthAmt");
    result.availableBalance = root.findtext(".//AvailableBalance");
    result.avsResponseCode = root.findtext(".//AVSRsltCode");
    result.avsResponseMessage = root.findtext(".//AVSRsltText");
    result.balanceAmount = root.findtext(".//BalanceAmt");
    result.cardType = root.findtext(".//CardType");
    result.cardLast4 = root.findtext(".//TokenPANLast4");
    result.cavvResponseCode = root.findtext(".//CAVVResultCode");
    result.commercialIndicator = root.findtext(".//CPCInd");
    result.cvnResponseCode = root.findtext(".//CVVRsltCode");
    result.cvnResponseMessage = root.findtext(".//CVVRsltText");
    result.pointsBalanceAmount = root.findtext(".//PointsBalanceAmt");
    result.recurringDataCode = root.findtext(".//RecurringDataCode");
    result.referenceNumber = root.findtext(".//RefNbr");
    result.transactionDescriptor = root.findtext(".//TxnDescriptor");

    if (builder.paymentMethod) {
      result.transactionReference = new TransactionReference(root.findtext(".//GatewayTxnId"));
      result.transactionReference.paymentMethodType = builder.paymentMethod.paymentMethodType;
    }

    if (root.findtext(".//AuthCode")) {
      result.transactionReference = result.transactionReference || new TransactionReference();
      result.transactionReference.authCode = root.findtext(".//AuthCode");
    }

    if (root.find(".//TokenData") && root.find(".//TokenData").findtext(".//TokenValue")) {
      const tokenData = root.find(".//TokenData");
      result.token = tokenData.findtext(".//TokenValue");
    }

    if (root.find(".//CardData")) {
      const cardData = root.find(".//CardData");
      result.giftCard = new GiftCard();
      result.giftCard.number = cardData.findtext(".//CardNbr");
      result.giftCard.alias = cardData.findtext(".//Alias");
      result.giftCard.pin = cardData.findtext(".//PIN");
    }

    return result;
  }

  protected mapReportResponse<T>(rawResponse: string, builder: ReportBuilder<T>): T {
    // todo: handle non-200 responses

    const posResponse = xml(rawResponse).find(".//PosResponse");
    const doc = posResponse.find(`.//${this.mapReportRequestType(builder)}`);

    let result: any;

    if (builder.reportType === ReportType.Activity) {
      result = doc.findall(".//Details")
        .map(this.hydrateTransactionSummary.bind(this));
    } else if (builder.reportType === ReportType.TransactionDetail) {
      result = this.hydrateTransactionSummary(doc);
    }

    return result;
  }

  protected normalizeResponse(input: string) {
    if (["0", "85"].indexOf(input) !== -1) {
      input = "00";
    }

    return input;
  }

  protected hasToken(paymentMethod: IPaymentMethod) {
    const tokenizable = (paymentMethod as object) as ITokenizable;

    if (tokenizable.token) {
      return {
        hasToken: true,
        tokenValue: tokenizable.token,
      };
    }

    return {
      hasToken: false,
      tokenValue: "",
    };
  }

  protected hydrateAccountType(type: AccountType) {
    switch (type) {
      case AccountType.Checking:
        return "CHECKING";
      case AccountType.Savings:
        return "SAVINGS";
      default:
        return "";
    }
  }

  protected hydrateCheckType(type: CheckType) {
    switch (type) {
      case CheckType.Business:
        return "BUSINESS";
      case CheckType.Payroll:
        return "PAYROLL";
      case CheckType.Personal:
        return "PERSONAL";
      default:
        return "";
    }
  }

  protected hydrateEncryptionData(builder: TransactionBuilder<Transaction>) {
    const enc = new Element("EncryptionData");
    const data = ((builder.paymentMethod as object) as IEncryptable).encryptionData;

    if (data.version) {
      subElement(enc, "Version").append(cData(data.version));
    }

    if (data.trackNumber) {
      subElement(enc, "TrackNumber").append(cData(data.trackNumber));
    }

    if (data.ktb) {
      subElement(enc, "KTB").append(cData(data.ktb));
    }

    if (data.ksn) {
      subElement(enc, "KSN").append(cData(data.ksn));
    }

    return enc;
  }

  protected hydrateEntryMethod(method: EntryMethod) {
    switch (method) {
      case EntryMethod.Manual:
        return "Manual";
      case EntryMethod.Proximity:
        return "Proximity";
      case EntryMethod.Swipe:
        return "Swipe";
      default:
        return "";
    }
  }

  protected hydrateHolder(builder: AuthorizationBuilder, isCheck: boolean): Element {
    const holder = new Element(isCheck ? "ConsumerInfo" : "CardHolderData");
    subElement(holder, isCheck ? "Address1" : "CardHolderAddr")
      .append(cData(builder.billingAddress.streetAddress1));
    subElement(holder, isCheck ? "City" : "CardHolderCity")
      .append(cData(builder.billingAddress.city));
    subElement(holder, isCheck ? "State" : "CardHolderState")
      .append(cData(builder.billingAddress.province));
    subElement(holder, isCheck ? "Zip" : "CardHolderZip")
      .append(cData(builder.billingAddress.postalCode));

    if (isCheck) {
      const check = builder.paymentMethod as ECheck;
      if (check.checkName) {
        const names = check.checkName.split(" ", 2);
        subElement(holder, "FirstName").append(cData(names[0]));

        if (names[1]) {
          subElement(holder, "LastName").append(cData(names[1]));
        }

        subElement(holder, "CheckName").append(cData(check.checkName));
      }

      if (check.phoneNumber) {
        subElement(holder, "PhoneNumber").append(cData(check.phoneNumber));
      }

      if (check.driversLicenseNumber) {
        subElement(holder, "DLNumber").append(cData(check.driversLicenseNumber));
      }

      if (check.driversLicenseState) {
        subElement(holder, "DLState").append(cData(check.driversLicenseState));
      }

      if (check.ssnLast4 || check.birthYear) {
        const identity = subElement(holder, "IdentityInfo");
        subElement(identity, "SSNL4").append(cData(check.ssnLast4));
        subElement(identity, "DOBYear").append(cData(check.birthYear));
      }
    }

    return holder;
  }

  protected hydrateInquiryType(type: InquiryType) {
    switch (type) {
      case InquiryType.Cash:
        return "CASH";
      case InquiryType.Foodstamp:
        return "FOODSTAMP";
      case InquiryType.Points:
        return "POINTS";
      case InquiryType.Standard:
        return "STANDARD";
      default:
        return "";
    }
  }

  protected hydrateManualEntry(block1: Element, builder: TransactionBuilder<Transaction>, hasToken: boolean, tokenValue: string) {
    const me = new Element(hasToken ? "TokenData" : "ManualEntry");
    let card: CreditCardData | EBTCardData;
    if (builder.paymentMethod instanceof CreditCardData) {
      card = builder.paymentMethod as CreditCardData;
    } else {
      card = builder.paymentMethod as EBTCardData;
    }

    if (card.number || hasToken) {
      subElement(me, hasToken ? "TokenValue" : "CardNbr")
        .append(cData(hasToken ? tokenValue : card.number));
    }

    if (card.expMonth) {
      subElement(me, "ExpMonth").append(cData(card.expMonth));
    }

    if (card.expYear) {
      subElement(me, "ExpYear").append(cData(card.expYear));
    }

    if (card.cvn) {
      subElement(me, "CVV2").append(cData(card.cvn));
    }

    subElement(me, "ReaderPresent").append(cData(card.readerPresent ? "Y" : "N"));
    subElement(me, "CardPresent").append(cData(card.cardPresent ? "Y" : "N"));

    if (builder.transactionModifier === TransactionModifier.Recurring) {
      const recurring = subElement(block1, "RecurringData");
      subElement(recurring, "ScheduleID").append(cData((builder as AuthorizationBuilder).scheduleId));
      subElement(recurring, "OneTime").append(cData((builder as AuthorizationBuilder).oneTimePayment ? "Y" : "N"));
    }

    return me;
  }

  protected hydrateSecCode(code: SecCode) {
    switch (code) {
      case SecCode.CCD:
        return "CCD";
      case SecCode.PPD:
        return "PPD";
      case SecCode.POP:
        return "POP";
      case SecCode.WEB:
        return "WEB";
      case SecCode.TEL:
        return "TEL";
      case SecCode.EBronze:
        return "EBRONZE";
      default:
        return "";
    }
  }

  protected hydrateTaxType(type: TaxType) {
    switch (type) {
      case TaxType.NotUsed:
        return "NOTUSED";
      case TaxType.SalesTax:
        return "SALESTAX";
      case TaxType.TaxExempt:
        return "TAXEXEMPT";
      default:
        return "";
    }
  }

  protected hydrateTrackData(builder: TransactionBuilder<Transaction>, hasToken: boolean, tokenValue: string) {
    const trackData = new Element(hasToken ? "TokenValue" : "TrackData");

    if (hasToken) {
      subElement(trackData, "TokenValue").append(cData(tokenValue));
      return trackData;
    }

    let track: CreditTrackData | DebitTrackData | EBTTrackData;
    if (builder.paymentMethod instanceof CreditTrackData) {
      track = builder.paymentMethod as CreditTrackData;
    } else if (builder.paymentMethod instanceof DebitTrackData) {
      track = builder.paymentMethod as DebitTrackData;
    } else {
      track = builder.paymentMethod as EBTTrackData;
    }

    trackData.append(cData(track.value));
    if (track.paymentMethodType !== PaymentMethodType.Debit) {
      trackData.set("method", track.entryMethod === EntryMethod.Swipe ? "swipe" : "proximity");
    }

    return trackData;
  }

  protected hydrateTransactionSummary(root: Element): TransactionSummary {
    const result = new TransactionSummary();

    result.amount = root.findtext(".//Amt");
    result.authorizedAmount = root.findtext(".//AuthAmt");
    result.authCode = root.findtext(".//AuthCode");
    result.clientTransactionId = root.findtext(".//ClientTxnId");
    result.deviceId = root.findtext(".//DeviceId");
    result.issuerResponseCode = this.normalizeResponse(root.findtext(".//IssuerRspCode"));
    result.issuerResponseMessage = root.findtext(".//IssuerRspText");
    result.maskedCardNumber = root.findtext(".//MaskedCardNbr");
    result.originalTransactionId = root.findtext(".//OriginalGatewayTxnId");
    result.gatewayResponseCode = this.normalizeResponse(root.findtext(".//GatewayRspCode"));
    result.gatewayResponseMessage = root.findtext(".//GatewayRspMsg");
    result.referenceNumber = root.findtext(".//RefNbr");
    result.serviceName = root.findtext(".//ServiceName");
    result.settlementAmount = root.findtext(".//SettlementAmt");
    result.status = root.findtext(".//Status");
    result.transactionDate = new Date(root.findtext(".//TxnUtcDT"));
    result.transactionId = root.findtext(".//GatewayTxnId");
    result.convenienceAmt = root.findtext(".//ConvenienceAmtInfo");
    result.shippingAmt = root.findtext(".//ShippingAmtInfo");

    return result;
  }
}
