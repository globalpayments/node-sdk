import test from "ava";
import { PayFacService } from "../../../../../src/Services/PayFacService";
import { PorticoConfig, ServicesContainer } from "../../../../../src/";

const config = new PorticoConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "d17d770d4734341aaedab32b7a7763";
config.terminalId = "7a7763";
config.selfSignedCertLocation =
  "test/Integration/Gateways/ProPayConnector/Certifications/TestData/selfSignedCertificate.crt";
const _service = new PayFacService();

test.before(() => {
  ServicesContainer.configureService(config);
});

test("disburse funds", async (t) => {
  t.plan(2);
  config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
  config.certificationStr = "D515DA6DA576475A85AAB5268DE822"; // disburment of fund only
  config.terminalId = "D515DA6DA576475A";
  config.selfSignedCertLocation =
    "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificate.crt";
  ServicesContainer.configureService(config, "second");

  const response = await _service
    .disburseFunds()
    .withReceivingAccountNumber("718570634") //718136438")
    .withAmount("100")
    .execute("second");

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("spend back transaction", async (t) => {
  t.plan(2);
  const config = new PorticoConfig();
  config.certificationStr = "d17d770d4734341aaedab32b7a7763";

  const response = await _service
    .spendBack()
    .withAccountNumber("718570634")
    .withReceivingAccountNumber("718571166")
    .withAmount("100")
    .withAllowPending(true)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

/* before executing need to run Transaction Type 04 -> and from success response,
 * the transNum value need to use here
 */
test("split funds", async (t) => {
  t.plan(2);
  const response = await _service
    .splitFunds()
    .withAccountNumber("718575860")
    .withReceivingAccountNumber("718571150")
    .withAmount("95")
    .withTransNum("15")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("reverse split pay", async (t) => {
  t.plan(5);
  const response = await _service
    .reverseSplitPay()
    .withAccountNumber("718571150")
    .withAmount("1")
    .withCCAmount("0")
    .withRequireCCRefund(false)
    .withTransNum("4")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
  t.truthy(response.payFacData.amount);
  t.truthy(response.payFacData.recAccountNum);
  t.truthy(response.payFacData.transNum);
});
