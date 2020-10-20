"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("../../../../src/");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
ava_1.default("report activity", function (t) {
    t.plan(2);
    var start = new Date(Date.now());
    start.setDate(start.getDate() - 7);
    var end = new Date(Date.now());
    return _1.ReportingService.activity()
        .withStartDate(start)
        .withEndDate(end)
        .execute()
        .then(function (activity) {
        t.truthy(activity);
        t.true(activity.length > 0);
    });
});
ava_1.default("report transaction detail", function (t) {
    t.plan(3);
    var start = new Date(Date.now());
    start.setDate(start.getDate() - 7);
    var end = new Date(Date.now());
    return _1.ReportingService.activity()
        .withStartDate(start)
        .withEndDate(end)
        .execute()
        .then(function (activity) {
        t.truthy(activity);
        if (activity.length > 0) {
            return _1.ReportingService.transactionDetail(activity[0].transactionId)
                .execute()
                .then(function (detail) {
                t.truthy(detail);
                t.is(detail.gatewayResponseCode, "00");
            });
        }
        t.plan(1);
        return Promise.resolve();
    });
});
