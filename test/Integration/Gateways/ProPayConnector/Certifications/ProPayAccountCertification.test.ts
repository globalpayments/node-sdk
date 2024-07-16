import { PayFacService } from "../../../../../src/Services/PayFacService";
import { PorticoConfig, ServicesContainer } from "../../../../../src";

import { TestAccountData } from "./TestData/TestAccountData";
import { BankAccountData } from "../../../../../src/Entities/ProFac/BankAccountData";
import { DocumentUploadData } from "../../../../../src/Entities/DocumentUploadData";
import { SSORequestData } from "../../../../../src/Entities/SSORequestData";

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

test.failing("create account", async () => {
  const accountPersonalInfo = TestAccountData.GetUserPersonalData();
  const ownersInfo = TestAccountData.GetBeneficialOwnerData();
  const response = await _service
    .createAccount()
    .withUserPersonalData(accountPersonalInfo)
    .withBeneficialOwnerData(ownersInfo)
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
  expect(response.payFacData.accountNumber).toBeTruthy();
  expect(response.payFacData.password).toBeTruthy();
  expect(response.payFacData.sourceEmail).toBeTruthy();
});

test("Order a new device", async () => {
  const orderDeviceInfo = TestAccountData.GetOrderNewDeviceData();
  const deviceData = TestAccountData.GetDeviceDataForPhysicalDevice(1, false);
  const response = await _service
    .orderDevice()
    .withOrderDevice(orderDeviceInfo)
    .withDeviceData(deviceData)
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.failing("create account Device Order", async () => {
  const bankAccountInfo = TestAccountData.GetBankAccountForBoardingData();
  const accountPersonalInfo = TestAccountData.GetUserPersonalForBoadingData();
  const deviceData = TestAccountData.GetDeviceData(1, false);
  const userBusinessInfo = TestAccountData.GetBusinessForBoardingData();
  const mailingAddressInfo = TestAccountData.GetMailingAddressForBoarding();

  const ownersInfo = TestAccountData.GetBeneficialOwnerData();
  const response = await _service
    .createAccount()
    .withBankAccountData(bankAccountInfo)
    .withUserPersonalData(accountPersonalInfo)
    .withBusinessData(userBusinessInfo)
    .withDeviceData(deviceData)
    .withMailingAddress(mailingAddressInfo)
    .withBeneficialOwnerData(ownersInfo)
    .withTimeZone("UTC")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
  expect(response.payFacData.accountNumber).toBeTruthy();
  expect(response.payFacData.password).toBeTruthy();
  expect(response.payFacData.sourceEmail).toBeTruthy();
});

test.failing("create account Physical Device", async () => {
  const bankAccountInfo = TestAccountData.GetBankAccountForBoardingData();
  const accountPersonalInfo = TestAccountData.GetUserPersonalForBoadingData();
  const deviceData = TestAccountData.GetDeviceDataForPhysicalDevice(1, false);
  const userBusinessInfo = TestAccountData.GetBusinessForBoardingData();
  const mailingAddressInfo = TestAccountData.GetMailingAddressForBoarding();

  const ownersInfo = TestAccountData.GetBeneficialOwnerData();
  const response = await _service
    .createAccount()
    .withBankAccountData(bankAccountInfo)
    .withUserPersonalData(accountPersonalInfo)
    .withBusinessData(userBusinessInfo)
    .withDeviceData(deviceData)
    .withMailingAddress(mailingAddressInfo)
    .withBeneficialOwnerData(ownersInfo)
    .withTimeZone("UTC")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
  expect(response.payFacData.accountNumber).toBeTruthy();
  expect(response.payFacData.password).toBeTruthy();
  expect(response.payFacData.sourceEmail).toBeTruthy();
});

test.failing("Test Failed KYC (Status 66)", async () => {
  const bankAccountInfo = TestAccountData.GetBankAccountForBoardingData();
  const accountPersonalInfo =
    TestAccountData.GetUserPersonalForBoadingData("01-01-1971");
  const deviceData = TestAccountData.GetDeviceData(1, false);
  const userBusinessInfo = TestAccountData.GetBusinessForBoardingData();
  const mailingAddressInfo = TestAccountData.GetMailingAddressForBoarding();

  const ownersInfo = TestAccountData.GetBeneficialOwnerData();
  const response = await _service
    .createAccount()
    .withBankAccountData(bankAccountInfo)
    .withUserPersonalData(accountPersonalInfo)
    .withBusinessData(userBusinessInfo)
    .withDeviceData(deviceData)
    .withMailingAddress(mailingAddressInfo)
    .withBeneficialOwnerData(ownersInfo)
    .withTimeZone("UTC")
    .execute();
  console.log(response);
  expect(response).toBeTruthy();
  expect("66").toBe(response.responseCode);
});

test("edit account information", async () => {
  const bankAccountData = new BankAccountData();
  bankAccountData.accountCountryCode = "USA";
  bankAccountData.accountType = "Checking";
  bankAccountData.accountNumber = "718570634";
  bankAccountData.bankName = "BankName";
  bankAccountData.routingNumber = "104000058";
  bankAccountData.accountOwnershipType = "Business";

  const response = await _service
    .editAccount()
    .withAccountNumber("718570634")
    .withBankAccountData(bankAccountData)
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("reset password", async () => {
  const response = await _service
    .resetPassword()
    .withAccountNumber("718570758")
    .execute();

  expect(response).toBeTruthy();
});

test("renew account", async () => {
  const response = await _service
    .renewAccount()
    .withRenewalAccountData(TestAccountData.GetRenewAccountDetails())
    .withAccountNumber("718570759")
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test.skip("disown account", async () => {
  const response = await _service
    .disownAccount()
    .withAccountNumber("718570772") // The account being "disowned" needs to have another affiliation set. Contact propayimplementations@tsys.com and they will set one if necessary
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

// Note : The transaction number of the chargeback you need to dispute. (can be verify at certification process)
test.failing("upload document chargeback", async () => {
  const docUploadData = new DocumentUploadData();
  docUploadData.documentName = "TestDocCB_12345";
  docUploadData.transactionReference = "1";
  docUploadData.documentPath =
    "test/Integration/Gateways/ProPayConnector/Certifications/TestData/TestDocChargeback.docx";
  docUploadData.DocumentPath(docUploadData.documentPath);
  const response = await _service
    .uploadDocumentChargeback()
    .withAccountNumber("718569967") //("718567300")
    .withDocumentUploadData(docUploadData)
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("upload document", async () => {
  const docUploadData = new DocumentUploadData();
  docUploadData.documentName = "TestDoc_12345";
  docUploadData.docCategory = "Verification";
  docUploadData.documentPath =
    "test/Integration/Gateways/ProPayConnector/Certifications/TestData/TestDoc.docx";
  docUploadData.DocumentPath(docUploadData.documentPath);
  const response = await _service
    .uploadDocument()
    .withAccountNumber("718570858")
    .withDocumentUploadData(docUploadData)
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
});

test("obtain sSO key", async () => {
  const ssoRequestData = new SSORequestData();
  ssoRequestData.referrerURL = "https://www.globalpaymentsinc.com/";
  ssoRequestData.iPAddress = "40.81.11.219";
  ssoRequestData.iPSubnetMask = "255.255.255.0";

  const response = await _service
    .obtainSSOKey()
    .withAccountNumber("718570860")
    .withSSORequestData(ssoRequestData)
    .execute();

  expect(response).toBeTruthy();
  expect("00").toBe(response.responseCode);
  expect(response.payFacData.authToken).toBeTruthy();
});

test.failing("update beneficial data", async () => {
  //Owners count shoud not be excedded 6
  const ownersInfo = TestAccountData.GetBeneficialOwnerData();

  const response = await _service
    .updateBeneficialOwnershipInfo()
    .withAccountNumber("718570792")
    .withBeneficialOwnerData(ownersInfo)
    .execute();

  expect(response).toBeTruthy();
});
