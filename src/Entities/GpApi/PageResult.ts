import { Action } from "../Action";

export class PagedResult {
  currentPageSize: number | null;
  merchantId: string;
  merchantName: string;
  accountId: string;
  accountName: string;
  filter: Record<string, string | number>;
  action: Action | null;
  totalRecordCount: number | null;
  pageSize: number | null;
  page: number | null;
  order: string | null;
  orderBy: string | null;
  result: any[] = [];
}
