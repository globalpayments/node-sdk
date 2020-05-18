import { ReportType } from "../";
import { ReportBuilder } from "./ReportBuilder";

export class BatchHistoryReportBuilder<T> extends ReportBuilder<T> {
  public endDate: Date;
  public startDate: Date;

  public setupValidations() {
    this.validations
      .of("reportType", ReportType.BatchHistory)
      .check("startDate")
      .isNotNull()
      .check("endDate")
      .isNotNull();
  }

  public withEndDate(endDate?: Date) {
    if (endDate !== undefined) {
      this.endDate = endDate;
    }
    return this;
  }

  public withStartDate(startDate?: Date) {
    if (startDate !== undefined) {
      this.startDate = startDate;
    }
    return this;
  }
}
