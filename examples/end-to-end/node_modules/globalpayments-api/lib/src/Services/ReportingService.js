"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var ReportingService = /** @class */ (function () {
    function ReportingService() {
    }
    ReportingService.activity = function () {
        return new _1.TransactionReportBuilder(_1.ReportType.Activity);
    };
    ReportingService.transactionDetail = function (transactionId) {
        return new _1.TransactionReportBuilder(_1.ReportType.TransactionDetail).withTransactionId(transactionId);
    };
    return ReportingService;
}());
exports.ReportingService = ReportingService;
