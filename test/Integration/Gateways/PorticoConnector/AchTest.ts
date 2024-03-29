import ava from "ava";
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
} from "../../../../src/";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
const runSerially = false;
const test = runSerially ? ava.serial : ava;

const address = new Address();
address.streetAddress1 = "123 Main St.";
address.city = "Downtown";
address.province = "NJ";
address.postalCode = "12345";

const check = new ECheck();
check.accountNumber = "24413815";
check.routingNumber = "490000018";
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

ava.before(() => {
  ServicesContainer.configureService(config);
});

test("check sale", async (t) => {
  t.plan(2);

  const response = await check
    .charge(11)
    .withCurrency("USD")
    .withAddress(address)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("check void from transaction id", async (t) => {
  t.plan(4);

  const response = await check
    .charge(10)
    .withCurrency("USD")
    .withAddress(address)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);

  const voidResponse = await Transaction.fromId(
    response.transactionId,
    PaymentMethodType.ACH,
  )
    .void()
    .execute();

  t.truthy(voidResponse);
  t.is(voidResponse.responseCode, "00");
});
