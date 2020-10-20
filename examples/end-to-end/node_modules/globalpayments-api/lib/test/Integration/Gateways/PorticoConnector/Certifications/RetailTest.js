"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("../../../../../src/");
var _2 = require("../../../../Data/");
var config = new _1.ServicesConfig();
config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";
var BATCH_NOT_OPEN = "Transaction was rejected because it requires a batch to be open.";
var BATCH_EMPTY = "Batch close was rejected because no transactions are associated with the currently open batch";
var runSerially = false;
var test = runSerially ? ava_1.default.serial : ava_1.default;
var useTokens = false;
var visaToken = "";
var masterCardToken = "";
var discoverToken = "";
var amexToken = "";
ava_1.default.before(function (_t) {
    _1.ServicesContainer.configure(config);
});
test.before("000 - close batch", function (t) {
    t.plan(1);
    return new Promise(function (resolve, reject) {
        _1.BatchService.closeBatch()
            .then(function (response) {
            t.truthy(response);
            resolve();
        })
            .catch(function (e) {
            if (e.message.indexOf(BATCH_NOT_OPEN) !== -1 ||
                e.message.indexOf(BATCH_EMPTY) !== -1) {
                t.pass();
                resolve();
                return;
            }
            reject(e);
        });
    });
});
/// CREDIT CARD FUNCTIONS
/// CARD VERIFY
/// ACCOUNT VERIFICATION
test("001 - card verify visa", function (t) {
    t.plan(5);
    var card = _2.TestCards.visaSwipeEncrypted();
    return card
        .verify()
        .withAllowDuplicates(true)
        .withRequestMultiUseToken(useTokens)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        if (!useTokens) {
            t.plan(2);
            return;
        }
        t.truthy(response.token);
        var token = new _1.CreditCardData();
        token.token = response.token;
        return token
            .charge(15.01)
            .withAllowDuplicates(true)
            .execute()
            .then(function (chargeResponse) {
            t.truthy(chargeResponse);
            t.is(chargeResponse.responseCode, "00");
        });
    });
});
test("002 - card verify mastercard", function (t) {
    t.plan(5);
    var card = _2.TestCards.masterCardSwipeEncrypted();
    return card
        .verify()
        .withAllowDuplicates(true)
        .withRequestMultiUseToken(useTokens)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        if (!useTokens) {
            t.plan(2);
            return;
        }
        t.truthy(response.token);
        var token = new _1.CreditCardData();
        token.token = response.token;
        return token
            .charge(15.02)
            .withAllowDuplicates(true)
            .execute()
            .then(function (chargeResponse) {
            t.truthy(chargeResponse);
            t.is(chargeResponse.responseCode, "00");
        });
    });
});
test("003 - card verify discover", function (t) {
    t.plan(5);
    var card = _2.TestCards.discoverSwipeEncrypted();
    return card
        .verify()
        .withAllowDuplicates(true)
        .withRequestMultiUseToken(useTokens)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        if (!useTokens) {
            t.plan(2);
            return;
        }
        t.truthy(response.token);
        var token = new _1.CreditCardData();
        token.token = response.token;
        return token
            .charge(15.03)
            .withAllowDuplicates(true)
            .execute()
            .then(function (chargeResponse) {
            t.truthy(chargeResponse);
            t.is(chargeResponse.responseCode, "00");
        });
    });
});
/// Address Verification
test("004 - card verify amex", function (t) {
    t.plan(5);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.amexManual(false, true);
    return card
        .verify()
        .withAllowDuplicates(true)
        .withAddress(address)
        .withRequestMultiUseToken(useTokens)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        if (!useTokens) {
            t.plan(2);
            return;
        }
        t.truthy(response.token);
        var token = new _1.CreditCardData();
        token.token = response.token;
        return token
            .charge(15.04)
            .withAllowDuplicates(true)
            .execute()
            .then(function (chargeResponse) {
            t.truthy(chargeResponse);
            t.is(chargeResponse.responseCode, "00");
        });
    });
});
/// Balance Inquiry (for Prepaid)
test("005 - balance inquiry visa", function (t) {
    t.plan(2);
    var card = _2.TestCards.visaSwipeEncrypted();
    return card
        .balanceInquiry()
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// CREDIT SALE (for multi-use token only)
test("006 - charge visa swipe token", function (t) {
    t.plan(2);
    var card = _2.TestCards.visaSwipe();
    return card
        .charge(15.01)
        .withCurrency("USD")
        .withRequestMultiUseToken(true)
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        visaToken = response.token;
    });
});
test("007 - charge mastercard swipe token", function (t) {
    t.plan(2);
    var card = _2.TestCards.masterCardSwipe();
    return card
        .charge(15.02)
        .withCurrency("USD")
        .withRequestMultiUseToken(true)
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        masterCardToken = response.token;
    });
});
test("008 - charge discover swipe token", function (t) {
    t.plan(2);
    var card = _2.TestCards.discoverSwipe();
    return card
        .charge(15.03)
        .withCurrency("USD")
        .withRequestMultiUseToken(true)
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        discoverToken = response.token;
    });
});
test("009 - charge amex swipe token", function (t) {
    t.plan(2);
    var card = _2.TestCards.amexSwipe();
    return card
        .charge(15.04)
        .withCurrency("USD")
        .withRequestMultiUseToken(true)
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        amexToken = response.token;
    });
});
/// CREDIT SALE
/// SWIPED
test("010 - charge visa swipe", function (t) {
    t.plan(4);
    var card = _2.TestCards.visaSwipe();
    return card
        .charge(15.01)
        .withCurrency("USD")
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        // test 059
        return (response
            .reverse(15.01)
            .execute()
            .then(function (reverseResponse) {
            t.truthy(reverseResponse);
            t.is(reverseResponse.responseCode, "00");
        }));
    });
});
test("011 - charge mastercard swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.masterCardSwipe();
    return card
        .charge(15.02)
        .withCurrency("USD")
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("012 - charge discover swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.discoverSwipe();
    return card
        .charge(15.02)
        .withCurrency("USD")
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("013 - charge amex swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.amexSwipe();
    return card
        .charge(15.02)
        .withCurrency("USD")
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("014 - charge jcb swipe", function (t) {
    t.plan(4);
    var card = _2.TestCards.visaSwipe();
    return card
        .charge(15.05)
        .withCurrency("USD")
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        // test 058
        return (response
            .refund(15.05)
            .withCurrency("USD")
            .execute()
            .then(function (refundResponse) {
            t.truthy(refundResponse);
            t.is(refundResponse.responseCode, "00");
        }));
    });
});
test("014a - charge mastercard 24 swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.masterCard24Swipe();
    return card
        .charge(15.34)
        .withCurrency("USD")
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("014b - charge mastercard 25 swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.masterCard25Swipe();
    return card
        .charge(15.34)
        .withCurrency("USD")
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("015 - charge visa swipe", function (t) {
    t.plan(4);
    var card = _2.TestCards.visaSwipe();
    return card
        .charge(15.06)
        .withCurrency("USD")
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        // test 063
        return (response
            .reverse(15.06)
            .withAuthAmount(5.06)
            .execute()
            .then(function (reverseResponse) {
            t.truthy(reverseResponse);
            t.is(reverseResponse.responseCode, "00");
        }));
    });
});
/// Manually Entered - Card Present
test("016 - charge visa manual card present", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "750241234";
    address.streetAddress1 = "6860 Dallas Pkwy";
    var card = _2.TestCards.visaManual(true, true);
    return card
        .charge(16.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("017 - charge mastercard manual card present", function (t) {
    t.plan(4);
    var address = new _1.Address();
    address.postalCode = "75024";
    address.streetAddress1 = "6860 Dallas Pkwy";
    var card = _2.TestCards.masterCardManual(true, true);
    return card
        .charge(16.02)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        // test case 60
        return (response
            .reverse(16.02)
            .execute()
            .then(function (reverseResponse) {
            t.truthy(reverseResponse);
            t.is(reverseResponse.responseCode, "00");
        }));
    });
});
test("018 - charge discover manual card present", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "750241234";
    var card = _2.TestCards.discoverManual(true, true);
    return card
        .charge(16.03)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("019 - charge amex manual card present", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "75024";
    address.streetAddress1 = "6860";
    var card = _2.TestCards.amexManual(true, true);
    return card
        .charge(16.04)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("020 - charge jcb manual card present", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.jcbManual(true, true);
    return card
        .charge(16.05)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("021 - charge discover manual card present", function (t) {
    t.plan(4);
    var address = new _1.Address();
    address.postalCode = "750241234";
    address.streetAddress1 = "6860 Dallas Pkwy";
    var card = _2.TestCards.discoverManual(true, true);
    return card
        .charge(16.07)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        // test case 64
        return (response
            .reverse(16.07)
            .withAuthAmount(6.07)
            .execute()
            .then(function (reverseResponse) {
            t.truthy(reverseResponse);
            t.is(reverseResponse.responseCode, "00");
        }));
    });
});
/// Manually Entered - Card Not Present
test("022 - charge visa manual card not present", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "750241234";
    address.streetAddress1 = "6860 Dallas Pkwy";
    var card;
    if (useTokens) {
        card = new _1.CreditCardData();
        card.token = visaToken;
    }
    else {
        card = _2.TestCards.visaManual(false, true);
    }
    return card
        .charge(17.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("023 - charge mastercard manual card not present", function (t) {
    t.plan(4);
    var address = new _1.Address();
    address.postalCode = "75024";
    address.streetAddress1 = "6860 Dallas Pkwy";
    var card;
    if (useTokens) {
        card = new _1.CreditCardData();
        card.token = masterCardToken;
    }
    else {
        card = _2.TestCards.masterCardManual(false, true);
    }
    return card
        .charge(17.02)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        // test case 61
        return (response
            .reverse(17.02)
            .execute()
            .then(function (reverseResponse) {
            t.truthy(reverseResponse);
            t.is(reverseResponse.responseCode, "00");
        }));
    });
});
test("024 - charge discover manual card not present", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "750241234";
    var card;
    if (useTokens) {
        card = new _1.CreditCardData();
        card.token = discoverToken;
    }
    else {
        card = _2.TestCards.discoverManual(false, true);
    }
    return card
        .charge(17.03)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("025 - charge amex manual card not present", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "75024";
    address.streetAddress1 = "6860";
    var card;
    if (useTokens) {
        card = new _1.CreditCardData();
        card.token = amexToken;
    }
    else {
        card = _2.TestCards.amexManual(false, true);
    }
    return card
        .charge(17.04)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("026 - charge jcb manual card not present", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.jcbManual(false, true);
    return card
        .charge(17.05)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// Contactless
test("027 - charge visa contactless", function (t) {
    t.plan(2);
    var card = _2.TestCards.visaSwipe(_1.EntryMethod.Proximity);
    return card
        .charge(18.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("028 - charge mastercard contactless", function (t) {
    t.plan(2);
    var card = _2.TestCards.masterCardSwipe(_1.EntryMethod.Proximity);
    return card
        .charge(18.02)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("029 - charge discover contactless", function (t) {
    t.plan(2);
    var card = _2.TestCards.discoverSwipe(_1.EntryMethod.Proximity);
    return card
        .charge(18.03)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("030 - charge amex contactless", function (t) {
    t.plan(2);
    var card = _2.TestCards.amexSwipe(_1.EntryMethod.Proximity);
    return card
        .charge(18.04)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// AUTHORIZATION
test("031 - authorize visa swipe", function (t) {
    t.plan(4);
    var card = _2.TestCards.visaSwipe();
    // 031a authorize
    return (card
        .authorize(15.08)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return response
            .capture()
            .execute()
            .then(function (captureResponse) {
            t.truthy(captureResponse);
            t.is(captureResponse.responseCode, "00");
        });
    }));
});
test("032 - authorize visa swipe additional auth", function (t) {
    t.plan(4);
    var card = _2.TestCards.visaSwipe();
    // 032a authorize
    return (card
        .authorize(15.09)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return response
            .capture()
            .execute()
            .then(function (captureResponse) {
            t.truthy(captureResponse);
            t.is(captureResponse.responseCode, "00");
        });
    }));
});
test("033 - authorize mastercard swipe", function (t) {
    t.plan(4);
    var card = _2.TestCards.masterCardSwipe();
    // 033a authorize
    return (card
        .authorize(15.1)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return response
            .capture()
            .execute()
            .then(function (captureResponse) {
            t.truthy(captureResponse);
            t.is(captureResponse.responseCode, "00");
        });
    }));
});
test("033a - authorize discover swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.discoverSwipe();
    return card
        .authorize(15.1)
        .withCurrency("USD")
        .withAllowDuplicates(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// AUTHORIZATION - Manually Entered, Card Present
test("034 - authorize visa manual card present", function (t) {
    t.plan(4);
    var address = new _1.Address();
    address.postalCode = "75024";
    address.streetAddress1 = "6860 Dallas Pkwy";
    var card = _2.TestCards.visaManual(true, true);
    // 034a authorize
    return (card
        .authorize(16.08)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return response
            .capture()
            .execute()
            .then(function (captureResponse) {
            t.truthy(captureResponse);
            t.is(captureResponse.responseCode, "00");
        });
    }));
});
test("035 - authorize visa manual card present additional auth", function (t) {
    t.plan(4);
    var address = new _1.Address();
    address.postalCode = "75024";
    address.streetAddress1 = "6860 Dallas Pkwy";
    var card = _2.TestCards.visaManual(true, true);
    // 035a authorize
    return (card
        .authorize(16.09)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return response
            .capture()
            .execute()
            .then(function (captureResponse) {
            t.truthy(captureResponse);
            t.is(captureResponse.responseCode, "00");
        });
    }));
});
test("036 - authorize mastercard manual card present", function (t) {
    t.plan(4);
    var address = new _1.Address();
    address.postalCode = "75024";
    address.streetAddress1 = "6860 Dallas Pkwy";
    var card = _2.TestCards.masterCardManual(true, true);
    // 036a authorize
    return (card
        .authorize(16.1)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return response
            .capture()
            .execute()
            .then(function (captureResponse) {
            t.truthy(captureResponse);
            t.is(captureResponse.responseCode, "00");
        });
    }));
});
test("036a - authorize discover manual card present", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "750241234";
    var card = _2.TestCards.discoverManual(true, true);
    return card
        .authorize(16.1)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// AUTHORIZATION - Manually Entered, Card Not Present
test("037 - authorize visa manual", function (t) {
    t.plan(4);
    var address = new _1.Address();
    address.postalCode = "750241234";
    address.streetAddress1 = "6860 Dallas Pkwy";
    var card = _2.TestCards.visaManual(false, true);
    // 034a authorize
    return (card
        .authorize(17.08)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return response
            .capture()
            .execute()
            .then(function (captureResponse) {
            t.truthy(captureResponse);
            t.is(captureResponse.responseCode, "00");
        });
    }));
});
test("038 - authorize mastercard manual", function (t) {
    t.plan(4);
    var address = new _1.Address();
    address.postalCode = "750241234";
    address.streetAddress1 = "6860";
    var card = _2.TestCards.masterCardManual(false, true);
    // 036a authorize
    return (card
        .authorize(17.09)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return response
            .capture()
            .execute()
            .then(function (captureResponse) {
            t.truthy(captureResponse);
            t.is(captureResponse.responseCode, "00");
        });
    }));
});
test("038a - authorize discover manual", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "750241234";
    var card = _2.TestCards.discoverManual(false, true);
    return card
        .authorize(17.1)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// PARTIALLY APPROVED SALE (Required)
test("039 - charge discover swipe partial approval", function (t) {
    t.plan(3);
    var card = _2.TestCards.discoverSwipe();
    return card
        .charge(40.0)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAllowPartialAuth(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "10");
        t.is(response.authorizedAmount, "40.00");
    });
});
test("040 - charge visa swipe partial approval", function (t) {
    t.plan(3);
    var card = _2.TestCards.visaSwipe();
    return card
        .charge(130.0)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAllowPartialAuth(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "10");
        t.is(response.authorizedAmount, "110.00");
    });
});
test("041 - charge discover manual partial approval", function (t) {
    t.plan(3);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.discoverManual(true, true);
    return card
        .charge(145.0)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAllowPartialAuth(true)
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "10");
        t.is(response.authorizedAmount, "65.00");
    });
});
test("042 - charge mastercard swipe partial approval", function (t) {
    t.plan(5);
    var card = _2.TestCards.masterCardSwipe();
    return (card
        .charge(155.0)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAllowPartialAuth(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "10");
        t.is(response.authorizedAmount, "100.00");
        return response;
    })
        .then(function (response) {
        return (response
            .reverse(100.0)
            .execute()
            .then(function (reverseResponse) {
            t.truthy(reverseResponse);
            t.is(reverseResponse.responseCode, "00");
        }));
    }));
});
/// SALE WITH GRATUITY
/// Tip Edit (Tip at Settlement)
test("043 - charge visa swipe edit gratuity", function (t) {
    var card = _2.TestCards.visaSwipe();
    return card
        .charge(15.12)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withAmount(18.12)
            .withGratuity(3.0)
            .execute()
            .then(function (editResponse) {
            t.truthy(editResponse);
            t.is(editResponse.responseCode, "00");
        }));
    });
});
test("044 - charge mastercard manual edit gratuity", function (t) {
    t.plan(4);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.masterCardManual(true, true);
    return card
        .charge(15.13)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withAmount(18.13)
            .withGratuity(3.0)
            .execute()
            .then(function (editResponse) {
            t.truthy(editResponse);
            t.is(editResponse.responseCode, "00");
        }));
    });
});
/// Tip on Purchase
test("045 - charge visa manual gratuity", function (t) {
    t.plan(2);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.visaManual(true, true);
    return card
        .charge(18.61)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .withGratuity(3.5)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("046 - charge mastercard swipe gratuity", function (t) {
    t.plan(4);
    var card = _2.TestCards.masterCardSwipe();
    return card
        .charge(18.62)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withGratuity(3.5)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withAmount(18.12)
            .withGratuity(3.0)
            .execute()
            .then(function (editResponse) {
            t.truthy(editResponse);
            t.is(editResponse.responseCode, "00");
        }));
    });
});
/// LEVEL II CORPORATE PURCHASE CARD
test("047 - level ii visa swipe response b", function (t) {
    t.plan(5);
    var card = _2.TestCards.visaSwipe();
    return card
        .charge(112.34)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "B");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withTaxType(_1.TaxType.SalesTax)
            .withTaxAmount(1)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("047a - level ii visa swipe response b", function (t) {
    t.plan(5);
    var card = _2.TestCards.visaSwipe();
    return card
        .charge(112.34)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "B");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withTaxType(_1.TaxType.NotUsed)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("048 - level ii visa swipe response r", function (t) {
    t.plan(5);
    var card = _2.TestCards.visaSwipe();
    return card
        .charge(123.45)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "R");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withTaxType(_1.TaxType.TaxExempt)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("049 - level ii visa manual response s", function (t) {
    t.plan(5);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.visaManual(true, true);
    return card
        .charge(134.56)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "S");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withPoNumber("9876543210")
            .withTaxType(_1.TaxType.SalesTax)
            .withTaxAmount(1)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("050 - level ii mastercard swipe response s", function (t) {
    t.plan(5);
    var card = _2.TestCards.masterCardSwipe();
    return card
        .charge(111.06)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "S");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withPoNumber("9876543210")
            .withTaxType(_1.TaxType.NotUsed)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("051 - level ii mastercard manual response s", function (t) {
    t.plan(5);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.masterCardManual(true, true);
    return card
        .charge(111.07)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "S");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withPoNumber("9876543210")
            .withTaxType(_1.TaxType.SalesTax)
            .withTaxAmount(1)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("051a - level ii mastercard manual response s", function (t) {
    t.plan(5);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.masterCardManual(true, true);
    return card
        .charge(111.08)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "S");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withPoNumber("9876543210")
            .withTaxType(_1.TaxType.SalesTax)
            .withTaxAmount(1)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("052 - level ii mastercard manual response s", function (t) {
    t.plan(5);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.masterCardManual(true, true);
    return card
        .charge(111.09)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "S");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withPoNumber("9876543210")
            .withTaxType(_1.TaxType.TaxExempt)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("053 - level ii amex swipe no response", function (t) {
    t.plan(5);
    var card = _2.TestCards.amexSwipe();
    return card
        .charge(111.1)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "0");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withTaxType(_1.TaxType.SalesTax)
            .withTaxAmount(1)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("054 - level ii amex manual no response", function (t) {
    t.plan(5);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.amexManual(true, true);
    return card
        .charge(111.11)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "0");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withPoNumber("9876543210")
            .withTaxType(_1.TaxType.NotUsed)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("055 - level ii amex manual no response", function (t) {
    t.plan(5);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.amexManual(true, true);
    return card
        .charge(111.12)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "0");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withPoNumber("9876543210")
            .withTaxType(_1.TaxType.NotUsed)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
test("055a - level ii amex manual no response", function (t) {
    t.plan(5);
    var address = new _1.Address();
    address.postalCode = "75024";
    var card = _2.TestCards.amexManual(true, true);
    return card
        .charge(111.13)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAddress(address)
        .withCommercialRequest(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "0");
        return response;
    })
        .then(function (response) {
        return (response
            .edit()
            .withPoNumber("9876543210")
            .withTaxType(_1.TaxType.TaxExempt)
            .execute()
            .then(function (cpcResponse) {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
        }));
    });
});
/// OFFLINE SALE / AUTHORIZATION
test("056 - offline charge visa manual", function (t) {
    t.plan(2);
    var card = _2.TestCards.visaManual(false, true);
    return card
        .charge(15.12)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withOfflineAuthCode("654321")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("056 - offline auth visa manual", function (t) {
    t.plan(2);
    var card = _2.TestCards.visaManual(false, true);
    return card
        .authorize(15.11)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withOfflineAuthCode("654321")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// RETURN
test("057 - return mastercard", function (t) {
    t.plan(2);
    var card = _2.TestCards.masterCardManual(false, true);
    return card
        .refund(15.11)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("057a - return mastercard swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.masterCardSwipe();
    return card
        .refund(15.15)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("058 - return jcb transaction id", function (_t) {
    // see test 14
});
/// ONLINE VOID / REVERSAL (Required)
test("059 - reversal visa", function (_t) {
    // see test 10
});
test("060 - reversal mastercard", function (_t) {
    // see test case 17
});
test("061 - reversal mastercard", function (_t) {
    // see test case 23
});
test("062 - reversal mastercard", function (_t) {
    // see test case 42
});
test("063 - reversal visa partial", function (_t) {
    // see test case 15
});
test("064 - reversal discover partial", function (_t) {
    // see test 21
});
/// PIN DEBIT CARD FUNCTIONS
test("065 - debit sale visa swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.asDebit(_2.TestCards.visaSwipe(), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(14.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("066 - debit sale mastercard swipe", function (t) {
    t.plan(4);
    var card = _2.TestCards.asDebit(_2.TestCards.masterCardSwipe(), "F505AD81659AA42A3D123412324000AB");
    return card
        .charge(14.02)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (_response) {
        // test case 71
        return (card
            .reverse(14.02)
            .execute()
            .then(function (reverseResponse) {
            t.truthy(reverseResponse);
            t.is(reverseResponse.responseCode, "00");
        }));
    });
});
test("067 - debit sale visa swipe cashback", function (t) {
    t.plan(2);
    var card = _2.TestCards.asDebit(_2.TestCards.visaSwipe(), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(14.03)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCashBack(5.0)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("067a - debit sale mastercard", function (t) {
    t.plan(2);
    var card = _2.TestCards.asDebit(_2.TestCards.masterCardSwipe(), "F505AD81659AA42A3D123412324000AB");
    return card
        .charge(14.04)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// PARTIALLY APPROVED PURCHASE
test("068 - debit sale mastercard partial approval", function (t) {
    t.plan(3);
    var card = _2.TestCards.asDebit(_2.TestCards.masterCardSwipe(), "F505AD81659AA42A3D123412324000AB");
    return card
        .charge(33.0)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAllowPartialAuth(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "10");
        t.is(response.authorizedAmount, "22.00");
    });
});
test("069 - debit sale visa partial approval", function (t) {
    t.plan(5);
    var card = _2.TestCards.asDebit(_2.TestCards.visaSwipe(), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(44.0)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withAllowPartialAuth(true)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "10");
        t.is(response.authorizedAmount, "33.00");
        return response;
    })
        .then(function (_response) {
        // test case 72
        return (card
            .reverse(33.0)
            .execute()
            .then(function (reverseResponse) {
            t.truthy(reverseResponse);
            t.is(reverseResponse.responseCode, "00");
        }));
    });
});
/// RETURN
test("070 - debit return visa swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.asDebit(_2.TestCards.visaSwipe(), "32539F50C245A6A93D123412324000AA");
    return card
        .refund(14.07)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("070a - debit return visa swipe", function (t) {
    t.plan(4);
    var card = _2.TestCards.asDebit(_2.TestCards.visaSwipe(), "32539F50C245A6A93D123412324000AA");
    return card
        .refund(14.08)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (_response) {
        return (card
            .reverse(14.08)
            .execute()
            .then(function (reverseResponse) {
            t.truthy(reverseResponse);
            t.is(reverseResponse.responseCode, "00");
        }));
    });
});
/// REVERSAL
test("071 - debit reversal mastercard", function (_t) {
    // see test case 66
});
test("072 - debit reversal visa", function (_t) {
    // see test case 96
});
/// EBT FUNCTIONS
/// Food Stamp Purchase
test("080 - ebt fs purchase visa swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTTrack(_2.TestCards.visaSwipe(), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(101.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("081 - ebt fs purchase visa manual", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTManual(_2.TestCards.visaManual(false, true), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(102.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// Food Stamp Electronic Voucher (Manual Entry Only)
test("082 - ebt voucher purchase visa", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTManual(_2.TestCards.visaManual(false, true), "32539F50C245A6A93D123412324000AA");
    card.serialNumber = "123456789012345";
    card.approvalCode = "123456";
    return card
        .charge(103.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// Food Stamp Balance Inquiry
test("083 - ebt fs return visa swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTTrack(_2.TestCards.visaSwipeEncrypted(), "32539F50C245A6A93D123412324000AA");
    return card
        .refund(104.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("084 - ebt fs return visa manual", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTManual(_2.TestCards.visaManual(false, true), "32539F50C245A6A93D123412324000AA");
    return card
        .refund(105.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// Food Stamp Balance Inquiry
test("085 - ebt balance inquiry visa swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTTrack(_2.TestCards.visaSwipeEncrypted(), "32539F50C245A6A93D123412324000AA");
    return card
        .balanceInquiry()
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("086 - ebt balance inquiry visa manual", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTManual(_2.TestCards.visaManual(true, true), "32539F50C245A6A93D123412324000AA");
    return card
        .balanceInquiry()
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// EBT CASH BENEFITS
/// Cash Back Purchase
test("087 - ebt cash back purchase visa swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTTrack(_2.TestCards.visaSwipeEncrypted(), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(106.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCashBack(5.0)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("088 - ebt cash back purchase visa manual", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTManual(_2.TestCards.visaManual(false, true), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(107.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCashBack(5.0)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// No Cash Back Purchase
test("089 - ebt cash back purchase visa swipe no cash back", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTTrack(_2.TestCards.visaSwipeEncrypted(), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(108.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCashBack(0)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("090 - ebt cash back purchase visa manual no cash back", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTManual(_2.TestCards.visaManual(false, true), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(109.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCashBack(0)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// Cash Back Balance Inquiry
test("091 - ebt balance inquiry visa swipe cash", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTTrack(_2.TestCards.visaSwipeEncrypted(), "32539F50C245A6A93D123412324000AA");
    return card
        .balanceInquiry(_1.InquiryType.Cash)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("092 - ebt balance inquiry visa manual cash", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTManual(_2.TestCards.visaManual(true, true), "32539F50C245A6A93D123412324000AA");
    return card
        .balanceInquiry(_1.InquiryType.Cash)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// Cash Benefits Withdrawal
test("093 - ebt benefit withdrawal visa swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTTrack(_2.TestCards.visaSwipeEncrypted(), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(110.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("094 - ebt benefit withdrawal visa manual", function (t) {
    t.plan(2);
    var card = _2.TestCards.asEBTManual(_2.TestCards.visaManual(false, true), "32539F50C245A6A93D123412324000AA");
    return card
        .charge(111.01)
        .withAllowDuplicates(true)
        .withCurrency("USD")
        .withCashBack(0)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// HMS GIFT - REWARDS
/// GIFT
/// ACTIVATE
test("095 - activate gift 1 swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.giftCard1Swipe();
    return card
        .activate(6.0)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("096 - activate gift 2 manual", function (t) {
    t.plan(2);
    var card = _2.TestCards.giftCard2Manual();
    return card
        .activate(7.0)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// ADD VALUE
test("097 - add value gift 1 swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.giftCard1Swipe();
    return card
        .addValue(8.0)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("098 - add value gift 2 manual", function (t) {
    t.plan(2);
    var card = _2.TestCards.giftCard2Manual();
    return card
        .addValue(9.0)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// BALANCE INQUIRY
test("099 - balance inquiry gift 1 swipe", function (t) {
    t.plan(3);
    var card = _2.TestCards.giftCard1Swipe();
    return card
        .balanceInquiry()
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.balanceAmount, "10.00");
    });
});
test("100 - balance inquiry gift 2 manual", function (t) {
    t.plan(3);
    var card = _2.TestCards.giftCard2Manual();
    return card
        .balanceInquiry()
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.balanceAmount, "10.00");
    });
});
/// REPLACE / TRANSFER
test("101 - replace gift 1 swipe", function (t) {
    t.plan(2);
    var oldCard = _2.TestCards.giftCard1Swipe();
    var newCard = _2.TestCards.giftCard2Manual();
    return oldCard
        .replaceWith(newCard)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("102 - replace gift 2 manual", function (t) {
    t.plan(2);
    var newCard = _2.TestCards.giftCard1Swipe();
    var oldCard = _2.TestCards.giftCard2Manual();
    return oldCard
        .replaceWith(newCard)
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// SALE / REDEEM
test("103 - sale gift 1 swipe", function (t) {
    t.plan(2);
    var card = _2.TestCards.giftCard1Swipe();
    return card
        .charge(1.0)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("104 - sale gift 2 manual", function (t) {
    t.plan(2);
    var card = _2.TestCards.giftCard2Manual();
    return card
        .charge(2.0)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("105 - sale gift 1 void swipe", function (t) {
    t.plan(4);
    var card = _2.TestCards.giftCard1Swipe();
    return card
        .charge(3.0)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        // test case 107
        return response
            .void()
            .execute()
            .then(function (voidResponse) {
            t.truthy(voidResponse);
            t.is(voidResponse.responseCode, "00");
        });
    });
});
test("106 - sale gift 2 reversal manual", function (t) {
    t.plan(4);
    var card = _2.TestCards.giftCard2Manual();
    return card
        .charge(4.0)
        .withCurrency("USD")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
    })
        .then(function (response) {
        // test case 108
        return response
            .reverse(4.0)
            .execute()
            .then(function (voidResponse) {
            t.truthy(voidResponse);
            t.is(voidResponse.responseCode, "00");
        });
    });
});
/// VOID
test("107 - void gift", function (_t) {
    // see test case 105
});
/// REVERSAL
test("108 - reversal gift", function (_t) {
    // see test case 106
});
/// DEACTIVATE
test("109 - deactivate gift 1", function (t) {
    t.plan(2);
    var card = _2.TestCards.giftCard1Swipe();
    return card
        .deactivate()
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
/// RECEIPTS MESSAGING
test("110 - receipts messaging", function (_t) {
    /// PRINT AND SCAN RECEIPT FOR TEST 107
});
/// REWARDS
/// BALANCE INQUIRY
test("111 - balance inquiry rewards 1", function (t) {
    t.plan(3);
    var card = _2.TestCards.giftCard1Swipe();
    return card
        .balanceInquiry()
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.pointsBalanceAmount, "0");
    });
});
test("112 - balance inquiry rewards 2", function (t) {
    t.plan(3);
    var card = _2.TestCards.giftCard2Manual();
    return card
        .balanceInquiry()
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.pointsBalanceAmount, "0");
    });
});
/// ALIAS
test("113 - create alias gift 1", function (t) {
    t.plan(1);
    return _1.GiftCard.create("9725550100").then(function (card) {
        t.truthy(card);
    });
});
test("114 - create alias gift 2", function (t) {
    t.plan(1);
    return _1.GiftCard.create("9725550100").then(function (card) {
        t.truthy(card);
    });
});
test("115 - add alias gift 1", function (t) {
    t.plan(2);
    var card = _2.TestCards.giftCard1Swipe();
    return card
        .addAlias("2145550199")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("116 - add alias gift 2", function (t) {
    t.plan(2);
    var card = _2.TestCards.giftCard2Manual();
    return card
        .addAlias("2145550199")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test("117 - delete alias gift 1", function (t) {
    t.plan(2);
    var card = _2.TestCards.giftCard1Swipe();
    return card
        .removeAlias("2145550199")
        .execute()
        .then(function (response) {
        t.truthy(response);
        t.is(response.responseCode, "00");
    });
});
test.after("999 - close batch", function (t) {
    t.plan(1);
    return new Promise(function (resolve, reject) {
        _1.BatchService.closeBatch()
            .then(function (response) {
            t.truthy(response);
            resolve();
        })
            .catch(function (e) {
            if (e.message.indexOf(BATCH_NOT_OPEN) !== -1 ||
                e.message.indexOf(BATCH_EMPTY) !== -1) {
                t.pass();
                resolve();
                return;
            }
            reject(e);
        });
    });
});
