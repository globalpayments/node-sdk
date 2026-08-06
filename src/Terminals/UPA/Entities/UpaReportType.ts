/**
 * Determines the type of batch report to be printed by the UPA device.
 * Maps to the `reportType` parameter in the GetBatchDetails command.
 *
 */
export enum UpaReportType {
  /** Prints a summary report. */
  Summary = "summary",
  /** Prints a detailed report. */
  Detail = "detail",
}
