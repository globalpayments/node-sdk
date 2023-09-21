import test from "ava";
import { PayFacService } from "../../../../src/Services/PayFacService";
import {
  PorticoConfig,
  ServicesContainer
} from "../../../../src";

const config = new PorticoConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "5dbacb0fc504dd7bdc2eadeb7039dd"; // other transactions except disburment based
config.terminalId = "7039dd";
config.selfSignedCertLocation = "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificate.crt";
const _service = new PayFacService();

test.before((_t) => {
  ServicesContainer.configureService(config);
});

test("disburse funds", async (t) => {
  t.plan(2);
  config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
  config.certificationStr = "C7277D317D1840F5ADEBE600CF47B9"; // disburment of fund only
  config.terminalId = "7039dd";
  config.selfSignedCertLocation = "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificate.crt";
  ServicesContainer.configureService(config);

  var response = await _service.disburseFunds()
    .withReceivingAccountNumber("718136438")
    .withAmount("100")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("spend back transaction", async (t) => {
  t.plan(2);
  const config = new PorticoConfig();
  config.certificationStr = "5dbacb0fc504dd7bdc2eadeb7039dd";

  var response = await _service.spendBack()
    .withAccountNumber("718136438")
    .withReceivingAccountNumber("718567304")
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
  var response = await _service.splitFunds()
    .withAccountNumber("718567304")
    .withReceivingAccountNumber("718136438")
    .withAmount("100")
    .withTransNum("9")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("reverse split pay", async (t) => {
  t.plan(5);
  var response = await _service.reverseSplitPay()
    .withAccountNumber("718136438")
    .withAmount("1")
    .withCCAmount("10")
    .withRequireCCRefund(true)
    .withTransNum("49")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
  t.truthy(response.payFacData.amount);
  t.truthy(response.payFacData.recAccountNum);
  t.truthy(response.payFacData.transNum);
});