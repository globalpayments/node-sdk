import { PayFacService } from "../../../../src/Services/PayFacService";
import { PorticoConfig, ServicesContainer } from "../../../../src";

const config = new PorticoConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "5dbacb0fc504dd7bdc2eadeb7039dd";
config.terminalId = "7039dd";
const _service = new PayFacService();

beforeAll(() => {
  ServicesContainer.configureService(config);
});

test("get account balance", async () => {
  const response = await _service
    .getAccountBalance()
    .withAccountNumber("718135687")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("get account info", async () => {
  const response = await _service
    .getAccountDetails()
    .withAccountNumber("718135687")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("get account info enchance", async () => {
  const response = await _service
    .getAccountDetailsEnhanced()
    .withAccountNumber("718135687")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});
