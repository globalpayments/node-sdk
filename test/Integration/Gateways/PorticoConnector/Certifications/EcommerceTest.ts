import ava from "ava";
import {
  Address,
  BatchService,
  CreditCardData,
  CreditTrackData,
  GiftCard,
  ServicesConfig,
  ServicesContainer,
  TaxType,
  TransactionModifier,
} from "../../../../../src/";
import {
  TestCards,
} from "../../../../Data/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";

const BATCH_NOT_OPEN = "Transaction was rejected because it requires a batch to be open.";
const BATCH_EMPTY = "Batch close was rejected because no transactions are associated with the currently open batch";
const useTokens = false;
const usePrepaid = false;
const test = useTokens ? ava.serial : ava;

let visaToken = "";
let mastercardToken = "";
let discoverToken = "";
let amexToken = "";

ava.before((_t) => {
  ServicesContainer.configure(config);
});

test.before("000 - close batch", (t) => {
  t.plan(1);

  return new Promise((resolve, reject) => {
    BatchService.closeBatch()
      .then((response) => {
        t.truthy(response);
        resolve();
      })
      .catch((e: Error) => {
        if (e.message.indexOf(BATCH_NOT_OPEN) !== -1
          || e.message.indexOf(BATCH_EMPTY) !== -1
        ) {
          t.pass();
          resolve();
          return;
        }
        reject(e);
      });
  });
});

/// CARD VERIFY

/// Account verification

