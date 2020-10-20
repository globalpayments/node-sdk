"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var GiftService = /** @class */ (function () {
    function GiftService(config) {
        _1.ServicesContainer.configure(config);
    }
    GiftService.prototype.activate = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Activate).withAmount(amount);
    };
    GiftService.prototype.addValue = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.AddValue).withAmount(amount);
    };
    GiftService.prototype.addAlias = function (phoneNumber) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Alias).withAlias(_1.AliasAction.Add, phoneNumber);
    };
    GiftService.prototype.balanceInquiry = function (type) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Balance).withBalanceInquiryType(type);
    };
    GiftService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    GiftService.prototype.create = function (phoneNumber) {
        return _1.GiftCard.create(phoneNumber);
    };
    GiftService.prototype.deactivate = function () {
        return new _1.AuthorizationBuilder(_1.TransactionType.Deactivate);
    };
    GiftService.prototype.removeAlias = function (phoneNumber) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Alias).withAlias(_1.AliasAction.Delete, phoneNumber);
    };
    GiftService.prototype.replaceWith = function (newCard) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Replace).withReplacementCard(newCard);
    };
    GiftService.prototype.reverse = function (amount) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Gift;
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal)
            .withAmount(amount)
            .withPaymentMethod(ref);
    };
    GiftService.prototype.rewards = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Reward).withAmount(amount);
    };
    GiftService.prototype.void = function (transactionId) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.Gift;
        ref.transactionId = transactionId;
        return new _1.ManagementBuilder(_1.TransactionType.Void).withPaymentMethod(ref);
    };
    return GiftService;
}());
exports.GiftService = GiftService;
