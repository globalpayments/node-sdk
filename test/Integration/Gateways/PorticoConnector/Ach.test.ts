import {
  AccountType,
  Address,
  CheckType,
  ECheck,
  EntryMethod,
  PaymentMethodType,
  PorticoConfig,
  SecCode,
  ServicesContainer,
  Transaction,
} from "../../../../src";

const address = new Address();
const check = new ECheck();
const config = new PorticoConfig();

beforeAll(() => {
  address.streetAddress1 = "123 Main St.";
  address.city = "Downtown";
  address.province = "NJ";
  address.postalCode = "12345";

  check.accountNumber = "1357902468";
  check.routingNumber = "122000030";
  check.checkType = CheckType.Personal;
  check.secCode = SecCode.PPD;
  check.accountType = AccountType.Checking;
  check.entryMode = EntryMethod.Manual;
  check.checkHolderName = "John Doe";
  check.driversLicenseNumber = "09876543210";
  check.driversLicenseState = "TX";
  check.phoneNumber = "8003214567";
  check.birthYear = "1997";
  check.ssnLast4 = "4321";
  check.checkName = "Genysis Chamber";
});

beforeEach(() => {
  config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
  config.serviceUrl = "https://cert.api2.heartlandportico.com";
  ServicesContainer.configureService(config);
});

test("check sale", async () => {
  const response = await check
    .charge(11)
    .withCurrency("USD")
    .withAddress(address)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test("check void from transaction id", async () => {
  const response = await check
    .charge(10)
    .withCurrency("USD")
    .withAddress(address)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const voidResponse = await Transaction.fromId(
    response.transactionId,
    PaymentMethodType.ACH,
  )
    .void()
    .execute();

  expect(voidResponse).toBeTruthy();
  expect(voidResponse.responseCode).toBe("00");
});
