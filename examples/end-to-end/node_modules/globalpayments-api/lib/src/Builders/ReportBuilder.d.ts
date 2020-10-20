import { ReportType, TimeZoneConversion } from "../";
import { BaseBuilder } from "./BaseBuilder";
export declare abstract class ReportBuilder<T> extends BaseBuilder<T> {
    reportType: ReportType;
    timeZoneConversion: TimeZoneConversion;
    constructor(type: ReportType);
    execute(): Promise<T>;
}
