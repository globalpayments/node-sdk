import {
  Address,
  BatchService,
  CreditCardData,
  CreditTrackData,
  EcommerceChannel,
  EcommerceInfo,
  GiftCard,
  PorticoConfig,
  ServicesContainer,
  TaxType,
  TransactionModifier,
} from "../../../../../src";
import { TestCards } from "../../../../Data";

const ecom = new EcommerceInfo();
ecom.channel = EcommerceChannel.Moto;

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";

const BATCH_NOT_OPEN =
  "Transaction was rejected because it requires a batch to be open.";
const BATCH_EMPTY =
  "Batch close was rejected because no transactions are associated with the currently open batch";
const useTokens = false;
const usePrepaid = false;

let visaToken = "";
let mastercardToken = "";
let discoverToken = "";
let amexToken = "";

beforeAll(() => {
  ServicesContainer.configureService(config);
});

beforeAll(() => {
  return new Promise<void>((resolve, reject) => {
    BatchService.closeBatch()
      .then((response) => {
        expect(response).toBeTruthy();
        resolve();
      })
      .catch((e: Error) => {
        if (
          e.message.indexOf(BATCH_NOT_OPEN) !== -1 ||
          e.message.indexOf(BATCH_EMPTY) !== -1
        ) {
          resolve();
          return;
        }
        reject(e);
      });
  });
});

/// CARD VERIFY

/// Account verification

