"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationClause = /** @class */ (function () {
    function ValidationClause(parent, target, precondition) {
        if (precondition === void 0) { precondition = false; }
        this.parent = parent;
        this.target = target;
        this.precondition = precondition;
    }
    ValidationClause.prototype.isNotNull = function (message) {
        var _this = this;
        this.callback = function (builder) {
            var value = builder[_this.target.property];
            return undefined !== value && null !== value;
        };
        this.message = message
            ? message
            : this.target.property + " cannot be null for this transaction type.";
        if (this.precondition) {
            return this.target;
        }
        return this.parent
            .of(this.target.enumName, this.target.type)
            .with(this.target.constraintProperty, this.target.constraint);
    };
    ValidationClause.prototype.isNull = function (message) {
        var _this = this;
        this.callback = function (builder) {
            var value = builder[_this.target.property];
            return undefined === value || null === value;
        };
        this.message = message
            ? message
            : this.target.property + " cannot be set for this transaction type.";
        if (this.precondition) {
            return this.target;
        }
        return this.parent
            .of(this.target.enumName, this.target.type)
            .with(this.target.constraintProperty, this.target.constraint);
    };
    ValidationClause.prototype.isNotEmpty = function (message) {
        var _this = this;
        this.callback = function (builder) {
            var value = builder[_this.target.property];
            return !!value;
        };
        this.message = message
            ? message
            : this.target.property + " cannot be empty for this transaction type.";
        if (this.precondition) {
            return this.target;
        }
        return this.parent
            .of(this.target.enumName, this.target.type)
            .with(this.target.constraintProperty, this.target.constraint);
    };
    return ValidationClause;
}());
exports.ValidationClause = ValidationClause;
