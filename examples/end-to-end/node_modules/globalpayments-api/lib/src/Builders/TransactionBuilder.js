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
var BaseBuilder_1 = require("./BaseBuilder");
var TransactionBuilder = /** @class */ (function (_super) {
    __extends(TransactionBuilder, _super);
    function TransactionBuilder(type, paymentMethod) {
        var _this = _super.call(this) || this;
        _this.transactionModifier = _1.TransactionModifier.None;
        _this.transactionType = type;
        if (paymentMethod) {
            _this.paymentMethod = paymentMethod;
        }
        return _this;
    }
    TransactionBuilder.prototype.withModifier = function (modifier) {
        if (modifier !== undefined) {
            this.transactionModifier = modifier;
        }
        return this;
    };
    TransactionBuilder.prototype.withPaymentMethod = function (paymentMethod) {
        if (paymentMethod !== undefined) {
            this.paymentMethod = paymentMethod;
        }
        return this;
    };
    return TransactionBuilder;
}(BaseBuilder_1.BaseBuilder));
exports.TransactionBuilder = TransactionBuilder;
