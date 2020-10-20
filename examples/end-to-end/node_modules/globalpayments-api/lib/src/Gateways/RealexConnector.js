"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var elementtree_1 = require("@azz/elementtree");
var _1 = require("../");
var XmlGateway_1 = require("./XmlGateway");
var RealexConnector = /** @class */ (function (_super) {
    __extends(RealexConnector, _super);
    function RealexConnector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.supportsHostedPayments = true;
        _this.supportsRetrieval = false;
        _this.supportsUpdatePaymentDetails = true;
        return _this;
    }
    RealexConnector.prototype.processAuthorization = function (builder) {
        var _this = this;
        var timestamp = _1.GenerationUtils.generateTimestamp();
        var orderId = builder.orderId
            ? builder.orderId
            : _1.GenerationUtils.generateOrderId();
        // build Request
        var request = elementtree_1.Element("request", {
            timestamp: timestamp,
            type: this.mapAuthRequestType(builder),
        });
        if (this.merchantId) {
            elementtree_1.SubElement(request, "merchantid").append(elementtree_1.CData(this.merchantId));
        }
        if (this.accountId) {
            elementtree_1.SubElement(request, "account").append(elementtree_1.CData(this.accountId));
        }
        if (this.channel) {
            elementtree_1.SubElement(request, "channel").append(elementtree_1.CData(this.channel));
        }
        elementtree_1.SubElement(request, "orderid").append(elementtree_1.CData(orderId));
        if (builder.amount) {
            var amountAttrs = builder.currency
                ? { currency: builder.currency }
                : {};
            elementtree_1.SubElement(request, "amount", amountAttrs).append(elementtree_1.CData(this.numberFormat(builder.amount)));
        }
        // hydrate the payment data fields
        if (builder.paymentMethod instanceof _1.CreditCardData) {
            var card = builder.paymentMethod;
            if (builder.transactionModifier === _1.TransactionModifier.EncryptedMobile) {
                elementtree_1.SubElement(request, "token").append(elementtree_1.CData(card.token));
                elementtree_1.SubElement(request, "mobile").append(elementtree_1.CData(card.mobileType));
            }
            else {
                var cardElement = elementtree_1.SubElement(request, "card");
                elementtree_1.SubElement(cardElement, "number").append(elementtree_1.CData(card.number));
                var date = _1.StringUtils.leftPad(card.expMonth, 2, "0") +
                    _1.StringUtils.leftPad((card.expYear || "").substr(2, 2), 2, "0");
                elementtree_1.SubElement(cardElement, "expdate").append(elementtree_1.CData(date));
                elementtree_1.SubElement(cardElement, "type").append(elementtree_1.CData(card.getCardType().toUpperCase()));
                elementtree_1.SubElement(cardElement, "chname").append(elementtree_1.CData(card.cardHolderName));
                if (card.cvn) {
                    var cvnElement = elementtree_1.SubElement(cardElement, "cvn");
                    elementtree_1.SubElement(cvnElement, "number").append(elementtree_1.CData(card.cvn));
                    elementtree_1.SubElement(cvnElement, "presind").append(elementtree_1.CData(card.cvnPresenceIndicator.toString()));
                }
                // issueno
            }
            var isVerify = builder.transactionType === _1.TransactionType.Verify;
            elementtree_1.SubElement(request, "sha1hash").append(elementtree_1.CData(this.generateHash(timestamp, orderId, builder.amount ? this.numberFormat(builder.amount) : "", builder.currency, builder.transactionModifier === _1.TransactionModifier.EncryptedMobile
                ? card.token
                : card.number, isVerify)));
        }
        if (builder.paymentMethod instanceof _1.RecurringPaymentMethod) {
            var recurring = builder.paymentMethod;
            elementtree_1.SubElement(request, "payerref").append(elementtree_1.CData(recurring.customerKey));
            elementtree_1.SubElement(request, "paymentmethod").append(elementtree_1.CData(recurring.key || recurring.id));
            if (builder.cvn) {
                var paymentData = elementtree_1.SubElement(request, "paymentdata");
                var cvn = elementtree_1.SubElement(paymentData, "cvn");
                elementtree_1.SubElement(cvn, "number").append(elementtree_1.CData(builder.cvn));
            }
            var isVerify = builder.transactionType === _1.TransactionType.Verify;
            elementtree_1.SubElement(request, "sha1hash").append(elementtree_1.CData(this.generateHash(timestamp, orderId, builder.amount ? this.numberFormat(builder.amount) : "", builder.currency, recurring.customerKey, isVerify)));
        }
        // refund hash
        if (builder.transactionType === _1.TransactionType.Refund) {
            elementtree_1.SubElement(request, "refundhash").append(elementtree_1.CData(_1.GenerationUtils.generateHash(this.refundPassword) || ""));
        }
        // this needs to be figured out based on txn type and set to 0, 1 or MULTI
        if (builder.transactionType === _1.TransactionType.Sale ||
            builder.transactionType === _1.TransactionType.Auth) {
            var autoSettle = builder.transactionType === _1.TransactionType.Sale ? "1" : "0";
            elementtree_1.SubElement(request, "autosettle", { flag: autoSettle });
        }
        if (builder.description) {
            var comments = elementtree_1.SubElement(request, "comments");
            elementtree_1.SubElement(comments, "comment", { id: 1 }).append(elementtree_1.CData(builder.description));
        }
        if (builder.customerId ||
            builder.productId ||
            builder.customerIpAddress ||
            builder.clientTransactionId) {
            var tssInfo = elementtree_1.SubElement(request, "tssinfo");
            elementtree_1.SubElement(tssInfo, "custnum").append(elementtree_1.CData(builder.customerId));
            elementtree_1.SubElement(tssInfo, "prodid").append(elementtree_1.CData(builder.productId));
            elementtree_1.SubElement(tssInfo, "varref").append(elementtree_1.CData(builder.clientTransactionId));
            elementtree_1.SubElement(tssInfo, "custipaddress").append(elementtree_1.CData(builder.customerIpAddress));
        }
        if (builder.ecommerceInfo) {
            var mpi = elementtree_1.SubElement(request, "mpi");
            elementtree_1.SubElement(mpi, "cavv").append(elementtree_1.CData(builder.ecommerceInfo.cavv));
            elementtree_1.SubElement(mpi, "xid").append(elementtree_1.CData(builder.ecommerceInfo.xid));
            elementtree_1.SubElement(mpi, "eci").append(elementtree_1.CData(builder.ecommerceInfo.eci));
        }
        return this.doTransaction(this.buildEnvelope(request)).then(function (response) {
            return _this.mapResponse(response);
        });
    };
    RealexConnector.prototype.serializeRequest = function (builder) {
        if (!this.hostedPaymentConfig) {
            throw new _1.ApiError("Hosted configuration missing. Please check your configuration");
        }
        var encoder = this.hostedPaymentConfig.version === _1.HppVersion.Version2
            ? function (t) { return t; }
            : _1.StringUtils.btoa;
        var request = {};
        var orderId = builder.orderId || _1.GenerationUtils.generateOrderId();
        var timestamp = builder.timestamp || _1.GenerationUtils.generateTimestamp();
        if (builder.transactionType !== _1.TransactionType.Sale &&
            builder.transactionType !== _1.TransactionType.Auth &&
            builder.transactionType !== _1.TransactionType.Verify) {
            throw new _1.UnsupportedTransactionError();
        }
        request.MERCHANT_ID = encoder(this.merchantId || "");
        request.ACCOUNT = encoder(this.accountId || "");
        request.CHANNEL = encoder(this.channel || "");
        request.ORDER_ID = encoder(orderId || "");
        if (builder.amount) {
            request.AMOUNT = encoder(this.numberFormat(builder.amount) || "");
        }
        request.CURRENCY = encoder(builder.currency || "");
        request.TIMESTAMP = encoder(timestamp || "");
        request.AUTO_SETTLE_FLAG = encoder(builder.transactionType === _1.TransactionType.Sale ? "1" : "0" || "");
        request.COMMENT1 = encoder(builder.Description || "");
        // request.COMMENT2 = encoder( || "");
        if (this.hostedPaymentConfig.requestTransactionStabilityScore) {
            request.RETURN_TSS = encoder(this.hostedPaymentConfig.requestTransactionStabilityScore
                ? "1"
                : "0" || "");
        }
        if (this.hostedPaymentConfig.directCurrencyConversionEnabled) {
            request.DCC_ENABLE = encoder(this.hostedPaymentConfig.directCurrencyConversionEnabled
                ? "1"
                : "0" || "");
        }
        if (builder.hostedPaymentData) {
            request.CUST_NUM = encoder(builder.hostedPaymentData.customerNumber || "");
            if (this.hostedPaymentConfig.displaySavedCards &&
                builder.hostedPaymentData.customerKey) {
                request.HPP_SELECT_STORED_CARD = encoder(builder.hostedPaymentData.customerKey || "");
            }
            if (builder.hostedPaymentData.offerToSaveCard) {
                request.OFFER_SAVE_CARD = encoder(builder.hostedPaymentData.offerToSaveCard ? "1" : "0" || "");
            }
            if (builder.hostedPaymentData.customerExists) {
                request.PAYER_EXIST = encoder(builder.hostedPaymentData.customerExists ? "1" : "0" || "");
            }
            request.PAYER_REF = encoder(builder.hostedPaymentData.customerKey || "");
            request.PMT_REF = encoder(builder.hostedPaymentData.paymentKey || "");
            request.PROD_ID = encoder(builder.hostedPaymentData.productId || "");
        }
        if (builder.shippingAddress) {
            request.SHIPPING_CODE = encoder(builder.shippingAddress.postalCode || "");
            request.SHIPPING_CO = encoder(builder.shippingAddress.country || "");
        }
        if (builder.sillingAddress) {
            request.BILLING_CODE = encoder(builder.billingAddress.postalCode || "");
            request.BILLING_CO = encoder(builder.billingAddress.country || "");
        }
        request.CUST_NUM = encoder(builder.customerId || "");
        request.VAR_REF = encoder(builder.clientTransactionId || "");
        request.HPP_LANG = encoder(this.hostedPaymentConfig.language || "");
        request.MERCHANT_RESPONSE_URL = encoder(this.hostedPaymentConfig.responseUrl || "");
        request.CARD_PAYMENT_BUTTON = encoder(this.hostedPaymentConfig.paymentButtonText || "");
        if (this.hostedPaymentConfig.cardStorageEnabled) {
            request.CARD_STORAGE_ENABLE = encoder(this.hostedPaymentConfig.cardStorageEnabled ? "1" : "0" || "");
        }
        if (builder.transactionType === _1.TransactionType.Verify) {
            request.VALIDATE_CARD_ONLY = encoder("1" || "");
        }
        if (this.hostedPaymentConfig.fraudFilterMode) {
            request.HPP_FRAUD_FILTER_MODE = encoder(this.hostedPaymentConfig.fraudFilterMode.toString() || "");
        }
        if (builder.recurringType || builder.recurringSequence) {
            if (builder.recurringType) {
                request.RECURRING_TYPE = encoder(builder.recurringType.toString().toLowerCase() || "");
            }
            if (builder.recurringSequence) {
                request.RECURRING_SEQUENCE = encoder(builder.recurringSequence.toString().toLowerCase() || "");
            }
        }
        if (this.hostedPaymentConfig.version) {
            request.HPP_VERSION = encoder(this.hostedPaymentConfig.version.toString() || "");
        }
        var toHash = [
            timestamp,
            this.merchantId,
            orderId,
            builder.amount ? this.numberFormat(builder.amount) : null,
            builder.currency,
        ];
        if (this.hostedPaymentConfig.cardStorageEnabled ||
            (builder.hostedPaymentData && builder.hostedPaymentData.offerToSaveCard)) {
            toHash.push(builder.hostedPaymentData.customerKey
                ? builder.hostedPaymentData.customerKey
                : null);
            toHash.push(builder.hostedPaymentData.paymentKey
                ? builder.hostedPaymentData.paymentKey
                : null);
        }
        if (this.hostedPaymentConfig.fraudFilterMode &&
            this.hostedPaymentConfig.fraudFilterMode !== _1.FraudFilterMode.None) {
            toHash.push(this.hostedPaymentConfig.fraudFilterMode.toString());
        }
        request.SHA1HASH = encoder(_1.GenerationUtils.generateHash(toHash.join("."), this.sharedSecret) || "");
        return JSON.stringify(request);
    };
    RealexConnector.prototype.manageTransaction = function (builder) {
        var _this = this;
        var timestamp = _1.GenerationUtils.generateTimestamp();
        var orderId = builder.orderId || _1.GenerationUtils.generateOrderId();
        // build Request
        var request = elementtree_1.Element("request", {
            timestamp: timestamp,
            type: this.mapManageRequestType(builder.transactionType),
        });
        if (this.merchantId) {
            elementtree_1.SubElement(request, "merchantid").append(elementtree_1.CData(this.merchantId));
        }
        if (this.accountId) {
            elementtree_1.SubElement(request, "account").append(elementtree_1.CData(this.accountId));
        }
        if (this.channel) {
            elementtree_1.SubElement(request, "channel").append(elementtree_1.CData(this.channel));
        }
        elementtree_1.SubElement(request, "orderid").append(elementtree_1.CData(orderId));
        if (builder.paymentMethod) {
            var ref = builder.paymentMethod;
            elementtree_1.SubElement(request, "pasref").append(elementtree_1.CData(ref.transactionId));
        }
        if (builder.amount) {
            var amountAttrs = builder.currency
                ? { currency: builder.currency }
                : {};
            elementtree_1.SubElement(request, "amount", amountAttrs).append(elementtree_1.CData(this.numberFormat(builder.amount)));
        }
        else if (builder.transactionType === _1.TransactionType.Capture) {
            throw new _1.BuilderError("Amount cannot be null for capture");
        }
        if (builder.transactionType === _1.TransactionType.Refund) {
            if (builder.authorizationCode) {
                elementtree_1.SubElement(request, "authcode").append(elementtree_1.CData(builder.authorizationCode));
            }
            elementtree_1.SubElement(request, "refundhash").append(elementtree_1.CData(_1.GenerationUtils.generateHash(this.rebatePassword)));
        }
        if (builder.reasonCode) {
            elementtree_1.SubElement(request, "reasoncode").append(elementtree_1.CData(builder.reasonCode.toString()));
        }
        if (builder.description) {
            var comments = elementtree_1.SubElement(request, "comments");
            elementtree_1.SubElement(comments, "comment", { id: 1 }).append(elementtree_1.CData(builder.description));
        }
        elementtree_1.SubElement(request, "sha1hash").append(elementtree_1.CData(this.generateHash(timestamp, orderId, builder.amount ? this.numberFormat(builder.amount) : "", builder.currency, "")));
        return this.doTransaction(this.buildEnvelope(request)).then(function (response) {
            return _this.mapResponse(response);
        });
    };
    RealexConnector.prototype.processReport = function (_builder) {
        throw new _1.UnsupportedTransactionError("Reporting functionality is not supported through this gateway.");
    };
    RealexConnector.prototype.processRecurring = function (builder) {
        var _this = this;
        var timestamp = _1.GenerationUtils.generateTimestamp();
        var orderId = builder.orderId || _1.GenerationUtils.generateOrderId();
        // build Request
        var request = elementtree_1.Element("request", {
            timestamp: timestamp,
            type: this.mapRecurringRequestType(builder),
        });
        if (this.merchantId) {
            elementtree_1.SubElement(request, "merchantid").append(elementtree_1.CData(this.merchantId));
        }
        if (this.accountId) {
            elementtree_1.SubElement(request, "account").append(elementtree_1.CData(this.accountId));
        }
        elementtree_1.SubElement(request, "orderid").append(elementtree_1.CData(orderId));
        if (builder.transactionType === _1.TransactionType.Create ||
            builder.transactionType === _1.TransactionType.Edit) {
            if (builder.entity instanceof _1.Customer) {
                var customer = builder.entity;
                request.append(this.buildCustomer(customer));
                elementtree_1.SubElement(request, "sha1hash").append(elementtree_1.CData(_1.GenerationUtils.generateHash([timestamp, this.merchantId, orderId, "", "", customer.key].join("."), this.sharedSecret)));
            }
            else if (builder.entity instanceof _1.RecurringPaymentMethod) {
                var payment = builder.entity;
                var cardElement = elementtree_1.SubElement(request, "card");
                elementtree_1.SubElement(cardElement, "ref").append(elementtree_1.CData(payment.key || payment.id));
                elementtree_1.SubElement(cardElement, "payerref").append(elementtree_1.CData(payment.customerKey));
                if (payment.paymentMethod) {
                    var card = payment.paymentMethod;
                    var expiry = _1.StringUtils.leftPad(card.expMonth, 2, "0") +
                        _1.StringUtils.leftPad((card.expYear || "").substr(2, 2), 2, "0");
                    elementtree_1.SubElement(cardElement, "number").append(elementtree_1.CData(card.number));
                    elementtree_1.SubElement(cardElement, "expdate").append(elementtree_1.CData(expiry));
                    elementtree_1.SubElement(cardElement, "chname").append(elementtree_1.CData(card.cardHolderName));
                    elementtree_1.SubElement(cardElement, "type").append(elementtree_1.CData(card.getCardType().toUpperCase()));
                    var sha1hash = "";
                    if (builder.transactionType === _1.TransactionType.Create) {
                        sha1hash = _1.GenerationUtils.generateHash([
                            timestamp,
                            this.merchantId,
                            orderId,
                            "",
                            "",
                            payment.customerKey,
                            card.cardHolderName,
                            card.number,
                        ].join("."), this.sharedSecret);
                    }
                    else {
                        sha1hash = _1.GenerationUtils.generateHash([
                            timestamp,
                            this.merchantId,
                            payment.customerKey,
                            payment.key || payment.id,
                            expiry,
                            card.number,
                        ].join("."), this.sharedSecret);
                    }
                    elementtree_1.SubElement(request, "sha1hash").append(elementtree_1.CData(sha1hash));
                }
            }
        }
        else if (builder.transactionType === _1.TransactionType.Delete) {
            if (builder.entity instanceof _1.RecurringPaymentMethod) {
                var payment = builder.entity;
                var cardElement = elementtree_1.SubElement(request, "card");
                elementtree_1.SubElement(cardElement, "ref").append(elementtree_1.CData(payment.key || payment.id));
                elementtree_1.SubElement(cardElement, "payerref").append(elementtree_1.CData(payment.customerKey));
            }
        }
        return this.doTransaction(this.buildEnvelope(request)).then(function (response) {
            return _this.mapRecurringResponse(response, builder);
        });
    };
    RealexConnector.prototype.buildEnvelope = function (transaction) {
        return new elementtree_1.ElementTree(transaction).write();
    };
    RealexConnector.prototype.buildCustomer = function (customer) {
        var payer = elementtree_1.Element("payer", {
            ref: customer.key || _1.StringUtils.uuid(),
            type: "Retail",
        });
        elementtree_1.SubElement(payer, "title").append(elementtree_1.CData(customer.title));
        elementtree_1.SubElement(payer, "firstname").append(elementtree_1.CData(customer.firstName));
        elementtree_1.SubElement(payer, "surname").append(elementtree_1.CData(customer.lastName));
        elementtree_1.SubElement(payer, "company").append(elementtree_1.CData(customer.company));
        if (customer.address) {
            var address = elementtree_1.SubElement(payer, "address");
            elementtree_1.SubElement(address, "line1").append(elementtree_1.CData(customer.address.streetAddress1));
            elementtree_1.SubElement(address, "line2").append(elementtree_1.CData(customer.address.streetAddress2));
            elementtree_1.SubElement(address, "line3").append(elementtree_1.CData(customer.address.streetAddress3));
            elementtree_1.SubElement(address, "city").append(elementtree_1.CData(customer.address.city));
            elementtree_1.SubElement(address, "county").append(elementtree_1.CData(customer.address.province));
            elementtree_1.SubElement(address, "postcode").append(elementtree_1.CData(customer.address.postalCode));
            if (customer.address.country) {
                elementtree_1.SubElement(address, "country", { code: "GB" }).append(elementtree_1.CData(customer.address.country));
            }
        }
        var phone = elementtree_1.SubElement(payer, "phonenumbers");
        elementtree_1.SubElement(phone, "home").append(elementtree_1.CData(customer.homePhone));
        elementtree_1.SubElement(phone, "work").append(elementtree_1.CData(customer.workPhone));
        elementtree_1.SubElement(phone, "fax").append(elementtree_1.CData(customer.fax));
        elementtree_1.SubElement(phone, "mobile").append(elementtree_1.CData(customer.mobilePhone));
        elementtree_1.SubElement(payer, "email").append(elementtree_1.CData(customer.email));
        return payer;
    };
    RealexConnector.prototype.mapResponse = function (rawResponse) {
        var result = new _1.Transaction();
        var root = elementtree_1.XML(rawResponse);
        this.checkResponse(root);
        result.responseCode = root.findtext(".//result");
        result.responseMessage = root.findtext(".//message");
        result.cvnResponseCode = root.findtext(".//cvnresult");
        result.avsResponseCode = root.findtext(".//avspostcoderesponse");
        result.timestamp = root.findtext(".//timestamp");
        result.transactionReference = new _1.TransactionReference();
        result.transactionReference.authCode = root.findtext(".//authcode");
        result.transactionReference.orderId = root.findtext(".//orderid");
        result.transactionReference.paymentMethodType = _1.PaymentMethodType.Credit;
        result.transactionReference.transactionId = root.findtext(".//pasref");
        return result;
    };
    RealexConnector.prototype.mapRecurringResponse = function (rawResponse, builder) {
        var root = elementtree_1.XML(rawResponse);
        this.checkResponse(root);
        return builder.entity;
    };
    RealexConnector.prototype.checkResponse = function (root, acceptedCodes) {
        if (!acceptedCodes) {
            acceptedCodes = ["00"];
        }
        var responseCode = root.findtext(".//result");
        var responseMessage = root.findtext(".//message");
        if (acceptedCodes.indexOf(responseCode) === -1) {
            throw new _1.GatewayError("Unexpected Gateway Response: " + responseCode + " - " + responseMessage, responseCode, responseMessage);
        }
    };
    RealexConnector.prototype.generateHash = function (timestamp, orderId, amount, currency, paymentData, verify) {
        if (verify === void 0) { verify = false; }
        var data = [timestamp, this.merchantId, orderId];
        if (false === verify) {
            data.push(amount);
            data.push(currency);
        }
        data.push(paymentData);
        return _1.GenerationUtils.generateHash(data.join("."), this.sharedSecret);
    };
    RealexConnector.prototype.mapAuthRequestType = function (builder) {
        switch (builder.transactionType) {
            case _1.TransactionType.Sale:
            case _1.TransactionType.Auth:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    if (builder.transactionModifier === _1.TransactionModifier.Offline) {
                        return "offline";
                    }
                    if (builder.transactionModifier === _1.TransactionModifier.EncryptedMobile) {
                        return "auth-mobile";
                    }
                    return "auth";
                }
                return "receipt-in";
            case _1.TransactionType.Capture:
                return "settle";
            case _1.TransactionType.Verify:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    return "otb";
                }
                return "receipt-in-otb";
            case _1.TransactionType.Refund:
                if (builder.paymentMethod.paymentMethodType === _1.PaymentMethodType.Credit) {
                    return "credit";
                }
                return "payment-out";
            case _1.TransactionType.Reversal:
            default:
                throw new _1.UnsupportedTransactionError("The selected gateway does not support this transaction type.");
        }
    };
    RealexConnector.prototype.mapManageRequestType = function (type) {
        switch (type) {
            case _1.TransactionType.Capture:
                return "settle";
            case _1.TransactionType.Hold:
                return "hold";
            case _1.TransactionType.Refund:
                return "rebate";
            case _1.TransactionType.Release:
                return "release";
            case _1.TransactionType.Void:
            case _1.TransactionType.Reversal:
                return "void";
            default:
                return "unknown";
        }
    };
    RealexConnector.prototype.mapRecurringRequestType = function (builder) {
        var entity = builder.entity;
        switch (builder.transactionType) {
            case _1.TransactionType.Create:
                if (entity instanceof _1.Customer) {
                    return "payer-new";
                }
                if (entity instanceof _1.Schedule) {
                    throw new _1.UnsupportedTransactionError();
                }
                return "card-new";
            case _1.TransactionType.Edit:
                if (entity instanceof _1.Customer) {
                    return "payer-edit";
                }
                if (entity instanceof _1.Schedule) {
                    throw new _1.UnsupportedTransactionError();
                }
                return "card-update-card";
            case _1.TransactionType.Delete:
                if (entity instanceof _1.Customer || entity instanceof _1.Schedule) {
                    throw new _1.UnsupportedTransactionError();
                }
                return "card-cancel-card";
            default:
                throw new _1.UnsupportedTransactionError();
        }
    };
    RealexConnector.prototype.numberFormat = function (amount) {
        var f = parseFloat(amount.toString()) * 100;
        return parseFloat(f.toFixed(2)).toString();
    };
    return RealexConnector;
}(XmlGateway_1.XmlGateway));
exports.RealexConnector = RealexConnector;
