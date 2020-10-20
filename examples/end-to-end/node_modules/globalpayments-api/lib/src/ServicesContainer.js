"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var ServicesContainer = /** @class */ (function () {
    function ServicesContainer(gateway, recurring) {
        if (gateway) {
            this._gateway = gateway;
        }
        if (recurring) {
            this._recurring = recurring;
        }
    }
    ServicesContainer.instance = function () {
        if (ServicesContainer._instance === null) {
            throw new _1.ApiError("Services container not configured.");
        }
        return ServicesContainer._instance;
    };
    ServicesContainer.configure = function (config) {
        config.validate();
        if (config.merchantId && config.merchantId !== "") {
            var gateway = new _1.RealexConnector();
            gateway.merchantId = config.merchantId;
            gateway.sharedSecret = config.sharedSecret;
            gateway.accountId = config.accountId;
            gateway.channel = config.channel;
            gateway.rebatePassword = config.rebatePassword;
            gateway.refundPassword = config.refundPassword;
            gateway.timeout = config.timeout;
            gateway.serviceUrl = config.serviceUrl;
            gateway.hostedPaymentConfig = config.hostedPaymentConfig;
            gateway.channel = config.channel;
            ServicesContainer._instance = new ServicesContainer(gateway, gateway);
        }
        else {
            var gateway = new _1.PorticoConnector();
            gateway.siteId = config.siteId;
            gateway.licenseId = config.licenseId;
            gateway.deviceId = config.deviceId;
            gateway.username = config.username;
            gateway.password = config.password;
            gateway.secretApiKey = config.secretApiKey;
            gateway.developerId = config.developerId;
            gateway.versionNumber = config.versionNumber;
            gateway.timeout = config.timeout;
            gateway.serviceUrl =
                config.serviceUrl + "/Hps.Exchange.PosGateway/PosGatewayService.asmx";
            var payplan = new _1.PayPlanConnector();
            payplan.siteId = config.siteId;
            payplan.licenseId = config.licenseId;
            payplan.deviceId = config.deviceId;
            payplan.username = config.username;
            payplan.password = config.password;
            payplan.secretApiKey = config.secretApiKey;
            payplan.developerId = config.developerId;
            payplan.versionNumber = config.versionNumber;
            payplan.timeout = config.timeout;
            payplan.serviceUrl = config.serviceUrl
                + (config.serviceUrl.indexOf('cert.') ? "/Portico.PayPlan.v2/" : "/payplan.v2/");
            ServicesContainer._instance = new ServicesContainer(gateway, payplan);
        }
    };
    ServicesContainer.prototype.getClient = function () {
        return this._gateway;
    };
    ServicesContainer.prototype.getRecurringClient = function () {
        return this._recurring;
    };
    return ServicesContainer;
}());
exports.ServicesContainer = ServicesContainer;
