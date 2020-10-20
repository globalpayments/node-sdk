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
var throttle = function () { return new Promise(function (resolve) { return setTimeout(resolve, 1500); }); };
ava_1.default.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, throttle()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-006a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-006b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-006c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-006d")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-006e")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-006f")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-006g")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-006h")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006i", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-006i")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006j", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-006j")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_006k", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-006k")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_007a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-007a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_007b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-007b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_007c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-007c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_007d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-007d")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_007e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-007e")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_008a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-008a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_008b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-008b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_008c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-008c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_008d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-008d")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_008e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-008e")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_009a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOM";
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-009a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_009b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "E";
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-009b")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_009c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                config.channel = "ECOMMERCE";
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-009c")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_009d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-009d")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_010a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-010a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_010b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-010b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_010c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-010c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_010d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-010d")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_010e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-010e")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_011a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-011a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_011b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-011b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_011c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-011c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_011d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(10)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                error = t.throws(function () {
                    return card
                        .charge()
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-011d")
                        .execute();
                }, _1.BuilderError);
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_012a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-012a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_012b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("EURO")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("EURO")
                        .withDescription("JAVA-Manual-012b")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_012c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("�UR")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("�UR")
                        .withDescription("JAVA-Manual-012c")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_012d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        t.plan(2);
        config = new _1.ServicesConfig();
        config.merchantId = "heartlandgpsandbox";
        config.accountId = "api";
        config.sharedSecret = "secret";
        config.refundPassword = "refund";
        config.rebatePassword = "rebate";
        config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
        config.timeout = 20000;
        _1.ServicesContainer.configure(config);
        card = new _1.CreditCardData();
        card.number = "4263970000005262";
        card.expMonth = "12";
        card.expYear = "2020";
        card.cvn = "123";
        card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
        card.cardHolderName = "James Mason";
        error = t.throws(function () {
            return card
                .charge(100.01)
                .withDescription("JAVA-Manual-012d")
                .execute();
        }, _1.BuilderError);
        t.truthy(error.message);
        return [2 /*return*/];
    });
}); });
ava_1.default("JAVA_Manual_013a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-013a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_013b1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-013b1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_013b2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-013b2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_013c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-013c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_014a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-014a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_014b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-014b")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_014c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName =
                    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-014c")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_014d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James~Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-014d")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_015a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-015a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_015b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-015b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_015c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "20";
                card.expYear = "2012";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-015c")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_015d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-015d")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_016a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-016a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_016b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-016b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_016c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-016c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_017a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-017a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_018a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-018a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_019a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-019a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_019b1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-019b1")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_019b2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "374101000000608";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-019b2")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_019c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "12345";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-019c")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_019d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "374101000000608";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-019d")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_020a1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-020a1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_020a2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Illegible;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-020a2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_020a3", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.NotOnCard;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-020a3")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_020a4", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.NotRequested;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-020a4")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_020b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = 5;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-020b")
                        .execute(), _1.GatewayError)];
            case 3:
                // request
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_020c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = 0;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-020c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_021a1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-021a1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_021a2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .authorize(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-021a2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_021a3", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .authorize(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-021a3")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_021b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .authorize(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-021b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_021c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .authorize(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-021c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_022a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-022a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_022b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-022b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_022c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-022c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_022d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-022d")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_022e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-022e")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_023a1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-023a1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_023a2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-023a2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_023b1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-023b1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_023c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-023c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_024a1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-024a1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_024a2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-024a2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_024a3", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-024a3")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_024b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-024b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_024c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-024c")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_025", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-025")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_026a1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-026a1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_026a2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_026b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_026c1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIep3uviSnW9XEB3a4wpIW9XEB3a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_026c2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-026c2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_027a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withCustomerId("123456")
                        .withDescription("JAVA-Manual-027a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_028a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("123456")
                        .withDescription("JAVA-Manual-028a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_028b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-028b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_028c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withCustomerId("3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep33a4wpQQQQQQQQQ1")
                        .withDescription("JAVA-Manual-028c")
                        .execute(), _1.GatewayError)];
            case 3:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_028d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("123456~")
                        .withDescription("JAVA-Manual-028d")
                        .execute(), _1.GatewayError)];
            case 3:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_029a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withProductId("123456")
                        .withDescription("JAVA-Manual-029a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_029b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withDescription("JAVA-Manual-029b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_029c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withProductId("3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep33a4wpQQQQQQQQQ1")
                        .withDescription("JAVA-Manual-029c")
                        .execute(), _1.GatewayError)];
            case 3:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_029d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withProductId("123456~")
                        .withDescription("JAVA-Manual-029d")
                        .execute(), _1.GatewayError)];
            case 3:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_030a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withClientTransactionId("123456")
                        .withDescription("JAVA-Manual-030a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_030b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-030b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_030c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withClientTransactionId("3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep33a4wpQQQQQQQQQ1")
                        .withDescription("JAVA-Manual-030c")
                        .execute(), _1.GatewayError)];
            case 3:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_030d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withClientTransactionId("123456~")
                        .withDescription("JAVA-Manual-030d")
                        .execute(), _1.GatewayError)];
            case 3:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_031a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerIpAddress("123.123.123.123")
                        .withDescription("JAVA-Manual-031a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_031b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-031b")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_031c1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withCustomerIpAddress("123.123.123.123")
                        .withDescription("JAVA-Manual-031c1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_031c2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerIpAddress("123.123.123.123")
                        .withDescription("JAVA-Manual-031c2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_032a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "E77 4QJ";
                billingAddress.country = "United Kingdom";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "Z76 PO9";
                shippingAddress.country = "France";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Manual-032a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_033a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "774|10";
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "769|52";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Manual-033a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_033b1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode = "774|10";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withAddress(billingAddress)
                        .withDescription("JAVA-Manual-033b1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_033b2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, shippingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                shippingAddress = new _1.Address();
                shippingAddress.postalCode = "769|52";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Manual-033b2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_033c1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.postalCode =
                    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withAddress(billingAddress)
                        .withDescription("JAVA-Manual-033c1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_033c2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, shippingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                shippingAddress = new _1.Address();
                shippingAddress.postalCode =
                    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Manual-033c2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_034a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Manual-034a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_034b1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, shippingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                shippingAddress = new _1.Address();
                shippingAddress.country = "GB";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Manual-034b1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_034b2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.country = "GB";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withAddress(billingAddress)
                        .withDescription("JAVA-Manual-034b2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_034c1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                billingAddress = new _1.Address();
                billingAddress.country =
                    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withAddress(billingAddress)
                        .withDescription("JAVA-Manual-034c1")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_034c2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, shippingAddress, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                shippingAddress = new _1.Address();
                shippingAddress.country =
                    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwep4wpIwep3u111";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("USD")
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-Manual-034c2")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_035a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withDescription("JAVA-Manual-035a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Manual_035b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 20000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .execute()];
            case 1:
                saleResponse = _a.sent();
                t.truthy(saleResponse);
                t.is("00", saleResponse.responseCode);
                return [4 /*yield*/, throttle()];
            case 2:
                _a.sent();
                return [4 /*yield*/, card
                        .charge(100.01)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Manual-035a")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
