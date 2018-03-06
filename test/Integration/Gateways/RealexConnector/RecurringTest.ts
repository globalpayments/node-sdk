import ava from "ava";
import {
  Address,
  CreditCardData,
  Customer,
  GenerationUtils,
  RecurringPaymentMethod,
  RecurringSequence,
  RecurringType,
  ServicesConfig,
  ServicesContainer,
} from "../../../../src/";

const config = new ServicesConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.rebatePassword = "rebate";
config.refundPassword = "refund";
config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
const test = ava.serial;

const card = new CreditCardData();
card.number = "4263970000005262";
card.expMonth = "5";
card.expYear = "2019";
card.cardHolderName = "James Mason";

const customerId = `${GenerationUtils.generateTimestamp()}-Realex`;
const paymentId = (t: string) =>
  `${GenerationUtils.generateTimestamp()}-Realex-${t}`;

const customer = new Customer();
customer.key = customerId;
customer.title = "Mr.";
customer.firstName = "James";
customer.lastName = "Mason";
customer.company = "Realex Payments";
customer.address = new Address();
customer.address.streetAddress1 = "Flat 123";
customer.address.streetAddress2 = "House 456";
customer.address.streetAddress3 = "The Cul-De-Sac";
customer.address.city = "Halifax";
customer.address.province = "West Yorkshire";
customer.address.postalCode = "W6 9HR";
customer.address.country = "United Kingdom";
customer.homePhone = "+35312345678";
customer.workPhone = "+3531987654321";
customer.fax = "+124546871258";
customer.mobilePhone = "+25544778544";
customer.email = "text@example.com";
customer.comments = "Campaign Ref E7373G";

test.before((_t) => {
  ServicesContainer.configure(config);
});

test("001a - create customer", async (t) => {
  t.plan(1);

  try {
    const newCustomer = await customer.create();
    t.truthy(newCustomer);
  } catch (e) {
    console.log(e);
    if (e.responseCode !== "520") {
      t.fail(e.message);
    }
  }
});

test("001b - create payment method", async (t) => {
  t.plan(1);

  try {
    const paymentMethod = await customer.addPaymentMethod(
      paymentId("Credit"),
      card,
    );
    t.truthy(paymentMethod);
  } catch (e) {
    if (e.responseCode !== "520") {
      t.fail(e.message);
    }
  }
});

test("002a - edit customer from id", async (_t) => {
  const editCustomer = new Customer();
  editCustomer.key = customerId;
  await customer.saveChanges();
});

test("002b - edit payment method from id", async (_t) => {
  const newCard = new CreditCardData();
  newCard.number = "5425230000004415";
  newCard.expMonth = "10";
  newCard.expYear = "2020";
  newCard.cardHolderName = "Philip Marlowe";

  const paymentMethod = new RecurringPaymentMethod(
    customerId,
    paymentId("Credit"),
  );
  paymentMethod.paymentMethod = newCard;
  await paymentMethod.saveChanges();
});

test("003 - find", async (_t) => {
  await Customer.find(customerId);
});

test("004a - charge stored card", async (t) => {
  t.plan(2);

  const paymentMethod = new RecurringPaymentMethod(
    customerId,
    paymentId("Credit"),
  );
  const response = await paymentMethod
    .charge(10)
    .withCurrency("USD")
    .withCvn("123")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("004b - verify stored card", async (t) => {
  t.plan(2);

  const paymentMethod = new RecurringPaymentMethod(
    customerId,
    paymentId("Credit"),
  );
  const response = await paymentMethod
    .verify()
    .withCvn("123")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("004c - refund stored card", async (t) => {
  t.plan(2);

  const paymentMethod = new RecurringPaymentMethod(
    customerId,
    paymentId("Credit"),
  );
  const response = await paymentMethod
    .refund(10.01)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("005 - delete payment method", async (_t) => {
  const paymentMethod = new RecurringPaymentMethod(
    customerId,
    paymentId("Credit"),
  );
  await paymentMethod.delete();
});

test("006 - recurring payment", async (t) => {
  t.plan(2);

  const paymentMethod = new RecurringPaymentMethod(
    customerId,
    paymentId("Credit"),
  );
  const response = await paymentMethod
    .charge(12)
    .withRecurringInfo(RecurringType.Fixed, RecurringSequence.First)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});
