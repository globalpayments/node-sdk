"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
var https_wrapper_1 = require("./https-wrapper");
var Gateway = /** @class */ (function () {
    function Gateway(contentType) {
        this.contentType = contentType;
        this.headers = {};
        this.headers["Content-Type"] = contentType;
    }
    Gateway.prototype.sendRequest = function (httpMethod, endpoint, data, queryStringParams) {
        var uri = url.parse(this.serviceUrl);
        var queryString = this.buildQueryString(queryStringParams);
        var options = {
            headers: this.headers,
            host: uri.host,
            method: httpMethod,
            path: uri.path + endpoint + queryString,
            port: uri.port ? parseInt(uri.port, 10) : 443,
        };
        if (data !== undefined && options && options.headers) {
            options.headers["Content-Length"] = data.length;
        }
        return https_wrapper_1.request(data, options);
    };
    Gateway.prototype.buildQueryString = function (queryStringParams) {
        if (queryStringParams === undefined) {
            return "";
        }
        var params = [];
        for (var param in queryStringParams) {
            if (queryStringParams.hasOwnProperty(param)) {
                params.push(encodeURIComponent(param) + "=" + encodeURIComponent(queryStringParams[param]));
            }
        }
        return "?" + params.join("&");
    };
    return Gateway;
}());
exports.Gateway = Gateway;
