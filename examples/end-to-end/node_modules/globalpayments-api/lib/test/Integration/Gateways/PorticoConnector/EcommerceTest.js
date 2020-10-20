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
var Data_1 = require("../../../Data");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";
var runSerially = false;
var test = runSerially ? ava_1.default.serial : ava_1.default;
var card = Data_1.TestCards.visaManual();
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
test("ecom with moto", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var ecom, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                ecom = new _1.EcommerceInfo();
                ecom.channel = _1.EcommerceChannel.Moto;
                return [4 /*yield*/, card
                        .charge(9)
                        .withCurrency("USD")
                        .withEcommerceInfo(ecom)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("ecom with direct market ship date", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var ecom, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                ecom = new _1.EcommerceInfo();
                ecom.shipDay = "25";
                ecom.shipMonth = "12";
                return [4 /*yield*/, card
                        .charge(9)
                        .withCurrency("USD")
                        .withEcommerceInfo(ecom)
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("ecom with direct market invoice no ship date", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                return [4 /*yield*/, card
                        .charge(9)
                        .withCurrency("USD")
                        .withEcommerceInfo(new _1.EcommerceInfo())
                        .withInvoiceNumber("1234567890")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("ecom with direct market invoice and ship date", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var ecom, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                ecom = new _1.EcommerceInfo();
                ecom.channel = _1.EcommerceChannel.Moto;
                return [4 /*yield*/, card
                        .charge(9)
                        .withCurrency("USD")
                        .withEcommerceInfo(ecom)
                        .withInvoiceNumber("1234567890")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
test("ecom with secure ecommerce", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var ecom, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(2);
                ecom = new _1.EcommerceInfo();
                ecom.paymentDataSource = "ApplePay";
                ecom.cavv = "XXXXf98AAajXbDRg3HSUMAACAAA=";
                ecom.eci = "5";
                return [4 /*yield*/, card
                        .charge(9)
                        .withCurrency("USD")
                        .withEcommerceInfo(ecom)
                        .withInvoiceNumber("1234567890")
                        .withAllowDuplicates(true)
                        .execute()];
            case 1:
                response = _a.sent();
                t.truthy(response);
                t.is(response.responseCode, "00");
                return [2 /*return*/];
        }
    });
}); });
