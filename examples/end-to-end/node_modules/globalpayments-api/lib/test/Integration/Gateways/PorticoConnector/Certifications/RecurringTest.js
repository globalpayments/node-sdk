"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("../../../../../src/");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MbPdAQBL1l4A2ThZoTBKXEdEG1rIi7KAa6Yskl9Nzg";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";
var BATCH_NOT_OPEN = "Transaction was rejected because it requires a batch to be open.";
var BATCH_EMPTY = "Batch close was rejected because no transactions are associated with the currently open batch";
var test = ava_1.default.serial;
var customerPerson;
var customerBusiness;
var paymentMethodVisa;
var paymentMethodMasterCard;
var paymentMethodCheckPpd;
var paymentMethodCheckCcd;
var scheduleVisa;
var scheduleMasterCard;
var scheduleCheckPpd;
var scheduleCheckCcd;
var todayDate = _1.GenerationUtils.generateTimestamp();
var getIdentifier = function (id) {
    return (todayDate + "-" + id + "-" + _1.StringUtils.uuid()).substr(0, 50);
};
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
ava_1.default.before("000 - close batch", function (t) {
    t.plan(1);
    return new Promise(function (resolve, reject) {
        _1.BatchService.closeBatch()
            .then(function (response) {
            t.truthy(response);
            resolve();
        })
            .catch(function (e) {
            if (e.message.indexOf(BATCH_NOT_OPEN) !== -1 ||
                e.message.indexOf(BATCH_EMPTY) !== -1) {
                t.pass();
                resolve();
                return;
            }
            reject(e);
        });
    });
});
test.before("000 - cleanup", function () { return __awaiter(_this, void 0, void 0, function () {
    var results, _a, _b, _i, result, schedule, _e_1, results, _c, _d, _f, result, paymentMethod, _e_2, results, _g, _h, _j, result, customer, _e_3;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _k.trys.push([0, 6, , 7]);
                return [4 /*yield*/, _1.Schedule.findAll()];
            case 1:
                results = _k.sent();
                _a = [];
                for (_b in results)
                    _a.push(_b);
                _i = 0;
                _k.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                result = _a[_i];
                if (!results.hasOwnProperty(result)) return [3 /*break*/, 4];
                schedule = results[result];
                return [4 /*yield*/, schedule.delete(true)];
            case 3:
                _k.sent();
                _k.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6:
                _e_1 = _k.sent();
                return [3 /*break*/, 7];
            case 7:
                _k.trys.push([7, 13, , 14]);
                return [4 /*yield*/, _1.RecurringPaymentMethod.findAll()];
            case 8:
                results = _k.sent();
                _c = [];
                for (_d in results)
                    _c.push(_d);
                _f = 0;
                _k.label = 9;
            case 9:
                if (!(_f < _c.length)) return [3 /*break*/, 12];
                result = _c[_f];
                if (!results.hasOwnProperty(result)) return [3 /*break*/, 11];
                paymentMethod = results[result];
                return [4 /*yield*/, paymentMethod.delete(true)];
            case 10:
                _k.sent();
                _k.label = 11;
            case 11:
                _f++;
                return [3 /*break*/, 9];
            case 12: return [3 /*break*/, 14];
            case 13:
                _e_2 = _k.sent();
                return [3 /*break*/, 14];
            case 14:
                _k.trys.push([14, 20, , 21]);
                return [4 /*yield*/, _1.Customer.findAll()];
            case 15:
                results = _k.sent();
                _g = [];
                for (_h in results)
                    _g.push(_h);
                _j = 0;
                _k.label = 16;
            case 16:
                if (!(_j < _g.length)) return [3 /*break*/, 19];
                result = _g[_j];
                if (!results.hasOwnProperty(result)) return [3 /*break*/, 18];
                customer = results[result];
                return [4 /*yield*/, customer.delete(true)];
            case 17:
                _k.sent();
                _k.label = 18;
            case 18:
                _j++;
                return [3 /*break*/, 16];
            case 19: return [3 /*break*/, 21];
            case 20:
                _e_3 = _k.sent();
                return [3 /*break*/, 21];
            case 21: return [2 /*return*/];
        }
    });
}); });
// customer setup
test("001 - add customer person", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var customer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                customer = new _1.Customer();
                customer.id = getIdentifier("Person");
                customer.firstName = "John";
                customer.lastName = "Doe";
                customer.status = "Active";
                customer.email = "john.doe@email.com";
                customer.address = new _1.Address();
                customer.address.streetAddress1 = "123 Main St.";
                customer.address.city = "Dallas";
                customer.address.state = "TX";
                customer.address.postalCode = "98765";
                customer.address.country = "USA";
                customer.workPhone = "5551112222";
                return [4 /*yield*/, customer.create()];
            case 1:
                customer = _a.sent();
                t.truthy(customer);
                t.truthy(customer.key);
                customerPerson = customer;
                return [2 /*return*/];
        }
    });
}); });
test("002 - add customer person", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var customer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                customer = new _1.Customer();
                customer.id = getIdentifier("Business");
                customer.company = "AcmeCo";
                customer.status = "Active";
                customer.email = "acme@email.com";
                customer.address = new _1.Address();
                customer.address.streetAddress1 = "987 Elm St.";
                customer.address.city = "Princeton";
                customer.address.state = "NJ";
                customer.address.postalCode = "12345";
                customer.address.country = "USA";
                customer.workPhone = "5551112222";
                return [4 /*yield*/, customer.create()];
            case 1:
                customer = _a.sent();
                t.truthy(customer);
                t.truthy(customer.key);
                customerBusiness = customer;
                return [2 /*return*/];
        }
    });
}); });
// payment method setup
test("003 - add payment credit visa", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var card, paymentMethod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!customerPerson) {
                    return [2 /*return*/];
                }
                card = new _1.CreditCardData();
                card.number = "4012002000060016";
                card.expMonth = "12";
                card.expYear = "2025";
                return [4 /*yield*/, customerPerson
                        .addPaymentMethod(getIdentifier("CreditV"), card)
                        .create()];
            case 1:
                paymentMethod = _a.sent();
                t.truthy(paymentMethod);
                t.truthy(paymentMethod.key);
                paymentMethodVisa = paymentMethod;
                return [2 /*return*/];
        }
    });
}); });
test("004 - add payment credit visa", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var card, paymentMethod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!customerPerson) {
                    return [2 /*return*/];
                }
                card = new _1.CreditCardData();
                card.number = "5473500000000014";
                card.expMonth = "12";
                card.expYear = "2025";
                return [4 /*yield*/, customerPerson
                        .addPaymentMethod(getIdentifier("CreditMC"), card)
                        .create()];
            case 1:
                paymentMethod = _a.sent();
                t.truthy(paymentMethod);
                t.truthy(paymentMethod.key);
                paymentMethodMasterCard = paymentMethod;
                return [2 /*return*/];
        }
    });
}); });
test("005 - add payment check ppd", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var check, paymentMethod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!customerPerson) {
                    return [2 /*return*/];
                }
                check = new _1.ECheck();
                check.accountType = _1.AccountType.Checking;
                check.checkType = _1.CheckType.Personal;
                check.secCode = _1.SecCode.PPD;
                check.routingNumber = "490000018";
                check.driversLicenseNumber = "7418529630";
                check.driversLicenseState = "TX";
                check.accountNumber = "24413815";
                check.birthYear = "1989";
                return [4 /*yield*/, customerPerson
                        .addPaymentMethod(getIdentifier("CheckPPD"), check)
                        .create()];
            case 1:
                paymentMethod = _a.sent();
                t.truthy(paymentMethod);
                t.truthy(paymentMethod.key);
                paymentMethodCheckPpd = paymentMethod;
                return [2 /*return*/];
        }
    });
}); });
test("006 - add payment check ccd", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var check, paymentMethod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!customerBusiness) {
                    return [2 /*return*/];
                }
                check = new _1.ECheck();
                check.accountType = _1.AccountType.Checking;
                check.checkType = _1.CheckType.Business;
                check.secCode = _1.SecCode.CCD;
                check.routingNumber = "490000018";
                check.driversLicenseNumber = "7418529630";
                check.driversLicenseState = "TX";
                check.accountNumber = "24413815";
                check.birthYear = "1989";
                return [4 /*yield*/, customerBusiness
                        .addPaymentMethod(getIdentifier("CheckCCD"), check)
                        .create()];
            case 1:
                paymentMethod = _a.sent();
                t.truthy(paymentMethod);
                t.truthy(paymentMethod.key);
                paymentMethodCheckCcd = paymentMethod;
                return [2 /*return*/];
        }
    });
}); });
// managed schedule
test("008 - add schedule credit visa", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodVisa) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodVisa
                        .addSchedule(getIdentifier("CreditV"))
                        .withStartDate(new Date(2027, 1, 1))
                        .withAmount(30.01)
                        .withFrequency(_1.ScheduleFrequency.Weekly)
                        .withReprocessingCount(1)
                        .withStatus("Active")
                        .withEmailReceipt(_1.EmailReceipt.Never)
                        .create()];
            case 1:
                schedule = _a.sent();
                t.truthy(schedule);
                t.truthy(schedule.key);
                scheduleVisa = schedule;
                return [2 /*return*/];
        }
    });
}); });
test("009 - add schedule credit mastercard", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodMasterCard) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodMasterCard
                        .addSchedule(getIdentifier("CreditMC"))
                        .withStartDate(new Date(2027, 1, 1))
                        .withEndDate(new Date(2027, 3, 1))
                        .withAmount(30.02)
                        .withFrequency(_1.ScheduleFrequency.Weekly)
                        .withReprocessingCount(2)
                        .withStatus("Active")
                        .withEmailReceipt(_1.EmailReceipt.Never)
                        .create()];
            case 1:
                schedule = _a.sent();
                t.truthy(schedule);
                t.truthy(schedule.key);
                scheduleMasterCard = schedule;
                return [2 /*return*/];
        }
    });
}); });
test("010 - add schedule check ppd", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodCheckPpd) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodCheckPpd
                        .addSchedule(getIdentifier("CheckPPD"))
                        .withStartDate(new Date(2027, 1, 1))
                        .withAmount(30.03)
                        .withFrequency(_1.ScheduleFrequency.Monthly)
                        .withReprocessingCount(1)
                        .withNumberOfPayments(2)
                        .withStatus("Active")
                        .withEmailReceipt(_1.EmailReceipt.Never)
                        .create()];
            case 1:
                schedule = _a.sent();
                t.truthy(schedule);
                t.truthy(schedule.key);
                scheduleCheckPpd = schedule;
                return [2 /*return*/];
        }
    });
}); });
test("011 - add schedule check ccd", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodCheckCcd) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodCheckCcd
                        .addSchedule(getIdentifier("CheckCCD"))
                        .withStartDate(new Date(2027, 1, 1))
                        .withAmount(30.04)
                        .withFrequency(_1.ScheduleFrequency.BiWeekly)
                        .withReprocessingCount(1)
                        .withStatus("Active")
                        .withEmailReceipt(_1.EmailReceipt.Never)
                        .create()];
            case 1:
                schedule = _a.sent();
                t.truthy(schedule);
                t.truthy(schedule.key);
                scheduleCheckCcd = schedule;
                return [2 /*return*/];
        }
    });
}); });
// recurring billing
test("014 - recurring billing visa", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodVisa || !scheduleVisa) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodVisa
                        .charge(20.01)
                        .withCurrency("USD")
                        .withScheduleId(scheduleVisa.key)
                        .withOneTimePayment(false)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("015 - recurring billing mastercard", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodMasterCard || !scheduleMasterCard) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodMasterCard
                        .charge(20.02)
                        .withCurrency("USD")
                        .withScheduleId(scheduleMasterCard.key)
                        .withOneTimePayment(false)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("016 - recurring billing check ppd", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodCheckPpd || !scheduleCheckPpd) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodCheckPpd
                        .charge(20.03)
                        .withCurrency("USD")
                        .withScheduleId(scheduleCheckPpd.key)
                        .withOneTimePayment(false)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("017 - recurring billing check ccd", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodCheckCcd || !scheduleCheckCcd) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodCheckCcd
                        .charge(20.04)
                        .withCurrency("USD")
                        .withScheduleId(scheduleCheckCcd.key)
                        .withOneTimePayment(false)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
