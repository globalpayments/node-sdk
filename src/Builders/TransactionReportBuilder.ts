import {
  ActionSortProperty,
  DepositSortProperty,
  DisputeSortProperty,
  NotImplementedError,
  ReportType,
  SearchCriteriaBuilder,
  SortDirection,
  StoredPaymentMethodSortProperty,
  TransactionSortProperty,
} from "../";
import { ReportBuilder } from "./ReportBuilder";
import { IDictionary } from "./BaseBuilder";

export class TransactionReportBuilder<T> extends ReportBuilder<T> {
  public deviceId: string;
  public endDate: Date;
  public startDate: Date;
  public transactionId: string;
  public actionId: string;
  public searchCriteria: IDictionary<string>;
  public actionOrderBy: ActionSortProperty;
  public depositOrderBy: DepositSortProperty;
  public disputeOrderBy: DisputeSortProperty;

  constructor(type: ReportType) {
    super(type);
    this.searchBuilder = new SearchCriteriaBuilder(this);
  }

  public setupValidations() {
    this.validations
      .of("reportType", ReportType.TransactionDetail)
      .check("transactionId")
      .isNotNull()
      .check("transactionId")
      .isNotEmpty()
      .check("deviceId")
      .isNull()
      .check("startDate")
      .isNull()
      .check("endDate")
      .isNull();

    this.validations
      .of("reportType", ReportType.Activity)
      .check("transactionId")
      .isNull();

    this.validations
      .of("reportType", ReportType.ActionDetail)
      .check("actionId")
      .isNotNull()
      .check("actionId")
      .isNotEmpty();

    this.validations
      .of("reportType", ReportType.DocumentDisputeDetail)
      .check("searchBuilder.disputeDocumentId")
      .isNotNull()
      .check("searchBuilder.disputeId")
      .isNotNull();
  }

  public withDeviceId(deviceId?: string) {
    if (deviceId !== undefined) {
      this.deviceId = deviceId;
    }
    return this;
  }

  public withDisputeId(disputeId?: string | null) {
    this.searchBuilder.disputeId = disputeId;
    return this;
  }

  public withDisputeDocumentId(disputeDocumentId: string) {
    this.searchBuilder.disputeDocumentId = disputeDocumentId;
    return this;
  }

  public withEndDate(endDate?: Date) {
    this.searchBuilder.endDate = endDate;
    return this;
  }

  public withTransactionId(transactionId?: string) {
    if (transactionId !== undefined) {
      this.transactionId = transactionId;
    }
    return this;
  }

  public withStartDate(startDate?: Date) {
    this.searchBuilder.startDate = startDate;
    return this;
  }

  public withStoredPaymentMethodId(storedPaymentMethodId?: string) {
    if (storedPaymentMethodId !== undefined) {
      this.searchBuilder.storedPaymentMethodId = storedPaymentMethodId;
    }
    return this;
  }

  public withActionId(actionId?: string) {
    this.actionId = actionId as string;
    this.searchBuilder.actionId = actionId;
    return this;
  }

  public withDepositId(depositId: string) {
    this.searchBuilder.depositId = depositId;
    return this;
  }

  public withSettlementDisputeId(settlementDisputeId: string) {
    this.searchBuilder.settlementDisputeId = settlementDisputeId;
    return this;
  }

  public where(criteria: string, value: any) {
    if (criteria !== undefined && value !== undefined) {
      if (this.searchCriteria == undefined) {
        this.searchCriteria = {};
      }
      this.searchCriteria[criteria] = value;
      this.searchBuilder.andWith(
        criteria as keyof SearchCriteriaBuilder<T>,
        value,
      );
    }
    return this.searchBuilder;
  }

  public orderBy(
    sortProperty:
      | ActionSortProperty
      | StoredPaymentMethodSortProperty
      | TransactionSortProperty
      | DepositSortProperty
      | DisputeSortProperty,
    sortDirection: SortDirection = SortDirection.Desc,
  ) {
    this.order = sortDirection;

    switch (this.reportType) {
      case ReportType.FindStoredPaymentMethodsPaged:
        this.storedPaymentMethodOrderBy = sortProperty;
        break;
      case ReportType.FindTransactions:
      case ReportType.FindTransactionsPaged:
      case ReportType.FindSettlementTransactionsPaged:
        this.transactionOrderBy = sortProperty;
        break;
      case ReportType.FindDeposits:
      case ReportType.FindDepositsPaged:
        this.depositOrderBy = sortProperty as DepositSortProperty;
        break;
      case ReportType.FindDisputesPaged:
      case ReportType.FindSettlementDisputesPaged:
        this.disputeOrderBy = sortProperty as DisputeSortProperty;
        break;
      case ReportType.FindActionsPaged:
        this.actionOrderBy = sortProperty as ActionSortProperty;
        break;
      default:
        throw new NotImplementedError();
    }

    return this;
  }
}
