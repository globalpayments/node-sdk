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
var GiftCard = /** @class */ (function (_super) {
    __extends(GiftCard, _super);
    function GiftCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Payment method type
         *
         * @var PaymentMethodType
         */
        _this.paymentMethodType = _1.PaymentMethodType.Gift;
        return _this;
    }
    /**
     * Creates a new payment method
     *
     * @param string alias Alias to use
     *
     * @return GiftCard
     */
    GiftCard.create = function (alias) {
        var card = new GiftCard();
        return new _1.AuthorizationBuilder(_1.TransactionType.Alias, card)
            .withAlias(_1.AliasAction.Create, alias)
            .execute()
            .then(function (response) {
            if (response.responseCode === "00") {
                return response.giftCard;
            }
            throw new _1.ApiError(response.responseMessage);
        })
            .catch(function () {
            throw new _1.ApiError("Unable to create gift card alias");
        });
    };
    /**
     * Adds an alias to the payment method
     *
     * @param string alias Alias to add
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.addAlias = function (alias) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Alias, this).withAlias(_1.AliasAction.Add, alias);
    };
    /**
     * Activates the payment method with the given amount
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.activate = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Activate, this).withAmount(amount);
    };
    /**
     * Adds value to the payment method
     *
     * @param string|number amount Amount to add
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.addValue = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.AddValue, this).withAmount(amount);
    };
    /**
     * Inquires the balance of the payment method
     *
     * @param InquiryType inquiry Type of inquiry
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.balanceInquiry = function (inquiry) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Balance, this).withBalanceInquiryType(inquiry);
    };
    /**
     * Authorizes the payment method and captures the entire authorized amount
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.charge = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Sale, this).withAmount(amount);
    };
    /**
     * Deactivates the payment method
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.deactivate = function () {
        return new _1.AuthorizationBuilder(_1.TransactionType.Deactivate, this);
    };
    /**
     * Removes an alias to the payment method
     *
     * @param string alias Alias to remove
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.removeAlias = function (alias) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Alias, this).withAlias(_1.AliasAction.Delete, alias);
    };
    /**
     * Replaces the payment method with the given one
     *
     * @param GiftCard newCard Replacement gift card
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.replaceWith = function (newCard) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Replace, this).withReplacementCard(newCard);
    };
    /**
     * Reverses the payment method
     *
     * @param string|number amount Amount to reverse
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.reverse = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Reversal, this).withAmount(amount);
    };
    /**
     * Rewards the payment method
     *
     * @param string|number amount Amount to reward
     *
     * @return AuthorizationBuilder
     */
    GiftCard.prototype.rewards = function (amount) {
        return new _1.AuthorizationBuilder(_1.TransactionType.Reward, this).withAmount(amount);
    };
    Object.defineProperty(GiftCard.prototype, "alias", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
            this.valueType = "Alias";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GiftCard.prototype, "number", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
            this.valueType = "CardNbr";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GiftCard.prototype, "token", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
            this.valueType = "TokenValue";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GiftCard.prototype, "trackData", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
            this.valueType = "TrackData";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Payment method value types
     *
     * @var string[]
     */
    GiftCard.valueTypes = ["alias", "number", "token", "trackData"];
    return GiftCard;
}(PaymentMethod_1.PaymentMethod));
exports.GiftCard = GiftCard;
