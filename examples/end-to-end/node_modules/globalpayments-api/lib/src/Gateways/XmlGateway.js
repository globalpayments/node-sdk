"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Gateway_1 = require("./Gateway");
var XmlGateway = /** @class */ (function (_super) {
    __extends(XmlGateway, _super);
    function XmlGateway() {
        return _super.call(this, "text/xml") || this;
    }
    XmlGateway.prototype.doTransaction = function (requestData) {
        return this.sendRequest("POST", "", requestData);
    };
    return XmlGateway;
}(Gateway_1.Gateway));
exports.XmlGateway = XmlGateway;
