/**
 * Determines the filter applied when printing UPA batch reports.
 * Maps to the `reportSubType` parameter in the GetBatchDetails command.
 *
 */
export enum UpaReportSubType {
  /** Filter reports by reference number. Sends `"1"` to the device. */
  ByReference = "1",
  /** Filter reports by clerk. Sends `"2"` to the device. */
  ByClerk = "2",
  /** Filter reports by all clerks. Sends `"3"` to the device. */
  ByAllClerks = "3",
}
