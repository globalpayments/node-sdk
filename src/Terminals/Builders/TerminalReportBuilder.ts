import { ITerminalReport, ServicesContainer } from "../../../src";
import { BaseBuilder } from "../../Builders/BaseBuilder";
import { TerminalReportType } from "../Enums";
import { UpaSearchCriteria } from "../UPA/Entities/UpaSearchCriteria";

export class TerminalReportBuilder<
  T extends ITerminalReport = ITerminalReport,
> extends BaseBuilder<T> {
  public reportType: TerminalReportType;
  public ecrId?: string;
  public batch?: string;
  public reportOutput?: string;
  public background?: string;
  public printReportType?: string;

  // === TYP Report Extra Fields (AH-2327) ===
  /** Summary or Detail report selector (see UpaReportType). */
  public reportTypeValue?: string;
  /** Report sub-type filter (e.g. TYP, Discount, TYPandDiscount). */
  public reportSubType?: string;
  /** Request both Summary and Detail reports in a single response. */
  public bothReports?: boolean;
  /** Restrict report to a specific clerk id. */
  public clerkId?: string;
  /** Request the previous batch report instead of the current one. */
  public previousBatchReport?: boolean;

  constructor(reportType: TerminalReportType) {
    super();
    this.reportType = reportType;
  }

  protected setupValidations(): void {
    // UPA report requests do not currently require builder-level validation.
  }

  public where(criteria: UpaSearchCriteria, value: unknown): this {
    return this.and(criteria, value);
  }

  public and(criteria: UpaSearchCriteria, value: unknown): this {
    if (value === undefined || value === null) {
      return this;
    }

    switch (criteria) {
      case UpaSearchCriteria.EcrId:
        this.ecrId = value.toString();
        break;
      case UpaSearchCriteria.Batch:
        this.batch = value.toString();
        break;
      case UpaSearchCriteria.ReportOutput:
        this.reportOutput = value.toString();
        break;
      case UpaSearchCriteria.ReportType:
        this.reportTypeValue = value.toString();
        break;
      case UpaSearchCriteria.ReportSubType:
        this.reportSubType = value.toString();
        break;
      case UpaSearchCriteria.BothReports:
        this.bothReports = Boolean(value);
        break;
      case UpaSearchCriteria.ClerkId:
        this.clerkId = value.toString();
        break;
      case UpaSearchCriteria.PreviousBatchReport:
        this.previousBatchReport = Boolean(value);
      case UpaSearchCriteria.Background:
        this.background = value.toString();
        break;
      case UpaSearchCriteria.PrintReportType:
        this.printReportType = value.toString();
        break;
      default:
        break;
    }

    return this;
  }

  public execute(configName: string = "default"): Promise<T> {
    super.execute();
    return ServicesContainer.instance()
      .getDeviceController(configName)
      .processReport(this) as Promise<T>;
  }
}
