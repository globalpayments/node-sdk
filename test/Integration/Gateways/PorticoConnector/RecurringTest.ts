import ava from "ava";
import { ServicesConfig, ServicesContainer } from "../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";
const runSerially = false;
const test = runSerially ? ava.serial : ava;

ava.before((_t) => {
  ServicesContainer.configure(config);
});

test("allow 5-part credentials", (t) => {
  const c = new ServicesConfig();
  c.username = "123456789";
  c.password = "$Test1234";
  c.siteId = "12345";
  c.deviceId = "123456";
  c.licenseId = "12345";
  c.serviceUrl = "https://cert.api2-c.heartlandportico.com";
  ServicesContainer.configure(c);
  t.truthy(true);
});
