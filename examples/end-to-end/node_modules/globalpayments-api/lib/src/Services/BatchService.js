"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var BatchService = /** @class */ (function () {
    function BatchService() {
    }
    BatchService.closeBatch = function () {
        return new _1.ManagementBuilder(_1.TransactionType.BatchClose)
            .execute()
            .then(function (_response) {
            return new _1.BatchSummary();
        });
    };
    return BatchService;
}());
exports.BatchService = BatchService;
