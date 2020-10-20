"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.leftPad = function (source, length, padString) {
        if (!source) {
            return source;
        }
        var pad = padString.repeat(length);
        return pad.substring(0, pad.length - source.length) + source;
    };
    StringUtils.uuid = function () {
        //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        var uuid = "";
        var ii;
        for (ii = 0; ii < 32; ii += 1) {
            switch (ii) {
                case 8:
                case 20:
                    uuid += "-";
                    uuid += ((Math.random() * 16) | 0).toString(16);
                    break;
                case 12:
                    uuid += "-";
                    uuid += "4";
                    break;
                case 16:
                    uuid += "-";
                    uuid += ((Math.random() * 4) | 8).toString(16);
                    break;
                default:
                    uuid += ((Math.random() * 16) | 0).toString(16);
            }
        }
        return uuid;
    };
    StringUtils.btoa = function (t) {
        if (Buffer.from) {
            return Buffer.from(t, "ascii").toString("base64");
        }
        return new Buffer(t, "ascii").toString("base64");
    };
    StringUtils.atob = function (t) {
        if (Buffer.from) {
            return Buffer.from(t, "base64").toString("ascii");
        }
        return new Buffer(t, "base64").toString("ascii");
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
