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
ava_1.default("JAVA_verifyenrolled_014a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001038443335";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-014a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_014b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001038488884";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-014b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_014c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001036298889";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-014c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_014d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001036853337";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-014d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_014e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-014e")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_014f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037167778";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-014f")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_014g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-014g")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_014h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037484447";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-014h")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_014i", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037490006";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-014i")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_015a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "5100000000000198�";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-015a")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_015b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "5100000000000149";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-015b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_015c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "5100000000000172";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-015c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_015d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "5100000000000297";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-015d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_015e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "5100000000000131";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-015e")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_015f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "5100000000000206";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-015f")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_015g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "5100000000000131";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-015g")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_015h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "5100000000000214";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-015h")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_015i", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "5100000000000164";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-015i")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_016a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "370537726695896�";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-016a")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_016b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "344598846104303";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-016b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_016c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "342911579886552";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-016c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_016d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "377775599797356";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-016d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_016e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "371810438025523";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-016e")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_016f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "374973180958759";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-016f")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_016g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "371810438025523";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-016g")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_016h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "376515222233960";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-016h")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_016i", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "372749236937027";
                card.expMonth = "10";
                card.expYear = "2025";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-016i")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-017a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-017b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-017c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-017d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-017e")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-017f")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-017g")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-017h")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017i", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-017i")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017j", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-017j")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_017k", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-017k")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_018a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-018a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_018b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-018b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_018c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-018c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_018d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-018d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_018e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-018e")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_019a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-019a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_019b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-019b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_019c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-019c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_019d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-019d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_019e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-019e")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_020b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-020b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_020c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-020c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_020d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-020d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_020e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-020e")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_021a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-021a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_021b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-021b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_021c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-021c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_021d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-021d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_022a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-022a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_022b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EURO")
                        .withDescription("JAVA-verifyenrolled-022b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_022c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("�UR")
                        .withDescription("JAVA-verifyenrolled-022c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_022d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withDescription("JAVA-verifyenrolled-022d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_023a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-023a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_023b1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-023b1")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_023b2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "42424242424";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-023b2")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_023c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4263970000005262#";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-023c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_024a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-024a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_024b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-024b")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_024c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName =
                    "3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep3a4wpIwep3uviSnW9XEB3a4wpIwep3uviSnW9XEB3a4wpIwepeep";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-024c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_024d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James~Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-024d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_025a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-025a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_025b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-025b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_025c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "20";
                card.expYear = "2012";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-025c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_025d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-025d")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_026a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-026a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_026b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-026b")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_026c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-026c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_027a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-027a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_028a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-028a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_029a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-029a")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_029b1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-029b1")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_029b2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "371810438025523";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-029b2")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_029c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "12345";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-029c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip("JAVA_verifyenrolled_029d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "371810438025523";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1234";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-029d")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_030a1", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-030a1")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_030a2", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Illegible;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-030a2")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_030a3", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.NotOnCard;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-030a3")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_030a4", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.NotRequested;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("GBP")
                        .withDescription("JAVA-verifyenrolled-030a4")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_030b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, error;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = 5;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .verify()
                        .withCurrency("EUR")
                        .withDescription("JAVA-verifyenrolled-030b")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_verifyenrolled_030c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, response;
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
                config.timeout = 60000;
                _1.ServicesContainer.configure(config);
                card = new _1.CreditCardData();
                card.number = "4012001037141112";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "123";
                card.cvnPresenceIndicator = 0;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, card
                        .verify()
                        .withCurrency("USD")
                        .withDescription("JAVA-verifyenrolled-030c")
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
