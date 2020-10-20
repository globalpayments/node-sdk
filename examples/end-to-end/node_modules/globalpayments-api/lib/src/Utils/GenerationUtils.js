"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sha1_1 = require("./Sha1");
var _1 = require("../");
var GenerationUtils = /** @class */ (function () {
    function GenerationUtils() {
    }
    GenerationUtils.generateHash = function (toHash, secret) {
        var toHashFirstPass = Sha1_1.hex_sha1(toHash);
        if (!secret) {
            return toHashFirstPass;
        }
        var toHashSecondPass = toHashFirstPass + "." + secret;
        return Sha1_1.hex_sha1(toHashSecondPass);
    };
    GenerationUtils.generateTimestamp = function () {
        var date = new Date();
        return (date.getUTCFullYear().toString() +
            _1.StringUtils.leftPad((date.getUTCMonth() + 1).toString(), 2, "0") +
            _1.StringUtils.leftPad(date.getUTCDate().toString(), 2, "0") +
            _1.StringUtils.leftPad(date.getUTCHours().toString(), 2, "0") +
            _1.StringUtils.leftPad(date.getUTCMinutes().toString(), 2, "0") +
            _1.StringUtils.leftPad(date.getUTCSeconds().toString(), 2, "0"));
    };
    GenerationUtils.generateOrderId = function () {
        var id = _1.StringUtils.uuid();
        return Buffer.from(id, "ascii")
            .toString("base64")
            .replace("=", "")
            .replace("+", "-")
            .replace("/", "_");
    };
    return GenerationUtils;
}());
exports.GenerationUtils = GenerationUtils;
