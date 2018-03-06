import ava from "ava";
import { ServicesConfig, ServicesContainer } from "../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
// const runSerially = false;
// const test = runSerially ? ava.serial : ava;

ava.before((_t) => {
  ServicesContainer.configure(config);
});
