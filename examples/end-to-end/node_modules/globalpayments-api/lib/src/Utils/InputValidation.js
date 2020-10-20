"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var inputFieldMaxLength = {
    portico: {
        city: 20,
        email: 100,
        firstName: 26,
        lastName: 26,
        phoneNumber: 20,
        postalCode: 9,
        province: 20,
    },
    // todo: Use actual values
    realex: {
        city: 0,
        email: 0,
        firstName: 0,
        lastName: 0,
        phoneNumber: 0,
        postalCode: 0,
        province: 0,
    },
};
var inputLabels = {
    city: "City",
    email: "Email address",
    firstName: "First name",
    lastName: "Last name",
    phoneNumber: "Phone number",
    postalCode: "Zip/postal code",
    province: "State/province",
};
var inputLengthErrorMessage = function (label) { return label + " length greater than the configured gateway's maximum length"; };
function validateAmount(_gateway, amount, _impliedDecimal) {
    if (_impliedDecimal === void 0) { _impliedDecimal = false; }
    if (!amount || amount < 0) {
        throw new Error("Amount must be greater than or equal to 0");
    }
    return parseFloat((Math.round(amount * 100) / 100).toString()).toFixed(2);
}
exports.validateAmount = validateAmount;
function validateInput(gateway, inputType, input) {
    if (!input) {
        return "";
    }
    input = input.trim();
    var label = inputLabels[inputType];
    switch (inputType) {
        case "email":
            if (!/^[^\s@]+@[^\s@]+$/.test(input)) {
                throw new Error(label + " is in wrong format");
            }
            break;
        case "phoneNumber":
            input = input.replace(/\D+/g, "");
            break;
        case "postalCode":
            input = input.replace(/[^0-9A-Za-z]/g, "");
            break;
        default:
    }
    if (!label) {
        label = "Input";
    }
    if (input.length > inputFieldMaxLength[gateway][inputType]) {
        throw new Error(inputLengthErrorMessage(label));
    }
    return input;
}
exports.validateInput = validateInput;
