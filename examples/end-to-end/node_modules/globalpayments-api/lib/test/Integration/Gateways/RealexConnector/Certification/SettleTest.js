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
// test("JAVA_Settle_Sample", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_006a", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_006b", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_006c", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_006d", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_006e", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_006f", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_006g", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_006h", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_006i", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_006k", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_007a", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_007b", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_007c", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_007d", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_007e", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_008a", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_008b", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_008c", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_008d", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_008e", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_009a", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_009b", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_009c", async (t) => {
//   t.plan(2);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   // tslint:disable:max-line-length
//   config.channel = "ECOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOm";
//   // tslint:enable:max-line-length
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
// //   const saleResponse = await ;
// //   t.truthy(saleResponse);
// //   t.is("00", saleResponse.responseCode);
// //   await throttle();
//   // request
//   const error = await t.throws(
//     card.authorize(1)
//       .withCurrency("EUR")
//       .execute(),
//     GatewayError,
//   );
//   t.truthy(error.message);
// });
// test("JAVA_Settle_009d", async (t) => {
//   t.plan(2);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECO#";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
// //   const saleResponse = await ;
// //   t.truthy(saleResponse);
// //   t.is("00", saleResponse.responseCode);
// //   await throttle();
//   // request
//   const error = await t.throws(
//     card.authorize(1)
//       .withCurrency("EUR")
//       .execute(),
//       GatewayError,
//     );
//     t.truthy(error.message);
// });
// test("JAVA_Settle_010c", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_010d", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_010e", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_011a", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_011b", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_011c", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_011d", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_012a", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_012b", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1.005)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1.005)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_012c", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(10)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const error = t.throws(() =>
//     saleResponse.capture()
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute(),
//       BuilderError,
//     );
//     t.truthy(error.message);
// });
// test("JAVA_Settle_012d", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(10)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const error = t.throws(() =>
//     saleResponse.capture()
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute(),
//       BuilderError,
//     );
//     t.truthy(error.message);
// });
// test("JAVA_Settle_012e", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1000)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1000)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
// test("JAVA_Settle_012f", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(10)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const error = t.throws(() =>
//     saleResponse.capture()
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute(),
//       BuilderError,
//     );
//     t.truthy(error.message);
// });
// test("JAVA_Settle_013a", async (t) => {
//   t.plan(4);
//   const config = new ServicesConfig();
//   config.merchantId = "heartlandgpsandbox";
//   config.accountId = "api";
//   config.sharedSecret = "secret";
//   config.refundPassword = "refund";
//   config.rebatePassword = "rebate";
//   config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
//   config.timeout = 5000;
//   config.channel = "ECOM";
//   ServicesContainer.configure(config);
//   // create card
//   const card = new CreditCardData();
//   card.number = "4263970000005262";
//   card.expMonth = "12";
//   card.expYear = "2020";
//   card.cvn = "123";
//   card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
//   card.cardHolderName = "James Mason";
//   // build transaction
//   const saleResponse = await card.authorize(1)
//       .withCurrency("EUR")
//       .execute();
//   t.truthy(saleResponse);
//   t.is("00", saleResponse.responseCode);
//   await throttle();
//   // request
//   const response = await saleResponse.capture(1)
//       .withCurrency("EUR")
//       .withDescription("JAVA-Settle")
//       .execute();
//   t.truthy(response);
//   t.is("00", response.responseCode);
// });
ava_1.default("JAVA_Settle_013b", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                return [4 /*yield*/, t.throws(card
                        .authorize(1)
                        .withCurrency("EURO")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_013c", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                return [4 /*yield*/, t.throws(card
                        .authorize(1)
                        .withCurrency("EU#")
                        .execute(), _1.GatewayError)];
            case 1:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_013d", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
                        .withDescription("JAVA-Settle")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_015a", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Settle")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_014a", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Settle")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_014b", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Settle")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_014c", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Settle")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_014d", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Settle")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_016a", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Settle")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_016b", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
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
ava_1.default("JAVA_Settle_016c", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
                        .withCurrency("EUR")
                        .withDescription("JAVA-SettleAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_016d", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Settle###")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_017a", function (t) { return __awaiter(_this, void 0, void 0, function () {
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
                        .authorize(1)
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
                        .capture(1)
                        .withCurrency("EUR")
                        .withDescription("JAVA-Settle")
                        .execute()];
            case 3:
                response = _a.sent();
                t.truthy(response);
                t.is("00", response.responseCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("JAVA_Settle_017b", function (t) { return __awaiter(_this, void 0, void 0, function () {
    var config, card, saleResponse, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(4);
                config = new _1.ServicesConfig();
                config.merchantId = "heartlandgpsandbox";
                config.accountId = "api";
                config.sharedSecret = "secreto";
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
                        .authorize(1)
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
                        .capture(1)
                        .withCurrency("EUR")
                        .withDescription("SDK-JAVA-Rebate")
                        .execute(), _1.GatewayError)];
            case 3:
                error = _a.sent();
                t.truthy(error.message);
                return [2 /*return*/];
        }
    });
}); });
