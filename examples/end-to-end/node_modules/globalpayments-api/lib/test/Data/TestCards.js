"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
var TestCards = /** @class */ (function () {
    function TestCards() {
    }
    TestCards.asDebit = function (card, pinBlock) {
        var data = new src_1.DebitTrackData();
        data.value = card.value;
        data.encryptionData = card.encryptionData;
        data.pinBlock = pinBlock;
        return data;
    };
    TestCards.asEBTTrack = function (card, pinBlock) {
        var data = new src_1.EBTTrackData();
        data.value = card.value;
        data.entryMethod = card.entryMethod;
        data.encryptionData = card.encryptionData;
        data.pinBlock = pinBlock;
        return data;
    };
    TestCards.asEBTManual = function (card, pinBlock) {
        var data = new src_1.EBTCardData();
        data.number = card.number;
        data.expMonth = card.expMonth;
        data.expYear = card.expYear;
        data.pinBlock = pinBlock;
        return data;
    };
    TestCards.visaManual = function (cardPresent, readerPresent) {
        if (cardPresent === void 0) { cardPresent = false; }
        if (readerPresent === void 0) { readerPresent = false; }
        var data = new src_1.CreditCardData();
        data.number = "4012002000060016";
        data.expMonth = "12";
        data.expYear = "2025";
        data.cvn = "123";
        data.cardPresent = cardPresent;
        data.readerPresent = readerPresent;
        return data;
    };
    TestCards.visaSwipe = function (entryMethod) {
        if (!entryMethod) {
            entryMethod = src_1.EntryMethod.Swipe;
        }
        var data = new src_1.CreditTrackData();
        data.value =
            "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?";
        data.entryMethod = entryMethod;
        return data;
    };
    TestCards.visaSwipeEncrypted = function (entryMethod) {
        if (!entryMethod) {
            entryMethod = src_1.EntryMethod.Swipe;
        }
        var encryptionData = new src_1.EncryptionData();
        encryptionData.version = "01";
        var data = new src_1.CreditTrackData();
        data.value =
            "<E1050711%B4012001000000016^VI TEST CREDIT^251200000000000000000000?|LO04K0WFOmdkDz0um+GwUkILL8ZZOP6Z" +
                "c4rCpZ9+kg2T3JBT4AEOilWTI|+++++++Dbbn04ekG|11;4012001000000016=25120000000000000000?|1u2F/aEhbdoPixyAPGyIDv3gB" +
                "fF|+++++++Dbbn04ekG|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVp" +
                "CW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68N" +
                "zj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|>;";
        data.entryMethod = entryMethod;
        data.encryptionData = encryptionData;
        return data;
    };
    TestCards.masterCardManual = function (cardPresent, readerPresent) {
        if (cardPresent === void 0) { cardPresent = false; }
        if (readerPresent === void 0) { readerPresent = false; }
        var data = new src_1.CreditCardData();
        data.number = "5473500000000014";
        data.expMonth = "12";
        data.expYear = "2025";
        data.cvn = "123";
        data.cardPresent = cardPresent;
        data.readerPresent = readerPresent;
        return data;
    };
    TestCards.masterCardSwipe = function (entryMethod) {
        if (!entryMethod) {
            entryMethod = src_1.EntryMethod.Swipe;
        }
        var data = new src_1.CreditTrackData();
        data.value =
            "%B5473500000000014^MC TEST CARD^251210199998888777766665555444433332?;5473500000000014=25121019999888877776?";
        data.entryMethod = entryMethod;
        return data;
    };
    TestCards.masterCard24Swipe = function (entryMethod) {
        if (!entryMethod) {
            entryMethod = src_1.EntryMethod.Swipe;
        }
        var data = new src_1.CreditTrackData();
        data.value =
            "%B2223000010005780^TEST CARD/EMV BIN-2^19121010000000009210?;2223000010005780=19121010000000009210?";
        data.entryMethod = entryMethod;
        return data;
    };
    TestCards.masterCard25Swipe = function (entryMethod) {
        if (!entryMethod) {
            entryMethod = src_1.EntryMethod.Swipe;
        }
        var data = new src_1.CreditTrackData();
        data.value =
            "%B2223000010005798^TEST CARD/EMV BIN-2^19121010000000003840?;2223000010005798=19121010000000003840?";
        data.entryMethod = entryMethod;
        return data;
    };
    TestCards.masterCardSwipeEncrypted = function (entryMethod) {
        if (!entryMethod) {
            entryMethod = src_1.EntryMethod.Swipe;
        }
        var encryptionData = new src_1.EncryptionData();
        encryptionData.version = "01";
        var data = new src_1.CreditTrackData();
        data.value =
            "<E1052711%B5473501000000014^MC TEST CARD^251200000000000000000000000000000000?|GVEY/MKaKXuqqjKRRue" +
                "IdCHPPoj1gMccgNOtHC41ymz7bIvyJJVdD3LW8BbwvwoenI+|+++++++C4cI2zjMp|11;5473501000000014=25120000000000000000?" +
                "|8XqYkQGMdGeiIsgM0pzdCbEGUDP|+++++++C4cI2zjMp|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0" +
                "PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqI" +
                "s68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|>";
        data.entryMethod = entryMethod;
        data.encryptionData = encryptionData;
        return data;
    };
    TestCards.discoverManual = function (cardPresent, readerPresent) {
        if (cardPresent === void 0) { cardPresent = false; }
        if (readerPresent === void 0) { readerPresent = false; }
        var data = new src_1.CreditCardData();
        data.number = "6011000990156527";
        data.expMonth = "12";
        data.expYear = "2025";
        data.cvn = "123";
        data.cardPresent = cardPresent;
        data.readerPresent = readerPresent;
        return data;
    };
    TestCards.discoverSwipe = function (entryMethod) {
        if (!entryMethod) {
            entryMethod = src_1.EntryMethod.Swipe;
        }
        var data = new src_1.CreditTrackData();
        data.value =
            "%B6011000990156527^DIS TEST CARD^25121011000062111401?;6011000990156527=25121011000062111401?";
        data.entryMethod = entryMethod;
        return data;
    };
    TestCards.discoverSwipeEncrypted = function (entryMethod) {
        if (!entryMethod) {
            entryMethod = src_1.EntryMethod.Swipe;
        }
        var encryptionData = new src_1.EncryptionData();
        encryptionData.version = "01";
        var data = new src_1.CreditTrackData();
        data.value =
            "<E1049711%B6011000000006527^DIS TEST CARD^25120000000000000000?|nqtDvLuS4VHJd1FymxBxihO5g/ZDqlHyTf8fQpjBwkk95cc6PG9V|" +
                "+++++++C+LdWXLpP|11;6011000000006527=25120000000000000000?|8VfZvczP6iBqRis2XFypmktaipa|+++++++C+LdWXLpP|00|||" +
                "/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4" +
                "+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7p" +
                "fMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|>";
        data.entryMethod = entryMethod;
        data.encryptionData = encryptionData;
        return data;
    };
    TestCards.amexManual = function (cardPresent, readerPresent) {
        if (cardPresent === void 0) { cardPresent = false; }
        if (readerPresent === void 0) { readerPresent = false; }
        var data = new src_1.CreditCardData();
        data.number = "372700699251018";
        data.expMonth = "12";
        data.expYear = "2025";
        data.cvn = "1234";
        data.cardPresent = cardPresent;
        data.readerPresent = readerPresent;
        return data;
    };
    TestCards.amexSwipe = function (entryMethod) {
        if (!entryMethod) {
            entryMethod = src_1.EntryMethod.Swipe;
        }
        var data = new src_1.CreditTrackData();
        data.value =
            "%B3727 006992 51018^AMEX TEST CARD^2512990502700?;372700699251018=2512990502700?";
        data.entryMethod = entryMethod;
        return data;
    };
    TestCards.jcbManual = function (cardPresent, readerPresent) {
        if (cardPresent === void 0) { cardPresent = false; }
        if (readerPresent === void 0) { readerPresent = false; }
        var data = new src_1.CreditCardData();
        data.number = "3566007770007321";
        data.expMonth = "12";
        data.expYear = "2025";
        data.cvn = "123";
        data.cardPresent = cardPresent;
        data.readerPresent = readerPresent;
        return data;
    };
    TestCards.jcbSwipe = function (entryMethod) {
        if (!entryMethod) {
            entryMethod = src_1.EntryMethod.Swipe;
        }
        var data = new src_1.CreditTrackData();
        data.value =
            "%B3566007770007321^JCB TEST CARD^2512101100000000000000000064300000?;3566007770007321=25121011000000076435?";
        data.entryMethod = entryMethod;
        return data;
    };
    TestCards.giftCard1Swipe = function () {
        var data = new src_1.GiftCard();
        data.trackData =
            "%B5022440000000000098^^391200081613?;5022440000000000098=391200081613?";
        return data;
    };
    TestCards.giftCard2Manual = function () {
        var data = new src_1.GiftCard();
        data.number = "5022440000000000007";
        return data;
    };
    TestCards.gsbManual = function () {
        var data = new src_1.CreditCardData();
        data.number = "6277220572999800";
        data.expMonth = "12";
        data.expYear = "2049";
        return data;
    };
    return TestCards;
}());
exports.TestCards = TestCards;
