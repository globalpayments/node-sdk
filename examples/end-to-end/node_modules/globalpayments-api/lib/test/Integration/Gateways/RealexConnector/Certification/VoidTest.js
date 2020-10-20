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
ava_1.default("JAVA_Void_Sample", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_006a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_006b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_006c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_006d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_006e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_006f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_006g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_006h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_006i", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_006k", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_007a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_007b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_007c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_007d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_007e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_008a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_008b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_008c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_008d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_009e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
                config.channel = "EC";
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
                return [4 /*yield*/, t.throws(saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute(), _1.GatewayError)];
            case 3:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_009a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_009b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_009c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
                // tslint:disable:max-line-length
                config.channel =
                    "ECOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOm";
                // tslint:enable:max-line-length
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
                return [4 /*yield*/, t.throws(saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute(), _1.GatewayError)];
            case 3:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_009d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
                config.channel = "ECO#";
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
                return [4 /*yield*/, t.throws(saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute(), _1.GatewayError)];
            case 3:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_010c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_010d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_010e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_011a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_011b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_011c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_011d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_012a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_012b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_012c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_012d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_013a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_014a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_014b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_014c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("akshdfgakjdshfgjdshgfkjdsahgfjshagdfjshdagfkjdshgfjshdgfjdshgfkjhdsagfjdsgfdskjgfdsjkhgfdsjhgfkdsjgfkjdshgfkjdsahgfjdskhgfjhdsgfjkhsdgfjkhsdgfjhsdgfjhsdgfkjhgsadjfhgsakjdhgfsajdhgfkjsadgfjhsadgfjkhdsgafjhdsgfjhdsgfjhdsgfkjhdgsafjkhgsfjhsdagfkjsgdafjhsgdfjhgdskjfgdsjfhgjdskhgfjhdsgfjhdsgfkjhgdsfkjhgsdkjfgsdkjhgfkjsahgdfkjgdsajfhgdsjkgfjdshgfjkdsagfjkhdsgfjsdhgfjkdshgfkjhgdsfkjhgdskjfgdskjgfkjdsahgfjhgdsakjfgdsafjhgdsjkhgfkjdshgfakjadshgfjhdsagfjhgdsfjhgsdakjfgdsakjhgfjsdhgfjhdsgfjhdsgfkjgdsajkfhgjdshgfjdsahgfjkhdsagfjhdsgfjkgdsfjhdsgfjhgdsjfhgdsjhfgjdshgfkjdsgfkjsadgfjkgdsfkjhgdsajfkhgdsjkgfkjdsagfkjgdsakjfhgdsfjkhgdsafkjgsadkjgfdkjsahgfkjsagfkjdshgfkjshdgfjgdsfkjgsadkjhgfdsjhgfkjdsagfjhdsgfjhgdsakjfgdsakjhgfjsdahgfjkgdsfjhgdsajkhfgjhdsagfkjhsgdakjf")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_014d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("SDK#####")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_015a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Void_015b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secret";
                config.refundPassword = "refund";
                config.rebatePassword = "rebate";
                config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
                config.timeout = 5000;
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
                return [4 /*yield*/, saleResponse
                        .void()
                        .withDescription("JAVA-Void")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
