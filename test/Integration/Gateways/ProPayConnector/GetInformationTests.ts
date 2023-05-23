import test from "ava";
import { PayFacService } from "../../../../src/Services/PayFacService";
import {
  ServicesConfig, ServicesContainer
} from "../../../../src/";

const config = new ServicesConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "5dbacb0fc504dd7bdc2eadeb7039dd";
config.terminalID = "7039dd";
const _service = new PayFacService();

test.before((_t) => {
  ServicesContainer.configure(config);
});

test("get account balance", async (t) => {
  t.plan(2);
  var response = await _service.getAccountBalance()
    .withAccountNumber("718135687")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("get account info", async (t) => {
  t.plan(2);
  var response = await _service.getAccountDetails()
    .withAccountNumber("718135687")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("get account info enchance", async (t) => {
  t.plan(2);
  var response = await _service.getAccountDetailsEnhanced()
    .withAccountNumber("718135687")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});