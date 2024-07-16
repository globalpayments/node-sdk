import {
  ServicesContainer,
  Address,
  Customer,
  CreditCardData,
  RecurringPaymentMethod,
  EmailReceipt,
  ScheduleFrequency,
  Schedule,
  ReportingService,
  PorticoConfig,
} from "../../../../src";

const config = new PorticoConfig();
const timeForId = new Date().getTime();

beforeAll(() => {
  config.secretApiKey = "skapi_cert_MXDMBQDwa3IAA4GV7NGMqQA_wFR3_TNeamFWoNUu_Q";
  ServicesContainer.configureService(config);
});

test("allow 5-part credentials", () => {
  const c = new PorticoConfig();
  c.username = "123456789";
  c.password = "$Test1234";
  c.siteId = "12345";
  c.deviceId = "123456";
  c.licenseId = "12345";
  ServicesContainer.configureService(c);
  expect(true).toBeTruthy();
});

describe("Recurring Payment Suite", () => {
  test("make PayPlan customer", async () => {
    const customer = new Customer();
    customer.id = "Customer" + timeForId;
    customer.firstName = "John";
    customer.lastName = "Doe";
    customer.status = "Active";
    customer.email = "john.doe@email.com";
    customer.address = new Address();
    customer.address.streetAddress1 = "123 Main St.";
    customer.address.city = "Dallas";
    customer.address.state = "TX";
    customer.address.postalCode = "98765";
    customer.address.country = "USA";
    customer.workPhone = "5551112222";
    const createdCustomer = await customer.create();

    expect(createdCustomer).toBeTruthy();
  });

  test("attach CC payment method to customer", async () => {
    const foundCustomer = (await Customer.find(
      "Customer" + timeForId,
    )) as Customer;

    expect(foundCustomer).toBeTruthy();

    const card = new CreditCardData();
    card.number = "4111111111111111";
    card.expMonth = "12";
    card.expYear = "2025";
    card.cvn = "123";

    const ccPaymentMethod = await foundCustomer
      .addPaymentMethod("Payment" + timeForId, card)
      .create();

    expect(ccPaymentMethod).toBeTruthy();
  });

  test("attach payment schedule to customer", async () => {
    const foundCcPaymentMethod = (await RecurringPaymentMethod.find(
      "Payment" + timeForId,
    )) as RecurringPaymentMethod;

    expect(foundCcPaymentMethod).toBeTruthy();

    const paymentSchedule = await foundCcPaymentMethod
      .addSchedule("Schedule" + timeForId)
      .withStartDate(new Date(2027, 1, 1))
      .withAmount(30.01)
      .withFrequency(ScheduleFrequency.Weekly)
      .withReprocessingCount(1)
      .withStatus("Active")
      .withEmailReceipt(EmailReceipt.Never)
      .create();

    expect(paymentSchedule).toBeTruthy();
  });

  test("edit/deactivate the schedule from above test", async () => {
    const foundSchedule = (await Schedule.find(
      "Schedule" + timeForId,
    )) as Schedule;

    expect(foundSchedule).toBeTruthy();

    foundSchedule.status = "Inactive";

    expect(foundSchedule.saveChanges()).toBeTruthy();
  });

  test("find and charge payment method", async () => {
    const foundCcPaymentMethod = (await RecurringPaymentMethod.find(
      "Payment" + timeForId,
    )) as RecurringPaymentMethod;

    const chargeResponse = await foundCcPaymentMethod
      .charge(12.34)
      .withCurrency("USD")
      .execute();

    expect(chargeResponse.responseCode == "00").toBe(true);
  });

  test("find transactions from this new payment method", async () => {
    const foundCcPaymentMethod = (await RecurringPaymentMethod.find(
      "Payment" + timeForId,
    )) as RecurringPaymentMethod;

    const foundTransactions = await ReportingService.findTransactions()
      .where("PaymentMethodKey", foundCcPaymentMethod.key)
      .execute();

    expect(foundTransactions.length === 2).toBe(true); // one transaction was the CreditAccountVerify from creating the payment method
  });
});
