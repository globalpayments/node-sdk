import { CardUtils, EntryMethod } from "../";
import { Credit } from "./Credit";
import { ITrackData } from "./Interfaces";

export class CreditTrackData extends Credit implements ITrackData {
  public entryMethod: EntryMethod;
  public value: string;
  public discretionaryData: string;
  public expiry: string;
  public pan: string;
  public purchaseDeviceSequenceNumber: string;
  public trackNumber: string;
  public trackData: string;

  public setTrackData(value: string) {
    if (!this.value) {
      this.setValue(value);
    } else {
      this.trackData = value;
    }
  }

  setValue(value: string): void {
    this.value = value;
    CardUtils.parseTrackData(this);
    this.cardType = CardUtils.getCardType(this.pan);
    this.isFleet = CardUtils.isFleet(this.cardType, this.pan);

    if (
      this.cardType === "WexFleet" &&
      this.discretionaryData !== null &&
      this.discretionaryData.length >= 8
    ) {
      this.purchaseDeviceSequenceNumber = this.discretionaryData.substring(
        3,
        11,
      );
    }
  }
}
