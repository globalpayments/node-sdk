import {
  AccountType,
  Address,
  CheckType,
  Credit,
  Customer,
  ECheck,
  ICardData,
  IEncryptable,
  IPaymentMethod,
  IRecurringEntity,
  IRecurringService,
  ITokenizable,
  ITrackData,
  PaymentMethod,
  PaymentSchedule,
  RecurringBuilder,
  RecurringPaymentMethod,
  Schedule,
  SecCode,
  StringUtils,
  TransactionType,
  UnsupportedTransactionError,
} from "../";
import { RestGateway } from "./RestGateway";

export class PayPlanConnector extends RestGateway implements IRecurringService {
  public supportsRetrieval = true;
  public supportsUpdatePaymentDetails = false;
  private _secretApiKey: string;

  get secretApiKey() {
    return this._secretApiKey;
  }

  set secretApiKey(value: string) {
    this._secretApiKey = value;
    const buffer = new Buffer(value);
    const auth = `Basic ${buffer.toString("base64")}`;
    this.headers[RestGateway.AUTHORIZATION_HEADER] = auth;
  }

  public processRecurring<T extends IRecurringEntity>(
    builder: RecurringBuilder<T>,
  ): Promise<T> {
    let request = new Object();
    // todo
    if (
      builder.transactionType === TransactionType.Create ||
      builder.transactionType === TransactionType.Edit
    ) {
      if (builder.entity instanceof Customer) {
        request = this.buildCustomer(request, builder.entity);
      }

      if (builder.entity instanceof RecurringPaymentMethod) {
        request = this.buildPaymentMethod(
          request,
          builder.entity,
          builder.transactionType,
        );
      }

      if (builder.entity instanceof Schedule) {
        request = this.buildSchedule(
          request,
          builder.entity,
          builder.transactionType,
        );
      }
    } else if (builder.transactionType === TransactionType.Search) {
      for (const entry in builder.searchCriteria) {
        if (builder.searchCriteria.hasOwnProperty(entry)) {
          (request as any)[entry] = builder.searchCriteria[entry];
        }
      }
    }

    return this.doTransaction(
      this.mapMethod(builder.transactionType),
      this.mapUrl(builder),
      JSON.stringify(request),
    ).then((response) => this.mapResponse<T>(builder, response));
  }

  protected mapResponse<T extends IRecurringEntity>(
    builder: RecurringBuilder<T>,
    rawResponse: string,
  ): T {
    if (!rawResponse) {
      return new Object() as T;
    }

    const response = JSON.parse(rawResponse);
    let result: any;

    if (
      builder.entity instanceof Customer &&
      builder.transactionType === TransactionType.Search
    ) {
      result = response.results.map((customer: object) =>
        this.hydrateCustomer(customer),
      );
    } else if (builder.entity instanceof Customer) {
      result = this.hydrateCustomer(response);
    }

    if (
      builder.entity instanceof RecurringPaymentMethod &&
      builder.transactionType === TransactionType.Search
    ) {
      result = response.results.map((paymentMethod: object) =>
        this.hydrateRecurringPaymentMethod(paymentMethod),
      );
    } else if (builder.entity instanceof RecurringPaymentMethod) {
      result = this.hydrateRecurringPaymentMethod(response);
    }

    if (
      builder.entity instanceof Schedule &&
      builder.transactionType === TransactionType.Search
    ) {
      result = response.results.map((schedule: object) =>
        this.hydrateSchedule(schedule),
      );
    } else if (builder.entity instanceof Schedule) {
      result = this.hydrateSchedule(response);
    }

    return result as T;
  }

  protected buildCustomer(request: any, entity: Customer) {
    if (entity) {
      request.customerIdentifier = entity.id;
      request.firstName = entity.firstName;
      request.lastName = entity.lastName;
      request.company = entity.company;
      request.customerStatus = entity.status;
      request.primaryEmail = entity.email;
      request.phoneDay = entity.homePhone;
      request.phoneEvening = entity.workPhone;
      request.phoneMobile = entity.mobilePhone;
      request.fax = entity.fax;
      request.title = entity.title;
      request.department = entity.department;
      request = this.buildAddress(request, entity.address);
    }

    return request;
  }

