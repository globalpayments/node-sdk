import ava from "ava";
import {
  AccountType,
  Address,
  BatchService,
  CheckType,
  CreditCardData,
  Customer,
  ECheck,
  EmailReceipt,
  GenerationUtils,
  RecurringPaymentMethod,
  Schedule,
  ScheduleFrequency,
  SecCode,
  ServicesConfig,
  ServicesContainer,
  StringUtils,
} from "../../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MbPdAQBL1l4A2ThZoTBKXEdEG1rIi7KAa6Yskl9Nzg";
config.serviceUrl = "https://cert.api2.heartlandportico.com";

const BATCH_NOT_OPEN =
  "Transaction was rejected because it requires a batch to be open.";
const BATCH_EMPTY =
  "Batch close was rejected because no transactions are associated with the currently open batch";
const test = ava.serial;

let customerPerson: Customer | undefined;
let customerBusiness: Customer | undefined;
let paymentMethodVisa: RecurringPaymentMethod | undefined;
let paymentMethodMasterCard: RecurringPaymentMethod | undefined;
let paymentMethodCheckPpd: RecurringPaymentMethod | undefined;
let paymentMethodCheckCcd: RecurringPaymentMethod | undefined;
let scheduleVisa: Schedule | undefined;
let scheduleMasterCard: Schedule | undefined;
let scheduleCheckPpd: Schedule | undefined;
let scheduleCheckCcd: Schedule | undefined;

const todayDate = GenerationUtils.generateTimestamp();
const getIdentifier = (id: string) =>
  `${todayDate}-${id}-${StringUtils.uuid()}`.substr(0, 50);

ava.before((_t) => {
  ServicesContainer.configure(config);
});

ava.before("000 - close batch", (t) => {
  t.plan(1);

  return new Promise((resolve, reject) => {
    BatchService.closeBatch()
      .then((response) => {
        t.truthy(response);
        resolve();
      })
      .catch((e: Error) => {
        if (
          e.message.indexOf(BATCH_NOT_OPEN) !== -1 ||
          e.message.indexOf(BATCH_EMPTY) !== -1
        ) {
          t.pass();
          resolve();
          return;
        }
        reject(e);
      });
  });
});

test.before("000 - cleanup", async () => {
  try {
    const results = await Schedule.findAll();
    for (const result in results) {
      if (results.hasOwnProperty(result)) {
        const schedule: Schedule = (results as any)[result];
        await schedule.delete(true);
      }
    }
  } catch (_e) {
    //
  }

  try {
    const results = await RecurringPaymentMethod.findAll();
    for (const result in results) {
      if (results.hasOwnProperty(result)) {
        const paymentMethod: RecurringPaymentMethod = (results as any)[result];
        await paymentMethod.delete(true);
      }
    }
  } catch (_e) {
    //
  }

  try {
    const results = await Customer.findAll();
    for (const result in results) {
      if (results.hasOwnProperty(result)) {
        const customer: Customer = (results as any)[result];
        await customer.delete(true);
      }
    }
  } catch (_e) {
    //
  }
});

// customer setup

test("001 - add customer person", async (t) => {
  t.plan(2);

  let customer = new Customer();
  customer.id = getIdentifier("Person");
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
  customer = await customer.create();

  t.truthy(customer);
  t.truthy(customer.key);
  customerPerson = customer;
});

test("002 - add customer person", async (t) => {
  t.plan(2);

  let customer = new Customer();
  customer.id = getIdentifier("Business");
  customer.company = "AcmeCo";
  customer.status = "Active";
  customer.email = "acme@email.com";
  customer.address = new Address();
  customer.address.streetAddress1 = "987 Elm St.";
  customer.address.city = "Princeton";
  customer.address.state = "NJ";
  customer.address.postalCode = "12345";
  customer.address.country = "USA";
  customer.workPhone = "5551112222";
  customer = await customer.create();

  t.truthy(customer);
  t.truthy(customer.key);
  customerBusiness = customer;
});

// payment method setup

