"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("../../../../../src/");
var _2 = require("../../../../Data/");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";
var runSerially = false;
var test = runSerially ? ava_1.default.serial : ava_1.default;
var address = new _1.Address();
address.streetAddress1 = "123 Main St.";
address.city = "Downtown";
address.province = "NJ";
address.postalCode = "12345";
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
/// ACH Debit - Consumer
test("001 - consumer personal checking", function (t) {
    t.plan(4);
    var check = _2.TestChecks.certification(_1.SecCode.PPD, _1.CheckType.Personal, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(11.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            return response;
        })
            .then(function (response) {
            // test case 25
            response
                .void()
                .execute()
                .then(function (voidResponse) {
                t.truthy(voidResponse);
                t.is(voidResponse.responseCode, "00");
                resolve();
            })
                .catch(reject);
        })
            .catch(reject);
    });
});
test("002 - consumer business checking", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.PPD, _1.CheckType.Business, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(12.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("003 - consumer personal savings", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.PPD, _1.CheckType.Personal, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(13.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("004 - consumer business savings", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.PPD, _1.CheckType.Business, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(14.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("005 - corporate personal checking", function (t) {
    t.plan(4);
    var check = _2.TestChecks.certification(_1.SecCode.CCD, _1.CheckType.Personal, _1.AccountType.Checking, "Heartland Pays");
    return new Promise(function (resolve, reject) {
        check
            .charge(15.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            return response;
        })
            .then(function (response) {
            // test case 26
            response
                .void()
                .execute()
                .then(function (voidResponse) {
                t.truthy(voidResponse);
                t.is(voidResponse.responseCode, "00");
                resolve();
            })
                .catch(reject);
        })
            .catch(reject);
    });
});
test("006 - corporate business checking", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.CCD, _1.CheckType.Business, _1.AccountType.Checking, "Heartland Pays");
    return new Promise(function (resolve, reject) {
        check
            .charge(16.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("007 - corporate personal savings", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.CCD, _1.CheckType.Personal, _1.AccountType.Savings, "Heartland Pays");
    return new Promise(function (resolve, reject) {
        check
            .charge(17.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("008 - corporate business savings", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.CCD, _1.CheckType.Business, _1.AccountType.Savings, "Heartland Pays");
    return new Promise(function (resolve, reject) {
        check
            .charge(18.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("009 - egold personal checking", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.POP, _1.CheckType.Personal, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(11.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("010 - egold business checking", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.POP, _1.CheckType.Business, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(12.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("011 - egold personal savings", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.POP, _1.CheckType.Personal, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(13.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("012 - egold business savings", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.POP, _1.CheckType.Business, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(14.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("013 - esilver personal checking", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.POP, _1.CheckType.Personal, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(15.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("014 - esilver business checking", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.POP, _1.CheckType.Business, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(16.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("015 - esilver personal savings", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.POP, _1.CheckType.Personal, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(17.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("016 - esilver business savings", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.POP, _1.CheckType.Business, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(18.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("017 - ebronze personal checking", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.EBronze, _1.CheckType.Personal, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(19.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            reject();
        })
            .catch(function (error) {
            t.plan(1);
            t.true(-1 !== error.message.indexOf("Processor Configuration error"));
            resolve();
        });
    });
});
test("018 - ebronze business checking", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.EBronze, _1.CheckType.Business, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(20.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            reject();
        })
            .catch(function (error) {
            t.plan(1);
            t.true(-1 !== error.message.indexOf("Processor Configuration error"));
            resolve();
        });
    });
});
test("019 - ebronze personal savings", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.EBronze, _1.CheckType.Personal, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(21.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            reject();
        })
            .catch(function (error) {
            t.plan(1);
            t.true(-1 !== error.message.indexOf("Processor Configuration error"));
            resolve();
        });
    });
});
test("020 - ebronze business savings", function (t) {
    t.plan(2);
    var check = _2.TestChecks.certification(_1.SecCode.EBronze, _1.CheckType.Business, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(22.0)
            .withCurrency("USD")
            .withAddress(address)
            .withAllowDuplicates(true)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            reject();
        })
            .catch(function (error) {
            t.plan(1);
            t.true(-1 !== error.message.indexOf("Processor Configuration error"));
            resolve();
        });
    });
});
test("021 - web personal checking", function (t) {
    var check = _2.TestChecks.certification(_1.SecCode.WEB, _1.CheckType.Personal, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(23.0)
            .withCurrency("USD")
            .withAddress(address)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("022 - web business checking", function (t) {
    var check = _2.TestChecks.certification(_1.SecCode.WEB, _1.CheckType.Business, _1.AccountType.Checking);
    return new Promise(function (resolve, reject) {
        check
            .charge(24.0)
            .withCurrency("USD")
            .withAddress(address)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("023 - web personal savings", function (t) {
    var check = _2.TestChecks.certification(_1.SecCode.WEB, _1.CheckType.Personal, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(25.0)
            .withCurrency("USD")
            .withAddress(address)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
test("024 - web business savings", function (t) {
    var check = _2.TestChecks.certification(_1.SecCode.WEB, _1.CheckType.Business, _1.AccountType.Savings);
    return new Promise(function (resolve, reject) {
        check
            .charge(5.0)
            .withCurrency("USD")
            .withAddress(address)
            .execute()
            .then(function (response) {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
        })
            .catch(reject);
    });
});
