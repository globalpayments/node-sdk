import {
  Address,
  CreditCardData,
  Customer,
  GenerationUtils,
  Logger,
  RecurringPaymentMethod,
  RecurringSequence,
  RecurringType,
  SampleRequestLogger,
  ServicesContainer,
} from "../../../../src";
import { GpEcomConfig } from "../../../../src/ServiceConfigs";

const config = new GpEcomConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.rebatePassword = "rebate";
config.refundPassword = "refund";
config.requestLogger = new SampleRequestLogger(new Logger("logs"));

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

beforeAll(() => {
  ServicesContainer.configureService(config);
});

describe("Recurring Test", () => {
  test("001a - create customer", async () => {
    try {
      const newCustomer = await customer.create();
      expect(newCustomer).toBeTruthy();
    } catch (e) {
      console.log(e);
      if (e.responseCode !== "520") {
        fail(e.message);
      }
    }
  });

  test("001b - create payment method", async () => {
    try {
      const paymentMethod = await customer.addPaymentMethod(
        paymentId("Credit"),
        card,
      );
      expect(paymentMethod).toBeTruthy();
    } catch (e) {
      if (e.responseCode !== "520") {
        fail(e.message);
      }
    }
  });

  test("002a - edit customer from id", async () => {
    const editCustomer = new Customer();
    editCustomer.key = customerId;
    await customer.saveChanges();
  });

  test.skip("002b - edit payment method from id", async () => {
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

  test.skip("003 - find", async () => {
    await Customer.find(customerId);
  });

  test.skip("004a - charge stored card", async () => {
    const paymentMethod = new RecurringPaymentMethod(
      customerId,
      paymentId("Credit"),
    );
    const response = await paymentMethod
      .charge(10)
      .withCurrency("USD")
      .withCvn("123")
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  test.skip("004b - verify stored card", async () => {
    const paymentMethod = new RecurringPaymentMethod(
      customerId,
      paymentId("Credit"),
    );
    const response = await paymentMethod.verify().withCvn("123").execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  test.skip("004c - refund stored card", async () => {
    const paymentMethod = new RecurringPaymentMethod(
      customerId,
      paymentId("Credit"),
    );
    const response = await paymentMethod
      .refund(10.01)
      .withCurrency("USD")
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  test.skip("005 - delete payment method", async () => {
    const paymentMethod = new RecurringPaymentMethod(
      customerId,
      paymentId("Credit"),
    );
    await paymentMethod.delete();
  });

  test.skip("006 - recurring payment", async () => {
    const paymentMethod = new RecurringPaymentMethod(
      customerId,
      paymentId("Credit"),
    );
    const response = await paymentMethod
      .charge(12)
      .withRecurringInfo(RecurringType.Fixed, RecurringSequence.First)
      .withCurrency("USD")
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });
});
