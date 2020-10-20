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
var _1 = require("../");
var EBT_1 = require("./EBT");
var EBTCardData = /** @class */ (function (_super) {
    __extends(EBTCardData, _super);
    function EBTCardData() {
        var _this = _super.call(this) || this;
        _this.cardPresent = false;
        _this.readerPresent = false;
        _this.cvnPresenceIndicator = _1.CvnPresenceIndicator.NotRequested;
        return _this;
    }
    return EBTCardData;
}(EBT_1.EBT));
exports.EBTCardData = EBTCardData;
