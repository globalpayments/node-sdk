import { CvnPresenceIndicator } from "../";
import { EBT } from "./EBT";
import { ICardData } from "./Interfaces";

export class EBTCardData extends EBT implements ICardData {
  public approvalCode: string;
  public number: string;
  public expMonth: string;
  public expYear: string;
  public cvn: string;
  public cvnPresenceIndicator: CvnPresenceIndicator;
  public cardHolderName: string;
  public cardPresent: boolean;
  public readerPresent: boolean;
  public serialNumber: string;

  public constructor() {
    super();
    this.cardPresent = false;
    this.readerPresent = false;
    this.cvnPresenceIndicator = CvnPresenceIndicator.NotRequested;
  }
}
