import { PayFacService } from "../../../../../src/Services/PayFacService";
import { PorticoConfig, ServicesContainer } from "../../../../../src";
import { TestFundsData } from "../TestData/TestFundsData";

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

test("add funds", async () => {
  const response = await _service
    .addFunds()
    .withAccountNumber("718571343") //718571145")
    .withAmount("100")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("sweep funds", async () => {
  const response = await _service
    .sweepFunds()
    .withAccountNumber("718571343") //718571146")
    .withAmount("10")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("add flash funds payment card", async () => {
  const response = await _service
    .addCardFlashFunds()
    .withAccountNumber("718571147")
    .withFlashFundsPaymentCardData(TestFundsData.GetFlashFundsPaymentCardData())
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("push money to flash funds card", async () => {
  const response = await _service
    .pushMoneyToFlashFundsCard()
    .withAccountNumber("718571148")
    .withAmount("100")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});
