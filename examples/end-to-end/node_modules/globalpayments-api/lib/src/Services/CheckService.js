"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var CheckService = /** @class */ (function () {
    function CheckService(config) {
        _1.ServicesContainer.configure(config);
    }
    CheckService.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale).withAmount(amount);
    };
    CheckService.prototype.void = function (transactionId) {
        var ref = new _1.TransactionReference();
        ref.paymentMethodType = _1.PaymentMethodType.ACH;
        ref.transactionId = transactionId;
        return new _1.ManagementBuilder(_1.TransactionType.Void).withPaymentMethod(ref);
    };
    return CheckService;
}());
exports.CheckService = CheckService;
