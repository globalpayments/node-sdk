"use strict";
// tslint:disable:max-classes-per-file
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
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(m) {
        var _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, ApiError.prototype);
        _this.name = _this.constructor.name;
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
var ArgumentError = /** @class */ (function (_super) {
    __extends(ArgumentError, _super);
    function ArgumentError(m) {
        var _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, ArgumentError.prototype);
        _this.name = _this.constructor.name;
        return _this;
    }
    return ArgumentError;
}(ApiError));
exports.ArgumentError = ArgumentError;
var BuilderError = /** @class */ (function (_super) {
    __extends(BuilderError, _super);
    function BuilderError(m) {
        var _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, BuilderError.prototype);
        _this.name = _this.constructor.name;
        return _this;
    }
    return BuilderError;
}(ApiError));
exports.BuilderError = BuilderError;
var ConfigurationError = /** @class */ (function (_super) {
    __extends(ConfigurationError, _super);
    function ConfigurationError(m) {
        var _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, ConfigurationError.prototype);
        _this.name = _this.constructor.name;
        return _this;
    }
    return ConfigurationError;
}(ApiError));
exports.ConfigurationError = ConfigurationError;
var GatewayError = /** @class */ (function (_super) {
    __extends(GatewayError, _super);
    function GatewayError(m, code, message) {
        var _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, GatewayError.prototype);
        _this.name = _this.constructor.name;
        if (code) {
            _this.responseCode = code;
        }
        if (message) {
            _this.responseMessage = message;
        }
        return _this;
    }
    return GatewayError;
}(ApiError));
exports.GatewayError = GatewayError;
var NotImplementedError = /** @class */ (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(m) {
        var _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, NotImplementedError.prototype);
        _this.name = _this.constructor.name;
        return _this;
    }
    return NotImplementedError;
}(ApiError));
exports.NotImplementedError = NotImplementedError;
var UnsupportedTransactionError = /** @class */ (function (_super) {
    __extends(UnsupportedTransactionError, _super);
    function UnsupportedTransactionError(m) {
        var _this = this;
        if (!m) {
            m = "Transaction type not supported for this payment method.";
        }
        _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, UnsupportedTransactionError.prototype);
        _this.name = _this.constructor.name;
        return _this;
    }
    return UnsupportedTransactionError;
}(ApiError));
exports.UnsupportedTransactionError = UnsupportedTransactionError;
