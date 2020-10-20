"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var HostedService = /** @class */ (function () {
    function HostedService(config) {
        this.config = config;
        _1.ServicesContainer.configure(config);
    }
    HostedService.prototype.authorize = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Auth).withAmount(amount);
    };
    HostedService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    HostedService.prototype.verify = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Verify).withAmount(amount);
    };
    HostedService.prototype.parseResponse = function (json, encoded) {
        if (encoded === void 0) { encoded = true; }
        var response = JSON.parse(json);
        var decoder = encoded ? _1.StringUtils.atob : function (t) { return t; };
        var timestamp = decoder(response.TIMESTAMP);
        var merchantId = decoder(response.MERCHANT_ID);
        var orderId = decoder(response.ORDER_ID);
        var result = decoder(response.RESULT);
        var message = decoder(response.MESSAGE);
        var transactionId = decoder(response.PASREF);
        var authCode = decoder(response.AUTHCODE);
        var sha1Hash = decoder(response.SHA1HASH);
        var hash = _1.GenerationUtils.generateHash([
            timestamp,
            merchantId,
            orderId,
            result,
            message,
            transactionId,
            authCode,
        ].join("."), this.config.sharedSecret);
        if (hash !== sha1Hash) {
            throw new _1.ApiError("Incorrect hash. Please check your code and the Developers Documentation.");
        }
        var transaction = new _1.Transaction();
        transaction.authorizedAmount = decoder(response.AMOUNT);
        transaction.cvnResponseCode = decoder(response.CVNRESULT);
        transaction.responseCode = result;
        transaction.responseMessage = message;
        transaction.avsResponseCode = decoder(response.AVSPOSTCODERESULT);
        transaction.transactionReference = new _1.TransactionReference();
        transaction.transactionReference.authCode = authCode;
        transaction.transactionReference.orderId = orderId;
        transaction.transactionReference.paymentMethodType =
            _1.PaymentMethodType.Credit;
        transaction.transactionReference.transactionId = transactionId;
        return transaction;
    };
    return HostedService;
}());
exports.HostedService = HostedService;
