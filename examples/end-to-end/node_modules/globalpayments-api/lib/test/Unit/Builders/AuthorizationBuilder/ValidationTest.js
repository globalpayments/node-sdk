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
var _1 = require("../../../../src/");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";
var card = new _1.CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
ava_1.default("credit auth no amount", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card.authorize().execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("amount cannot be null"));
});
ava_1.default("credit auth no currency", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card.authorize(14).execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("currency cannot be null"));
});
ava_1.default("credit sale no amount", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card.charge().execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("amount cannot be null"));
});
ava_1.default("credit sale no currency", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card.charge(14).execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("currency cannot be null"));
});
ava_1.default("credit sale no payment method", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card
            .charge(14)
            .withCurrency("USD")
            .withPaymentMethod({})
            .execute();
    }, _1.UnsupportedTransactionError);
    t.is(error.name, "UnsupportedTransactionError");
    t.true(-1 !== error.message.indexOf("not supported for this payment method"));
});
ava_1.default("credit offline no amount", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card
            .charge()
            .withOfflineAuthCode("123456")
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("amount cannot be null"));
});
ava_1.default("credit offline no currency", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card
            .charge(14)
            .withOfflineAuthCode("123456")
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("currency cannot be null"));
});
ava_1.default("credit offline no auth code", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        return card
            .charge(14)
            .withCurrency("USD")
            .withOfflineAuthCode("")
            .execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("offlineAuthCode cannot be empty"));
});
ava_1.default("gift replace no replacement card", function (t) {
    t.plan(3);
    var error = t.throws(function () {
        var gift = new _1.GiftCard();
        gift.alias = "1234567890";
        return gift.replaceWith(undefined).execute();
    }, _1.ArgumentError);
    t.is(error.name, "ArgumentError");
    t.true(-1 !== error.message.indexOf("replacementCard cannot be null"));
});
ava_1.default("check sale no address", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(3);
                return [4 /*yield*/, t.throws(function () {
                        var check = new _1.ECheck();
                        return check
                            .charge(14)
                            .withCurrency("USD")
                            .execute();
                    }, _1.ArgumentError)];
            case 1:
                error = _a.sent();
                t.is(error.name, "ArgumentError");
                t.true(-1 !== error.message.indexOf("billingAddress cannot be null"));
                return [2 /*return*/];
        }
    });
}); });
