import test from "ava";
import { PayFacService } from "../../../../src/Services/PayFacService";
import {
  Address,
  ServicesConfig, ServicesContainer
} from "../../../../src/";

import { TestAccountData } from "./TestData/TestAccountData";
import { UserPersonalData } from "../../../../src/Entities/ProFac/UserPersonalData";
import { SSORequestData } from "../../../../src/Entities/SSORequestData";
import { BankAccountOwnershipData } from "../../../../src/Entities/ProFac/BankAccountOwnershipData";
import { DocumentUploadData } from "../../../../src/Entities/DocumentUploadData";

const config = new ServicesConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "5dbacb0fc504dd7bdc2eadeb7039dd";
config.terminalID = "7039dd";
config.x509CertificationPath = "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificate.crt";
config.x509CertificateString = "MIICpDCCAYygAwIBAgIIS7Y5fijJytIwDQYJKoZIhvcNAQENBQAwETEPMA0GA1UEAwwGUFJPUEFZMB4XDTE5MDkxOTAwMDAwMFoXDTI5MDkxOTAwMDAwMFowEzERMA8GA1UEAwwIMTI3LjAuMDEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCCwvq2ho43oeeGX3L9+2aD7bna7qjdLwWumeIpwhPZLa44MeQ5100wy4W2hKk3pOb5yaHqyhzoHDriveQnq/EpZJk9m7sizXsxZtBHtt+wghSZjdNhnon3R54SH5J7oEPybRSAKXSEzHjN+kCu7W3TmXSLve6YuODnjUpbOcAsHG2wE+zpCoEbe8toH5Tt7g8HzEc5mJYkkILTq6j9pwDE50r2NVbV3SXwmQ1ifxf54Z9EFB5bQv5cI3+GL/VwlQeJdiKMGj1rs8zTR8TjbAjVlJbz6bBkFItUsqexgwAHIJZAaU7an8ZamGRlPjf6dp3mOEu4B47igNj5KOSgCNdRAgMBAAEwDQYJKoZIhvcNAQENBQADggEBAF88u367yrduqd3PfEIo2ClaI2QPRIIWKKACMcZDl3z1BzVzNFOZNG2vLcSuKnGRH89tJPCjyxdJa0RyDTkXMSLqb5FgUseEjmj3ULAvFqLZNW35PY9mmlmCY+S3CC/bQR4iyPLo8lsRq0Nl6hlvB440+9zS8UQjtc2957QgcXfD427UJb698gXzsfQcNeaQWy8pNm7FzDfHTJbo/t6FOpmfR+RMZky9FrlWabInkrkf3w2XJL0uUAYU9jGQa+l/vnZD2KNzs1mO1EqkS6yB/fsn85mkgGe4Vfbo9GQ/S+KmDujewFA0ma7O03fy1W5v6Amn/nAcFTCddVL3BDNEtOM=";
const _service = new PayFacService();

test.before((_t) => {
  ServicesContainer.configure(config);
});

