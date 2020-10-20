"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationClause_1 = require("./ValidationClause");
var ValidationTarget = /** @class */ (function () {
    function ValidationTarget(parent, enumName, type) {
        this.parent = parent;
        this.type = type;
        this.enumName = enumName;
    }
    ValidationTarget.prototype.with = function (property, constraint) {
        this.constraintProperty = property;
        this.constraint = constraint;
        return this;
    };
    ValidationTarget.prototype.check = function (targetProperty) {
        this.property = targetProperty;
        this.clause = new ValidationClause_1.ValidationClause(this.parent, this);
        return this.clause;
    };
    ValidationTarget.prototype.when = function (targetProperty) {
        this.property = targetProperty;
        this.precondition = new ValidationClause_1.ValidationClause(this.parent, this, true);
        return this.precondition;
    };
    return ValidationTarget;
}());
exports.ValidationTarget = ValidationTarget;
