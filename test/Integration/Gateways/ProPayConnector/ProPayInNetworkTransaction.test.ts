import { PayFacService } from "../../../../src/Services/PayFacService";
import { PorticoConfig, ServicesContainer } from "../../../../src";

const config = new PorticoConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "5dbacb0fc504dd7bdc2eadeb7039dd"; // other transactions except disburment based
config.terminalId = "7039dd";
config.selfSignedCertLocation =
  "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificate.crt";
const _service = new PayFacService();

beforeAll(() => {
  ServicesContainer.configureService(config);
});

test("disburse funds", async () => {
  config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
  config.certificationStr = "C7277D317D1840F5ADEBE600CF47B9"; // disburment of fund only
  config.terminalId = "7039dd";
  config.selfSignedCertLocation =
    "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificate.crt";
  ServicesContainer.configureService(config);

  const response = await _service
    .disburseFunds()
    .withReceivingAccountNumber("718136438")
    .withAmount("100")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("spend back transaction", async () => {
  const config = new PorticoConfig();
  config.certificationStr = "5dbacb0fc504dd7bdc2eadeb7039dd";

  const response = await _service
    .spendBack()
    .withAccountNumber("718136438")
    .withReceivingAccountNumber("718567304")
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
    .withAccountNumber("718567304")
    .withReceivingAccountNumber("718136438")
    .withAmount("100")
    .withTransNum("9")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.failing("reverse split pay", async () => {
  const response = await _service
    .reverseSplitPay()
    .withAccountNumber("718136438")
    .withAmount("1")
    .withCCAmount("10")
    .withRequireCCRefund(true)
    .withTransNum("49")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
  expect(response.payFacData.amount).toBeTruthy();
  expect(response.payFacData.recAccountNum).toBeTruthy();
  expect(response.payFacData.transNum).toBeTruthy();
});
