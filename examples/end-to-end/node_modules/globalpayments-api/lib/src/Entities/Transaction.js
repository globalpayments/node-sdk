"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    Object.defineProperty(Transaction.prototype, "transactionId", {
        get: function () {
            return this.transactionReference.transactionId;
        },
        enumerable: true,
        configurable: true
    });
    Transaction.fromId = function (transactionId, orderId, paymentMethodType) {
        if (paymentMethodType === void 0) { paymentMethodType = _1.PaymentMethodType.Credit; }
        var transaction = new Transaction();
        transaction.transactionReference = new _1.TransactionReference();
        transaction.transactionReference.transactionId = transactionId;
        if (orderId &&
            (typeof orderId === "string" ||
                Object.prototype.toString.call(orderId) === "[object String]")) {
            transaction.transactionReference.orderId = orderId;
        }
        else if (orderId) {
            paymentMethodType = orderId;
        }
        transaction.transactionReference.paymentMethodType = paymentMethodType;
        return transaction;
    };
    /**
     * Allows for a follow-up request to add an additional authorization
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    Transaction.prototype.additionalAuth = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Auth)
            .withPaymentMethod(this.transactionReference)
            .withAmount(amount)
            .withModifier(_1.TransactionModifier.Additional);
    };
    /**
     * Allows for a follow-up request to add the transaction to an open batch
     *
     * @param string|number amount Amount to capture
     *
     * @return ManagementBuilder
     */
    Transaction.prototype.capture = function (amount) {
        return new _1.ManagementBuilder(_1.TransactionType.Capture)
            .withPaymentMethod(this.transactionReference)
            .withAmount(amount);
    };
    /**
     * Allows for a follow-up request to edit the transaction
     *
     * @return ManagementBuilder
     */
    Transaction.prototype.edit = function () {
        var builder = new _1.ManagementBuilder(_1.TransactionType.Edit).withPaymentMethod(this.transactionReference);
        if (this.commercialIndicator) {
            builder = builder.withModifier(_1.TransactionModifier.LevelII);
        }
        return builder;
    };
    Transaction.prototype.hold = function () {
        return new _1.ManagementBuilder(_1.TransactionType.Hold).withPaymentMethod(this.transactionReference);
    };
    /**
     * Allows for a follow-up request to refund the transaction
     *
     * @param string|number amount Amount to refund
     *
     * @return ManagementBuilder
     */
    Transaction.prototype.refund = function (amount) {
        return new _1.ManagementBuilder(_1.TransactionType.Refund)
            .withPaymentMethod(this.transactionReference)
            .withAmount(amount);
    };
    Transaction.prototype.release = function () {
        return new _1.ManagementBuilder(_1.TransactionType.Release).withPaymentMethod(this.transactionReference);
    };
    /**
     * Allows for a follow-up request to reverse the transaction
     *
     * @param string|number amount Amount to reverse
     *
     * @return ManagementBuilder
     */
    Transaction.prototype.reverse = function (amount) {
        return new _1.ManagementBuilder(_1.TransactionType.Reversal)
            .withPaymentMethod(this.transactionReference)
            .withAmount(amount);
    };
    /**
     * Allows for a follow-up request to void the transaction
     *
     * @return ManagementBuilder
     */
    Transaction.prototype.void = function () {
        return new _1.ManagementBuilder(_1.TransactionType.Void).withPaymentMethod(this.transactionReference);
    };
    return Transaction;
}());
exports.Transaction = Transaction;
