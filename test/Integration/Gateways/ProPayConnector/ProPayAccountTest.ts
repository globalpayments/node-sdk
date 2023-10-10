import test from "ava";
import { PayFacService } from "../../../../src/Services/PayFacService";
import {
  Address,
  PorticoConfig,
  ServicesContainer
} from "../../../../src";

import { TestAccountData } from "./TestData/TestAccountData";
import { UserPersonalData } from "../../../../src/Entities/ProFac/UserPersonalData";
import { SSORequestData } from "../../../../src/Entities/SSORequestData";
import { BankAccountOwnershipData } from "../../../../src/Entities/ProFac/BankAccountOwnershipData";
import { DocumentUploadData } from "../../../../src/Entities/DocumentUploadData";

const config = new PorticoConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "5dbacb0fc504dd7bdc2eadeb7039dd";
config.terminalId = "7039dd";
config.selfSignedCertLocation = "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificate.crt";
const _service = new PayFacService();

test.before(() => {
  ServicesContainer.configureService(config);
});

test("create account", async (t) => {
  t.plan(5);
  const bankAccountInfo = TestAccountData.GetBankAccountData();
  const userBusinessInfo = TestAccountData.GetBusinessData();
  const accountPersonalInfo = TestAccountData.GetUserPersonalData();
  const threatRiskData = TestAccountData.GetThreatRiskData();
  const significantOwnerData = TestAccountData.GetSignificantOwnerData();
  const ownersInfo = TestAccountData.GetBeneficialOwnerData();
  const creditCardInfo = TestAccountData.GetCreditCardData();
  const achInfo = TestAccountData.GetACHData();
  const secondaryBankInformation = TestAccountData.GetSecondaryBankAccountData();
  const mailingAddressInfo = TestAccountData.GetMailingAddress();
  const deviceData = TestAccountData.GetDeviceData(1, false);
  const response = await _service.createAccount()
    .withBankAccountData(bankAccountInfo)
    .withBusinessData(userBusinessInfo)
    .withUserPersonalData(accountPersonalInfo)
    .withThreatRiskData(threatRiskData)
    .withSignificantOwnerData(significantOwnerData)
    .withBeneficialOwnerData(ownersInfo)
    .withCreditCardData(creditCardInfo)
    .withACHData(achInfo)
    .withMailingAddress(mailingAddressInfo)
    .withSecondaryBankAccountData(secondaryBankInformation)
    .withDeviceData(deviceData)
    .withTimeZone("ET")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
  t.truthy(response.payFacData.accountNumber);
  t.truthy(response.payFacData.password);
  t.truthy(response.payFacData.sourceEmail);
});

