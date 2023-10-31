import test from "ava";
import { PayFacService } from "../../../../src/Services/PayFacService";
import { PorticoConfig, ServicesContainer } from "../../../../src";

const config = new PorticoConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "5dbacb0fc504dd7bdc2eadeb7039dd";
config.terminalId = "7039dd";
const _service = new PayFacService();

test.before(() => {
  ServicesContainer.configureService(config);
});

test("get account balance", async (t) => {
  t.plan(2);
  const response = await _service
    .getAccountBalance()
    .withAccountNumber("718135687")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("get account info", async (t) => {
  t.plan(2);
  const response = await _service
    .getAccountDetails()
    .withAccountNumber("718135687")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("get account info enchance", async (t) => {
  t.plan(2);
  const response = await _service
    .getAccountDetailsEnhanced()
    .withAccountNumber("718135687")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});
