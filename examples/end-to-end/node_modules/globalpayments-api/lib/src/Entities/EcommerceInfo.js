"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entities_1 = require("../Entities");
var EcommerceInfo = /** @class */ (function () {
    function EcommerceInfo() {
        this.channel = Entities_1.EcommerceChannel.Ecom;
        this.shipDay = new Date().getUTCDate().toString();
        this.shipMonth = (new Date().getUTCMonth() + 1).toString();
        this.paymentDataType = "3DSecure";
    }
    return EcommerceInfo;
}());
exports.EcommerceInfo = EcommerceInfo;
