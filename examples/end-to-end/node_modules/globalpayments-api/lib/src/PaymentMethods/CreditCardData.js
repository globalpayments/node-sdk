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
var Credit_1 = require("./Credit");
var CreditCardData = /** @class */ (function (_super) {
    __extends(CreditCardData, _super);
    function CreditCardData() {
        var _this = _super.call(this) || this;
        _this.cardPresent = false;
        _this.readerPresent = false;
        _this.cvnPresenceIndicator = _1.CvnPresenceIndicator.NotRequested;
        return _this;
    }
    CreditCardData.prototype.getCardType = function () {
        var number = this.number.replace(" ", "").replace("-", "");
        for (var _i = 0, _a = CreditCardData.cardTypes; _i < _a.length; _i++) {
            var type = _a[_i];
            if (type.regex.test(number)) {
                return type.name;
            }
        }
        return "Unknown";
    };
    CreditCardData.cardTypes = [
        { name: "Visa", regex: /^4/ },
        { name: "MC", regex: /^(5[1-5]|2[2-7])/ },
        { name: "Amex", regex: /^3[47]/ },
        { name: "Diners", regex: /^3[0689]/ },
        { name: "EnRoute", regex: /^2(014|149)/ },
        { name: "Discover", regex: /^6([045]|22)/ },
        { name: "Jcb", regex: /^35/ },
    ];
    return CreditCardData;
}(Credit_1.Credit));
exports.CreditCardData = CreditCardData;
