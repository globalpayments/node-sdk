import { EmailReceipt, PaymentSchedule, ScheduleFrequency } from "../";
import { RecurringEntity } from "./";

export class Schedule extends RecurringEntity<Schedule> {
  /// <summary>
  /// The schedule's amount
  /// </summary>
  public amount: number | string;

  /// <summary>
  /// The date/time the schedule was cancelled.
  /// </summary>
  public cancellationDate: Date;

  /// <summary>
  /// The schedule's currency.
  /// </summary>
  public currency: string;

  /// <summary>
  /// The identifier of the customer associated
  /// with the schedule.
  /// </summary>
  public customerKey: string;

  /// <summary>
  /// The description of the schedule.
  /// </summary>
  public description: string;

  /// <summary>
  /// The device ID associated with a schedule's
  /// transactions.
  /// </summary>
  public deviceId: number | string;

  /// <summary>
  /// Indicates if email notifications should be sent.
  /// </summary>
  public emailNotification: boolean;

  /// <summary>
  /// Indicates when email notifications should be sent.
  /// </summary>
  public emailReceipt: EmailReceipt;

  /// <summary>
  /// The end date of a schedule, if any.
  /// </summary>
  public endDate: Date;

  /// <summary>
  /// The schedule's frequency.
  /// </summary>
  /// <seealso>ScheduleFrequency</seealso>
  public frequency: ScheduleFrequency;

  /// <summary>
  /// Indicates if the schedule has started processing.
  /// </summary>
  public hasStarted: boolean;

  /// <summary>
  /// The invoice number associated with the schedule.
  /// </summary>
  public invoiceNumber: string;

  /// <summary>
  /// The schedule's name.
  /// </summary>
  public name: string;

  /// <summary>
  /// The date/time when the schedule should process next.
  /// </summary>
  public nextProcessingDate: Date;

  /// <summary>
  /// The number of payments made to date on the schedule.
  /// </summary>
  public numberOfPayments: number | string;

  /// <summary>
  /// The purchase order (PO) number associated with the schedule.
  /// </summary>
  public poNumber: string;

  /// <summary>
  /// The identifier of the payment method associated with
  /// the schedule.
  /// </summary>
  public paymentKey: string;

  /// <summary>
  /// Indicates when in the month a recurring schedule should run.
  /// </summary>
  public paymentSchedule: PaymentSchedule;

  /// <summary>
  /// The number of times a failed schedule payment should be
  /// reprocessed.
  /// </summary>
  public reprocessingCount: number | string;

  /// <summary>
  /// The start date of a schedule.
  /// </summary>
  public startDate: Date;

  /// <summary>
  /// The schedule's status.
  /// </summary>
  public status: string;

  /// <summary>
  /// The schedule's tax amount.
  /// </summary>
  public taxAmount: number | string;

  /// <summary>
  /// The total amount for the schedule (`Amount` + `TaxAmount`).
  /// </summary>
  public get totalAmount() {
    return (
      parseFloat(this.amount.toString()) + parseFloat(this.taxAmount.toString())
    );
  }

  public constructor(customerKey?: string, paymentKey?: string) {
    super();
    if (customerKey) {
      this.customerKey = customerKey;
    }
    if (paymentKey) {
      this.paymentKey = paymentKey;
    }
  }

  /// <summary>
  /// Sets the schedule's amount.
  /// </summary>
  /// <param name="value">The amount</param>
  /// <returns>Schedule</returns>
  public withAmount(value?: number | string) {
    if (value) {
      this.amount = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's currency.
  /// </summary>
  /// <param name="value">The currency</param>
  /// <returns>Schedule</returns>
  public withCurrency(value?: string) {
    if (value) {
      this.currency = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's customer.
  /// </summary>
  /// <param name="value">The customer's key</param>
  /// <returns>Schedule</returns>
  public withCustomerKey(value?: string) {
    if (value) {
      this.customerKey = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's description.
  /// </summary>
  /// <param name="value">The description</param>
  /// <returns>Schedule</returns>
  public withDescription(value?: string) {
    if (value) {
      this.description = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's device ID.
  /// </summary>
  /// <param name="value">The device ID</param>
  /// <returns>Schedule</returns>
  public withDeviceId(value?: number | string) {
    if (value) {
      this.deviceId = value;
    }
    return this;
  }

  /// <summary>
  /// Sets whether the schedule should send email notifications.
  /// </summary>
  /// <param name="value">The email notification flag</param>
  /// <returns>Schedule</returns>
  public withEmailNotification(value?: boolean) {
    if (value) {
      this.emailNotification = value;
    }
    return this;
  }

  /// <summary>
  /// Sets when the schedule should email receipts.
  /// </summary>
  /// <param name="value">When the schedule should email receipts</param>
  /// <returns>Schedule</returns>
  public withEmailReceipt(value?: EmailReceipt) {
    if (value) {
      this.emailReceipt = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's end date.
  /// </summary>
  /// <param name="value">The end date</param>
  /// <returns>Schedule</returns>
  public withEndDate(value?: Date) {
    if (value) {
      this.endDate = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's frequency.
  /// </summary>
  /// <param name="value">The frequency</param>
  /// <returns>Schedule</returns>
  public withFrequency(value?: ScheduleFrequency) {
    if (value) {
      this.frequency = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's invoice number.
  /// </summary>
  /// <param name="value">The invoice number</param>
  /// <returns>Schedule</returns>
  public withInvoiceNumber(value?: string) {
    if (value) {
      this.invoiceNumber = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's name.
  /// </summary>
  /// <param name="value">The name</param>
  /// <returns>Schedule</returns>
  public withName(value?: string) {
    if (value) {
      this.name = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's number of payments.
  /// </summary>
  /// <param name="value">The number of payments</param>
  /// <returns>Schedule</returns>
  public withNumberOfPayments(value?: number | string) {
    if (value) {
      this.numberOfPayments = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's purchase order (PO) number.
  /// </summary>
  /// <param name="value">The purchase order (PO) number</param>
  /// <returns>Schedule</returns>
  public withPoNumber(value?: string) {
    if (value) {
      this.poNumber = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's payment method.
  /// </summary>
  /// <param name="value">The payment method's key</param>
  /// <returns>Schedule</returns>
  public withPaymentKey(value?: string) {
    if (value) {
      this.paymentKey = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's recurring schedule.
  /// </summary>
  /// <param name="value">The recurring schedule</param>
  /// <returns>Schedule</returns>
  public withPaymentSchedule(value?: PaymentSchedule) {
    if (value) {
      this.paymentSchedule = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's reprocessing count.
  /// </summary>
  /// <param name="value">The reprocessing count</param>
  /// <returns>Schedule</returns>
  public withReprocessingCount(value?: number | string) {
    if (value) {
      this.reprocessingCount = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's start date.
  /// </summary>
  /// <param name="value">The start date</param>
  /// <returns>Schedule</returns>
  public withStartDate(value?: Date) {
    if (value) {
      this.startDate = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's status.
  /// </summary>
  /// <param name="value">The new status</param>
  /// <returns>Schedule</returns>
  public withStatus(value?: string) {
    if (value) {
      this.status = value;
    }
    return this;
  }

  /// <summary>
  /// Sets the schedule's tax amount.
  /// </summary>
  /// <param name="value">The tax amount</param>
  /// <returns>Schedule</returns>
  public withTaxAmount(value?: number | string) {
    if (value) {
      this.taxAmount = value;
    }
    return this;
  }
}
