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
var RestGateway_1 = require("./RestGateway");
var PayPlanConnector = /** @class */ (function (_super) {
    __extends(PayPlanConnector, _super);
    function PayPlanConnector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.supportsRetrieval = true;
        _this.supportsUpdatePaymentDetails = false;
        return _this;
    }
    Object.defineProperty(PayPlanConnector.prototype, "secretApiKey", {
        get: function () {
            return this._secretApiKey;
        },
        set: function (value) {
            if (!value) {
                return;
            }
            this._secretApiKey = value;
            this.setAuthorizationHeader(this.secretApiKey);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PayPlanConnector.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            if (!value) {
                return;
            }
            this._username = value;
            this.setAuthorizationHeader(this.username + ":" + this.password);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PayPlanConnector.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            if (!value) {
                return;
            }
            this._password = value;
            this.setAuthorizationHeader(this.username + ":" + this.password);
        },
        enumerable: true,
        configurable: true
    });
    PayPlanConnector.prototype.processRecurring = function (builder) {
        var _this = this;
        var request = new Object();
        // todo
        if (builder.transactionType === _1.TransactionType.Create ||
            builder.transactionType === _1.TransactionType.Edit) {
            if (builder.entity instanceof _1.Customer) {
                request = this.buildCustomer(request, builder.entity);
            }
            if (builder.entity instanceof _1.RecurringPaymentMethod) {
                request = this.buildPaymentMethod(request, builder.entity, builder.transactionType);
            }
            if (builder.entity instanceof _1.Schedule) {
                request = this.buildSchedule(request, builder.entity, builder.transactionType);
            }
        }
        else if (builder.transactionType === _1.TransactionType.Search) {
            for (var entry in builder.searchCriteria) {
                if (builder.searchCriteria.hasOwnProperty(entry)) {
                    request[entry] = builder.searchCriteria[entry];
                }
            }
        }
        this.maybeSetIdentityHeader();
        this.maybeSetIntegrationHeader();
        return this.doTransaction(this.mapMethod(builder.transactionType), this.mapUrl(builder), JSON.stringify(request)).then(function (response) { return _this.mapResponse(builder, response); });
    };
    PayPlanConnector.prototype.mapResponse = function (builder, rawResponse) {
        var _this = this;
        if (!rawResponse) {
            return new Object();
        }
        var response = JSON.parse(rawResponse);
        var result;
        if (builder.entity instanceof _1.Customer &&
            builder.transactionType === _1.TransactionType.Search) {
            result = response.results.map(function (customer) {
                return _this.hydrateCustomer(customer);
            });
        }
        else if (builder.entity instanceof _1.Customer) {
            result = this.hydrateCustomer(response);
        }
        if (builder.entity instanceof _1.RecurringPaymentMethod &&
            builder.transactionType === _1.TransactionType.Search) {
            result = response.results.map(function (paymentMethod) {
                return _this.hydrateRecurringPaymentMethod(paymentMethod);
            });
        }
        else if (builder.entity instanceof _1.RecurringPaymentMethod) {
            result = this.hydrateRecurringPaymentMethod(response);
        }
        if (builder.entity instanceof _1.Schedule &&
            builder.transactionType === _1.TransactionType.Search) {
            result = response.results.map(function (schedule) {
                return _this.hydrateSchedule(schedule);
            });
        }
        else if (builder.entity instanceof _1.Schedule) {
            result = this.hydrateSchedule(response);
        }
        return result;
    };
    PayPlanConnector.prototype.buildCustomer = function (request, entity) {
        if (entity) {
            request.customerIdentifier = entity.id;
            request.firstName = entity.firstName;
            request.lastName = entity.lastName;
            request.company = entity.company;
            request.customerStatus = entity.status;
            request.primaryEmail = entity.email;
            request.phoneDay = entity.homePhone;
            request.phoneEvening = entity.workPhone;
            request.phoneMobile = entity.mobilePhone;
            request.fax = entity.fax;
            request.title = entity.title;
            request.department = entity.department;
            request = this.buildAddress(request, entity.address);
        }
        return request;
    };
    PayPlanConnector.prototype.buildPaymentMethod = function (request, entity, transactionType) {
        if (entity) {
            request.preferredPayment = entity.preferredPayment;
            request.paymentMethodIdentifier = entity.id;
            request.customerKey = entity.customerKey;
            request.nameOnAccount = entity.nameOnAccount;
            request = this.buildAddress(request, entity.address);
            if (transactionType === _1.TransactionType.Create) {
                var _a = this.hasToken(entity.paymentMethod), hasToken = _a.hasToken, tokenValue = _a.tokenValue;
                var paymentInfo = {};
                if (entity.paymentMethod.isCardData) {
                    var method = entity.paymentMethod;
                    paymentInfo.type = hasToken ? "SINGLEUSETOKEN" : null;
                    paymentInfo[hasToken ? "token" : "number"] = hasToken
                        ? tokenValue
                        : method.number;
                    paymentInfo.expMon = method.expMonth;
                    paymentInfo.expYear = method.expYear;
                    request.cardVerificationValue = method.cvn;
                    request[hasToken ? "alternateIdentity" : "card"] = paymentInfo;
                }
                else if (entity.paymentMethod.isTrackData) {
                    var method = entity.paymentMethod;
                    paymentInfo.data = method.value;
                    paymentInfo.dataEntryMode = method.entryMethod
                        .toString()
                        .toUpperCase();
                    request.track = paymentInfo;
                }
                else if (entity.paymentMethod instanceof _1.ECheck) {
                    var check = entity.paymentMethod;
                    request.achType = this.prepareAccountType(check.accountType);
                    request.accountType = this.prepareCheckType(check.checkType);
                    request.telephoneIndicator =
                        check.secCode === _1.SecCode.CCD || check.SecCode === _1.SecCode.PPD
                            ? false
                            : true;
                    request.routingNumber = check.routingNumber;
                    request.accountNumber = check.accountNumber;
                    request.accountHolderYob = check.birthYear.toString();
                    request.driversLicenseState = check.driversLicenseState;
                    request.driversLicenseNumber = check.driversLicenseNumber;
                    request.socialSecurityNumberLast4 = check.ssnLast4;
                    delete request.country;
                }
                if (entity.paymentMethod.isEncryptable) {
                    var enc = entity.paymentMethod
                        .encryptionData;
                    if (enc) {
                        paymentInfo.trackNumber = enc.trackNumber;
                        paymentInfo.key = enc.ktb;
                        paymentInfo.encryptionType = "E3";
                    }
                }
            }
            else {
                // edit fields
                delete request.customerKey;
                request.paymentStatus = entity.status;
                request.cpcTaxType = entity.taxType;
                request.expirationDate = entity.expirationDate;
            }
        }
        return request;
    };
    PayPlanConnector.prototype.buildSchedule = function (request, entity, transactionType) {
        var mapDuration = function () {
            if (entity.numberOfPayments) {
                return "Limited Number";
            }
            else if (entity.endDate) {
                return "End Date";
            }
            else {
                return "Ongoing";
            }
        };
        var mapProcessingDate = function () {
            var frequencies = [
                "Monthly",
                "Bi-Monthly",
                "Quarterly",
                "Semi-Annually",
            ];
            if (entity.frequency &&
                frequencies.indexOf(entity.frequency.toString()) !== -1) {
                switch (entity.paymentSchedule) {
                    case _1.PaymentSchedule.FirstDayOfTheMonth:
                        return "First";
                    case _1.PaymentSchedule.LastDayOfTheMonth:
                        return "Last";
                    default:
                        var day = entity.startDate.getUTCDate();
                        if (day > 28) {
                            return "Last";
                        }
                        return day.toString();
                }
            }
            else if (entity.frequency &&
                entity.frequency.toString() === "Semi-Monthly") {
                if (entity.paymentSchedule === _1.PaymentSchedule.LastDayOfTheMonth) {
                    return "Last";
                }
                return "First";
            }
            return null;
        };
        if (entity) {
            request.scheduleIdentifier = entity.id;
            request.scheduleName = entity.name;
            request.scheduleStatus = entity.status;
            request.paymentMethodKey = entity.paymentKey;
            request = this.buildAmount(request, "subtotalAmount", entity.amount, entity.currency, transactionType);
            request = this.buildAmount(request, "taxAmount", entity.taxAmount, entity.currency, transactionType);
            request.deviceId = entity.deviceId;
            request.processingDateInfo = mapProcessingDate();
            request = this.buildDate(request, "endDate", entity.endDate, transactionType === _1.TransactionType.Edit);
            request.reprocessingCount = entity.reprocessingCount || 3;
            if (entity.emailReceipt) {
                request.emailReceipt = entity.emailReceipt.toString();
            }
            request.emailAdvanceNotice = entity.emailNotification ? "Yes" : "No";
            // debt repay ind
            request.invoiceNbr = entity.invoiceNumber;
            request.poNumber = entity.poNumber;
            request.description = entity.description;
            request.numberOfPayments = entity.numberOfPayments;
            if (transactionType === _1.TransactionType.Create) {
                request.customerKey = entity.customerKey;
                request = this.buildDate(request, "startDate", entity.startDate);
                if (entity.frequency) {
                    request.frequency = entity.frequency.toString();
                }
                request.duration = mapDuration();
            }
            else {
                // edit Fields
                if (!entity.hasStarted) {
                    request = this.buildDate(request, "startDate", entity.startDate);
                    if (entity.frequency) {
                        request.frequency = entity.frequency.toString();
                    }
                    request.duration = mapDuration();
                }
                else {
                    request = this.buildDate(request, "cancellationDate", entity.cancellationDate);
                    request = this.buildDate(request, "nextProcressingDate", entity.nextProcessingDate);
                }
            }
        }
        return request;
    };
    PayPlanConnector.prototype.prepareAccountType = function (type) {
        switch (type) {
            case _1.AccountType.Savings:
                return "Savings";
            case _1.AccountType.Checking:
            default:
                return "Checking";
        }
    };
    PayPlanConnector.prototype.prepareCheckType = function (type) {
        switch (type) {
            case _1.CheckType.Business:
                return "Business";
            case _1.CheckType.Payroll:
                return "Payroll";
            case _1.CheckType.Personal:
            default:
                return "Personal";
        }
    };
    PayPlanConnector.prototype.buildAddress = function (request, address) {
        if (address) {
            request.addressLine1 = address.streetAddress1;
            request.addressLine2 = address.streetAddress2;
            request.city = address.city;
            request.country = address.country;
            request.stateProvince = address.state;
            request.zipPostalCode = address.postalCode;
        }
        return request;
    };
    PayPlanConnector.prototype.buildAmount = function (request, name, amount, currency, transactionType) {
        if (amount) {
            request[name] = {
                value: parseFloat(amount.toString()) * 100,
            };
            if (transactionType === _1.TransactionType.Create) {
                request[name].currency = currency;
            }
        }
        return request;
    };
    PayPlanConnector.prototype.buildDate = function (request, name, date, force) {
        if (force === void 0) { force = false; }
        var getDateValue = function (d) {
            var day = _1.StringUtils.leftPad(d.getUTCDate().toString(), 2, "0");
            var month = _1.StringUtils.leftPad((d.getUTCMonth() + 1).toString(), 2, "0");
            var year = _1.StringUtils.leftPad(d.getUTCFullYear().toString(), 4, "0");
            return month + day + year;
        };
        if (date || force) {
            var value = date ? getDateValue(date) : null;
            request[name] = value;
        }
        return request;
    };
    PayPlanConnector.prototype.mapMethod = function (transactionType) {
        switch (transactionType) {
            case _1.TransactionType.Create:
            case _1.TransactionType.Search:
                return "POST";
            case _1.TransactionType.Edit:
                return "PUT";
            case _1.TransactionType.Delete:
                return "DELETE";
            default:
                return "GET";
        }
    };
    PayPlanConnector.prototype.mapUrl = function (builder) {
        var suffix = "";
        if (builder.transactionType === _1.TransactionType.Fetch ||
            builder.transactionType === _1.TransactionType.Delete ||
            builder.transactionType === _1.TransactionType.Edit) {
            suffix = "/" + builder.entity.key;
        }
        if (builder.entity instanceof _1.Customer) {
            return ((builder.transactionType === _1.TransactionType.Search
                ? "searchCustomers"
                : "customers") + suffix);
        }
        if (builder.entity instanceof _1.RecurringPaymentMethod) {
            var paymentMethod = "";
            if (builder.transactionType === _1.TransactionType.Create) {
                paymentMethod =
                    builder.entity.paymentMethod instanceof _1.Credit ? "CreditCard" : "ACH";
            }
            else if (builder.transactionType === _1.TransactionType.Edit) {
                paymentMethod = builder.entity.paymentType.replace(" ", "");
            }
            return ((builder.transactionType === _1.TransactionType.Search
                ? "searchPaymentMethods"
                : "paymentMethods") +
                paymentMethod +
                suffix);
        }
        if (builder.entity instanceof _1.Schedule) {
            return ((builder.transactionType === _1.TransactionType.Search
                ? "searchSchedules"
                : "schedules") + suffix);
        }
        throw new _1.UnsupportedTransactionError();
    };
    PayPlanConnector.prototype.hydrateCustomer = function (response) {
        var customer = new _1.Customer();
        customer.key = response.customerKey;
        customer.id = response.customerIdentifier;
        customer.firstName = response.firstName;
        customer.lastName = response.lastName;
        customer.company = response.company;
        customer.status = response.customerStatus;
        customer.title = response.title;
        customer.department = response.department;
        customer.email = response.primaryEmail;
        customer.homePhone = response.phoneDay;
        customer.workPhone = response.phoneEvening;
        customer.mobilePhone = response.phoneMobile;
        customer.fax = response.fax;
        customer.address = new _1.Address();
        customer.address.streetAddress1 = response.addressLine1;
        customer.address.streetAddress2 = response.addressLine2;
        customer.address.city = response.city;
        customer.address.province = response.stateProvince;
        customer.address.postalCode = response.zipPostalCode;
        customer.address.country = response.country;
        return customer;
    };
    PayPlanConnector.prototype.hydrateRecurringPaymentMethod = function (response) {
        var paymentMethod = new _1.RecurringPaymentMethod();
        paymentMethod.key = response.paymentMethodKey;
        paymentMethod.paymentType = response.paymentMethodType;
        paymentMethod.preferredPayment = response.preferredPayment;
        paymentMethod.status = response.paymentStatus;
        paymentMethod.id = response.paymentMethodIdentifier;
        paymentMethod.customerKey = response.customerKey;
        paymentMethod.nameOnAccount = response.nameOnAccount;
        paymentMethod.commercialIndicator = response.cpcInd;
        paymentMethod.taxType = response.cpcTaxType;
        paymentMethod.expirationDate = response.expirationDate;
        paymentMethod.address = new _1.Address();
        paymentMethod.address.streetAddress1 = response.addressLine1;
        paymentMethod.address.streetAddress2 = response.addressLine2;
        paymentMethod.address.city = response.city;
        paymentMethod.address.state = response.stateProvince;
        paymentMethod.address.postalCode = response.zipPostalCode;
        paymentMethod.address.country = response.country;
        return paymentMethod;
    };
    PayPlanConnector.prototype.hydrateSchedule = function (response) {
        var schedule = new _1.Schedule();
        schedule.key = response.scheduleKey;
        schedule.id = response.scheduleIdentifier;
        schedule.customerKey = response.customerKey;
        schedule.name = response.scheduleName;
        schedule.status = response.scheduleStatus;
        schedule.paymentKey = response.paymentMethodKey;
        if (response.subtotalAmount) {
            var subtotal = response.subtotalAmount;
            schedule.amount = subtotal.value;
            schedule.currency = subtotal.currency;
        }
        if (response.taxAmount) {
            var taxAmount = response.taxAmount;
            schedule.taxAmount = taxAmount.value;
        }
        schedule.deviceId = response.deviceId;
        schedule.startDate = new Date(response.startDate);
        schedule.paymentSchedule = (function (value) {
            switch (value) {
                case "Last":
                    return _1.PaymentSchedule.LastDayOfTheMonth;
                case "First":
                    return _1.PaymentSchedule.FirstDayOfTheMonth;
                default:
                    return _1.PaymentSchedule.Dynamic;
            }
        })(response.processingDateInfo);
        schedule.frequency = response.frequency;
        schedule.endDate = new Date(response.endDate);
        schedule.reprocessingCount = response.reprocessingCount;
        schedule.emailReceipt = response.emailReceipt;
        schedule.emailNotification = (function (value) {
            if (!value) {
                return false;
            }
            return value === "No" ? false : true;
        })(response.emailNotification);
        // dept repay indicator
        schedule.invoiceNumber = response.invoiceNbr;
        schedule.poNumber = response.poNumber;
        schedule.description = response.description;
        // statusSetDate
        schedule.nextProcessingDate = new Date(response.nextProcessingDate);
        // previousProcessingDate
        // approvedTransactionCount
        // failureCount
        // totalApprovedAmountToDate
        // numberOfPaymentsRemaining
        schedule.cancellationDate = new Date(response.cancellationDate);
        // creationDate
        // lastChangeDate
        schedule.hasStarted = response.scheduleStarted;
        return schedule;
    };
    PayPlanConnector.prototype.hasToken = function (paymentMethod) {
        var tokenizable = paymentMethod;
        if (tokenizable.token) {
            return {
                hasToken: true,
                tokenValue: tokenizable.token,
            };
        }
        return {
            hasToken: false,
            tokenValue: "",
        };
    };
    PayPlanConnector.prototype.setAuthorizationHeader = function (value) {
        var buffer = (Buffer.from ? Buffer.from(value) : new Buffer(value));
        var auth = "Basic " + buffer.toString("base64");
        this.headers[RestGateway_1.RestGateway.AUTHORIZATION_HEADER] = auth;
    };
    PayPlanConnector.prototype.maybeSetIdentityHeader = function () {
        var identity = [];
        if (this.siteId) {
            identity.push("SiteID=" + this.siteId);
        }
        if (this.deviceId) {
            identity.push("DeviceID=" + this.deviceId);
        }
        if (this.licenseId) {
            identity.push("LicenseID=" + this.licenseId);
        }
        if (identity.length > 0) {
            this.headers['HPS-Identity'] = identity.join(',');
        }
    };
    PayPlanConnector.prototype.maybeSetIntegrationHeader = function () {
        if (this.versionNumber || this.developerId) {
            this.headers['HPS-Integration'] = "DeveloperId=" + this.developerId + ",VersionNbr=" + this.versionNumber;
        }
    };
    return PayPlanConnector;
}(RestGateway_1.RestGateway));
exports.PayPlanConnector = PayPlanConnector;