  protected buildPaymentMethod(
    request: any,
    entity: RecurringPaymentMethod,
    transactionType: TransactionType,
  ) {
    if (entity) {
      request.preferredPayment = entity.preferredPayment;
      request.paymentMethodIdentifier = entity.id;
      request.customerKey = entity.customerKey;
      request.nameOnAccount = entity.nameOnAccount;
      request = this.buildAddress(request, entity.address);

      if (transactionType === TransactionType.Create) {
        const { hasToken, tokenValue } = this.hasToken(entity.paymentMethod);
        const paymentInfo: any = {};
        if ((entity.paymentMethod as PaymentMethod).isCardData) {
          const method = (entity.paymentMethod as any) as ICardData;
          paymentInfo.type = hasToken ? "SINGLEUSETOKEN" : null;
          paymentInfo[hasToken ? "token" : "number"] = hasToken
            ? tokenValue
            : method.number;
          paymentInfo.expMon = method.expMonth;
          paymentInfo.expYear = method.expYear;
          request.cardVerificationValue = method.cvn;
          request[hasToken ? "alternateIdentity" : "card"] = paymentInfo;
        } else if ((entity.paymentMethod as PaymentMethod).isTrackData) {
          const method = (entity.paymentMethod as any) as ITrackData;
          paymentInfo.data = method.value;
          paymentInfo.dataEntryMode = method.entryMethod
            .toString()
            .toUpperCase();
          request.track = paymentInfo;
        } else if (entity.paymentMethod instanceof ECheck) {
          const check = entity.paymentMethod;
          request.achType = this.prepareAccountType(check.accountType);
          request.accountType = this.prepareCheckType(check.checkType);
          request.telephoneIndicator =
            check.secCode === SecCode.CCD || check.SecCode === SecCode.PPD
              ? false
              : true;
          request.routingNumber = check.routingNumber;
          request.accountNumber = check.accountNumber;
          request.accountHolderYob = check.birthYear.toString();
          request.driversLicenseState = check.driversLicenseState;
          request.driversLicenseNumber = check.driversLicenseNumber;
          request.socialSecurityNumberLast4 = check.ssnLast4;
          delete request.country;
        }

        if ((entity.paymentMethod as PaymentMethod).isEncryptable) {
          const enc = ((entity.paymentMethod as any) as IEncryptable)
            .encryptionData;
          if (enc) {
            paymentInfo.trackNumber = enc.trackNumber;
            paymentInfo.key = enc.ktb;
            paymentInfo.encryptionType = "E3";
          }
        }
      } else {
        // edit fields
        delete request.customerKey;
        request.paymentStatus = entity.status;
        request.cpcTaxType = entity.taxType;
        request.expirationDate = entity.expirationDate;
      }
    }

    return request;
  }

  protected buildSchedule(
    request: any,
    entity: Schedule,
    transactionType: TransactionType,
  ) {
    const mapDuration = () => {
      if (entity.numberOfPayments) {
        return "Limited Number";
      } else if (entity.endDate) {
        return "End Date";
      } else {
        return "Ongoing";
      }
    };

    const mapProcessingDate = () => {
      const frequencies = [
        "Monthly",
        "Bi-Monthly",
        "Quarterly",
        "Semi-Annually",
      ];
      if (
        entity.frequency &&
        frequencies.indexOf(entity.frequency.toString()) !== -1
      ) {
        switch (entity.paymentSchedule) {
          case PaymentSchedule.FirstDayOfTheMonth:
            return "First";
          case PaymentSchedule.LastDayOfTheMonth:
            return "Last";
          default:
            const day = entity.startDate.getUTCDate();
            if (day > 28) {
              return "Last";
            }
            return day.toString();
        }
      } else if (
        entity.frequency &&
        entity.frequency.toString() === "Semi-Monthly"
      ) {
        if (entity.paymentSchedule === PaymentSchedule.LastDayOfTheMonth) {
          return "Last";
        }
        return "First";
      }

      return null;
    };

    if (entity) {
      request.scheduleIdentifier = entity.id;
      request.scheduleName = entity.name;
      request.scheduleStatus = entity.status;
      request.paymentMethodKey = entity.paymentKey;

      request = this.buildAmount(
        request,
        "subtotalAmount",
        entity.amount,
        entity.currency,
        transactionType,
      );
      request = this.buildAmount(
        request,
        "taxAmount",
        entity.taxAmount,
        entity.currency,
        transactionType,
      );

      request.deviceId = entity.deviceId;
      request.processingDateInfo = mapProcessingDate();
      request = this.buildDate(
        request,
        "endDate",
        entity.endDate,
        transactionType === TransactionType.Edit,
      );
      request.reprocessingCount = entity.reprocessingCount || 3;
      if (entity.emailReceipt) {
        request.emailReceipt = entity.emailReceipt.toString();
      }
      request.emailAdvanceNotice = entity.emailNotification ? "Yes" : "No";
      // debt repay ind
      request.invoiceNbr = entity.invoiceNumber;
      request.poNumber = entity.poNumber;
      request.description = entity.description;
      request.numberOfPayments = entity.numberOfPayments;

      if (transactionType === TransactionType.Create) {
        request.customerKey = entity.customerKey;
        request = this.buildDate(request, "startDate", entity.startDate);
        if (entity.frequency) {
          request.frequency = entity.frequency.toString();
        }
        request.duration = mapDuration();
      } else {
        // edit Fields
        if (!entity.hasStarted) {
          request = this.buildDate(request, "startDate", entity.startDate);
          if (entity.frequency) {
            request.frequency = entity.frequency.toString();
          }
          request.duration = mapDuration();
        } else {
          request = this.buildDate(
            request,
            "cancellationDate",
            entity.cancellationDate,
          );
          request = this.buildDate(
            request,
            "nextProcressingDate",
            entity.nextProcessingDate,
          );
        }
      }
    }

    return request;
  }

