import ava from "ava";
import { Address, CheckService, ServicesConfig } from "../../../src/";
import { TestChecks } from "../../Data";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
const service = new CheckService(config);
const runSerially = false;
const test = runSerially ? ava.serial : ava;

const check = TestChecks.certification();
const address = new Address();
address.streetAddress1 = "123 Main St.";
address.city = "Downtown";
address.state = "NJ";
address.postalCode = "12345";

test("sale", async (t) => {
  t.plan(2);

  const response = await service
    .charge(10)
    .withCurrency("USD")
    .withPaymentMethod(check)
    .withAddress(address)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);
});

test("void", async (t) => {
  t.plan(4);

  const response = await service
    .charge(10)
    .withCurrency("USD")
    .withPaymentMethod(check)
    .withAddress(address)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00", response.responseMessage);

  const voidResponse = await service.void(response.transactionId).execute();

  t.truthy(voidResponse);
  t.is(voidResponse.responseCode, "00", voidResponse.responseMessage);
});
