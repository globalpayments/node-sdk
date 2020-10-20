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
var _1 = require("../");
var PaymentMethod_1 = require("./PaymentMethod");
var Credit = /** @class */ (function (_super) {
    __extends(Credit, _super);
    function Credit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paymentMethodType = _1.PaymentMethodType.Credit;
        return _this;
    }
    /**
     * Authorizes the payment method
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.authorize = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Auth, this).withAmount(amount);
    };
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this).withAmount(amount);
    };
    /**
     * Adds value to the payment method
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.addValue = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.AddValue, this).withAmount(amount);
    };
    /**
     * Inquires the balance of the payment method
     *
     * @param InquiryType inquiry Type of inquiry
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.balanceInquiry = function (inquiry) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Balance, this).withBalanceInquiryType(inquiry);
    };
    /**
     * Refunds the payment method
     *
     * @param string|number amount Amount to refund
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.refund = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund, this).withAmount(amount);
    };
    /**
     * Reverses the payment method
     *
     * @param string|number amount Amount to reverse
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.reverse = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal, this).withAmount(amount);
    };
    /**
     * Verifies the payment method
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.verify = function () {
        return new _1.AuthorizationBuilder(_1.TransactionType.Verify, this);
    };
    /**
     * Tokenizes the payment method
     *
     * @return AuthorizationBuilder
     */
    Credit.prototype.tokenize = function () {
        return this.verify().withRequestMultiUseToken(true);
    };
    return Credit;
}(PaymentMethod_1.PaymentMethod));
exports.Credit = Credit;
