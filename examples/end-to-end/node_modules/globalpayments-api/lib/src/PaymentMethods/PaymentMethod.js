"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var PaymentMethod = /** @class */ (function () {
    function PaymentMethod() {
    }
    Object.defineProperty(PaymentMethod.prototype, "isAuthable", {
        get: function () {
            return this.authorize !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isBalanceable", {
        get: function () {
            return this.balanceInquiry !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isCardData", {
        get: function () {
            return (((this.isTokenizable &&
                this.token !== undefined) ||
                this.number !== undefined) &&
                this.paymentMethodType !== _1.PaymentMethodType.Gift);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isChargable", {
        get: function () {
            return this.charge !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isEditable", {
        get: function () {
            return this.edit !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isEncryptable", {
        get: function () {
            return this.encryptionData !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isPinProtected", {
        get: function () {
            return this.pinBlock !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isPrePayable", {
        get: function () {
            return this.addValue !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isRefundable", {
        get: function () {
            return this.refund !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isReversable", {
        get: function () {
            return this.reverse !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isTokenizable", {
        get: function () {
            return this.tokenize !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isTrackData", {
        get: function () {
            return (this.value !== undefined &&
                (this.entryMethod !== undefined ||
                    this.pinBlock !== undefined ||
                    this.encryptionData !== undefined));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isVerifyable", {
        get: function () {
            return this.verify !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "isVoidable", {
        get: function () {
            return this.void !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    return PaymentMethod;
}());
exports.PaymentMethod = PaymentMethod;
