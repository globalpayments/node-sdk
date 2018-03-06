import ava from "ava";
import {
  AccountType,
  Address,
  CheckType,
  SecCode,
  ServicesConfig,
  ServicesContainer,
} from "../../../../../src/";
import { TestChecks } from "../../../../Data/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
const runSerially = false;
const test = runSerially ? ava.serial : ava;

const address = new Address();
address.streetAddress1 = "123 Main St.";
address.city = "Downtown";
address.province = "NJ";
address.postalCode = "12345";

ava.before((_t) => {
  ServicesContainer.configure(config);
});

/// ACH Debit - Consumer

test("001 - consumer personal checking", (t) => {
  t.plan(4);

  const check = TestChecks.certification(
    SecCode.PPD,
    CheckType.Personal,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(11.0)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((response) => {
        // test case 25
        response
          .void()
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

test("002 - consumer business checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.PPD,
    CheckType.Business,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(12.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("003 - consumer personal savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.PPD,
    CheckType.Personal,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(13.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("004 - consumer business savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.PPD,
    CheckType.Business,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(14.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("005 - corporate personal checking", (t) => {
  t.plan(4);

  const check = TestChecks.certification(
    SecCode.CCD,
    CheckType.Personal,
    AccountType.Checking,
    "Heartland Pays",
  );

  return new Promise((resolve, reject) => {
    check
      .charge(15.0)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((response) => {
        // test case 26
        response
          .void()
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

test("006 - corporate business checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.CCD,
    CheckType.Business,
    AccountType.Checking,
    "Heartland Pays",
  );

  return new Promise((resolve, reject) => {
    check
      .charge(16.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("007 - corporate personal savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.CCD,
    CheckType.Personal,
    AccountType.Savings,
    "Heartland Pays",
  );

  return new Promise((resolve, reject) => {
    check
      .charge(17.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("008 - corporate business savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.CCD,
    CheckType.Business,
    AccountType.Savings,
    "Heartland Pays",
  );

  return new Promise((resolve, reject) => {
    check
      .charge(18.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("009 - egold personal checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Personal,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(11.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("010 - egold business checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Business,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(12.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("011 - egold personal savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Personal,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(13.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("012 - egold business savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Business,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(14.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("013 - esilver personal checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Personal,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(15.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("014 - esilver business checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Business,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(16.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("015 - esilver personal savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Personal,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(17.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("016 - esilver business savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Business,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(18.0)
      .withCurrency("USD")
      .withAddress(address)
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

test("017 - ebronze personal checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.EBronze,
    CheckType.Personal,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(19.0)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        reject();
      })
      .catch((error) => {
        t.plan(1);
        t.true(-1 !== error.message.indexOf("Processor Configuration error"));
        resolve();
      });
  });
});

test("018 - ebronze business checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.EBronze,
    CheckType.Business,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(20.0)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        reject();
      })
      .catch((error) => {
        t.plan(1);
        t.true(-1 !== error.message.indexOf("Processor Configuration error"));
        resolve();
      });
  });
});

test("019 - ebronze personal savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.EBronze,
    CheckType.Personal,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(21.0)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        reject();
      })
      .catch((error) => {
        t.plan(1);
        t.true(-1 !== error.message.indexOf("Processor Configuration error"));
        resolve();
      });
  });
});

test("020 - ebronze business savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.EBronze,
    CheckType.Business,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(22.0)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        reject();
      })
      .catch((error) => {
        t.plan(1);
        t.true(-1 !== error.message.indexOf("Processor Configuration error"));
        resolve();
      });
  });
});

test("021 - web personal checking", (t) => {
  const check = TestChecks.certification(
    SecCode.WEB,
    CheckType.Personal,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(23.0)
      .withCurrency("USD")
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

test("022 - web business checking", (t) => {
  const check = TestChecks.certification(
    SecCode.WEB,
    CheckType.Business,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(24.0)
      .withCurrency("USD")
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

test("023 - web personal savings", (t) => {
  const check = TestChecks.certification(
    SecCode.WEB,
    CheckType.Personal,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(25.0)
      .withCurrency("USD")
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

test("024 - web business savings", (t) => {
  const check = TestChecks.certification(
    SecCode.WEB,
    CheckType.Business,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check
      .charge(5.0)
      .withCurrency("USD")
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
