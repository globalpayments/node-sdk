export class PagedResult {
  totalRecordCount: number | null;
  pageSize: number | null;
  page: number | null;
  order: string | null;
  orderBy: string | null;
  result: any[] = [];
}