// recurring billing - one time
test("018 - recurring billing one time visa", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodVisa) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodVisa.charge(20.06).execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("019 - recurring billing one time mastercard", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodMasterCard) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodMasterCard
                        .charge(20.07)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("020 - recurring billing one time check ppd", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodCheckPpd) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodCheckPpd
                        .charge(20.08)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("021 - recurring billing one time check ccd", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodCheckCcd) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodCheckCcd
                        .charge(20.09)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
// recurring billing - one time - declines
test("022 - recurring billing one time visa decline", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodVisa) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodVisa.charge(10.08).execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "51");
                return [2 /*return*/];
        }
    });
}); });
test("023 - recurring billing one time check ppd decline", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                if (!paymentMethodCheckPpd) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, paymentMethodCheckPpd
                        .charge(25.02)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test.after("999 - close batch", function (t) {
    t.plan(1);
    return new Promise(function (resolve, reject) {
        _1.BatchService.closeBatch()
            .then(function (response) {
            t.truthy(response);
            resolve();
        })
            .catch(function (e) {
            if (e.message.indexOf(BATCH_NOT_OPEN) !== -1 ||
                e.message.indexOf(BATCH_EMPTY) !== -1) {
                t.pass();
                resolve();
                return;
            }
            reject(e);
        });
    });
});