test("Order a new device", async (t) => {
  t.plan(2);
  const orderDeviceInfo = TestAccountData.GetOrderNewDeviceData();
  const deviceData = TestAccountData.GetDeviceDataForOrderDevice(1, false);
  const response = await _service.orderDevice()
    .withOrderDevice(orderDeviceInfo)
    .withOrderDeviceData(deviceData)
    .execute();
  
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("reset password", async (t) => {
  const response = await _service.resetPassword()
    .withAccountNumber('718150930')
    .withNegativeLimit('1')
    .execute();

  t.truthy(response);
});

/* Note : This method may be used to add new beneficial owner information when the original account boarding call included OwnerCount,
 *  but did not include all owner data 
 */
test("update beneficial data", async (t) => {
  //Owners count shoud not be excedded 6

  const ownersInfo = TestAccountData.GetBeneficialOwnerData();

  const response = await _service.updateBeneficialOwnershipInfo()
    .withAccountNumber('718568507')
    .withBeneficialOwnerData(ownersInfo)
    .execute();

  t.truthy(response);
});

//#region edit aacount
test("edit account information", async (t) => {
  t.plan(2);

  const accountPersonalInfo = new UserPersonalData();
  accountPersonalInfo.dayPhone = "4464464464";
  accountPersonalInfo.eveningPhone = "4464464464";
  accountPersonalInfo.externalID = String(getRandomInt(100000000, 999999999));
  accountPersonalInfo.firstName = "John";
  accountPersonalInfo.lastName = "Doe";
  accountPersonalInfo.middleInitial = "A";
  accountPersonalInfo.sourceEmail = 'user' + getRandomInt(1, 10000) + '@user.com';
  accountPersonalInfo.sSN = '1234';

  const response = await _service.editAccount()
    .withAccountNumber("718135662")
    .withUserPersonalData(accountPersonalInfo)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("edit account password", async (t) => {
  t.plan(2);
  const response = await _service.editAccount()
    .withAccountNumber("718568506")
    .withPassword("testPwd_" + getRandomInt(1, 100))
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("edit account address", async (t) => {
  t.plan(2);
  const personalInfo = new UserPersonalData();
 
  personalInfo.userAddress = new Address();
  personalInfo.userAddress.streetAddress1 = '124 Main St.';
  personalInfo.userAddress.city = 'Downtown';
  personalInfo.userAddress.state = 'NJ';
  personalInfo.userAddress.postalCode = '12345';
  personalInfo.userAddress.country = 'USA';
  
  personalInfo.mailingAddress = new Address();
  personalInfo.mailingAddress.streetAddress1 = '125 Main St.';
  personalInfo.mailingAddress.city = 'Downtown';
  personalInfo.mailingAddress.state = 'NJ';
  personalInfo.mailingAddress.postalCode = '12345';

  const response = await _service.editAccount()
    .withAccountNumber("718138433")
    .withUserPersonalData(personalInfo)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("edit account permissions", async (t) => {
  t.plan(2);
  const response = await _service.editAccount()
    .withAccountNumber("718135662")
    .withAccountPermissions(TestAccountData.GetAccountPermissions())
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

//#endregion

//#region renew account 
test("renew account", async (t) => {
  t.plan(2);
  const response = await _service.renewAccount()
    .withRenewalAccountData(TestAccountData.GetRenewAccountDetails())
    .withAccountNumber("718568507")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("renew account by credit card", async (t) => {
  t.plan(2);
  const response = await _service.renewAccount()
    .withAccountNumber("718135662")
    .withRenewalAccountData(TestAccountData.GetRenewAccountDetails())
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test.skip("renew account by bank account", async (t) => {
  t.plan(2);
  const response = await _service.renewAccount()
    .withAccountNumber("718151055")
    .withRenewalAccountData(TestAccountData.GetRenewAccountDetails())
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});
//#endregion

test.skip("update account beneficial ownership", async (t) => {
  t.plan(3);
  const beneficialOwners = TestAccountData.GetBeneficialOwnerData();
  const response = await _service.updateBeneficialOwnershipInfo()
    .withAccountNumber("718134589") // This account must have been created with a beneficial owner count specified, but no owner details passed
    .withBeneficialOwnerData(beneficialOwners)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
  t.truthy(response.payFacData.beneficialOwnerDataResults);
});

test.skip("disown account", async (t) => {
  t.plan(2);
  const response = await _service.disownAccount()
    .withAccountNumber("718134204") // The account being "disowned" needs to have another affiliation set. Contact propayimplementations@tsys.com and they will set one if necessary
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

// Note : The transaction number of the chargeback you need to dispute. (can be verify at certification process)
test("upload document chargeback", async (t) => {
  t.plan(2);
  const docUploadData = new DocumentUploadData();
  docUploadData.documentName = "TestDocCB_12345";
  docUploadData.transactionReference = "123456789";
  docUploadData.documentPath = 'test/Integration/Gateways/ProPayConnector/TestData/TestDocChargeback.docx';
  docUploadData.DocumentPath(docUploadData.documentPath);
  const response = await _service.uploadDocumentChargeback()
    .withAccountNumber("718567300")
    .withDocumentUploadData(docUploadData)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("upload document", async (t) => {
  t.plan(2);
  const docUploadData = new DocumentUploadData();
  docUploadData.documentName = "TestDoc_12345";
  docUploadData.docCategory = "Verification";
  docUploadData.documentPath = 'test/Integration/Gateways/ProPayConnector/TestData/TestDoc.docx';
  docUploadData.DocumentPath(docUploadData.documentPath);
  const response = await _service.uploadDocument()
    .withAccountNumber("718134204")
    .withDocumentUploadData(docUploadData)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("upload document chargeback by document string", async (t) => {
  t.plan(2);
  const docUploadData = new DocumentUploadData();
  docUploadData.documentName = "TestDocCB_12345";
  docUploadData.transactionReference = "123456789";
  docUploadData.document = TestAccountData.GetDocumentBase64String('test/Integration/Gateways/ProPayConnector/TestData/TestDocChargeback.docx');
  docUploadData.docType = "docx";

  const response = await _service.uploadDocumentChargeback()
    .withAccountNumber("718134204")
    .withDocumentUploadData(docUploadData)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("upload document by document string", async (t) => {
  t.plan(2);
  const docUploadData = new DocumentUploadData();
  docUploadData.documentName = "TestDoc_12345";
  docUploadData.docCategory = "Verification";
  docUploadData.document = TestAccountData.GetDocumentBase64String('test/Integration/Gateways/ProPayConnector/TestData/TestDoc.docx');
  docUploadData.docType = "docx";

  const response = await _service.uploadDocument()
    .withAccountNumber("718134204")
    .withDocumentUploadData(docUploadData)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("obtain sSO key", async (t) => {
  t.plan(3);
  const ssoRequestData = new SSORequestData();
  ssoRequestData.referrerURL = "https://www.globalpaymentsinc.com/";
  ssoRequestData.iPAddress = "40.81.11.219";
  ssoRequestData.iPSubnetMask = "255.255.255.0";

  const response = await _service.obtainSSOKey()
    .withAccountNumber("718150930")
    .withSSORequestData(ssoRequestData)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
  t.truthy(response.payFacData.authToken);
});

test("update bank account ownership info", async (t) => {
  t.plan(2);
  config.selfSignedCertLocation = "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificateCAN.crt";
  config.serviceUrl = "https://xmltestcanada.propay.com/API/PropayAPI.aspx";
  config.certificationStr = "7c4ddcba7054a1d9e00bcac4743b98";
  config.terminalId = "3b98";
  ServicesContainer.configureService(config, "secondService");

  const primaryOwner = new BankAccountOwnershipData();
  primaryOwner.firstName = "Style";
  primaryOwner.lastName = "Stallone";
  primaryOwner.phoneNumber = "123456789";
  const ownerAddress = new Address(); 

  primaryOwner.ownerAddress = ownerAddress;

  const secondaryOwner = new BankAccountOwnershipData();
  secondaryOwner.firstName = "Thomas";
  secondaryOwner.lastName = "Hanks";
  secondaryOwner.phoneNumber = "123456789";
  const secondaryOwnerAddress = new Address();
  secondaryOwnerAddress.streetAddress1 = "1970 Diamond Blvd";
  secondaryOwnerAddress.streetAddress2 = "1971 Diamond Blvd";
  secondaryOwnerAddress.streetAddress3 = "1972 Diamond Blvd";
  secondaryOwnerAddress.city = "Orlando";
  secondaryOwnerAddress.state = "FL";
  secondaryOwnerAddress.postalCode = "X0A 0H0";
  secondaryOwnerAddress.country = "CAN";
  secondaryOwner.ownerAddress = secondaryOwnerAddress;

  const response = await _service.updateBankAccountOwnershipInfo()
    .withAccountNumber("716016890")
    .withPrimaryBankAccountOwner(primaryOwner)
    .withSecondaryBankAccountOwner(secondaryOwner)
    .execute("secondService");

  t.truthy(response);
  t.is("00", response.responseCode);
});

function getRandomInt(min: number, max: number): number {
  const floatRandom = Math.random()
  const difference = max - min;

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom)
  const randomWithinRange = random + min

  return randomWithinRange;
}
