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

test("001 - web personal checking", (t) => {
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

test("002 - web business checking", (t) => {
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

test("003 - web personal savings", (t) => {
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

test("004 - web business savings", (t) => {
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
