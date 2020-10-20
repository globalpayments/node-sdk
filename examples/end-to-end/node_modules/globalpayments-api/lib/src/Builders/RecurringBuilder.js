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
var RecurringBuilder = /** @class */ (function (_super) {
    __extends(RecurringBuilder, _super);
    function RecurringBuilder(type, entity) {
        var _this = _super.call(this, type) || this;
        _this.searchCriteria = {};
        if (entity) {
            _this.entity = entity;
            _this.key = entity.key;
        }
        return _this;
    }
    RecurringBuilder.prototype.execute = function () {
        _super.prototype.execute.call(this);
        return _1.ServicesContainer.instance()
            .getRecurringClient()
            .processRecurring(this);
    };
    RecurringBuilder.prototype.setupValidations = function () {
        // todo
    };
    return RecurringBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.RecurringBuilder = RecurringBuilder;
