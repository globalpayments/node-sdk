import { IntervalToExpire } from "../../../../src";

export class AccessTokenRequest {
  public app_id: string;
  public nonce: string;
  public secret: string;
  public grant_type: string;
  public seconds_to_expire: number | undefined;
  public interval_to_expire: IntervalToExpire | null | undefined;
  public permission: string[];

  constructor(
    app_id: string,
    nonce: string,
    secret: string,
    grant_type: string,
    seconds_to_expire: number,
    interval_to_expire: IntervalToExpire | null,
    permission: string[],
  ) {
    this.app_id = app_id;
    this.nonce = nonce;
    this.secret = secret;
    this.grant_type = grant_type;
    this.seconds_to_expire = seconds_to_expire || undefined;
    this.interval_to_expire = interval_to_expire || undefined;
    this.permission = permission;
  }
}
