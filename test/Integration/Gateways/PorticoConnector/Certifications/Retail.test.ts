import {
  Address,
  BatchService,
  CreditCardData,
  EntryMethod,
  GiftCard,
  InquiryType,
  PorticoConfig,
  ServicesContainer,
  TaxType,
} from "../../../../../src";
import { TestCards } from "../../../../Data";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MaePAQBr-1QAqjfckFC8FTbRTT120bVQUlfVOjgCBw";

const BATCH_NOT_OPEN =
  "Transaction was rejected because it requires a batch to be open.";
const BATCH_EMPTY =
  "Batch close was rejected because no transactions are associated with the currently open batch";

const useTokens = false;
let visaToken = "";
let masterCardToken = "";
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

/// CREDIT CARD FUNCTIONS
/// CARD VERIFY
/// ACCOUNT VERIFICATION

test("001 - card verify visa", () => {
  const card = TestCards.visaSwipeEncrypted();

  return card
    .verify()
    .withAllowDuplicates(true)
    .withRequestMultiUseToken(useTokens)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      if (!useTokens) {
        expect.assertions(2);
        return;
      }

      expect(response.token).toBeTruthy();

      const token = new CreditCardData();
      token.token = response.token;

      return token
        .charge(15.01)
        .withAllowDuplicates(true)
        .execute()
        .then((chargeResponse) => {
          expect(chargeResponse).toBeTruthy();
          expect(chargeResponse.responseCode).toBe("00");
        });
    });
});

test("002 - card verify mastercard", () => {
  const card = TestCards.masterCardSwipeEncrypted();

  return card
    .verify()
    .withAllowDuplicates(true)
    .withRequestMultiUseToken(useTokens)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      if (!useTokens) {
        expect.assertions(2);
        return;
      }

      expect(response.token).toBeTruthy();

      const token = new CreditCardData();
      token.token = response.token;

      return token
        .charge(15.02)
        .withAllowDuplicates(true)
        .execute()
        .then((chargeResponse) => {
          expect(chargeResponse).toBeTruthy();
          expect(chargeResponse.responseCode).toBe("00");
        });
    });
});

test("003 - card verify discover", () => {
  const card = TestCards.discoverSwipeEncrypted();

  return card
    .verify()
    .withAllowDuplicates(true)
    .withRequestMultiUseToken(useTokens)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      if (!useTokens) {
        expect.assertions(2);
        return;
      }

      expect(response.token).toBeTruthy();

      const token = new CreditCardData();
      token.token = response.token;

      return token
        .charge(15.03)
        .withAllowDuplicates(true)
        .execute()
        .then((chargeResponse) => {
          expect(chargeResponse).toBeTruthy();
          expect(chargeResponse.responseCode).toBe("00");
        });
    });
});

/// Address Verification

test("004 - card verify amex", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.amexManual(false, true);

  return card
    .verify()
    .withAllowDuplicates(true)
    .withAddress(address)
    .withRequestMultiUseToken(useTokens)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      if (!useTokens) {
        return;
      }

      expect(response.token).toBeTruthy();

      const token = new CreditCardData();
      token.token = response.token;

      return token
        .charge(15.04)
        .withAllowDuplicates(true)
        .execute()
        .then((chargeResponse) => {
          expect(chargeResponse).toBeTruthy();
          expect(chargeResponse.responseCode).toBe("00");
        });
    });
});

/// Balance Inquiry (for Prepaid)

test("005 - balance inquiry visa", () => {
  const card = TestCards.visaSwipeEncrypted();

  return card
    .balanceInquiry()
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// CREDIT SALE (for multi-use token only)

test("006 - charge visa swipe token", () => {
  const card = TestCards.visaSwipe();

  return card
    .charge(15.01)
    .withCurrency("USD")
    .withRequestMultiUseToken(true)
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      visaToken = response.token;
    });
});

test("007 - charge mastercard swipe token", () => {
  const card = TestCards.masterCardSwipe();

  return card
    .charge(15.02)
    .withCurrency("USD")
    .withRequestMultiUseToken(true)
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      masterCardToken = response.token;
    });
});

