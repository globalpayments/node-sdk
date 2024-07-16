import { PayFacService } from "../../../../../src/Services/PayFacService";
import { PorticoConfig, ServicesContainer } from "../../../../../src";

const config = new PorticoConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "d17d770d4734341aaedab32b7a7763";
config.terminalId = "7a7763";
const _service = new PayFacService();

beforeAll(() => {
  ServicesContainer.configureService(config);
});

test("get account info", async () => {
  const response = await _service
    .getAccountDetails()
    .withAccountNumber("718570752")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("get account balance", async () => {
  const response = await _service
    .getAccountBalance()
    .withAccountNumber("718570752")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("get account info enchance", async () => {
  expect.assertions(2);
  const response = await _service
    .getAccountDetailsEnhanced()
    .withAccountNumber("718570752")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});
