"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("../../../../../src/");
var _2 = require("../../../../Data/");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";
var runSerially = false;
var test = runSerially ? ava_1.default.serial : ava_1.default;
var address = new _1.Address();
address.streetAddress1 = "123 Main St.";
address.city = "Downtown";
address.province = "NJ";
address.postalCode = "12345";
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
/// ACH Debit - Consumer
test("001 - web personal checking", function (t) {
    var check = _2.TestChecks.certification(_1.SecCode.WEB, _1.CheckType.Personal, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(23.0)
            .withCurrency("USD")
            .withAddress(address)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("002 - web business checking", function (t) {
    var check = _2.TestChecks.certification(_1.SecCode.WEB, _1.CheckType.Business, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(24.0)
            .withCurrency("USD")
            .withAddress(address)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("003 - web personal savings", function (t) {
    var check = _2.TestChecks.certification(_1.SecCode.WEB, _1.CheckType.Personal, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(25.0)
            .withCurrency("USD")
            .withAddress(address)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("004 - web business savings", function (t) {
    var check = _2.TestChecks.certification(_1.SecCode.WEB, _1.CheckType.Business, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(5.0)
            .withCurrency("USD")
            .withAddress(address)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
