"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Address = /** @class */ (function () {
    function Address() {
    }
    Object.defineProperty(Address.prototype, "state", {
        get: function () {
            return this.province;
        },
        set: function (value) {
            this.province = value;
        },
        enumerable: true,
        configurable: true
    });
    return Address;
}());
exports.Address = Address;
