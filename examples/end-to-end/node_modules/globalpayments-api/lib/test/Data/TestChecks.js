"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
var TestChecks = /** @class */ (function () {
    function TestChecks() {
    }
    TestChecks.certification = function (secCode, checkType, accountType, checkName) {
        if (secCode === void 0) { secCode = src_1.SecCode.PPD; }
        if (checkType === void 0) { checkType = src_1.CheckType.Personal; }
        if (accountType === void 0) { accountType = src_1.AccountType.Checking; }
        var check = new src_1.ECheck();
        check.accountNumber = "24413815";
        check.routingNumber = "490000018";
        check.checkType = checkType;
        check.accountType = accountType;
        check.secCode = secCode;
        check.entryMode = src_1.EntryMethod.Manual;
        check.checkHolderName = "John Doe";
        check.driversLicenseNumber = "09876543210";
        check.driversLicenseState = "TX";
        check.phoneNumber = "8003214567";
        check.birthYear = "1997";
        check.ssnLast4 = "4321";
        if (checkName) {
            check.checkName = checkName;
        }
        return check;
    };
    return TestChecks;
}());
exports.TestChecks = TestChecks;
