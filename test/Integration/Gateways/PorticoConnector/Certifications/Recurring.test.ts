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
  PorticoConfig,
  RecurringPaymentMethod,
  Schedule,
  ScheduleFrequency,
  SecCode,
  ServicesContainer,
  StringUtils,
} from "../../../../../src";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MbPdAQBL1l4A2ThZoTBKXEdEG1rIi7KAa6Yskl9Nzg";

const BATCH_NOT_OPEN =
  "Transaction was rejected because it requires a batch to be open.";
const BATCH_EMPTY =
  "Batch close was rejected because no transactions are associated with the currently open batch";

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

beforeAll(() => {
  ServicesContainer.configureService(config);
});

beforeAll(() => {
  return new Promise<void>((resolve, reject) => {
    BatchService.closeBatch()
      .then((response) => {
        expect(response).toBeTruthy();
        resolve();
      })
      .catch((e: Error) => {
        if (
          e.message.indexOf(BATCH_NOT_OPEN) !== -1 ||
          e.message.indexOf(BATCH_EMPTY) !== -1
        ) {
          resolve();
          return;
        }
        reject(e);
      });
  });
});

beforeAll(async () => {
  try {
    const results = await Schedule.findAll();
    for (const result in results) {
      if (results.hasOwnProperty(result)) {
        const schedule: Schedule = (results as any)[result];
        await schedule.delete("default");
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
        await paymentMethod.delete("default");
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
        await customer.delete("default");
      }
    }
  } catch (_e) {
    //
  }
});

describe("Recurring Test Suite", () => {
  // customer setup

  test("001 - add customer person", async () => {
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

    expect(customer).toBeTruthy();
    expect(customer.key).toBeTruthy();
    customerPerson = customer;
  });

  test("002 - add customer person", async () => {
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

    expect(customer).toBeTruthy();
    expect(customer.key).toBeTruthy();
    customerBusiness = customer;
  });

  // payment method setup

  test("003 - add payment credit visa", async () => {
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

    expect(paymentMethod).toBeTruthy();
    expect(paymentMethod.key).toBeTruthy();
    paymentMethodVisa = paymentMethod;
  });

  test("004 - add payment credit visa", async () => {
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

    expect(paymentMethod).toBeTruthy();
    expect(paymentMethod.key).toBeTruthy();
    paymentMethodMasterCard = paymentMethod;
  });

  test("005 - add payment check ppd", async () => {
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

    expect(paymentMethod).toBeTruthy();
    expect(paymentMethod.key).toBeTruthy();
    paymentMethodCheckPpd = paymentMethod;
  });

  test("006 - add payment check ccd", async () => {
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

    expect(paymentMethod).toBeTruthy();
    expect(paymentMethod.key).toBeTruthy();
    paymentMethodCheckCcd = paymentMethod;
  });

  // managed schedule

  test("008 - add schedule credit visa", async () => {
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

    expect(schedule).toBeTruthy();
    expect(schedule.key).toBeTruthy();
    scheduleVisa = schedule;
  });

  test("009 - add schedule credit mastercard", async () => {
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

    expect(schedule).toBeTruthy();
    expect(schedule.key).toBeTruthy();
    scheduleMasterCard = schedule;
  });

  test("010 - add schedule check ppd", async () => {
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

    expect(schedule).toBeTruthy();
    expect(schedule.key).toBeTruthy();
    scheduleCheckPpd = schedule;
  });

  test("011 - add schedule check ccd", async () => {
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

    expect(schedule).toBeTruthy();
    expect(schedule.key).toBeTruthy();
    scheduleCheckCcd = schedule;
  });

  // recurring billing

  test("014 - recurring billing visa", async () => {
    if (!paymentMethodVisa || !scheduleVisa) {
      return;
    }

    const response = await paymentMethodVisa
      .charge(20.01)
      .withCurrency("USD")
      .withScheduleId(scheduleVisa.key)
      .withOneTimePayment(false)
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  test("015 - recurring billing mastercard", async () => {
    if (!paymentMethodMasterCard || !scheduleMasterCard) {
      return;
    }

    const response = await paymentMethodMasterCard
      .charge(20.02)
      .withCurrency("USD")
      .withScheduleId(scheduleMasterCard.key)
      .withOneTimePayment(false)
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  // TBD - odd behaviour with applicationb below
  test.skip("016 - recurring billing check ppd", async () => {
    if (!paymentMethodCheckPpd || !scheduleCheckPpd) {
      return;
    }

    const response = await paymentMethodCheckPpd
      .charge(20.03)
      .withCurrency("USD")
      .withScheduleId(scheduleVisa?.key)
      .withOneTimePayment(false)
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  test.skip("017 - recurring billing check ccd", async () => {
    if (!paymentMethodCheckCcd || !scheduleCheckCcd) {
      return;
    }

    const response = await paymentMethodCheckCcd
      .charge(20.04)
      .withCurrency("USD")
      .withScheduleId(scheduleVisa?.key)
      .withOneTimePayment(false)
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  // recurring billing - one time

  test("018 - recurring billing one time visa", async () => {
    if (!paymentMethodVisa) {
      return;
    }

    const response = await paymentMethodVisa.charge(20.06).execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  test("019 - recurring billing one time mastercard", async () => {
    if (!paymentMethodMasterCard) {
      return;
    }

    const response = await paymentMethodMasterCard
      .charge(20.07)
      .withCurrency("USD")
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  test.skip("020 - recurring billing one time check ppd", async () => {
    if (!paymentMethodCheckPpd) {
      return;
    }

    const response = await paymentMethodCheckPpd
      .charge(20.08)
      .withCurrency("USD")
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  test.skip("021 - recurring billing one time check ccd", async () => {
    if (!paymentMethodCheckCcd) {
      return;
    }

    const response = await paymentMethodCheckCcd
      .charge(20.09)
      .withCurrency("USD")
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });

  // recurring billing - one time - declines

  test("022 - recurring billing one time visa decline", async () => {
    if (!paymentMethodVisa) {
      return;
    }

    const response = await paymentMethodVisa.charge(10.08).execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("51");
  });

  test.skip("023 - recurring billing one time check ppd decline", async () => {
    if (!paymentMethodCheckPpd) {
      return;
    }

    const response = await paymentMethodCheckPpd
      .charge(25.02)
      .withCurrency("USD")
      .execute();

    expect(response).toBeTruthy();
    expect(response.responseCode).toBe("00");
  });
});
afterAll(() => {
  return new Promise<void>((resolve, reject) => {
    BatchService.closeBatch()
      .then((response) => {
        expect(response).toBeTruthy();
        resolve();
      })
      .catch((e: Error) => {
        if (
          e.message.indexOf(BATCH_NOT_OPEN) !== -1 ||
          e.message.indexOf(BATCH_EMPTY) !== -1
        ) {
          resolve();
          return;
        }
        reject(e);
      });
  });
});