test("003 - add payment credit visa", async (t) => {
  t.plan(2);

  if (!customerPerson) {
    return;
  }

  const card = new CreditCardData();
  card.number = "4012002000060016";
  card.expMonth = "12";
  card.expYear = "2025";

  const paymentMethod = await customerPerson
    .addPaymentMethod(getIdentifier("CreditV"), card)
    .create();

  t.truthy(paymentMethod);
  t.truthy(paymentMethod.key);
  paymentMethodVisa = paymentMethod;
});

test("004 - add payment credit visa", async (t) => {
  t.plan(2);

  if (!customerPerson) {
    return;
  }

  const card = new CreditCardData();
  card.number = "5473500000000014";
  card.expMonth = "12";
  card.expYear = "2025";

  const paymentMethod = await customerPerson
    .addPaymentMethod(getIdentifier("CreditMC"), card)
    .create();

  t.truthy(paymentMethod);
  t.truthy(paymentMethod.key);
  paymentMethodMasterCard = paymentMethod;
});

test("005 - add payment check ppd", async (t) => {
  t.plan(2);

  if (!customerPerson) {
    return;
  }

  const check = new ECheck();
  check.accountType = AccountType.Checking;
  check.checkType = CheckType.Personal;
  check.secCode = SecCode.PPD;
  check.routingNumber = "490000018";
  check.driversLicenseNumber = "7418529630";
  check.driversLicenseState = "TX";
  check.accountNumber = "24413815";
  check.birthYear = "1989";

  const paymentMethod = await customerPerson
    .addPaymentMethod(getIdentifier("CheckPPD"), check)
    .create();

  t.truthy(paymentMethod);
  t.truthy(paymentMethod.key);
  paymentMethodCheckPpd = paymentMethod;
});

test("006 - add payment check ccd", async (t) => {
  t.plan(2);

  if (!customerBusiness) {
    return;
  }

  const check = new ECheck();
  check.accountType = AccountType.Checking;
  check.checkType = CheckType.Business;
  check.secCode = SecCode.CCD;
  check.routingNumber = "490000018";
  check.driversLicenseNumber = "7418529630";
  check.driversLicenseState = "TX";
  check.accountNumber = "24413815";
  check.birthYear = "1989";

  const paymentMethod = await customerBusiness
    .addPaymentMethod(getIdentifier("CheckCCD"), check)
    .create();

  t.truthy(paymentMethod);
  t.truthy(paymentMethod.key);
  paymentMethodCheckCcd = paymentMethod;
});

// managed schedule

test("008 - add schedule credit visa", async (t) => {
  t.plan(2);

  if (!paymentMethodVisa) {
    return;
  }

  const schedule = await paymentMethodVisa
    .addSchedule(getIdentifier("CreditV"))
    .withStartDate(new Date(2027, 1, 1))
    .withAmount(30.01)
    .withFrequency(ScheduleFrequency.Weekly)
    .withReprocessingCount(1)
    .withStatus("Active")
    .withEmailReceipt(EmailReceipt.Never)
    .create();

  t.truthy(schedule);
  t.truthy(schedule.key);
  scheduleVisa = schedule;
});

test("009 - add schedule credit mastercard", async (t) => {
  t.plan(2);

  if (!paymentMethodMasterCard) {
    return;
  }

  const schedule = await paymentMethodMasterCard
    .addSchedule(getIdentifier("CreditMC"))
    .withStartDate(new Date(2027, 1, 1))
    .withEndDate(new Date(2027, 3, 1))
    .withAmount(30.02)
    .withFrequency(ScheduleFrequency.Weekly)
    .withReprocessingCount(2)
    .withStatus("Active")
    .withEmailReceipt(EmailReceipt.Never)
    .create();

  t.truthy(schedule);
  t.truthy(schedule.key);
  scheduleMasterCard = schedule;
});

test("010 - add schedule check ppd", async (t) => {
  t.plan(2);

  if (!paymentMethodCheckPpd) {
    return;
  }

  const schedule = await paymentMethodCheckPpd
    .addSchedule(getIdentifier("CheckPPD"))
    .withStartDate(new Date(2027, 1, 1))
    .withAmount(30.03)
    .withFrequency(ScheduleFrequency.Monthly)
    .withReprocessingCount(1)
    .withNumberOfPayments(2)
    .withStatus("Active")
    .withEmailReceipt(EmailReceipt.Never)
    .create();

  t.truthy(schedule);
  t.truthy(schedule.key);
  scheduleCheckPpd = schedule;
});

