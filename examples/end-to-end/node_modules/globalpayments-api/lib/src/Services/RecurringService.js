"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var RecurringService = /** @class */ (function () {
    function RecurringService() {
    }
    RecurringService.create = function (entity) {
        return new _1.RecurringBuilder(_1.TransactionType.Create, entity).execute();
    };
    RecurringService.delete = function (entity, _force) {
        if (_force === void 0) { _force = false; }
        return new _1.RecurringBuilder(_1.TransactionType.Delete, entity).execute();
    };
    RecurringService.edit = function (entity) {
        return new _1.RecurringBuilder(_1.TransactionType.Edit, entity).execute();
    };
    RecurringService.get = function (key) {
        var entity = {
            key: key,
        };
        return new _1.RecurringBuilder(_1.TransactionType.Fetch, entity).execute();
    };
    RecurringService.search = function () {
        return new _1.RecurringBuilder(_1.TransactionType.Search);
    };
    return RecurringService;
}());
exports.RecurringService = RecurringService;
