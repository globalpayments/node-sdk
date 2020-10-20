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
var ReportBuilder = /** @class */ (function (_super) {
    __extends(ReportBuilder, _super);
    function ReportBuilder(type) {
        var _this = _super.call(this) || this;
        _this.reportType = type;
        return _this;
    }
    ReportBuilder.prototype.execute = function () {
        _super.prototype.execute.call(this);
        return _1.ServicesContainer.instance()
            .getClient()
            .processReport(this);
    };
    return ReportBuilder;
}(BaseBuilder_1.BaseBuilder));
exports.ReportBuilder = ReportBuilder;
