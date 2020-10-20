"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../");
var RecurringEntity = /** @class */ (function () {
    function RecurringEntity() {
    }
    /// <summary>
    /// Searches for a specific record by `id`.
    /// </summary>
    /// <param name="id">The ID of the record to find</summary>
    /// <returns>`TResult` or `null` if the record cannot be found.</returns>
    /// <exception cref="UnsupportedTransactionError">
    /// Thrown when gateway does not support retrieving recurring records.
    /// </exception>
    RecurringEntity.find = function (id) {
        var client = _1.ServicesContainer.instance().getRecurringClient();
        if (!client.supportsRetrieval) {
            throw new _1.UnsupportedTransactionError();
        }
        var identifier = RecurringEntity.getIdentifierName();
        return _1.RecurringService.search()
            .addSearchCriteria(identifier, id)
            .execute()
            .then(function (response) {
            if (!response) {
                return;
            }
            var entity = response[1];
            if (entity) {
                return _1.RecurringService.get(entity.key);
            }
            return;
        });
    };
    /// <summary>
    /// Lists all records of type `TResult`.
    /// </summary>
    /// <exception cref="UnsupportedTransactionError">
    /// Thrown when gateway does not support retrieving recurring records.
    /// </exception>
    RecurringEntity.findAll = function () {
        var client = _1.ServicesContainer.instance().getRecurringClient();
        if (client.supportsRetrieval) {
            return _1.RecurringService.search().execute();
        }
        throw new _1.UnsupportedTransactionError();
    };
    RecurringEntity.getIdentifierName = function () {
        // if ((typeof(TResult)).Equals(typeof(Customer)))
        //     return "customerIdentifier";
        // else if ((typeof(TResult)).Equals(typeof(RecurringPaymentMethod)))
        //     return "paymentMethodIdentifier";
        // else if ((typeof(TResult)).Equals(typeof(Schedule)))
        //     return "scheduleIdentifier";
        return "";
    };
    /// <summary>
    /// Creates a resource
    /// </summary>
    /// <returns>TResult</returns>
    RecurringEntity.prototype.create = function () {
        return _1.RecurringService.create(this);
    };
    /// <summary>
    /// Delete a record from the gateway.
    /// </summary>
    /// <param name="force">Indicates if the deletion should be forced</summary>
    /// <exception cref="ApiException">Thrown when the record cannot be deleted.</exception>
    RecurringEntity.prototype.delete = function (force) {
        if (force === void 0) { force = false; }
        return _1.RecurringService.delete(this, force);
    };
    /// <summary>
    /// The current record should be updated.
    /// </summary>
    /// <remarks>
    /// Any modified properties will be persisted with the gateway.
    /// </remarks>
    /// <exception cref="ApiException">Thrown when the record cannot be updated.</exception>
    RecurringEntity.prototype.saveChanges = function () {
        return _1.RecurringService.edit(this);
    };
    return RecurringEntity;
}());
exports.RecurringEntity = RecurringEntity;
