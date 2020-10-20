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
ava_1.default("JAVA_AVS_001a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.streetAddress1 = "Flat 123 House 456";
                billingAddress.postalCode = "E77 4QJ";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "1";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-001a")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_001b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.streetAddress1 = "Flat #123 House No. 456";
                billingAddress.postalCode = "E77 #4QJ";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "2";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-001b")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_001c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.streetAddress1 = "# Flat #123 House No. #456";
                billingAddress.postalCode = "# E77 @~4 Q # J";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "3";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-001c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_001d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "4";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-001d")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_001e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                // tslint:disable:max-line-length
                billingAddress.streetAddress1 =
                    "Lorem ipsum dolor sit 1amet; consectetur adipiscing elit. Aenean ali2quam tellus in elit hendrerit; non 3porttE77 4QJitor lorem venenatis. Pellentesque dictum eu nunc ac fringilla. In vitae quam eu odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
                billingAddress.postalCode =
                    "Lorem ipsum dolo1r sit amet; consectetur adipiscing elit. Aenean aliquam tellus in elit hendrerit; non porttE77 4QJitor lorem venenatis. Pellentesque dictum eu2 nunc ac fringilla. In vitae quam eu 3odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
                // tslint:enable:max-line-length
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "5";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-001e")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_001f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.streetAddress1 = "ABCDEFGHIJ";
                billingAddress.postalCode = "ABCDEFGHIJ";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "6";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-001f")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_001g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                // tslint:disable:max-line-length
                billingAddress.streetAddress1 =
                    "Lorem ipsum dolor sit amet; consectetur adipiscing elit. Aenean aliquam tellus in elit hendrerit; non porttE77 4QJitor lorem venenatis. Pellentesque dictum eu nunc ac fringilla. In vitae quam eu odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
                billingAddress.postalCode =
                    "Lorem ipsum dolor sit amet; consectetur adipiscing elit. Aenean aliquam tellus in elit hendrerit; non porttE77 4QJitor lorem venenatis. Pellentesque dictum eu nunc ac fringilla. In vitae quam eu odio sollicitudin rhoncus. Praesent ullamcorper eros vitae consequat tempus. In gravida viverra iaculis. Morbi dignissim orci et ipsum accumsan";
                // tslint:enable:max-line-length
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "7";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-001g")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_003a", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.streetAddress1 = "Flat 123 House 456";
                billingAddress.postalCode = "E77 4QJ";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "8";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-003a")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_003b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.streetAddress1 = "Flat 123 House 456";
                billingAddress.postalCode = "E77 4QJ";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "9";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-003b")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_003c", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.streetAddress1 = "Flat 123 House 456";
                billingAddress.postalCode = "E77 4QJ";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "10";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-003c")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_003d", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.streetAddress1 = "Flat 123 House 456";
                billingAddress.postalCode = "E77 4QJ";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "11";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-003d")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_003e", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.streetAddress1 = "Flat 123 House 456";
                billingAddress.postalCode = "E77 4QJ";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "12";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-003e")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_003f", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.streetAddress1 = "Flat 123 House 456";
                billingAddress.postalCode = "E77 4QJ";
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "13";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-003f")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_003g", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "14";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-003e")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_AVS_003h", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, billingAddress, shippingAddress, card, error;
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
                billingAddress = new _1.Address();
                billingAddress.country = "GB";
                shippingAddress = new _1.Address();
                shippingAddress.country = "FR";
                card = new _1.CreditCardData();
                card.number = "4263970000005262";
                card.expMonth = "12";
                card.expYear = "2020";
                card.cvn = "15";
                card.cvnPresenceIndicator = _1.CvnPresenceIndicator.Present;
                card.cardHolderName = "James Mason";
                return [4 /*yield*/, t.throws(card
                        .charge(100.01)
                        .withCurrency("GBP")
                        .withCustomerId("100")
                        .withProductId("999")
                        .withClientTransactionId("test")
                        .withCustomerIpAddress("123.123.123.123")
                        .withAddress(billingAddress)
                        .withAddress(shippingAddress, _1.AddressType.Shipping)
                        .withDescription("JAVA-AVS-003f")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
