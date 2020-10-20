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
var TransactionBuilder_1 = require("./TransactionBuilder");
var ManagementBuilder = /** @class */ (function (_super) {
    __extends(ManagementBuilder, _super);
    function ManagementBuilder(type) {
        return _super.call(this, type) || this;
    }
    Object.defineProperty(ManagementBuilder.prototype, "authorizationCode", {
        get: function () {
            if (this.paymentMethod instanceof _1.TransactionReference) {
                return this.paymentMethod.authCode;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManagementBuilder.prototype, "clientTransactionId", {
        get: function () {
            if (this.paymentMethod instanceof _1.TransactionReference) {
                return this.paymentMethod.clientTransactionId;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManagementBuilder.prototype, "orderId", {
        get: function () {
            if (this.paymentMethod instanceof _1.TransactionReference) {
                return this.paymentMethod.orderId;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManagementBuilder.prototype, "transactionId", {
        get: function () {
            if (this.paymentMethod instanceof _1.TransactionReference) {
                return this.paymentMethod.transactionId;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Executes the builder against the gateway.
     *
     * @returns Promise<Transaction>
     */
    ManagementBuilder.prototype.execute = function () {
        _super.prototype.execute.call(this);
        return _1.ServicesContainer.instance()
            .getClient()
            .manageTransaction(this);
    };
    ManagementBuilder.prototype.setupValidations = function () {
        this.validations
            .of("transactionType", 
        /* tslint:disable:trailing-comma */
        _1.TransactionType.Capture |
            _1.TransactionType.Edit |
            _1.TransactionType.Hold |
            _1.TransactionType.Release)
            .check("transactionId")
            .isNotNull();
        this.validations
            .of("transactionType", _1.TransactionType.Edit)
            .with("transactionModifier", _1.TransactionModifier.LevelII)
            .check("taxType")
            .isNotNull();
        this.validations
            .of("transactionType", _1.TransactionType.Refund)
            .when("amount")
            .isNotNull()
            .check("currency")
            .isNotNull();
    };
    /**
     * Sets the current transaction's amount.
     *
     * @param amount The amount
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withAmount = function (amount) {
        if (amount !== undefined) {
            this.amount = amount;
        }
        return this;
    };
    /**
     * Sets the current transaction's authorized amount; where applicable.
     *
     * @param amount The authorized amount
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withAuthAmount = function (amount) {
        if (amount !== undefined) {
            this.authAmount = amount;
        }
        return this;
    };
    /**
     * Sets the currency.
     *
     * The formatting for the supplied value will currently depend on
     * the configured gateway's requirements.
     *
     * @param currency The currency
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withCurrency = function (currency) {
        if (currency !== undefined) {
            this.currency = currency;
        }
        return this;
    };
    /**
     * Sets the transaction's description.
     *
     * This value is not guaranteed to be sent in the authorization
     * or settlement process.
     *
     * @param description The description
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withDescription = function (description) {
        if (description !== undefined) {
            this.description = description;
        }
        return this;
    };
    /**
     * Sets the gratuity amount; where applicable.
     *
     * This value is information only and does not affect
     * the authorization amount.
     *
     * @param gratuity The gratuity amount
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withGratuity = function (gratuity) {
        if (gratuity !== undefined) {
            this.gratuity = gratuity;
        }
        return this;
    };
    /**
     * Sets the purchase order number; where applicable.
     *
     * @param poNumber The PO number
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withPoNumber = function (poNumber) {
        this.transactionModifier = _1.TransactionModifier.LevelII;
        if (poNumber !== undefined) {
            this.poNumber = poNumber;
        }
        return this;
    };
    /**
     * Sets the reason code for the transaction.
     *
     * @param reasonCode The reason code
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withReasonCode = function (reasonCode) {
        if (reasonCode !== undefined) {
            this.reasonCode = reasonCode;
        }
        return this;
    };
    /**
     * Sets the tax amount.
     *
     * Useful for commercial purchase card requests.
     *
     * @see AuthorizationBuilder.WithCommercialRequest
     * @param amount The tax amount
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withTaxAmount = function (amount) {
        this.transactionModifier = _1.TransactionModifier.LevelII;
        if (amount !== undefined) {
            this.taxAmount = amount;
        }
        return this;
    };
    /**
     * Sets the tax type.
     *
     * Useful for commercial purchase card requests.
     *
     * @see AuthorizationBuilder.withCommercialRequest
     * @param type The tax type
     * @returns ManagementBuilder
     */
    ManagementBuilder.prototype.withTaxType = function (type) {
        this.transactionModifier = _1.TransactionModifier.LevelII;
        if (type !== undefined) {
            this.taxType = type;
        }
        return this;
    };
    return ManagementBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.ManagementBuilder = ManagementBuilder;
