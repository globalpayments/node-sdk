"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../../");
var ValidationTarget_1 = require("./ValidationTarget");
var Validations = /** @class */ (function () {
    function Validations() {
        this.rules = {};
    }
    Validations.prototype.of = function (enumProperty, type) {
        if (!this.rules.hasOwnProperty(enumProperty)) {
            this.rules[enumProperty] = [];
        }
        if (!this.rules[enumProperty].hasOwnProperty(type.toString())) {
            this.rules[enumProperty][type] = [];
        }
        var target = new ValidationTarget_1.ValidationTarget(this, enumProperty, type);
        this.rules[enumProperty][type].push(target);
        return target;
    };
    Validations.prototype.validate = function (builder) {
        var _this = this;
        Object.keys(this.rules).forEach(function (enumName) {
            _this.rules[enumName].forEach(function (rules, iKey) {
                var value = builder[enumName];
                if ((value === undefined || value === null) &&
                    builder instanceof _1.TransactionBuilder &&
                    builder.paymentMethod) {
                    value = builder.paymentMethod[enumName];
                    if (value === undefined || value === null) {
                        return;
                    }
                }
                if ((iKey & value) !== value) {
                    return;
                }
                for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                    var validation = rules_1[_i];
                    if (!validation.clause) {
                        continue;
                    }
                    if (validation.constraint !== undefined &&
                        validation.constraint !== null &&
                        validation.constraint !== builder[validation.constraintProperty]) {
                        continue;
                    }
                    if (!validation.clause.callback(builder)) {
                        throw new _1.BuilderError(validation.clause.message);
                    }
                }
            });
        });
    };
    return Validations;
}());
exports.Validations = Validations;
