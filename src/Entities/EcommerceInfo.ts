import {EcommerceChannel} from "../Entities";
export class EcommerceInfo {
  public cavv: string;
  public channel: EcommerceChannel;
  public eci: string;
  public paymentDataSource: string;
  public paymentDataType: string;
  public shipDay: string;
  public shipMonth: string;
  public xid: string;

  public constructor() {
    this.channel = EcommerceChannel.Ecom;
    this.shipDay = (new Date()).getUTCDate().toString();
    this.shipMonth = ((new Date()).getUTCMonth() + 1).toString();
    this.paymentDataType = "3DSecure";
  }
}