test.failing("001 - verify visa", () => {
  const card = TestCards.visaManual();

  return new Promise<void>((resolve, reject) => {
    card
      .verify()
      .withRequestMultiUseToken(useTokens)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("002 - verify mastercard", () => {
  const card = TestCards.masterCardManual();

  return new Promise<void>((resolve, reject) => {
    card
      .verify()
      .withRequestMultiUseToken(useTokens)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test("003 - verify discover", () => {
  const card = TestCards.discoverManual();
  const address = new Address();
  address.postalCode = "75024";

  return new Promise<void>((resolve, reject) => {
    card
      .verify()
      .withAddress(address)
      .withRequestMultiUseToken(useTokens)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// Address verification

test("004 - verify amex", () => {
  const card = TestCards.amexManual();
  const address = new Address();
  address.postalCode = "75024";

  return new Promise<void>((resolve, reject) => {
    card
      .verify()
      .withAddress(address)
      .withRequestMultiUseToken(useTokens)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// Balance Inquiry (for prepaid cards)

test("005 - balance inquiry visa", () => {
  const card = TestCards.visaSwipe();

  return new Promise<void>((resolve, reject) => {
    card
      .balanceInquiry()
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// CREDIT SALE (for multi-use tokens only)

test("006 - charge visa token", () => {
  const card = TestCards.visaManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  return new Promise<void>((resolve, reject) => {
    card
      .charge()
      .withCurrency("USD")
      .withAmount("13.01")
      .withAddress(address)
      .withRequestMultiUseToken(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.token).toBeTruthy();
        visaToken = response.token;
        resolve();
      })
      .catch(reject);
  });
});

test("007 - charge mastercard token", () => {
  const card = TestCards.masterCardManual();
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  return new Promise<void>((resolve, reject) => {
    card
      .charge()
      .withCurrency("USD")
      .withAmount("13.02")
      .withAddress(address)
      .withRequestMultiUseToken(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.token).toBeTruthy();
        mastercardToken = response.token;
        resolve();
      })
      .catch(reject);
  });
});

test("008 - charge discover token", () => {
  const card = TestCards.discoverManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  return new Promise<void>((resolve, reject) => {
    card
      .charge()
      .withCurrency("USD")
      .withAmount("13.03")
      .withAddress(address)
      .withRequestMultiUseToken(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.token).toBeTruthy();
        discoverToken = response.token;
        resolve();
      })
      .catch(reject);
  });
});

test("009 - charge amex token", () => {
  const card = TestCards.amexManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  return new Promise<void>((resolve, reject) => {
    card
      .charge()
      .withCurrency("USD")
      .withAmount("13.04")
      .withAddress(address)
      .withRequestMultiUseToken(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.token).toBeTruthy();
        amexToken = response.token;
        resolve();
      })
      .catch(reject);
  });
});

/// CREDIT SALE

test("010 - charge visa", () => {
  let card = TestCards.visaManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  if (useTokens) {
    card = new CreditCardData();
    card.token = visaToken;
  }

  return new Promise<void>((resolve) => {
    card
      .charge()
      .withCurrency("USD")
      .withAmount("17.01")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      });
  });
});

test.failing("011 - charge mastercard", () => {
  let card = TestCards.masterCardManual();
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  if (useTokens) {
    card = new CreditCardData();
    card.token = mastercardToken;
  }

  return new Promise<void>((resolve, reject) => {
    card
      .charge()
      .withCurrency("USD")
      .withAmount("17.02")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("012 - charge discover", () => {
  let card = TestCards.discoverManual();
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "750241234";

  if (useTokens) {
    card = new CreditCardData();
    card.token = discoverToken;
  }

  return new Promise<void>((resolve, reject) => {
    card
      .charge()
      .withCurrency("USD")
      .withAmount("17.03")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("013 - charge amex", () => {
  let card = TestCards.amexManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  if (useTokens) {
    card = new CreditCardData();
    card.token = amexToken;
  }

  return new Promise<void>((resolve, reject) => {
    card
      .charge()
      .withCurrency("USD")
      .withAmount("17.04")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("014 - charge jcb", () => {
  const card = TestCards.jcbManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  return new Promise<void>((resolve, reject) => {
    card
      .charge()
      .withCurrency("USD")
      .withAmount("17.04")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// AUTHORIZATION

test.failing("015 - authorization visa", () => {
  // test 015a Authorization
  const card = TestCards.visaManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "75024";

  return new Promise<void>((resolve) => {
    card
      .authorize("17.06")
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      });
  });
});

test.failing("016 - authorization mastercard", () => {
  // test 016a Authorization
  const card = TestCards.masterCardManual();
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "750241234";

  return new Promise<void>((resolve) => {
    card
      .authorize("17.07")
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      });
  });
});

test.failing("017 - authorization discover", () => {
  // test 017a Authorization
  const card = TestCards.discoverManual();
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  return new Promise<void>((resolve, reject) => {
    card
      .authorize("17.08")
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      .then(() => {
        // test 017b Capture/AddToBatch
        // do not capture
        resolve();
      })
      .catch(reject);
  });
});

/// PARTIALLY APPROVED SALE

test.failing("018 - partial approval visa", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.visaManual();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(130)
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowPartialAuth(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("10");
        expect(response.authorizedAmount).toBeTruthy();
        expect(response.authorizedAmount).toBe("110.00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("019 - partial approval discover", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.discoverManual();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(145)
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowPartialAuth(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("10");
        expect(response.authorizedAmount).toBeTruthy();
        expect(response.authorizedAmount).toBe("65.00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("020 - partial approval mastercard", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.masterCardManual();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(155)
      .withCurrency("USD")
      .withAddress(address)
      .withInvoiceNumber("123456")
      .withAllowPartialAuth(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("10");
        expect(response.authorizedAmount).toBeTruthy();
        expect(response.authorizedAmount).toBe("100.00");
        resolve();
      })
      .catch(reject);
  });
});

/// LEVEL II CORPORATE PURCHASE CARD

test.failing("021 - level ii response b", () => {
  const address = new Address();
  address.streetAddress1 = "6860 Dallas Pkwy";
  address.postalCode = "750241234";

  const card = TestCards.visaManual();

  return new Promise<void>((resolve) => {
    card
      .charge(112.34)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("B");
        resolve();
      });
  });
});

test.failing("022 - level ii response b", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "750241234";

  const card = TestCards.visaManual();

  return new Promise<void>((resolve) => {
    card
      .charge(112.34)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("B");
        resolve();
      });
  });
});

test.failing("023 - level ii response r", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.visaManual();

  return new Promise<void>((resolve) => {
    card
      .charge(123.45)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("R");
        resolve();
      });
  });
});

test.failing("024 - level ii response s", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.visaManual();

  return new Promise<void>((resolve) => {
    card
      .charge(134.56)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("S");
        resolve();
      });
  });
});

test.failing("025 - level ii response s", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.masterCardManual();

  return new Promise<void>((resolve) => {
    card
      .charge(111.06)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("S");
        resolve();
      });
  });
});

test.failing("026 - level ii response s", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.masterCardManual();

  return new Promise<void>((resolve) => {
    card
      .charge(111.07)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("S");
        resolve();
      });
  });
});

test.failing("027 - level ii response s", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.masterCardManual();

  return new Promise<void>((resolve) => {
    card
      .charge(111.08)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("S");
        resolve();
      });
  });
});

test.failing("028 - level ii response s", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.masterCardManual();

  return new Promise<void>((resolve) => {
    card
      .charge(111.09)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("S");
        resolve();
      });
  });
});

test.failing("029 - level ii no response", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.amexManual();

  return new Promise<void>((resolve) => {
    card
      .charge(111.1)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("0");
        resolve();
      });
  });
});

test.failing("030 - level ii no response", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "750241234";

  const card = TestCards.amexManual();

  return new Promise<void>((resolve) => {
    card
      .charge(111.11)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("0");
        resolve();
      });
  });
});

test.failing("031 - level ii no response", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.amexManual();

  return new Promise<void>((resolve) => {
    card
      .charge(111.12)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("0");
        resolve();
      });
  });
});