test("001 - verify visa", (t) => {
  t.plan(2);

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.verify()
      .withRequestMultiUseToken(useTokens)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("002 - verify mastercard", (t) => {
  t.plan(2);

  const card = TestCards.masterCardManual();

  return new Promise((resolve, reject) => {
    card.verify()
      .withRequestMultiUseToken(useTokens)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("003 - verify discover", (t) => {
  t.plan(2);

  const card = TestCards.discoverManual();
  const address = new Address();
  address.postalCode = "75024";

  return new Promise((resolve, reject) => {
    card.verify()
      .withAddress(address)
      .withRequestMultiUseToken(useTokens)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// Address verification

test("004 - verify amex", (t) => {
  t.plan(2);

  const card = TestCards.amexManual();
  const address = new Address();
  address.postalCode = "75024";

  return new Promise((resolve, reject) => {
    card.verify()
      .withAddress(address)
      .withRequestMultiUseToken(useTokens)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// Balance Inquiry (for prepaid cards)

test("005 - balance inquiry visa", (t) => {
  t.plan(2);

  const card = TestCards.visaSwipe();

  return new Promise((resolve, reject) => {
    card.balanceInquiry()
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// CREDIT SALE (for multi-use tokens only)

test("006 - charge visa token", (t) => {
  t.plan(3);

  const card = TestCards.visaManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  return new Promise((resolve, reject) => {
    card.charge()
      .withCurrency("USD")
      .withAmount("13.01")
      .withAddress(address)
      .withRequestMultiUseToken(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.truthy(response.token);
        visaToken = response.token;
        resolve();
      })
      .catch(reject);
  });
});

test("007 - charge mastercard token", (t) => {
  t.plan(3);

  const card = TestCards.masterCardManual();
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  return new Promise((resolve, reject) => {
    card.charge()
      .withCurrency("USD")
      .withAmount("13.02")
      .withAddress(address)
      .withRequestMultiUseToken(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.truthy(response.token);
        mastercardToken = response.token;
        resolve();
      })
      .catch(reject);
  });
});

test("008 - charge discover token", (t) => {
  t.plan(3);

  const card = TestCards.discoverManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  return new Promise((resolve, reject) => {
    card.charge()
      .withCurrency("USD")
      .withAmount("13.03")
      .withAddress(address)
      .withRequestMultiUseToken(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.truthy(response.token);
        discoverToken = response.token;
        resolve();
      })
      .catch(reject);
  });
});

test("009 - charge amex token", (t) => {
  t.plan(3);

  const card = TestCards.amexManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  return new Promise((resolve, reject) => {
    card.charge()
      .withCurrency("USD")
      .withAmount("13.04")
      .withAddress(address)
      .withRequestMultiUseToken(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.truthy(response.token);
        amexToken = response.token;
        resolve();
      })
      .catch(reject);
  });
});

/// CREDIT SALE

test("010 - charge visa", (t) => {
  t.plan(4);

  let card = TestCards.visaManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  if (useTokens) {
    card = new CreditCardData();
    card.token = visaToken;
  }

  return new Promise((resolve, reject) => {
    card.charge()
      .withCurrency("USD")
      .withAmount("17.01")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((response) => {
        response.void()
          .execute()
          .then((voidResponse) => {
            t.truthy(voidResponse);
            t.is(voidResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("011 - charge mastercard", (t) => {
  t.plan(2);

  let card = TestCards.masterCardManual();
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  if (useTokens) {
    card = new CreditCardData();
    card.token = mastercardToken;
  }

  return new Promise((resolve, reject) => {
    card.charge()
      .withCurrency("USD")
      .withAmount("17.02")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("012 - charge discover", (t) => {
  t.plan(2);

  let card = TestCards.discoverManual();
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "750241234";

  if (useTokens) {
    card = new CreditCardData();
    card.token = discoverToken;
  }

  return new Promise((resolve, reject) => {
    card.charge()
      .withCurrency("USD")
      .withAmount("17.03")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("013 - charge amex", (t) => {
  t.plan(2);

  let card = TestCards.amexManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  if (useTokens) {
    card = new CreditCardData();
    card.token = amexToken;
  }

  return new Promise((resolve, reject) => {
    card.charge()
      .withCurrency("USD")
      .withAmount("17.04")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("014 - charge jcb", (t) => {
  t.plan(2);

  const card = TestCards.jcbManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  return new Promise((resolve, reject) => {
    card.charge()
      .withCurrency("USD")
      .withAmount("17.04")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// AUTHORIZATION

test("015 - authorization visa", (t) => {
  t.plan(4);

  // test 015a Authorization
  const card = TestCards.visaManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  return new Promise((resolve, reject) => {
    card.authorize("17.06")
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((response) => {
        // test 015b Capture/AddToBatch
        response.capture()
          .execute()
          .then((capture) => {
            t.truthy(capture);
            t.is(capture.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("016 - authorization mastercard", (t) => {
  t.plan(4);

  // test 016a Authorization
  const card = TestCards.masterCardManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "750241234";

  return new Promise((resolve, reject) => {
    card.authorize("17.07")
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((response) => {
        // test 016b Capture/AddToBatch
        response.capture()
          .execute()
          .then((capture) => {
            t.truthy(capture);
            t.is(capture.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("017 - authorization discover", (t) => {
  t.plan(2);

  // test 017a Authorization
  const card = TestCards.discoverManual();
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  return new Promise((resolve, reject) => {
    card.authorize("17.08")
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((_response) => {
        // test 017b Capture/AddToBatch
        // do not capture
        resolve();
      })
      .catch(reject);
  });
});

/// PARTIALLY APPROVED SALE

test("018 - partial approval visa", (t) => {
  t.plan(4);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.charge(130)
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowPartialAuth(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "10");
        t.truthy(response.authorizedAmount);
        t.is(response.authorizedAmount, "110.00");
        resolve();
      })
      .catch(reject);
  });
});

test("019 - partial approval discover", (t) => {
  t.plan(4);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.discoverManual();

  return new Promise((resolve, reject) => {
    card.charge(145)
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowPartialAuth(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "10");
        t.truthy(response.authorizedAmount);
        t.is(response.authorizedAmount, "65.00");
        resolve();
      })
      .catch(reject);
  });
});

test("020 - partial approval mastercard", (t) => {
  t.plan(4);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.masterCardManual();

  return new Promise((resolve, reject) => {
    card.charge(155)
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowPartialAuth(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "10");
        t.truthy(response.authorizedAmount);
        t.is(response.authorizedAmount, "100.00");
        resolve();
      })
      .catch(reject);
  });
});

/// LEVEL II CORPORATE PURCHASE CARD

test("021 - level ii response b", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "750241234";

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.charge(112.34)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "B");
        return response;
      })
      .then((response) => {
        response.edit()
          .withPoNumber("9876543210")
          .withTaxType(TaxType.NotUsed)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("022 - level ii response b", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "750241234";

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.charge(112.34)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "B");
        return response;
      })
      .then((response) => {
        response.edit()
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1.00)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("023 - level ii response r", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.charge(123.45)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "R");
        return response;
      })
      .then((response) => {
        response.edit()
          .withTaxType(TaxType.TaxExempt)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("024 - level ii response s", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.charge(134.56)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "S");
        return response;
      })
      .then((response) => {
        response.edit()
          .withPoNumber("9876543210")
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1.00)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("025 - level ii response s", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.masterCardManual();

  return new Promise((resolve, reject) => {
    card.charge(111.06)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "S");
        return response;
      })
      .then((response) => {
        response.edit()
          .withPoNumber("9876543210")
          .withTaxType(TaxType.NotUsed)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("026 - level ii response s", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.masterCardManual();

  return new Promise((resolve, reject) => {
    card.charge(111.07)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "S");
        return response;
      })
      .then((response) => {
        response.edit()
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1.00)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("027 - level ii response s", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.masterCardManual();

  return new Promise((resolve, reject) => {
    card.charge(111.08)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "S");
        return response;
      })
      .then((response) => {
        response.edit()
          .withPoNumber("9876543210")
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1.00)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("028 - level ii response s", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.masterCardManual();

  return new Promise((resolve, reject) => {
    card.charge(111.09)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "S");
        return response;
      })
      .then((response) => {
        response.edit()
          .withPoNumber("9876543210")
          .withTaxType(TaxType.TaxExempt)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("029 - level ii no response", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.amexManual();

  return new Promise((resolve, reject) => {
    card.charge(111.10)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "0");
        return response;
      })
      .then((response) => {
        response.edit()
          .withPoNumber("9876543210")
          .withTaxType(TaxType.NotUsed)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("030 - level ii no response", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "750241234";

  const card = TestCards.amexManual();

  return new Promise((resolve, reject) => {
    card.charge(111.11)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "0");
        return response;
      })
      .then((response) => {
        response.edit()
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1.00)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("031 - level ii no response", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.amexManual();

  return new Promise((resolve, reject) => {
    card.charge(111.12)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "0");
        return response;
      })
      .then((response) => {
        response.edit()
          .withPoNumber("9876543210")
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1.00)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("032 - level ii no response", (t) => {
  t.plan(5);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.amexManual();

  return new Promise((resolve, reject) => {
    card.charge(111.13)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.commercialIndicator, "0");
        return response;
      })
      .then((response) => {
        response.edit()
          .withPoNumber("9876543210")
          .withTaxType(TaxType.TaxExempt)
          .execute()
          .then((cpcResponse) => {
            t.truthy(cpcResponse);
            t.is(cpcResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

/// PRIOR / VOICE AUTHORIZATION

test("033 - offline sale", (t) => {
  t.plan(2);

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.charge(17.01)
      .withCurrency("USD")
      .withModifier(TransactionModifier.Offline)
      .withOfflineAuthCode("654321")
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("033 - offline authorization", (t) => {
  t.plan(2);

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.authorize(17.10)
      .withCurrency("USD")
      .withModifier(TransactionModifier.Offline)
      .withOfflineAuthCode("654321")
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// RETURN

test("034 - offline return", (t) => {
  t.plan(2);

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.refund(15.15)
      .withCurrency("USD")
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// ONLINE VOID / REVERSAL

test("035 - void test 10", () => true);

test("036 - void test 20", () => true);

/// ADVANCED FRAUD SCREENING

test.failing("037 - fraud prevention sale", (t) => {
  t.plan(2);

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.charge(15000)
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "FR");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("038 - fraud prevention return", (t) => {
  t.plan(2);

  const card = TestCards.visaManual();

  return new Promise((resolve, reject) => {
    card.refund(15000)
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "41");
        resolve();
      })
      .catch(reject);
  });
});

/// ONE CARD - GSB CARD FUNCTIONS

/// BALANCE INQUIRY

(usePrepaid ? test : test.skip)("037 - balance inquiry gsb", (t) => {
  t.plan(2);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.gsbManual();

  return new Promise((resolve, reject) => {
    card.balanceInquiry()
      .withAddress(address)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// ADD VALUE

(usePrepaid ? test : test.skip)("038 - add value gsb", (t) => {
  t.plan(2);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = new CreditTrackData();
  card.value = "%B6277220572999800^   /                         ^49121010557010000016000000?F;6277220572999800=49121010557010000016?";

  return new Promise((resolve, reject) => {
    card.addValue(15.00)
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// SALE

(usePrepaid ? test : test.skip)("039 - charge gsb", (t) => {
  t.plan(4);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.gsbManual();

  return new Promise((resolve, reject) => {
    card.charge(2.05)
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((response) => {
        response.void()
          .execute()
          .then((voidResponse) => {
            t.truthy(voidResponse);
            t.is(voidResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

(usePrepaid ? test : test.skip)("040 - charge gsb", (t) => {
  t.plan(2);

  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.gsbManual();

  return new Promise((resolve, reject) => {
    card.charge(2.10)
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// ONLINE VOID / REVERSAL

test("041 - void gsb", () => true);

/// HMS GIFT - REWARDS

/// ACTIVATE

test("042 - activate gift 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.activate(6.00)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("043 - activate gift 2", (t) => {
  t.plan(2);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.activate(7.00)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// LOAD / ADD VALUE

test("044 - add value gift 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.addValue(8.00)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("045 - add value gift 2", (t) => {
  t.plan(2);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.addValue(9.00)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// BALANCE INQUIRY

test("046 - balance inquiry gift 1", (t) => {
  t.plan(3);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.balanceInquiry()
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.balanceAmount, "10.00");
        resolve();
      })
      .catch(reject);
  });
});

test("047 - balance inquiry gift 2", (t) => {
  t.plan(3);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.balanceInquiry()
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.balanceAmount, "10.00");
        resolve();
      })
      .catch(reject);
  });
});

/// REPLACE / TRANSFER

test("048 - replace gift 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.replaceWith(TestCards.giftCard2Manual())
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("049 - replace gift 2", (t) => {
  t.plan(2);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.replaceWith(TestCards.giftCard1Swipe())
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// SALE

test("050 - sale gift 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.charge(1.00)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("051 - sale gift 2", (t) => {
  t.plan(2);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.charge(2.00)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("052 - sale gift 1 void", (t) => {
  t.plan(4);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.charge(3.00)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((response) => {
        response.void()
          .execute()
          .then((voidResponse) => {
            t.truthy(voidResponse);
            t.is(voidResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("053 - sale gift 2 void", (t) => {
  t.plan(4);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.charge(4.00)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((response) => {
        response.reverse(4.00)
          .execute()
          .then((reversalResponse) => {
            t.truthy(reversalResponse);
            t.is(reversalResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

/// VOID

test("054 - void gift", () => true);

/// REVERSAL

test("055 - reversal gift", () => true);

test("056 - reversal gift 2", (t) => {
  t.plan(4);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    // setup
    card.charge(2.00)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
      })
      .then(() => {
        // reverse based on card, not transaction id
        card.reverse(2.00)
          .execute()
          .then((response) => {
            t.truthy(response);
            t.is(response.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

/// DEACTIVATE

test("057 - deactivate gift 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.deactivate()
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// RECEIPTS MESSAGING

test("058 - receipts messaging", () => true);

/// REWARD

/// BALANCE INQUIRY

test("059 - balance inquiry rewards 1", (t) => {
  t.plan(3);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.balanceInquiry()
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.pointsBalanceAmount, "0");
        resolve();
      })
      .catch(reject);
  });
});

test("060 - balance inquiry rewards 2", (t) => {
  t.plan(3);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.balanceInquiry()
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        t.is(response.pointsBalanceAmount, "0");
        resolve();
      })
      .catch(reject);
  });
});

/// ALIAS

test("061 - create alias gift 1", (t) => {
  t.plan(1);

  return new Promise((resolve, reject) => {
    GiftCard.create("9725550100")
      .then((response) => {
        t.truthy(response);
        resolve();
      })
      .catch(reject);
  });
});

test("062 - create alias gift 2", (t) => {
  t.plan(1);

  return new Promise((resolve, reject) => {
    GiftCard.create("9725550100")
      .then((response) => {
        t.truthy(response);
        resolve();
      })
      .catch(reject);
  });
});

test("063 - add alias gift 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.addAlias("9725550100")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("064 - add alias gift 2", (t) => {
  t.plan(2);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.addAlias("9725550100")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("065 - delete alias gift 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.removeAlias("9725550100")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// SALE

test("066 - redeem points gift 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.charge(100)
      .withCurrency("points")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("067 - redeem points gift 2", (t) => {
  t.plan(2);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.charge(200)
      .withCurrency("points")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("068 - redeem points gift 2", (t) => {
  t.plan(2);

  const card = new GiftCard();
  card.alias = "9725550100";

  return new Promise((resolve, reject) => {
    card.charge(300)
      .withCurrency("points")
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// REWARDS

test("069 - rewards gift 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.rewards(10)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("070 - rewards gift 2", (t) => {
  t.plan(2);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.rewards(11)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// REPLACE / TRANSFER

test("071 - replace rewards 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.replaceWith(TestCards.giftCard2Manual())
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("072 - replace rewards 2", (t) => {
  t.plan(2);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.replaceWith(TestCards.giftCard1Swipe())
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// DEACTIVATE

test("073 - deactivate rewards 1", (t) => {
  t.plan(2);

  const card = TestCards.giftCard1Swipe();

  return new Promise((resolve, reject) => {
    card.deactivate()
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("074 - deactivate rewards 2", (t) => {
  t.plan(2);

  const card = TestCards.giftCard2Manual();

  return new Promise((resolve, reject) => {
    card.deactivate()
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

/// RECEIPTS MESSAGING

test("075 - receipts messaging", () => true);

test.after("999 - close batch", (t) => {
  t.plan(1);

  return new Promise((resolve, reject) => {
    BatchService.closeBatch()
      .then((response) => {
        t.truthy(response);
        resolve();
      })
      .catch((e: Error) => {
        if (e.message.indexOf(BATCH_NOT_OPEN) !== -1
          || e.message.indexOf(BATCH_EMPTY) !== -1
        ) {
          t.pass();
          resolve();
          return;
        }
        reject(e);
      });
  });
});
