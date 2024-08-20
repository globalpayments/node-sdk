import {
  AccountType,
  Address,
  Channel,
  Customer,
  DataServiceCriteria,
  ECheck,
  PaymentMethodName,
  PaymentMethodType,
  PaymentType,
  PhoneNumber,
  PhoneNumberType,
  ReportingService,
  SearchCriteria,
  SecCode,
  ServicesContainer,
  Transaction,
  TransactionSortProperty,
  TransactionStatus,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

let eCheck: ECheck;
let address: Address;
let customer: Customer;

const amount = 10;
const currency = "USD";

const setup = () => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
  eCheck = new ECheck();
  eCheck.accountNumber = "1234567890";
  eCheck.routingNumber = "122000030";
  eCheck.accountType = AccountType.Savings;
  eCheck.secCode = SecCode.WEB;
  eCheck.checkReference = "123";
  eCheck.merchantNotes = "123";
  eCheck.bankName = "First Union";
  eCheck.checkHolderName = "Jane Doe";

  const bankAddress = new Address();
  bankAddress.streetAddress1 = "12000 Smoketown Rd";
  bankAddress.streetAddress2 = "Apt 3B";
  bankAddress.streetAddress3 = "no";
  bankAddress.city = "Mesa";
  bankAddress.postalCode = "22192";
  bankAddress.state = "AZ";
  bankAddress.countryCode = "US";

  eCheck.bankAddress = bankAddress;

  address = new Address();
  address.streetAddress1 = "Apartment 852";
  address.streetAddress2 = "Complex 741";
  address.streetAddress3 = "no";
  address.city = "Chicago";
  address.postalCode = "5001";
  address.state = "IL";
  address.countryCode = "US";

  customer = new Customer();
  customer.key = "e193c21a-ce64-4820-b5b6-8f46715de931";
  customer.firstName = "James";
  customer.lastName = "Mason";
  customer.dateOfBirth = "1980-01-01";
  customer.mobilePhone = new PhoneNumber(
    "+35",
    "312345678",
    PhoneNumberType.MOBILE,
  );
  customer.homePhone = new PhoneNumber("+1", "12345899", PhoneNumberType.HOME);
};

beforeAll(() => {
  setup();
});

test("check sale", async () => {
  const response = await eCheck
    .charge(amount + 1)
    .withCurrency(currency)
    .withAddress(address)
    .withCustomerData(customer)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED);
});

test("check refund", async () => {
  const response = await eCheck
    .refund(amount + 1)
    .withCurrency(currency)
    .withAddress(address)
    .withCustomerData(customer)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED);
});

test("check reauthorize", async () => {
  eCheck.secCode = SecCode.PPD;
  eCheck.accountNumber = "051904524";
  eCheck.routingNumber = "123456780";

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 2);
  const amount = "1.29";

  const response = await ReportingService.findTransactionsPaged(1, 10)
    .orderBy(TransactionSortProperty.TIME_CREATED)
    .where(SearchCriteria.StartDate, startDate)
    .andWith(SearchCriteria.EndDate, endDate)
    .andWith(SearchCriteria.PaymentMethodName, PaymentMethodName.BANK_PAYMENT)
    .andWith(SearchCriteria.PaymentType, PaymentType.SALE)
    .andWith(DataServiceCriteria.Amount, amount)
    .execute();

  expect(response).toBeTruthy();

  if (response.result.length) {
    const transactionSummary = response.result.shift();
    expect(transactionSummary).toBeTruthy();
    expect(transactionSummary.amount).toBe(amount);

    const transaction = Transaction.fromId(
      transactionSummary.transactionId,
      undefined,
      PaymentMethodType.ACH,
    );

    const reauthResponse = await transaction
      .reauthorized()
      .withDescription("Resubmitting " + transaction.transactionReference)
      .withBankTransferData(eCheck)
      .execute();

    expect(reauthResponse).toBeTruthy();
    expect(reauthResponse.responseCode).toBe("SUCCESS");
  }
});

test("check sale then refund", async () => {
  const response = await eCheck
    .charge(amount + 1)
    .withCurrency(currency)
    .withAddress(address)
    .withCustomerData(customer)
    .execute();

  expect(response).toBeTruthy();
  expect(response.responseCode).toBe("SUCCESS");
  expect(response.responseMessage).toBe(TransactionStatus.CAPTURED);

  const refund = await response.refund().withCurrency(currency).execute();

  expect(refund).toBeTruthy();
  expect(refund.responseCode).toBe("SUCCESS");
  expect(refund.responseMessage).toBe(TransactionStatus.CAPTURED);
  expect(refund.cardIssuerResponse.result).toBe("A0000");
});

afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());
