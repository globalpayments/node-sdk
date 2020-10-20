"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validations_1 = require("./BaseBuilder/Validations");
var BaseBuilder = /** @class */ (function () {
    function BaseBuilder() {
        this.validations = new Validations_1.Validations();
        this.setupValidations();
    }
    BaseBuilder.prototype.execute = function () {
        this.validations.validate(this);
        return Promise.resolve(undefined);
    };
    return BaseBuilder;
}());
exports.BaseBuilder = BaseBuilder;
