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
var _1 = require("./");
var Schedule = /** @class */ (function (_super) {
    __extends(Schedule, _super);
    function Schedule(customerKey, paymentKey) {
        var _this = _super.call(this) || this;
        if (customerKey) {
            _this.customerKey = customerKey;
        }
        if (paymentKey) {
            _this.paymentKey = paymentKey;
        }
        return _this;
    }
    Object.defineProperty(Schedule.prototype, "totalAmount", {
        /// <summary>
        /// The total amount for the schedule (`Amount` + `TaxAmount`).
        /// </summary>
        get: function () {
            return (parseFloat(this.amount.toString()) + parseFloat(this.taxAmount.toString()));
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// Sets the schedule's amount.
    /// </summary>
    /// <param name="value">The amount</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withAmount = function (value) {
        if (value) {
            this.amount = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's currency.
    /// </summary>
    /// <param name="value">The currency</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withCurrency = function (value) {
        if (value) {
            this.currency = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's customer.
    /// </summary>
    /// <param name="value">The customer's key</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withCustomerKey = function (value) {
        if (value) {
            this.customerKey = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's description.
    /// </summary>
    /// <param name="value">The description</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withDescription = function (value) {
        if (value) {
            this.description = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's device ID.
    /// </summary>
    /// <param name="value">The device ID</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withDeviceId = function (value) {
        if (value) {
            this.deviceId = value;
        }
        return this;
    };
    /// <summary>
    /// Sets whether the schedule should send email notifications.
    /// </summary>
    /// <param name="value">The email notification flag</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withEmailNotification = function (value) {
        if (value) {
            this.emailNotification = value;
        }
        return this;
    };
    /// <summary>
    /// Sets when the schedule should email receipts.
    /// </summary>
    /// <param name="value">When the schedule should email receipts</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withEmailReceipt = function (value) {
        if (value) {
            this.emailReceipt = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's end date.
    /// </summary>
    /// <param name="value">The end date</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withEndDate = function (value) {
        if (value) {
            this.endDate = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's frequency.
    /// </summary>
    /// <param name="value">The frequency</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withFrequency = function (value) {
        if (value) {
            this.frequency = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's invoice number.
    /// </summary>
    /// <param name="value">The invoice number</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withInvoiceNumber = function (value) {
        if (value) {
            this.invoiceNumber = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's name.
    /// </summary>
    /// <param name="value">The name</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withName = function (value) {
        if (value) {
            this.name = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's number of payments.
    /// </summary>
    /// <param name="value">The number of payments</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withNumberOfPayments = function (value) {
        if (value) {
            this.numberOfPayments = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's purchase order (PO) number.
    /// </summary>
    /// <param name="value">The purchase order (PO) number</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withPoNumber = function (value) {
        if (value) {
            this.poNumber = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's payment method.
    /// </summary>
    /// <param name="value">The payment method's key</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withPaymentKey = function (value) {
        if (value) {
            this.paymentKey = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's recurring schedule.
    /// </summary>
    /// <param name="value">The recurring schedule</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withPaymentSchedule = function (value) {
        if (value) {
            this.paymentSchedule = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's reprocessing count.
    /// </summary>
    /// <param name="value">The reprocessing count</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withReprocessingCount = function (value) {
        if (value) {
            this.reprocessingCount = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's start date.
    /// </summary>
    /// <param name="value">The start date</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withStartDate = function (value) {
        if (value) {
            this.startDate = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's status.
    /// </summary>
    /// <param name="value">The new status</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withStatus = function (value) {
        if (value) {
            this.status = value;
        }
        return this;
    };
    /// <summary>
    /// Sets the schedule's tax amount.
    /// </summary>
    /// <param name="value">The tax amount</param>
    /// <returns>Schedule</returns>
    Schedule.prototype.withTaxAmount = function (value) {
        if (value) {
            this.taxAmount = value;
        }
        return this;
    };
    return Schedule;
}(_1.RecurringEntity));
exports.Schedule = Schedule;
