"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var EBTService = /** @class */ (function () {
    function EBTService(config) {
        _1.ServicesContainer.configure(config);
    }
    EBTService.prototype.balanceInquiry = function (type) {
        if (type === void 0) { type = _1.InquiryType.Foodstamp; }
        return new _1.AuthorizationBuilder(_1.TransactionType.Balance)
            .withBalanceInquiryType(type)
            .withAmount(0);
    };
    EBTService.prototype.benefitWithdrawal = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.BenefitWithDrawal)
            .withAmount(amount)
            .withCashBack(0);
    };
    EBTService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    EBTService.prototype.refund = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.EBT;
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    return EBTService;
}());
exports.EBTService = EBTService;
