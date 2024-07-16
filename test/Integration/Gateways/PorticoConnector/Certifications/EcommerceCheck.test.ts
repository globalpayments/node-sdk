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
address.streetAddress1 = "123 Main St.";
address.city = "Downtown";
address.province = "NJ";
address.postalCode = "12345";

beforeAll(() => {
  config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
  ServicesContainer.configureService(config);
});

/// ACH Debit - Consumer
test("001 - web personal checking", () => {
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

test("002 - web business checking", () => {
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

test("003 - web personal savings", () => {
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

test("004 - web business savings", () => {
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
