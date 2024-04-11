import { CardUtils, EntryMethod } from "../";
import { Debit } from "./Debit";
import { ITrackData } from "./Interfaces";

export class DebitTrackData extends Debit implements ITrackData {
  public entryMethod: EntryMethod;
  public value: string;

  public setTrackData(value: string) {
    if (!this.value) {
      this.setValue(value);
    } else {
      this.trackData = value;
    }
  }

  public setValue(value: string): void {
    this.value = value;
    CardUtils.parseTrackData(this);
    this.cardType = CardUtils.getCardType(this.pan);
  }
}
