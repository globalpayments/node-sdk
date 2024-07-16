import { PayFacService } from "../../../../../src/Services/PayFacService";
import { PorticoConfig, ServicesContainer } from "../../../../../src";

const config = new PorticoConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "d17d770d4734341aaedab32b7a7763";
config.terminalId = "7a7763";
config.selfSignedCertLocation =
  "test/Integration/Gateways/ProPayConnector/Certifications/TestData/selfSignedCertificate.crt";
const _service = new PayFacService();

beforeAll(() => {
  ServicesContainer.configureService(config);
});

test.failing("disburse funds", async () => {
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

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.failing("spend back transaction", async () => {
  const config = new PorticoConfig();
  config.certificationStr = "d17d770d4734341aaedab32b7a7763";

  const response = await _service
    .spendBack()
    .withAccountNumber("718570634")
    .withReceivingAccountNumber("718571166")
    .withAmount("100")
    .withAllowPending(true)
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

/* before executing need to run Transaction Type 04 -> and from success response,
 * the transNum value need to use here
 */
test.skip("split funds", async () => {
  const response = await _service
    .splitFunds()
    .withAccountNumber("718575860")
    .withReceivingAccountNumber("718571150")
    .withAmount("95")
    .withTransNum("15")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("reverse split pay", async () => {
  const response = await _service
    .reverseSplitPay()
    .withAccountNumber("718571150")
    .withAmount("1")
    .withCCAmount("0")
    .withRequireCCRefund(false)
    .withTransNum("4")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
  expect(response.payFacData.amount).toBeTruthy();
  expect(response.payFacData.recAccountNum).toBeTruthy();
  expect(response.payFacData.transNum).toBeTruthy();
});
