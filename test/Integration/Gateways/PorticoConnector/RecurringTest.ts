import test from "ava";
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
} from "../../../../src/";

const timeForId = new Date().getTime();

test("allow 5-part credentials", (t) => {
  const c = new PorticoConfig();
  c.username = "123456789";
  c.password = "$Test1234";
  c.siteId = "12345";
  c.deviceId = "123456";
  c.licenseId = "12345";
  ServicesContainer.configureService(c);
  t.truthy(true);
});

test("make PayPlan customer", async (t) => {
  t.plan(1);

  handleAuth();

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

  t.truthy(createdCustomer);
});

test("attach CC payment method to customer", async (t) => {
  t.plan(2);

  handleAuth();

  const foundCustomer = await Customer.find("Customer" + timeForId) as Customer;

  t.truthy(foundCustomer);

  const card = new CreditCardData();
  card.number = "4111111111111111";
  card.expMonth = "12";
  card.expYear = "2025";
  card.cvn = "123";

  const ccPaymentMethod = await foundCustomer
      .addPaymentMethod("Payment" + timeForId, card)
      .create();

  t.truthy(ccPaymentMethod);
});

test("attach payment schedule to customer", async (t) => {
  t.plan(2);

  handleAuth();

  const foundCcPaymentMethod = await RecurringPaymentMethod.find("Payment" + timeForId) as RecurringPaymentMethod;

  t.truthy(foundCcPaymentMethod);

  const paymentSchedule =  await foundCcPaymentMethod
    .addSchedule("Schedule" + timeForId)
    .withStartDate(new Date(2027, 1, 1))
    .withAmount(30.01)
    .withFrequency(ScheduleFrequency.Weekly)
    .withReprocessingCount(1)
    .withStatus("Active")
    .withEmailReceipt(EmailReceipt.Never)
    .create("auth");

  t.truthy(paymentSchedule);
});

test("edit/deactivate the schedule from above test", async (t) => {
  t.plan(2);

  handleAuth();

  const foundSchedule = await Schedule.find("Schedule" + timeForId) as Schedule;

  t.truthy(foundSchedule);

  foundSchedule.status = "Inactive";

  t.truthy(foundSchedule.saveChanges("auth"));
});

test("find and charge payment method", async (t) => {
  t.plan(1)

  handleAuth();

  const foundCcPaymentMethod = await RecurringPaymentMethod.find("Payment" + timeForId) as RecurringPaymentMethod;

  const chargeResponse = await foundCcPaymentMethod.charge(12.34)
    .withCurrency("USD")
    .execute("auth");

  t.true(chargeResponse.responseCode == '00')
})

test("find transactions from this new payment method", async (t) => {
  t.plan(1)

  handleAuth();

  const foundCcPaymentMethod = await RecurringPaymentMethod.find("Payment" + timeForId) as RecurringPaymentMethod;

  const foundTransactions = await ReportingService.findTransactions()
    .where("PaymentMethodKey", foundCcPaymentMethod.key)
    .execute("auth");

  t.true(foundTransactions.length === 2); // one transaction was the CreditAccountVerify from creating the payment method
})

function handleAuth() {
  const config = new PorticoConfig();
  config.secretApiKey = "skapi_cert_MXvdAQB61V4AkyM-x3EJuY6hkEaCzaMimTWav7mVfQ";
  ServicesContainer.configureService(config, "auth");
}