test.failing("032 - level ii no response", () => {
  const address = new Address();
  address.streetAddress1 = "6860";
  address.postalCode = "75024";

  const card = TestCards.amexManual();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(111.13)
      .withCurrency("USD")
      .withAddress(address)
      .withCommercialRequest(true)
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.commercialIndicator).toBe("0");
        return response;
      })
      .then((response) => {
        response
          .edit()
          .withPoNumber("9876543210")
          .withTaxType(TaxType.TaxExempt)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

/// PRIOR / VOICE AUTHORIZATION

test.failing("033 - offline sale", () => {
  const card = TestCards.visaManual();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(17.01)
      .withCurrency("USD")
      .withModifier(TransactionModifier.Offline)
      .withOfflineAuthCode("654321")
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("033 - offline authorization", () => {
  const card = TestCards.visaManual();

  return new Promise<void>((resolve, reject) => {
    card
      .authorize(17.1)
      .withCurrency("USD")
      .withModifier(TransactionModifier.Offline)
      .withOfflineAuthCode("654321")
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// RETURN

test.failing("034 - offline return", () => {
  const card = TestCards.visaManual();

  return new Promise<void>((resolve, reject) => {
    card
      .refund(15.15)
      .withCurrency("USD")
      .withInvoiceNumber("123456")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// ONLINE VOID / REVERSAL

/// ADVANCED FRAUD SCREENING

test.failing("037 - fraud prevention sale", () => {
  const card = TestCards.visaManual();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(15000)
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("FR");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("038 - fraud prevention return", () => {
  const card = TestCards.visaManual();

  return new Promise<void>((resolve, reject) => {
    card
      .refund(15000)
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .withEcommerceInfo(ecom)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("41");
        resolve();
      })
      .catch(reject);
  });
});

/// ONE CARD - GSB CARD FUNCTIONS

/// BALANCE INQUIRY

describe("037 - balance inquiry gsb", () => {
  (usePrepaid ? test : test.skip)("037 - balance inquiry gsb", () => {
    const address = new Address();
    address.streetAddress1 = "6860";
    address.postalCode = "75024";

    const card = TestCards.gsbManual();

    return new Promise<void>((resolve, reject) => {
      card
        .balanceInquiry()
        .withAddress(address)
        .execute()
        .then((response) => {
          expect(response).toBeTruthy();
          expect(response.responseCode).toBe("00");
          resolve();
        })
        .catch(reject);
    });
  });
});

/// ADD VALUE

describe("038 - add value gsb", () => {
  (usePrepaid ? test : test.skip)("038 - add value gsb", () => {
    const address = new Address();
    address.streetAddress1 = "6860";
    address.postalCode = "75024";

    const card = new CreditTrackData();
    card.value =
      "%B6277220572999800^/^49121010557010000016000000?F;6277220572999800=49121010557010000016?";

    return new Promise<void>((resolve, reject) => {
      card
        .addValue(15.0)
        .withCurrency("USD")
        .withAllowDuplicates(true)
        .withEcommerceInfo(ecom)
        .execute()
        .then((response) => {
          expect(response).toBeTruthy();
          expect(response.responseCode).toBe("00");
          resolve();
        })
        .catch(reject);
    });
  });
});

/// SALE
describe("039 - charge gsb", () => {
  (usePrepaid ? test : test.skip)("039 - charge gsb", () => {
    const address = new Address();
    address.streetAddress1 = "6860";
    address.postalCode = "75024";

    const card = TestCards.gsbManual();

    return new Promise<void>((resolve, reject) => {
      card
        .charge(2.05)
        .withCurrency("USD")
        .withAddress(address)
        .withInvoiceNumber("123456")
        .withAllowDuplicates(true)
        .withEcommerceInfo(ecom)
        .execute()
        .then((response) => {
          expect(response).toBeTruthy();
          expect(response.responseCode).toBe("00");
          return response;
        })
        .then((response) => {
          response
            .void()
            .execute()
            .then((voidResponse) => {
              expect(voidResponse).toBeTruthy();
              expect(voidResponse.responseCode).toBe("00");
              resolve();
            })
            .catch(reject);
        })
        .catch(reject);
    });
  });
});

describe("040 - charge gsb", () => {
  (usePrepaid ? test : test.skip)("040 - charge gsb", () => {
    const address = new Address();
    address.streetAddress1 = "6860";
    address.postalCode = "75024";

    const card = TestCards.gsbManual();

    return new Promise<void>((resolve, reject) => {
      card
        .charge(2.1)
        .withCurrency("USD")
        .withAddress(address)
        .withInvoiceNumber("123456")
        .withAllowDuplicates(true)
        .withEcommerceInfo(ecom)
        .execute()
        .then((response) => {
          expect(response).toBeTruthy();
          expect(response.responseCode).toBe("00");
          resolve();
        })
        .catch(reject);
    });
  });
});

/// ONLINE VOID / REVERSAL

/// HMS GIFT - REWARDS

/// ACTIVATE

test.failing("042 - activate gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .activate(6.0)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("043 - activate gift 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .activate(7.0)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// LOAD / ADD VALUE

test.failing("044 - add value gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .addValue(8.0)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("045 - add value gift 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .addValue(9.0)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// BALANCE INQUIRY

test.failing("046 - balance inquiry gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .balanceInquiry()
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.balanceAmount).toBe("10.00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("047 - balance inquiry gift 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .balanceInquiry()
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.balanceAmount).toBe("10.00");
        resolve();
      })
      .catch(reject);
  });
});

/// REPLACE / TRANSFER

test.failing("048 - replace gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .replaceWith(TestCards.giftCard2Manual())
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("049 - replace gift 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .replaceWith(TestCards.giftCard1Swipe())
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// SALE

test.failing("050 - sale gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(1.0)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("051 - sale gift 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(2.0)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("052 - sale gift 1 void", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(3.0)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      .then((response) => {
        response
          .void()
          .execute()
          .then((voidResponse) => {
            expect(voidResponse).toBeTruthy();
            expect(voidResponse.responseCode).toBe("00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test.failing("053 - sale gift 2 void", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(4.0)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      .then((response) => {
        response
          .reverse(4.0)
          .execute()
          .then((reversalResponse) => {
            expect(reversalResponse).toBeTruthy();
            expect(reversalResponse.responseCode).toBe("00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

/// VOID

// /// REVERSAL

test.failing("056 - reversal gift 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    // setup
    card
      .charge(2.0)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
      })
      .then(() => {
        // reverse based on card, not transaction id
        card
          .reverse(2.0)
          .execute()
          .then((response) => {
            expect(response).toBeTruthy();
            expect(response.responseCode).toBe("00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

/// DEACTIVATE

test.failing("057 - deactivate gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .deactivate()
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// RECEIPTS MESSAGING

/// REWARD

/// BALANCE INQUIRY

test.failing("059 - balance inquiry rewards 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .balanceInquiry()
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.pointsBalanceAmount > "0").toBeTruthy();
        resolve();
      })
      .catch(reject);
  });
});

test.failing("060 - balance inquiry rewards 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .balanceInquiry()
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        expect(response.pointsBalanceAmount > "0").toBeTruthy();
        resolve();
      })
      .catch(reject);
  });
});

/// ALIAS

test.failing("061 - create alias gift 1", () => {
  return new Promise<void>((resolve, reject) => {
    GiftCard.create("9725550100")
      .then((response) => {
        expect(response).toBeTruthy();
        resolve();
      })
      .catch(reject);
  });
});

test.failing("062 - create alias gift 2", () => {
  return new Promise<void>((resolve, reject) => {
    GiftCard.create("9725550100")
      .then((response) => {
        expect(response).toBeTruthy();
        resolve();
      })
      .catch(reject);
  });
});

test.failing("063 - add alias gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .addAlias("9725550100")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("064 - add alias gift 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .addAlias("9725550100")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("065 - delete alias gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .removeAlias("9725550100")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// SALE

test.failing("066 - redeem points gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(100)
      .withCurrency("points")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("067 - redeem points gift 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .charge(200)
      .withCurrency("points")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("068 - redeem points gift 2", () => {
  const card = new GiftCard();
  card.alias = "9725550100";

  return new Promise<void>((resolve, reject) => {
    card
      .charge(300)
      .withCurrency("points")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// REWARDS

test.failing("069 - rewards gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .rewards(10)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("070 - rewards gift 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .rewards(11)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// REPLACE / TRANSFER

test.failing("071 - replace rewards 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .replaceWith(TestCards.giftCard2Manual())
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("072 - replace rewards 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .replaceWith(TestCards.giftCard1Swipe())
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// DEACTIVATE

test.failing("073 - deactivate rewards 1", () => {
  const card = TestCards.giftCard1Swipe();

  return new Promise<void>((resolve, reject) => {
    card
      .deactivate()
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

test.failing("074 - deactivate rewards 2", () => {
  const card = TestCards.giftCard2Manual();

  return new Promise<void>((resolve, reject) => {
    card
      .deactivate()
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        resolve();
      })
      .catch(reject);
  });
});

/// RECEIPTS MESSAGING;

afterAll(() => {
  return new Promise<void>((resolve, reject) => {
    BatchService.closeBatch()
      .then((response) => {
        expect(response).toBeTruthy();
        resolve();
      })
      .catch((e: Error) => {
        if (
          e.message.indexOf(BATCH_NOT_OPEN) !== -1 ||
          e.message.indexOf(BATCH_EMPTY) !== -1
        ) {
          resolve();
          return;
        }
        reject(e);
      });
  });
});