test("011 - add schedule check ccd", async (t) => {
  t.plan(2);

  if (!paymentMethodCheckCcd) {
    return;
  }

  const schedule = await paymentMethodCheckCcd
    .addSchedule(getIdentifier("CheckCCD"))
    .withStartDate(new Date(2027, 1, 1))
    .withAmount(30.04)
    .withFrequency(ScheduleFrequency.BiWeekly)
    .withReprocessingCount(1)
    .withStatus("Active")
    .withEmailReceipt(EmailReceipt.Never)
    .create();

  t.truthy(schedule);
  t.truthy(schedule.key);
  scheduleCheckCcd = schedule;
});

// recurring billing

test("014 - recurring billing visa", async (t) => {
  t.plan(2);

  if (!paymentMethodVisa || !scheduleVisa) {
    return;
  }

  const response = await paymentMethodVisa
    .charge(20.01)
    .withCurrency("USD")
    .withScheduleId(scheduleVisa.key)
    .withOneTimePayment(false)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("015 - recurring billing mastercard", async (t) => {
  t.plan(2);

  if (!paymentMethodMasterCard || !scheduleMasterCard) {
    return;
  }

  const response = await paymentMethodMasterCard
    .charge(20.02)
    .withCurrency("USD")
    .withScheduleId(scheduleMasterCard.key)
    .withOneTimePayment(false)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("016 - recurring billing check ppd", async (t) => {
  t.plan(2);

  if (!paymentMethodCheckPpd || !scheduleCheckPpd) {
    return;
  }

  const response = await paymentMethodCheckPpd
    .charge(20.03)
    .withCurrency("USD")
    .withScheduleId(scheduleCheckPpd.key)
    .withOneTimePayment(false)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("017 - recurring billing check ccd", async (t) => {
  t.plan(2);

  if (!paymentMethodCheckCcd || !scheduleCheckCcd) {
    return;
  }

  const response = await paymentMethodCheckCcd
    .charge(20.04)
    .withCurrency("USD")
    .withScheduleId(scheduleCheckCcd.key)
    .withOneTimePayment(false)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

// recurring billing - one time

test("018 - recurring billing one time visa", async (t) => {
  t.plan(2);

  if (!paymentMethodVisa) {
    return;
  }

  const response = await paymentMethodVisa.charge(20.06).execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("019 - recurring billing one time mastercard", async (t) => {
  t.plan(2);

  if (!paymentMethodMasterCard) {
    return;
  }

  const response = await paymentMethodMasterCard
    .charge(20.07)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("020 - recurring billing one time check ppd", async (t) => {
  t.plan(2);

  if (!paymentMethodCheckPpd) {
    return;
  }

  const response = await paymentMethodCheckPpd
    .charge(20.08)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("021 - recurring billing one time check ccd", async (t) => {
  t.plan(2);

  if (!paymentMethodCheckCcd) {
    return;
  }

  const response = await paymentMethodCheckCcd
    .charge(20.09)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

// recurring billing - one time - declines

test("022 - recurring billing one time visa decline", async (t) => {
  t.plan(2);

  if (!paymentMethodVisa) {
    return;
  }

  const response = await paymentMethodVisa.charge(10.08).execute();

  t.truthy(response);
  t.is(response.responseCode, "51");
});

test("023 - recurring billing one time check ppd decline", async (t) => {
  t.plan(2);

  if (!paymentMethodCheckPpd) {
    return;
  }

  const response = await paymentMethodCheckPpd
    .charge(25.02)
    .withCurrency("USD")
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test.after("999 - close batch", (t) => {
  t.plan(1);

  return new Promise((resolve, reject) => {
    BatchService.closeBatch()
      .then((response) => {
        t.truthy(response);
        resolve();
      })
      .catch((e: Error) => {
        if (
          e.message.indexOf(BATCH_NOT_OPEN) !== -1 ||
          e.message.indexOf(BATCH_EMPTY) !== -1
        ) {
          t.pass();
          resolve();
          return;
        }
        reject(e);
      });
  });
});
