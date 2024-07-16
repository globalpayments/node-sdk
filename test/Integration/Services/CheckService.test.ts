import { Address, CheckService, PorticoConfig } from "../../../src";
import { TestChecks } from "../../Data";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
const service = new CheckService(config);

const check = TestChecks.certification();
const address = new Address();
address.streetAddress1 = "123 Main St.";
address.city = "Downtown";
address.state = "NJ";
address.postalCode = "12345";

test.failing("sale", async () => {
  const response = await service
    .charge(10)
    .withCurrency("USD")
    .withPaymentMethod(check)
    .withAddress(address)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");
});

test.failing("void", async () => {
  expect.assertions(4);

  const response = await service
    .charge(10)
    .withCurrency("USD")
    .withPaymentMethod(check)
    .withAddress(address)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("00");

  const voidResponse = await service.void(response.transactionId).execute();

  expect(voidResponse).toBeTruthy();
  expect(voidResponse.responseCode).toBe("00");
});