test("008 - charge discover swipe token", () => {
  const card = TestCards.discoverSwipe();

  return card
    .charge(15.03)
    .withCurrency("USD")
    .withRequestMultiUseToken(true)
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      discoverToken = response.token;
    });
});

test("009 - charge amex swipe token", () => {
  const card = TestCards.amexSwipe();

  return card
    .charge(15.04)
    .withCurrency("USD")
    .withRequestMultiUseToken(true)
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      amexToken = response.token;
    });
});

/// CREDIT SALE
/// SWIPED

test.skip("010 - charge visa swipe", () => {
  const card = TestCards.visaSwipe();

  return card
    .charge(15.01)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      // test 059
      return (
        response
          .reverse(15.01)
          // .withAllowDuplicates(true)
          .execute()
          .then((reverseResponse) => {
            expect(reverseResponse).toBeTruthy();
            expect(reverseResponse.responseCode).toBe("00");
          })
      );
    });
});

test("011 - charge mastercard swipe", () => {
  const card = TestCards.masterCardSwipe();

  return card
    .charge(15.02)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("012 - charge discover swipe", () => {
  const card = TestCards.discoverSwipe();

  return card
    .charge(15.02)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("013 - charge amex swipe", () => {
  const card = TestCards.amexSwipe();

  return card
    .charge(15.02)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test.skip("014 - charge jcb swipe", () => {
  const card = TestCards.visaSwipe();

  return card
    .charge(15.05)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      // test 058
      return (
        response
          .refund(15.05)
          // .withAllowDuplicates(true)
          .withCurrency("USD")
          .execute()
          .then((refundResponse) => {
            expect(refundResponse).toBeTruthy();
            expect(refundResponse.responseCode).toBe("00");
          })
      );
    });
});

test("014a - charge mastercard 24 swipe", () => {
  const card = TestCards.masterCard24Swipe();

  return card
    .charge(15.34)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("014b - charge mastercard 25 swipe", () => {
  const card = TestCards.masterCard25Swipe();

  return card
    .charge(15.34)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test.skip("015 - charge visa swipe", () => {
  const card = TestCards.visaSwipe();

  return card
    .charge(15.06)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      // test 063
      return (
        response
          .reverse(15.06)
          // .withAllowDuplicates(true)
          .withAuthAmount(5.06)
          .execute()
          .then((reverseResponse) => {
            expect(reverseResponse).toBeTruthy();
            expect(reverseResponse.responseCode).toBe("00");
          })
      );
    });
});

/// Manually Entered - Card Present

test("016 - charge visa manual card present", () => {
  const address = new Address();
  address.postalCode = "750241234";
  address.streetAddress1 = "6860 Dallas Pkwy";

  const card = TestCards.visaManual(true, true);

  return card
    .charge(16.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test.skip("017 - charge mastercard manual card present", () => {
  const address = new Address();
  address.postalCode = "75024";
  address.streetAddress1 = "6860 Dallas Pkwy";

  const card = TestCards.masterCardManual(true, true);

  return card
    .charge(16.02)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      // test case 60
      return (
        response
          .reverse(16.02)
          // .withAllowDuplicates(true)
          .execute()
          .then((reverseResponse) => {
            expect(reverseResponse).toBeTruthy();
            expect(reverseResponse.responseCode).toBe("00");
          })
      );
    });
});

test("018 - charge discover manual card present", () => {
  const address = new Address();
  address.postalCode = "750241234";

  const card = TestCards.discoverManual(true, true);

  return card
    .charge(16.03)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("019 - charge amex manual card present", () => {
  const address = new Address();
  address.postalCode = "75024";
  address.streetAddress1 = "6860";

  const card = TestCards.amexManual(true, true);

  return card
    .charge(16.04)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("020 - charge jcb manual card present", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.jcbManual(true, true);

  return card
    .charge(16.05)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test.skip("021 - charge discover manual card present", () => {
  const address = new Address();
  address.postalCode = "750241234";
  address.streetAddress1 = "6860 Dallas Pkwy";

  const card = TestCards.discoverManual(true, true);

  return card
    .charge(16.07)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      // test case 64
      return (
        response
          .reverse(16.07)
          // .withAllowDuplicates(true)
          .withAuthAmount(6.07)
          .execute()
          .then((reverseResponse) => {
            expect(reverseResponse).toBeTruthy();
            expect(reverseResponse.responseCode).toBe("00");
          })
      );
    });
});

/// Manually Entered - Card Not Present

test("022 - charge visa manual card not present", () => {
  const address = new Address();
  address.postalCode = "750241234";
  address.streetAddress1 = "6860 Dallas Pkwy";

  let card: CreditCardData;
  if (useTokens) {
    card = new CreditCardData();
    card.token = visaToken;
  } else {
    card = TestCards.visaManual(false, true);
  }

  return card
    .charge(17.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test.skip("023 - charge mastercard manual card not present", () => {
  const address = new Address();
  address.postalCode = "75024";
  address.streetAddress1 = "6860 Dallas Pkwy";

  let card: CreditCardData;
  if (useTokens) {
    card = new CreditCardData();
    card.token = masterCardToken;
  } else {
    card = TestCards.masterCardManual(false, true);
  }

  return card
    .charge(17.02)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      // test case 61
      return (
        response
          .reverse(17.02)
          // .withAllowDuplicates(true)
          .execute()
          .then((reverseResponse) => {
            expect(reverseResponse).toBeTruthy();
            expect(reverseResponse.responseCode).toBe("00");
          })
      );
    });
});

test("024 - charge discover manual card not present", () => {
  const address = new Address();
  address.postalCode = "750241234";

  let card: CreditCardData;
  if (useTokens) {
    card = new CreditCardData();
    card.token = discoverToken;
  } else {
    card = TestCards.discoverManual(false, true);
  }

  return card
    .charge(17.03)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("025 - charge amex manual card not present", () => {
  const address = new Address();
  address.postalCode = "75024";
  address.streetAddress1 = "6860";

  let card: CreditCardData;
  if (useTokens) {
    card = new CreditCardData();
    card.token = amexToken;
  } else {
    card = TestCards.amexManual(false, true);
  }

  return card
    .charge(17.04)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("026 - charge jcb manual card not present", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.jcbManual(false, true);

  return card
    .charge(17.05)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// Contactless

test("027 - charge visa contactless", () => {
  const card = TestCards.visaSwipe(EntryMethod.Proximity);

  return card
    .charge(18.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("028 - charge mastercard contactless", () => {
  const card = TestCards.masterCardSwipe(EntryMethod.Proximity);

  return card
    .charge(18.02)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("029 - charge discover contactless", () => {
  const card = TestCards.discoverSwipe(EntryMethod.Proximity);

  return card
    .charge(18.03)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("030 - charge amex contactless", () => {
  const card = TestCards.amexSwipe(EntryMethod.Proximity);

  return card
    .charge(18.04)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// AUTHORIZATION

test.skip("031 - authorize visa swipe", () => {
  const card = TestCards.visaSwipe();

  // 031a authorize
  return (
    card
      .authorize(15.08)
      .withAllowDuplicates(true)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      // 031b capture
      .then((response) => {
        return response
          .capture()
          .execute()
          .then((captureResponse) => {
            expect(captureResponse).toBeTruthy();
            expect(captureResponse.responseCode).toBe("00");
          });
      })
  );
});

test.skip("032 - authorize visa swipe additional auth", () => {
  const card = TestCards.visaSwipe();

  // 032a authorize
  return (
    card
      .authorize(15.09)
      .withAllowDuplicates(true)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      // 032b Additional Auth (restaurant only)
      // 032c Add to batch
      .then((response) => {
        return response
          .capture()
          .execute()
          .then((captureResponse) => {
            expect(captureResponse).toBeTruthy();
            expect(captureResponse.responseCode).toBe("00");
          });
      })
  );
});

test.skip("033 - authorize mastercard swipe", () => {
  const card = TestCards.masterCardSwipe();

  // 033a authorize
  return (
    card
      .authorize(15.1)
      .withAllowDuplicates(true)
      .withCurrency("USD")
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      // 033b capture
      .then((response) => {
        return response
          .capture()
          .execute()
          .then((captureResponse) => {
            expect(captureResponse).toBeTruthy();
            expect(captureResponse.responseCode).toBe("00");
          });
      })
  );
});

test("033a - authorize discover swipe", () => {
  const card = TestCards.discoverSwipe();

  return card
    .authorize(15.1)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// AUTHORIZATION - Manually Entered, Card Present

test.skip("034 - authorize visa manual card present", () => {
  const address = new Address();
  address.postalCode = "75024";
  address.streetAddress1 = "6860 Dallas Pkwy";

  const card = TestCards.visaManual(true, true);

  // 034a authorize
  return (
    card
      .authorize(16.08)
      .withAllowDuplicates(true)
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      // 034b capture
      .then((response) => {
        return response
          .capture()
          .execute()
          .then((captureResponse) => {
            expect(captureResponse).toBeTruthy();
            expect(captureResponse.responseCode).toBe("00");
          });
      })
  );
});

test.skip("035 - authorize visa manual card present additional auth", () => {
  const address = new Address();
  address.postalCode = "75024";
  address.streetAddress1 = "6860 Dallas Pkwy";

  const card = TestCards.visaManual(true, true);

  // 035a authorize
  return (
    card
      .authorize(16.09)
      .withAllowDuplicates(true)
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      // 035b Additional Auth (restaurant only)
      // 035c Add to batch
      .then((response) => {
        return response
          .capture()
          .execute()
          .then((captureResponse) => {
            expect(captureResponse).toBeTruthy();
            expect(captureResponse.responseCode).toBe("00");
          });
      })
  );
});

test.skip("036 - authorize mastercard manual card present", () => {
  const address = new Address();
  address.postalCode = "75024";
  address.streetAddress1 = "6860 Dallas Pkwy";

  const card = TestCards.masterCardManual(true, true);

  // 036a authorize
  return (
    card
      .authorize(16.1)
      .withAllowDuplicates(true)
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      // 036b capture
      .then((response) => {
        return response
          .capture()
          .execute()
          .then((captureResponse) => {
            expect(captureResponse).toBeTruthy();
            expect(captureResponse.responseCode).toBe("00");
          });
      })
  );
});

test("036a - authorize discover manual card present", () => {
  const address = new Address();
  address.postalCode = "750241234";

  const card = TestCards.discoverManual(true, true);

  return card
    .authorize(16.1)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// AUTHORIZATION - Manually Entered, Card Not Present

test.skip("037 - authorize visa manual", () => {
  const address = new Address();
  address.postalCode = "750241234";
  address.streetAddress1 = "6860 Dallas Pkwy";

  const card = TestCards.visaManual(false, true);

  // 034a authorize
  return (
    card
      .authorize(17.08)
      .withAllowDuplicates(true)
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      // 034b capture
      .then((response) => {
        return response
          .capture()
          .execute()
          .then((captureResponse) => {
            expect(captureResponse).toBeTruthy();
            expect(captureResponse.responseCode).toBe("00");
          });
      })
  );
});

test.skip("038 - authorize mastercard manual", () => {
  const address = new Address();
  address.postalCode = "750241234";
  address.streetAddress1 = "6860";

  const card = TestCards.masterCardManual(false, true);

  // 036a authorize
  return (
    card
      .authorize(17.09)
      .withAllowDuplicates(true)
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("00");
        return response;
      })
      // 036b capture
      .then((response) => {
        return response
          .capture()
          .execute()
          .then((captureResponse) => {
            expect(captureResponse).toBeTruthy();
            expect(captureResponse.responseCode).toBe("00");
          });
      })
  );
});

test("038a - authorize discover manual", () => {
  const address = new Address();
  address.postalCode = "750241234";

  const card = TestCards.discoverManual(false, true);

  return card
    .authorize(17.1)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// PARTIALLY APPROVED SALE (Required)

test("039 - charge discover swipe partial approval", () => {
  const card = TestCards.discoverSwipe();

  return card
    .charge(40.0)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAllowPartialAuth(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("10");
      expect(response.authorizedAmount).toBe("40.00");
    });
});

test("040 - charge visa swipe partial approval", () => {
  const card = TestCards.visaSwipe();

  return card
    .charge(130.0)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAllowPartialAuth(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("10");
      expect(response.authorizedAmount).toBe("110.00");
    });
});

test("041 - charge discover manual partial approval", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.discoverManual(true, true);

  return card
    .charge(145.0)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAllowPartialAuth(true)
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("10");
      expect(response.authorizedAmount).toBe("65.00");
    });
});

test.skip("042 - charge mastercard swipe partial approval", () => {
  const card = TestCards.masterCardSwipe();

  return (
    card
      .charge(155.0)
      .withAllowDuplicates(true)
      .withCurrency("USD")
      .withAllowPartialAuth(true)
      .execute()
      .then((response) => {
        expect(response).toBeTruthy();
        expect(response.responseCode).toBe("10");
        expect(response.authorizedAmount).toBe("100.00");
        return response;
      })
      // test case 62
      .then((response) => {
        return (
          response
            .reverse(100.0)
            // .withAllowDuplicates(true)
            .execute()
            .then((reverseResponse) => {
              expect(reverseResponse).toBeTruthy();
              expect(reverseResponse.responseCode).toBe("00");
            })
        );
      })
  );
});

/// SALE WITH GRATUITY
/// Tip Edit (Tip at Settlement)

test.skip("043 - charge visa swipe edit gratuity", () => {
  const card = TestCards.visaSwipe();

  return card
    .charge(15.12)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withAmount(18.12)
          .withGratuity(3.0)
          .execute()
          .then((editResponse) => {
            expect(editResponse).toBeTruthy();
            expect(editResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("044 - charge mastercard manual edit gratuity", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.masterCardManual(true, true);
  return card
    .charge(15.13)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withAmount(18.13)
          .withGratuity(3.0)
          .execute()
          .then((editResponse) => {
            expect(editResponse).toBeTruthy();
            expect(editResponse.responseCode).toBe("00");
          })
      );
    });
});

/// Tip on Purchase

test("045 - charge visa manual gratuity", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.visaManual(true, true);

  return card
    .charge(18.61)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .withGratuity(3.5)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test.skip("046 - charge mastercard swipe gratuity", () => {
  const card = TestCards.masterCardSwipe();

  return card
    .charge(18.62)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withGratuity(3.5)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withAmount(18.12)
          .withGratuity(3.0)
          .execute()
          .then((editResponse) => {
            expect(editResponse).toBeTruthy();
            expect(editResponse.responseCode).toBe("00");
          })
      );
    });
});

/// LEVEL II CORPORATE PURCHASE CARD

test.skip("047 - level ii visa swipe response b", () => {
  const card = TestCards.visaSwipe();

  return card
    .charge(112.34)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("B");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("047a - level ii visa swipe response b", () => {
  const card = TestCards.visaSwipe();

  return card
    .charge(112.34)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("B");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withTaxType(TaxType.NotUsed)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("048 - level ii visa swipe response r", () => {
  const card = TestCards.visaSwipe();

  return card
    .charge(123.45)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("R");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withTaxType(TaxType.TaxExempt)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("049 - level ii visa manual response s", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.visaManual(true, true);

  return card
    .charge(134.56)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("S");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withPoNumber("9876543210")
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("050 - level ii mastercard swipe response s", () => {
  const card = TestCards.masterCardSwipe();

  return card
    .charge(111.06)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("S");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withPoNumber("9876543210")
          .withTaxType(TaxType.NotUsed)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("051 - level ii mastercard manual response s", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.masterCardManual(true, true);

  return card
    .charge(111.07)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("S");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withPoNumber("9876543210")
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("051a - level ii mastercard manual response s", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.masterCardManual(true, true);

  return card
    .charge(111.08)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("S");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withPoNumber("9876543210")
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("052 - level ii mastercard manual response s", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.masterCardManual(true, true);

  return card
    .charge(111.09)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("S");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withPoNumber("9876543210")
          .withTaxType(TaxType.TaxExempt)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("053 - level ii amex swipe no response", () => {
  const card = TestCards.amexSwipe();

  return card
    .charge(111.1)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("0");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withTaxType(TaxType.SalesTax)
          .withTaxAmount(1)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("054 - level ii amex manual no response", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.amexManual(true, true);

  return card
    .charge(111.11)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("0");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withPoNumber("9876543210")
          .withTaxType(TaxType.NotUsed)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("055 - level ii amex manual no response", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.amexManual(true, true);

  return card
    .charge(111.12)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("0");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withPoNumber("9876543210")
          .withTaxType(TaxType.NotUsed)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

test.skip("055a - level ii amex manual no response", () => {
  const address = new Address();
  address.postalCode = "75024";

  const card = TestCards.amexManual(true, true);
  return card
    .charge(111.13)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAddress(address)
    .withCommercialRequest(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.commercialIndicator).toBe("0");
      return response;
    })
    .then((response) => {
      return (
        response
          .edit()
          // .withAllowDuplicates(true)
          .withPoNumber("9876543210")
          .withTaxType(TaxType.TaxExempt)
          .execute()
          .then((cpcResponse) => {
            expect(cpcResponse).toBeTruthy();
            expect(cpcResponse.responseCode).toBe("00");
          })
      );
    });
});

/// OFFLINE SALE / AUTHORIZATION

test("056 - offline charge visa manual", () => {
  const card = TestCards.visaManual(false, true);

  return card
    .charge(15.12)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withOfflineAuthCode("654321")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("056 - offline auth visa manual", () => {
  const card = TestCards.visaManual(false, true);

  return card
    .authorize(15.11)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withOfflineAuthCode("654321")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// RETURN

test("057 - return mastercard", () => {
  const card = TestCards.masterCardManual(false, true);

  return card
    .refund(15.11)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("057a - return mastercard swipe", () => {
  const card = TestCards.masterCardSwipe();

  return card
    .refund(15.15)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

// test("058 - return jcb transaction id", () => {
//   // see test 14
// });

/// ONLINE VOID / REVERSAL (Required)

// test("059 - reversal visa", () => {
//   // see test 10
// });

// test("060 - reversal mastercard", () => {
//   // see test case 17
// });

// test("061 - reversal mastercard", () => {
//   // see test case 23
// });

// test("062 - reversal mastercard", () => {
//   // see test case 42
// });

// test("063 - reversal visa partial", () => {
//   // see test case 15
// });

// test("064 - reversal discover partial", () => {
//   // see test 21
// });

/// PIN DEBIT CARD FUNCTIONS

test("065 - debit sale visa swipe", () => {
  const card = TestCards.asDebit(
    TestCards.visaSwipe(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(14.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("066 - debit sale mastercard swipe", () => {
  const card = TestCards.asDebit(
    TestCards.masterCardSwipe(),
    "F505AD81659AA42A3D123412324000AB",
  );

  return card
    .charge(14.02)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then(() => {
      // test case 71
      return (
        card
          .reverse(14.02)
          // .withAllowDuplicates(true)
          .execute()
          .then((reverseResponse) => {
            expect(reverseResponse).toBeTruthy();
            expect(reverseResponse.responseCode).toBe("00");
          })
      );
    });
});

test("067 - debit sale visa swipe cashback", () => {
  const card = TestCards.asDebit(
    TestCards.visaSwipe(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(14.03)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCashBack(5.0)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("067a - debit sale mastercard", () => {
  const card = TestCards.asDebit(
    TestCards.masterCardSwipe(),
    "F505AD81659AA42A3D123412324000AB",
  );

  return card
    .charge(14.04)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// PARTIALLY APPROVED PURCHASE

test("068 - debit sale mastercard partial approval", () => {
  const card = TestCards.asDebit(
    TestCards.masterCardSwipe(),
    "F505AD81659AA42A3D123412324000AB",
  );

  return card
    .charge(33.0)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAllowPartialAuth(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("10");
      expect(response.authorizedAmount).toBe("22.00");
    });
});

test.skip("069 - debit sale visa partial approval", () => {
  const card = TestCards.asDebit(
    TestCards.visaSwipe(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(44.0)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withAllowPartialAuth(true)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("10");
      expect(response.authorizedAmount).toBe("33.00");
      return response;
    })
    .then(() => {
      // test case 72
      return (
        card
          .reverse(33.0)
          // .withAllowDuplicates(true)
          .execute()
          .then((reverseResponse) => {
            expect(reverseResponse).toBeTruthy();
            expect(reverseResponse.responseCode).toBe("00");
          })
      );
    });
});

/// RETURN

test.skip("070 - debit return visa swipe", () => {
  const card = TestCards.asDebit(
    TestCards.visaSwipe(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .refund(14.07)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("070a - debit return visa swipe", () => {
  const card = TestCards.asDebit(
    TestCards.visaSwipe(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .refund(14.08)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then(() => {
      return (
        card
          .reverse(14.08)
          // .withAllowDuplicates(true)
          .execute()
          .then((reverseResponse) => {
            expect(reverseResponse).toBeTruthy();
            expect(reverseResponse.responseCode).toBe("00");
          })
      );
    });
});

/// REVERSAL

// test("071 - debit reversal mastercard", () => {
//   // see test case 66
// });

// test("072 - debit reversal visa", () => {
//   // see test case 96
// });

/// EBT FUNCTIONS
/// Food Stamp Purchase

test("080 - ebt fs purchase visa swipe", () => {
  const card = TestCards.asEBTTrack(
    TestCards.visaSwipe(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(101.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("081 - ebt fs purchase visa manual", () => {
  const card = TestCards.asEBTManual(
    TestCards.visaManual(false, true),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(102.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// Food Stamp Electronic Voucher (Manual Entry Only)

test("082 - ebt voucher purchase visa", () => {
  const card = TestCards.asEBTManual(
    TestCards.visaManual(false, true),
    "32539F50C245A6A93D123412324000AA",
  );
  card.serialNumber = "123456789012345";
  card.approvalCode = "123456";

  return card
    .charge(103.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// Food Stamp Balance Inquiry

test("083 - ebt fs return visa swipe", () => {
  const card = TestCards.asEBTTrack(
    TestCards.visaSwipeEncrypted(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .refund(104.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("084 - ebt fs return visa manual", () => {
  const card = TestCards.asEBTManual(
    TestCards.visaManual(false, true),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .refund(105.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// Food Stamp Balance Inquiry

test("085 - ebt balance inquiry visa swipe", () => {
  const card = TestCards.asEBTTrack(
    TestCards.visaSwipeEncrypted(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .balanceInquiry()
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("086 - ebt balance inquiry visa manual", () => {
  const card = TestCards.asEBTManual(
    TestCards.visaManual(true, true),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .balanceInquiry()
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// EBT CASH BENEFITS
/// Cash Back Purchase

test("087 - ebt cash back purchase visa swipe", () => {
  const card = TestCards.asEBTTrack(
    TestCards.visaSwipeEncrypted(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(106.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCashBack(5.0)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("088 - ebt cash back purchase visa manual", () => {
  const card = TestCards.asEBTManual(
    TestCards.visaManual(false, true),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(107.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCashBack(5.0)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// No Cash Back Purchase

test("089 - ebt cash back purchase visa swipe no cash back", () => {
  const card = TestCards.asEBTTrack(
    TestCards.visaSwipeEncrypted(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(108.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCashBack(0)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("090 - ebt cash back purchase visa manual no cash back", () => {
  const card = TestCards.asEBTManual(
    TestCards.visaManual(false, true),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(109.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCashBack(0)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// Cash Back Balance Inquiry

test("091 - ebt balance inquiry visa swipe cash", () => {
  const card = TestCards.asEBTTrack(
    TestCards.visaSwipeEncrypted(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .balanceInquiry(InquiryType.Cash)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("092 - ebt balance inquiry visa manual cash", () => {
  const card = TestCards.asEBTManual(
    TestCards.visaManual(true, true),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .balanceInquiry(InquiryType.Cash)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// Cash Benefits Withdrawal

test("093 - ebt benefit withdrawal visa swipe", () => {
  const card = TestCards.asEBTTrack(
    TestCards.visaSwipeEncrypted(),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(110.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("094 - ebt benefit withdrawal visa manual", () => {
  const card = TestCards.asEBTManual(
    TestCards.visaManual(false, true),
    "32539F50C245A6A93D123412324000AA",
  );

  return card
    .charge(111.01)
    .withAllowDuplicates(true)
    .withCurrency("USD")
    .withCashBack(0)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// HMS GIFT - REWARDS
/// GIFT
/// ACTIVATE

test("095 - activate gift 1 swipe", () => {
  const card = TestCards.giftCard1Swipe();

  return card
    .activate(6.0)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("096 - activate gift 2 manual", () => {
  const card = TestCards.giftCard2Manual();

  return card
    .activate(7.0)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// ADD VALUE

test("097 - add value gift 1 swipe", () => {
  const card = TestCards.giftCard1Swipe();

  return card
    .addValue(8.0)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("098 - add value gift 2 manual", () => {
  const card = TestCards.giftCard2Manual();

  return card
    .addValue(9.0)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// BALANCE INQUIRY

test("099 - balance inquiry gift 1 swipe", () => {
  const card = TestCards.giftCard1Swipe();

  return card
    .balanceInquiry()
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.balanceAmount).toBe("10.00");
    });
});

test("100 - balance inquiry gift 2 manual", () => {
  const card = TestCards.giftCard2Manual();

  return card
    .balanceInquiry()
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.balanceAmount).toBe("10.00");
    });
});

/// REPLACE / TRANSFER

test("101 - replace gift 1 swipe", () => {
  const oldCard = TestCards.giftCard1Swipe();
  const newCard = TestCards.giftCard2Manual();

  return oldCard
    .replaceWith(newCard)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("102 - replace gift 2 manual", () => {
  const newCard = TestCards.giftCard1Swipe();
  const oldCard = TestCards.giftCard2Manual();

  return oldCard
    .replaceWith(newCard)
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// SALE / REDEEM

test("103 - sale gift 1 swipe", () => {
  const card = TestCards.giftCard1Swipe();

  return card
    .charge(1.0)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("104 - sale gift 2 manual", () => {
  const card = TestCards.giftCard2Manual();

  return card
    .charge(2.0)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test.skip("105 - sale gift 1 void swipe", () => {
  const card = TestCards.giftCard1Swipe();

  return card
    .charge(3.0)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      // test case 107
      return response
        .void()
        .execute()
        .then((voidResponse) => {
          expect(voidResponse).toBeTruthy();
          expect(voidResponse.responseCode).toBe("00");
        });
    });
});

test.skip("106 - sale gift 2 reversal manual", () => {
  const card = TestCards.giftCard2Manual();

  return card
    .charge(4.0)
    .withCurrency("USD")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      return response;
    })
    .then((response) => {
      // test case 108
      return response
        .reverse(4.0)
        .execute()
        .then((voidResponse) => {
          expect(voidResponse).toBeTruthy();
          expect(voidResponse.responseCode).toBe("00");
        });
    });
});

/// VOID

// test("107 - void gift", () => {
//   // see test case 105
// });

// /// REVERSAL

// test("108 - reversal gift", () => {
//   // see test case 106
// });

/// DEACTIVATE

test("109 - deactivate gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return card
    .deactivate()
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

/// RECEIPTS MESSAGING

// test("110 - receipts messaging", () => {
//   /// PRINT AND SCAN RECEIPT FOR TEST 107
// });

/// REWARDS
/// BALANCE INQUIRY

test("111 - balance inquiry rewards 1", () => {
  const card = TestCards.giftCard1Swipe();

  return card
    .balanceInquiry()
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.pointsBalanceAmount > "0").toBeTruthy();
    });
});

test("112 - balance inquiry rewards 2", () => {
  const card = TestCards.giftCard2Manual();

  return card
    .balanceInquiry()
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
      expect(response.pointsBalanceAmount > "0").toBeTruthy();
    });
});

/// ALIAS

test("113 - create alias gift 1", () => {
  return GiftCard.create("9725550100").then((card) => {
    expect(card).toBeTruthy();
  });
});

test("114 - create alias gift 2", () => {
  return GiftCard.create("9725550100").then((card) => {
    expect(card).toBeTruthy();
  });
});

test("115 - add alias gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return card
    .addAlias("2145550199")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("116 - add alias gift 2", () => {
  const card = TestCards.giftCard2Manual();

  return card
    .addAlias("2145550199")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

test("117 - delete alias gift 1", () => {
  const card = TestCards.giftCard1Swipe();

  return card
    .removeAlias("2145550199")
    .execute()
    .then((response) => {
      expect(response).toBeTruthy();
      expect(response.responseCode).toBe("00");
    });
});

afterAll(() => {
  expect.assertions(1);

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
