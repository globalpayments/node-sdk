import { Action } from "./Action";

export type FundType = "CREDIT" | "DEBIT";
export type FundPaymentMethod = "BANK_TRANSFER" | "CARD";

export interface FundRequest {
  accountId: string;
  accountName?: string;
  type: FundType;
  amount: string;
  currency: string;
  paymentMethod: FundPaymentMethod;
}

export interface FundsListFilters {
  fromTimeCreated?: string;
  toTimeCreated?: string;
}

export class Fund {
  public id: string;
  public timeCreated: string;
  public timeLastUpdated: string;
  public type: FundType;
  public status: string;
  public amount: string;
  public currency: string;
  public paymentMethod: FundPaymentMethod;
  public merchantId: string;
  public merchantName: string;
  public accountId: string;
  public accountName: string;
  public initiationMode?: string;
  public provider?: { result: string; message: string };
  public actionCreateId?: string;
  public parentResourceId?: string;
  public action?: Action;

  constructor(response: any) {
    this.id = response.id;
    this.timeCreated = response.time_created;
    this.timeLastUpdated = response.time_last_updated;
    this.type = response.type;
    this.status = response.status;
    this.amount = response.amount;
    this.currency = response.currency;
    this.paymentMethod = response.payment_method;
    this.merchantId = response.merchant_id;
    this.merchantName = response.merchant_name;
    this.accountId = response.account_id;
    this.accountName = response.account_name;
    this.initiationMode = response.initiation_mode;
    this.provider = response.provider;
    this.actionCreateId = response.action_create_id;
    this.parentResourceId = response.parent_resource_id;
    if (response.action) {
      this.action = Object.assign(new Action(), {
        id: response.action.id,
        type: response.action.type,
        timeCreated: response.action.time_created,
        resultCode: response.action.result_code,
        appId: response.action.app_id,
        appName: response.action.app_name,
      });
    }
  }
}

export class FundsList {
  public totalRecordCount?: number;
  public currentPageSize: number;
  public merchantId: string;
  public merchantName: string;
  public accountId: string;
  public accountName: string;
  public filter?: FundsListFilters;
  public paging?: {
    page: number;
    pageSize: number;
    order: string;
    orderBy: string;
  };
  public funds: Fund[];
  public action?: Action;

  constructor(response: any) {
    this.totalRecordCount = response.total_record_count;
    this.currentPageSize = response.current_page_size;
    this.merchantId = response.merchant_id;
    this.merchantName = response.merchant_name;
    this.accountId = response.account_id;
    this.accountName = response.account_name;
    this.funds = response.funds.map((fund: any) => new Fund(fund));
    this.action = new Fund(response).action;
    if (response.filter) {
      this.filter = {
        fromTimeCreated: response.filter.from_time_created,
        toTimeCreated: response.filter.to_time_created,
      };
    }
    if (response.paging) {
      this.paging = {
        page: response.paging.page,
        pageSize: response.paging.page_size,
        order: response.paging.order,
        orderBy: response.paging.order_by,
      };
    }
  }
}