  protected prepareAccountType(type: AccountType) {
    switch (type) {
      case AccountType.Savings:
        return "Savings";
      case AccountType.Checking:
      default:
        return "Checking";
    }
  }

  protected prepareCheckType(type: CheckType) {
    switch (type) {
      case CheckType.Business:
        return "Business";
      case CheckType.Payroll:
        return "Payroll";
      case CheckType.Personal:
      default:
        return "Personal";
    }
  }

  protected buildAddress(request: any, address: Address) {
    if (address) {
      request.addressLine1 = address.streetAddress1;
      request.addressLine2 = address.streetAddress2;
      request.city = address.city;
      request.country = address.country;
      request.stateProvince = address.state;
      request.zipPostalCode = address.postalCode;
    }

    return request;
  }

  protected buildAmount(
    request: any,
    name: string,
    amount: number | string,
    currency: string,
    transactionType: TransactionType,
  ) {
    if (amount) {
      request[name] = {
        value: parseFloat(amount.toString()) * 100,
      } as any;
      if (transactionType === TransactionType.Create) {
        request[name].currency = currency;
      }
    }

    return request;
  }

  protected buildDate(request: any, name: string, date: Date, force = false) {
    const getDateValue = (d: Date) => {
      const day = StringUtils.leftPad(d.getUTCDate().toString(), 2, "0");
      const month = StringUtils.leftPad(
        (d.getUTCMonth() + 1).toString(),
        2,
        "0",
      );
      const year = StringUtils.leftPad(d.getUTCFullYear().toString(), 4, "0");
      return month + day + year;
    };

    if (date || force) {
      const value = date ? getDateValue(date) : null;
      request[name] = value;
    }
    return request;
  }

  protected mapMethod(transactionType: TransactionType) {
    switch (transactionType) {
      case TransactionType.Create:
      case TransactionType.Search:
        return "POST";
      case TransactionType.Edit:
        return "PUT";
      case TransactionType.Delete:
        return "DELETE";
      default:
        return "GET";
    }
  }

  protected mapUrl<T extends IRecurringEntity>(builder: RecurringBuilder<T>) {
    let suffix = "";
    if (
      builder.transactionType === TransactionType.Fetch ||
      builder.transactionType === TransactionType.Delete ||
      builder.transactionType === TransactionType.Edit
    ) {
      suffix = "/" + builder.entity.key;
    }

    if (builder.entity instanceof Customer) {
      return (
        (builder.transactionType === TransactionType.Search
          ? "searchCustomers"
          : "customers") + suffix
      );
    }

    if (builder.entity instanceof RecurringPaymentMethod) {
      let paymentMethod = "";
      if (builder.transactionType === TransactionType.Create) {
        paymentMethod =
          builder.entity.paymentMethod instanceof Credit ? "CreditCard" : "ACH";
      } else if (builder.transactionType === TransactionType.Edit) {
        paymentMethod = builder.entity.paymentType.replace(" ", "");
      }

      return (
        (builder.transactionType === TransactionType.Search
          ? "searchPaymentMethods"
          : "paymentMethods") +
        paymentMethod +
        suffix
      );
    }

    if (builder.entity instanceof Schedule) {
      return (
        (builder.transactionType === TransactionType.Search
          ? "searchSchedules"
          : "schedules") + suffix
      );
    }

    throw new UnsupportedTransactionError();
  }

