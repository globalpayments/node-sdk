import test from "ava";
import { PayFacService } from "../../../../../src/Services/PayFacService";
import {
  ServicesConfig, ServicesContainer
} from "../../../../../src/";
import { TestFundsData } from "./../TestData/TestFundsData";

const config = new ServicesConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "d17d770d4734341aaedab32b7a7763";
config.terminalID = "7a7763";
config.x509CertificationPath = "test/Integration/Gateways/ProPayConnector/Certifications/TestData/selfSignedCertificate.crt";
const _service = new PayFacService();

test.before((_t) => {
  ServicesContainer.configure(config);
});

test("add funds", async (t) => {
  t.plan(2);
  var response = await _service.addFunds()
    .withAccountNumber("718571343")//718571145")
    .withAmount("100")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("sweep funds", async (t) => {
  t.plan(2);
  var response = await _service.sweepFunds()
    .withAccountNumber("718571343")//718571146")
    .withAmount("10")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("add flash funds payment card", async (t) => {
  t.plan(2);
  var response = await _service.addCardFlashFunds()
    .withAccountNumber("718571147")
    .withFlashFundsPaymentCardData(TestFundsData.GetFlashFundsPaymentCardData())
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("push money to flash funds card", async (t) => {
  t.plan(2);
  var response = await _service.pushMoneyToFlashFundsCard()
    .withAccountNumber("718571148")
    .withAmount("100")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});