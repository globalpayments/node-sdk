import { Action } from "../Action";
import { PagedResult } from "../GpApi/PageResult";

/** The `action` object GP-API returns with every response. */
export class ActionMetadata extends Action {}

/** An entry in GET /actions or the response of GET /actions/{id}. */
export class ActionSummary {
  public id?: string;
  public type?: string;
  public timeCreated?: Date;
  public timeLastUpdated?: Date;
  public resource?: string;
  public resourceId?: string;
  public resourceParentId?: string;
  public resourceStatus?: string;
  public resourceRequestUrl?: string;
  public version?: string;
  public httpResponseCode?: string;
  public httpResponseMessage?: string;
  public responseCode?: string;
  public responseDetailedCode?: string;
  public responseDetailedMessage?: string;
  public appId?: string;
  public appName?: string;
  public appDeveloper?: string;
  public email?: string;
  public merchantId?: string;
  public merchantName?: string;
  public accountId?: string;
  public accountName?: string;
  public sourceLocation?: string;
  public destinationLocation?: string;
  public messageReceived?: string;
  public messageSent?: string;
  public downstreamMessageReceived?: string;
  public downstreamMessageSent?: string;
  public metrics?: Record<string, string> | string;
  public totalTimeMilliseconds?: number;
  public totalTimeDownstreamMilliseconds?: number;
  public action?: ActionMetadata | null;
}

/** The GET /actions envelope. */
export class ActionPagedResult extends PagedResult {
  public result: ActionSummary[] = [];
  public fromTimeCreated?: string;
  public toTimeCreated?: string;
  /** Every filter the gateway applied, including the date range. */
}
