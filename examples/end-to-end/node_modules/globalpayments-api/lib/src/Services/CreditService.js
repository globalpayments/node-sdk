"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var CreditService = /** @class */ (function () {
    function CreditService(config) {
        _1.ServicesContainer.configure(config);
    }
    CreditService.prototype.authorize = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Auth).withAmount(amount);
    };
    CreditService.prototype.capture = function (transactionId) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Credit;
        ref.transactionId = transactionId;
        return new _1.ManagementBuilder(_1.TransactionType.Capture).withPaymentMethod(ref);
    };
    CreditService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    CreditService.prototype.edit = function (transactionId) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Credit;
        if (transactionId) {
            ref.transactionId = transactionId;
        }
        return new _1.ManagementBuilder(_1.TransactionType.Edit).withPaymentMethod(ref);
    };
    CreditService.prototype.refund = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Credit;
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    CreditService.prototype.reverse = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Credit;
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    CreditService.prototype.verify = function () {
        return new _1.AuthorizationBuilder(_1.TransactionType.Verify);
    };
    CreditService.prototype.void = function (transactionId) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Credit;
        ref.transactionId = transactionId;
        return new _1.ManagementBuilder(_1.TransactionType.Void).withPaymentMethod(ref);
    };
    return CreditService;
}());
exports.CreditService = CreditService;
