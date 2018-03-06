export enum AccountType {
  Checking = "CHECKING",
  Savings = "SAVINGS",
}

export enum AddressType {
  Billing,
  Shipping,
}

export enum AliasAction {
  Create = "CREATE",
  Add = "ADD",
  Delete = "DELETE",
}

export enum CheckType {
  Personal = "PERSONAL",
  Business = "BUSINESS",
  Payroll = "PAYROLL",
}

export enum CurrencyType {
  CURRENCY,
  POINTS,
}

export enum CvnPresenceIndicator {
  Present = 1,
  Illegible = 2,
  NotOnCard = 3,
  NotRequested = 4,
}

export enum EcommerceChannel {
  Ecom = "ECOM",
  Moto = "MOTO",
}

export enum EmailReceipt {
  Never = "Never",
  All = "All",
  Approvals = "Approvals",
  Declines = "Declines",
}

export enum EntryMethod {
  Swipe = "SWIPE",
  Proximity = "PROXIMITY",
  Manual = "MANUAL",
}

export enum ExceptionCodes {
  // general codes
  AuthenticationError,
  InvalidConfiguration,

  // input codes
  InvalidAmount,
  MissingCurrency,
  InvalidCurrency,
  InvalidDate,
  MissingCheckName,
  InvalidPhoneNumber,
  InvalidZipCode,
  InvalidEmailAddress,
  InvalidInputLength,

  // gateway codes
  UnknownGatewayError,
  InvalidOriginalTransaction,
  NoOpenBatch,
  InvalidCpcData,
  InvalidCardData,
  InvalidNumber,
  GatewayTimeout,
  UnexpectedGatewayResponse,
  GatewayTimeoutReversalError,
  GatewayError,
  UnexpectedGatewayError,

  // credit issuer codes
  IncorrectNumber,
  ExpiredCard,
  InvalidPin,
  PinEntriesExceeded,
  InvalidExpiry,
  PinVerification,
  IssuerTimeout,
  IncorrectCvc,
  CardDeclined,
  ProcessingError,
  IssuerTimeoutReversalError,
  UnknownCreditError,
  PossibleFraudDetected,

  // gift codes
  UnknownGiftError,
  PartialApproval,
}

export enum FraudFilterMode {
  None = "NONE",
  Off = "OFF",
  Active = "ACTIVE",
  Passive = "PASSIVE",
}

export enum GiftEntryMethod {
  Swipe,
  Alias,
  Manual,
}

export enum HppVersion {
  Version1 = "1",
  Version2 = "2",
}

export enum InquiryType {
  Standard = "STANDARD",
  Foodstamp = "FOODSTAMP",
  Cash = "CASH",
  Points = "POINTS",
}

export enum PaymentMethodType {
  Reference = 1 << 0,
  Credit = 1 << 1,
  Debit = 1 << 2,
  EBT = 1 << 3,
  Cash = 1 << 4,
  ACH = 1 << 5,
  Gift = 1 << 6,
  Recurring = 1 << 7,
}

export enum PaymentSchedule {
  Dynamic,
  FirstDayOfTheMonth,
  LastDayOfTheMonth,
}

export enum ReasonCode {
  Fraud = "FRAUD",
  FalsePositive = "FALSEPOSITIVE",
  OutOfStock = "OUTOFSTOCK",
  InStock = "INSTOCK",
  Other = "OTHER",
  NotGiven = "NOTGIVEN",
}

export enum RecurringSequence {
  First,
  Subsequent,
  Last,
}

export enum RecurringType {
  Fixed,
  Variable,
}

export enum ReportType {
  FindTransactions = 1 << 0,
  Activity = 1 << 1,
  BatchDetail = 1 << 2,
  BatchHistory = 1 << 3,
  BatchSummary = 1 << 4,
  OpenAuths = 1 << 5,
  Search = 1 << 6,
  TransactionDetail = 1 << 7,
}

export enum ScheduleFrequency {
  Weekly = "Weekly",
  BiWeekly = "Bi-Weekly",
  BiMonthly = "Bi-Monthly",
  SemiMonthly = "Semi-Monthly",
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  SemiAnnually = "Semi-Annually",
  Annually = "Annually",
}

export enum SecCode {
  PPD = "PPD",
  CCD = "CCD",
  POP = "POP",
  WEB = "WEB",
  TEL = "TEL",
  EBronze = "EBronze",
}

export enum TaxType {
  NotUsed,
  SalesTax,
  TaxExempt,
}

export enum TimeZoneConversion {
  UTC,
  Merchant,
  Datacenter,
}

export enum TransactionModifier {
  None = 1 << 0,
  Incremental = 1 << 1,
  Additional = 1 << 2,
  Offline = 1 << 3,
  LevelII = 1 << 4,
  FraudDecline = 1 << 5,
  ChipDecline = 1 << 6,
  CashBack = 1 << 7,
  Voucher = 1 << 8,
  Secure3D = 1 << 9,
  HostedRequest = 1 << 10,
  Recurring = 1 << 11,
  EncryptedMobile = 1 << 12,
}

export enum TransactionType {
  Decline = 1 << 0,
  Verify = 1 << 1,
  Capture = 1 << 2,
  Auth = 1 << 3,
  Refund = 1 << 4,
  Reversal = 1 << 5,
  Sale = 1 << 6,
  Edit = 1 << 7,
  Void = 1 << 8,
  AddValue = 1 << 9,
  Balance = 1 << 10,
  Activate = 1 << 11,
  Alias = 1 << 12,
  Replace = 1 << 13,
  Reward = 1 << 14,
  Deactivate = 1 << 15,
  BatchClose = 1 << 16,
  Create = 1 << 17,
  Delete = 1 << 18,
  BenefitWithDrawal = 1 << 19,
  Fetch = 1 << 20,
  Search = 1 << 21,
  Hold = 1 << 22,
  Release = 1 << 23,
}
