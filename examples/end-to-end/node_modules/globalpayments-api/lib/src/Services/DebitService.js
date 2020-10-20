"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var DebitService = /** @class */ (function () {
    function DebitService(config) {
        _1.ServicesContainer.configure(config);
    }
    DebitService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    DebitService.prototype.refund = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Debit;
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    DebitService.prototype.reverse = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Debit;
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    return DebitService;
}());
exports.DebitService = DebitService;
