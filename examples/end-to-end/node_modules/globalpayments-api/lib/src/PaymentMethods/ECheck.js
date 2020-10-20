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
var ECheck = /** @class */ (function (_super) {
    __extends(ECheck, _super);
    function ECheck() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paymentMethodType = _1.PaymentMethodType.ACH;
        return _this;
    }
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    ECheck.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this).withAmount(amount);
    };
    return ECheck;
}(PaymentMethod_1.PaymentMethod));
exports.ECheck = ECheck;