  protected hydrateCustomer(response: any): Customer {
    const customer = new Customer();
    customer.key = response.customerKey;
    customer.id = response.customerIdentifier;
    customer.firstName = response.firstName;
    customer.lastName = response.lastName;
    customer.company = response.company;
    customer.status = response.customerStatus;
    customer.title = response.title;
    customer.department = response.department;
    customer.email = response.primaryEmail;
    customer.homePhone = response.phoneDay;
    customer.workPhone = response.phoneEvening;
    customer.mobilePhone = response.phoneMobile;
    customer.fax = response.fax;
    customer.address = new Address();
    customer.address.streetAddress1 = response.addressLine1;
    customer.address.streetAddress2 = response.addressLine2;
    customer.address.city = response.city;
    customer.address.province = response.stateProvince;
    customer.address.postalCode = response.zipPostalCode;
    customer.address.country = response.country;
    return customer;
  }

  protected hydrateRecurringPaymentMethod(
    response: any,
  ): RecurringPaymentMethod {
    const paymentMethod = new RecurringPaymentMethod();
    paymentMethod.key = response.paymentMethodKey;
    paymentMethod.paymentType = response.paymentMethodType;
    paymentMethod.preferredPayment = response.preferredPayment as boolean;
    paymentMethod.status = response.paymentStatus;
    paymentMethod.id = response.paymentMethodIdentifier;
    paymentMethod.customerKey = response.customerKey;
    paymentMethod.nameOnAccount = response.nameOnAccount;
    paymentMethod.commercialIndicator = response.cpcInd;
    paymentMethod.taxType = response.cpcTaxType;
    paymentMethod.expirationDate = response.expirationDate;
    paymentMethod.address = new Address();
    paymentMethod.address.streetAddress1 = response.addressLine1;
    paymentMethod.address.streetAddress2 = response.addressLine2;
    paymentMethod.address.city = response.city;
    paymentMethod.address.state = response.stateProvince;
    paymentMethod.address.postalCode = response.zipPostalCode;
    paymentMethod.address.country = response.country;
    return paymentMethod;
  }

  protected hydrateSchedule(response: any): Schedule {
    const schedule = new Schedule();
    schedule.key = response.scheduleKey;
    schedule.id = response.scheduleIdentifier;
    schedule.customerKey = response.customerKey;
    schedule.name = response.scheduleName;
    schedule.status = response.scheduleStatus;
    schedule.paymentKey = response.paymentMethodKey;

    if (response.subtotalAmount) {
      const subtotal = response.subtotalAmount;
      schedule.amount = subtotal.value;
      schedule.currency = subtotal.currency;
    }

    if (response.taxAmount) {
      const taxAmount = response.taxAmount;
      schedule.taxAmount = taxAmount.value;
    }

    schedule.deviceId = response.deviceId;
    schedule.startDate = new Date(response.startDate);
    schedule.paymentSchedule = ((value: string) => {
      switch (value) {
        case "Last":
          return PaymentSchedule.LastDayOfTheMonth;
        case "First":
          return PaymentSchedule.FirstDayOfTheMonth;
        default:
          return PaymentSchedule.Dynamic;
      }
    })(response.processingDateInfo);
    schedule.frequency = response.frequency;
    schedule.endDate = new Date(response.endDate);
    schedule.reprocessingCount = response.reprocessingCount;
    schedule.emailReceipt = response.emailReceipt;
    schedule.emailNotification = ((value: string) => {
      if (!value) {
        return false;
      }
      return value === "No" ? false : true;
    })(response.emailNotification);
    // dept repay indicator
    schedule.invoiceNumber = response.invoiceNbr;
    schedule.poNumber = response.poNumber;
    schedule.description = response.description;
    // statusSetDate
    schedule.nextProcessingDate = new Date(response.nextProcessingDate);
    // previousProcessingDate
    // approvedTransactionCount
    // failureCount
    // totalApprovedAmountToDate
    // numberOfPaymentsRemaining
    schedule.cancellationDate = new Date(response.cancellationDate);
    // creationDate
    // lastChangeDate
    schedule.hasStarted = response.scheduleStarted as boolean;
    return schedule;
  }

  protected hasToken(paymentMethod: IPaymentMethod) {
    const tokenizable = (paymentMethod as any) as ITokenizable;

    if (tokenizable.token) {
      return {
        hasToken: true,
        tokenValue: tokenizable.token,
      };
    }

    return {
      hasToken: false,
      tokenValue: "",
    };
  }
}
