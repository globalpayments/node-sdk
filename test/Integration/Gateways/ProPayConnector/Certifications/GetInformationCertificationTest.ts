import test from "ava";
import { PayFacService } from "../../../../../src/Services/PayFacService";
import {
  PorticoConfig,
   ServicesContainer
} from "../../../../../src";

const config = new PorticoConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "d17d770d4734341aaedab32b7a7763";
config.terminalId = "7a7763";
const _service = new PayFacService();

test.before((_t) => {
  ServicesContainer.configureService(config);
});

test("get account info", async (t) => {
  t.plan(2);
  var response = await _service.getAccountDetails()
    .withAccountNumber("718570752")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("get account balance", async (t) => {
  t.plan(2);
  var response = await _service.getAccountBalance()
    .withAccountNumber("718570752")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("get account info enchance", async (t) => {
  t.plan(2);
  var response = await _service.getAccountDetailsEnhanced()
    .withAccountNumber("718570752")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});