test("create account", async (t) => {
  t.plan(5);
  var bankAccountInfo = TestAccountData.GetBankAccountData();
  var userBusinessInfo = TestAccountData.GetBusinessData();
  var accountPersonalInfo = TestAccountData.GetUserPersonalData();
  var threatRiskData = TestAccountData.GetThreatRiskData();
  var significantOwnerData = TestAccountData.GetSignificantOwnerData();
  var ownersInfo = TestAccountData.GetBeneficialOwnerData();
  var creditCardInfo = TestAccountData.GetCreditCardData();
  var achInfo = TestAccountData.GetACHData();
  var mailingAddressInfo = TestAccountData.GetMailingAddress();
  var secondaryBankInformation = TestAccountData.GetSecondaryBankAccountData();
  var deviceData = TestAccountData.GetDeviceData(1, false);
  var response = await _service.createAccount()
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
  var orderDeviceInfo = TestAccountData.GetOrderNewDeviceData();
  var response = await _service.orderDevice()
    .withOrderDevice(orderDeviceInfo)
    .execute();
  
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("reset password", async (t) => {
  var response = await _service.resetPassword()
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

  var ownersInfo = TestAccountData.GetBeneficialOwnerData();

  var response = await _service.updateBeneficialOwnershipInfo()
    .withAccountNumber('718568507')
    .withBeneficialOwnerData(ownersInfo)
    .execute();

  t.truthy(response);
});

//#region edit aacount
test("edit account information", async (t) => {
  t.plan(2);

  var accountPersonalInfo = new UserPersonalData();
  accountPersonalInfo.dayPhone = "4464464464";
  accountPersonalInfo.eveningPhone = "4464464464";
  accountPersonalInfo.externalID = String(getRandomInt(100000000, 999999999));
  accountPersonalInfo.firstName = "John";
  accountPersonalInfo.lastName = "Doe";
  accountPersonalInfo.middleInitial = "A";
  accountPersonalInfo.sourceEmail = 'user' + getRandomInt(1, 10000) + '@user.com';
  accountPersonalInfo.sSN = '1234';

  var response = await _service.editAccount()
    .withAccountNumber("718135662")
    .withUserPersonalData(accountPersonalInfo)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("edit account password", async (t) => {
  t.plan(2);
  var response = await _service.editAccount()
    .withAccountNumber("718568506")
    .withPassword("testPwd_" + getRandomInt(1, 100))
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("edit account address", async (t) => {
  t.plan(2);
  var personalInfo = new UserPersonalData();
  personalInfo.dayPhone = "4464464464";
  personalInfo.eveningPhone = "4464464464";
  personalInfo.firstName = "John";
  personalInfo.lastName = "Doe";
  personalInfo.middleInitial = "A";
  personalInfo.sourceEmail = 'user' + getRandomInt(1, 10000) + '@user.com';
  personalInfo.externalID = String(getRandomInt(100000000, 999999999));

  var response = await _service.editAccount()
    .withAccountNumber("718138433")
    .withUserPersonalData(personalInfo)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("edit account permissions", async (t) => {
  t.plan(2);
  var response = await _service.editAccount()
    .withAccountNumber("718135662")
    .withAccountPermissions(TestAccountData.GetAccountPermissions())
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});

test("edit account timeZone", async (t) => {
  t.plan(2);
  // In ProPay, the TimeZone is edited as part of the User Personal Data. This value is not part of the UserPersonalData object in the SDK, though.

  // First, populate the UserPersonalData object
  // All items originally sent during account creation must be provided or they will be overwritten with blank spaces.
  var userPersonalData = new UserPersonalData();
  userPersonalData.dayPhone = "4464464464";
  userPersonalData.eveningPhone = "4464464464";
  userPersonalData.firstName = "John";
  userPersonalData.lastName = "Doe";
  userPersonalData.middleInitial = "A";
  userPersonalData.sourceEmail = 'user' + getRandomInt(1, 10000) + '@user.com';

  // Now call EditAccount, and in addition to sending the UserPersonalData, also send the TimeZone with one of the approved values.
  // See comment on WithTimeZone for values, or the ProPay documentation for further elaboration.
  var response = await _service.editAccount()
    .withAccountNumber("718216467")
    .withUserPersonalData(userPersonalData)
    .withTimeZone("ET")
    .execute();
  t.truthy(response);
  t.is("00", response.responseCode);
});
//#endregion

//#region renew account 
test("renew account", async (t) => {
  t.plan(2);
  var response = await _service.renewAccount()
    .withRenewalAccountData(TestAccountData.GetRenewAccountDetails(true))
    .withAccountNumber("718568507")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("renew account by credit card", async (t) => {
  t.plan(2);
  var response = await _service.renewAccount()
    .withAccountNumber("718135662")
    .withRenewalAccountData(TestAccountData.GetRenewAccountDetails(true))
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("renew account by bank account", async (t) => {
  t.plan(2);
  var response = await _service.renewAccount()
    .withAccountNumber("718135662")
    .withRenewalAccountData(TestAccountData.GetRenewAccountDetails(false))
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});
//#endregion

test("update account beneficial ownership", async (t) => {
  t.plan(3);
  var beneficialOwners = TestAccountData.GetBeneficialOwnerData();
  var response = await _service.updateBeneficialOwnershipInfo()
    .withAccountNumber("718134589") // This account must have been created with a beneficial owner count specified, but no owner details passed
    .withBeneficialOwnerData(beneficialOwners)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
  t.truthy(response.payFacData.beneficialOwnerDataResults);
});

test.skip("disown account", async (t) => {
  t.plan(2);
  var response = await _service.disownAccount()
    .withAccountNumber("718134204") // The account being "disowned" needs to have another affiliation set. Contact propayimplementations@tsys.com and they will set one if necessary
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

// Note : The transaction number of the chargeback you need to dispute. (can be verify at certification process)
test("upload document chargeback", async (t) => {
  t.plan(2);
  var docUploadData = new DocumentUploadData();
  docUploadData.documentName = "TestDocCB_12345";
  docUploadData.transactionReference = "123456789";
  docUploadData.documentPath = 'test/Integration/Gateways/ProPayConnector/TestData/TestDocChargeback.docx';
  docUploadData.DocumentPath(docUploadData.documentPath);
  var response = await _service.uploadDocumentChargeback()
    .withAccountNumber("718567300")
    .withDocumentUploadData(docUploadData)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("upload document", async (t) => {
  t.plan(2);
  var docUploadData = new DocumentUploadData();
  docUploadData.documentName = "TestDoc_12345";
  docUploadData.docCategory = "Verification";
  docUploadData.documentPath = 'test/Integration/Gateways/ProPayConnector/TestData/TestDoc.docx';
  docUploadData.DocumentPath(docUploadData.documentPath);
  var response = await _service.uploadDocument()
    .withAccountNumber("718134204")
    .withDocumentUploadData(docUploadData)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("upload document chargeback by document string", async (t) => {
  t.plan(2);
  var docUploadData = new DocumentUploadData();
  docUploadData.documentName = "TestDocCB_12345";
  docUploadData.transactionReference = "123456789";
  docUploadData.document = TestAccountData.GetDocumentBase64String('test/Integration/Gateways/ProPayConnector/TestData/TestDocChargeback.docx');
  docUploadData.docType = "docx";

  var response = await _service.uploadDocumentChargeback()
    .withAccountNumber("718134204")
    .withDocumentUploadData(docUploadData)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("upload document by document string", async (t) => {
  t.plan(2);
  var docUploadData = new DocumentUploadData();
  docUploadData.documentName = "TestDoc_12345";
  docUploadData.docCategory = "Verification";
  docUploadData.document = TestAccountData.GetDocumentBase64String('test/Integration/Gateways/ProPayConnector/TestData/TestDoc.docx');
  docUploadData.docType = "docx";

  var response = await _service.uploadDocument()
    .withAccountNumber("718134204")
    .withDocumentUploadData(docUploadData)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("obtain sSO key", async (t) => {
  t.plan(3);
  var ssoRequestData = new SSORequestData();
  ssoRequestData.referrerURL = "https://www.globalpaymentsinc.com/";
  ssoRequestData.iPAddress = "40.81.11.219";
  ssoRequestData.iPSubnetMask = "255.255.255.0";

  var response = await _service.obtainSSOKey()
    .withAccountNumber("718037672")
    .withSSORequestData(ssoRequestData)
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
  t.truthy(response.payFacData.authToken);
});

test("update bank account ownership info", async (t) => {
  t.plan(2);
  config.x509CertificationPath = "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificateCAN.crt";
  config.serviceUrl = "https://xmltestcanada.propay.com/API/PropayAPI.aspx";
  config.certificationStr = "7c4ddcba7054a1d9e00bcac4743b98";
  config.terminalID = "3b98";
  ServicesContainer.configure(config);

  var primaryOwner = new BankAccountOwnershipData();
  primaryOwner.firstName = "Style";
  primaryOwner.lastName = "Stallone";
  primaryOwner.phoneNumber = "123456789";
  var ownerAddress = new Address();
  ownerAddress.streetAddress1 = "3400 N Ashton Blvd";
  ownerAddress.streetAddress2 = "3401 M Ashton Clad";
  ownerAddress.streetAddress3 = "3402 L Ashton Blvd";
  ownerAddress.city = "Orlando";
  ownerAddress.state = "FL";
  ownerAddress.postalCode = "X0A 0H0";
  ownerAddress.country = "CAN";

  primaryOwner.ownerAddress = ownerAddress;

  var secondaryOwner = new BankAccountOwnershipData();
  secondaryOwner.firstName = "Thomas";
  secondaryOwner.lastName = "Hanks";
  secondaryOwner.phoneNumber = "123456789";
  var secondaryOwnerAddress = new Address();
  secondaryOwnerAddress.streetAddress1 = "1970 Diamond Blvd";
  secondaryOwnerAddress.streetAddress2 = "1971 Diamond Blvd";
  secondaryOwnerAddress.streetAddress3 = "1972 Diamond Blvd";
  secondaryOwnerAddress.city = "Orlando";
  secondaryOwnerAddress.state = "FL";
  secondaryOwnerAddress.postalCode = "X0A 0H0";
  secondaryOwnerAddress.country = "CAN";
  secondaryOwner.ownerAddress = secondaryOwnerAddress;

  var response = await _service.updateBankAccountOwnershipInfo()
    .withAccountNumber("716016890")
    .withPrimaryBankAccountOwner(primaryOwner)
    .withSecondaryBankAccountOwner(secondaryOwner)
    .execute();

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
