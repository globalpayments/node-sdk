export enum ConnectionModes {
  SERIAL,
  TCP_IP,
  SSL_TCP,
  HTTP,
  MEET_IN_THE_CLOUD,
}

export enum ReportOutput {
  Print = "Print",
  ReturnData = "ReturnData",
}

export enum TerminalReportType {
  GetSAFReport = "GetSAFReport",
  GetBatchReport = "GetBatchReport",
  GetBatchDetails = "GetBatchDetails",
  GetOpenTabDetails = "GetOpenTabDetails",
  FindBatches = "FindBatches",
}

export enum Parity {
  None = 0,
  Odd,
  Even,
}
