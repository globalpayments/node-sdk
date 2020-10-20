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
var EBT = /** @class */ (function (_super) {
    __extends(EBT, _super);
    function EBT() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paymentMethodType = _1.PaymentMethodType.EBT;
        return _this;
    }
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    EBT.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this).withAmount(amount);
    };
    /**
     * Adds value to the payment method
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    EBT.prototype.addValue = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.AddValue, this).withAmount(amount);
    };
    /**
     * Inquires the balance of the payment method
     *
     * @param InquiryType inquiry Type of inquiry
     *
     * @return AuthorizationBuilder
     */
    EBT.prototype.balanceInquiry = function (inquiry) {
        if (inquiry === void 0) { inquiry = _1.InquiryType.Foodstamp; }
        return new _1.AuthorizationBuilder(_1.TransactionType.Balance, this)
            .withBalanceInquiryType(inquiry)
            .withAmount(0);
    };
    EBT.prototype.benefitWithdrawal = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.BenefitWithDrawal, this)
            .withAmount(amount)
            .withCashBack(0);
    };
    /**
     * Refunds the payment method
     *
     * @param string|number amount Amount to refund
     *
     * @return AuthorizationBuilder
     */
    EBT.prototype.refund = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund, this).withAmount(amount);
    };
    /**
     * Reverses the payment method
     *
     * @param string|number amount Amount to reverse
     *
     * @return AuthorizationBuilder
     */
    EBT.prototype.reverse = function (_amount) {
        throw new _1.NotImplementedError();
    };
    return EBT;
}(PaymentMethod_1.PaymentMethod));
exports.EBT = EBT;
