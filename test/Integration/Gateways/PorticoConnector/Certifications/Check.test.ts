import {
  AccountType,
  Address,
  CheckType,
  PorticoConfig,
  SecCode,
  ServicesContainer,
} from "../../../../../src";
import { TestChecks } from "../../../../Data";

const config = new PorticoConfig();

const address = new Address();

// Some tests are failing
beforeAll(() => {
  config.secretApiKey = "skapi_cert_MXDMBQDwa3IAA4GV7NGMqQA_wFR3_TNeamFWoNUu_Q";
  ServicesContainer.configureService(config);

  address.streetAddress1 = "123 Main St.";
  address.city = "Downtown";
  address.province = "NJ";
  address.postalCode = "12345";
});

/// ACH Debit - Consumer

describe("Check Test Suite", () => {
  test("001 - consumer personal checking", () => {
    const check = TestChecks.certification(
      SecCode.PPD,
      CheckType.Personal,
      AccountType.Checking,
      "Megatron",
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(11.0)
        .withCurrency("USD")
        .withAddress(address)
        .withAllowDuplicates(true)
        .execute()
        .then((response) => {
          expect(response).toBeTruthy();
          expect(response.responseCode).toBe("00");
          return response;
        })
        .then((response) => {
          // test case 25
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

  test("002 - consumer business checking", () => {
    const check = TestChecks.certification(
      SecCode.PPD,
      CheckType.Business,
      AccountType.Checking,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(12.0)
        .withCurrency("USD")
        .withAddress(address)
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

  test("003 - consumer personal savings", () => {
    const check = TestChecks.certification(
      SecCode.PPD,
      CheckType.Personal,
      AccountType.Savings,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(13.0)
        .withCurrency("USD")
        .withAddress(address)
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

  test("004 - consumer business savings", () => {
    const check = TestChecks.certification(
      SecCode.PPD,
      CheckType.Business,
      AccountType.Savings,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(14.0)
        .withCurrency("USD")
        .withAddress(address)
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

  test("005 - corporate personal checking", () => {
    const check = TestChecks.certification(
      SecCode.CCD,
      CheckType.Personal,
      AccountType.Checking,
      "Heartland Pays",
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(15.0)
        .withCurrency("USD")
        .withAddress(address)
        .withAllowDuplicates(true)
        .execute()
        .then((response) => {
          expect(response).toBeTruthy();
          expect(response.responseCode).toBe("00");
          return response;
        })
        .then((response) => {
          // test case 26
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

  test("006 - corporate business checking", () => {
    const check = TestChecks.certification(
      SecCode.CCD,
      CheckType.Business,
      AccountType.Checking,
      "Heartland Pays",
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(16.0)
        .withCurrency("USD")
        .withAddress(address)
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

  test("007 - corporate personal savings", () => {
    const check = TestChecks.certification(
      SecCode.CCD,
      CheckType.Personal,
      AccountType.Savings,
      "Heartland Pays",
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(17.0)
        .withCurrency("USD")
        .withAddress(address)
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

  test("008 - corporate business savings", () => {
    const check = TestChecks.certification(
      SecCode.CCD,
      CheckType.Business,
      AccountType.Savings,
      "Heartland Pays",
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(18.0)
        .withCurrency("USD")
        .withAddress(address)
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

  test("010 - egold business checking", () => {
    const check = TestChecks.certification(
      SecCode.CCD,
      CheckType.Business,
      AccountType.Checking,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(12.0)
        .withCurrency("USD")
        .withAddress(address)
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

  test("014 - esilver business checking", () => {
    const check = TestChecks.certification(
      SecCode.CCD,
      CheckType.Business,
      AccountType.Checking,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(16.0)
        .withCurrency("USD")
        .withAddress(address)
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

  test("017 - ebronze personal checking", () => {
    const check = TestChecks.certification(
      SecCode.EBronze,
      CheckType.Personal,
      AccountType.Checking,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(19.0)
        .withCurrency("USD")
        .withAddress(address)
        .withAllowDuplicates(true)
        .execute()
        .then((response) => {
          expect(response).toBeTruthy();
          expect(response.responseCode).toBe("00");
          reject();
        })
        .catch((error) => {
          expect(
            -1 !== error?.message.indexOf("Processor Configuration error"),
          ).toBe(true);
          resolve();
        });
    });
  });

  test("018 - ebronze business checking", () => {
    const check = TestChecks.certification(
      SecCode.EBronze,
      CheckType.Business,
      AccountType.Checking,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(20.0)
        .withCurrency("USD")
        .withAddress(address)
        .withAllowDuplicates(true)
        .execute()
        .then((response) => {
          expect(response).toBeTruthy();
          expect(response.responseCode).toBe("00");
          reject();
        })
        .catch((error) => {
          expect(
            -1 !== error?.message.indexOf("Processor Configuration error"),
          ).toBe(true);
          resolve();
        });
    });
  });

  test("019 - ebronze personal savings", () => {
    const check = TestChecks.certification(
      SecCode.EBronze,
      CheckType.Personal,
      AccountType.Savings,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(21.0)
        .withCurrency("USD")
        .withAddress(address)
        .withAllowDuplicates(true)
        .execute()
        .then((response) => {
          expect(response).toBeTruthy();
          expect(response.responseCode).toBe("00");
          reject();
        })
        .catch((error) => {
          expect(
            -1 !== error?.message.indexOf("Processor Configuration error"),
          ).toBe(true);
          resolve();
        });
    });
  });

  test("020 - ebronze business savings", () => {
    const check = TestChecks.certification(
      SecCode.EBronze,
      CheckType.Business,
      AccountType.Savings,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(22.0)
        .withCurrency("USD")
        .withAddress(address)
        .withAllowDuplicates(true)
        .execute()
        .then((response) => {
          expect(response).toBeTruthy();
          expect(response.responseCode).toBe("00");
          reject();
        })
        .catch((error) => {
          expect(
            -1 !== error?.message.indexOf("Processor Configuration error"),
          ).toBe(true);
          resolve();
        });
    });
  });

  test("021 - web personal checking", () => {
    const check = TestChecks.certification(
      SecCode.WEB,
      CheckType.Personal,
      AccountType.Checking,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(23.0)
        .withCurrency("USD")
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

  test("022 - web business checking", () => {
    const check = TestChecks.certification(
      SecCode.WEB,
      CheckType.Business,
      AccountType.Checking,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(24.0)
        .withCurrency("USD")
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

  test("023 - web personal savings", () => {
    const check = TestChecks.certification(
      SecCode.WEB,
      CheckType.Personal,
      AccountType.Savings,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(25.0)
        .withCurrency("USD")
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

  test("024 - web business savings", () => {
    const check = TestChecks.certification(
      SecCode.WEB,
      CheckType.Business,
      AccountType.Savings,
    );

    return new Promise<void>((resolve, reject) => {
      check
        .charge(5.0)
        .withCurrency("USD")
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
