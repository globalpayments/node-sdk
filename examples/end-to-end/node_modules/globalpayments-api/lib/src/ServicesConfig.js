"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var ServicesConfig = /** @class */ (function () {
    function ServicesConfig() {
        this.timeout = 65000;
    }
    ServicesConfig.prototype.validate = function () {
        // portico api key
        if (this.secretApiKey) {
            if (this.siteId ||
                this.licenseId ||
                this.deviceId ||
                this.username ||
                this.password) {
                throw new _1.ConfigurationError("Configuration contains both secret api key and legacy credentials. These are mutually exclusive.");
            }
        }
        // portico legacy
        if (this.siteId ||
            this.licenseId ||
            this.deviceId ||
            this.username ||
            this.password) {
            if (!(this.siteId &&
                this.licenseId &&
                this.deviceId &&
                this.username &&
                this.password)) {
                throw new _1.ConfigurationError("Site, License, Device, Username and Password should all have a values for this configuration.");
            }
        }
        // realex
        if (this.merchantId || this.sharedSecret) {
            if (!this.merchantId) {
                throw new _1.ConfigurationError("MerchantId is required for this configuration.");
            }
            if (!this.sharedSecret) {
                throw new _1.ConfigurationError("SharedSecret is required for this configuration.");
            }
        }
        // service url
        if (!this.serviceUrl) {
            throw new _1.ConfigurationError("Service URL could not be determined from the credentials provided. Please specify an endpoint.");
        }
    };
    return ServicesConfig;
}());
exports.ServicesConfig = ServicesConfig;
