import { ReportType, ServicesContainer, TimeZoneConversion } from "../";
import { BaseBuilder } from "./BaseBuilder";

export abstract class ReportBuilder<T> extends BaseBuilder<T> {
  public reportType: ReportType;
  public timeZoneConversion: TimeZoneConversion;

  public constructor(type: ReportType) {
    super();
    this.reportType = type;
  }

  public execute(configName: string = "default"): Promise<T> {
    super.execute();
    return ServicesContainer.instance()
      .getClient(configName)
      .processReport(this);
  }
}
