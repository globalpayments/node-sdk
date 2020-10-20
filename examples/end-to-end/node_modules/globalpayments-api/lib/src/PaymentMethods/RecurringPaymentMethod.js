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
var Entities_1 = require("../Entities");
var RecurringPaymentMethod = /** @class */ (function (_super) {
    __extends(RecurringPaymentMethod, _super);
    function RecurringPaymentMethod(customerIdOrPaymentMethod, paymentId) {
        var _this = _super.call(this) || this;
        _this.paymentMethodType = _1.PaymentMethodType.Recurring;
        if ((customerIdOrPaymentMethod &&
            typeof customerIdOrPaymentMethod === "string") ||
            customerIdOrPaymentMethod instanceof String) {
            _this.paymentType = "Credit Card";
            _this.customerKey = customerIdOrPaymentMethod;
            if (paymentId) {
                _this.key = paymentId;
            }
        }
        else if (customerIdOrPaymentMethod) {
            _this._paymentMethod = customerIdOrPaymentMethod;
        }
        return _this;
    }
    Object.defineProperty(RecurringPaymentMethod.prototype, "paymentMethod", {
        get: function () {
            return this._paymentMethod;
        },
        set: function (value) {
            var client = _1.ServicesContainer.instance().getRecurringClient();
            if (!client.supportsUpdatePaymentDetails) {
                throw new _1.UnsupportedTransactionError();
            }
            this._paymentMethod = value;
        },
        enumerable: true,
        configurable: true
    });
    RecurringPaymentMethod.prototype.authorize = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Auth, this)
            .withAmount(amount)
            .withOneTimePayment(true);
    };
    RecurringPaymentMethod.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this)
            .withAmount(amount)
            .withOneTimePayment(true);
    };
    RecurringPaymentMethod.prototype.refund = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Refund, this).withAmount(amount);
    };
    RecurringPaymentMethod.prototype.verify = function () {
        return new _1.AuthorizationBuilder(_1.TransactionType.Verify, this);
    };
    RecurringPaymentMethod.prototype.addSchedule = function (scheduleId) {
        var schedule = new _1.Schedule(this.customerKey, this.key);
        schedule.id = scheduleId;
        return schedule;
    };
    return RecurringPaymentMethod;
}(Entities_1.RecurringEntity));
exports.RecurringPaymentMethod = RecurringPaymentMethod;
