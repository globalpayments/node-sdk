"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("../../../../src/");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";
var runSerially = false;
var test = runSerially ? ava_1.default.serial : ava_1.default;
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
test("allow 5-part credentials", function (t) {
    var c = new _1.ServicesConfig();
    c.username = "123456789";
    c.password = "$Test1234";
    c.siteId = "12345";
    c.deviceId = "123456";
    c.licenseId = "12345";
    c.serviceUrl = "https://cert.api2-c.heartlandportico.com";
    _1.ServicesContainer.configure(c);
    t.truthy(true);
});
