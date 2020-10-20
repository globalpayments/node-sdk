"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("../../../../src/");
var config = new _1.ServicesConfig();
config.merchantId = "realexsandbox";
config.accountId = "internet";
config.sharedSecret = "Po8lRRT67a";
config.serviceUrl = "https://test.realexpayments.com/epage-remote.cgi";
var card = new _1.CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
ava_1.default("credit reverse", function (t) {
    var error = t.throws(function () {
        return card
            .reverse(15)
            .withAllowDuplicates(true)
            .execute();
    }, _1.UnsupportedTransactionError);
    t.is(error.name, "UnsupportedTransactionError");
    t.true(-1 !==
        error.message.indexOf("selected gateway does not support this transaction type"));
});
