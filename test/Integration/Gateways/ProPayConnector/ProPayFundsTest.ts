import test from "ava";
import { PayFacService } from "../../../../src/Services/PayFacService";
import { PorticoConfig, ServicesContainer } from "../../../../src";
import { TestFundsData } from "./TestData/TestFundsData";

const config = new PorticoConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "4ee64cbd706400fb4a34e65aab6f48";
config.terminalId = "ab6f48";
config.selfSignedCertLocation =
  "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificate.crt";
const _service = new PayFacService();

test.before(() => {
  ServicesContainer.configureService(config);
});

test("add funds", async (t) => {
  t.plan(2);
  const response = await _service
    .addFunds()
    .withAccountNumber("718134204")
    .withAmount("10")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("sweep funds", async (t) => {
  t.plan(2);
  const response = await _service
    .sweepFunds()
    .withAccountNumber("718570822")
    .withAmount("10")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("add flash funds payment card", async (t) => {
  t.plan(2);
  const response = await _service
    .addCardFlashFunds()
    .withAccountNumber("718136438")
    .withFlashFundsPaymentCardData(TestFundsData.GetFlashFundsPaymentCardData())
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("push money to flash funds card", async (t) => {
  t.plan(2);
  const response = await _service
    .pushMoneyToFlashFundsCard()
    .withAccountNumber("718136438")
    .withAmount("100")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});
