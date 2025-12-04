import {
  ReportType,
  SearchCriteriaBuilder,
  ServicesContainer,
  TimeZoneConversion,
} from "../";
import { BaseBuilder } from "./BaseBuilder";

export abstract class ReportBuilder<T> extends BaseBuilder<T> {
  public reportType: ReportType;
  public timeZoneConversion: TimeZoneConversion;
  public searchBuilder: SearchCriteriaBuilder<T>;

  public constructor(type: ReportType) {
    super();
    this.reportType = type;
  }

  public execute(configName: string = "default"): Promise<T> {
    super.execute();
    return ServicesContainer.instance()
      .getClient(configName)
      .processReport<T>(this);
  }

  withPaging(page: number, pageSize: number) {
    this.page = page;
    this.pageSize = pageSize;

    return this;
  }

  public withTransactionId(value?: string) {
    if (!this.searchBuilder) {
      this.searchBuilder = new SearchCriteriaBuilder<T>(this as any);
    }
    this.searchBuilder.transactionId = value;
    return this;
  }

  public withBatchId(value?: string) {
    if (!this.searchBuilder) {
      this.searchBuilder = new SearchCriteriaBuilder<T>(this as any);
    }
    this.searchBuilder.batchId = value;
    return this;
  }

  public withStartDate(value?: Date) {
    if (!this.searchBuilder) {
      this.searchBuilder = new SearchCriteriaBuilder<T>(this as any);
    }
    this.searchBuilder.startDate = value;
    return this;
  }

  public withEndDate(value?: Date) {
    if (!this.searchBuilder) {
      this.searchBuilder = new SearchCriteriaBuilder<T>(this as any);
    }
    this.searchBuilder.endDate = value;
    return this;
  }
}
